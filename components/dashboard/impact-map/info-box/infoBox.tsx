import styles from './infoBox.module.scss'
import Select from 'react-select'
import { useState } from 'react'
import type { userTrees } from "@/components/dashboard/impactInterfaces"
import useImpactConfig from "@/components/dashboard/impactConfig"

const options = [
    { value: 'uk', label: 'UK Trees' },
    { value: 'offshore', label: 'Offshore Trees' },
    { value: 'hidden', label: 'Hidden' },
  ]

interface InfoBoxProps {
    treesData: userTrees;
    editMode: boolean; 
    displayState: string | null;
    changeState: (value: string) => void;
}

interface TemplateText {
    infoOutput: string;
    statOutput: number;
}

const InfoBox = ({treesData, editMode, displayState, changeState}: InfoBoxProps) => {
    switch(displayState){
        case "uk":
            return <InfoBoxTemplate 
                infoOutput={"UK Trees"} 
                statOutput={treesData.total_uk}
                treesData={treesData} 
                editMode={editMode}
                displayState={displayState}
                changeState={changeState}
            />
        case "offshore": 
            return <InfoBoxTemplate 
                infoOutput={"Offshore Trees"} 
                statOutput={treesData.total_offshore}
                treesData={treesData} 
                editMode={editMode}
                displayState={displayState}
                changeState={changeState}
            />
        case "hidden":
            return null
    }
}

const InfoBoxTemplate = ({editMode, changeState, infoOutput, statOutput, displayState}: InfoBoxProps & TemplateText) => {
    return (
        <div className={styles.infoBoxWrapper}>
            <div className={styles.infoBox}>
                {editMode?(
                    <Select options={options} defaultValue={options[0]} onChange={(choice) => changeState(choice!.value)}/>
                ):(
                    <></>
                )}
                {/* <p>{displayState}</p> */}
                <p>{infoOutput}</p>
                <p>{statOutput}</p>
            </div>
        </div>
    )
}

export default InfoBox



