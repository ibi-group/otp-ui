import { itineraryType } from "@opentripplanner/core-utils/lib/types";
import ClassicLegIcon from "@opentripplanner/icons/lib/classic-leg-icon";
import TriMetLegIcon from "@opentripplanner/icons/lib/trimet-leg-icon";
import PropTypes from "prop-types";
import React from "react";
import { storiesOf } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { withInfo } from "@storybook/addon-info";
import { action } from "@storybook/addon-actions";

import DefaultLineColumnContent from "./defaults/line-column-content";
import DefaultPlaceName from "./defaults/place-name";
import DefaultRouteDescription from "./defaults/route-description";
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
const walkTransitWalkRealtimeNearOntimeItinerary = require("./__mocks__/itineraries/walk-transit-walk-fdot-realtime-near-ontime.json");

const ItineraryBodyDefaultsWrapper = ({
  itinerary,
  LegIcon,
  LineColumnContent,
  PlaceName,
  RouteDescription,
  showAgencyInfo,
  showLegIcon,
  showMapButtonColumn,
  showViewTripButton,
  toRouteAbbreviation,
  TransitLegSubheader,
  TransitLegSummary
}) => (
  <OtpRRStyledItineraryBody
    config={config}
    frameLeg={action("frameLeg")}
    itinerary={itinerary}
    LegIcon={LegIcon}
    LineColumnContent={LineColumnContent || DefaultLineColumnContent}
    PlaceName={PlaceName || DefaultPlaceName}
    RouteDescription={RouteDescription || DefaultRouteDescription}
    routingType="ITINERARY"
    setActiveLeg={action("setActiveLeg")}
    setViewedTrip={action("setViewedTrip")}
    showAgencyInfo={showAgencyInfo}
    showElevationProfile
    showLegIcon={showLegIcon}
    showMapButtonColumn={showMapButtonColumn}
    showViewTripButton={showViewTripButton}
    TimeColumnContent={TimeColumnWithDelays}
    toRouteAbbreviation={toRouteAbbreviation}
    TransitLegSubheader={TransitLegSubheader}
    TransitLegSummary={TransitLegSummary || DefaultTransitLegSummary}
  />
);

ItineraryBodyDefaultsWrapper.propTypes = {
  itinerary: itineraryType.isRequired,
  LegIcon: PropTypes.elementType,
  LineColumnContent: PropTypes.elementType,
  PlaceName: PropTypes.elementType,
  RouteDescription: PropTypes.elementType,
  showAgencyInfo: PropTypes.bool,
  showLegIcon: PropTypes.bool,
  showMapButtonColumn: PropTypes.bool,
  showViewTripButton: PropTypes.bool,
  toRouteAbbreviation: PropTypes.func,
  TransitLegSubheader: PropTypes.elementType,
  TransitLegSummary: PropTypes.elementType
};

ItineraryBodyDefaultsWrapper.defaultProps = {
  LegIcon: TriMetLegIcon,
  LineColumnContent: undefined,
  PlaceName: undefined,
  RouteDescription: undefined,
  showAgencyInfo: false,
  showLegIcon: false,
  showMapButtonColumn: true,
  showViewTripButton: false,
  toRouteAbbreviation: r => r.toString().substr(0, 2),
  TransitLegSubheader: undefined,
  TransitLegSummary: undefined
};

function OtpRRItineraryBodyWrapper({ itinerary }) {
  return (
    <ItineraryBodyDefaultsWrapper
      itinerary={itinerary}
      LegIcon={ClassicLegIcon}
      LineColumnContent={OtpRRLineColumnContent}
      PlaceName={OtpRRPlaceName}
      RouteDescription={OtpRRRouteDescription}
      showAgencyInfo
      showLegIcon
      showMapButtonColumn={false}
      showViewTripButton
      styledItinerary="otp-rr"
      TransitLegSubheader={WrappedOtpRRTransitLegSubheader}
    />
  );
}

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
  .add("Realtime data with, near on-time", () => (
    <OtpRRItineraryBodyWrapper
      itinerary={walkTransitWalkRealtimeNearOntimeItinerary}
    />
  ));
