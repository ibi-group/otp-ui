import flatten from "flat";
import { Styled as BaseMapStyled } from "@opentripplanner/base-map";
import coreUtils from "@opentripplanner/core-utils";
import FromToLocationPicker from "@opentripplanner/from-to-location-picker";
import {
  Company,
  SetLocationFunction,
  VehicleRentalMapOverlaySymbol,
  VehicleRentalStation
} from "@opentripplanner/types";
import ZoomBasedMarkers from "@opentripplanner/zoom-based-markers";
import React, { Component, ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import {
  FeatureGroup,
  LeafletContext,
  Popup,
  withLeaflet
} from "react-leaflet";

import {
  GenericMarker,
  HubAndFloatingBike,
  SharedBikeCircle
} from "./DefaultMarkers";
import { GetStationNameFunction } from "./types";

// Load the default messages.
import defaultEnglishMessages from "../i18n/en-US.yml";

interface Props {
  /**
   * The entire companies config array.
   */
  configCompanies: Company[];
  /**
   * A list of companies that are applicable to just this instance of the
   * overlay.
   */
  companies?: string[];
  /**
   * An optional custom function to create a string name of a particular vehicle
   * rental station. This function takes two arguments of the configCompanies
   * prop and a vehicle rental station. The function must return a string.
   */
  getStationName?: GetStationNameFunction;
  /**
   * Provides access to the underlying leaflet object.
   */
  leaflet: LeafletContext;
  /**
   * A configuration of what map markers or symbols to show at various
   * zoom levels.
   */
  mapSymbols?: VehicleRentalMapOverlaySymbol[];
  /**
   * If specified, a function that will be triggered every 30 seconds whenever this layer is
   * visible.
   */
  refreshVehicles?: () => void;
  /**
   * Internal method for registering overlays.
   */
  registerOverlay: (layer: Component) => void;
  /**
   * A callback for when a user clicks on setting this stop as either the from
   * or to location of a new search.
   */
  setLocation: SetLocationFunction;
  /**
   * A list of the vehicle rental stations specific to this overlay instance.
   */
  stations?: VehicleRentalStation[];
  /**
   * Whether the overlay is currently visible.
   */
  visible?: boolean;
}

interface State {
  refreshTimer: number;
  zoom: number;
}

interface SymbolWrapperProps {
  entity: VehicleRentalStation;
  zoom: number;
}

const defaultGetStationName = (configCompanies, station) => {
  const stationNetworks = coreUtils.itinerary.getCompaniesLabelFromNetworks(
    station.networks,
    configCompanies
  );
  let stationName = station.name || station.id;
  if (station.isFloatingBike) {
    stationName = `Free-floating bike: ${stationName}`;
  } else if (station.isFloatingCar) {
    stationName = `${stationNetworks} ${stationName}`;
  } else if (station.isFloatingVehicle) {
    // assumes that all floating vehicles are E-scooters
    stationName = `${stationNetworks} E-scooter`;
  }
  return stationName;
};

const defaultMapSymbols = [
  {
    symbol: GenericMarker,
    zoom: 0
  }
];

// HACK: We should flatten the messages loaded above because
// the YAML loaders behave differently between webpack and our version of jest:
// - the yaml loader for webpack returns a nested object,
// - the yaml loader for jest returns messages with flattened ids.
const defaultMessages: Record<string, string> = flatten(defaultEnglishMessages);

/**
 * This vehicle rental overlay can be used to render vehicle rentals of various
 * types. This layer can be configured to show different styles of markers at
 * different zoom levels.
 */
class VehicleRentalOverlay extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      refreshTimer: null,
      zoom: props.leaflet.map.getZoom()
    };
  }

  /**
   * Upon mounting, see whether the vehicles should be fetched,
   * and also call the register overlay prop that the
   * @opentripplanner/base-map package has injected to listen to zoom/position changes.
   */
  componentDidMount() {
    const { registerOverlay, visible } = this.props;
    if (visible) this.startRefreshing();
    if (typeof registerOverlay === "function") {
      registerOverlay(this);
    }
  }

  componentWillUnmount() {
    this.stopRefreshing();
  }

  /**
   * When the layer is added (or toggled on, or its visibility becomes true),
   * start refreshing vehicle positions.
   */
  onOverlayAdded = () => {
    this.startRefreshing();
  };

  /**
   * When the layer is removed (or toggled off, or its visibility becomes false),
   * stop refreshing vehicle positions.
   */
  onOverlayRemoved = () => {
    this.stopRefreshing();
  };

  /**
   * Listen to changes on the BaseMap's center or zoom.
   * @param viewport The viewport data. See https://github.com/PaulLeCam/react-leaflet/blob/master/example/components/viewport.js for details.
   */
  onViewportChanged = viewport => {
    const { zoom } = viewport;
    const { zoom: currentZoom } = this.state;
    if (zoom !== currentZoom) {
      this.setState({ zoom });
    }
  };

  /**
   * Convert map symbols to zoomBasedSymbolType.
   */
  convertToZoomMarkerSymbols = mapSymbols =>
    mapSymbols.map(mapSymbol => {
      // If mapSymbol uses zoomBasedSymbolType, use it as is.
      if (mapSymbol.symbol) {
        return mapSymbol;
      }

      // Otherwise, convert into zoomBasedType (no support for symbols by type).
      let symbol;
      switch (mapSymbol.type) {
        case "circle":
          symbol = SharedBikeCircle(mapSymbol);
          break;
        case "hubAndFloatingBike":
          symbol = HubAndFloatingBike;
          break;
        default:
          symbol = GenericMarker(mapSymbol);
      }

      return {
        minZoom: mapSymbol.minZoom,
        symbol
      };
    });

  startRefreshing() {
    const { refreshVehicles } = this.props;

    // Create the timer only if refreshVehicles is a valid function.
    if (typeof refreshVehicles === "function") {
      // initial station retrieval
      refreshVehicles();

      // set up timer to refresh stations periodically
      this.setState({
        refreshTimer: window.setInterval(() => {
          refreshVehicles();
        }, 30000) // defaults to every 30 sec. TODO: make this configurable?
      });
    }
  }

  stopRefreshing() {
    const { refreshTimer } = this.state;
    if (refreshTimer) clearInterval(refreshTimer);
  }

  /**
   * This helper method will be passed to the ZoomBasedMarkers symbolTransform prop.
   * It creates a component that inserts a popup
   * as a child of the specified symbol from the mapSymbols prop.
   */
  renderSymbolWithPopup = Symbol => {
    const SymbolWrapper = ({
      entity: station,
      zoom
    }: SymbolWrapperProps): ReactElement => (
      <Symbol entity={station} zoom={zoom}>
        {this.renderPopupForStation(
          station,
          station.bikesAvailable !== undefined && !station.isFloatingBike
        )}
      </Symbol>
    );
    return SymbolWrapper;
  };

  createLeafletElement() {}

  updateLeafletElement() {}

  /**
   * Render some popup html for a station. This contains custom logic for
   * displaying rental vehicles in the TriMet MOD website that might not be
   * applicable to other regions.
   */
  renderPopupForStation = (station, stationIsHub = false) => {
    const {
      configCompanies,
      getStationName = defaultGetStationName,
      setLocation
    } = this.props;
    const stationName = getStationName(configCompanies, station);
    const location = {
      lat: station.y,
      lon: station.x,
      name: stationName
    };
    return (
      <Popup>
        <BaseMapStyled.MapOverlayPopup>
          <BaseMapStyled.PopupTitle>{stationName}</BaseMapStyled.PopupTitle>

          {/* render dock info if it is available */}
          {stationIsHub && (
            <BaseMapStyled.PopupRow>
              <div>
                <FormattedMessage
                  defaultMessage={
                    defaultMessages["otpUi.VehicleRentalOverlay.availableBikes"]
                  }
                  description="Label text for the number of bikes available"
                  id="otpUi.VehicleRentalOverlay.availableBikes"
                  values={{ value: station.bikesAvailable }}
                />
              </div>
              <div>
                <FormattedMessage
                  defaultMessage={
                    defaultMessages["otpUi.VehicleRentalOverlay.availableDocks"]
                  }
                  description="Label text for the number of docks available"
                  id="otpUi.VehicleRentalOverlay.availableDocks"
                  values={{ value: station.spacesAvailable }}
                />
              </div>
            </BaseMapStyled.PopupRow>
          )}

          {/* Set as from/to toolbar */}
          <BaseMapStyled.PopupRow>
            <FromToLocationPicker
              // TODO: add `label` prop
              location={location}
              // FIXME: remove
              onFromClick={null}
              // FIXME: remove
              onToClick={null}
              setLocation={setLocation}
            />
          </BaseMapStyled.PopupRow>
        </BaseMapStyled.MapOverlayPopup>
      </Popup>
    );
  };

  render() {
    const {
      companies,
      mapSymbols = defaultMapSymbols,
      stations = []
    } = this.props;
    const { zoom } = this.state;
    // Render an empty FeatureGroup if the rental vehicles should not be visible
    // on the map. Otherwise previous stations may still be shown due to some
    // react-leaflet internals, maybe? Also, do not return null because that will
    // prevent the overlay from appearing in the layer controls.

    let filteredStations = stations;
    if (companies) {
      filteredStations = stations.filter(
        station =>
          station.networks.filter(value => companies.includes(value)).length > 0
      );
    }

    if (!filteredStations || filteredStations.length === 0) {
      return <FeatureGroup />;
    }

    // Convert map symbols for this overlay to zoomBasedSymbolType.
    const symbols = this.convertToZoomMarkerSymbols(mapSymbols);

    return (
      <FeatureGroup>
        <ZoomBasedMarkers
          entities={filteredStations}
          symbols={symbols}
          symbolTransform={this.renderSymbolWithPopup}
          zoom={zoom}
        />
      </FeatureGroup>
    );
  }
}

export default withLeaflet(VehicleRentalOverlay);
