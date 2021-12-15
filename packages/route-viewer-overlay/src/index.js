import coreUtils from "@opentripplanner/core-utils";
import PropTypes from "prop-types";
import React from "react";
import {
  FeatureGroup,
  GeoJSON,
  MapLayer,
  Polyline,
  withLeaflet
} from "react-leaflet";
import bezier from "@turf/bezier-spline";

import polyline from "@mapbox/polyline";

// helper fn to check if geometry has been populated for all patterns in route
const isGeomComplete = routeData => {
  return (
    routeData &&
    routeData.patterns &&
    Object.values(routeData.patterns).every(
      ptn => typeof ptn.geometry !== "undefined"
    )
  );
};

/**
 * An overlay that will display all polylines of the patterns of a route.
 */
class RouteViewerOverlay extends MapLayer {
  componentDidMount() {}

  // TODO: determine why the default MapLayer componentWillUnmount() method throws an error
  componentWillUnmount() {}

  componentDidUpdate(prevProps) {
    // if pattern geometry just finished populating, update the map points
    if (
      !isGeomComplete(prevProps.routeData) &&
      isGeomComplete(this.props.routeData)
    ) {
      const allPoints = Object.values(this.props.routeData.patterns).reduce(
        (acc, ptn) => {
          return acc.concat(polyline.decode(ptn.geometry.points));
        },
        []
      );
      this.props.leaflet.map.fitBounds(allPoints);
    }
  }

  createLeafletElement() {}

  updateLeafletElement() {}

  render() {
    const { path, routeData } = this.props;

    if (!routeData || !routeData.patterns) return <FeatureGroup />;

    const routeColor = routeData.color ? `#${routeData.color}` : path.color;
    const segments = [];
    Object.values(routeData.patterns).forEach(pattern => {
      if (!pattern.geometry) return;
      if (pattern.arc) {
        // We use the stops to generate the arc, so they must be present
        if (!pattern.stops) return;
        // const coordinates = pattern.stops
        //   .filter(stop => !!stop?.geometries?.geoJson?.coordinates)
        //   .map(stop => stop.geometries.geoJson.coordinates);
        const origin = pattern.stops[0].geometries.geoJson.coordinates;
        const dest =
          pattern.stops[pattern.stops.length - 1].geometries.geoJson
            .coordinates;
        const arc = bezier({ coordinates: [origin, dest] }, { sharpness: 0.1 });

        segments.push(<GeoJSON data={[arc]} />);
      } else {
        const pts = polyline.decode(pattern.geometry.points);
        segments.push(
          <Polyline
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...path}
            color={routeColor}
            key={pattern.id}
            positions={pts}
          />
        );
      }
    });

    return segments.length > 0 ? (
      <FeatureGroup>
        <>{segments}</>
      </FeatureGroup>
    ) : (
      <FeatureGroup />
    );
  }
}

RouteViewerOverlay.propTypes = {
  /**
   * Leaflet path properties to use to style each polyline that represents a
   * pattern of the route. Only a few of the items are actually used.
   *
   * See https://leafletjs.com/reference-1.6.0.html#path
   */
  path: coreUtils.types.leafletPathType,
  /**
   * This represents data about a route as obtained from a transit index.
   * Typically a route has more data than these items, so this is only a list of
   * the properties that this component actually uses.
   */
  routeData: PropTypes.shape({
    color: PropTypes.string,
    patterns: PropTypes.objectOf(
      PropTypes.shape({
        geometry: coreUtils.types.encodedPolylineType,
        id: PropTypes.string.isRequired
      }).isRequired
    )
  })
};

RouteViewerOverlay.defaultProps = {
  path: {
    color: "#00bfff",
    opacity: 1,
    weight: 4
  }
};

export default withLeaflet(RouteViewerOverlay);
