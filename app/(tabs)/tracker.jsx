import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
import * as Notifications from 'expo-notifications';
import { LineChart } from "react-native-gifted-charts";

import Layout from "../../theme/layout"
import waterBoy from "../../assets/images/water-boy.png"
import CircularProgress from '../../components/CircularProgress';
import Colors from '../../theme/colors';
import Typography from '../../theme/typography';
import { useRouter } from 'expo-router';

import { schedulePushNotification } from '../../services/notification';

export default function Tracker() {

    const router = useRouter()

    async function handleWaterClick() {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Hi Dhruv, its water time!',
                body: 'Open your app and click on the water card to mark that you drank your water.',
            },
            trigger: { seconds: 1 },
        });
    }

    return (
        <ScrollView style={[Layout.screenView]} contentContainerStyle={{ alignItems: 'flex-start' }}>
            <Pressable
                style={styles.waterContainer}
                onPress={handleWaterClick}
            >
                <CircularProgress
                    progress={60}
                    outerCircleColor={Colors.inputBG}
                    progressCircleColor={Colors.primary}
                    labelStyle={{
                        color: Colors.secondary,
                        fontSize: 18
                    }}
                    strokeWidth={5}
                />
                <Text style={[Typography.captionText, { marginTop: 10 }]}>Completed</Text>
                <Text style={Typography.heading3}>1200 / 2100 ml</Text>
                <Image source={waterBoy} style={styles.waterImage} />
            </Pressable>

            <View style={styles.row}>
                <View style={[styles.box, { backgroundColor: '#919AFF' }]}>
                    <Text style={[Typography.heading3, { color: Colors.light }]}>Dream</Text>
                    <Text style={[Typography.captionText, { color: Colors.light, marginTop: -5 }]}>MUSIC</Text>

                    <Pressable style={[
                        styles.cardBtn,
                        {backgroundColor: Colors.light}
                    ]}>
                        <Text style={{fontWeight: 'bold', color: Colors.dark}}>Explore</Text>
                    </Pressable>
                </View>
                <View style={[styles.box, { backgroundColor: '#FDCE83' }]}>
                    <Text style={[Typography.heading3, { color: Colors.dark }]}>Stories</Text>
                    <Text style={[Typography.captionText, { color: Colors.dark, marginTop: -5 }]}>READ</Text>

                    <Pressable style={[
                        styles.cardBtn,
                        {backgroundColor: Colors.dark}
                    ]}>
                        <Text style={{fontWeight: 'bold', color: Colors.light}}>Explore</Text>
                    </Pressable>
                </View>
            </View>

            <View style={{ width: '100%', marginVertical: 15 }}>
                <Text style={[Typography.heading3]}>Sleep duration</Text>
                <Text style={[Typography.bodyText, {
                    marginBottom: 15,
                    fontSize: 15,
                    color: Colors.muted
                }]}>Your Sleep Duration for this week</Text>

                <LineChart
                    areaChart
                    curved
                    hideDataPoints
                    data={[
                        { value: 15 }, { value: 28 },
                        { value: 18 }, { value: 30 },
                        { value: 5 }, { value: 48 },
                        { value: 35 }, { value: 43 }
                    ]}
                    spacing={68}
                    color={Colors.primary}
                    startFillColor={Colors.secondary}
                    rulesType="solid"
                    yAxisThickness={0}
                    xAxisThickness={0}
                    noOfSections={6}
                    maxValue={50}
                    pointerConfig={{
                        pointerStripUptoDataPoint: true,
                        pointerStripColor: 'white',
                        pointerStripWidth: 2,
                        strokeDashArray: [2, 5],
                        pointerColor: 'white',
                        radius: 4,
                        pointerLabelWidth: 100,
                        pointerLabelHeight: 120,
                    }}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    waterContainer: {
        width: '100%',
        height: 180,
        borderRadius: 20,
        marginTop: 80,
        backgroundColor: Colors.cardBg,
        padding: 20,

        position: 'relative',
        flexDirection: 'column',
        marginBottom: 10
    },
    waterImage: {
        width: 250,
        height: 250,
        objectFit: 'fill',

        position: 'absolute',
        right: 4,
        bottom: 0,
        zIndex: 99
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    box: {
        flex: 1,
        height: 200,
        margin: 5,
        borderRadius: 10,
        padding: 20,

        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    cardBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 30,
        marginTop: 15,
    }
})
