function formatLyrics(lyricsText) {
    console.log(lyricsText)
    const lyricsArray = lyricsText.split('\n');
    const lyrics = [];
    lyricsArray.forEach((line) => {
        const matches = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\](.*)/);
        if (matches) {
            const time = matches[1] * 60 + Number(matches[2]) + matches[3] / 100;
            const text = matches[4];
            lyrics.push({ time, text });
        }
    });
    return lyrics;
}