"use client"

import Image from 'next/image'
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql, ApolloProvider,ApolloClient, InMemoryCache, useQuery } from '@apollo/client';

export const dynamic = "force-dynamic";
import Link from "next/link";

export interface PostItem {
  "title": string,
  "tags.name": string,
  "id": string
}

export interface PostItems {
  "posts": PostItem[]
}

const query = gql`query {
  posts {
    author {
      name
    }
    title
    content {
      document
    }
    tags {
      name
    }
    id
  }
}`

export const Blog = () => {
  const { data }: {data: PostItems} = useSuspenseQuery(query);
  console.log("data: ", data);
  return(
    <div className="main">
      <h1>Blog</h1>
      <p>Blogs below:</p>
      {data.posts.map((item:PostItem) => (
        <p key={item.id}>
          <Link href={`/blog/${item.title}`}>
            {item.title}
          </Link>
        </p>
      ))}
    </div>
  )
};

export default Blog