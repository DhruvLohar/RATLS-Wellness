import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, Alert, StyleSheet, View, BackHandler, ToastAndroid } from "react-native";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import * as ImagePicker from 'expo-image-picker';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { CustomActions, CustomIconMap } from "../../theme/journal";
import Colors from "../../theme/colors";
import Header from "../../components/Header";
import { axiosRequest, fetchFromAPI } from "../../hooks/api";

export default function JournalEditor() {

    const { id } = useLocalSearchParams()
    const router = useRouter()

    const [disabled, setDisabled] = useState(false);
    const [journal, setJournal] = useState(null);

    const richText = React.useRef();
    const navigation = useNavigation();

    const printToFile = async (html) => {
        const { uri } = await Print.printToFileAsync({ html });

        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    };

    async function shareJournal() {
        if (!disabled) {
            const currentContent = await richText.current.getContentHtml();
            const html = `
            <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
                </head>
                <body style="width: 100%;">
                    ${currentContent}
                </body>
            </html>
            `;

            await printToFile(html);
        }
    }

    async function fetchJournal() {
        const res = await fetchFromAPI(`journals/${btoa(id)}/`);
        
        if (res.success) {
            setDisabled(!res.success)
            setJournal(res?.journal)
            
            richText.current?.setContentHTML(res?.journal?.contentHTML)
        } else {
            alert("Cannot load the journal at the moment")
        }
    }

    async function uploadJournalImage(pickerResult) {
        let uri = pickerResult.assets[0].uri;
        let ext = uri.split(".").pop();

        const image = {
            uri: uri,
            type: `${pickerResult?.assets[0]?.type}/${ext}`,
            name: `journal-image-${id}.${ext}`,
        };
        
        const data = new FormData();
        data.append('image', image);

        if (!journal) { fetchJournal() }

        if (journal) {
            const res = await axiosRequest(`journals/${journal?._id}/insertImage`, {
                method: 'post',
                data: data
            }, true);
    
            return res?.image;
        } else { alert('Please try again later') }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            header: ({ route }) => <Header route={route} style={styles.customHeader} textStyle={styles.customHeaderText} action={"SHARE"} actionFnc={shareJournal} />,
            headerShown: true
        });
    }, [navigation]);

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
            quality: .6,
        });

        if (!pickerResult.canceled) {
            const imageUrl = await uploadJournalImage(pickerResult);
            if (imageUrl) {
                richText.current?.insertImage(imageUrl);
                richText.current?.insertHTML("<br />");
                richText.current?.insertHTML("<br />");
                richText.current?.insertHTML("<br />");
            }
        }
    }, []);

    useEffect(() => {
        fetchJournal()
        
        const backAction = async () => {
            try {
                if (!disabled) {
                    const currentContent = await richText?.current?.getContentHtml();
                    if (currentContent && currentContent !== "") {
                        const res = await axiosRequest(`journals/${btoa(id)}/`, {
                            method: 'put',
                            data: {
                                contentHTML: currentContent
                            }
                        }, false);
    
                        ToastAndroid.showWithGravity(
                            res.message,
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER,
                        );
                    }
                }

                router.back();
            } catch (e) {
                router.back();
            }
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [disabled, id])

    return (
        <SafeAreaView style={[styles.container]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
                <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                    <RichEditor
                        ref={richText}
                        placeholder={disabled ? "You cannot edit this Journal." : "Start writing here ..."}
                        style={styles.richEditor}
                        disabled={disabled}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
            <View style={styles.toolbarContainer}>
                <RichToolbar
                    editor={richText}
                    actions={CustomActions}
                    iconMap={CustomIconMap}
                    onPressAddImage={onPressAddImage}
                    style={{ backgroundColor: '#1b1b1b' }}
                    iconTint={Colors.light}
                    disabled={disabled}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 150,  // Add padding to ensure content is above the toolbar
        backgroundColor: Colors.light
    },
    richEditor: {
        minHeight: 800,
        padding: 10,
        backgroundColor: Colors.light
    },
    toolbarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },

    customHeader: {
        backgroundColor: "#1b1b1b",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    customHeaderText: {
        color: Colors.light
    }
})