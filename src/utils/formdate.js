
export function parseTime(time, cFormat) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string')) {
            if ((/^[0-9]+$/.test(time))) {
                time = parseInt(time)
            } else {
                time = time.replace(new RegExp(/-/gm), '/')
            }
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key]
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
        return value.toString().padStart(2, '0')
    })
    return time_str
}
export function formatTime(time, option) {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000
    } else {
        time = +time
    }
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return (
            d.getMonth() +
            1 +
            '月' +
            d.getDate() +
            '日' +
            d.getHours() +
            '时' +
            d.getMinutes() +
            '分'
        )
    }
}
export function numCount(count) {
    if (!count) return '';
    if (count > 100000000) {
        return `${Math.floor((count / 100000000) * 100) / 100}亿`; // 2.32 亿
    }

    if (count > 100000) {
        return `${Math.floor((count / 10000) * 10) / 10}万`; // 232.1 万
    }
    if (count > 10000) {
        return `${Math.floor((count / 10000) * 100) / 100}万`; // 2.3 万
    }
    return count;
}
// 返回00:00时间格式 传入一个带有小数点的number
export function formatCurrentTime(currentTime) {
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