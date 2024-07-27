import { Pressable, ScrollView, Text, View } from "react-native"
import Typography from "../../theme/typography"
import Colors from "../../theme/colors"
import { Moods } from "../../services/constants"
import Layout from "../../theme/layout"
import { TextButton } from "../Button"

export default function MoodSelector({ 
    todaysMood, handleMoodSelect,
    editMood, setEditMood,
    isFirstMood
}) {

    const EmojiItem = ({ mood, index }) => (
        <Pressable
            key={index}
            android_ripple={{
                color: Colors.muted,
                borderless: true
            }}
            style={{ alignItems: 'center', marginRight: 15 }}
            onPress={() => handleMoodSelect(mood.name)}
        >
            <Text style={{ fontSize: 46, marginBottom: 5 }}>{mood.emoji}</Text>
            <Text style={[Typography.bodyText, { color: Colors.muted, fontSize: 12 }]}>{mood.name}</Text>
        </Pressable>
    )

    return (
        <>
            <View style={{ width: '100%' ,flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={[Typography.heading3, {marginRight: 'auto'}]}>
                    {todaysMood ? "Your mood for today is" : "How are you feeling today ?"}
                </Text>
                {!isFirstMood && (
                    <TextButton 
                        title="Edit Mood" 
                        textStyle={{ color: Colors.muted }}
                        onPress={() => setEditMood(prev => !prev)}
                    />
                )}
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[
                    Layout.flexRowCenter,
                    { marginVertical: 10 }
                ]}
            >
                {todaysMood && !editMood
                    ? (<EmojiItem mood={todaysMood} index={1} />)
                    : (
                        <>
                            {Moods.map((mood, i) => <EmojiItem mood={mood} key={i} />)}
                        </>
                    )
                }

            </ScrollView>
        </>
    )
}