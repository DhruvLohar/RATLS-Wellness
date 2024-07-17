import { useEffect, useState } from "react";
import { SplashScreen, Stack } from "expo-router";
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Notifications from 'expo-notifications';
import messaging from '@react-native-firebase/messaging';

import {
    useFonts,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold
} from "@expo-google-fonts/poppins";
import { SessionProvider } from "../hooks/auth";
import Header from "../components/Header";
import { StyleSheet } from "react-native";
import Colors from "../theme/colors";
import AnimatedSplashScreen from "../components/AnimatedSplashScreen";
import { schedulePushNotification } from "../services/notification";

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const BACKGROUND_FETCH_TASK = 'water-reminder';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async ({ data, error }) => {
    console.log("\n\nCHALA BG TASK\n\n")

    if (error) {
        console.log("ERROR AAYA", error)
    }
    await schedulePushNotification({
        title: "This works",
        body: `GETTING NOTIFICATION AT ${new Date().toLocaleTimeString()}`,
    })

    // Be sure to return the successful result type!
    return BackgroundFetch.BackgroundFetchResult.NewData;
});

BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 5 * 60,
    stopOnTerminate: false,
    startOnBoot: true,
});

export default function Layout() {

    const [continueToApp, setContinue] = useState(false);

    const [fontsLoaded, fontError] = useFonts({
        Poppins_300Light,
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
        Poppins_800ExtraBold
    });

    useEffect(() => {

        messaging().setBackgroundMessageHandler(async remoteMessage => {
            await schedulePushNotification({
                title: remoteMessage.notification.title,
                body: remoteMessage.notification.body,
            })
            console.log('Message handled in the background!', remoteMessage);
        });

    }, [])

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync()
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    if (fontsLoaded && !continueToApp) {
        return <AnimatedSplashScreen setAppReady={setContinue} />
    }

    return (
        <SessionProvider>
            <Stack
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name="+not-found"
                />

                <Stack.Screen
                    name="challenge/[slug]"
                    initialParams={{
                        name: "Ready. Set. Go"
                    }}
                    options={{
                        header: ({ route }) => <Header route={route} />,
                        headerShown: true,
                        animation: 'slide_from_bottom'
                    }}
                />

                <Stack.Screen
                    name="sound/[id]"
                    options={{
                        animation: "fade",
                    }}
                />

                <Stack.Screen
                    name="profile/create"
                />

                <Stack.Screen
                    name="profile/index"
                    initialParams={{
                        name: "My Profile"
                    }}
                    options={{
                        header: ({ route }) => <Header route={route} />,
                        headerShown: true
                    }}
                />

                <Stack.Screen
                    name="profile/edit"
                    initialParams={{
                        name: "Edit Profile"
                    }}
                    options={{
                        header: ({ route }) => <Header route={route} />,
                        headerShown: true,
                        animation: 'slide_from_bottom'
                    }}
                />

                <Stack.Screen
                    name="journal/[id]"
                    initialParams={{
                        name: "Your Journal"
                    }}
                />
            </Stack>
        </SessionProvider>
    )
}

const styles = StyleSheet.create({
    customHeader: {
        backgroundColor: "#1b1b1b",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    customHeaderText: {
        color: Colors.light
    }
})