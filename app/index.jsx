import { Redirect, Stack } from 'expo-router';
import { useSession } from '../hooks/auth';
import { Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function AppLayout() {
    const { session, isLoading } = useSession();

    // You can keep the splash screen open, or render a loading screen like we do here.
    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    // Only require authentication within the (app) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    if (!session) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href="/auth/login" />;
    }

    if (session && !session.isProfileCreated) {
        return <Redirect href={'/profile/create'} />    
    }

    return <Redirect href={'/(tabs)/home'} />
}
