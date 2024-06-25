import React, { useState, useMemo, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import Colors from '../../theme/colors';
import { useRouter } from 'expo-router';

const initialDate = new Date().toLocaleDateString('en-Us');

export default function CalendarListScreen() {
    const [selected, setSelected] = useState(initialDate);
    const router = useRouter()

    const marked = useMemo(() => {
        return {
            '2024-06-22': {
                selectedTextColor: Colors.light,
                selectedColor: Colors.readOnlyJournals,
                selected: true
            },
            [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: Colors.primary,
                selectedTextColor: Colors.light
            }
        };
    }, [selected]);

    const onDayPress = useCallback((day) => {
        router.push(`/journal/${day.dateString}`)
        // setSelected(day.dateString);
    }, []);

    return (
        <CalendarList
            current={'2024-06-25'}
            pastScrollRange={2}
            futureScrollRange={2}
            onDayPress={onDayPress}
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