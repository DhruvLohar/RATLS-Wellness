import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, Pressable, Animated } from 'react-native';
import Colors from '../theme/colors';
import Typography from '../theme/typography';
import { ArrowRotateRight } from 'iconsax-react-native';
// import Animated from 'react-native-reanimated';

export default function Button({
    title,
    onPress,
    isLoading,
    type,
    PrefixIcon,
    style,
    textStyles,
    ...otherProps
}) {
    const textColor = (type === 'outline') ? Colors.dark : Colors.light
    const { disabled } = otherProps;

    const rotateAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        if (isLoading) {
            Animated.loop(
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                })
            ).start();
        } else {
            rotateAnim.setValue(0);
        }
    }, [isLoading, rotateAnim]);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.button,
                disabled && {backgroundColor: Colors.muted},
                (type === "outline") && styles.buttonOutline,
                style
            ]}
            {...otherProps}
        >
            {PrefixIcon && !isLoading && (
                <PrefixIcon size={24} color={textColor} variant="Bold" />
            )}
            {isLoading && (
                <Animated.View style={{ transform: [{ rotate }] }}>
                    <ArrowRotateRight size={24} color={textColor} />
                </Animated.View>
            )}
            <Text
                style={[
                    styles.text,
                    { color: textColor, paddingLeft: PrefixIcon ? 10 : 0 },
                    textStyles
                ]}
            >
                {!isLoading ? title : ""}
            </Text>
        </Pressable>
    )
}

export function TextButton({ title, onPress, textStyle }) {
    return (
        <Pressable onPress={onPress} style={styles.buttonText}>
            <Text style={[Typography.buttonText, textStyle]}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "100%",

        backgroundColor: Colors.primary,
        color: Colors.light,

        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',

        paddingHorizontal: 20,
        paddingVertical: 17,
        marginVertical: 10,
        borderRadius: 25
    },

    buttonOutline: {
        backgroundColor: 'transparent',
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: Colors.inputBG
    },
    buttonText: {
        backgroundColor: 'transparent',
        padding: 5,
        borderRadius: 5
    },

    text: {
        fontSize: 18,
        lineHeight: 26,
        letterSpacing: 0.25,
        fontFamily: 'Poppins_500Medium'
    }
})