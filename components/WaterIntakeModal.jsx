import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '../theme/colors';
import { Add } from 'iconsax-react-native';
import Layout from '../theme/layout';
import Typography from '../theme/typography';
import Button, { TextButton } from './Button';
import { useSession } from '../hooks/auth';
import Input from './Input';

export default function WaterIntakeModal({
    modalVisible, setModalVisible,
    handleGoalUpdate
}) {

    const { session } = useSession();

    const [quantity, setQuantity] = useState("")

    function getWaterRecommendation() {
        let glasses = 0;
        const age = session?.age
        const gender = session?.gender?.toLowerCase()

        if (age >= 14 && age <= 18) {
            if (gender === 'male') {
                glasses = 14;
            } else if (gender === 'female') {
                glasses = 10;
            }
        } else if (age > 18 && age < 65) {
            if (gender === 'male') {
                glasses = 16;
            } else if (gender === 'female') {
                glasses = 11;
            }
        } else if (age >= 65) {
            if (gender === 'male') {
                glasses = 12;
            } else if (gender === 'female') {
                glasses = 10;
            }
        }

        return glasses;
    }

    const recommendedGlasses = getWaterRecommendation()

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <View style={[styles.centeredView, { backgroundColor: "#1b1b1b50" }]}>
                    <View style={styles.modalView}>
                        <View style={[Layout.flexRowCenter, { width: '100%' }]}>
                            <Text style={[Typography.heading2, { marginRight: 'auto', lineHeight: 30, fontSize: 18 }]}>
                                Set your water goal
                            </Text>
                            <Add rotation={45} color={Colors.dark} size={28} onPress={() => setModalVisible(!modalVisible)} />
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <Input
                                    placeHolder="Quantity"
                                    type="numeric"
                                    handleFormik={{ name: 'quantity', onChange: setQuantity, value: quantity }}
                                />
                            </View>
                            <Text style={[Typography.bodyText, { flex: 0.3, marginLeft: 20 }]}>
                                Glasses
                            </Text>
                        </View>

                        <Text style={Typography.captionText}>1 Glass of water = 8 Ounces or 240 ML</Text>

                        <Button
                            title={"Set Goal"}
                            onPress={() => handleGoalUpdate(quantity)}
                        />

                        <Pressable
                            onPress={() => {
                                setQuantity(recommendedGlasses.toString())
                            }}
                        >
                            <Text
                                style={[
                                    Typography.heading3,
                                    styles.challengeText
                                ]}
                            >
                                Average {session?.gender} of age {session?.age} drinks about {recommendedGlasses} glasses of water per day. Tap here to set as your goal.
                            </Text>
                        </Pressable>
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
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 35,
        paddingBottom: 20,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.cardBg
    },

    challengeText: {
        fontSize: 14, marginTop: 20,
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