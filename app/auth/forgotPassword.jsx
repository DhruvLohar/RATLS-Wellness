import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Formik } from 'formik';
import { useRouter } from "expo-router";
import { Sms } from "iconsax-react-native";

import Typography from "../../theme/typography";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Layout from "../../theme/layout";

export default function Login() {

    const router = useRouter();

    function handleForgotPass(values) {
        console.log(values)
    }

    return (
        <View style={[Layout.screenView, { alignItems: "flex-start", justifyContent: "center" }]}>
            <StatusBar style={"dark"} />

            <Text style={[Typography.heading1]}>Forgot Password?</Text>
            <Text style={[Typography.captionText]}>
                Regain access to your account with a password reset. It's simple and
                secure.
            </Text>

            <Formik
                initialValues={{ email: "" }}
                onSubmit={handleForgotPass}
            >
                {({ handleChange, handleSubmit, values }) => (
                    <>
                        <View style={{ marginBottom: 25, marginTop: 20 }}>
                            <Input 
                                placeHolder="Enter your email" type='email' IconPrefix={Sms} 
                                handleFormik={{ name: 'email', onChange: handleChange, value: values.email }}
                            />
                        </View>

                        <Button 
                            title="Recover" 
                            onPress={handleSubmit} 
                            type={"fill"} 
                            disabled={values.email === ''}
                        />
                    </>
                )}
            </Formik>

            <Button title="Go Back" onPress={() => router.push('/auth/login')} type={"outline"} />

        </View>
    )
}