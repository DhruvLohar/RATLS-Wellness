import { StatusBar } from "expo-status-bar";
import { memo } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../theme/colors";

const Header = memo(({ route }) => {
    return (
        <SafeAreaView style={styles.headerContainer}>
            <StatusBar style="dark" />
            <Text style={styles.headerText}>{route?.params?.name || ""}</Text>
            {/* <LinearGradient
                colors={[Colors.light, 'transparent']}
                style={styles.gradient}
                locations={[0.2, 1]}
            /> */}
        </SafeAreaView>
    )
})

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        backgroundColor: Colors.light,
        position: 'relative'
    },
    headerText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16,
    },
    gradient: {
        position: 'absolute',
        bottom: -20,
        left: 0,
        right: 0,
        height: 30, // Adjust the height to control the fade effect
    },
})

export default Header;