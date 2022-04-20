import BaseMap from "@opentripplanner/base-map";
import {
  VehicleRentalMapOverlaySymbol,
  VehicleRentalStation
} from "@opentripplanner/types";
import React, {
  FunctionComponent,
  PropsWithChildren,
  ReactElement
} from "react";
import { CircleMarker } from "react-leaflet";
import { action } from "@storybook/addon-actions";

import VehicleRentalOverlay from ".";
import bikeRentalStations from "../__mocks__/bike-rental-stations.json";
import carRentalStations from "../__mocks__/car-rental-stations.json";
import eScooterStations from "../__mocks__/e-scooter-rental-stations.json";
import { HubAndFloatingBike } from "./DefaultMarkers";

import "../../../node_modules/leaflet/dist/leaflet.css";
import { GetStationNameFunction } from "./types";

interface GeneratedCircleProps {
  entity: VehicleRentalStation;
}

interface MyCircleProps {
  fillColor: string;
  pixels: number;
  strokeColor: string;
}

interface StoryProps {
  companies?: string[];
  getStationName?: GetStationNameFunction;
  mapSymbols?: VehicleRentalMapOverlaySymbol[];
  refreshVehicles: () => void;
  stations: VehicleRentalStation[];
  visible: boolean;
}

const center = [45.518092, -122.671202];

/**
 * Creates an example Circle component to render entities
 * using a fixed size, fill color, and stroke color.
 */
const MyCircle = ({
  fillColor = "gray",
  pixels,
  strokeColor
}: MyCircleProps) => {
  const newStrokeColor = strokeColor || fillColor;

  const GeneratedCircle: FunctionComponent<GeneratedCircleProps> = ({
    children,
    entity: station
  }: PropsWithChildren<GeneratedCircleProps>): ReactElement => (
    <CircleMarker
      center={[station.y, station.x]}
      color={newStrokeColor}
      fillColor={fillColor}
      fillOpacity={1}
      radius={pixels}
      weight={1}
    >
      {children}
    </CircleMarker>
  );
  return GeneratedCircle;
};

const bikeMapSymbols = [
  {
    dockStrokeColor: "#000000",
    fillColor: "#FF2E28",
    minZoom: 0,
    pixels: 4,
    type: "circle"
  },
  {
    dockStrokeColor: "#000000",
    fillColor: "#FF2E28",
    minZoom: 14,
    pixels: 6,
    type: "circle"
  },
  {
    minZoom: 18,
    type: "hubAndFloatingBike"
  }
];
// Bike symbols using new symbols prop.
const bikeSymbols = [
  {
    getType: station => (station.isFloatingBike ? "floatingBike" : "dock"),
    minZoom: 0,
    symbol: MyCircle({ fillColor: "#FF2E28", pixels: 3 }),
    symbolByType: {
      dock: MyCircle({
        fillColor: "#FF2E28",
        pixels: 4,
        strokeColor: "#000000"
      })
    }
  },
  {
    getType: station => (station.isFloatingBike ? "floatingBike" : "dock"),
    minZoom: 14,
    symbol: MyCircle({ fillColor: "#FF2E28", pixels: 5 }),
    symbolByType: {
      dock: MyCircle({
        fillColor: "#FF2E28",
        pixels: 6,
        strokeColor: "#000000"
      })
    }
  },
  {
    minZoom: 18,
    symbol: HubAndFloatingBike
  }
];
const carMapSymbols = [
  {
    fillColor: "#009cde",
    minZoom: 0,
    pixels: 4,
    type: "circle"
  },
  {
    fillColor: "#009cde",
    minZoom: 14,
    pixels: 6,
    type: "circle"
  },
  {
    fillColor: "#009cde",
    minZoom: 18,
    type: "marker"
  }
];
const configCompanies = [
  {
    id: "BIKETOWN",
    label: "Biketown",
    modes: "BICYCLE_RENT"
  },
  {
    id: "CAR2GO",
    label: "car2go",
    modes: "CAR_RENT"
  },
  {
    id: "RAZOR",
    label: "Razor",
    modes: "MICROMOBILITY_RENT"
  },
  {
    id: "SHARED",
    label: "Shared",
    modes: "MICROMOBILITY_RENT"
  }
];
const EScooterMapSymbols = [
  {
    fillColor: "#F80600",
    minZoom: 0,
    pixels: 4,
    strokeColor: "#CCCCCC",
    type: "circle"
  },
  // You can combine predefined symbols (type = "<type>")
  // and external symbols (symbol = Component<({ entity, zoom })>.
  // (the color and pixel properties are ignored if you use the symbol syntax.).
  {
    minZoom: 14,
    symbol: MyCircle({
      fillColor: "#F80600",
      pixels: 6,
      strokeColor: "#CCCCCC"
    })
  },
  {
    fillColor: "#F80600",
    minZoom: 18,
    type: "marker"
  }
];
const setLocation = action("setLocation");

const INITIAL_ZOOM = 13;

/**
 * Create a template component for each VehicleRentalOverlay story.
 */
function createVehicleRentalTemplateTemplate(): ComponentStory<
  typeof VehicleRentalOverlay
> {
  const ZoomControlledMapWithVehicleRentalOverlay = ({
    companies,
    getStationName,
    mapSymbols,
    refreshVehicles,
    stations,
    visible = true
  }: StoryProps): ReactElement => (
    // Caution, <BaseMap> must be a direct parent of <VehicleRentalOverlay>.
    // Therefore, do not place <BaseMap> in a decorator at this time.
    <BaseMap center={center} zoom={INITIAL_ZOOM}>
      <VehicleRentalOverlay
        companies={companies}
        configCompanies={configCompanies}
        getStationName={getStationName}
        mapSymbols={mapSymbols}
        name="Rentals"
        refreshVehicles={refreshVehicles}
        setLocation={setLocation}
        stations={stations}
        visible={visible}
      />
    </BaseMap>
  );
  return ZoomControlledMapWithVehicleRentalOverlay;
}

/**
 * Helper to simplify story declaration.
 */
function makeStory(
  args: StoryProps
): ComponentStory<typeof VehicleRentalOverlay> {
  const BoundTemplate = createVehicleRentalTemplateTemplate().bind({});
  BoundTemplate.args = args;
  return BoundTemplate;
}

function customStationName(_, station) {
  return `🛴 (ID: ${station.id})`;
}

export default {
  args: {
    visible: true
  },
  component: VehicleRentalOverlay,
  parameters: {
    controls: {
      include: ["visible"]
    }
  },
  title: "VehicleRentalOverlay"
} as ComponentMeta<typeof VehicleRentalOverlay>;

export const RentalBicycles = makeStory({
  companies: ["BIKETOWN"],
  mapSymbols: bikeMapSymbols,
  refreshVehicles: action("refresh bicycles"),
  stations: bikeRentalStations
});

export const RentalBicyclesVisibilityControlledByKnob = makeStory({
  companies: ["BIKETOWN"],
  mapSymbols: bikeMapSymbols,
  refreshVehicles: action("refresh bicycles"),
  stations: bikeRentalStations,
  visible: false
});

export const RentalBicyclesUsingNewSymbolsProp = makeStory({
  companies: ["BIKETOWN"],
  refreshVehicles: action("refresh bicycles"),
  mapSymbols: bikeSymbols,
  stations: bikeRentalStations
});

export const RentalCars = makeStory({
  companies: ["CAR2GO"],
  mapSymbols: carMapSymbols,
  refreshVehicles: action("refresh cars"),
  stations: carRentalStations
});

export const RentalEScooters = makeStory({
  companies: ["SHARED"],
  mapSymbols: EScooterMapSymbols,
  refreshVehicles: action("refresh E-scooters"),
  stations: eScooterStations
});

export const RentalEScootersWithCustomNaming = makeStory({
  companies: ["SHARED"],
  getStationName: customStationName,
  mapSymbols: EScooterMapSymbols,
  refreshVehicles: action("refresh E-scooters"),
  stations: eScooterStations
});
