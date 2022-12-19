<template>
    <div class="topList">
        <div class="top-grid" v-for="item in topListDetail" :key="item.id">
            <div class="left list" @click="btnDetail(item.id)">
                <img :src="item.coverImgUrl" />
            </div>
            <div class="right list">
                <ul>
                    <li v-for="(items, index) in item.tracks" :key="index">
                        <span class="title">{{ index + 1 }}</span>
                        <div>{{ items.first }}</div>
                        <div class="second">{{ items.second }}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
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
        this.getTopList()
        this.getTopListDetail()
    },
    mounted() { },
    methods: {
        // 所有榜单
        getTopList() {
            topList().then(res => {
                console.log(res)
                this.topList = res.list
            })
        },
        getTopListDetail() {
            topListDetail().then(res => {
                console.log('topListDetail', res)
                this.topListDetail = res.list
            })
        },
        // detail id
        btnDetail(id) {
            this.$router.push({ name: 'detail', params: { id: id } })
        }
    },

};
</script>
<style lang="less" scoped>
.topList {
    .top-grid {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 40px;

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
                li {
                    text-align: left;
                    height: 35px;
                    line-height: 35px;
                    border-radius: 4px;
                    position: relative;
                    font-size: 12px;
                    color: #000;
                    cursor: pointer;

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
}
</style>