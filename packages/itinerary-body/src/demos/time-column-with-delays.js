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

    // TODO: refine on-time thresholds.
    // const isOnTime = delay >= -60 && delay <= 120;
    const isOnTime = delay === 0;

    // Reusing stop viewer colors.
    let color;
    let statusText;
    if (isOnTime) {
      color = "#5cb85c";
      statusText = "on time";
    } else if (delay < 0) {
      color = "#337ab7";
      statusText = "early";
    } else if (delay > 0) {
      color = "#d9534f";
      statusText = "late";
    }

    // Absolute delay in rounded minutes, for display purposes.
    const delayInMinutes = Math.abs(
      Math.round((isDestination ? leg.arrivalDelay : leg.departureDelay) / 60)
    );

    let renderedTime;
    if (!isOnTime) {
      // If the transit vehicle is not on time, strike the original scheduled time
      // and display the updated time underneath.
      renderedTime = (
        <div style={{ lineHeight: "1em" }}>
          {" "}
          {/* styled */}
          <div
            style={{
              textDecoration: "line-through #000000"
            }}
          >
            {originalFormattedTime}
          </div>
          <div style={{ color }}>{formattedTime}</div> {/* styled */}
        </div>
      );
    } else {
      renderedTime = <div style={{ color }}>{formattedTime}</div>; // styled
    }

    return (
      <div>
        <div>{renderedTime}</div>
        <div
          style={{
            color,
            fontSize: "80%",
            lineHeight: "1em",
            marginTop: "4px"
          }}
        >
          {" "}
          {/* styled except color */}
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
        <div style={{ fontSize: "80%", lineHeight: "1em", marginTop: "4px" }}>
          {" "}
          {/* styled */}
          Scheduled
        </div>
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
