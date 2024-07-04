import { StatusBar } from "expo-status-bar";
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';

import Typography from "../../theme/typography";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Layout from "../../theme/layout";
import Colors from "../../theme/colors";
import { useState } from "react";
import { Avatars } from "../../services/constants";
import { API_URL } from "../../hooks/api";
import { SafeAreaView } from "react-native-safe-area-context";

function Info({ title, children }) {
    return (
        <View style={{ marginVertical: 5 }}>
            <Text style={[Typography.heading3, { fontSize: 18, opacity: .6, marginBottom: -4 }]}>{title}</Text>
            {children}
        </View>
    )
}

export default function createProfile() {

    const [image, setImage] = useState(null)
    const [avatar, setAvatar] = useState(0)

    async function handleUploadImage() {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 5],
            quality: 1,
        });

        if (!pickerResult.cancelled) {
            setAvatar(-1);
            setImage(pickerResult.assets[0].uri);
        }
    }

    function removeUploadImage() {
        setImage(null);
    }

    function handleCreateProfile(values) {

        console.log('Form Data:', values);
        console.log('Image URI:', image, avatar);
        
    }

    const renderItem = ({ item, index }) => (
        <Pressable
            onPress={() => setAvatar(index)}
        >
            <Image
                source={{ uri: `${API_URL}avatar/${item}` }}
                style={[styles.avatar, index === avatar && styles.activeAvatar]}
            />
        </Pressable>
    );

    return (
        <SafeAreaView style={[Layout.screenView, { alignItems: 'flex-start' }]}>
            <ScrollView nestedScrollEnabled contentContainerStyle={{ paddingTop: 30 }}>
                <StatusBar style="dark" />

                <Text style={[Typography.heading1]}>Create Profile</Text>
                <Text style={[Typography.captionText]}>Please enter the information and choose yourself an avatar or upload your own!</Text>

                <View style={{
                    marginVertical: 20,
                    height: 100,
                }}>
                    {image && (
                        <Pressable
                            onPress={() => setAvatar(-1)}
                        >
                            <Image
                                source={{ uri: image }}
                                style={[styles.avatar, avatar === -1 && styles.activeAvatar]}
                            />
                        </Pressable>
                    )}
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={Avatars}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.contentContainer}
                    />
                </View>

                <View style={[Layout.flexRowCenter, { width: '100%', justifyContent: 'space-between' }]}>
                    <Button title={"Upload Image"} style={{ width: "56%" }} onPress={handleUploadImage} />
                    <Button title={"Remove"} type="outline" style={{ width: "42%" }} onPress={removeUploadImage} />
                </View>

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