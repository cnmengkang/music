// 格式化播放时长 duration
export function formatTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string") {
      if (/^[0-9]+$/.test(time)) {
        time = parseInt(time);
      } else {
        time = time.replace(new RegExp(/-/gm), "/");
      }
    }
    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return time_str;
}

// 格式化播放量
export function playCount(count) {
  if (!count) return "";
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
