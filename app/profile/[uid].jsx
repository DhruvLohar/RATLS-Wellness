import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Formik } from "formik";

import { useSession } from '../../hooks/auth';
import Button from "../../components/Button"
import Layout from "../../theme/layout";
import Colors from "../../theme/colors";
import Typography from "../../theme/typography";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Calendar, Edit2, GalleryEdit, Sms, User } from "iconsax-react-native";
import Input from "../../components/Input";
import { useState } from "react";

function Info({ title, children }) {
    return (
        <View style={styles.infoContainer}>
            <Text style={[Typography.heading3, { fontSize: 18, opacity: .6 }]}>{title}</Text>
            {children}
        </View>
    )
}

export default function EditProfile() {

    const { uid } = useLocalSearchParams()
    const router = useRouter()
    const { signOut, session } = useSession()

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        gender: "",
        age: "",
        meditationExperience: "",
    })

    function handleUpdateProfile(values) {
        console.log(values)
    }

    return (
        <ScrollView style={[Layout.screenView]} contentContainerStyle={{ alignItems: 'flex-start' }}>

            <View style={[Layout.flexRowCenter, { width: '100%', justifyContent: 'flex-start' }]}>
                <Image
                    source={{ uri: "https://avatarfiles.alphacoders.com/375/375167.png" }}
                    style={styles.profile}
                />
                <View>
                    <Text style={Typography.heading2}>John Doe</Text>
                    <Text style={[Typography.captionText, { marginTop: -6, fontSize: 14 }]}>
                        Updating Profile
                    </Text>
                </View>
                <GalleryEdit color={Colors.dark} size={34} style={{marginLeft: 'auto'}} />
            </View>

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
                            title={"Go Back"}
                            type={"outline"}
                            style={{ marginTop: 20 }}
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