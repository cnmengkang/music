// 格式化歌词
export function lyricProcessing(result) {
  const originalFormattedLyrics = formatLyrics(result.lrc.lyric);
  let translateFormattedLyrics;
  if (result.tlyric) {
    translateFormattedLyrics = formatLyrics(result.tlyric.lyric);
  }
  const mergedBilingualLyrics = mergeBilingualLyrics(
    originalFormattedLyrics,
    translateFormattedLyrics
  );
  return mergedBilingualLyrics;
}

// 格式化歌词，时间
export function formatLyrics(lyrics) {
  const lines = lyrics.split("\n");
  const regex = /\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/;
  const formattedLyrics = lines.map((line) => {
    const match = line.match(regex);
    if (match) {
      const minutes = parseInt(match[1]);
      const seconds = parseInt(match[2]);
      const milliseconds = parseInt(match[3]);
      const timeInSeconds = minutes * 60 + seconds + milliseconds / 1000;
      const content = match[4].trim();
      return { timeInSeconds, content };
    } else {
      return "";
    }
  });
  return formattedLyrics;
}
// 合并中英文
function mergeBilingualLyrics(originalLyrics, translateLyrics) {
  const mergedLyrics = [];
  for (const originalLine of originalLyrics) {
    let translateLine;
    if (translateLyrics) {
      translateLine = translateLyrics.find(
        (line) => line.timeInSeconds === originalLine.timeInSeconds
      );
    }

    mergedLyrics.push({
      timeInSeconds: originalLine.timeInSeconds,
      originalContent: originalLine.content,
      translateContent: translateLine ? translateLine.content : "",
    });
  }
  return mergedLyrics;
}
// 返回00:00时间格式 传入一个带有小数点的number
export function formatTIme(currentTime) {
  if (currentTime == 0) return;
  const time = Math.trunc(currentTime) * 1000;
  function preToFixed(num, length = 2) {
    return (Array(length).join(0) + num).slice(-length);
  }
  const length = Math.floor(time / 1000);
  const minute = preToFixed(Math.floor(length / 60));
  const second = preToFixed(length - minute * 60);
  const result = `${minute}:${second}`;
  return result;
}
