"use client"

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { useAuth } from "../state";
import Link from "next/link";

// import { useRouter } from "next/router"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql, ApolloProvider,ApolloClient, InMemoryCache, useQuery } from '@apollo/client';


interface LoginInterface {
    email: string
    password: string
}

interface ResetPasswordInterface {
    recovery_email?: string
    isRecoveryActive: boolean
    setIsRecoveryActive: (value: boolean) => void;
    // setResetPasswordClicked
    // handleRecoverySubmit: void
}

const ResetPasswordModal = ({isRecoveryActive, setIsRecoveryActive}: ResetPasswordInterface) => {

    const { register: registerRecovery, handleSubmit: handleSubmitRecovery, formState: { errors }} = useForm<ResetPasswordInterface>()

    const onRecoverySubmit: SubmitHandler<ResetPasswordInterface> = (data) => {
        console.log("click")
        console.log(data)
    }

    const closeRecoveryModal = (event: MouseEvent) => {
        event.preventDefault();
        if( event.target === event.currentTarget) {
            setIsRecoveryActive(false)
        }
    }


    return ( isRecoveryActive ? 
        <div 
        // onClick={(event) => closeRecoveryModal(event)}
        >
            <div>
                <button onClick={(event) => closeRecoveryModal}>x</button>
                <form key={2} onSubmit={handleSubmitRecovery(onRecoverySubmit)}>
                    {errors.recovery_email && <p>ERROR</p>}
                    <input {...registerRecovery("recovery_email", { required: true})} type="email"/>
                    <input type="submit" />
                </form>
            </div>
        </div>
        : <></>
    )
}


const Login = () => {
    const [resetPasswordClicked, setResetPasswordClicked] = useState<boolean>(false);
    const [isRecoveryActive, setIsRecoveryActive] = useState<boolean>(false);

    const handleRecoveryClick = () => {
        setResetPasswordClicked(!resetPasswordClicked)
        // console.log(resetPasswordClicked)
    }

    const { user, login, logout, user_id } = useAuth();
    const { register, handleSubmit } = useForm<LoginInterface>()
  

    const onLoginSubmit: SubmitHandler<LoginInterface> = (data) => login(data)

    return (
        <div className="main">
        <h1>{user?"Logged in":"Log in!!"}</h1>
        <form key={1} onSubmit={handleSubmit(onLoginSubmit)}>
            <input {...register("email", {required: true})} type="email"/>
            <input {...register("password", {required: true})} type="password"/>
            <input type="submit" />
        </form>
        <button onClick={handleRecoveryClick} >
            Reset Password
        </button>
        <ResetPasswordModal
        setIsRecoveryActive={setResetPasswordClicked}
        isRecoveryActive={resetPasswordClicked} 
        // onSubmit={handleSubmit(onRecoverySubmit)} 
        />
        </div>
        
    )
    
}

export default Login