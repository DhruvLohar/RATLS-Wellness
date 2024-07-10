import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, ToastAndroid, View } from 'react-native';

import { ChallengesJSON } from "../../services/challenges";
import Layout from "../../theme/layout";
import Colors from "../../theme/colors";
import Typography from "../../theme/typography";
import { useLocalSearchParams } from 'expo-router';
import ChallengeModal from '../../components/ChallengeModal';
import { axiosRequest, fetchFromAPI } from '../../hooks/api';
import LottieView from 'lottie-react-native';

export default function ChallengeScreen() {

    const { slug } = useLocalSearchParams();

    const confettiRef = useRef(null);

    function triggerConfetti() {
        confettiRef.current?.play(0);
    }

    const [completedChallenges, setCompletedChallenges] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedChallenge, setSelectedChallenge] = useState(0);

    const challenge = ChallengesJSON.find(item => item.slug === slug);

    const data = Array.from({ length: 21 }, (_, index) => ({ id: `${index + 1}`, number: index + 1 }));

    function toggleModal(challengeId) {
        if (
            (completedChallenges.length === 0 && challengeId !== 0 ||
            completedChallenges.length > 0 && Math.max(...completedChallenges) !== challengeId - 1) &&
            !completedChallenges.includes(challengeId)
        ) {
            ToastAndroid.showWithGravity(
                "Complete the previous challenge first to unlock this challenge.",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        } else {
            setSelectedChallenge(challengeId);
            setModalVisible(prev => !prev);
        }
    }

    async function markChallengeComplete(index) {
        const res = await axiosRequest('users/markChallengeComplete/', {
            method: 'post',
            data: {
                challengeSlug: challenge?.slug,
                challengeIndex: index
            }
        }, false);
        if (res.success) {
            ToastAndroid.showWithGravity(
                "Congratulations on completing this challenge! Keep it up.",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
            fetchCompletedChallenges()
            setModalVisible(prev => !prev);
            triggerConfetti()
        } else {
            ToastAndroid.showWithGravity(
                res?.message || "You can complete this challenge tommorrow",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
    }

    async function fetchCompletedChallenges() {
        const res = await fetchFromAPI('users/');
        if (res.success) {
            setCompletedChallenges(res?.user?.challengesMap[challenge?.slug]);
        }
    }

    useEffect(() => {
        fetchCompletedChallenges()
    }, [])

    const renderItem = ({ item }) => (
        <Pressable
            style={[styles.item, completedChallenges.includes(item.number - 1) && styles.activeItem]}
            android_ripple={{
                color: Colors.muted
            }}
            onPress={() => toggleModal(item.number - 1)}
        >
            <Text style={[styles.number]}>{item.number}</Text>
        </Pressable>
    );

    return (
        <>
            <View style={[Layout.screenView, { alignItems: 'flex-start' }]}>
                <Text style={[Typography.heading1]}>{challenge?.title}</Text>
                <Text style={[Typography.captionText, { marginBottom: 20 }]}>
                    {challenge?.description}
                </Text>

                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={5}
                    columnWrapperStyle={styles.container}
                />

                <ChallengeModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}

                    challengeSlug={challenge?.slug}
                    selectedChallenge={selectedChallenge}
                    onComplete={markChallengeComplete}
                    completedChallenges={completedChallenges}
                />
            </View>
            <View style={Layout.lottie} pointerEvents="none">
                <LottieView
                    ref={confettiRef}
                    source={require('../../assets/lottie/confetti.json')}
                    autoPlay={false}
                    loop={false}
                    style={[{ width: '100%', height: '100%' }]}
                    resizeMode='cover'
                    pointerEvents="none"
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.cardBg,
        width: '18%',
        height: '18%',
        aspectRatio: 1,
        marginVertical: 4,
        borderRadius: 4,
    },
    activeItem: {
        backgroundColor: Colors.secondary
    },
    activeText: {
        color: Colors.light
    },

    number: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
