import React, { useEffect } from 'react';
import { useStorageState } from './useStorageState';
import { postToAPI } from './api';

const AuthContext = React.createContext({
    signIn: () => null,
    signOut: () => null,
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

        if (data?.success) {
            const session = {
                id: data.user._id,
                name: data.user.name,
                token: data.user.accessToken,
                currentStreak: data.user.currentStreak
            }
            setStorageState(session);
        } else {
            alert("Something went wrong")
        }

        return data.success;
    }

    function signOut() {
        setStorageState(null)
    }

    useEffect(() => {
        console.log("[👤] ", session)
    }, [session])

    return (
        <AuthContext.Provider
            value={{
                signIn: signIn,
                signOut: signOut,
                session,
                isLoading,
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}
