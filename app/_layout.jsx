import { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";

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

SplashScreen.preventAutoHideAsync();

export default function Layout() {
    const [fontsLoaded, fontError] = useFonts({
        Poppins_300Light,
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
        Poppins_800ExtraBold
    });

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync()
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <SessionProvider>
            <Stack
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name="journal/[date]"
                    initialParams={{
                        name: "Create or Edit Journal"
                    }}
                    options={{
                        header: ({ route }) => <Header route={route} />,
                        headerShown: true
                    }}
                />
            </Stack>
        </SessionProvider>
    )
}