import { PieChart } from "react-native-gifted-charts"
import Colors from "../theme/colors"
import Typography from "../theme/typography"
import { Text, View } from "react-native"
import { useEffect, useState } from "react"
import { fetchFromAPI } from "../hooks/api"


export default function PieChartView({ title, desc }) {

    const [emotion, setEmotion] = useState(null)
    const [data, setData] = useState([])

    function handleLabelPress(e) {
        setEmotion(e)
    }

    useEffect(() => {
        async function fetchData() {
            const { data } = await fetchFromAPI('sessions/moodMapChartData/');
            
            setData(data)
        }
        fetchData()
    }, []);

    return (
        <View style={{ width: '100%', marginVertical: 15, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[Typography.heading3, {alignSelf: 'flex-start'}]}>{title}</Text>
            <Text style={[Typography.bodyText, {
                marginBottom: 15,
                fontSize: 15,
                color: Colors.muted,
                alignSelf: 'flex-start'
            }]}>{desc}</Text>

            <PieChart
                donut
                sectionAutoFocus
                innerRadius={100}
                radius={170}
                innerCircleColor={'#232B5D'}
                centerLabelComponent={() => {
                    return (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {!emotion ? (
                                <Text style={{ fontSize: 14, color: 'white' }}>Press on any tile</Text>
                            ) : (
                                <>
                                    <Text
                                        style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
                                        {emotion?.percent}%
                                    </Text>
                                    <Text style={{ fontSize: 14, color: 'white' }}>{emotion?.mood}</Text>
                                </>
                            )}
                        </View>
                    );
                }}
                onPress={handleLabelPress}
                data={data}
            />
        </View>
    )
}