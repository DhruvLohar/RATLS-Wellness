import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import Colors from '../../theme/colors';
import { Add } from 'iconsax-react-native';
import Layout from '../../theme/layout';
import Typography from '../../theme/typography';
import Button from './../Button';
import { useSession } from '../../hooks/auth';
import Input from './../Input';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { axiosRequest } from '../../hooks/api';

const schema = yup.object().shape({
    sleepDuration: yup.number().required("Enter Number of hours you slept").transform(value => (isNaN(value) ? undefined : value)).min(0).max(16).nullable(),
});

export default function SleepTrackingModal({
    // modalVisible, setModalVisible,
}) {

    const [modalVisible, setModalVisible] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            sleepDuration: null
        },
    });

    async function updateSleepRecord(values) {
        const res = await axiosRequest('sessions/updateSleepMap/', {
            method: 'put',
            data: {
                value: values.sleepDuration
            }
        }, false);

        if (res.success) {
            ToastAndroid.showWithGravity(
                "Your Sleep record was updated successfully!",
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
            );
            setModalVisible(prev => !prev)
        }
    }

    async function getSleepRecord() {
        const res = await axiosRequest('sessions/getSleepMap/', {
            method: 'get'
        }, false);

        if (!res.sleepRecordExists) {
            setModalVisible(true)
        }
    }

    useEffect(() => {
        getSleepRecord()
    }, [])

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <View style={[styles.centeredView, { backgroundColor: "#1b1b1b50" }]}>
                    <View style={styles.modalView}>
                        <View style={[Layout.flexRowCenter, { width: '100%', marginBottom: 20 }]}>
                            <Text style={[Typography.heading2, { width: '60%', marginRight: 'auto', fontSize: 16 }]}>
                                How was your sleep last night?
                            </Text>
                            {/* <Add rotation={45} color={Colors.dark} size={28} onPress={() => setModalVisible(!modalVisible)} /> */}
                        </View>

                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeHolder="Sleep Durations in hours"
                                    type='numeric'
                                    handleFormik={{ name: 'sleepDuration', onChange, value }}
                                />
                            )}
                            name="sleepDuration"
                        />
                        {errors.sleepDuration && <Text style={Typography.errorText}>{errors.sleepDuration.message}</Text>}

                        <Button
                            title={"Add Sleep Record"}
                            onPress={handleSubmit(updateSleepRecord)}
                        />

                        <Text style={Typography.captionText}>You should atleast have 8 hours of sleep daily for better health.</Text>
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