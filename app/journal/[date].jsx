import React, { useCallback, useEffect } from "react";
import { BackHandler, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, Alert } from "react-native";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import * as ImagePicker from 'expo-image-picker';

import { useLocalSearchParams, useRouter } from "expo-router";
import { CustomActions, CustomIconMap } from "../../theme/journal";
import Colors from "../../theme/colors";

export default function JournalEditor() {

    const { date } = useLocalSearchParams()
    const richText = React.useRef();

    const onPressAddImage = useCallback(async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permission to access media library is required!");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            allowsEditing: true,
            quality: .8,
            base64: true
        });

        if (!pickerResult.canceled) {
            const base64Image = `data:image/jpeg;base64,${pickerResult.assets[0].base64}`;
            richText.current?.insertImage(base64Image);
            richText.current?.insertHTML("<br />");
        }
    }, []);

    // useEffect(() => {
    //     const backAction = () => {
    //         console.log("Piche gaya ab save karle")
    //     };

    //     const backHandler = BackHandler.addEventListener(
    //         'hardwareBackPress',
    //         backAction,
    //     );

    //     return () => backHandler.remove();
    // }, [])

    return (
        <SafeAreaView
            style={{
                backgroundColor: Colors.light,
                height: '100%'
            }}
        >
            <RichToolbar
                editor={richText}
                actions={CustomActions}
                iconMap={CustomIconMap}
                onPressAddImage={onPressAddImage}
            />
            <ScrollView
                nestedScrollEnabled={true}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <RichEditor
                        ref={richText}
                        // onChange={descriptionText => {
                        //     console.log("descriptionText:", descriptionText);
                        // }}
                        placeholder="Start writing here ..."
                    />
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
};