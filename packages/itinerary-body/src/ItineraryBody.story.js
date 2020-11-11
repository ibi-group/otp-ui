import { itineraryType } from "@opentripplanner/core-utils/lib/types";
import ClassicLegIcon from "@opentripplanner/icons/lib/classic-leg-icon";
import TriMetLegIcon from "@opentripplanner/icons/lib/trimet-leg-icon";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { withInfo } from "@storybook/addon-info";
import { action } from "@storybook/addon-actions";

import ItineraryBody from ".";
import DefaultLineColumnContent from "./defaults/line-column-content";
import DefaultPlaceName from "./defaults/place-name";
import DefaultRouteDescription from "./defaults/route-description";
import DefaultTransitLegSummary from "./defaults/transit-leg-summary";
import {
  CustomPlaceName,
  customToRouteAbbreviation,
  CustomTimeColumnContent,
  CustomTransitLegSummary,
  StyledItineraryBody,
  WrappedOtpRRTransitLegSubheader
} from "./demos";
import OtpRRStyledItineraryBody from "./otp-react-redux/itinerary-body";
import OtpRRLineColumnContent from "./otp-react-redux/line-column-content";
import OtpRRPlaceName from "./otp-react-redux/place-name";
import OtpRRRouteDescription from "./otp-react-redux/route-description";

const config = require("./__mocks__/config.json");

// import mock itinaries. These are all trip plan outputs from OTP.
const bikeOnlyItinerary = require("./__mocks__/itineraries/bike-only.json");
const bikeRentalItinerary = require("./__mocks__/itineraries/bike-rental.json");
const bikeRentalTransitBikeRentalItinerary = require("./__mocks__/itineraries/bike-rental-transit-bike-rental.json");
const bikeTransitBikeItinerary = require("./__mocks__/itineraries/bike-transit-bike.json");
const eScooterRentalItinerary = require("./__mocks__/itineraries/e-scooter-rental.json");
const eScooterRentalTransiteScooterRentalItinerary = require("./__mocks__/itineraries/e-scooter-transit-e-scooter.json");
const fareComponentsItinerary = require("./__mocks__/itineraries/fare-components.json");
const parkAndRideItinerary = require("./__mocks__/itineraries/park-and-ride.json");
const tncTransitTncItinerary = require("./__mocks__/itineraries/tnc-transit-tnc.json");
const walkInterlinedTransitItinerary = require("./__mocks__/itineraries/walk-interlined-transit-walk.json");
const walkOnlyItinerary = require("./__mocks__/itineraries/walk-only.json");
const walkTransitWalkItinerary = require("./__mocks__/itineraries/walk-transit-walk.json");
const walkTransitWalkTransitWalkItinerary = require("./__mocks__/itineraries/walk-transit-walk-transit-walk.json");

class ItineraryBodyDefaultsWrapper extends Component {
  constructor() {
    super();
    this.state = {};
  }

  setLegDiagram = leg => {
    this.setState({ diagramVisible: leg });
  };

  render() {
    const {
      itinerary,
      LegIcon,
      LineColumnContent,
      PlaceName,
      RouteDescription,
      showAgencyInfo,
      showLegIcon,
      showMapButtonColumn,
      showRouteFares,
      showViewTripButton,
      styledItinerary,
      TimeColumnContent,
      toRouteAbbreviation,
      TransitLegSubheader,
      TransitLegSummary
    } = this.props;
    const { diagramVisible } = this.state;
    let ItineraryBodyComponent;
    switch (styledItinerary) {
      case "pink-legs":
        ItineraryBodyComponent = StyledItineraryBody;
        break;
      case "otp-rr":
        ItineraryBodyComponent = OtpRRStyledItineraryBody;
        break;
      default:
        ItineraryBodyComponent = ItineraryBody;
    }
    return (
      <div style={{ maxWidth: 700 }}>
        <ItineraryBodyComponent
          config={config}
          diagramVisible={diagramVisible}
          frameLeg={action("frameLeg")}
          itinerary={itinerary}
          LegIcon={LegIcon}
          LineColumnContent={LineColumnContent || DefaultLineColumnContent}
          PlaceName={PlaceName || DefaultPlaceName}
          RouteDescription={RouteDescription || DefaultRouteDescription}
          routingType="ITINERARY"
          setActiveLeg={action("setActiveLeg")}
          setLegDiagram={this.setLegDiagram}
          setViewedTrip={action("setViewedTrip")}
          showAgencyInfo={showAgencyInfo}
          showElevationProfile
          showLegIcon={showLegIcon}
          showMapButtonColumn={showMapButtonColumn}
          showRouteFares={showRouteFares}
          showViewTripButton={showViewTripButton}
          TimeColumnContent={TimeColumnContent}
          toRouteAbbreviation={toRouteAbbreviation}
          TransitLegSubheader={TransitLegSubheader}
          TransitLegSummary={TransitLegSummary || DefaultTransitLegSummary}
        />
      </div>
    );
  }
}

ItineraryBodyDefaultsWrapper.propTypes = {
  itinerary: itineraryType.isRequired,
  LegIcon: PropTypes.elementType,
  LineColumnContent: PropTypes.elementType,
  PlaceName: PropTypes.elementType,
  RouteDescription: PropTypes.elementType,
  showAgencyInfo: PropTypes.bool,
  showLegIcon: PropTypes.bool,
  showMapButtonColumn: PropTypes.bool,
  showRouteFares: PropTypes.bool,
  showViewTripButton: PropTypes.bool,
  styledItinerary: PropTypes.string,
  TimeColumnContent: PropTypes.elementType,
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
  showRouteFares: false,
  showViewTripButton: false,
  styledItinerary: null,
  TimeColumnContent: undefined,
  toRouteAbbreviation: r => r.toString().substr(0, 2),
  TransitLegSubheader: undefined,
  TransitLegSummary: undefined
};

function OtpRRItineraryBodyWrapper({
  itinerary,
  showRouteFares,
  TimeColumnContent
}) {
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
      showRouteFares={showRouteFares}
      showViewTripButton
      styledItinerary="otp-rr"
      TimeColumnContent={TimeColumnContent}
      TransitLegSubheader={WrappedOtpRRTransitLegSubheader}
    />
  );
}

OtpRRItineraryBodyWrapper.propTypes = {
  itinerary: itineraryType.isRequired,
  showRouteFares: PropTypes.bool,
  TimeColumnContent: PropTypes.elementType
};
OtpRRItineraryBodyWrapper.defaultProps = {
  showRouteFares: undefined,
  TimeColumnContent: undefined
};

storiesOf("ItineraryBody", module)
  .addDecorator(withA11y)
  .addDecorator(withInfo)
  .add("ItineraryBody with walk-only itinerary", () => (
    <ItineraryBodyDefaultsWrapper itinerary={walkOnlyItinerary} />
  ))
  .add("ItineraryBody with bike-only itinerary", () => (
    <ItineraryBodyDefaultsWrapper itinerary={bikeOnlyItinerary} />
  ))
  .add("ItineraryBody with walk-transit-walk itinerary", () => (
    <ItineraryBodyDefaultsWrapper itinerary={walkTransitWalkItinerary} />
  ))
  .add("Styled ItineraryBody with walk-transit-walk itinerary", () => (
    <ItineraryBodyDefaultsWrapper
      itinerary={walkTransitWalkItinerary}
      styledItinerary="pink-legs"
    />
  ))
  .add(
    "ItineraryBody with walk-transit-walk itinerary with agency information",
    () => (
      <ItineraryBodyDefaultsWrapper
        itinerary={walkTransitWalkItinerary}
        showAgencyInfo
      />
    )
  )
  .add(
    "ItineraryBody with walk-transit-walk itinerary with custom transit leg summary component",
    () => (
      <ItineraryBodyDefaultsWrapper
        itinerary={walkTransitWalkItinerary}
        TransitLegSummary={CustomTransitLegSummary}
      />
    )
  )
  .add(
    "ItineraryBody with walk-transit-walk itinerary with custom place name component",
    () => (
      <ItineraryBodyDefaultsWrapper
        itinerary={walkTransitWalkItinerary}
        PlaceName={CustomPlaceName}
      />
    )
  )
  .add(
    "ItineraryBody with walk-transit-walk itinerary with custom view trip button activated and custom route abbreviation",
    () => (
      <ItineraryBodyDefaultsWrapper
        itinerary={walkTransitWalkItinerary}
        showViewTripButton
        toRouteAbbreviation={customToRouteAbbreviation}
      />
    )
  )
  .add("ItineraryBody with bike-transit-bike itinerary", () => (
    <ItineraryBodyDefaultsWrapper itinerary={bikeTransitBikeItinerary} />
  ))
  .add("ItineraryBody with walk-interlined-transit itinerary", () => (
    <ItineraryBodyDefaultsWrapper itinerary={walkInterlinedTransitItinerary} />
  ))
  .add("ItineraryBody with walk-transit-transfer itinerary", () => (
    <ItineraryBodyDefaultsWrapper
      itinerary={walkTransitWalkTransitWalkItinerary}
    />
  ))
  .add("ItineraryBody with bike-rental itinerary", () => (
    <ItineraryBodyDefaultsWrapper itinerary={bikeRentalItinerary} />
  ))
  .add("ItineraryBody with E-scooter-rental itinerary", () => (
    <ItineraryBodyDefaultsWrapper itinerary={eScooterRentalItinerary} />
  ))
  .add("ItineraryBody with park and ride itinerary", () => (
    <ItineraryBodyDefaultsWrapper itinerary={parkAndRideItinerary} />
  ))
  .add("ItineraryBody with bike rental + transit itinerary", () => (
    <ItineraryBodyDefaultsWrapper
      itinerary={bikeRentalTransitBikeRentalItinerary}
    />
  ))
  .add("ItineraryBody with E-scooter rental + transit itinerary", () => (
    <ItineraryBodyDefaultsWrapper
      itinerary={eScooterRentalTransiteScooterRentalItinerary}
    />
  ))
  .add("ItineraryBody with TNC + transit itinerary", () => (
    <ItineraryBodyDefaultsWrapper itinerary={tncTransitTncItinerary} />
  ))
  .add("otp-rr ItineraryBody with walk-only itinerary", () => (
    <OtpRRItineraryBodyWrapper itinerary={walkOnlyItinerary} />
  ))
  .add("otp-rr ItineraryBody with bike-only itinerary", () => (
    <OtpRRItineraryBodyWrapper itinerary={bikeOnlyItinerary} />
  ))
  .add("otp-rr ItineraryBody with walk-transit-walk itinerary", () => (
    <OtpRRItineraryBodyWrapper itinerary={walkTransitWalkItinerary} />
  ))
  .add("otp-rr ItineraryBody with bike-transit-bike itinerary", () => (
    <OtpRRItineraryBodyWrapper itinerary={bikeTransitBikeItinerary} />
  ))
  .add("otp-rr ItineraryBody with walk-interlined-transit itinerary", () => (
    <OtpRRItineraryBodyWrapper itinerary={walkInterlinedTransitItinerary} />
  ))
  .add("otp-rr ItineraryBody with walk-transit-transfer itinerary", () => (
    <OtpRRItineraryBodyWrapper
      itinerary={walkTransitWalkTransitWalkItinerary}
    />
  ))
  .add("otp-rr ItineraryBody with bike-rental itinerary", () => (
    <OtpRRItineraryBodyWrapper itinerary={bikeRentalItinerary} />
  ))
  .add("otp-rr ItineraryBody with E-scooter-rental itinerary", () => (
    <OtpRRItineraryBodyWrapper itinerary={eScooterRentalItinerary} />
  ))
  .add("otp-rr ItineraryBody with park and ride itinerary", () => (
    <OtpRRItineraryBodyWrapper itinerary={parkAndRideItinerary} />
  ))
  .add("otp-rr ItineraryBody with bike rental + transit itinerary", () => (
    <OtpRRItineraryBodyWrapper
      itinerary={bikeRentalTransitBikeRentalItinerary}
    />
  ))
  .add("otp-rr ItineraryBody with E-scooter rental + transit itinerary", () => (
    <OtpRRItineraryBodyWrapper
      itinerary={eScooterRentalTransiteScooterRentalItinerary}
    />
  ))
  .add("otp-rr ItineraryBody with TNC + transit itinerary", () => (
    <OtpRRItineraryBodyWrapper itinerary={tncTransitTncItinerary} />
  ))
  .add("otp-rr ItineraryBody with Individual Leg Fare Components", () => (
    <OtpRRItineraryBodyWrapper
      itinerary={fareComponentsItinerary}
      showRouteFares
    />
  ))
  .add("otp-rr ItineraryBody and custom TimeColumnContent", () => (
    <OtpRRItineraryBodyWrapper
      itinerary={tncTransitTncItinerary}
      TimeColumnContent={CustomTimeColumnContent}
    />
  ));
