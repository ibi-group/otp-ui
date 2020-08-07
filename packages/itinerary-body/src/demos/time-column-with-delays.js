import { isTransit } from "@opentripplanner/core-utils/lib/itinerary";
import {
  legType,
  timeOptionsType
} from "@opentripplanner/core-utils/lib/types";
import { formatTime } from "@opentripplanner/core-utils/lib/time";
import PropTypes from "prop-types";
import React from "react";

/**
 * This component displays the scheduled departure/arrival time for a leg,
 * and, for transit legs, displays any delays or earliness where applicable.
 */
export default function TimeColumnWithDelays({
  isDestination,
  leg,
  timeOptions
}) {
  const time = isDestination ? leg.endTime : leg.startTime;
  const formattedTime = time && formatTime(time, timeOptions);
  const isTransitLeg = isTransit(leg.mode);

  if (leg.realTime) {
    // Delay in seconds.
    const delay = isDestination ? leg.arrivalDelay : leg.departureDelay;
    // Time is in milliseconds.
    const originalTime = time - delay * 1000;
    const originalFormattedTime =
      originalTime && formatTime(originalTime, timeOptions);

    // Rendering details to be discussed. Following OBA's color convention:
    // - Early -> red (warns people they can miss their ride)
    // - Delay -> blue
    // - On-time -> green
    // On-time thresholds: to be discussed.
    const isOnTime = delay >= -60 && delay <= 120;

    let color;
    let statusText;
    if (isOnTime) {
      color = "#009900";
      statusText = "On time";
    } else if (delay < 0) {
      color = "#ff0000";
      statusText = "Early";
    } else if (delay > 0) {
      color = "#0000ff";
      statusText = "Delayed";
    }

    // Absolute delay in ronded minutes, for display
    const delayInMinutes = Math.abs(
      Math.round((isDestination ? leg.arrivalDelay : leg.departureDelay) / 60)
    );

    return (
      <div>
        <div style={{ lineHeight: "1em" }}>
          {/* Strike the original scheduled time */}
          <div style={{ textDecoration: "line-through" }}>
            {originalFormattedTime}
          </div>
          <div style={{ color }}>{formattedTime}</div>
        </div>
        <div
          style={{
            color,
            fontSize: "80%",
            lineHeight: "1em",
            marginTop: "4px"
          }}
        >
          {statusText}
          <br />
          {!isOnTime && <>{delayInMinutes}&nbsp;min</>}
        </div>
      </div>
    );
  }

  return (
    <>
      <div>{formattedTime}</div>
      {/* Add the scheduled mention for transit legs only. */}
      {isTransitLeg && (
        <div style={{ fontSize: "80%", lineHeight: "1em" }}>Scheduled</div>
      )}
    </>
  );
}

TimeColumnWithDelays.propTypes = {
  isDestination: PropTypes.bool.isRequired,
  leg: legType.isRequired,
  timeOptions: timeOptionsType
};

TimeColumnWithDelays.defaultProps = {
  timeOptions: null
};
