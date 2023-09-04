import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from "react-simple-maps"
import Link from "next/link";
import * as geo from "./geojson.json"
import * as newgeo from "./output.json"
import { ZoomControl } from "react-leaflet";
import { useState } from "react";

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json"

interface MapInterface {
    isVisible: boolean;
    editMode: boolean;
    changeState: (value: boolean) => void;
}

const markers = [
    // { markerOffset: -10, name: "Buenos Aires", coordinates: [-58.3816, -34.6037] },
    // { markerOffset: -10, name: "La Paz", coordinates: [-68.1193, -16.4897] },
    // { markerOffset: -10, name: "Brasilia", coordinates: [-47.8825, -15.7942] },
    // { markerOffset: 15, name: "Santiago", coordinates: [-70.6693, -33.4489] },
    // { markerOffset: -10, name: "Bogota", coordinates: [-74.0721, 4.711] },
    // { markerOffset: 15, name: "Quito", coordinates: [-78.4678, -0.1807] },
    // { markerOffset: -10, name: "Georgetown", coordinates: [-58.1551, 6.8013] },
    // { markerOffset: -10, name: "Asuncion", coordinates: [-57.5759, -25.2637] },
    // { markerOffset: 15, name: "Paramaribo", coordinates: [-55.2038, 5.852] },
    // { markerOffset: 15, name: "Montevideo", coordinates: [-56.1645, -34.9011] },
    // { markerOffset: -10, name: "Caracas", coordinates: [-66.9036, 10.4806] },
    // { markerOffset: -10, name: "Lima", coordinates: [-77.0428, -12.0464] },
    { markerOffset: -10, name: "Kenya", coordinates: [37.906193, -0.023559] }
  ];
  
  const ImpactMap = ({isVisible, changeState, editMode}: MapInterface) => {
    const [scaleFactor, setScaleFactor] = useState(1);
    return (
        <>
        {editMode && <button onClick={() => changeState(!isVisible)}>{!isVisible?"Visible!":"Invisible!"}</button>}
        {isVisible && 
        <div style={{ width: "100%", aspectRatio: "16/9", border: "1px solid black" }}>
            <ComposableMap projection="geoMercator">
                <ZoomableGroup center={[0, 15]} zoom={1} maxZoom={99} onMove={({ zoom }) => setScaleFactor(zoom)}>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography 
                                key={geo.rsmKey} 
                                geography={geo} 
                                style={{
                                    default: { outline: "none", fill: "#20df7f", stroke: "transparent", strokeWidth: (1 / scaleFactor)},
                                    hover: { outline: "none", fill: "#20df7f", stroke: "white", strokeWidth: (1 / scaleFactor) },
                                    pressed: { outline: "none" },
                                }}
                            />
                        ))
                        }
                    </Geographies>
                    {markers.map(({ name, coordinates, markerOffset }) => (
                        <Marker key={name} coordinates={coordinates}>
                        <circle r={8 / scaleFactor} fill="#F00" stroke="#fff" strokeWidth={2 / scaleFactor} />
                        <text
                            textAnchor="middle"
                            y={markerOffset}
                            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                        >
                            {name}
                        </text>
                        </Marker>
                    ))}
                    {/* <Geographies geography={geo}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                            <Geography 
                            key={geo.rsmKey} 
                            geography={geo} 
                            fill="none"
                            stroke="red"
                            strokeWidth={0.2}
                            style={{
                                default: { outline: "none", border: "2px solid red" },
                                hover: { outline: "none" },
                                pressed: { outline: "none" },
                            }}
                            />
                        ))
                        }
                    </Geographies> */}
                </ZoomableGroup>
            </ComposableMap>
        </div>
}
        </>
    )
}

export default ImpactMap