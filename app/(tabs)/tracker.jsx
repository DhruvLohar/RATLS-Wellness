import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Pressable, ToastAndroid } from 'react-native';
import quoteBg from "../../assets/images/quoteBg.png"
import { LineChart } from "react-native-gifted-charts";

import Layout from "../../theme/layout"
import waterBoy from "../../assets/images/water-boy.png"
import CircularProgress from '../../components/CircularProgress';
import Colors from '../../theme/colors';
import Typography from '../../theme/typography';
import { useRouter } from 'expo-router';

import { getActivities, updateActivity } from '../../hooks/activites';
import LottieView from 'lottie-react-native';

export default function Tracker() {

    const router = useRouter()
    const [waterIntake, setWaterIntake] = useState(0);

    const confettiRef = useRef(null);

    function triggerConfetti() {
        confettiRef.current?.play(0);
    }

    async function handleWaterClick() {
        const now = new Date();
        const activites = await getActivities();

        // const oneHourInMilliseconds = 3600 * 1000;
        const newWaterIntake = (activites?.waterIntake || 0) + 1;

        // const lastWaterIntake = new Date(activites?.lastWaterIntake);

        if (newWaterIntake >= 13) {
            ToastAndroid.showWithGravity(
                "Goal achieved: You've reached your water intake goal!",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        } else {
            await updateActivity('lastWaterIntake', now.toISOString());
            await updateActivity('waterIntake', newWaterIntake);
            setWaterIntake(newWaterIntake);
            triggerConfetti();
        }

        // const isOneHourGap = now - lastWaterIntake >= oneHourInMilliseconds;
        // if (!activites?.lastWaterIntake || isOneHourGap) {
        //     ToastAndroid.showWithGravity(
        //         "Goal achieved: You've reached your water intake goal!",
        //         ToastAndroid.SHORT,
        //         ToastAndroid.CENTER,
        //     );
        //     if (newWaterIntake >= 3000) {
        //     } else {
        //         await updateActivity('lastWaterIntake', now.toISOString());
        //         await updateActivity('waterIntake', newWaterIntake);
        //         setWaterIntake(newWaterIntake);
        //         triggerConfetti();
        //     }
        // } else {
        //     ToastAndroid.showWithGravity(
        //         "You need to wait at least 1 hour before recording another water intake.",
        //         ToastAndroid.SHORT,
        //         ToastAndroid.CENTER,
        //     );
        // }
    }

    useEffect(() => {
        (async () => {
            const activites = await getActivities();
            setWaterIntake(activites?.waterIntake || 0);
        })();
    }, [])

    return (
        <>
            <ScrollView style={[Layout.screenView]} contentContainerStyle={{ alignItems: 'flex-start' }}>
                <Text style={[Typography.heading1]}>Drink Water</Text>
                <Text style={[Typography.captionText]}>Tap on the card below after your drank a glass of water to mark your progress.</Text>

                <View style={styles.waterContainer}>
                    <CircularProgress
                        progress={Math.round((waterIntake / 13) * 100)}
                        outerCircleColor={Colors.inputBG}
                        progressCircleColor={Colors.primary}
                        labelStyle={{
                            color: Colors.secondary,
                            fontSize: 18
                        }}
                        strokeWidth={5}
                    />
                    <Text style={[Typography.captionText, { marginTop: 10 }]}>Completed</Text>
                    <Text style={Typography.heading3}>{waterIntake} / 13 glasses</Text>
                    <Image source={waterBoy} style={styles.waterImage} />
                </View>

                <View style={styles.row}>
                    <View style={[styles.box, { backgroundColor: '#FDCE83' }]}>
                        <Text style={[Typography.heading3, { color: Colors.dark }]}>Sleep Well</Text>
                        <Text style={[Typography.captionText, { color: Colors.dark, marginTop: -5 }]}>
                            SOUNDSCAPES
                        </Text>

                        <Pressable style={[
                            styles.cardBtn,
                            { backgroundColor: Colors.dark }
                        ]}
                            onPress={() => router.push('/(tabs)/meditate')}
                        >
                            <Text style={{ fontWeight: 'bold', color: Colors.light }}>Explore</Text>
                        </Pressable>
                    </View>
                    <View style={[styles.box, { backgroundColor: '#919AFF' }]}>
                        <Text style={[Typography.heading3, { color: Colors.light }]}>Water Tracker</Text>
                        <Text style={[Typography.captionText, { color: Colors.light, marginTop: -5 }]}>
                            TAP TO MARK
                        </Text>

                        <Pressable
                            onPress={handleWaterClick}
                            style={[
                                styles.cardBtn,
                                { backgroundColor: Colors.dark }
                            ]}
                        >
                            <Text style={{ fontWeight: 'bold', color: Colors.light }}>
                                Add Record
                            </Text>
                        </Pressable>
                    </View>
                </View>

                <Pressable
                    onPress={() => router.push("/(tabs)/meditate")}
                    style={[styles.quoteContainer, Layout.cardView, { padding: 0, borderWidth: 0 }]}
                >
                    <Image
                        source={quoteBg}
                        style={styles.quoteImg}
                    />
                    <Text
                        style={[
                            Typography.heading2,
                            { fontSize: 20, textAlign: 'center', width: '90%' }
                        ]}
                    >
                        Can't Sleep ? Get Help 😊 
                    </Text>
                </Pressable>

                <View style={{ width: '100%', marginVertical: 15 }}>
                    <Text style={[Typography.heading3]}>Sleep Tracker</Text>
                    <Text style={[Typography.bodyText, {
                        marginBottom: 15,
                        fontSize: 15,
                        color: Colors.muted
                    }]}>Your Sleep Duration for this week in hours.</Text>

                    <LineChart
                        areaChart
                        curved
                        hideDataPoints
                        data={[
                            { value: 8, label: 'Mon' },
                            { value: 16, label: 'Tue' },
                            { value: 8, label: 'Wed' },
                            { value: 13, label: 'Thr' },
                            { value: 9, label: 'Fri' },
                            { value: 7.5, label: 'Sat' },
                            { value: 6, label: 'Sun' },
                        ]}
                        spacing={68}
                        color={Colors.primary}
                        startFillColor={Colors.secondary}
                        rulesType="solid"
                        yAxisThickness={0}
                        xAxisThickness={0}
                        noOfSections={6}
                    />
                </View>
            </ScrollView>
            <View style={Layout.lottie} pointerEvents="none">
                <LottieView
                    ref={confettiRef}
                    source={require('../../assets/lottie/confetti.json')}
                    autoPlay={false}
                    loop={false}
                    style={[{ width: '100%', height: '100%' }]}
                    resizeMode='cover'
                    pointerEvents="none"
                />
            </View>
        </>
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
        width: 220,
        height: 220,
        objectFit: 'fill',

        position: 'absolute',
        right: 4,
        bottom: 0,
        zIndex: 99
    },

    quoteContainer: {
        width: '100%',
        height: 140,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    quoteImg: {
        width: "100%",
        height: "100%",
        borderRadius: 20,
        position: 'absolute',
        top: 0,
        left: 0
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
    },
})
