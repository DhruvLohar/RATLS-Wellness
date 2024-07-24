import { Text, View } from "react-native";
import Typography from "../../theme/typography";
import Colors from "../../theme/colors";

import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useState } from "react";
import Input from "../Input";
import Button from "../Button";

const schema = yup.object().shape({
    hours: yup.number().required().transform(value => (isNaN(value) ? undefined : value)).min(0).max(12).nullable(),
    minutes: yup.number().required().transform(value => (isNaN(value) ? undefined : value)).min(0).max(60).nullable(),
});

export default function SetGoals() {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            hours: null,
            minutes: null,
        },
    });

    async function handleSetGoal(values) {

    }

    return (
        <View style={{ marginVertical: 20, width: '100%' }}>
            <Text style={[Typography.heading3, { alignSelf: 'flex-start' }]}>Set your goals ⌛</Text>
            <Text style={[Typography.bodyText, {
                marginBottom: 15,
                fontSize: 15,
                color: Colors.muted,
                alignSelf: 'flex-start'
            }]}>Set amount of time you would like to spend on the app and we'll remind you once your close</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeHolder="Hours"
                                type="numeric"
                                handleFormik={{ name: 'hours', onChange, value: value }}
                            />
                        )}
                        name="hours"
                    />
                    {errors.hours && <Text style={Typography.errorText}>{errors.hours.message}</Text>}
                </View>
                <Text style={{ marginHorizontal: 8 }}>:</Text>
                <View style={{ flex: 1 }}>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeHolder="Minutes"
                                type="numeric"
                                handleFormik={{ name: 'minutes', onChange, value: value }}
                            />
                        )}
                        name="minutes"
                    />
                    {errors.minutes && <Text style={Typography.errorText}>{errors.minutes.message}</Text>}
                </View>
            </View>

            <Button
                title="Set as Goal"
                onPress={handleSubmit(handleSetGoal)}
            />

        </View>
    )
}