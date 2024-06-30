import { PieChart } from "react-native-gifted-charts"
import Colors from "../theme/colors"
import Typography from "../theme/typography"
import { Text, View } from "react-native"


export default function PieChartView({ title, desc, data }) {
    return (
        <View style={{ flex: 1, marginVertical: 15 }}>
            <Text style={[Typography.heading3]}>{title}</Text>
            <Text style={[Typography.bodyText, {
                marginBottom: 15,
                fontSize: 15,
                color: Colors.muted
            }]}>{desc}</Text>

            <PieChart
                data={[
                    { "color": "#FFB3BA", "value": 3 },
                    { "color": "#FFDFBA", "value": 2 },
                    { "color": "#FFFFBA", "value": 2 },
                    { "color": "#BAFFC9", "value": 2 },
                    { "color": "#BAE1FF", "value": 2 },
                    { "color": "#CBAACB", "value": 2 },
                    { "color": "#FFCCD2", "value": 6 },
                    { "color": "#F1F1C3", "value": 0 },
                    { "color": "#D4C4E9", "value": 0 },
                    { "color": "#C3E5F1", "value": 0 },
                    { "color": "#F1C3BA", "value": 6 },
                    { "color": "#FFB7B2", "value": 2 },
                    { "color": "#FFDAC1", "value": 2 },
                    { "color": "#F3E5AB", "value": 1 }
                ]}
                focusOnPress
            />
        </View>
    )
}