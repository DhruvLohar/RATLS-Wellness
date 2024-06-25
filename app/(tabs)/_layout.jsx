import { Tabs } from "expo-router";
import { Heart, Home2, Image, MessageEdit, Timer1 } from "iconsax-react-native";
import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "../../theme/colors";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

const TabIcon = memo(({ Icon, focused }) => {
    return (
        <View style={{
            alignItems: "center",
		    paddingVertical: 16,
        }}>
            <Icon
                size={30}
                variant={focused ? "Bold" : "Outline"}
                color={focused ? Colors.primary : Colors.muted}
            />
        </View>
    );
});

const Header = memo(({ route }) => {
    return (
        <SafeAreaView style={styles.headerContainer}>
            <StatusBar style="dark" />
            <Text style={styles.headerText}>{route?.params?.name || ""}</Text>
            {/* <LinearGradient
                colors={[Colors.light, 'transparent']}
                style={styles.gradient}
                locations={[0.2, 1]}
            /> */}
        </SafeAreaView>
    )
})


export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    height: 65
                },
                tabBarShowLabel: false,
                header: ({ route }) => <Header route={route} />
            }}
        >
            <Tabs.Screen
                name="home"
                initialParams={{
                    "name": "RATLS Wellness"
                }}
                options={{
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={Home2} />,
                }}
            />
            <Tabs.Screen
                name="journal"
                initialParams={{
                    "name": "Journal"
                }}
                options={{
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={MessageEdit} />,
                }}
            />
            <Tabs.Screen
                name="meditate"
                initialParams={{
                    "name": "Meditation Zone"
                }}
                options={{
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={Heart} />,
                }}
            />
            <Tabs.Screen
                name="tracker"
                initialParams={{
                    "name": "Sleep & Hydration Tracker"
                }}
                options={{
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={Timer1} />,
                }}
            />
            <Tabs.Screen
                name="yoga"
                initialParams={{
                    "name": "Yoga"
                }}
                options={{
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={Image} />,
                }}
            />
        </Tabs>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        backgroundColor: Colors.light,
        position: 'relative'
    },
    headerText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16,
    },
    gradient: {
        position: 'absolute',
        bottom: -20,
        left: 0,
        right: 0,
        height: 30, // Adjust the height to control the fade effect
    },
})