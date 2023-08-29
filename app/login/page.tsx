"use client"

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
// import { useRouter } from "next/router"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql, ApolloProvider,ApolloClient, InMemoryCache, useQuery } from '@apollo/client';

interface IFormInput {
  email: string
  password: string
}

export default function Login() {

  // const router = useRouter();

  const { register, handleSubmit } = useForm<IFormInput>()
  

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

  return (
    <div className="main">
      <h1>Login!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email", {required: true})} type="email"/>
        <input {...register("password", {required: true})} type="password"/>
        <input type="submit" />
    </form>
    </div>
  )
}