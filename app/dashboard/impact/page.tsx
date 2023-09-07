"use client"
import Image from 'next/image'

import InfoBox from '@/components/dashboard/impact-map/info-box/infoBox'
import ImpactMap from '@/components/dashboard/impact-map/impact-map'

import styles from './impact.module.scss'
import React, { useEffect, useState } from 'react'
import { userTrees } from '@/components/dashboard/impactInterfaces'
import useImpactConfig from '@/components/dashboard/impactConfig'
import { useAuth } from '@/app/state'

import { SketchPicker } from 'react-color'

import dynamic from 'next/dynamic';

const saveMap = async (config: object, user_id: string | null) => {
  console.log(config)
  let widgetCode = btoa(JSON.stringify(config))
  try {
      const res = await fetch(`https://app.carma.earth/version-7b11/api/1.1/wf/set_impact_widget?user_id=${user_id}`, {
          method: 'POST',
          body: `{"widget_data":"${widgetCode}"}`,
          headers: { "Content-Type": "application/json" }
      })
      const answer = await res.json();
  } catch(error) {
      console.log(error)
  }
}

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

const defaultMapConfig = {
	infoBoxDisplay_1: "uk",
	infoBoxDisplay_2: "offshore",
	infoBoxDisplay_3: "uk",
	infoBoxDisplay_4: "offshore",
	infoBoxDisplay_5: "uk",
	infoBoxDisplay_6: "offshore",
	mapVisible: true 
}

const ImpactDashboard = () => {
  	const [treesData, setTreesData] = useState<userTrees>(userTreesDefaults);
	const [editModeEnabled, setEditModeEnabled] = useState<boolean>(false); 

	const [infoBoxDisplay_1, setInfoBoxDisplay_1] = useState("uk");
    const [infoBoxDisplay_2, setInfoBoxDisplay_2] = useState("offshore");
    const [infoBoxDisplay_3, setInfoBoxDisplay_3] = useState("uk");
    const [infoBoxDisplay_4, setInfoBoxDisplay_4] = useState("offshore");
    const [infoBoxDisplay_5, setInfoBoxDisplay_5] = useState("uk");
    const [infoBoxDisplay_6, setInfoBoxDisplay_6] = useState("offshore");
    const [mapVisible, setMapVisible] = useState(true);

	const { user_id } = useAuth();

	useEffect(() => {
		fetch(`https://app.carma.earth/version-7b11/api/1.1/wf/get_user_trees?user_id=${user_id}`)
		.then((response) => response.json())
		.then((data) => {
			setTreesData({
				legacy_uk: data.response.total_tree_uk, 
				legacy_offshore: data.response.total_tree_offshore, 
				legacy_uk_co2: data.response.carbon_removed_uk, 
				legacy_offshore_co2: data.response.carbon_removed_offshore, 
				legacy_credit:0, 
				veritree_uk: 0,
				veritree_offshore: 0,
				veritree_uk_co2: 0,
				veritree_offshore_co2: 0,
				total_uk: data.response.total_tree_uk+2,
				total_offshore: data.response.total_tree_offshore+4,
				total_uk_co2: data.response.carbon_removed_uk+0,
				total_offshore_co2: data.response.carbon_removed_offshore+0
			})
		})
		.catch((err) =>{
			console.log(err.message);
		});
		fetch(`https://app.carma.earth/version-7b11/api/1.1/wf/get_impact_widget?user_id=${user_id}`)
		.then((response) => response.json())
		.then((data) => {
			// console.log("response ",data.response.widgetData);
			if (data.response.widgetData !== undefined) {
				let savedConfig = JSON.parse(atob(data.response.widgetData))
				// console.log("correct ", JSON.parse(atob(data.response.widgetData)))
				setInfoBoxDisplay_1(savedConfig.infoBoxDisplay_1)
				setInfoBoxDisplay_2(savedConfig.infoBoxDisplay_2)
				setInfoBoxDisplay_3(savedConfig.infoBoxDisplay_3)
				setInfoBoxDisplay_4(savedConfig.infoBoxDisplay_4)
				setInfoBoxDisplay_5(savedConfig.infoBoxDisplay_5)
				setInfoBoxDisplay_6(savedConfig.infoBoxDisplay_6)
				// console.log("update: ",mapConfig)
			} 
			// transform into object
		})
		.catch((err) =>{
			console.log(err.message);
			//if err.status == 404 not found
			// do nothing
			// if other errors
			// do error handling - report  
		})
  	},[user_id])
	
  	const isEditing = editModeEnabled ? styles.editing : "";

	const MapWithNoSSR = dynamic(() => import('@/components/dashboard/impact-map/impact-map'), {
		ssr: false
	});

	class Component extends React.Component {
		state = {
		  background: '#fff',
		};
	  
		handleChangeComplete = (color) => {
		  this.setState({ background: color.hex });
		};
	  
		render() {
		  return (
			<SketchPicker
			  color={ this.state.background }
			  onChangeComplete={ this.handleChangeComplete }
			/>
		  );
		}
	  }


	// console.log("save: ",config.saveData);
	return (
		<div className={styles.impactCluster}>
			<div className={styles.impactMap}>
				<div className={`${styles.infoBoxCluster} ${styles.upperCluster}`}>
					<InfoBox treesData={treesData} editMode={editModeEnabled} displayState={infoBoxDisplay_1} changeState={setInfoBoxDisplay_1}/>
					<InfoBox treesData={treesData} editMode={editModeEnabled} displayState={infoBoxDisplay_2} changeState={setInfoBoxDisplay_2}/>
					<InfoBox treesData={treesData} editMode={editModeEnabled} displayState={infoBoxDisplay_3} changeState={setInfoBoxDisplay_3}/>
				</div>           
				<MapWithNoSSR isVisible={mapVisible} changeState={setMapVisible} editMode={editModeEnabled} />
				<div className={`${styles.infoBoxCluster} ${styles.upperCluster}`}>
				<InfoBox treesData={treesData} editMode={editModeEnabled} displayState={infoBoxDisplay_4} changeState={setInfoBoxDisplay_4}/>
				<InfoBox treesData={treesData} editMode={editModeEnabled} displayState={infoBoxDisplay_5} changeState={setInfoBoxDisplay_5}/>
				<InfoBox treesData={treesData} editMode={editModeEnabled} displayState={infoBoxDisplay_6} changeState={setInfoBoxDisplay_6}/>
				</div>
			</div>
			<div className={`${styles.editCluster} ${isEditing}`}>
				<button onClick={() => setEditModeEnabled(!editModeEnabled)}>{!editModeEnabled?"Edit!":"Editing!"}</button>
				{editModeEnabled? (
					<>
					<button onClick={() => saveMap({infoBoxDisplay_1, infoBoxDisplay_2, infoBoxDisplay_3, infoBoxDisplay_4, infoBoxDisplay_5, infoBoxDisplay_6}, user_id)}>Save</button>
					<SketchPicker />
					</>
				):
					<></>
				}
			</div>
		</div>
	)
}

export default ImpactDashboard
