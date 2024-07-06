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