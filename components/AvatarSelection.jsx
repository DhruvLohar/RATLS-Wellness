import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Avatars } from "../services/constants";
import Button from "./Button";
import Layout from "../theme/layout";
import Colors from "../theme/colors";
import { API_URL } from "../hooks/api";


export default function AvatarSelection({
    image, setImage,
    avatar, setAvatar
}) {

    async function handleUploadImage() {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!pickerResult.canceled) {
            setAvatar(-1);

            let uri = pickerResult.assets[0].uri;
            let ext = uri.split(".").pop();
            setImage({
                uri: uri,
                type: `${pickerResult?.assets[0]?.type}/${ext}`,
                name: `avatar.${ext}`,
            });
        }
    }

    function removeUploadImage() {
        setAvatar(0);
        setImage(null);
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
        <>
            <View style={{
                marginVertical: 20,
                height: 100,
            }}>
                {image?.uri && (
                    <Pressable
                        onPress={() => setAvatar(-1)}
                    >
                        <Image
                            source={{ uri: image?.uri }}
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
                />
            </View>
            <View style={[Layout.flexRowCenter, { width: '100%', justifyContent: 'space-between' }]}>
                <Button title={"Upload Image"} style={{ width: "56%" }} onPress={handleUploadImage} />
                <Button title={"Remove"} type="outline" style={{ width: "42%" }} onPress={removeUploadImage} />
            </View>
        </>
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