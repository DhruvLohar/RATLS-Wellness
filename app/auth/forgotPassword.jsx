import { StatusBar } from "expo-status-bar";
import { Text, ToastAndroid, View } from "react-native";
import { useRouter } from "expo-router";
import { Lock, Sms } from "iconsax-react-native";
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Typography from "../../theme/typography";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Layout from "../../theme/layout";
import { useState } from "react";
import { postToAPI } from "../../hooks/api";

const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Please enter a valid email.'),
});

const otpSchema = yup.object().shape({
    otp: yup.number().required('OTP is required').min(1000).max(9999),
});

const passwordSchema = yup.object().shape({
    password: yup.string()
        .matches(/^(?=.*[A-Z])/, "Password must start with a capital letter") // Start with a capital letter
        .matches(/^(?=.*[0-9])/, "Password must contain at least one number") // At least one number
        .matches(/^(?=.*[!@#$%^&*(),.?":{}|<>])/, "Password must contain at least one special character") // At least one special character
        .min(8, "Password must be at least 8 characters long") // At least 8 characters
        .required('Password is required')
});

export default function Login() {

    const router = useRouter();
    // email or otp
    const [currentTab, setCurrentTab] = useState("email")
    const [loading, setLoading] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
        },
    });

    const otpController = useForm({
        resolver: yupResolver(otpSchema),
        defaultValues: {
            otp: null
        }
    })

    const passwordController = useForm({
        resolver: yupResolver(passwordSchema),
        defaultValues: {
            password: ''
        }
    })

    async function handleForgotPass(values) {
        setLoading(true);
        const res = await postToAPI('users/sendOTP/', values);
        setLoading(false);

        if (res.success) {
            setCurrentTab("otp");
        }

        ToastAndroid.showWithGravity(
            res?.message || "Something went wrong",
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
        );
    }

    async function handleVerifyOTP(values) {
        setLoading(true);
        const form = getValues()
        const res = await postToAPI('users/verifyOTP/', {
            enteredOTP: values?.otp,
            email: form.email
        });
        setLoading(false);

        if (res.success) {
            setCurrentTab("password");
        }

        ToastAndroid.showWithGravity(
            res?.message || "Something went wrong",
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
        );
    }

    async function handleResetPassword(values) {
        setLoading(true);
        const form = getValues()
        const res = await postToAPI('users/resetPassword/', {
            ...values,
            email: form.email
        });
        setLoading(false);

        if (res.success) {
            router.push('/auth/login')
        }
        ToastAndroid.showWithGravity(
            res?.message || "Something went wrong",
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
        );
    }

    return (
        <View style={[Layout.screenView, { alignItems: "flex-start", justifyContent: "center" }]}>
            <StatusBar style={"dark"} />

            {currentTab === "email" && (
                <>
                    <Text style={[Typography.heading1]}>Forgot Password?</Text>
                    <Text style={[Typography.captionText, { marginBottom: 20 }]}>
                        Regain access to your account with a password reset. It's simple and
                        secure.
                    </Text>

                    <Controller
                        control={control}
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

                    <Button
                        title="Send OTP"
                        onPress={handleSubmit(handleForgotPass)}
                        isLoading={loading}
                    />
                </>
            )}

            {currentTab === "otp" && (
                <>
                    <Text style={[Typography.heading1]}>Enter OTP</Text>
                    <Text style={[Typography.captionText, { marginBottom: 20 }]}>
                        Please check your email for the OTP.
                    </Text>

                    <Controller
                        control={otpController.control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeHolder="Enter your OTP" IconPrefix={Sms}
                                type='numeric'
                                handleFormik={{ name: 'otp', onChange, value: value }}
                            />
                        )}
                        name="otp"
                    />
                    {otpController.formState.errors.otp && <Text style={Typography.errorText}>{otpController.formState.errors.otp.message}</Text>}

                    <Button
                        title="Verify OTP"
                        onPress={otpController.handleSubmit(handleVerifyOTP)}
                        isLoading={loading}
                    />
                </>
            )}

            {currentTab === "password" && (
                <>
                    <Text style={[Typography.heading1]}>Reset Password</Text>
                    <Text style={[Typography.captionText, { marginBottom: 20 }]}>
                        Enter your new password below.
                    </Text>

                    <Controller
                        control={passwordController.control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeHolder="Enter your new password" IconPrefix={Lock} iconNameSuffix={true}
                                type='current-password'
                                handleFormik={{ name: 'password', onChange, value }}
                            />
                        )}
                        name="password"
                    />
                    {passwordController.formState.errors.password && <Text style={Typography.errorText}>{passwordController.formState.errors.password.message}</Text>}

                    <Button
                        title="Reset Password"
                        onPress={passwordController.handleSubmit(handleResetPassword)}
                        isLoading={loading}
                    />
                </>
            )}

            <Button title="Go Back" onPress={() => router.push('/auth/login')} type={"outline"} />

        </View>
    )
}