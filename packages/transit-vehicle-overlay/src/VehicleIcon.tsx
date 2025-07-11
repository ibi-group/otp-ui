import React, { FC, ReactElement, ReactNode } from "react";

import { VehicleComponentProps } from "./types";

/**
 * Fill-in type for the icons package.
 */
export interface ModeIconProps {
  mode?: string;
}

export interface VehicleIconProps extends VehicleComponentProps {
  defaultMode?: string;
  ModeIcon: FC<ModeIconProps>;
}

/**
 * Renders the route number so it gets fitted into the icon shape.
 */
export function RouteNumberIcon({
  vehicle
}: VehicleComponentProps): ReactElement {
  const { routeShortName } = vehicle;
  const length = routeShortName?.length || 0;
  const size = Math.max(length * 8, 20);
  return routeShortName ? (
    // Render as SVG to autofit the icon regardless of the ambient font size,
    // while centering horizontally and vertically and reducing size for larger route short names
    // (see for instance https://css-tricks.com/fitting-text-to-a-container/#aa-just-use-svg).
    <svg viewBox={`0 0 ${size} ${size}`}>
      <text textAnchor="middle" x="50%" y={size / 2 + 4.5}>
        {routeShortName}
      </text>
    </svg>
  ) : (
    // Default content is an emoji, but emojis don't work in SVG mode.
    <>🚌</>
  );
}

/**
 * Renders the associated mode icon for the given transit vehicle and ModeIcon component.
 * Falls back to the route short name if no icon is found for the desired mode.
 */
export default function VehicleIcon({
  defaultMode,
  ModeIcon,
  vehicle
}: VehicleIconProps): ReactNode {
  // Try to see if content is returned by the ModeIcon function component,
  // if null, fall back to route number.
  return (
    ModeIcon({ mode: vehicle.routeType || defaultMode }) || (
      <RouteNumberIcon vehicle={vehicle} />
    )
  );
}
