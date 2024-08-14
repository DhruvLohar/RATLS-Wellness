import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import Layout from "../../theme/layout";
import Colors from "../../theme/colors";
import Typography from "../../theme/typography";
import { InbuiltSounds } from '../../services/constants';
import MyMedia from '../../components/MyMedia';
import { TextButton } from '../../components/Button';
import { Filter } from 'iconsax-react-native';

const yogaYTUrls = [
    { url: "4muXiVVuTUk", time: 12.41 },
    { url: "ZhQ_2JU4Nv8", time: 13.49 },
    { url: "sTANio_2E0Q", time: 20.55 },
    { url: "hJbRpHZr_d0", time: 27.54 },
    { url: "yUBzHThl-d0", time: 30.54 },
    { url: "vbgxIwQoyN4", time: 40.39 },
]

const meditationYTUrls = [
    { url: "uTN29kj7e-w", time: 11.57 },
    { url: "vj0JDwQLof4", time: 9.18 },
    { url: "tqhxMUm7XXU", time: 13.14 },
    { url: "VpHz8Mb13_Y", time: 5.37 },
    { url: "JhLgDfTfk84", time: 39.47 },
    { url: "z0GtmPnqAd8", time: 15.28 },
]

export default function Meditate() {

    const router = useRouter()
    const [lowToHighYoga, setLowToHighYoga] = useState(true);
    const [lowToHighMeditation, setLowToHighMeditation] = useState(true);

    function toggleYogaYTUrls() {
        yogaYTUrls.sort((a, b) => (lowToHighYoga ? a.time - b.time : b.time - a.time));
        setLowToHighYoga(prev => !prev);
    }

    function toggleMeditationYTUrls() {
        meditationYTUrls.sort((a, b) => (lowToHighMeditation ? a.time - b.time : b.time - a.time));
        setLowToHighMeditation(prev => !prev);
    }

    return (
        <ScrollView style={[Layout.screenView]} contentContainerStyle={{ alignItems: 'flex-start' }}>
            <Text style={[Typography.heading1]}>Start your practice</Text>
            <Text style={[Typography.captionText]}>
                Explore diverse range of videos and spotify playlists, and start meditation and yoga just like that !
            </Text>

            <Text style={[Typography.heading3, { marginTop: 20 }]}>Deep Sleep Soundscapes</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[Layout.flexRowCenter, { marginTop: 10 }]}
            >
                {InbuiltSounds.map((sound, i) => (
                    <Pressable
                        key={i}
                        style={{ position: 'relative', marginRight: 10 }}
                        onPress={() => router.push(`/sound/${sound.id}`)}
                    >
                        <LinearGradient
                            colors={['transparent', Colors.dark]}
                            style={styles.gradientOverlay}
                        />
                        <Image
                            source={{ uri: sound.image }}
                            style={styles.soundCard}
                        />
                        <View style={styles.textContainer}>
                            <Text style={[Typography.heading3, styles.soundCardText]}>{sound.title}</Text>
                            <Text style={[Typography.captionText, { marginTop: -4, fontSize: 12 }]}>{sound.duration} Minutes</Text>
                        </View>
                    </Pressable>
                ))}
            </ScrollView>

            <MyMedia />

            {/* Yoga Lessons Section */}
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                <Text style={[Typography.heading3, { marginRight: 'auto', width: '60%' }]}>Featured Yoga Lessons</Text>
                <Filter color={Colors.muted} size={20} />
                <TextButton
                    title={lowToHighYoga ? "Shortest First" : "Longest First"}
                    textStyle={{ color: Colors.muted }}
                    onPress={toggleYogaYTUrls}
                />
            </View>

            {yogaYTUrls.map(({ url, time }, index) => (
                <YoutubePlayer
                    key={index}
                    width={"100%"}
                    height={250}
                    videoId={url}
                />
            ))}

            {/* Meditation Lessons Section */}
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                <Text style={[Typography.heading3, { marginRight: 'auto', width: '60%' }]}>Featured Meditation Lessons</Text>
                <Filter color={Colors.muted} size={20} />
                <TextButton
                    title={lowToHighMeditation ? "Shortest First" : "Longest First"}
                    textStyle={{ color: Colors.muted }}
                    onPress={toggleMeditationYTUrls}
                />
            </View>

            {meditationYTUrls.map(({ url, time }, index) => (
                <YoutubePlayer
                    key={index}
                    width={"100%"}
                    height={250}
                    videoId={url}
                />
            ))}


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    soundCard: {
        width: 160,
        height: 220,
        borderRadius: 15,
        backgroundColor: Colors.dark,
    },
    textContainer: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        padding: 10,
        zIndex: 8
    },
    soundCardText: {
        color: Colors.light,
        fontSize: 15
    },
    gradientOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '50%',
        borderRadius: 15,
        zIndex: 2,
    },
})
