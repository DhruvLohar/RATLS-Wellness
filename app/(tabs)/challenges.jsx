import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from "expo-router";

import Layout from "../../theme/layout";
import Typography from "../../theme/typography";

export default function Challenges() {

    const router = useRouter()

    const navCards = [
        [{ "title": "Morning Routine", "slug": "morning_routine" },
        { "title": "Happiness", "slug": "happiness" }],
        [{ "title": "Social Anxiety", "slug": "social_anxiety" },
        { "title": "Declutter", "slug": "declutter" }],
        [{ "title": "Self care", "slug": "self_care" },
        { "title": "Fix your sleep schedule", "slug": "sleep_schedule" }]
    ]


    return (
        <ScrollView style={[Layout.screenView]} contentContainerStyle={{ alignItems: 'flex-start' }}>
            <Text style={[Typography.heading1]}>Challenge Yourself</Text>
            <Text style={[Typography.captionText]}>Take a 21 days challenge for any domain in your life to make it perfect for the rest of your life!</Text>

            <View style={styles.navCardBase}>
                {navCards.map((group, i) => (
                    <View style={styles.navCardRow} key={i}>
                        {group.map((card, i) => (
                            <Pressable
                                key={i}
                                style={[Layout.cardView, styles.navCard]}
                                onPress={() => router.push(`/challenge/${card.slug}`)}
                            >
                                <Text style={[Typography.bodyText, { textAlign: 'center', width: '90%' }]}>{card.title}</Text>
                            </Pressable>
                        ))}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    navCardBase: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    navCardRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    navCard: {
        width: "49%",
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0
    }
})