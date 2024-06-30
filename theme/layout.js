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
    }
});

export default Layout;