import { BarChart, LineChart } from "react-native-gifted-charts";
import Colors from "../../theme/colors"
import Typography from "../../theme/typography"
import { Pressable, Text, View } from "react-native"
import { useEffect, useMemo, useState } from "react";
import Layout from "../../theme/layout";
import { ArrowLeft3, ArrowRight3 } from "iconsax-react-native";
import { axiosRequest } from "../../hooks/api";


export default function TimeSpentGraph() {

    const [prevWeekData, setPrevWeekData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    async function getGraphData() {
        const res = await axiosRequest('sessions/getTimeSpentGraphData/', {
            method: 'get'
        }, false);

        if (res.success) {
            setPrevWeekData(res.data);
        }
    }

    useEffect(() => {
        getGraphData();
    }, []);

    const updatedData = useMemo(() => {
        return prevWeekData[currentIndex]
    }, [currentIndex, prevWeekData])

    const handlePrevWeek = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => prevIndex - 1);
        }
    };

    const handleNextWeek = () => {
        if (currentIndex < prevWeekData.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    return (
        <View style={{ width: '100%', marginVertical: 15 }}>
            <View style={Layout.flexRowCenter}>
                <Text style={[Typography.heading3]}>Time Spent</Text>
                <View style={Layout.flexRowCenter}>
                    {/* Conditionally render the previous week button */}
                    {currentIndex > 0 && (
                        <Pressable onPress={handlePrevWeek}>
                            <ArrowLeft3 color={Colors.muted} />
                        </Pressable>
                    )}
                    <Text style={[
                        Typography.captionText,
                        { lineHeight: 20 }
                    ]}>SEE HISTORY</Text>
                    {/* Conditionally render the next week button */}
                    {currentIndex < prevWeekData.length - 1 && (
                        <Pressable onPress={handleNextWeek}>
                            <ArrowRight3 color={Colors.muted} />
                        </Pressable>
                    )}
                </View>
            </View>
            <Text style={[Typography.bodyText, {
                marginBottom: 15,
                fontSize: 15,
                color: Colors.muted
            }]}>
                A bar chart showing time you spend over the last week on the app.
            </Text>

            {prevWeekData.length > 0 && updatedData ? (
                <LineChart
                    data={updatedData}
                    spacing={68}
                    color={Colors.primary}
                    startFillColor={Colors.secondary}
                    rulesType="solid"
                    yAxisThickness={0}
                    xAxisThickness={0}
                    noOfSections={5}
                    dataPointsColor={Colors.secondary}
                    xAxisLabelTextStyle={{
                        color: Colors.muted
                    }}
                />
            ) : <Text>No data available.</Text>}
        </View>
    )
}