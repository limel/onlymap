import { FC, } from "react";
// import { MapContainer, TileLayer, } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Map } from "./Map";
// import data from '../../polygons-data/'
import "../app.scss";

// import TopoJSON from "./TopoJSON";
// import {Overlay, BaseLayer} from 'leaflet'
// import { GeoJSON, Pane, BaseLayer, Overlay } from "react-leaflet";

export const MainMap: FC<any> = ({ isDarkTheme }) => {

  return (
    <div className="mainmap__wrapper">
      <Map />
      {/* <MapContainer
        center={[49.0238, 11.2292]}
        minZoom={window.innerWidth <= 768 ? 2 : 3}
        zoom={3}
        maxZoom={18}
        // maxBounds={L.latLngBounds(L.latLng(-90, -170), L.latLng(90, 190))}
        maxBoundsViscosity={1}
        className="mainmap"
      > */}
        {/* main */}
        {/* {isDarkTheme ? (
          <TileLayer url="https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default//GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpg" />
        ) : (
          // main
          <TileLayer url="http://mt0.google.com/vt/lyrs=s,h&hl=en&x={x}&y={y}&z={z}&s=Ga" />
          // <TileLayer url="https://api.mapbox.com/styles/v1/mapooze/clhrs78wc002j01pnghet7uvg/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwb296ZSIsImEiOiJjbGh5d3lxZWswMDU4M251bmx0MHd4MnFwIn0.3LdPAXjgyAYXvYQKu5mtDA" />

          // prod
          // <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        )}

        {data.map((polygonsData: any, index: number) => (
          <GeoJSON key={index} data={polygonsData} />
        ))} */}

        {/* {activeCity && (
          // @ts-ignore
          <Popup position={activeCity.position}>
            <div>
              попап с будущими данными
              <h2>{activeCity.name}</h2>
              <p>Население: {activeCity.population}</p>
            </div>
          </Popup>
        )} */}

{/* <MapContainer> 
    <BaseLayer preferCanvas={true} />
    <Pane name = "alwaysOnTop" style={{zIndex:400}}>
        <Overlay preferCanvas={false} />
    </Pane>
</MapContainer> */}

      {/* </MapContainer> */}
    </div>
  );
};
