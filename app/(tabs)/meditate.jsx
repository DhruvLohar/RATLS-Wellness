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

export default function Meditate() {

    const router = useRouter()
    const [lowToHigh, setLowToHigh] = useState(true)
    const [youtubeUrls, setYoutubeUrls] = useState([
        "1xRX1MuoImw",
        "jb9B39zrzEo",
        "xE_pGjpycac"
    ]);

    function toggleYTUrls() {
        setYoutubeUrls(prev => prev.reverse())
        setLowToHigh(prev => !prev)
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

            <View style={{ width: '100%' ,flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                <Text style={[Typography.heading3, {marginRight: 'auto'}]}>Featured Yoga Lessons</Text>
                <Filter color={Colors.dark} size={20} />
                <TextButton
                    title={lowToHigh ? "Shortest First" : "Longest First"}
                    textStyle={{ color: Colors.muted }}
                    onPress={toggleYTUrls}
                />
            </View>

            {youtubeUrls.map(urls => (
                <YoutubePlayer
                    key={urls}
                    width={"100%"}
                    height={250}
                    videoId={urls}
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
