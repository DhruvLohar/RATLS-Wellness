import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { useSession } from '../../hooks/auth';
import Button from "../../components/Button"
import Layout from "../../theme/layout";
import Colors from "../../theme/colors";
import Typography from "../../theme/typography";
import { useRouter } from "expo-router";
import { Edit2 } from "iconsax-react-native";

function Info({ title, value }) {
    return (
        <View style={styles.infoContainer}>
            <Text style={[Typography.heading3, { fontSize: 18, color: Colors.muted }]}>{title}</Text>
            <Text style={[Typography.bodyText, { fontSize: 20 }]}>{value}</Text>
        </View>
    )
}

export default function Profile() {
    
    const router = useRouter()
    const { signOut, session } = useSession()

    function handleLogout() {
        signOut();
        router.replace('/auth/login');
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
                    <Text style={[Typography.captionText, { marginTop: -6, fontSize: 14 }]}>Last Login: Yesterday</Text>
                </View>
                <Edit2 color={Colors.dark} size={34} style={{marginLeft: 'auto'}} />
            </View>
            
            <Text style={[Typography.heading3, { marginTop: 30 }]}>Personal Information</Text>
            <Info title="Email" value={"johndoe@gmail.com"} />
            <Info title="Gender" value={"Male"} />
            <Info title="Age" value={"19 years"} />
            <Info title="Meditation Experience" value={"14 Months"} />

            <Button 
                title={"Logout"} 
                style={{ marginTop: 20 }} 
                onPress={handleLogout}
            />
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