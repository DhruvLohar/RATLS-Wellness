import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import Layout from "../../theme/layout";
import Colors from "../../theme/colors";
import Typography from "../../theme/typography";
import { InbuiltSounds } from '../../services/constants';
import MyMedia from '../../components/MyMedia';

export default function Meditate() {

    const router = useRouter()

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

            <Text style={[Typography.heading3, { marginTop: 20 }]}>Featured Yoga Lessons</Text>
            <Text style={[Typography.captionText, {
                marginBottom: 15,
                marginTop: -4,
            }]}>Checkout some latest Yoga lessons from Youtube!</Text>

            <YoutubePlayer
                width={"100%"}
                height={250}
                videoId={"1xRX1MuoImw"}
            />

            <YoutubePlayer
                width={"100%"}
                height={250}
                videoId={"jb9B39zrzEo"}
            />

            <YoutubePlayer
                width={"100%"}
                height={250}
                videoId={"xE_pGjpycac"}
            />

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
