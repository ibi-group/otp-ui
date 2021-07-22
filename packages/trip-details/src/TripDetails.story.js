import React from "react";
import styled from "styled-components";

import TripDetails from ".";
import * as TripDetailsClasses from "./styled";

// import mock itinaries. These are all trip plan outputs from OTP.
const bikeOnlyItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/bike-only.json");
const bikeRentalItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/bike-rental.json");
const bikeRentalTransitBikeRentalItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/bike-rental-transit-bike-rental.json");
const bikeTransitBikeItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/bike-transit-bike.json");
const eScooterRentalItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/e-scooter-rental.json");
const eScooterRentalTransiteScooterRentalItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/e-scooter-transit-e-scooter.json");
const parkAndRideItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/park-and-ride.json");
const tncTransitTncItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/tnc-transit-tnc.json");
const walkInterlinedTransitItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/walk-interlined-transit-walk.json");
const walkOnlyItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/walk-only.json");
const walkTransitWalkItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/walk-transit-walk.json");
const walkTransitWalkTransitWalkItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/walk-transit-walk-transit-walk.json");

const StyledTripDetails = styled(TripDetails)`
  ${TripDetailsClasses.TripDetailsHeader} {
    background-color: pink;
  }
`;

const customMessages = {
  title: "Details about this Trip",
  transitFare: "You will pay for transit",
  transitFareDescription:
    "Note: actual fare may be lower if you have a transit pass or something like that."
};
const longDateFormat = "MMMM D, YYYY";

export default {
  components: TripDetails,
  title: "TripDetails"
};

export const WalkOnlyItinerary = () => (
  <TripDetails itinerary={walkOnlyItinerary} longDateFormat={longDateFormat} />
);

export const BikeOnlyItinerary = () => (
  <TripDetails itinerary={bikeOnlyItinerary} longDateFormat={longDateFormat} />
);

export const WalkTransitWalkItinerary = () => (
  <TripDetails
    itinerary={walkTransitWalkItinerary}
    longDateFormat={longDateFormat}
  />
);

export const WalkTransitWalkItineraryAndCustomMessages = () => {
  const itinDate = new Date(walkTransitWalkItinerary.startTime);
  return (
    <TripDetails
      itinerary={walkTransitWalkItinerary}
      longDateFormat={longDateFormat}
      messages={{
        ...customMessages,
        // The depart message can be constructed dynamically using any markup,
        // including formatting markup using a string localization library.
        depart: (
          <>
            Trip <b>departs</b>
            <> at </>
            <u>{itinDate.toLocaleTimeString()}</u>
            <> on </>
            {itinDate.toISOString()}
          </>
        )
      }}
    />
  );
};

export const StyledWalkTransitWalkItinerary = () => (
  <StyledTripDetails
    itinerary={walkTransitWalkItinerary}
    longDateFormat={longDateFormat}
  />
);

export const BikeTransitBikeItinerary = () => (
  <TripDetails
    itinerary={bikeTransitBikeItinerary}
    longDateFormat={longDateFormat}
  />
);

export const WalkInterlinedTransitItinerary = () => (
  <TripDetails
    itinerary={walkInterlinedTransitItinerary}
    longDateFormat={longDateFormat}
  />
);

export const WalkTransitTransferItinerary = () => (
  <TripDetails
    itinerary={walkTransitWalkTransitWalkItinerary}
    longDateFormat={longDateFormat}
  />
);

export const BikeRentalItinerary = () => (
  <TripDetails
    itinerary={bikeRentalItinerary}
    longDateFormat={longDateFormat}
  />
);

export const EScooterRentalItinerary = () => (
  <TripDetails
    itinerary={eScooterRentalItinerary}
    longDateFormat={longDateFormat}
  />
);

export const ParkAndRideItinerary = () => (
  <TripDetails
    itinerary={parkAndRideItinerary}
    longDateFormat={longDateFormat}
  />
);

export const BikeRentalTransitItinerary = () => (
  <TripDetails
    itinerary={bikeRentalTransitBikeRentalItinerary}
    longDateFormat={longDateFormat}
  />
);

export const EScooterRentalTransitItinerary = () => (
  <TripDetails
    itinerary={eScooterRentalTransiteScooterRentalItinerary}
    longDateFormat={longDateFormat}
  />
);

export const TncTransitItinerary = () => (
  <TripDetails
    itinerary={tncTransitTncItinerary}
    longDateFormat={longDateFormat}
    messages={customMessages}
  />
);
