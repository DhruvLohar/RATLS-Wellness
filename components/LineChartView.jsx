import { LineChart } from "react-native-gifted-charts"
import Colors from "../theme/colors"
import Typography from "../theme/typography"
import { Text, View } from "react-native"


export default function LineChartView({ title, desc, data }) {
    return (
        <View style={{ width: '100%', marginVertical: 15 }}>
            <Text style={[Typography.heading3]}>{title}</Text>
            <Text style={[Typography.bodyText, {
                marginBottom: 15,
                fontSize: 15,
                color: Colors.muted
            }]}>{desc}</Text>

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
    )
}