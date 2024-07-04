import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import Colors from '../../theme/colors';
import { useRouter } from 'expo-router';
import { fetchFromAPI } from '../../hooks/api';

function formatDate(iso=null) {
    const date = iso ? new Date(iso) : new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export default function CalendarListScreen() {
    const [pastScrollRange, setPastScrollRange] = useState(null);
    const [marked, setMarked] = useState(null)

    const router = useRouter()

    const onDayPress = useCallback((day) => {
        console.log(day)
        router.push(`/journal/${day.dateString}`)
    }, []);

    useEffect(() => {
        async function fetchJournals() {
            const { journals, pastMonthsRange } = await fetchFromAPI("journals/");

            const data = {};
            journals?.map(journal => {
                const date = formatDate(journal?.createdAt);
                data[date] = {
                    selectedTextColor: Colors.light,
                    selectedColor: Colors.readOnlyJournals,
                    selected: true,
                }
            });
            setPastScrollRange(pastMonthsRange);
            setMarked(data);
        }
        fetchJournals();
    }, [])

    if (!pastScrollRange && !marked) {
        return (
            <View>
                <Text>Loading ...</Text>
            </View>
        )
    }

    return (
        <CalendarList
            current={formatDate()}
            pastScrollRange={3}
            futureScrollRange={0}
            onDayPress={onDayPress}
            displayLoadingIndicator
            markedDates={marked}
            renderHeader={renderCustomHeader}
            calendarHeight={390}
            theme={theme}
        />
    );
};

const theme = {
    stylesheet: {
        calendar: {
            header: {
                dayHeader: {
                    fontWeight: '600',
                    color: Colors.primary
                }
            }
        }
    },
    'stylesheet.day.basic': {
        today: {
            marked: true
        },
        todayText: {
            color: Colors.primary,
            fontWeight: '800'
        }
    }
};

function renderCustomHeader(date) {
    const header = date.toString('MMMM yyyy');
    const [month, year] = header.split(' ');
    const textStyle = {
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
        color: Colors.primary,
        paddingRight: 5
    };

    return (
        <View style={styles.header}>
            <Text style={[styles.month, textStyle]}>{`${month}`}</Text>
            <Text style={[styles.year, textStyle]}>{year}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 10
    },
    month: {
        marginLeft: 5
    },
    year: {
        marginRight: 5
    }
});