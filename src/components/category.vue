<template>
    <el-popover placement="bottom-start" visible-arrow="false" :width="width" trigger="click" v-model="show">
        <el-button slot="reference" size="small" round>{{ tabsName || all }}<i
                class="el-icon-arrow-right el-icon--right"></i></el-button>
        <div class="category pl-10 pr-10">
            <div class="category-head pd-10"><el-link :underline="false" @click="getCategoryName(all)">{{ all
            }}</el-link></div>
            <div class="category-body  pd-10">
                <div class="category-list mb-15" v-for="(item, index) in categories" :key="index">
                    <div class="category-title flex"><i class="el-icon-menu" />{{ item }}</div>
                    <div class="category-name flex">
                        <div class="tabs mb-5" v-for="(item, subIndex) in filteredSub(index)" :key="subIndex"
                            @click="getCategoryName(item)">
                            <el-link :underline="false">
                                <p>{{ item.name }}<sup v-if="item.hot" class="red font-12"><i>hot</i></sup></p>
                            </el-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </el-popover>
</template>
<script>
export default {
    components: {},
    props: {
        all: {
            type: String,
            require: 0,
        },
        categories: {
            type: Object,
            require: 0,
        },
        sub: {
            type: Array,
            require: 0,
        },
        tabsName:{
            type:String,
            require:true
        }
    },
    data() {
        return {
            width: 740,
            show: false,
        }
    },
    methods: {
        getCategoryName(item) {
            this.show = false;
            this.$emit('myEvent', item)
        }
    },
    computed: {
        filteredSub() {
            return (index => {
                return this.sub.filter((item) => {
                    return item.category == index;
                })
            })
        }
    },
}
</script>
<style lang="less" scoped>
.category {
    .category-head {
        padding-left: 50px;
    }

    .category-body {
        .category-list {
            display: flex;
            align-items: center;

            .category-title {
                width: 10%;
                color: #ccc;
            }

            .category-name {
                width: 90%;

                .activeBgc {
                    background-color: red;
                }

                .tabs {
                    width: 100px;
                }
            }
        }
    }

}
</style>
