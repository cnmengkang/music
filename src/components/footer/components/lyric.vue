<template>
    <div class="lyric-scroll" ref="lyrics">
        <p :class="{ active: index == activeLineIndex }" ref="lyrics_p" v-for="(item, index) in formattedLyrics"
            :key="index" :data-time="item.time">{{ item.text }}</p>
    </div>
</template>
<script>
import { formatLyrics } from '@/utils/formLyrics';
export default {
    components: {},
    props: {
        lyric: String,
        currentTime: Number
    },
    data() {
        return {
            activeLineIndex: -1,
        };
    },
    watch: {
        // 监听当前播放歌曲时间
        currentTime(newTime) {
            const lyric = this.$refs.lyrics_p
            for (let i = 0; i < lyric.length; i++) {
                const line = lyric[i];
                if (line.dataset.time > newTime) {
                    this.activeLineIndex = i > 0 ? i - 1 : 0;
                    break;
                }
            }
        },
        activeLineIndex(newIndex, oldIndex) {
            if (newIndex != oldIndex) {
                this.$nextTick(() => {
                    this.scrollToActiveLine();
                })
            }
        }
    },
    methods: {
        // 滚动到当前播放歌词
        scrollToActiveLine() {
            const container = this.$refs.lyrics
            const activeLine = container.querySelector('.active');
            if (activeLine) {
                container.scrollTop = activeLine.offsetTop - container.offsetTop;
            }
        }
    },
    computed: {
        formattedLyrics() {
            return formatLyrics(this.lyric)
        }
    }
}
</script>
<style scoped lang="less">
.active {
    // color: red;
    // font-weight: bold;
}
.lyric-scroll {
    overflow-y: scroll;
    height: 30px;
}
</style>
  