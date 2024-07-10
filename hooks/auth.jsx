import React, { useEffect } from 'react';
import { useStorageState } from './useStorageState';
import { fetchFromAPI, postToAPI } from './api';
import * as SecureStore from 'expo-secure-store';

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
        console.log(data.user?.accessToken)

        if (data.success) {
            setStorageState(data.user);
            SecureStore.setItemAsync('session', JSON.stringify(data.user));
        }

        return data.success;
    }

    async function signUp(values) {
        const data = await postToAPI("users/", values);

        if (data?.success) {
            setStorageState(data.user);
            SecureStore.setItemAsync('session', JSON.stringify(data.user));
        }

        return data;
    }

    function signOut() {
        setStorageState({})
        SecureStore.setItemAsync('session', JSON.stringify({}));
    }

    async function refreshUser() {
        const res = await fetchFromAPI('users/');
        setStorageState(res.user);
        SecureStore.setItemAsync('session', JSON.stringify(res.user));
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
