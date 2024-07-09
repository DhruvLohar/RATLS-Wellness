import React, { useState } from 'react'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import { Eye, EyeSlash } from 'iconsax-react-native'
import Colors from '../theme/colors'

export default function Input({
    placeHolder, iconNameSuffix, type,
    IconPrefix, isTextarea,
    handleFormik
}) {

    const { name, onChange, value } = handleFormik;
    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => setShowPassword(!showPassword)

    return (
        <View style={[styles.inputContainer, isTextarea && styles.textareaContainer]}>
            {IconPrefix && (
                <View style={styles.inputIconPrefix}>
                    <IconPrefix size={24} color={Colors.dark} />
                </View>
            )}

            <TextInput
                style={[
                    styles.input,
                    isTextarea && styles.textarea,
                    { paddingLeft: IconPrefix ? 55 : 20, paddingRight: iconNameSuffix ? 50 : 10 }
                ]}
                placeholder={placeHolder}
                placeholderTextColor={Colors.muted}
                textAlignVertical={isTextarea ? 'top' : 'center'}
                secureTextEntry={type === 'current-password' && !showPassword}
                // keyboardType={type === 'email' ? 'email-address' : 'default'}
                keyboardType={type}
                multiline={isTextarea}

                onChangeText={onChange}
                value={value}
            />

            {iconNameSuffix && type === 'current-password' && (
                <Pressable style={styles.inputIconSuffix} onPress={toggleShowPassword}>
                    {showPassword ? <EyeSlash size={24} color={Colors.muted} /> : <Eye size={24} color={Colors.muted} />}
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    input: {
        width: '100%',
        height: 55,
        borderRadius: 10,
        backgroundColor: Colors.inputBG,
        fontSize: 15,
        fontFamily: 'Poppins_500Medium',
        color: Colors.dark,
        opacity: 0.8,
    },
    inputIconPrefix: {
        position: 'absolute',
        left: 20,
        zIndex: 1,
    },
    inputIconSuffix: {
        position: 'absolute',
        right: 20,
        zIndex: 1,
    },
    textarea: {
        height: 120,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    textareaContainer: {
        height: 150,
    },
});
