"use client"
import Image from 'next/image'

import InfoBox from '@/components/dashboard/impact-map/info-box/infoBox'
import ImpactMap from '@/components/dashboard/impact-map/impact-map'

import styles from './impact.module.scss'
import { useEffect, useState } from 'react'
import { userTrees } from '@/components/dashboard/impactInterfaces'
import useImpactConfig from '@/components/dashboard/impactConfig'
import { useAuth } from '@/app/state'

import dynamic from 'next/dynamic';

const saveMap = async (config: object, user_id: string | null) => {
  console.log(config)
  // try {
  //     const res = await fetch(`https://app.carma.earth/version-7b11/api/1.1/wf/get_user_impact?user_id=${user_id}`, {
  //         method: 'POST',
  //         body: JSON.stringify(mapData),
  //         headers: { "Content-Type": "application/json" }
  //     })
  //     const answer = await res.json();
  // } catch(error) {
  //     console.log(error)
  // }
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

const ImpactDashboard = () => {
  	const [treesData, setTreesData] = useState<userTrees>(userTreesDefaults);
	const [editModeEnabled, setEditModeEnabled] = useState<boolean>(false);

	const { user, user_id } = useAuth();

	const defaultValues = {
		box1: "uk",
		box2: "offshore"
	}
	const config = useImpactConfig(defaultValues)

	console.log(user)
	useEffect(() => {
		fetch(`https://app.carma.earth/api/1.1/wf/get_user_trees?user_id=${user_id}`)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
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
            total_uk: data.response.total_tree_uk+0,
            total_offshore: data.response.total_tree_offshore+0,
            total_uk_co2: data.response.carbon_removed_uk+0,
            total_offshore_co2: data.response.carbon_removed_offshore+0
                  })
		})
		.catch((err) =>{
			console.log(err.message);
		});
  	},[user_id])

  	const isEditing = editModeEnabled ? styles.editing : "";

	const MapWithNoSSR = dynamic(() => import('@/components/dashboard/impact-map/impact-map'), {
		ssr: false
	});

	return (
		<div className={styles.impactCluster}>
			<div className={styles.impactMap}>
				<div className={`${styles.infoBoxCluster} ${styles.upperCluster}`}>
					<InfoBox treesData={treesData} editMode={editModeEnabled} displayState={config.infoBoxDisplay_1} changeState={config.setInfoBoxDisplay_1}/>
					<InfoBox treesData={treesData} editMode={editModeEnabled} displayState={config.infoBoxDisplay_2} changeState={config.setInfoBoxDisplay_2}/>
					<InfoBox treesData={treesData} editMode={editModeEnabled} displayState={config.infoBoxDisplay_3} changeState={config.setInfoBoxDisplay_3}/>
				</div>           
				<MapWithNoSSR />
				<div className={`${styles.infoBoxCluster} ${styles.upperCluster}`}>
				<InfoBox treesData={treesData} editMode={editModeEnabled} displayState={config.infoBoxDisplay_4} changeState={config.setInfoBoxDisplay_4}/>
				<InfoBox treesData={treesData} editMode={editModeEnabled} displayState={config.infoBoxDisplay_5} changeState={config.setInfoBoxDisplay_5}/>
				<InfoBox treesData={treesData} editMode={editModeEnabled} displayState={config.infoBoxDisplay_6} changeState={config.setInfoBoxDisplay_6}/>
				</div>
			</div>
			<div className={`${styles.editCluster} ${isEditing}`}>
				<button onClick={() => setEditModeEnabled(!editModeEnabled)}>{!editModeEnabled?"Edit!":"Editing!"}</button>
				{editModeEnabled? (<button onClick={() => saveMap(config, user_id)}>Save</button>):""}
			</div>
		</div>
	)
}

export default ImpactDashboard
