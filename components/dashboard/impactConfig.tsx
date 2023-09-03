import { useEffect, useState } from "react"


interface DefaultObject {
    infoBoxDisplay_1: string
    infoBoxDisplay_2: string
    infoBoxDisplay_3: string
    infoBoxDisplay_4: string
    infoBoxDisplay_5: string
    infoBoxDisplay_6: string
    mapVisible: boolean
}



const useImpactConfig = (impactConfigValues: DefaultObject) => {
   
    const [infoBoxDisplay_1, setInfoBoxDisplay_1] = useState("uk");
    const [infoBoxDisplay_2, setInfoBoxDisplay_2] = useState("offshore");
    const [infoBoxDisplay_3, setInfoBoxDisplay_3] = useState("uk");
    const [infoBoxDisplay_4, setInfoBoxDisplay_4] = useState("offshore");
    const [infoBoxDisplay_5, setInfoBoxDisplay_5] = useState("uk");
    const [infoBoxDisplay_6, setInfoBoxDisplay_6] = useState("offshore");
    const [mapVisible, setMapVisible] = useState(true);

    

    const saveData = {
        infoBoxDisplay_1, 
        infoBoxDisplay_2, 
        infoBoxDisplay_3, 
        infoBoxDisplay_4, 
        infoBoxDisplay_5, 
        infoBoxDisplay_6, 
        mapVisible
    }

    return{
        infoBoxDisplay_1, 
        infoBoxDisplay_2, 
        infoBoxDisplay_3, 
        infoBoxDisplay_4, 
        infoBoxDisplay_5, 
        infoBoxDisplay_6, 
        mapVisible,
        setInfoBoxDisplay_1,
        setInfoBoxDisplay_2,
        setInfoBoxDisplay_3,
        setInfoBoxDisplay_4,
        setInfoBoxDisplay_5,
        setInfoBoxDisplay_6,
        setMapVisible,
        saveData
    }
}

export default useImpactConfig