import { Map } from "leaflet";
import { ChangeEvent, Component } from "react";
import { LeafletContext, withLeaflet } from "react-leaflet";

interface Props {
  leaflet: LeafletContext;
  onOverlayAdded: () => void;
  onOverlayRemoved: () => void;
  onZoomEnd: (e: ChangeEvent<Map>) => void;
}

/**
 * Captures map events so they can be handled by the containing component.
 */
class MapEvents extends Component<Props> {
  componentDidMount() {
    // Wire up map events
    const { leaflet, onOverlayAdded, onOverlayRemoved, onZoomEnd } = this.props;
    const { map } = leaflet;

    if (typeof onOverlayAdded === "function") {
      map.on("overlayadd", onOverlayAdded);
    }
    if (typeof onOverlayRemoved === "function") {
      map.on("overlayremove", onOverlayRemoved);
    }
    if (typeof onZoomEnd === "function") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore The definition of map.on does not include "zoomend" for some reason.
      map.on("zoomend", onZoomEnd);
    }
  }

  componentWillUnmount() {
    // Unwire map events
    const { leaflet, onOverlayAdded, onOverlayRemoved, onZoomEnd } = this.props;
    const { map } = leaflet;

    if (typeof onOverlayAdded === "function") {
      map.off("overlayadd", onOverlayAdded);
    }
    if (typeof onOverlayRemoved === "function") {
      map.off("overlayremove", onOverlayRemoved);
    }
    if (typeof onZoomEnd === "function") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore The definition of map.off does not include "zoomend" for some reason.
      map.off("zoomend", onZoomEnd);
    }
  }

  render() {
    // Do not render anything.
    return null;
  }
}

export default withLeaflet(MapEvents);
