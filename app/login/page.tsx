"use client"

import Image from 'next/image'
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql, ApolloProvider,ApolloClient, InMemoryCache, useQuery } from '@apollo/client';

export default function Shop() {
  return (
    <div className="main"><h1>Shop!</h1></div>
  )
}