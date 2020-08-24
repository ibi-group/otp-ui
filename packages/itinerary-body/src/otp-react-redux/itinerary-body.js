import styled from "styled-components";

import ItineraryBody from "../index";
import * as Styled from "../styled";

const StyledItineraryBody = styled(ItineraryBody)`
  font-size: 16px;

  * {
    box-sizing: border-box;
    font-family: Hind, sans-serif;
  }

  ${Styled.DetailsColumn} {
    border: 0;
    display: table-cell;
    font-size: 13px;
    padding-bottom: 0;
    padding-top: 4px;
    transform: inherit;
  }

  ${Styled.InterlineDot} {
    margin-left: -18px;
    margin-right: 3px;
  }

  ${Styled.LegDescriptionRouteShortName} {
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
    height: 24px;
    line-height: 1.5;
    margin-right: 8px;
    min-width: 24px;
    padding: 2px 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${Styled.LineColumn} {
    display: table-cell;
    max-width: 20px;
    width: 20px;
    padding: 0;
    position: relative;
  }

  ${Styled.PlaceHeader} {
    color: #000;
    font-size: 18px;
    font-weight: 500;
    line-height: 20px;
    padding-left: 4px;
  }

  ${Styled.PlaceName} {
    height: inherit;
    white-space: normal;
  }

  ${Styled.PlaceRowWrapper} {
    display: table;
    width: 100%;
  }

  ${Styled.StopMarker} {
    margin-left: -17px;
  }

  ${Styled.TimeColumn} {
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
