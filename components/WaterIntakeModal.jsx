import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '../theme/colors';
import { Add } from 'iconsax-react-native';
import Layout from '../theme/layout';
import Typography from '../theme/typography';
import Button, { TextButton } from './Button';
import { useSession } from '../hooks/auth';
import Input from './Input';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
    glasses: yup.number().required("Enter Number of Glasses").transform(value => (isNaN(value) ? undefined : value)).min(0).max(28).nullable(),
});

export default function WaterIntakeModal({
    modalVisible, setModalVisible,
    handleGoalUpdate
}) {

    const { session } = useSession();

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            glasses: null
        },
    });

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
                        <View style={[Layout.flexRowCenter, { width: '100%', marginBottom: 30 }]}>
                            <Text style={[Typography.heading2, { marginRight: 'auto', lineHeight: 30, fontSize: 18 }]}>
                                Set your water goal
                            </Text>
                            <Add rotation={45} color={Colors.dark} size={28} onPress={() => setModalVisible(!modalVisible)} />
                        </View>

                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeHolder="Number of Glasses"
                                    type='numeric'
                                    handleFormik={{ name: 'glasses', onChange, value }}
                                />
                            )}
                            name="glasses"
                        />
                        {errors.glasses && <Text style={Typography.errorText}>{errors.glasses.message}</Text>}

                        <Button
                            title={"Set Goal"}
                            onPress={handleSubmit(handleGoalUpdate)}
                        />

                        <Text style={Typography.captionText}>1 Glass of water = 8 Ounces or 240 ML</Text>

                        <Text
                            style={[
                                Typography.heading3,
                                styles.challengeText
                            ]}
                        >
                            Average {session?.gender} of age {session?.age} drinks about {recommendedGlasses} glasses of water per day.
                        </Text>
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
        color: Colors.muted,
        textAlign: 'center'
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