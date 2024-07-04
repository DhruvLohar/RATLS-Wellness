import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Google, Lock, Sms } from "iconsax-react-native";
import { Formik } from 'formik';

import Typography from "../../theme/typography";
import Input from "../../components/Input";
import Button, { TextButton } from "../../components/Button";
import Layout from "../../theme/layout";
import Colors from "../../theme/colors";
import { useSession } from "../../hooks/auth";

export default function Login() {

    const router = useRouter();
    const { signIn } = useSession();

    async function handleLogin(values) {
        const result = await signIn(values);
        if (result) {
            router.replace('/(tabs)/home');
        } else {
            alert("Invalid Credentials")
        }
    }

    function handleGoogleLogin() {
        console.log("Google Login Hora")
    }
    
    return (
        <View style={[Layout.screenView, { alignItems: "flex-start", justifyContent: "center" }]}>
            <StatusBar style={"dark"} />

            <Text style={[Typography.heading1]}>Welcome Back</Text>
            <Text style={[Typography.captionText]}>Lorem ipsum doler sit amet.</Text>

            <Formik
                initialValues={{ email: 'dhruvlohar09@gmail.com', password: 'test' }}
                onSubmit={handleLogin}
            >
                {({ handleChange, handleSubmit, values }) => (
                    <>
                        <View style={{ marginBottom: 25, marginTop: 20 }}>
                            <Input 
                                placeHolder="Enter your email" type='email-address' 
                                IconPrefix={Sms}
                                handleFormik={{ name: 'email', onChange: handleChange, value: values.email }}
                            />
                            <Input 
                                placeHolder="Enter your password" IconPrefix={Lock} iconNameSuffix={true} 
                                type='current-password'
                                handleFormik={{ name: 'password', onChange: handleChange, value: values.password }}
                            />

                            <TextButton title={"Forgot Password?"} onPress={() => router.push('/auth/forgotPassword')} />
                        </View>
                        <Button 
                            title="Sign in" 
                            onPress={handleSubmit} 
                            type={"fill"} 
                            disabled={[values.email, values.password].includes("")}
                        />
                    </>
                )}
            </Formik>

            <Button 
                title="Sign in with Google" 
                onPress={handleGoogleLogin}
                PrefixIcon={Google}
                type={"outline"} 
            />

            <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'center', 
                alignSelf: 'center',
                marginTop: 10 
            }}>
                <Text style={[Typography.buttonText, { color: Colors.muted }]}>Don't have an account?</Text>
                <TextButton title={"Register"} onPress={() => router.push('/auth/register')} />
            </View>

        </View>
    )
}