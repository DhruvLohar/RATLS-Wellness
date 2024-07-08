import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";
import Typography from "../theme/typography";
import Colors from "../theme/colors";
import LottieView from "lottie-react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function AnimatedSplashScreen({ setAppReady }) {
    return (
        <Animated.View
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(300)} 
            style={{
                flex: 1,
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#1b1b1b',
                paddingHorizontal: 20
            }}
        >
            <StatusBar style="light" />

            <LottieView
                source={require('../assets/lottie/splash-screen.json')}
                autoPlay
                loop={true}
                style={{
                    width: 400,
                    height: 400,
                    marginBottom: 40
                }}
            />

            <Text style={[
                Typography.heading1,
                {
                    color: Colors.light
                }
            ]}>
                RATLS Wellness
            </Text>
            <Text style={[Typography.captionText, { textAlign: 'center', fontSize: 16 }]}>
                He who has health has hope and he who has hope has everything.
            </Text>

            <Pressable style={{ marginTop: 50 }} onPress={() => setAppReady(true)}>
                <Text style={[Typography.captionText, { textAlign: 'center', fontSize: 12 }]}>
                    Tap to Continue
                </Text>
            </Pressable>
        </Animated.View>
    )
}