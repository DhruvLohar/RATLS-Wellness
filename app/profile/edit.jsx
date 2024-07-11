import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Sms, User } from "iconsax-react-native";
import { Picker } from "@react-native-picker/picker";
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSession } from '../../hooks/auth';
import Button from "../../components/Button"
import Layout from "../../theme/layout";
import Colors from "../../theme/colors";
import Typography from "../../theme/typography";
import Input from "../../components/Input";
import AvatarSelection from "../../components/AvatarSelection";
import { toFormData } from "axios";
import { axiosRequest } from "../../hooks/api";
import { Avatars } from "../../services/constants";

function Info({ title, children }) {
    return (
        <View style={styles.infoContainer}>
            <Text style={[Typography.heading3, { fontSize: 16, opacity: .6 }]}>{title}</Text>
            {children}
        </View>
    )
}

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().required('Email is required').email('Please enter a valid email.'),
    gender: yup.string().required('Gender is required'),
    age: yup
        .number()
        .required('Age is required.')
        .min(12).max(75),
    meditationExperience: yup
        .number()
        .required('Meditation Experience is required.')
        .min(3).max(200),
});

export default function EditProfile() {

    const router = useRouter()
    const { session, refreshUser } = useSession()

    const [image, setImage] = useState(null)
    const [avatar, setAvatar] = useState(0)
    const [loading, setLoading] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: session?.name || "",
            email: session?.email || "",
            gender: session?.gender || "Male",
            age: session?.age.toString() || "",
            meditationExperience: session?.meditationExperience.toString() || "",
        },
    });

    async function handleUpdateProfile(values) {
        setLoading(true)
        if (!image && avatar === -1) {
            alert('Please upload a proper image')
        }

        const formData = toFormData(values);
        formData.append('avatar', avatar !== -1 ? Avatars[avatar] : image)

        const res = await axiosRequest('users/', {
            method: 'put',
            data: formData
        }, true);
        setLoading(false)

        if (res.success) {
            refreshUser();
            router.back();
        } else {
            alert("Something went wrong")
        }
    }

    return (
        <ScrollView style={[Layout.screenView]} contentContainerStyle={{ alignItems: 'flex-start' }}>

            <Text style={[Typography.heading3, { marginTop: 30 }]}>Update Avatar</Text>
            <AvatarSelection
                image={image} setImage={setImage}
                avatar={avatar} setAvatar={setAvatar}
            />

            <Text style={[Typography.heading3, { marginTop: 30 }]}>Personal Information</Text>

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, value } }) => (
                    <Info title={"Name"}>
                        <Input
                            placeHolder="Enter your name" IconPrefix={User}
                            type='name'
                            handleFormik={{ name: 'name', onChange, value: value }}
                        />
                    </Info>
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
                    <Info title={"Email"}>
                        <Input
                            placeHolder="Enter your email" IconPrefix={Sms}
                            type='email-address'
                            handleFormik={{ name: 'email', onChange, value: value }}
                        />
                    </Info>
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
                    <Info title={"Gender"}>
                        <Picker
                            selectedValue={value}
                            onValueChange={(val) => onChange(val)}
                        >
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                            <Picker.Item label="Other" value="Other" />
                        </Picker>
                    </Info>
                )}
                name="gender"
            />
            {errors.gender && <Text style={Typography.errorText}>{errors.gender.message}</Text>}

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, value } }) => (
                    <Info title={"Age"}>
                        <Input
                            placeHolder="Age" type='numeric'
                            handleFormik={{ name: 'age', onChange, value }}
                        />
                    </Info>
                )}
                name="age"
            />
            {errors.age && <Text style={Typography.errorText}>{errors.age.message}</Text>}

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, value } }) => (
                    <Info title={"Meditation Experience (in months)"}>
                        <Input
                            placeHolder="Meditation Experience (in months)"
                            type='numeric'
                            handleFormik={{ name: 'meditationExperience', onChange, value }}
                        />
                    </Info>
                )}
                name="meditationExperience"
            />
            {errors.meditationExperience && <Text style={Typography.errorText}>{errors.meditationExperience.message}</Text>}

            <Button
                title="Update"
                onPress={handleSubmit(handleUpdateProfile)}
                isLoading={loading}
            />

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    profile: {
        width: 120,
        height: 120,
        borderRadius: 250,
        marginRight: 20
    },

    infoContainer: {
        marginVertical: 5
    }
})