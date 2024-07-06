import { Add, Musicnote, Pause, Play } from "iconsax-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';

import Colors from "../theme/colors";
import Typography from "../theme/typography";
import Layout from "../theme/layout";
import { useEffect, useRef, useState } from "react";
import { axiosRequest } from "../hooks/api";

function DurationTimeline({ duration, position, onSlidingComplete, onSlidingStart }) {
    return (
        <View style={[Layout.flexRowCenter, { width: "80%" }]}>
            <Text style={[Typography.captionText, { width: 30, fontSize: 12 }]}>
                {formatDuration(position)}
            </Text>
            <Slider
                style={{ width: 250, height: 40 }}
                minimumValue={0}
                maximumValue={duration}
                value={position}
                minimumTrackTintColor={Colors.secondary}
                maximumTrackTintColor="#000000"
                onSlidingComplete={onSlidingComplete}
                onSlidingStart={onSlidingStart}
            />
            <Text style={[Typography.captionText, { width: 30, fontSize: 12 }]}>
                {formatDuration(duration)}
            </Text>
        </View>
    );
}

function formatDuration(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default function MyMedia() {
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackInstance, setPlaybackInstance] = useState(null);
    const [playbackStatus, setPlaybackStatus] = useState(null);
    const [sliderValue, setSliderValue] = useState(0);
    const [isSliding, setIsSliding] = useState(false);
    const intervalRef = useRef(null);

    async function uploadCustomSong(pickerResult, songData) {
        let uri = pickerResult.assets[0].uri;
        
        const song = {
            uri: uri,
            type: pickerResult?.assets[0]?.mimeType,
            name: pickerResult?.assets[0]?.name,
        };
        console.log(song)

        const data = new FormData();
        data.append("song", song);

        const res = await axiosRequest('users/addCustomSong/', {
            method: 'post',
            data: data,
        }, true);

        console.log(res)
    }

    useEffect(() => {
        if (playbackInstance) {
            playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        }
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

    async function handleUploadAudio() {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'audio/*',
                copyToCacheDirectory: false
            });

            if (!result.canceled) {
                const data = result.assets[0];

                const { sound } = await Audio.Sound.createAsync({ uri: data.uri });
                const status = await sound.getStatusAsync();

                const newSong = {
                    uri: data.uri,
                    name: data.name,
                    duration: status.durationMillis,
                };
                // uploadCustomSong(result, newSong)

                setSongs([...songs, newSong]);
            } else {
                console.log('Audio selection was cancelled');
            }
        } catch (error) {
            console.error('Error selecting audio:', error);
        }
    }

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

    const handlePlayPause = async (song) => {
        if (currentSong && currentSong.uri === song.uri) {
            if (isPlaying) {
                await handlePause();
            } else {
                await handlePlay();
            }
        } else {
            await handlePause();
            await handlePlay(song);
        }
    };

    const handlePlay = async (song = currentSong) => {
        if (!song) return;

        const { sound } = await Audio.Sound.createAsync({ uri: song.uri });
        setPlaybackInstance(sound);
        setCurrentSong(song);
        setIsPlaying(true);
        setSliderValue(0);
        await sound.playAsync();
    };

    const handlePause = async () => {
        if (playbackInstance) {
            await playbackInstance.pauseAsync();
            setIsPlaying(false);
            stopCountdown();
        }
    };

    const handleSliderComplete = async (value) => {
        setIsSliding(false);
        if (playbackInstance) {
            await playbackInstance.setPositionAsync(value);
        }
    };

    return (
        <View>
            <View style={[Layout.flexRowCenter, { width: '100%', marginVertical: 20 }]}>
                <Text
                    style={[
                        Typography.heading3,
                        { alignSelf: 'flex-start', marginRight: 'auto', lineHeight: 28 }
                    ]}
                >
                    My Media
                </Text>
                <Add color={Colors.dark} size={26} onPress={handleUploadAudio} />
            </View>

            {songs.length == 0 && (
                <Text style={[Typography.bodyText, { textAlign: 'center', marginTop: 20 }]}>
                    No media uploaded yet.
                </Text>
            )}
            {songs.map((item, i) => (
                <View style={[Layout.flexRowCenter, styles.mediaItem]} key={i}>
                    <Musicnote color={Colors.muted} style={{ marginRight: 10 }} />
                    <View style={{ marginRight: 'auto' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{item.name}</Text>
                        {currentSong?.uri === item.uri && (
                            <DurationTimeline
                                duration={currentSong.duration}
                                position={sliderValue}
                                onSlidingComplete={handleSliderComplete}
                                onSlidingStart={() => setIsSliding(true)}
                            />
                        )}
                    </View>
                    <Pressable onPress={() => handlePlayPause(item)}>
                        {isPlaying && currentSong?.uri === item.uri ? (
                            <Pause color={Colors.dark} />
                        ) : (
                            <Play color={Colors.dark} />
                        )}
                    </Pressable>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    mediaItem: {
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderColor: Colors.inputBG,
        paddingBottom: 10,
        marginBottom: 10
    }
});
