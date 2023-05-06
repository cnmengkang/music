
// 格式化歌词
export function formatLyrics(lyrics, space) {
    // console.log(space)
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
            return "";
        }
    });
    return formattedLyrics
}
// 返回00:00时间格式 传入一个带有小数点的number
export function formatTIme(currentTime) {
    if (currentTime == 0) return;
    const time = Math.trunc(currentTime) * 1000
    function preToFixed(num, length = 2) {
        return (Array(length).join(0) + num).slice(-length)
    }
    const length = Math.floor(time / 1000)
    const minute = preToFixed(Math.floor(length / 60))
    const second = preToFixed(length - minute * 60)
    const result = `${minute}:${second}`
    return result
}
