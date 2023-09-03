import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from "react-simple-maps"
import Link from "next/link";
import * as geo from "./geojson.json"

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json"

interface MapInterface {
    isVisible: boolean;
    editMode: boolean;
    changeState: (value: boolean) => void;
}

const ImpactMap = ({isVisible, changeState, editMode}: MapInterface) => {
    return (
        <>
        {editMode && <button onClick={() => changeState(!isVisible)}>{!isVisible?"Visible!":"Invisible!"}</button>}
        {isVisible && 
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
                    <Marker coordinates={[-102, 38]} fill="#777">
                        <div>
                            <p>USA</p>
                            <Link href="http://www.google.com">LOOK!</Link>
                        </div>
                    </Marker>
                    {/* <Geographies geography={geo}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                            <Geography 
                            key={geo.rsmKey} 
                            geography={geo} 
                            fill="none"
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