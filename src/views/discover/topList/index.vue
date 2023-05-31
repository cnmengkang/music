<template>
    <el-card class="topList">
        <h2>官方榜</h2>
        <div class="top-grid">
            <div class="grid" v-for="item in topListDetail" :key="item.id">
                <div class="left list" @click="btnDetail(item.id)">
                    <img :src="item.coverImgUrl" />
                </div>
                <div class="right list" v-if="item.tracks.length >= 3">
                    <ul>
                        <li v-for="(items, index) in item.tracks" :key="index">
                            <span class="title">{{ index + 1 }}</span>
                            <div>{{ items.first }}</div>
                            <div class="second">{{ items.second }}</div>
                        </li>
                        <span class="topListAll cursor" @click="btnDetail(item.id)">查看全部&nbsp;<i
                                class="el-icon-arrow-right"></i>
                        </span>
                    </ul>
                </div>
            </div>
        </div>
    </el-card>
</template>

<script>
import { topList, topListDetail } from '@/api/discover/topList';
export default {
    name: 'topList',
    data() {
        return {
            topList: '',
            topListDetail: ''
        };
    },
    created() {
        this.getTopList();
        this.getTopListDetail();
    },
    mounted() { },
    methods: {
        // 所有榜单
        getTopList() {
            topList().then(res => {
                this.topList = res.list
            })
        },
        getTopListDetail() {
            topListDetail().then(res => {
                console.log(res)
                this.topListDetail = res.list;
            })
        },
        btnDetail(id) {
            this.$router.push({ name: 'detail', params: { id: id } })
        }
    },

};
</script>
<style lang="less" scoped>
.topList {
    .top-grid {
        .grid {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 40px;
        }

        .left {
            width: 20%;
            border-radius: 10px;

            img {
                border-radius: 10px;
            }
        }

        .right {
            width: 75%;
            padding-left: 5%;

            ul {
                .topListAll {
                    font-size: 12px;
                    text-align: left;
                    padding: 0px 10px;
                    display: flex;
                    line-height: 35px;
                    height: 35px;
                    align-items: center;
                }
            }

            li {
                text-align: left;
                height: 35px;
                line-height: 35px;
                border-radius: 4px;
                position: relative;
                font-size: 12px;
                color: #000;

                .title {
                    padding: 0px 10px;
                }

                div {
                    display: inline-block;
                }

                .second {
                    position: absolute;
                    right: 10px;
                    color: #a59595;
                }
            }

            li:hover,
            .li:active {
                background: #f2f2f2;
                border-radius: 4px;
            }
        }

    }
}
</style>