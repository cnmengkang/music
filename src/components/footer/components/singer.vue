<template>
    <div class="author flex flex-wrap-nowrap">
        <div class="author-avatar mr-15" @click="drawer = true">
            <el-avatar shape="square" :size="50" :src="singer.avatar" />
        </div>
        <div class="author-singer ellipsis">
            <div class="ellipsis">
                <span>{{ singer.title }}</span>
                <span class="alia" v-if="singer.alia.length != 0">({{ singer.alia[0] }})</span>
            </div>
            <div class="mt-5">
                <span class="font-12" v-for="item in singer.name" :key="item.id">{{ item.name }}<span
                        v-if="item.length > 1">/</span></span>
            </div>
        </div>
        <el-drawer :title="singer.title" :withHeader="true" @open="drawerOpen" size="100%" :modal="false"
            :visible.sync="drawer" :direction="direction">
            <div class="footer_drawer flex">
                <div class="left flex justify-content-center">
                    <el-avatar shape="circle" :size="200" :src="singer.avatar" />
                </div>
                <div class="right">
                    <div class="right-head">
                        <span class="font-12" v-for="item in singer.name" :key="item.id">歌手：{{ item.name }}</span>
                        <span class="font-12">专辑：{{ singer.title }}</span>
                    </div>
                    <div class="right-body">
                        <ul ref="lyricUL">
                            <li :style="{ color: lyricIndex === index ? 'red' : '' }" v-for="(item, index) in lyricsObjArr"
                                ref="lyric" :data-time="item.time" :data-index="index" :key="item.uid">{{ item.lyric }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import { lyric } from '@/api/music/music'
export default {
    components: {},
    props: {
        singer: {
            type: Object,
            require: true
        }
    },
    data() {
        return {
            drawer: false,
            direction: 'btt',
            currentTime: 0,
            lyricsObjArr: [],
            lyricIndex: 0,
        };
    },
    watch: {
        currentTime() {
            // 匹配歌词
            for (let i = 0; i < this.lyricsObjArr.length; i++) {
                if (this.currentTime > (parseInt(this.lyricsObjArr[i].time))) {
                    const index = this.$refs.lyric[i].dataset.index;
                    if (i === parseInt(index)) {
                        this.lyricIndex = i;
                        this.$refs.lyricUL.style.transform = `translateY(${- (32 * (i + 1))}px)`
                    }
                }
            }
        }
    },
    methods: {
        handleClose(done) {
            done();
        },
        // // 获取歌曲歌词信息
        getLyric(id) {
            lyric(id).then(res => {
                const lyricList = res.lrc.lyric;
                this.formLyricTime(lyricList)
            })
        },
        //歌词格式化
        formLyricTime(lyric) {
            // console.log(lyric)
            const regNewLine = /\n/;
            const lineArr = lyric.split(regNewLine);
            const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/;
            lineArr.forEach(item => {
                if (item === '') return
                const obj = {}
                const time = item.match(regTime)
                obj.lyric = item.split(']')[1].trim() === '' ? '' : item.split(']')[1].trim();
                obj.time = time ? this.formatLyricTime(time[0].slice(1, time[0].length - 1)) : 0;
                obj.uid = Math.random().toString().slice(-6);
                this.lyricsObjArr.push(obj);
            })
        },
        // 歌词时间格式化
        formatLyricTime(time) { // 格式化歌词的时间 转换成 sss:ms
            const regMin = /.*:/
            const regSec = /:.*\./
            const regMs = /\./
            const min = parseInt(time.match(regMin)[0].slice(0, 2))
            let sec = parseInt(time.match(regSec)[0].slice(1, 3))
            const ms = time.slice(time.match(regMs).index + 1, time.match(regMs).index + 3)
            if (min !== 0) {
                sec += min * 60
            }
            return Number(sec + '.' + ms)
        },
        drawerOpen() {
            this.getLyric(this.$store.state.musicInfo.id);
            this.$bus.$on('getCurrentTime', (res) => {
                this.currentTime = parseInt(res.target.currentTime);
            })
        }
    },
};
</script>
<style lang="less" scoped>
@height: 520px;
@head: 80px;

.active {
    color: red !important;
    font-size: 20px;
}

.alia {
    color: #ccc;
}

.author {
    width: 100%;

    .author-avatar:hover {
        cursor: pointer;
        transition: all .2s linear;

        .el-avatar {
            opacity: 0.5;
        }
    }

    .el-drawer__wrapper {
        position: absolute;
        top: -@height;
        bottom: 70px;

        .footer_drawer {
            padding: 0px 5%;

            .left,
            .right {
                width: 50%;
                height: @height - @head;
                box-sizing: border-box;
                position: relative;
                overflow: hidden;
                .right-body {
                    width: 100%;
                    overflow-y: scroll;
                    height: @height - @head;

                    ul {

                        li {
                            text-align: center;
                            color: #ccc;
                            font-size: 14px;
                            height: auto;
                            line-height: 32px;
                        }
                    }
                }
            }
        }
    }
}

.flex-wrap-nowrap {
    flex-wrap: nowrap;
}</style>