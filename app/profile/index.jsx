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
            <Text style={[Typography.heading3, { fontSize: 16, color: Colors.muted }]}>{title}</Text>
            <Text style={[Typography.bodyText, { fontSize: 18 }]}>{value}</Text>
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
        <ScrollView style={[Layout.screenView]} contentContainerStyle={{ alignItems: 'flex-start', marginTop: 20 }}>

            <View style={[Layout.flexRowCenter, { width: '100%', justifyContent: 'flex-start' }]}>
                <Image
                    source={{ uri: session?.avatar }}
                    style={styles.profile}
                />
                <View>
                    <Text style={Typography.heading2}>{session?.name}</Text>
                    <Text style={[Typography.captionText, { marginTop: -6, fontSize: 14 }]}>Last Login: Yesterday</Text>
                </View>

                <Edit2
                    color={Colors.dark} size={34}
                    style={{ marginLeft: 'auto' }}
                    onPress={() => router.push('/profile/edit')}
                />
            </View>

            <Text style={[Typography.heading3, { marginTop: 30 }]}>Personal Information</Text>
            <Info title="Email" value={session?.email} />
            <Info title="Gender" value={session?.gender} />
            <Info title="Age" value={`${session?.age} years`} />
            <Info title="Meditation Experience" value={`${session?.meditationExperience} months`} />

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
        marginVertical: 12
    }
})