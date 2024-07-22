import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import { useRouter } from "expo-router";
import { Google, Lock, Sms } from "iconsax-react-native";
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Typography from "../../theme/typography";
import Input from "../../components/Input";
import Button, { TextButton } from "../../components/Button";
import Layout from "../../theme/layout";
import Colors from "../../theme/colors";
import { useSession } from "../../hooks/auth";

import {
    isErrorWithCode,
    statusCodes,
    GoogleSignin
} from '@react-native-google-signin/google-signin';

import { useEffect, useState } from "react";

const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Please enter a valid email.'),
    password: yup.string()
        .matches(/^(?=.*[A-Z])/, "Password must start with a capital letter") // Start with a capital letter
        .matches(/^(?=.*[0-9])/, "Password must contain at least one number") // At least one number
        .matches(/^(?=.*[!@#$%^&*(),.?":{}|<>])/, "Password must contain at least one special character") // At least one special character
        .min(8, "Password must be at least 8 characters long") // At least 8 characters
        .required('Password is required')
});

GoogleSignin.configure({
    webClientId: '261729220393-2hrk0o6q6tubgl71sm0n04fef3n5v4sq.apps.googleusercontent.com',
    offlineAccess: true
})

export default function Login() {

    const router = useRouter();
    const { signIn, signUp } = useSession();
    const [loading, setLoading] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function handleLogin(values) {
        setLoading(prev => !prev)
        const result = await signIn(values);
        setLoading(prev => !prev)

        if (result) {
            router.replace('/');
        } else {
            ToastAndroid.showWithGravity(
                "Invalid Credentials. Please try again.",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
    }

    async function handleGoogleLogin() {
        try {
            await GoogleSignin.hasPlayServices();
            const { user } = await GoogleSignin.signIn();

            const data = {
                name: user.givenName + " " + user.familyName,
                email: user.email,
                googleId: user.id,
                avatar: user.photo,
                thruGoogle: true
            }
            setLoading(prev => !prev)
            const result = await signUp(data);
            setLoading(prev => !prev)

            console.log(data)

            if (result.success) {
                router.replace(result?.profileCompleted ? '/(tabs)/home' : '/profile/create');
            } else {
                await GoogleSignin.signOut();
                ToastAndroid.showWithGravity(
                    result?.message || "Something went wrong",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            }
        } catch (error) {
            if (isErrorWithCode(error)) {
                switch (error.code) {
                    case statusCodes.NO_SAVED_CREDENTIAL_FOUND:
                        alert("NO_SAVED_CREDENTIAL_FOUND")
                        break;
                    case statusCodes.SIGN_IN_CANCELLED:
                        alert("SIGN_IN_CANCELLED")
                        break;
                    case statusCodes.ONE_TAP_START_FAILED:
                        alert("ONE_TAP_START_FAILED")
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        alert("PLAY_SERVICES_NOT_AVAILABLE")
                        break;
                    default:
                        console.log("Something Went Wrong")
                        break
                }
            }
        }
    }

    return (
        <View style={[Layout.screenView, { alignItems: "flex-start", justifyContent: "center" }]}>
            <StatusBar style={"dark"} />

            <Text style={[Typography.heading1]}>Welcome Back</Text>
            <Text style={[Typography.captionText]}>Lorem ipsum doler sit amet.</Text>

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, value } }) => (
                    <Input
                        placeHolder="Enter your email" IconPrefix={Sms}
                        type='email-address'
                        handleFormik={{ name: 'email', onChange, value: value }}
                    />
                )}
                name="email"
            />
            {errors.email && <Text style={Typography.errorText}>{errors.email.message}</Text>}

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, value } }) => (
                    <Input
                        placeHolder="Enter your password" IconPrefix={Lock} iconNameSuffix={true}
                        type='current-password'
                        handleFormik={{ name: 'password', onChange, value }}
                    />
                )}
                name="password"
            />
            {errors.password && <Text style={Typography.errorText}>{errors.password.message}</Text>}
            <TextButton title={"Forgot Password?"} onPress={() => router.push('/auth/forgotPassword')} />

            <Button
                title="Sign In"
                onPress={handleSubmit(handleLogin)}
                isLoading={loading}
            />

            <Button
                title="Sign in with Google"
                onPress={handleGoogleLogin}
                PrefixIcon={Google}
                type={"outline"}
            />

            <View style={styles.bottomText}>
                <Text style={[Typography.buttonText, { color: Colors.muted }]}>Don't have an account?</Text>
                <TextButton title={"Register"} onPress={() => router.push('/auth/register')} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    bottomText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10
    }
})