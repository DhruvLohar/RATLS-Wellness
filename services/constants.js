import { API_URL } from "../hooks/api";

export const Avatars = [
    'trAlex.png', 'trCathy.png', 'trChad.png', 'trChelsea.png',
    'trEnrique.png', 'trEric.png', 'trFelix.png', 'trFranklin.png',
    'trHarry.png', 'trHelen.png', 'trIggy.png', 'trImran.png',
    'trMaria.png', 'trNancy.png', 'trRachel.png', 'trSamantha.png',
    'trShamila.png', 'trSophia.png', 'trStu.png', 'trTorsten.png'
]

export const Moods = [
    { "name": "Happy", "emoji": "😊" },
    { "name": "Optimistic", "emoji": "😁" },
    { "name": "Fine", "emoji": "🙂" },
    { "name": "Neutral", "emoji": "😐" },
    { "name": "Tired", "emoji": "😴" },
    { "name": "Sad", "emoji": "😢" },
    { "name": "Depressed", "emoji": "😞" },
    { "name": "Inadequate", "emoji": "😔" },
    { "name": "Lost", "emoji": "😕" },
    { "name": "Unmotivated", "emoji": "😒" },
    { "name": "Anxious", "emoji": "😟" },
    { "name": "Stressed", "emoji": "😫" },
    { "name": "Angry", "emoji": "😠" },
    { "name": "Guilty", "emoji": "😣" }
]

export const InbuiltSounds = [
    {
        id: 1,
        title: "Soft Rain Forest",
        duration: 6,
        image: "https://i.pinimg.com/originals/ea/92/36/ea9236f9bb9aea792e7cf6707fc6fcd1.jpg",
        audioUrl: `${API_URL}media/music/soft_rain.mp3`
    },
    {
        id: 2,
        title: "Thunderstrom",
        duration: 12,
        image: "https://cdn.pixabay.com/photo/2023/08/31/06/38/ai-generated-8224568_960_720.png",
        audioUrl: `${API_URL}media/music/thunderstorms.mp3`
    },
    {
        id: 3,
        title: "Birds Singing",
        duration: 3,
        image: "https://images.unsplash.com/photo-1589620270305-2d2e11161699?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        audioUrl: `${API_URL}media/music/birds_singing.mp3`
    },
    {
        id: 4,
        title: "Sea Waves",
        duration: 2,
        image: "https://images.unsplash.com/photo-1527745592400-8c411e7717ce?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8b2NlYW4lMjB3YXZlc3xlbnwwfHwwfHx8MA%3D%3D",
        audioUrl: `${API_URL}media/music/sea_waves.mp3`
    }
]

export function timesince(date) {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);

    const intervals = [
        { name: 'year', seconds: 31536000 },
        { name: 'month', seconds: 2592000 },
        { name: 'week', seconds: 604800 },
        { name: 'day', seconds: 86400 },
        { name: 'hour', seconds: 3600 },
        { name: 'minute', seconds: 60 },
        { name: 'second', seconds: 1 },
    ];

    for (let interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count > 0) {
            return count === 1 ? `1 ${interval.name} ago` : `${count} ${interval.name}s ago`;
        }
    }

    return 'just now';
}