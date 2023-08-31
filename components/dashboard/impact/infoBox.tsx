import styles from './infoBox.module.scss'
import Select from 'react-select'
import { useState } from 'react'
import type { editMode, treesData, userTrees } from "./impactTypes"

const options = [
    { value: 'uk', label: 'UK Trees' },
    { value: 'offshore', label: 'Offshore Trees' },
  ]

export default function InfoBox({treesData, editMode}: treesData & editMode) {
    const [displayState, setDisplayState] = useState("uk");
    switch(displayState){
        case "uk":
        return (
            <div className={styles.infoBoxWrapper}>
                <div className={styles.infoBox}>
                    {editMode?(
                        <Select options={options}  defaultValue={options[0]} onChange={(choice) => setDisplayState(choice!.value)}/>
                    ):""}
                    <p>UK Trees:</p>
                    <p>{treesData.total_uk}</p>
                </div>
            </div>
        )
        case "offshore":
        return (
            <div className={styles.infoBoxWrapper}>
                <div className={styles.infoBox}>
                {editMode?(
                    <Select options={options} defaultValue={options[0]} onChange={(choice) => setDisplayState(choice!.value)}/>
                ):""}
                    <p>Offshore Trees:</p>
                    <p>{treesData.total_offshore}</p>
                </div>
            </div>
        )
    }
}