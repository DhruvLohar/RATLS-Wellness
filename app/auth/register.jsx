import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, ToastAndroid, View } from "react-native";
import { useRouter } from "expo-router";
import { Google, Lock, Sms, User } from "iconsax-react-native";
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
    isErrorWithCode,
    statusCodes,
    GoogleSignin
} from '@react-native-google-signin/google-signin';

import Typography from "../../theme/typography";
import Input from "../../components/Input";
import Button, { TextButton } from "../../components/Button";
import Layout from "../../theme/layout";
import Colors from "../../theme/colors";
import { useSession } from "../../hooks/auth";

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().required('Email is required').email('Please enter a valid email.'),
    password: yup
        .string()
        .required('Password is required.')
        .min(3, 'Password must contain at least 3 characters.'),
});

export default function Register() {

    const router = useRouter();
    const { signUp } = useSession();
    const [loading, setLoading] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
    });

    async function handleSignup(values) {
        setLoading(prev => !prev)
        const result = await signUp({ ...values, thruGoogle: false });
        setLoading(prev => !prev)

        if (result.success) {
            router.replace('/profile/create');
        } else {
            ToastAndroid.showWithGravity(
                result?.message || "Something went wrong",
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
            );
        }
    }

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '261729220393-2hrk0o6q6tubgl71sm0n04fef3n5v4sq.apps.googleusercontent.com',
            offlineAccess: true,
        })
    }, [])

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

            if (result.success) {
                router.replace(result?.profileCompleted ? '/(tabs)/home' : '/profile/create');
            } else {
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

            <Text style={[Typography.heading1]}>Create an account</Text>
            <Text style={[Typography.captionText]}>Lorem ipsum doler sit amet.</Text>

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, value } }) => (
                    <Input
                        placeHolder="Enter your name" IconPrefix={User}
                        type='name'
                        handleFormik={{ name: 'name', onChange, value: value }}
                    />
                )}
                name="name"
            />
            {errors.name && <Text style={Typography.errorText}>{errors.name.message}</Text>}

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

            <Button
                title="Sign Up"
                onPress={handleSubmit(handleSignup)}
                isLoading={loading}
            />

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