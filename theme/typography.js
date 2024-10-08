import { StyleSheet } from 'react-native';
import Colors from './colors';

const Typography = StyleSheet.create({
    heading1: {
        fontSize: 32,
        color: Colors.dark, // Adjust color as needed
        fontFamily: 'Poppins_800ExtraBold', // Ensure you have the Poppins font installed
    },
    heading2: {
        fontSize: 26,
        color: Colors.dark, // Adjust color as needed
        fontFamily: 'Poppins_800ExtraBold', // Ensure you have the Poppins font installed
    },
    heading3: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.dark, // Adjust color as needed
        fontFamily: 'Poppins_600SemiBold', // Ensure you have the Poppins font installed
    },
    bodyText: {
        fontSize: 14,
        fontWeight: '400',
        color: Colors.dark,
        fontFamily: 'Poppins_400Regular',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.dark, // Adjust color as needed
        fontFamily: 'Poppins_500Medium', // Ensure you have the Poppins font installed
    },
    captionText: {
        fontSize: 14,
        fontWeight: '400',
        color: Colors.muted, // Adjust color as needed
        fontFamily: 'Poppins_500Medium', // Ensure you have the Poppins font installed
    },
    errorText: {
        fontSize: 14,
        fontWeight: '400',
        color: "#FF6961", // Adjust color as needed
        fontFamily: 'Poppins_500Medium',
    }
});

export default Typography;
