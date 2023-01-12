function formLyric(arr) {
    if (arr === '') return;
    const line = arr.split('\n');
    const lyricsObjArr = []
    const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/
    line.forEach(arr => {
        if (arr === '') return
        const obj = {}
        const time = arr.match(regTime)
        obj.time = time ? this.formatLyricTime(time[0].slice(1, time[0].length - 1)) : 0
        obj.lyric = arr.split(']')[1].trim() === '' ? '' : arr.split(']')[1].trim()
        if (obj.lyric === '') {
            console.log('这一行没有歌词')
        } else {
            lyricsObjArr.push(obj)
        }
    })
    return lyricsObjArr;
}
function formatLyricTime(time) {
    const regMin = /.*:/
    const regSec = /:.*\./
    const regMs = /\./

    const min = parseInt(time.match(regMin)[0].slice(0, 2))
    let sec = parseInt(time.match(regSec)[0].slice(1, 3))
    const ms = time.slice(time.match(regMs).index + 1, time.match(regMs).index + 3)
    if (min !== 0) {
        sec += parseInt(min * 60);
    }
    let dec = sec + '.' + ms;
    console.log(parseInt(dec * 100) / 100)
    return parseInt(sec + '.' + ms)
}
