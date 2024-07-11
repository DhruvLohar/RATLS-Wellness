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

import { useState } from "react";

const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Please enter a valid email.'),
    password: yup
        .string()
        .required('Password is required.')
        .min(3, 'Password must contain at least 3 characters.'),
});

export default function Login() {

    const router = useRouter();
    const { signIn } = useSession();
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

    function handleGoogleLogin() {
        console.log("Google Login Hora")
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