import Image from 'next/image'

import InfoBox from '@/components/dashboard/impact-map/info-box/infoBox'
import ImpactMap from '@/components/dashboard/impact-map/impact-map'

import styles from './planting-site.module.scss'
import { useEffect, useState } from 'react'
import { userTrees } from '@/components/dashboard/impactInterfaces'
import useImpactConfig from '@/components/dashboard/impactConfig'
import { useAuth } from '@/app/state'

interface sitesInterface {
    country_id: number
    country_name: string
    regions: regionInterface[]
    index: number
}

interface regionInterface {
    region_id: number
    region_name: string
    organisation_name: string
    subsites: subsiteInterface[]
}

interface subsiteInterface {
    subsite_id: number
    subsite_name: string
    subsite_description: string
}

let siteData;


const PlantingSite = async () => {
    const sites = await fetch('https://api.veritree.com/api/sponsors/133/map-data?_result=1').then((res) => res.json())
    
    // siteData = sites.map((site: sitesInterface) =>
    //     site.regions.map((regions:regionInterface, j: number) =>
    //         regions.subsites.map((subsites: subsiteInterface, k: number) =>
    //             ({country: site.country_name, region: regions.region_name, subsite: subsites.subsite_name})
    //         )
    //     )
    // );

    return (
        <div></div>
    )
}
export default PlantingSite