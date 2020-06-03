import styled from "styled-components";

import ItineraryBody from "..";
import * as ItineraryBodyClasses from "../styled";

const StyledItineraryBody = styled(ItineraryBody)`
  font-family: Hind, sans-serif;
  font-size: 16px;

  * {
    box-sizing: border-box;
  }

  ${ItineraryBodyClasses.DetailsColumn} {
    border: 0;
    display: table-cell;
    font-size: 13px;
    padding-bottom: 0;
    padding-top: 4px;
    transform: inherit;
  }

  ${ItineraryBodyClasses.InterlineDot} {
    margin-left: -18px;
    margin-right: 3px;
  }

  ${ItineraryBodyClasses.LegDescriptionRouteShortName} {
    background-color: rgb(15, 106, 172);
    border-color: white;
    border-image: initial;
    border-radius: 12px;
    border-style: solid;
    border-width: 1px;
    box-shadow: rgb(0, 0, 0) 0px 0px 0.25em;
    color: white;
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    height: 21px;
    margin-right: 8px;
    padding-top: 2px;
    text-align: center;
    width: 24px;
  }

  ${ItineraryBodyClasses.LineColumn} {
    display: table-cell;
    max-width: 20px;
    width: 20px;
    padding: 0;
    position: relative;
  }

  ${ItineraryBodyClasses.PlaceHeader} {
    color: #000;
    font-size: 18px;
    font-weight: 500;
    line-height: 20px;
    padding-left: 4px;
  }

  ${ItineraryBodyClasses.PlaceName} {
    height: inherit;
    white-space: normal;
  }

  ${ItineraryBodyClasses.PlaceRowWrapper} {
    display: table;
    width: 100%;
  }

  ${ItineraryBodyClasses.StopMarker} {
    margin-left: -17px;
  }

  ${ItineraryBodyClasses.TimeColumn} {
    color: #999;
    display: table-cell;
    font-size: 14px;
    padding-right: 4px;
    padding-top: 1px;
    text-align: right;
    vertical-align: top;
    width: 60px;
  }
`;

export default StyledItineraryBody;
