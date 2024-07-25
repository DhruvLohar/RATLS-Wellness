import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Edit2, Logout } from "iconsax-react-native";

import { timesince } from "../../services/constants"
import { useSession } from '../../hooks/auth';
import Button from "../../components/Button"
import Layout from "../../theme/layout";
import Colors from "../../theme/colors";
import Typography from "../../theme/typography";

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

    function formatMeditationExperience(months) {
        if (months < 12) {
            return `${months} month${months !== 1 ? 's' : ''}`;
        } else {
            const years = Math.floor(months / 12);
            const remainingMonths = months % 12;
            return `${years} year${years !== 1 ? 's' : ''}${remainingMonths > 0 ? ` ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}` : ''}`;
        }
    }


    function handleLogout() {
        signOut();
        router.replace('/auth/login');
    }

    return (
        <ScrollView style={[Layout.screenView]} contentContainerStyle={{ alignItems: 'flex-start', marginTop: 20 }}>

            <View style={[Layout.flexRowCenter, { width: '100%', justifyContent: 'flex-start' }]}>
                <Image
                    source={{ uri: session?.avatar || "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png" }}
                    style={styles.profile}
                />
                <View>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={[Typography.heading2, { fontSize: 20, width: '100%' }]}
                    >
                        {session?.name && session?.name.length > 25 ? (
                            `${session?.name.slice(0, 25)}...`
                        ) : session?.name}
                    </Text>
                    <Text style={[Typography.captionText, { marginTop: -2, fontSize: 12 }]}>Last Login: {timesince(session?.lastLogin)}</Text>
                </View>
            </View>

            <Text style={[Typography.heading3, { marginTop: 30 }]}>Personal Information</Text>
            <Info title="Email" value={session?.email} />
            <Info title="Gender" value={session?.gender} />
            <Info title="Age" value={`${session?.age} years`} />
            <Info title="Meditation Experience" value={formatMeditationExperience(session?.meditationExperience)} />

            <Button
                title={"Edit Profile"}
                PrefixIcon={Edit2}
                style={{ marginTop: 20 }}
                onPress={() => router.push('/profile/edit')}
            />
            <Button
                title={"Logout"}
                type="outline"
                PrefixIcon={Logout}
                style={{ marginBottom: 50 }}
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