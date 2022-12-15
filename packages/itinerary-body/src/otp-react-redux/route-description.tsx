import React, { ReactElement } from "react";

import RouteLongName from "../defaults/route-long-name";
import * as S from "../styled";
import { RouteDescriptionProps } from "../types";

export default function RouteDescription({
  leg,
  LegIcon,
  onlyShowTripHeadsign
}: RouteDescriptionProps): ReactElement {
  const { routeShortName } = leg;
  return (
    <S.LegDescriptionForTransit>
      <S.LegIconAndRouteShortName>
        <S.LegIconContainer>
          <LegIcon leg={leg} />
        </S.LegIconContainer>
        {routeShortName && (
          <S.LegDescriptionRouteShortName>
            {routeShortName}
          </S.LegDescriptionRouteShortName>
        )}
      </S.LegIconAndRouteShortName>
      <S.LegDescriptionRouteLongName>
        <RouteLongName leg={leg} onlyShowHeadsign={onlyShowTripHeadsign} />
      </S.LegDescriptionRouteLongName>
    </S.LegDescriptionForTransit>
  );
}
