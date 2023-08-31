import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import type { editMode, treesData, userTrees } from "./impactTypes"
import React, { useEffect, useState,  } from 'react';
import * as geo from "./geojson.json"
import { useAuth } from "@/app/state"
import InfoBox from "./infoBox";
import Image from 'next/image'
import Link from 'next/link'

import styles from './impact.module.scss'

const userTreesDefaults: userTrees = {
    legacy_uk: 0,
    legacy_offshore: 0,
    legacy_uk_co2: 0,
    legacy_offshore_co2: 0,
    legacy_credit: 0,
    veritree_uk: 0,
    veritree_offshore: 0,
    veritree_uk_co2: 0,
    veritree_offshore_co2: 0,
    total_uk: 0,
    total_offshore: 0,
    total_uk_co2: 0,
    total_offshore_co2: 0
}


const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json"

  function saveMap(mapData: string) {
    const { user, login, logout, user_id } = useAuth();
    const sendWidgetData = async (mapData: string) => {
        try {
            const res = await fetch(`https://app.carma.earth/version-7b11/api/1.1/wf/get_user_impact?user_id=${user_id}`, {
                method: 'POST',
                body: JSON.stringify(mapData),
                headers: { "Content-Type": "application/json" }
            })
            const answer = await res.json();
        } catch(error) {
            console.log(error)
        }
        
    };
  }
  
export default function Impact(){
    const [treesData, setTreesData] = useState<userTrees>(userTreesDefaults);
    const { user, login, logout, user_id } = useAuth();
    const [editModeEnabled, setEditModeEnabled] = useState(false);

    console.log(user)
    useEffect(() => {
        fetch(`https://app.carma.earth/api/1.1/wf/get_user_trees?user_id=${user_id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setTreesData({legacy_uk: data.response.total_tree_uk, 
                        legacy_offshore: data.response.total_tree_offshore, 
                        legacy_uk_co2: data.response.carbon_removed_uk, 
                        legacy_offshore_co2: data.response.carbon_removed_offshore, 
                        legacy_credit:0, 
                        veritree_uk: 0,
                        veritree_offshore: 0,
                        veritree_uk_co2: 0,
                        veritree_offshore_co2: 0,
                        total_uk: data.response.total_tree_uk+0,
                        total_offshore: data.response.total_tree_offshore+0,
                        total_uk_co2: data.response.carbon_removed_uk+0,
                        total_offshore_co2: data.response.carbon_removed_offshore+0
                    })
        })
        .catch((err) =>{
            console.log(err.message);
        });
    },[])

    const isEditing = editModeEnabled ? styles.editing : "";

    return (
        <div className={styles.impactCluster}>
            <div className={styles.impactMap}>
                <div className={`${styles.infoBoxCluster} ${styles.upperCluster}`}>
                    <InfoBox treesData={treesData} editMode={editModeEnabled}/>
                    <InfoBox treesData={treesData} editMode={editModeEnabled}/>
                    <InfoBox treesData={treesData} editMode={editModeEnabled}/>
                </div>            
                <ComposableMap projection="geoMercator" height={480} width={640} style={{ width: "640px", height: "480px" }} >
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
                <div className={`${styles.infoBoxCluster} ${styles.upperCluster}`}>
                <InfoBox treesData={treesData} editMode={editModeEnabled}/>
                <InfoBox treesData={treesData} editMode={editModeEnabled}/>
                <InfoBox treesData={treesData} editMode={editModeEnabled}/>
                </div>
            </div>
            <div className={`${styles.editCluster} ${isEditing}`}>
                <button onClick={() => setEditModeEnabled(!editModeEnabled)}>{!editModeEnabled?"Edit!":"Editing!"}</button>
                {editModeEnabled? (<button onClick={() => saveMap("mapData")}>Save</button>):""}
            </div>
        </div>
      )
}