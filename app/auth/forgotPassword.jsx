import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Sms } from "iconsax-react-native";
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Typography from "../../theme/typography";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Layout from "../../theme/layout";

const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Please enter a valid email.'),
});

export default function Login() {

    const router = useRouter();
    const [loading, setLoading] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
        },
    });

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

            <Button
                title="Recover"
                onPress={handleSubmit(handleForgotPass)}
                isLoading={loading}
            />

            <Button title="Go Back" onPress={() => router.push('/auth/login')} type={"outline"} />

        </View>
    )
}