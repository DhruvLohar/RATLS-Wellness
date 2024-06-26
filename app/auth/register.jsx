import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Formik } from 'formik';
import { useRouter } from "expo-router";
import { Google, Lock, Sms, User } from "iconsax-react-native";

import Typography from "../../theme/typography";
import Input from "../../components/Input";
import Button, { TextButton } from "../../components/Button";
import Layout from "../../theme/layout";
import Colors from "../../theme/colors";

export default function Register() {

    const router = useRouter();

    function handleSignup() {
        console.log("Handle Signup Here")
    }

    function handleGoogleLogin() {
        console.log("Google Login Hora")
    }
    
    return (
        <View style={[Layout.screenView, { alignItems: "flex-start", justifyContent: "center" }]}>
            <StatusBar style={"dark"} />

            <Text style={[Typography.heading1]}>Create an account</Text>
            <Text style={[Typography.captionText]}>Lorem ipsum doler sit amet.</Text>

            <Formik
                initialValues={{ name: '', email: '', password: '' }}
                onSubmit={handleSignup}
            >
                {({ handleChange, handleSubmit, values }) => (
                    <>
                        <View style={{ marginBottom: 25, marginTop: 20 }}>
                            <Input 
                                placeHolder="Enter your name" type='text' IconPrefix={User}
                                handleFormik={{ name: 'name', onChange: handleChange, value: values.name }}
                            />
                            <Input 
                                placeHolder="Enter your email" type='email' IconPrefix={Sms} 
                                handleFormik={{ name: 'email', onChange: handleChange, value: values.email }}
                            />
                            <Input 
                                placeHolder="Enter your password" IconPrefix={Lock} iconNameSuffix={true} 
                                type='current-password' 
                                handleFormik={{ name: 'password', onChange: handleChange, value: values.password }}
                            />
                        </View>
                        <Button 
                            title="Sign up" onPress={handleSubmit} 
                            type={"fill"}
                            disabled={[values.email, values.password, values.name].includes("")}
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
                <Text style={[Typography.buttonText, { color: Colors.muted }]}>Already have an account?</Text>
                <TextButton title={"Sign In"} onPress={() => router.push('/auth/login')} />
            </View>

        </View>
    )
}