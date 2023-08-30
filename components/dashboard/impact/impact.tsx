import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import React, { useEffect, useState,  } from 'react';
import * as geo from "./geojson.json"
import { useAuth } from "@/app/state"
import InfoBox from "./infoBox";
import Image from 'next/image'
import Link from 'next/link'

import styles from './impact.module.scss'

type userTrees = {
    legacy_uk: number;
    legacy_offshore: number;
    legacy_uk_co2: number;
    legacy_offshore_co2: number;
    legacy_credit: number;
}

const userTreesDefaults: userTrees = {
    legacy_uk: 0,
    legacy_offshore: 0,
    legacy_uk_co2: 0,
    legacy_offshore_co2: 0,
    legacy_credit: 0,
}

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json"

  
export default function Impact(){
    const [trees, setTrees] = useState<userTrees>();
    const { user, login, logout, user_id } = useAuth();
    console.log(user)
    useEffect(() => {
        fetch(`https://app.carma.earth/api/1.1/wf/get_user_trees?user_id=${user_id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setTrees({legacy_uk: data.response.total_tree_uk, legacy_offshore: data.response.total_tree_offshore, legacy_uk_co2: data.response.carbon_removed_uk, legacy_offshore_co2: data.response.carbon_removed_offshore, legacy_credit:0 })
        })
        .catch((err) =>{
            console.log(err.message);
        });
    },[])

    return (
        <div className={styles.impactMap}>
            <div className={`${styles.infoBoxCluster} ${styles.upperCluster}`}>
                <InfoBox display="uk" uk_trees={trees?.legacy_uk}/>
                <InfoBox display="offshore" offshore_trees={trees?.legacy_offshore}/>
                <InfoBox display="uk" uk_trees={trees?.legacy_uk}/>
            </div>            
            <ComposableMap projection="geoMercator">
                <ZoomableGroup center={[0, 15]} zoom={1} maxZoom={99}>
                    <Geographies geography={geo}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                            <Geography 
                            key={geo.rsmKey} 
                            geography={geo} 
                            fill="none"
                            stroke="red"
                            />
                        ))
                        }
                    </Geographies>
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
                </ZoomableGroup>
            </ComposableMap>
            <div className={`${styles.infoBoxCluster} ${styles.upperCluster}`}>
                <InfoBox display="uk" uk_trees={trees?.legacy_uk}/>
                <InfoBox display="offshore" offshore_trees={trees?.legacy_offshore}/>
                <InfoBox display="uk" uk_trees={trees?.legacy_uk}/>
            </div>
        </div>
      )
}