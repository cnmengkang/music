<template>
    <div class="search">
        <el-autocomplete class="auto_Width" placement="bottom" popper-class="my-autocomplete" v-model="value"
            :placeholder="placeholder" size="small" :fetch-suggestions="getSuggestions" @select="handleSelect"
            :trigger-on-focus="true">
            <template slot-scope="{item}">
                <div class="item-content">
                    <div class="left" :class="item.index <= 3 ? 'red' : ''">{{ item.index}}</div>
                    <div class="right">
                        <div class="right-name">
                            <span class="name">{{ item.searchWord || item.name }}</span>
                            <span class="score font-12 ml-10">{{ item.score || "" }}</span>
                            <p class="addr">{{ item.content || "" }}</p>
                        </div>
                    </div>
                </div>
            </template>
            <i slot="suffix" class="el-icon-search el-input__icon" @click.enter="getBtnSearchIcon(placeholder)"></i>
        </el-autocomplete>
    </div>
</template>
<script>
import { search_default, search_hot_detail, search_suggest } from '@/api/search/search'
export default {
    components: {},
    props: {},
    data() {
        return {
            placeholder: '',
            value: '',
            params: {
                limit: 30,
                keywords: ''
            },
            restaurants: [],
        }
    },
    mounted() {
        this.getSearchDefault();
        this.getSearchHotDetail();
    },
    methods: {
        // 聚焦显示热搜版
        async getSuggestions(value, cb) {
            if (value) {
                console.log('value',value)
                const { result } = await search_suggest(value);
                this.restaurants = result.songs;
                const results = value ? this.restaurants : this.restaurants.filter(this.createFilter(value));
                cb(results);
            } else {
                console.log('falseValue',value)
                this.getSearchHotDetail();
                this.indexMethod(this.restaurants);
                const results = value ? this.restaurants.filter(this.createFilter(value)) : this.restaurants;
                cb(results);
            }
        },
        // 过滤数据
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        // 获取搜索框默认热搜内容placeholder
        async getSearchDefault() {
            const { data } = await search_default();
            this.placeholder = data.showKeyword;
        },
        // 获取热搜数据排行榜
        getSearchHotDetail() {
            search_hot_detail().then(res => {
                this.restaurants = res.data;
            });
        },
        // 点击搜索按钮
        getBtnSearchIcon(value) {
            const result = this.value == '' ? value : this.value;
            this.getInputCheck(result);
        },
        // 获取下拉选中的数据
        handleSelect(value) {
            const result = value.searchWord ? value.searchWord : value.name
            this.getInputCheck(result);
        },
        // 检测输入框数据
        getInputCheck(keywords) {
            if (!keywords) return;
            this.params.keywords = keywords;
            this.value = keywords;
            this.$store.dispatch('getCloudSearch', this.params);
            this.$router.push('/search');
        },
        indexMethod(data) {
            this.restaurants = data.map((item, index) => {
                return {
                    ...item,
                    index: index + 1
                }
            })
        }
    },
}
</script>
<style lang="less" scoped>
.auto_Width {
    width: 250px;
}

.my-autocomplete {
    li {
        .name {
            text-overflow: ellipsis;
            overflow: hidden;
        }

        .addr {
            font-size: 12px;
            color: #b4b4b4;
        }

        .highlighted .addr {
            color: #ddd;
        }
    }

    .item-content {
        display: flex;
        align-items: center;
        gap: 10px 10px;
        line-height: 20px;
        height: 35px;
        margin: 10px 0px;

        .score {
            color: #ccc;
        }

    }

    i {
        cursor: pointer;
    }
}
</style>