<template>
    <div class="search">
        <el-autocomplete class="auto_Width" placement="bottom" popper-class="my-autocomplete" v-model="value"
            :placeholder="placeholder" size="small" :fetch-suggestions="getSuggestions" @select="handleSelect"
            :trigger-on-focus="true">
            <template slot-scope="{ item }">
                <div class="item-content">
                    <div class="left">1</div>
                    <div class="right">
                        <p class="name">{{ item.searchWord }}</p>
                        <span class="addr">{{ item.content }}</span>
                    </div>
                </div>
            </template>
            <i slot="suffix" class="el-icon-search el-input__icon" @click="getBtnSearchIcon(placeholder)"></i>
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
                const {result} = await search_suggest(value);
                console.log(result.songs)
            }
            const results = value ? this.restaurants.filter(this.createFilter(value)) : this.restaurants;
            cb(results);
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
        handleSelect({ searchWord }) {
            this.getInputCheck(searchWord)
        },
        // 检测输入框数据 发送axios请求
        getInputCheck(keywords) {
            if (!keywords) return;
            this.params.keywords = keywords;
            this.value = keywords;
            this.$store.dispatch('search/getCloudSearch', this.params);
            this.$router.push('/search')
        }
    }
};
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
        gap: 10px;

        .left {
            padding: 0px 10px;
        }
    }

    i {
        cursor: pointer;
    }
}
</style>