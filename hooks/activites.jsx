import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to initialize the 'activites' key with stringified JSON data if it doesn't already exist
export async function initializeActivities() {
    const existingData = await AsyncStorage.getItem('activites');

    if (!existingData) {
        const initialData = {
            lastWaterIntake: null,
            waterIntake: 0,
            lastAppOpen: null,
            lastChallengeUpdate: {
                "morning_routine": null,
                "happiness": null,
                "social_anxiety": null,
                "declutter": null,
                "self_care": null,
                "sleep_schedule": null,
            }
        };

        await AsyncStorage.setItem('activites', JSON.stringify(initialData));
        console.log('Initialized activities in secure storage');
    } else {
        if (!Object.keys(existingData).includes("lastChallengeUpdate")) {
            await AsyncStorage.setItem('activites', JSON.stringify({
                ...existingData,
                lastChallengeUpdate: {
                    "morning_routine": null,
                    "happiness": null,
                    "social_anxiety": null,
                    "declutter": null,
                    "self_care": null,
                    "sleep_schedule": null,
                }
            }));
        }

        console.log('Activities already initialized');
    }
}

// Function to get the JSON data from the 'activites' key
export async function getActivities() {
    const activitiesData = await AsyncStorage.getItem('activites');
    return activitiesData ? JSON.parse(activitiesData) : null;
}

// Function to update key values inside the 'activites' JSON data
export async function updateActivity(key, value) {
    const activitiesData = await getActivities();
    if (activitiesData) {
        activitiesData[key] = value;
        await AsyncStorage.setItem('activites', JSON.stringify(activitiesData));
        console.log(`Updated ${key} in activities`);
    } else {
        console.error('Failed to update activities: No activities data found');
    }
}

export async function isFirstLoginOfDay() {
    try {
        const activities = await getActivities();

        // Get the current date
        const now = new Date();
        const lastAppOpen = new Date(activities.lastAppOpen);

        if (!activities.lastAppOpen) {
            updateActivity('lastAppOpen', now.toISOString());
            return true;
        }

        const isDifferentDay = now.getDate() !== lastAppOpen.getDate() ||
            now.getMonth() !== lastAppOpen.getMonth() ||
            now.getFullYear() !== lastAppOpen.getFullYear();

        return isDifferentDay;
    } catch (error) {
        console.error('Error checking if first login of the day:', error);
        // Handle error appropriately, e.g., return false or throw error
        return false;
    }
}

