import React, { useEffect } from 'react';
import { useStorageState } from './useStorageState';
import { fetchFromAPI, postToAPI } from './api';

const AuthContext = React.createContext({
    signIn: () => null,
    signOut: () => null,
    signUp: () => null,
    refreshUser: () => null,
    session: null,
    isLoading: false,
});

export function useSession() {
    const value = React.useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function SessionProvider(props) {
    const [[isLoading, session], setStorageState] = useStorageState("session");

    async function signIn(values) {
        const data = await postToAPI("users/login/", values);

        if (data.success) {
            setStorageState(data.user);
        }

        return data.success;
    }

    async function signUp(values) {
        const data = await postToAPI("users/", values);

        if (data?.success) {
            setStorageState(data.user);
        }

        return data;
    }

    function signOut() {
        setStorageState({})
    }

    async function refreshUser() {
        const res = await fetchFromAPI('users/');
        setStorageState(res.user);
    }

    useEffect(() => {
        if (session) {
            console.log("[👤] ", Object.keys(session))
        }
    }, [session])

    return (
        <AuthContext.Provider
            value={{
                signIn: signIn,
                signOut: signOut,
                signUp: signUp,
                refreshUser: refreshUser,
                session,
                isLoading,
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}
