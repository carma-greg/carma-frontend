"use client"
import Image from 'next/image'

import InfoBox from '@/components/dashboard/impact-map/info-box/infoBox'
import ImpactMap from '@/components/dashboard/impact-map/impact-map'

import styles from './planting-site.module.scss'
import { useEffect, useState } from 'react'
import { userTrees } from '@/components/dashboard/impactInterfaces'
import useImpactConfig from '@/components/dashboard/impactConfig'
import { useAuth } from '@/app/state'
import { readConfigFile } from 'typescript'

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


export async function generateStaticParams() {
    const sites = await fetch('https://api.veritree.com/api/sponsors/133/map-data?_result=1').then((res) => res.json())
    return sites.map((site: sitesInterface) =>
        site.regions.map((regions:regionInterface, j: number) =>
            regions.subsites.map((subsites: subsiteInterface, k: number) =>
                ({country: site.country_name, region: regions.region_name, subsite: subsites.subsite_name, description:subsites.subsite_description})
            )
        )
    )
}

const getSiteInfo = async (country: string, region: string, subsite: string) => {
    const sites = await fetch('https://api.veritree.com/api/sponsors/133/map-data?_result=1').then((res) =>res.json() )
    if(!sites.ok) throw new Error("fail!")
    const data = sites.map((site: sitesInterface) =>
        site.regions.map((regions:regionInterface, j: number) =>
            regions.subsites.map((subsites: subsiteInterface, k: number) =>
                ({country: site.country_name, region: regions.region_name, subsite: subsites.subsite_name, description:subsites.subsite_description})
            )
        )
    )
    console.log("data: ",data)
    return (
        data
    )
}

const PlantingSite = async ({params}: { params: { country: string, region: string, subsite: string, description:string }}) => {
    const { country, region, subsite, description } = params;
    const dataCall: Promise<subsiteInterface | null> = getSiteInfo(country, region, subsite)
    // const callData = await Promise.all(dataCall)
    return (
        <div>
            <h1>{country}</h1>
            <h2>{region}</h2>
            <h3>{subsite}</h3>
            <p>{description}</p>
            {/* <p>{sites}</p> */}
        </div>
    )
}
export default PlantingSite