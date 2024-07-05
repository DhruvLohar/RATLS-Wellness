import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useSession } from '../../hooks/auth';
import Layout from "../../theme/layout";
import Colors from "../../theme/colors";
import Typography from "../../theme/typography";
import LineChartView from "../../components/LineChartView";
import PieChartView from "../../components/PieChartView";
import { Link } from "expo-router";

export default function Meditate() {

    return (
        <ScrollView style={[Layout.screenView]} contentContainerStyle={{ alignItems: 'flex-start' }}>
            <Text style={[Typography.heading1]}>Start your practice</Text>
            <Text style={[Typography.captionText]}>
                Explore diverse range of videos and spotify playlists, and start meditation and yoga just like that !
            </Text>

            
        </ScrollView>
    );
}

const styles = StyleSheet.create({})
