import { Tabs } from "expo-router";
import { Calendar, Heart, Home2, Note, Timer1 } from "iconsax-react-native";
import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

import Colors from "../../theme/colors";
import Header from "../../components/Header";

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
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={Note} />,
                }}
            />
            <Tabs.Screen
                name="meditate"
                initialParams={{
                    "name": "Meditation & Yoga"
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
                name="challenges"
                initialParams={{
                    "name": "Challenges"
                }}
                options={{
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={Calendar} />,
                }}
            />
        </Tabs>
    )
}