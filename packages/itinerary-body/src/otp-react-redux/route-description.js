import { legType } from "@opentripplanner/core-utils/lib/types";
import PropTypes from "prop-types";
import React from "react";

import * as Styled from "../styled";

export default function RouteDescription({ leg, LegIcon }) {
  const { headsign, routeLongName, routeShortName } = leg;
  return (
    <Styled.LegDescriptionForTransit>
      <Styled.LegIconContainer>
        <LegIcon leg={leg} />
      </Styled.LegIconContainer>
      {routeShortName && (
        <Styled.LegDescriptionRouteShortName title={routeShortName}>
          {routeShortName}
        </Styled.LegDescriptionRouteShortName>
      )}
      <Styled.LegDescriptionLongContainer>
        <Styled.LegDescriptionRouteLongName>
          {routeLongName}
        </Styled.LegDescriptionRouteLongName>
        {headsign && (
          <Styled.LegDescriptionHeadsignPrefix>
            {" to "}
          </Styled.LegDescriptionHeadsignPrefix>
        )}
        {headsign && (
          <Styled.LegDescriptionHeadsign>
            {headsign}
          </Styled.LegDescriptionHeadsign>
        )}
      </Styled.LegDescriptionLongContainer>
    </Styled.LegDescriptionForTransit>
  );
}

RouteDescription.propTypes = {
  leg: legType.isRequired,
  LegIcon: PropTypes.elementType.isRequired
};
