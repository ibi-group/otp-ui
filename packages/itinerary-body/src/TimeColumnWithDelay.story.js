import { itineraryType } from "@opentripplanner/core-utils/lib/types";
import ClassicLegIcon from "@opentripplanner/icons/lib/classic-leg-icon";
import React from "react";
import { storiesOf } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { withInfo } from "@storybook/addon-info";

import DefaultTransitLegSummary from "./defaults/transit-leg-summary";
import { WrappedOtpRRTransitLegSubheader } from "./demos";
import OtpRRStyledItineraryBody from "./otp-react-redux/itinerary-body";
import OtpRRLineColumnContent from "./otp-react-redux/line-column-content";
import OtpRRPlaceName from "./otp-react-redux/place-name";
import OtpRRRouteDescription from "./otp-react-redux/route-description";

import TimeColumnWithDelays from "./demos/time-column-with-delays";

const config = require("./__mocks__/config.json");

// import mock itinaries. These are all trip plan outputs from OTP.
const walkTransitWalkItinerary = require("./__mocks__/itineraries/walk-transit-walk-fdot.json");
const walkTransitWalkRealtimeDelayedItinerary = require("./__mocks__/itineraries/walk-transit-walk-fdot-realtime-delayed.json");
const walkTransitWalkRealtimeEarlyItinerary = require("./__mocks__/itineraries/walk-transit-walk-fdot-realtime-early.json");
const walkTransitWalkRealtimeOntimeItinerary = require("./__mocks__/itineraries/walk-transit-walk-fdot-realtime-ontime.json");

const OtpRRItineraryBodyWrapper = ({ itinerary }) => (
  <OtpRRStyledItineraryBody
    config={config}
    itinerary={itinerary}
    LegIcon={ClassicLegIcon}
    LineColumnContent={OtpRRLineColumnContent}
    PlaceName={OtpRRPlaceName}
    RouteDescription={OtpRRRouteDescription}
    routingType="ITINERARY"
    showAgencyInfo
    showLegIcon
    showMapButtonColumn={false}
    showViewTripButton
    styledItinerary="otp-rr"
    TimeColumnContent={TimeColumnWithDelays}
    toRouteAbbreviation={r => r.toString().substr(0, 2)}
    TransitLegSubheader={WrappedOtpRRTransitLegSubheader}
    TransitLegSummary={DefaultTransitLegSummary}
  />
);

OtpRRItineraryBodyWrapper.propTypes = {
  itinerary: itineraryType.isRequired
};

storiesOf("TimeColumnWithDelay", module)
  .addDecorator(withA11y)
  .addDecorator(withInfo)
  .add("No realtime data", () => (
    <OtpRRItineraryBodyWrapper itinerary={walkTransitWalkItinerary} />
  ))
  .add("Realtime data, delay", () => (
    <OtpRRItineraryBodyWrapper
      itinerary={walkTransitWalkRealtimeDelayedItinerary}
    />
  ))
  .add("Realtime data, early", () => (
    <OtpRRItineraryBodyWrapper
      itinerary={walkTransitWalkRealtimeEarlyItinerary}
    />
  ))
  .add("Realtime data, on-time", () => (
    <OtpRRItineraryBodyWrapper
      itinerary={walkTransitWalkRealtimeOntimeItinerary}
    />
  ));
