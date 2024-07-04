import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Formik } from "formik";
import { useRouter } from "expo-router";
import { GalleryEdit } from "iconsax-react-native";

import { useSession } from '../../hooks/auth';
import Button from "../../components/Button"
import Layout from "../../theme/layout";
import Colors from "../../theme/colors";
import Typography from "../../theme/typography";
import Input from "../../components/Input";
import AvatarSelection from "../../components/AvatarSelection";
import { toFormData } from "axios";
import { axiosRequest } from "../../hooks/api";
import { Avatars } from "../../services/constants";

function Info({ title, children }) {
    return (
        <View style={styles.infoContainer}>
            <Text style={[Typography.heading3, { fontSize: 16, opacity: .6 }]}>{title}</Text>
            {children}
        </View>
    )
}

export default function EditProfile() {

    const router = useRouter()
    const { session, refreshUser } = useSession()

    const [image, setImage] = useState(null)
    const [avatar, setAvatar] = useState(0)

    const [userData, setUserData] = useState({
        name: session?.name || "",
        email: session?.email || "",
        gender: session?.gender || "",
        age: session?.age.toString() || "",
        meditationExperience: session?.meditationExperience.toString() || "",
    })

    async function handleUpdateProfile(values) {
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
            router.back();
        } else {
            alert("Something went wrong")
        }
    }

    return (
        <ScrollView style={[Layout.screenView]} contentContainerStyle={{ alignItems: 'flex-start' }}>

            <Text style={[Typography.heading3, { marginTop: 30 }]}>Update Avatar</Text>
            <AvatarSelection
                image={image} setImage={setImage}
                avatar={avatar} setAvatar={setAvatar}
            />

            <Text style={[Typography.heading3, { marginTop: 30 }]}>Personal Information</Text>
            <Formik
                initialValues={userData}
                enableReinitialize
                onSubmit={handleUpdateProfile}
            >
                {({ handleChange, handleSubmit, values }) => (
                    <>
                        <View style={{ marginBottom: 25, marginTop: 20 }}>
                            <Info title={"Name"}>
                                <Input
                                    placeHolder="Name" type='default'
                                    handleFormik={{ name: 'name', onChange: handleChange, value: values.name }}
                                />
                            </Info>
                            <Info title="Email">
                                <Input
                                    placeHolder="Email" type='email-address'
                                    handleFormik={{ name: 'email', onChange: handleChange, value: values.email }}
                                />
                            </Info>
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
                        </View>
                        <Button
                            title="Update"
                            onPress={handleSubmit}
                            type={"fill"}
                        />
                        <Button
                            title={"Go Back"} type={"outline"}
                            style={{ marginVertical: 5 }}
                        />
                    </>
                )}
            </Formik>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    profile: {
        width: 120,
        height: 120,
        borderRadius: 250,
        marginRight: 20
    },

    infoContainer: {
        marginVertical: 5
    }
})