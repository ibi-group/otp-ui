import React, { ReactNode } from "react";
import { action } from "storybook/actions";

import { Company } from "@opentripplanner/types";
import {
  RentalVehicle,
  VehicleRentalStation
} from "@opentripplanner/types/otp2";
import bikeRentalStations from "../__mocks__/bike-rental-stations.json";
import carRentalStations from "../__mocks__/car-rental-stations.json";
import eScooterStations from "../__mocks__/e-scooter-rental-stations.json";
import { withMap } from "../../../.storybook/base-map-wrapper";
import VehicleRentalOverlay from ".";

const center: [number, number] = [45.518092, -122.671202];
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
const setLocation = action("setLocation");

const INITIAL_ZOOM = 13;

type StoryProps = {
  companies: string[];
  getStationName?: (
    configCompanies: Company[],
    station: VehicleRentalStation
  ) => string;
  refreshVehicles: () => void;
  entities: (VehicleRentalStation | RentalVehicle)[];
  visible?: boolean;
};

const ZoomControlledMapWithVehicleRentalOverlay = ({
  companies,
  entities,
  getStationName,
  refreshVehicles,
  visible
}: StoryProps) => (
  <VehicleRentalOverlay
    companies={companies}
    configCompanies={configCompanies}
    entities={entities}
    getStationName={getStationName}
    id="test"
    refreshVehicles={refreshVehicles}
    setLocation={setLocation}
    visible={visible}
  />
);

function customStationName(_, station) {
  return `🛴 (ID: ${station.id})`;
}

export default {
  title: "VehicleRentalOverlay",
  component: VehicleRentalOverlay,
  decorators: [withMap(center, INITIAL_ZOOM)],
  parameters: { storyshots: { disable: true } }
};
export const RentalBicycles = () => (
  <ZoomControlledMapWithVehicleRentalOverlay
    companies={["BIKETOWN"]}
    refreshVehicles={action("refresh bicycles")}
    entities={bikeRentalStations}
  />
);

export const RentalBicyclesVisibilityControlledByKnob = ({
  visible
}: {
  visible: boolean;
}): ReactNode => {
  return (
    <ZoomControlledMapWithVehicleRentalOverlay
      companies={["BIKETOWN"]}
      refreshVehicles={action("refresh bicycles")}
      entities={bikeRentalStations}
      visible={visible}
    />
  );
};
RentalBicyclesVisibilityControlledByKnob.args = { visible: true };

export const RentalCars = () => (
  <ZoomControlledMapWithVehicleRentalOverlay
    companies={["CAR2GO"]}
    refreshVehicles={action("refresh cars")}
    entities={carRentalStations}
  />
);

export const RentalEScooters = () => (
  <ZoomControlledMapWithVehicleRentalOverlay
    companies={["SHARED"]}
    refreshVehicles={action("refresh E-scooters")}
    entities={eScooterStations}
  />
);

export const RentalEScootersWithCustomNaming = () => (
  <ZoomControlledMapWithVehicleRentalOverlay
    companies={["SHARED"]}
    getStationName={customStationName}
    refreshVehicles={action("refresh E-scooters")}
    entities={eScooterStations}
  />
);
