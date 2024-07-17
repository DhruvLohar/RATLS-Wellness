import messaging from '@react-native-firebase/messaging';

import { Redirect, Stack } from 'expo-router';
import { initializeActivities } from '../hooks/activites';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Colors from '../theme/colors';

import { useSession } from '../hooks/auth';

export default function AppLayout() {
    const { session, refreshUser, isLoading } = useSession();


    useEffect(() => {

        const initialize = async () => {
            initializeActivities();
        };

        const requestUserPermission = async () => {
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                getFcmToken();
            }
        };

        const getFcmToken = async () => {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                console.log('Your Firebase Cloud Messaging Token is:', fcmToken);
            } else {
                console.log('Failed to get FCM token');
            }
        };

        requestUserPermission();
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