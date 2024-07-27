import { Text, ToastAndroid, View } from "react-native";
import Typography from "../../theme/typography";
import Colors from "../../theme/colors";

import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useEffect, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { axiosRequest } from "../../hooks/api";

const schema = yup.object().shape({
    hours: yup.number().required().transform(value => (isNaN(value) ? undefined : value)).min(0).max(12).nullable(),
    minutes: yup.number().required().transform(value => (isNaN(value) ? undefined : value)).min(0).max(60).nullable(),
});

export default function SetGoals() {

    const [timeToSpendApp, setTimeToSpend] = useState(null)

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            hours: null,
            minutes: null,
        },
    });

    async function fetchTimeToSpend() {
        const res = await axiosRequest('sessions/', { method: 'get' }, false);
        if (res.success && res.session) {
            const exists = res.session?.timeToSpendOnApp
            if (exists) {
                const today = new Date().toLocaleDateString('en-US')
                setTimeToSpend(exists[today])
            }
        }
    }

    async function handleSetGoal(values) {
        let timeInMinutes = values.hours * 60 + values.minutes;

        const res = await axiosRequest('sessions/updateTimeOnApp/', {
            method: 'put',
            data: {
                value: timeInMinutes
            }
        });

        if (res.success) {
            ToastAndroid.showWithGravity(
                "Your goal was recorded successfully",
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
            );
            setTimeToSpend(timeInMinutes)
            reset({
                hours: null,
                minutes: null,
            });
        }
    }

    function convertMinutesToHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }

    useEffect(() => {
        fetchTimeToSpend()
    }, [])

    return (
        <View style={{ marginVertical: 20, width: '100%' }}>

            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text style={[Typography.heading3, { alignSelf: 'flex-start', marginRight: 'auto' }]}>
                    {!timeToSpendApp
                        ? "Set your goals ⌛"
                        : "Your Goal for today"
                    }
                </Text>
                {timeToSpendApp && (
                    <Text style={[Typography.heading3, {
                        color: Colors.muted,
                        fontSize: 14
                    }]}>{convertMinutesToHoursAndMinutes(timeToSpendApp)}</Text>
                )}
            </View>

            {!timeToSpendApp && (
                <>
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
                </>
            )}

        </View>
    )
}