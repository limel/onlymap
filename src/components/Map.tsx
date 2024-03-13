import type {
  Layer,
  LayerGroup,
  FitBoundsOptions,
  LatLngBoundsExpression,
  MapOptions,
} from "leaflet";
import L,{ Control, Map as LeafletMap, tileLayer } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { HTMLProps } from "react";
import { useCallback, useEffect, useState } from "react";

export type ControlledLayer = {
  addLayer(layer: Layer): void;
  removeLayer(layer: Layer): void;
};

export type LeafletContextInterface = Readonly<{
  __version: number;
  map: LeafletMap;
  layerContainer?: ControlledLayer | LayerGroup;
  layersControl?: Control.Layers;
  overlayContainer?: Layer;
  pane?: string;
}>;

const CONTEXT_VERSION = 1;

function createLeafletContext(map: LeafletMap): LeafletContextInterface {
  return Object.freeze({ __version: CONTEXT_VERSION, map });
}

type DivProps = HTMLProps<HTMLDivElement>;

export interface MapContainerProps extends MapOptions, DivProps {
  bounds?: LatLngBoundsExpression;
  boundsOptions?: FitBoundsOptions;
  whenReady?: () => void;
}

export function Map({
  center = [0, 0],
  zoom = 3,
  minZoom = 3,
  maxZoom=1,
  bounds,
  maxBounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
  maxBoundsViscosity = 1.0,
  // boundsOptions = { padding: [500, 500], maxZoom: 18 },
  whenReady,
  ...options
}: MapContainerProps) {
  const [context, setContext] = useState<LeafletContextInterface | null>(null);

  const mapRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null && context === null) {
      const map = new LeafletMap(node, { zoomControl: false, ...options });

      tileLayer("http://mt0.google.com/vt/lyrs=s,h&hl=en&x={x}&y={y}&z={z}&s=Ga", {
        attribution:
          '© OpenStreetMap contributors',
      }).addTo(map);

      if (center != null && zoom != null) {
        map.setView(center, zoom);
      } else if (bounds != null) {
        map.fitBounds(bounds, boundsOptions);
      }
      if (whenReady != null) {
        map.whenReady(whenReady);
      }

      setContext(createLeafletContext(map));
    }
  }, []);

  useEffect(() => {
    return () => {
      context?.map.remove();
    };
  }, []);

  return (
      <div className="mainmap" ref={mapRef} />
  );
}
