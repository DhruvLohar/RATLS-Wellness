import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Formik } from 'formik';

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

export default function createProfile() {

    const router = useRouter()
    const { refreshUser } = useSession()

    const [image, setImage] = useState(null)
    const [avatar, setAvatar] = useState(0)

    async function handleCreateProfile(values) {

        if (!image && avatar === -1) {
            alert('Please upload a proper image')
        }

        const formData = toFormData(values);
        formData.append('avatar', avatar !== -1 ? Avatars[avatar] : image)

        const res = await axiosRequest('users/', {
            method: 'put',
            data: formData
        }, true);

        if (res.success) {
            refreshUser();
            router.replace('/');
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

                <Formik
                    initialValues={{ age: '', gender: '', meditationExperience: '' }}
                    onSubmit={handleCreateProfile}
                >
                    {({ handleChange, handleSubmit, values }) => (
                        <>
                            <Info title={"Gender"}>
                                <Input
                                    placeHolder="Gender" type='default'
                                    handleFormik={{ name: 'gender', onChange: handleChange, value: values.gender }}
                                />
                            </Info>
                            <Info title={"Age"}>
                                <Input
                                    placeHolder="Age" type='numeric'
                                    handleFormik={{ name: 'age', onChange: handleChange, value: values.age }}
                                />
                            </Info>
                            <Info title={"Meditation Experience (in months)"}>
                                <Input
                                    placeHolder="Meditation Experience (in months)"
                                    type='numeric'
                                    handleFormik={{ name: 'meditationExperience', onChange: handleChange, value: values.meditationExperience }}
                                />
                            </Info>
                            <Button
                                title="Continue"
                                onPress={handleSubmit}
                                type={"fill"}
                                style={{ marginBottom: 40 }}
                                disabled={[values.age, values.meditationExperience, values.gender].includes("")}
                            />
                        </>
                    )}
                </Formik>
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