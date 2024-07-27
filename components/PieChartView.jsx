import { PieChart } from "react-native-gifted-charts"
import Colors from "../theme/colors"
import Typography from "../theme/typography"
import { Text, View } from "react-native"
import { useState } from "react"


export default function PieChartView({ 
    title, desc, data
}) {

    const [emotion, setEmotion] = useState(null)

    function handleLabelPress(e) {
        setEmotion(e)
    }

    return (
        <View style={{ width: '100%', marginVertical: 15, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[Typography.heading3, {alignSelf: 'flex-start'}]}>{title}</Text>
            <Text style={[Typography.bodyText, {
                marginBottom: 15,
                fontSize: 15,
                color: Colors.muted,
                alignSelf: 'flex-start'
            }]}>{desc}</Text>

            {data && data.length > 0 && (
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
            )}

        </View>
    )
}