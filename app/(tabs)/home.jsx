import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

import Layout from "../../theme/layout";
import Colors from "../../theme/colors";
import Typography from "../../theme/typography";

export default function Home() {

    const moods = [
        { emoji: '😣', label: 'Depressed' },
        { emoji: '🥲', label: 'Sad' },
        { emoji: '🙂', label: 'Neutral' },
        { emoji: '😁', label: 'Happy' },
        { emoji: '😂', label: 'Overjoy' },
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
                <Text style={Typography.heading2}>Hi, Dhruv Lohar</Text>
                <Text style={Typography.heading3}>🔥 2</Text>
            </View>

            <View style={[styles.moodContainer]}>
                <Text style={[Typography.heading3, { color: Colors.light }]}>How do you feel today?</Text>
                <Text style={[Typography.bodyText, { color: Colors.muted }]}>Last update was about 8 hours ago</Text>

                <View style={[
                    Layout.flexRowCenter,
                    { width: '100%', marginTop: 20 }
                ]}>
                    {moods.map((mood, i) => (
                        <View style={{ alignItems: 'center' }} key={i}>
                            <View style={{ padding: 10, backgroundColor: Colors.dark, marginBottom: 10, borderRadius: 100 }}>
                                <Text style={{ fontSize: 25 }}>{mood.emoji}</Text>
                            </View>
                            <Text style={[Typography.bodyText, { color: Colors.light, fontSize: 12 }]}>{mood.label}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={{ width: '100%', marginVertical: 15 }}>
                <Text style={[Typography.heading3]}>Time Spent in Last Week</Text>
                <Text style={[Typography.bodyText, { 
                    marginBottom: 15,
                    fontSize: 15,
                    color: Colors.muted
                }]}>Lorem ipsum doler sit amet.</Text>

                <LineChart
                    areaChart
                    curved
                    hideDataPoints
                    data={data}
                    spacing={68}
                    color={Colors.primary}
                    startFillColor={Colors.secondary}
                    rulesType="solid"
                    yAxisThickness={0}
                    xAxisThickness={0}
                    noOfSections={5}
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
    )
}

const styles = StyleSheet.create({
    moodContainer: {
        width: '100%',
        backgroundColor: Colors.primary,
        marginVertical: 15,
        padding: 20,
        borderRadius: 20,

        alignItems: 'center'
    }
})