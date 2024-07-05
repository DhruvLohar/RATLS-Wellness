import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import quoteBg from "../../assets/images/quoteBg.png"
import { useSession } from '../../hooks/auth';
import Layout from "../../theme/layout";
import Colors from "../../theme/colors";
import Typography from "../../theme/typography";
import LineChartView from "../../components/LineChartView";
import PieChartView from "../../components/PieChartView";
import { Link } from "expo-router";

export default function Home() {
    const { session, isLoading } = useSession();

    const moods = [
        { "name": "Happy", "emoji": "😊" },
        { "name": "Optimistic", "emoji": "😁" },
        { "name": "Fine", "emoji": "🙂" },
        { "name": "Neutral", "emoji": "😐" },
        { "name": "Tired", "emoji": "😴" },
        { "name": "Sad", "emoji": "😢" },
        { "name": "Depressed", "emoji": "😞" },
        { "name": "Inadequate", "emoji": "😔" },
        { "name": "Lost", "emoji": "😕" },
        { "name": "Unmotivated", "emoji": "😒" },
        { "name": "Anxious", "emoji": "😟" },
        { "name": "Stressed", "emoji": "😫" },
        { "name": "Angry", "emoji": "😠" },
        { "name": "Guilty", "emoji": "😣" }
    ]

    const navCards = [
        [
            { title: 'Check-in', path: '/check-in' },
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

    return (
        <ScrollView style={[Layout.screenView]} contentContainerStyle={{ alignItems: 'flex-start' }}>
            <View style={[Layout.flexRowCenter, { width: '100%' }]}>
                <Link href={"/profile"}>
                    <View style={[Layout.flexRowCenter]}>
                        <Image source={{ uri: session?.avatar }} style={styles.profileImage} />
                        <View>
                            <Text style={[Typography.heading2, { fontSize: 22 }]}>{session?.name || 'User'}</Text>
                            <Text style={[Typography.captionText, { fontSize: 12, marginTop: -6 }]}>Last time your opened was 1 day ago</Text>
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
                {moods.map((mood, i) => (
                    <View style={{ alignItems: 'center', marginRight: 15 }} key={i}>
                        <Text style={{ fontSize: 46, marginBottom: 5 }}>{mood.emoji}</Text>
                        <Text style={[Typography.bodyText, { color: Colors.muted, fontSize: 12 }]}>{mood.name}</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.navCardBase}>
                {navCards.map((group, i) => (
                    <View style={styles.navCardRow} key={i}>
                        {group.map(card => (
                            <View style={[Layout.cardView, styles.navCard]} key={card.path}>
                                <Text style={[Typography.bodyText, { textAlign: 'center', width: '90%' }]}>{card.title}</Text>
                            </View>
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
    }
})