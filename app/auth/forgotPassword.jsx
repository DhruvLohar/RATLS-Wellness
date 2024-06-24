import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Typography from "../../theme/typography";
import Input from "../../components/Input";
import Button, { TextButton } from "../../components/Button";
import { useRouter } from "expo-router";
import { Google, Lock, Sms } from "iconsax-react-native";
import Layout from "../../theme/layout";
import Colors from "../../theme/colors";

export default function Login() {

    const router = useRouter();

    function handleSubmit() {
        console.log("Handle Forgot Pass")
    }
    
    return (
        <View style={[Layout.screenView, { alignItems: "flex-start", justifyContent: "center" }]}>
            <StatusBar style={"dark"} />

            <Text style={[Typography.heading1]}>Forgot Password?</Text>
            <Text style={[Typography.captionText]}>
                Regain access to your account with a password reset. It's simple and
                secure.
            </Text>

            <View style={{ marginBottom: 25, marginTop: 20 }}>
                <Input placeHolder="Enter your email" type='email' IconPrefix={Sms} />
            </View>

            <Button title="Recover" onPress={handleSubmit} type={"fill"} />
            <Button title="Go Back" onPress={() => router.push('/auth/login')} type={"outline"} />


        </View>
    )
}