import { useState } from "react"


interface DefaultObject {
    box1: string,
    box2: string,
}

const useImpactConfig = (defaultValues: DefaultObject) => {
   
    const [infoBoxDisplay_1, setInfoBoxDisplay_1] = useState(defaultValues.box1);
    const [infoBoxDisplay_2, setInfoBoxDisplay_2] = useState(defaultValues.box2);
    const [infoBoxDisplay_3, setInfoBoxDisplay_3] = useState(defaultValues.box1);
    const [infoBoxDisplay_4, setInfoBoxDisplay_4] = useState(defaultValues.box2);
    const [infoBoxDisplay_5, setInfoBoxDisplay_5] = useState(defaultValues.box1);
    const [infoBoxDisplay_6, setInfoBoxDisplay_6] = useState(defaultValues.box1);
    const [mapVisible, setMapVisible] = useState(true);

    console.log(infoBoxDisplay_2)
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
        setMapVisible
    }
}

export default useImpactConfig