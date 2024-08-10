import { Text, View, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import Colors from "../../theme/colors";
import Typography from "../../theme/typography";
import { useEffect, useState } from "react";
import { axiosRequest } from "../../hooks/api";
import Layout from "../../theme/layout";
import { ArrowLeft3, ArrowRight3 } from "iconsax-react-native";

export default function SleepGraph() {
    const [prevWeekData, setPrevWeekData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    async function getGraphData() {
        const res = await axiosRequest('sessions/getSleepGraphData/', {
            method: 'get'
        }, false);

        if (res.success) {
            setPrevWeekData(res.data);
        }
    }

    useEffect(() => {
        getGraphData();
    }, []);

    const handlePrevWeek = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNextWeek = () => {
        if (currentIndex < prevWeekData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <View style={{ width: '100%', marginVertical: 15 }}>
            <View style={Layout.flexRowCenter}>
                <Text style={[Typography.heading3]}>Sleep Tracker</Text>
                <View style={Layout.flexRowCenter}>
                    {/* Conditionally render the previous week button */}
                    {currentIndex > 0 && (
                        <TouchableOpacity onPress={handlePrevWeek}>
                            <ArrowLeft3 color={Colors.muted} />
                        </TouchableOpacity>
                    )}
                    <Text style={[
                        Typography.captionText,
                        { lineHeight: 20 }
                    ]}>SWITCH WEEKS</Text>
                    {/* Conditionally render the next week button */}
                    {currentIndex < prevWeekData.length - 1 && (
                        <TouchableOpacity onPress={handleNextWeek}>
                            <ArrowRight3 color={Colors.muted} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <Text style={[Typography.bodyText, {
                marginBottom: 15,
                fontSize: 15,
                color: Colors.muted
            }]}>Your Sleep Duration for this week in hours.</Text>

            {prevWeekData.length > 0 ? (
                <LineChart
                    areaChart
                    curved
                    hideDataPoints
                    data={prevWeekData[currentIndex]}
                    spacing={68}
                    color={Colors.primary}
                    startFillColor={Colors.secondary}
                    rulesType="solid"
                    yAxisThickness={0}
                    xAxisThickness={0}
                    noOfSections={5}
                    xAxisLabelTextStyle={{
                        color: Colors.muted
                    }}
                />
            ) : (
                <Text>No data available</Text>
            )}
        </View>
    );
}
