"use client";

import { createContext, useContext, ReactNode, useState } from 'react';

type userContext = {
    user: boolean,
    login: () => void;
    logout: () => void;
    user_id: null | string;
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

    const login = () => {
        setUser(true);
    };

    const logout = () => {
        setUser(false);
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