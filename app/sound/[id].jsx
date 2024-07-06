import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Slider from "@react-native-community/slider";
import { PauseCircle, PlayCircle } from "iconsax-react-native";
import { Audio } from 'expo-av';

import Colors from "../../theme/colors";
import { InbuiltSounds } from "../../services/constants";
import Layout from "../../theme/layout";
import Typography from "../../theme/typography";
import { useEffect, useRef, useState } from "react";

export default function MusicScreen() {

    const { id } = useLocalSearchParams();
    const [playbackInstance, setPlaybackInstance] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackStatus, setPlaybackStatus] = useState(null);
    const [sliderValue, setSliderValue] = useState(0);
    const [isSliding, setIsSliding] = useState(false);
    const intervalRef = useRef(null)

    const sound = InbuiltSounds.find(item => item.id.toString() === id);

    useEffect(() => {
        if (playbackInstance) {
            playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        }
        return () => {
            stopAudio();
        };
    }, [playbackInstance]);

    useEffect(() => {
        if (isPlaying && playbackStatus) {
            startCountdown();
        } else {
            stopCountdown();
        }

        return () => stopCountdown();
    }, [isPlaying, playbackStatus]);

    const startCountdown = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            setSliderValue((prevValue) => {
                const newValue = prevValue + 1000;
                return newValue < playbackStatus.durationMillis ? newValue : playbackStatus.durationMillis;
            });
        }, 1000);
    };

    const stopCountdown = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const loadAudio = async () => {
        if (playbackInstance) {
            await playbackInstance.unloadAsync();
        }
        const { sound: newPlaybackInstance } = await Audio.Sound.createAsync(
            { uri: sound.audioUrl },
            { shouldPlay: true },
            onPlaybackStatusUpdate
        );
        setPlaybackInstance(newPlaybackInstance);
        setIsPlaying(true);
    };

    const onPlaybackStatusUpdate = (status) => {
        if (status.isLoaded) {
            setPlaybackStatus(status);
            if (!isSliding) {
                setSliderValue(status.positionMillis);
            }
            if (status.didJustFinish) {
                handlePause();
            }
        }
    };

    const handlePlayPause = async () => {
        if (playbackInstance) {
            if (isPlaying) {
                await playbackInstance.pauseAsync();
                setIsPlaying(false);
            } else {
                await playbackInstance.playAsync();
                setIsPlaying(true);
            }
        } else {
            await loadAudio();
        }
    };

    const stopAudio = async () => {
        if (playbackInstance) {
            await playbackInstance.unloadAsync();
            setPlaybackInstance(null);
            setIsPlaying(false);
        }
    };

    const handleSliderComplete = async (value) => {
        setIsSliding(false);
        if (playbackInstance) {
            await playbackInstance.setPositionAsync(value);
        }
    };

    const formatTime = (millis) => {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            <Image
                source={{ uri: sound?.image }}
                style={styles.bgImage}
            />
            <LinearGradient
                colors={['transparent', '#000000F0']}
                style={styles.gradientOverlay}
            />
            <LinearGradient
                colors={['#000000F0', 'transparent']}
                style={[styles.gradientOverlay, { top: 0 }]}
            />

            <Text style={[Typography.heading2, styles.headingText]}>
                Take a deep breath & Calm your mind.
            </Text>

            <View style={[styles.textContainer]}>
                <View style={[Layout.flexRowCenter, { width: '100%', justifyContent: 'space-between' }]}>
                    <View>
                        <Text style={[Typography.heading3, { color: Colors.light }]}>{sound?.title}</Text>
                        <Text style={[Typography.captionText, { marginTop: -4 }]}>Soundscape</Text>
                    </View>
                    <Pressable onPress={handlePlayPause}>
                        {isPlaying ? (
                            <PauseCircle
                                color={Colors.light}
                                variant="Bold"
                                size={48}
                            />
                        ) : (
                            <PlayCircle
                                color={Colors.light}
                                variant="Bold"
                                size={48}
                            />
                        )}
                    </Pressable>
                </View>
                <View style={[Layout.flexRowCenter, { width: '100%', marginTop: 20 }]}>
                    <Text style={[Typography.captionText, { marginTop: 4, width: 35 }]}>
                        {playbackStatus ? formatTime(sliderValue) : "0:00"}
                    </Text>
                    <Slider
                        style={{ width: "80%" }}
                        thumbTintColor={Colors.secondary}
                        minimumTrackTintColor={Colors.secondary}
                        maximumTrackTintColor={Colors.muted}
                        minimumValue={0}
                        maximumValue={playbackStatus?.durationMillis || 1}
                        value={sliderValue}
                        onSlidingComplete={handleSliderComplete}
                        onSlidingStart={() => setIsSliding(true)}
                    />
                    <Text style={[Typography.captionText, { marginTop: 4 }]}>
                        {playbackStatus ? formatTime(playbackStatus.durationMillis) : "0:00"}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%', height: '100%', backgroundColor: 'black',
        position: 'relative'
    },
    textContainer: {
        width: '100%',
        position: 'absolute', bottom: 40, paddingHorizontal: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },

    headingText: {
        width: '100%',
        color: Colors.light, position: 'absolute', top: 80,
        textAlign: 'center',
        fontSize: 16
    },

    bgImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    gradientOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '25%'
    }
})