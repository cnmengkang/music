export default class LyricsFormatter {
    static format(lyrics) {
        const lines = lyrics.split('\n');
        const regex = /\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/;
        const formattedLyrics = lines.map(line => {
            const match = line.match(regex);
            if (match) {
                const minutes = parseInt(match[1]);
                const seconds = parseInt(match[2]);
                const milliseconds = parseInt(match[3]);
                const time = minutes * 60 + seconds + milliseconds / 1000;
                const text = match[4].trim();
                return { time, text };
            } else {
                return null;
            }
        });
        return formattedLyrics
    }
}
