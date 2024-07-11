import { Redirect, Stack } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { initializeActivities, updateActivity } from '../hooks/activites';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Colors from '../theme/colors';

import { useSession } from '../hooks/auth';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function AppLayout() {
    const { session, refreshUser, isLoading } = useSession();

    useEffect(() => {
        const initialize = async () => {
            initializeActivities();
        };

        initialize();
    }, []);

    if (isLoading) {
        return (
            <View style={{
                width: "100%",
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        )
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

    // return <Redirect href="/profile/create" />
    return <Redirect href="/(tabs)/home" />
}