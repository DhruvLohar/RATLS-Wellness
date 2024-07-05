import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import Colors from '../theme/colors';
import { Add } from 'iconsax-react-native';
import Layout from '../theme/layout';
import Typography from '../theme/typography';
import Button from './Button';
import { ChallengesJSON } from '../services/challenges';

export default function ChallengeModal({
    modalVisible, setModalVisible,
    selectedChallenge, challengeSlug
}) {

    const challenge = ChallengesJSON.find(item => item.slug === challengeSlug);
    const title = challenge.challenges[selectedChallenge];


    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={[styles.centeredView, { backgroundColor: "#1b1b1b50" }]}>
                    <View style={styles.modalView}>
                        <View style={[Layout.flexRowCenter, { width: '100%' }]}>
                            <Text style={[Typography.heading2, { marginRight: 'auto', lineHeight: 30, fontSize: 22 }]}>
                                Challenge No. {selectedChallenge + 1}
                            </Text>
                            <Add rotation={45} color={Colors.dark} size={30} onPress={() => setModalVisible(!modalVisible)} />
                        </View>

                        <Text
                            style={[
                                Typography.heading2,
                                styles.challengeText
                            ]}
                        >
                            {title}
                        </Text>
                        <Button title={"Challenge Completed"} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalView: {
        width: '100%',
        backgroundColor: Colors.light,
        borderRadius: 30,
        padding: 35,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.cardBg
    },

    challengeText: {
        fontSize: 20, textAlign: 'center', width: "95%", marginVertical: 30,
        color: Colors.muted
    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});