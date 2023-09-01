import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import * as geo from "./geojson.json"

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json"

const ImpactMap = () => {

    return (
        <div style={{ width: "640px", height: "480px" }}>
        <ComposableMap projection="geoMercator">
            <ZoomableGroup center={[0, 15]} zoom={1} maxZoom={99}>
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                    geographies.map((geo) => (
                        <Geography 
                            key={geo.rsmKey} 
                            geography={geo} 
                            fill="#20df7f"
                            style={{
                                default: { outline: "none" },
                                hover: { outline: "none" },
                                pressed: { outline: "none" },
                            }}
                        />
                    ))
                    }
                </Geographies>
                <Geographies geography={geo}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                        <Geography 
                        key={geo.rsmKey} 
                        geography={geo} 
                        fill="none"
                        />
                    ))
                    }
                </Geographies>
            </ZoomableGroup>
        </ComposableMap>
    </div>
    //     <div className="map" style={{height: "400px", width: "800px"}}>
    //     <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
    //         <TileLayer
    //             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //             url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    //         />
    //         <Marker position={[51.505, -0.09]}>
    //             <Popup>
    //                 A pretty CSS3 popup. <br /> Easily customizable.
    //             </Popup>
    //         </Marker>
    //     </MapContainer>
    //   </div>
    // <VectorMap {...svgMap} />
    )
}

export default ImpactMap