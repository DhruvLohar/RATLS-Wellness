import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import Colors from '../theme/colors';
import Typography from '../theme/typography';

export default function Button({ title, onPress, type, PrefixIcon, style, textStyles, ...otherProps }) {
    const textColor = (type === 'outline') ? Colors.dark : Colors.light

    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.button,
                (type === "outline") && styles.buttonOutline,
                style
            ]}
            {...otherProps}
        >
            {PrefixIcon && <PrefixIcon size={24} color={textColor} variant="Bold" />}
            <Text
                style={[
                    styles.text,
                    { color: textColor, paddingLeft: PrefixIcon ? 10 : 0 },
                    textStyles
                ]}
            >
                {title}
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