import { useRef, useEffect } from "react";
import { GeoJSON } from "react-leaflet";
import * as topojson from "topojson-client";

export default function TopoJSON(props: any) {
  const layerRef = useRef(null);
  const { data, ...otherProps } = props;

  function addData(layer: any, jsonData: any) {
    if (jsonData.type === "Topology") {
      for (let key in jsonData.objects) {
        let geojson = topojson.feature(jsonData, jsonData.objects[key]);
        layer.addData(geojson);
      }
    } else {
      layer.addData(jsonData);
    }
  }

  function onEachFeature(feature: any, layer: any) {
    if (feature.properties) {
      const { VARNAME_3, NAME_0 } = feature.properties;
      layer.bindPopup(`${VARNAME_3}, ${NAME_0}`);
    }
  }

  useEffect(() => {
    const layer = layerRef.current;
    addData(layer, props.data);
  }, [props.data]);

  return (
    <GeoJSON ref={layerRef} {...otherProps}  style={() => ({
      color: "red",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.3,
    })} onEachFeature={onEachFeature} />
  );
}
