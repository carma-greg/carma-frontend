"use client"

import styles from './sidebar.module.scss'
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql, ApolloProvider,ApolloClient, InMemoryCache, useQuery } from '@apollo/client';

export const dynamic = "force-dynamic";
import Link from "next/link";

interface EventItem {
    "title": string
    "description": string
    "linkText": string
    "linkUrl": string
    "id": string,
}

interface EventItems {
  "events": EventItem[]
}

const query = gql`query {
  events {
    title
    description
    linkText
    linkUrl
    id
  }
}`

const Sidebar = () => {
    const { data }: {data: EventItems} = useSuspenseQuery(query);
    console.log("data: ", data);
    return(
        <div className={styles.sidebar}>
            <h2>Sidebar</h2>
            <ul className={styles.events}>
                {data.events.map((item:EventItem) => (
                    <li key={item.id}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <Link href={item.linkUrl}>{item.linkText}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar