import { StyleSheet } from "react-native"
import Colors from "./colors";

const Layout = StyleSheet.create({
    screenView: {
        width: "100%",
        height: "100%",
        flexDirection: 'column',
        paddingHorizontal: 20,
        backgroundColor: Colors.light
    },

    flexRowCenter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    cardView: {
        padding: 10,
        backgroundColor: Colors.cardBg,
        borderWidth: 1,
        borderColor: Colors.muted,
        borderRadius: 20
    },

    lottie: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
    },
});

export default Layout;