import { Redirect, Stack } from 'expo-router';
import { useSession } from '../hooks/auth';
import { Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { initializeActivities, updateActivity } from '../hooks/activites';
import { useEffect, useState } from 'react';
import AnimatedSplashScreen from '../components/AnimatedSplashScreen';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function AppLayout() {
    const { session, isLoading } = useSession();
    const [continueToApp, setContinue] = useState(false);

    // Initialize activities or perform any other setup as needed
    useEffect(() => {
        initializeActivities();
    }, []);

    // Render loading screen until session is loaded or continue flag is set
    if (isLoading || !continueToApp) {
        return <AnimatedSplashScreen setAppReady={setContinue} />
    }

    // If session is not available, redirect to login
    if (!session) {
        return <Redirect href="/auth/login" />
    }

    // If session lacks required properties, redirect to login
    if (!session?._id || !session?.accessToken) {
        return <Redirect href="/auth/login" />
    }

    // If session is valid but profile is not created, redirect to profile creation
    if (session.isProfileCreated !== true) {
        return <Redirect href="/profile/create" />
    }

    // If session is valid and profile is created, redirect to home
    return <Redirect href="/tabs/home" />
}