import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Typography from "../../theme/typography";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Layout from "../../theme/layout";
import Colors from "../../theme/colors";
import { useState } from "react";
import { Avatars } from "../../services/constants";
import { axiosRequest } from "../../hooks/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { toFormData } from "axios";
import { useSession } from "../../hooks/auth";
import AvatarSelection from "../../components/AvatarSelection";

function Info({ title, children }) {
    return (
        <View style={{ marginVertical: 5 }}>
            <Text style={[Typography.heading3, { fontSize: 18, opacity: .6, marginBottom: -4 }]}>{title}</Text>
            {children}
        </View>
    )
}

const schema = yup.object().shape({
    gender: yup.string().required('Gender is required'),
    age: yup
        .number()
        .required('Age is required.')
        .min(12).max(75),
    meditationExperience: yup
        .number("This field should be an integer")
        .required('Meditation Experience is required.')
        .min(0).max(200),
});

export default function createProfile() {

    const router = useRouter()
    const { refreshUser } = useSession()

    const [unit, setUnit] = useState('months');
    const [image, setImage] = useState(null)
    const [avatar, setAvatar] = useState(0)
    const [loading, setLoading] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            gender: '',
            meditationExperience: null,
            age: null,
        },
    });

    async function handleCreateProfile(values) {
        setLoading(true)

        if (!image && avatar === -1) {
            alert('Please upload a proper image')
        }

        if (unit === 'years') {
            values["meditationExperience"] = values["meditationExperience"] * 12;
        }

        refreshUser();
        const formData = toFormData(values);
        formData.append('avatar', avatar !== -1 ? Avatars[avatar] : image)

        const res = await axiosRequest('users/', {
            method: 'put',
            data: formData
        }, true);
        setLoading(false)

        if (res.success) {
            refreshUser();
            router.replace('/(tabs)/home');
        } else {
            alert("Something went wrong")
        }
    }

    return (
        <SafeAreaView style={[Layout.screenView, { alignItems: 'flex-start' }]}>
            <ScrollView nestedScrollEnabled contentContainerStyle={{ paddingTop: 30 }}>
                <StatusBar style="dark" />

                <Text style={[Typography.heading1]}>Create Profile</Text>
                <Text style={[Typography.captionText]}>Please enter the information and choose yourself an avatar or upload your own!</Text>

                <AvatarSelection
                    image={image} setImage={setImage}
                    avatar={avatar} setAvatar={setAvatar}
                />

                <Text style={[Typography.heading3, { marginVertical: 20 }]}>Tell us more about yourself</Text>

                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <Info title={"Gender"}>
                            <Picker
                                selectedValue={value}
                                onValueChange={onChange}
                            >
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                                <Picker.Item label="Other" value="Other" />
                            </Picker>
                        </Info>
                    )}
                    name="gender"
                />
                {errors.gender && <Text style={Typography.errorText}>{errors.gender.message}</Text>}

                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <Info title={"Age"}>
                            <Input
                                placeHolder="Age" type='numeric'
                                handleFormik={{ name: 'age', onChange, value }}
                            />
                        </Info>
                    )}
                    name="age"
                />
                {errors.age && <Text style={Typography.errorText}>{errors.age.message}</Text>}

                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <Info title={"Meditation Experience"}>
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ flex: 1 }}>
                                    <Input
                                        placeHolder="Meditation Experience"
                                        type="numeric"
                                        handleFormik={{ name: 'meditationExperience', onChange, value }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Picker
                                        selectedValue={unit}
                                        style={{ height: 50, width: 150 }}
                                        onValueChange={(itemValue, itemIndex) => setUnit(itemValue)}
                                    >
                                        <Picker.Item label="Months" value="months" />
                                        <Picker.Item label="Years" value="years" />
                                    </Picker>
                                </View>
                            </View>
                        </Info>
                    )}
                    name="meditationExperience"
                />
                {errors.meditationExperience && <Text style={Typography.errorText}>{errors.meditationExperience.message}</Text>}

                <Button
                    title="Continue"
                    onPress={handleSubmit(handleCreateProfile)}
                    isLoading={loading}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 200,
        marginRight: 10,
        objectFit: 'contain'
        // backgroundColor: Colors.muted
    },
    activeAvatar: {
        backgroundColor: Colors.muted
    }
})