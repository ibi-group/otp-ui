import { Company, VehicleRentalStation } from "@opentripplanner/types";

export type GetStationNameFunction = (
  configCompanies: Company[],
  station: VehicleRentalStation
) => string;
