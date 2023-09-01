"use client"

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { useAuth } from "../state";

// import { useRouter } from "next/router"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql, ApolloProvider,ApolloClient, InMemoryCache, useQuery } from '@apollo/client';

interface IFormInput {
  email: string
  password: string
}

const Login = () => {
    const { user, login, logout, user_id } = useAuth();
    const { register, handleSubmit } = useForm<IFormInput>()
  

    const onSubmit: SubmitHandler<IFormInput> = (data) => login(data)

    return (
        <div className="main">
        <h1>{user?"Logged in":"Log in!!"}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email", {required: true})} type="email"/>
            <input {...register("password", {required: true})} type="password"/>
            <input type="submit" />
        </form>
        </div>
    )
}

export default Login