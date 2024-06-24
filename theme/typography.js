import { StyleSheet } from 'react-native';
import Colors from './colors';

const Typography = StyleSheet.create({
    heading1: {
        fontSize: 32,
        color: Colors.dark, // Adjust color as needed
        fontFamily: 'Poppins_800ExtraBold', // Ensure you have the Poppins font installed
    },
    heading2: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.dark, // Adjust color as needed
        fontFamily: 'Poppins_700Bold', // Ensure you have the Poppins font installed
    },
    heading3: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.dark, // Adjust color as needed
        fontFamily: 'Poppins_600SemiBold', // Ensure you have the Poppins font installed
    },
    bodyText: {
        fontSize: 16,
        fontWeight: '400',
        color: Colors.dark, // Adjust color as needed
        fontFamily: 'Poppins_400Regular', // Ensure you have the Poppins font installed
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
        fontFamily: 'Poppins_400Regular', // Ensure you have the Poppins font installed
    },
});

export default Typography;
