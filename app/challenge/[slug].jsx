import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { ChallengesJSON } from "../../services/challenges";
import Layout from "../../theme/layout";
import Colors from "../../theme/colors";
import Typography from "../../theme/typography";
import { useLocalSearchParams } from 'expo-router';
import ChallengeModal from '../../components/ChallengeModal';

export default function ChallengeScreen() {

    const { slug } = useLocalSearchParams();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedChallenge, setSelectedChallenge] = useState(0);

    const challenge = ChallengesJSON.find(item => item.slug === slug);

    const data = Array.from({ length: 21 }, (_, index) => ({ id: `${index + 1}`, number: index + 1 }));

    function toggleModal(challengeId) {
        setSelectedChallenge(challengeId);
        setModalVisible(prev => !prev);
    }

    const renderItem = ({ item }) => (
        <Pressable 
            style={[styles.item]}
            android_ripple={{
                color: Colors.muted 
            }}
            onPress={() => toggleModal(item.number - 1)}
        >
            <Text style={[styles.number]}>{item.number}</Text>
        </Pressable>
    );

    return (
        <View style={[Layout.screenView, { alignItems: 'flex-start' }]}>
            <Text style={[Typography.heading1]}>{challenge?.title}</Text>
            <Text style={[Typography.captionText, { marginBottom: 20 }]}>
                {challenge.description}
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

                challengeSlug={challenge.slug}
                selectedChallenge={selectedChallenge}
            />
        </View>
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
