<template>
    <div class="lyric-scroll" ref="lyrics" v-if="lyric.length > 0">
        <p :class="{ lyric_active: index == activeLineIndex }" ref="lyrics_p" v-for="(item, index) in formattedLyrics"
            :key="index" :data-time="item.time">{{ item.text }}</p>
    </div>
</template>
<script>
import { formatLyrics } from '@/utils/formLyrics';
export default {
    components: {},
    props: {
        lyric: {
            type: String,
            require: true
        },
        currentTime: {
            type: Number,
            require: true
        },
        space: {
            type: Number,
            require: true
        }
    },
    data() {
        return {
            activeLineIndex: -1,
        }
    },
    watch: {
        // 监听当前播放歌曲时间,兵给index赋值
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
            const container = this.$refs.lyrics;
            const activeLine = container.querySelector('.lyric_active');
            const half = (container.clientHeight / 2) - activeLine.clientHeight;
            if (activeLine) {
                if (this.space == 1) {
                    const sumScroll = activeLine.offsetTop - container.offsetTop;
                    container.scrollTop =( sumScroll - half);
                } else {
                    container.scrollTop = activeLine.offsetTop - container.offsetTop;
                }
            }
        }
    },
    computed: {
        formattedLyrics() {
            return formatLyrics(this.lyric, this.space)
        }
    }
}
</script>
<style scoped lang="less">
@height: 32px;

// 底部歌词样式
.lyrics {
    .lyric-scroll {
        overflow: hidden;
        height: @height;

        p {
            text-align: center;
            font-size: 12px;
            line-height: @height;
            height: auto;
            transition: color 0.7s linear;
        }
    }
}

// 弹出层歌词样式
.right-body {
    .lyric-scroll {
        height: 350px;
        overflow: auto;
        margin: 30px 0px;

        p {
            color: #989898;
            text-align: center;
            font-size: 14px;
            line-height: @height;
            min-height: @height;
            height: auto;
            transition: color 0.7s linear;
        }

        .lyric_active {
            color: #fff;
            font-size: 16px;
            -webkit-transition: color 0.7s linear;
            -moz-transition: color 0.7s linear;
            -o-transition: color 0.7s linear;
            transition: color 0.7s linear;
        }
    }
}
</style>
  