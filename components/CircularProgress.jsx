// Packages Imports
import React, { useState, useEffect } from "react";
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle, Text } from "react-native";
import { Svg, Circle } from "react-native-svg";

// function component for CircularProgress
function CircularProgress(props) {
    // Destructuring props
    const {
        size = 80,
        strokeWidth = (5 * size) / 100,
        progress = 0,
        showLabel = true,
        labelSize = (20 * size) / 100,
        ...otherProps
    } = props;

    // get other props
    const {
        labelColor = "white",
        labelStyle,
        outerCircleColor = "white",
        progressCircleColor = "dodgerblue",
    } = otherProps;

    // Constants
    const radius = (size - strokeWidth) / 2;
    const circum = radius * 2 * Math.PI;

    // Local States
    const [LabelText, SetLabelText] = useState(0);

    useEffect(() => {
        if (showLabel) {
            SetLabelText(Math.min(progress, 100));
        }
    }, [progress, showLabel]);

    // Style for the Label View
    const labelViewContainerStyle = [
        styles.labelView,
        {
            width: size,
            height: size,
        },
    ];

    // const style for the label text
    const labelTextStyles = [
        { color: labelColor, fontSize: labelSize },
        labelStyle,
    ];

    // render
    return (
        <Svg width={size} height={size}>
            <Circle
                stroke={outerCircleColor}
                fill="none"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
            />

            <Circle
                stroke={progressCircleColor}
                fill="none"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeDasharray={`${circum} ${circum}`}
                strokeLinecap="round"
                transform={`rotate(-90, ${size / 2}, ${size / 2})`}
                strokeWidth={strokeWidth}
                strokeDashoffset={radius * Math.PI * 2 * ((100 - progress) / 100)}
            />

            {showLabel ? (
                <View style={labelViewContainerStyle}>
                    <Text style={labelTextStyles}>{`${LabelText}%`}</Text>
                </View>
            ) : null}
        </Svg>
    );
}

// exports
export default CircularProgress;

// styles
const styles = StyleSheet.create({
    labelView: {
        position: "absolute",
        top: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
    },
});
