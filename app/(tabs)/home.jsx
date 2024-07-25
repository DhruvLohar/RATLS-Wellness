import { Image, Pressable, ScrollView, StyleSheet, Text, ToastAndroid, View } from "react-native";

import quoteBg from "../../assets/images/quoteBg.png"
import { useSession } from '../../hooks/auth';
import Layout from "../../theme/layout";
import Colors from "../../theme/colors";
import Quotes from "../../assets/quotes"
import Typography from "../../theme/typography";

import PieChartView from "../../components/PieChartView";
import { Link, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { axiosRequest } from "../../hooks/api";
import { isFirstLoginOfDay, getActivities, updateActivity } from "../../hooks/activites";
import { Moods, timesince } from "../../services/constants";
import LottieView from "lottie-react-native";
import BarChartView from "../../components/BarChartView";
import SetGoals from "../../components/home/SetGoals";
import MoodSelector from "../../components/home/MoodSelector";

export default function Home() {

    const router = useRouter()
    const { session, refreshUser } = useSession();

    const [todaysMood, setTodaysMood] = useState(null);
    const [editMood, setEditMood] = useState(false)
    const [lastAppOpen, setAppOpen] = useState("")

    const confettiRef = useRef(null);

    const quote = Quotes[Math.floor(Math.random() * Quotes.length)];

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
        if (editMood || !todaysMood) {
            const res = await axiosRequest(`users/${session?._id}/updateMoodMap/`, {
                method: 'put',
                data: { mood }
            }, false);
    
            if (res.success) {
                setEditMood(prev => !prev)
                ToastAndroid.showWithGravity(
                    "Your mood was updated for the day!",
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                );
                let moodItem = Moods.find(item => item.name === mood);
                setTodaysMood(moodItem)
                refreshUser();
                triggerConfetti();
            }
        }
    }

    useEffect(() => {
        updateStreak();

        (async () => {
            const firstLogin = await isFirstLoginOfDay();
            const activites = await getActivities();
            setAppOpen(activites?.lastAppOpen);

            console.log("first hai ?", firstLogin)
        })();
    }, [])

    useEffect(() => {
        (async () => {
            if (!todaysMood) {
                let today = new Date().toLocaleDateString('en-US')
                if (session?.moodMap && Object.keys(session?.moodMap).includes(today)) {
                    let mood = Moods.find(item => item.name === session.moodMap[today]);
                    setTodaysMood(mood)
                }
            }
        })();
    }, [session, editMood])

    return (
        <>
            <ScrollView style={[Layout.screenView]} contentContainerStyle={{ alignItems: 'flex-start' }}>
                <View style={[Layout.flexRowCenter, { width: '100%', justifyContent: 'space-between' }]}>
                    <Link href={"/profile"}>
                        <View style={[Layout.flexRowCenter]}>
                            <Image source={{ uri: session?.avatar || "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png" }} style={styles.profileImage} />
                            <View>
                                <Text
                                    style={[Typography.heading2, { fontSize: 20 }]}
                                >
                                    {session?.name && session?.name.length > 25 ? (
                                        `${session?.name.slice(0, 25)}...`
                                    ) : session?.name}
                                </Text>
                                <Text style={[Typography.captionText, { fontSize: 12, marginTop: -6 }]}>
                                    Last app opened: {timesince(lastAppOpen)}
                                </Text>
                            </View>
                        </View>
                    </Link>
                    <Text style={[Typography.heading3, { marginLeft: 'auto' }]}>🔥 {session?.currentStreak}</Text>
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
                            { fontSize: 15, textAlign: 'center', width: '90%' }
                        ]}
                    >
                        " {quote.quote} "
                    </Text>
                </View>

                {/* Mood Selector View */}
                <MoodSelector 
                    todaysMood={todaysMood}
                    handleMoodSelect={handleMoodSelect}
                    editMood={editMood}
                    setEditMood={setEditMood}
                />

                {/* SETTING USERS GOAL TO BE ON APP */}
                <SetGoals />

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

                <BarChartView
                    title={"Time Spent in Last Week"}
                    desc={"A bar chart showing time you spend over the last week on the app"}
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
                    style={[{ width: '100%', height: '100%' }]}
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