import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import quoteBg from "../../assets/images/quoteBg.png"
import Carousel from 'react-native-reanimated-carousel';
import Quotes from "../../assets/quotes"
import Typography from "../../theme/typography";
import Layout from "../../theme/layout";
import { useState } from "react";

export default function QuoteCarousel() {

    const width = Dimensions.get('window').width;

    const [current, setCurrent] = useState(
        Quotes[Math.floor(Math.random() * Quotes.length)]
    );

    const generateUniqueRandomArray = (length, n) => {
        if (length > n + 1) {
            throw new Error('Length cannot be greater than the range of unique numbers available.');
        }

        const uniqueNumbers = new Set();
        while (uniqueNumbers.size < length) {
            const randomNum = Math.floor(Math.random() * (n + 1));
            uniqueNumbers.add(randomNum);
        }

        return Array.from(uniqueNumbers);
    };

    return (
        <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Carousel
                loop
                width={width - 40}
                height={200}
                style={{
                    marginTop: 20
                }}
                autoPlay={true}
                data={generateUniqueRandomArray(3, Quotes.length)}
                snapEnabled={false}
                scrollAnimationDuration={5000}
                renderItem={({ item }) => (
                    <View
                        style={[style.quoteContainer, Layout.cardView, { padding: 0, borderWidth: 0 }]}
                    >
                        <Image
                            source={quoteBg}
                            style={style.quoteImg}
                        />
                        <Text
                            style={[
                                Typography.heading2,
                                { fontSize: 15, textAlign: 'center', width: '90%' }
                            ]}
                        >
                            " {Quotes[item]?.quote} "
                        </Text>
                    </View>
                )}
            />
        </View>
    )
}

const style = StyleSheet.create({
    quoteContainer: {
        width: '100%',
        height: 180,
        justifyContent: 'center',
        alignItems: 'center'
    },
    quoteImg: {
        width: "100%",
        height: "100%",
        borderRadius: 20,
        position: 'absolute',
        top: 0,
        left: 0
    },
})