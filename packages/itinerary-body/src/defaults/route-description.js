import { legType } from "@opentripplanner/core-utils/lib/types";
import React from "react";

import * as Styled from "../styled";

export default function RouteDescription({ leg }) {
  const { headsign, routeLongName, routeShortName } = leg;
  return (
    <Styled.LegDescriptionForTransit>
      {routeShortName && (
        <Styled.LegDescriptionRouteShortName title={routeShortName}>
          {routeShortName}
        </Styled.LegDescriptionRouteShortName>
      )}
      <Styled.LegDescriptionRouteLongName>
        {routeLongName}
        {headsign && (
          <span>
            <Styled.LegDescriptionHeadsignPrefix>
              {" to "}
            </Styled.LegDescriptionHeadsignPrefix>
            {headsign}
          </span>
        )}
      </Styled.LegDescriptionRouteLongName>
    </Styled.LegDescriptionForTransit>
  );
}

RouteDescription.propTypes = {
  leg: legType.isRequired
};
