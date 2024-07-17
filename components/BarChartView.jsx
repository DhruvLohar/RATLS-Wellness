import { BarChart } from "react-native-gifted-charts";
import Colors from "../theme/colors"
import Typography from "../theme/typography"
import { Text, View } from "react-native"

export default function BarChartView({
    title, desc
}) {

    const barData = [
        { value: 2, label: 'Mon' },
        { value: 5, label: 'Tue' },
        { value: 7, label: 'Wed'},
        { value: 3, label: 'Thr' },
        { value: 6, label: 'Fri' },
        { value: 2, label: 'Sat' },
        { value: 3, label: 'Sun' },
    ];

    return (
        <View style={{ width: '100%', marginVertical: 15, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[Typography.heading3, { alignSelf: 'flex-start' }]}>{title}</Text>

            <Text style={[Typography.bodyText, {
                marginBottom: 15,
                fontSize: 15,
                color: Colors.muted,
                alignSelf: 'flex-start'
            }]}>{desc}</Text>

            <BarChart
                frontColor={Colors.primary}
                noOfSections={6}
                roundedTop
                xAxisLabelTextStyle={{
                    color: Colors.muted
                }}
                data={barData}
            />

        </View>
    )
}