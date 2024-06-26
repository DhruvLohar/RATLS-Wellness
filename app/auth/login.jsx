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

export default function Login() {

    const router = useRouter();

    function handleLogin(values) {
        console.log(values)
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
                initialValues={{ email: '', password: '' }}
                onSubmit={handleLogin}
            >
                {({ handleChange, handleSubmit, values }) => (
                    <>
                        <View style={{ marginBottom: 25, marginTop: 20 }}>
                            <Input 
                                placeHolder="Enter your email" type='email' 
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
                            disabled={values.email === "" || values.password === ""}
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