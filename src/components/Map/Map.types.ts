import { Layer, LayerGroup, Control, Map as LeafletMap } from 'leaflet'

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
