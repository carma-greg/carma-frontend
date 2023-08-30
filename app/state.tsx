"use client";

import { createContext, useContext, ReactNode, useState } from 'react';

type userContext = {
    user: boolean,
    login: (data: credentials) => void;
    logout: () => void;
    user_id: null | string;
}

type credentials = {
    email: string
    password: string
}

const authContextDefaultValues: userContext = {
    user: false,
    login: () => {},
    logout: () => {},
    user_id: null
};

const AuthContext = createContext<userContext>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

type Props = {
    children: ReactNode;
};

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<boolean>(false);
    const [user_id, setUserId] = useState<null | string>(null);

    const login = async (data:credentials) => {
        const request = new Request("http://localhost:3001/api/user-signin")
        try {
            const res = await fetch(request, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            })
            const bubble_user = await res.json();
            console.log("bub: ",bubble_user)
            setUserId(bubble_user);
            setUser(true);
        } catch(error) {
            setUser(false);
            setUserId(null);
        }
        
    };

    const logout = () => {
        setUser(false);
        setUserId(null);
    };

    const value = {
        user,
        login,
        logout,
        user_id
    };
    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}