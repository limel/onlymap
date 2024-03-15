import type { Layer, LayerGroup, FitBoundsOptions, LatLngBoundsExpression, MapOptions } from 'leaflet'
import L, { Control, Map as LeafletMap, tileLayer } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { HTMLProps } from 'react'
import { useCallback, useEffect, useState } from 'react'
import geoData from '../../polygons-data/ausss.json'

export type ControlledLayer = {
  addLayer(layer: Layer): void
  removeLayer(layer: Layer): void
}

export type LeafletContextInterface = Readonly<{
  __version: number | string
  map: LeafletMap
  layerContainer?: ControlledLayer | LayerGroup
  layersControl?: Control.Layers
  overlayContainer?: Layer
  pane?: string
}>

const CONTEXT_VERSION = '1.9.3'

function createLeafletContext(map: LeafletMap): LeafletContextInterface {
  return Object.freeze({ __version: CONTEXT_VERSION, map })
}

type DivProps = HTMLProps<HTMLDivElement>

export interface MapContainerProps extends MapOptions, DivProps {
  // geoData?: any
  bounds?: LatLngBoundsExpression
}

export function Map({
  // geoData,
  center = [0, 0],
  zoom = 3,
  bounds,
  maxBounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 360)),
  ...options
}: MapContainerProps) {
  const [context, setContext] = useState<LeafletContextInterface | null>(null)
  console.log(context)
  const mapRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null && context === null) {
      const map = new LeafletMap(node, { maxBounds, preferCanvas: true, maxBoundsViscosity: 1.0, ...options })

      tileLayer('http://mt0.google.com/vt/lyrs=s,h&hl=en&x={x}&y={y}&z={z}&s=Ga', {
        // attribution: '',
        maxNativeZoom: 18,
        maxZoom: 18,
        minZoom: 3,
        detectRetina: true,
      }).addTo(map)

      if (geoData) {
        L.geoJSON(geoData).addTo(map)
      }

      map.setView(center, zoom)
      setContext(createLeafletContext(map))
    }
  }, [])

  useEffect(() => {
    return () => {
      context?.map.remove()
    }
  }, [])

  return <div className="mainmap" ref={mapRef} />
}
