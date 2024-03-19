import React, { useCallback, useEffect, useState } from 'react'
import L, { Map as LeafletMap, tileLayer } from 'leaflet'
import type { MapOptions, GeoJSON } from 'leaflet'
import type { LeafletContextInterface } from './Map.types'

import 'leaflet/dist/leaflet.css'

const CONTEXT_VERSION = '1.9.3'

function createLeafletContext(map: LeafletMap): LeafletContextInterface {
  return Object.freeze({ __version: CONTEXT_VERSION, map })
}
// need refactoring for geoData type
function Map({ geoData, geoDataOld }: { geoData?: any; geoDataOld?: any }) {
  const [center, setCenter] = useState([0, 0]) // default center of the map and use hook for probable future changes

  const mapOptions = {
    center,
    zoom: 3,
    maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 360)),
    preferCanvas: true,
    maxBoundsViscosity: 1.0,
  } as MapOptions

  const tileLayerOptions = {
    maxNativeZoom: 18,
    maxZoom: 18,
    minZoom: 3,
    detectRetina: true,
  } as L.TileLayerOptions

  const [context, setContext] = useState<LeafletContextInterface | null>(null)
  const mapRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null && context === null) {
      const map = new LeafletMap(node, mapOptions)

      tileLayer('http://mt0.google.com/vt/lyrs=s,h&hl=en&x={x}&y={y}&z={z}&s=Ga', tileLayerOptions).addTo(map)

      function onEachFeature(feature: any, layer: any) {
        if (feature.properties && feature.properties.shapeName) {
          layer.bindPopup(feature.properties.name)
        }
      }

      if (geoData) {
        L.geoJSON(geoData, {
          onEachFeature: onEachFeature,
        }).addTo(map)
      }
      if (geoDataOld) {
        L.geoJSON(geoDataOld, {
          onEachFeature: onEachFeature,
          style: {
            color: '#ff000081',
            fillColor: 'red',
            opacity: 0.4,
          },
        }).addTo(map)
      }
      map.setView(mapOptions.center || [0, 0], mapOptions.zoom)
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

export default React.memo(Map)
