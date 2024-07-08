import { Image, Pressable, ScrollView, StyleSheet, Text, ToastAndroid, View } from "react-native";

import quoteBg from "../../assets/images/quoteBg.png"
import { useSession } from '../../hooks/auth';
import Layout from "../../theme/layout";
import Colors from "../../theme/colors";
import Typography from "../../theme/typography";

import LineChartView from "../../components/LineChartView";
import PieChartView from "../../components/PieChartView";
import { Link, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { axiosRequest } from "../../hooks/api";
import { isFirstLoginOfDay, getActivities } from "../../hooks/activites";
import { Moods, timesince } from "../../services/constants";
import LottieView from "lottie-react-native";

export default function Home() {

    const router = useRouter()
    const [lastAppOpen, setAppOpen] = useState("")
    const { session, refreshUser } = useSession();

    const confettiRef = useRef(null);

    function triggerConfetti() {
        confettiRef.current?.play(0);
    }

    const navCards = [
        [
            { title: 'Challenges', path: '/(tabs)/challenges' },
            { title: 'Journal', path: '/(tabs)/journal' },
        ],
        [
            { title: 'Meditation & Yoga', path: '/(tabs)/meditate' },
            { title: 'Tracker', path: '/(tabs)/tracker' },
        ]
    ]

    const data = [
        { value: 15 }, { value: 28 },
        { value: 18 }, { value: 30 },
        { value: 5 }, { value: 48 },
        { value: 35 }, { value: 43 }
    ];

    async function updateStreak(lastLogin) {
        const res = await axiosRequest(`users/${session?._id}/updateStreaks/`, {
            method: 'put',
            data: { lastUserLogin: lastLogin }
        }, false);
        if (res.success) {
            refreshUser()
        }
    }

    async function handleMoodSelect(mood) {
        const res = await axiosRequest(`users/${session?._id}/updateMoodMap/`, {
            method: 'put',
            data: { mood }
        }, false);

        if (!res.success) {
            ToastAndroid.showWithGravity(
                "You can update your mood only once.",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        } else {
            ToastAndroid.showWithGravity(
                "Your mood was added for the day!",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
            triggerConfetti();
        }
    }

    useEffect(() => {
        updateStreak();

        (async () => {
            const firstLogin = await isFirstLoginOfDay();
            const activites = await getActivities();
            setAppOpen(activites?.lastAppOpen);

            if (firstLogin) {
                console.log(firstLogin)
            }
        })();
    }, [])

    return (
        <>
            <ScrollView style={[Layout.screenView]} contentContainerStyle={{ alignItems: 'flex-start' }}>

                <View style={[Layout.flexRowCenter, { width: '100%' }]}>
                    <Link href={"/profile"}>
                        <View style={[Layout.flexRowCenter]}>
                            <Image source={{ uri: session?.avatar }} style={styles.profileImage} />
                            <View>
                                <Text style={[Typography.heading2, { fontSize: 22 }]}>{session?.name || 'User'}</Text>
                                <Text style={[Typography.captionText, { fontSize: 12, marginTop: -6 }]}>
                                    Last app opened: {timesince(lastAppOpen)}
                                </Text>
                            </View>
                        </View>
                    </Link>
                    <Text style={Typography.heading3}>🔥 {session?.currentStreak}</Text>
                </View>

                <View
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
                        " The future belongs to those who believe in the beauty of their dreams. "
                    </Text>
                </View>

                <Text style={[Typography.heading3]}>How are you feeling today ?</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={[
                        Layout.flexRowCenter,
                        { marginVertical: 10 }
                    ]}
                >
                    {Moods.map((mood, i) => (
                        <Pressable
                            key={i}
                            style={{ alignItems: 'center', marginRight: 15 }}
                            onPress={() => handleMoodSelect(mood.name)}
                        >
                            <Text style={{ fontSize: 46, marginBottom: 5 }}>{mood.emoji}</Text>
                            <Text style={[Typography.bodyText, { color: Colors.muted, fontSize: 12 }]}>{mood.name}</Text>
                        </Pressable>
                    ))}
                </ScrollView>

                <View style={styles.navCardBase}>
                    {navCards.map((group, i) => (
                        <View style={styles.navCardRow} key={i}>
                            {group.map(card => (
                                <Pressable
                                    key={card.path}
                                    style={[Layout.cardView, styles.navCard]}
                                    onPress={() => router.push(card.path)}
                                >
                                    <Text style={[Typography.bodyText, { textAlign: 'center', width: '90%' }]}>{card.title}</Text>
                                </Pressable>
                            ))}
                        </View>
                    ))}
                </View>

                <LineChartView
                    title={"Time Spent in Last Week"}
                    desc={"Lorem ipsum doler sit amet."}
                    data={data}
                />

                <PieChartView
                    title={"Your mood over the past month."}
                    desc={"This is your mood map, showing your mood distribution over the month."}
                />

            </ScrollView>
            <View style={Layout.lottie} pointerEvents="none">
                <LottieView
                    ref={confettiRef}
                    source={require('../../assets/lottie/confetti.json')}
                    autoPlay={false}
                    loop={false}
                    style={[{width: '100%', height: '100%'}]}
                    resizeMode='cover'
                    pointerEvents="none"
                />
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 120,
        marginRight: 10,
        position: 'relative'
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

    moodContainer: {
        width: '100%',
        backgroundColor: Colors.primary,
        marginVertical: 15,
        padding: 20,
        borderRadius: 20,

        alignItems: 'center'
    },

    blogContainer: {
        width: '100%',
        height: 120,
        backgroundColor: Colors.cardBg,
        borderRadius: 15,

        padding: 10
    },

    navCardBase: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
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
    },
})