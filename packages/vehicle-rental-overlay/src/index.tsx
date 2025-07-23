import { MarkerWithPopup, Popup } from "@opentripplanner/base-map";
import {
  Company,
  ConfiguredCompany,
  MapLocationActionArg
} from "@opentripplanner/types";
import {
  RentalVehicle,
  VehicleRentalStation
} from "@opentripplanner/types/otp2";
import { EventData } from "mapbox-gl";
import React, { useEffect, useState } from "react";
import { Layer, Source, useMap } from "react-map-gl";

import StationPopup from "@opentripplanner/map-popup";
import { BaseBikeRentalIcon, StationMarker } from "./styled";

// TODO: Make configurable?
const DETAILED_MARKER_CUTOFF = 16;

function entityIsStation(
  entity: VehicleRentalStation | RentalVehicle
): entity is VehicleRentalStation {
  return "availableVehicles" in entity;
}

const getColorForEntity = (entity: VehicleRentalStation | RentalVehicle) => {
  if (entityIsStation(entity)) {
    if (entity.availableVehicles && entity.availableVehicles.total > 0)
      return "#f00";
  } else {
    if (entity.vehicleType.formFactor === FormFactor.SCOOTER) return "#f5a729";
    if (entity.vehicleType.formFactor === FormFactor.BICYCLE) return "#009cde";
  }
  return "gray";
};

type Props = {
  /**
   * A list of companies that are applicable to just this instance of the
   * overlay.
   */
  companies?: string[];
  /**
   * The entire companies config array.
   */
  configCompanies: ConfiguredCompany[];
  /**
   * The entities to be represented in the overlay. They can be a combination of VehicleRentalStation type
   * (for stationary stations) and RentalVehicle type (for floating vehicles)
   */
  entities?: (VehicleRentalStation | RentalVehicle)[];
  /**
   * An id, used to make this layer uniquely identifiable
   */
  id: string;
  /**
   * An optional custom function to create a string name of a particular vehicle
   * rental station. This function takes two arguments of the configCompanies
   * prop and a vehicle rental station. The function must return a string.
   */
  getStationName?: (
    configCompanies: Company[],
    station: VehicleRentalStation
  ) => string;
  /**
   * If specified, a function that will be triggered every 30 seconds whenever this layer is
   * visible.
   */
  refreshVehicles?: () => void;
  /**
   * A callback for when a user clicks on setting this stop as either the from
   * or to location of a new search.
   *
   * This will be dispatched with the following argument:
   *
   * ```js
   *  {
   *    location: {
   *      lat: number,
   *      lon: number,
   *      name: string
   *    },
   *    locationType: "from" or "to"
   *  }
   * ```
   */
  setLocation?: (arg: MapLocationActionArg) => void;
  /**
   * @deprecated use entities instead
   * A list of the vehicle rental stations specific to this overlay instance.
   */
  stations?: VehicleRentalStation[];
  /**
   * Whether the overlay is currently visible.
   */
  visible?: boolean;
  /**
   * TODO: Add props for overriding symbols?
   */
};

/**
 * This vehicle rental overlay can be used to render vehicle rentals of various
 * types. This layer can be configured to show different styles of markers at
 * different zoom levels.
 */
const VehicleRentalOverlay = ({
  companies,
  configCompanies,
  entities,
  getStationName,
  id,
  refreshVehicles,
  setLocation,
  stations,
  visible
}: Props): JSX.Element => {
  const { current: map } = useMap();
  const [zoom, setZoom] = useState(map?.getZoom());

  const layerId = `rental-vehicles-${id}`;
  const [clickedVehicle, setClickedVehicle] = useState(null);

  const fullEntityArr = (entities || []).concat(stations || []);

  useEffect(() => {
    // TODO: Make 30s configurable?
    if (!refreshVehicles || typeof refreshVehicles !== "function") {
      return;
    }

    refreshVehicles();
    setInterval(refreshVehicles, 30_000);
  }, [refreshVehicles]);

  useEffect(() => {
    const VEHICLE_LAYERS = [layerId];
    VEHICLE_LAYERS.forEach(stopLayer => {
      map?.on("mouseenter", stopLayer, () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map?.on("mouseleave", stopLayer, () => {
        map.getCanvas().style.cursor = "";
      });
      map?.on("click", stopLayer, (event: EventData) => {
        setClickedVehicle(event.features?.[0].properties);
      });
    });
    map.on("zoom", e => {
      // Avoid too many re-renders by only updating state if we are a whole number value different
      const { zoom: newZoom } = e.viewState;
      if (Math.floor(zoom / 2) !== Math.floor(newZoom / 2)) {
        setZoom(newZoom);
      }
    });
  }, [map]);

  // Don't render if no map or no stops are defined.
  if (visible === false || fullEntityArr.length === 0) {
    // Null can't be returned here -- react-map-gl dislikes null values as children
    return <></>;
  }

  const vehiclesGeoJSON: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: fullEntityArr
      .filter(
        entity =>
          // Include specified companies only if companies is specified and network info is available
          !companies ||
          !entity.rentalNetwork.networkId ||
          companies.includes(entity.rentalNetwork.networkId)
      )
      .map(entity => ({
        type: "Feature",
        geometry: { type: "Point", coordinates: [entity.lon, entity.lat] },
        properties: {
          ...entity,
          networks: entity.rentalNetwork.networkId,
          "stroke-width": entityIsStation(entity) ? 1 : 2,
          color: getColorForEntity(entity)
        }
      }))
  };

  return (
    <>
      {zoom < DETAILED_MARKER_CUTOFF && (
        <Source type="geojson" data={vehiclesGeoJSON}>
          <Layer
            id={layerId}
            paint={{
              "circle-color": ["get", "color"],
              "circle-opacity": 0.9,
              "circle-stroke-color": "#333",
              "circle-stroke-width": ["get", "stroke-width"]
            }}
            type="circle"
          />
          {/* this is where we add the symbols layer. add a second layer that gets swapped in and out dynamically */}
        </Source>
      )}
      {zoom >= DETAILED_MARKER_CUTOFF &&
        fullEntityArr.map(entity => (
          <MarkerWithPopup
            key={entity.id}
            popupContents={
              <StationPopup
                configCompanies={configCompanies}
                setLocation={location => {
                  setClickedVehicle(null);
                  setLocation(location);
                }}
                getEntityName={
                  // @ts-expect-error no stop support. Avoid a breaking change
                  getStationName && ((s, cc) => getStationName(cc, s))
                }
                entity={entity}
              />
            }
            position={[entity.lat, entity.lon]}
          >
            {"availableVehicles" in entity &&
            entity.availableVehicles.total > 0 &&
            entity.availableSpaces !== undefined ? (
              <BaseBikeRentalIcon
                percent={
                  entity?.availableVehicles.total /
                  (entity?.availableVehicles.total +
                    entity?.availableSpaces.total)
                }
              />
            ) : (
              <StationMarker width={12} color={getColorForEntity(entity)} />
            )}
          </MarkerWithPopup>
        ))}
      {clickedVehicle && (
        <Popup
          latitude={clickedVehicle.lat}
          longitude={clickedVehicle.lon}
          maxWidth="100%"
          onClose={() => {
            setClickedVehicle(null);
          }}
        >
          <StationPopup
            configCompanies={configCompanies}
            getEntityName={
              // @ts-expect-error no stop support. Avoid a breaking change
              getStationName && ((s, cc) => getStationName(cc, s))
            }
            setLocation={location => {
              setClickedVehicle(null);
              setLocation(location);
            }}
            entity={{
              ...clickedVehicle,
              rentalNetwork: clickedVehicle.rentalNetwork.networkId
            }}
          />
        </Popup>
      )}
    </>
  );
};
export default VehicleRentalOverlay;
export { StationPopup };
