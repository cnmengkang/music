class LyricsFormatter {
    static format(lyrics) {
        // 将歌词字符串分成行
        const lines = lyrics.split('\n');

        // 使用正则表达式来匹配每一行的时间戳和歌词文本
        const regex = /\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/;

        // 对于每一行歌词，提取时间戳和文本
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
        console.log(formattedLyrics)
        // 过滤掉无效的行并返回格式化后的歌词数组
        return formattedLyrics
        // return formattedLyrics.filter(line => line !== null);
    }
}
export default LyricsFormatter
