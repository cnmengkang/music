<template>
    <div class="search">
        <el-autocomplete @focus="focus(state)" popper-class="my-autocomplete" v-model.trim="state"
            :fetch-suggestions="querySearch" :placeholder="searchDefault" @select="handleSelect">
            <i class="el-icon-search el-input__icon" slot="prefix" @click="handleIconClick(state)">
            </i>
            <template slot-scope="{ item }">
                <p class="name">{{ item.searchWord }}</p>
                <span class="addr">{{ item.content }}</span>
            </template>
        </el-autocomplete>
    </div>
</template>

<script>
import { searchDefault, searchHot, searchSuggest, searchList } from '@/api/search/search'
export default {
    components: {},
    props: {},
    data() {
        return {
            searchDefault: '',
            state: '',
            searchHot: [],
            searchSuggest: ''
        };
    },
    created() { },
    mounted() {
        this.getSearchDefault();
        this.getSearchHot();
    },
    methods: {
        // 默认搜索内容
        getSearchDefault() {
            searchDefault().then(res => {
                this.searchDefault = res.data.showKeyword
            })
        },
        // 获取搜索列表详情
        getSearchHot() {
            searchHot().then(res => {
                this.searchHot = res.data
            })
        },
        querySearch(queryString, cb) {
            cb(this.searchHot)

        },
        handleSelect(item) {
            this.state = item.searchWord
            console.log(item)
        },
        // 点击搜索图标响应逻辑
        handleIconClick(icon) {
            let search = icon == '' ? this.searchDefault : icon;
            console.log('click', search)
            this.getSearch(search)

        },
        // 搜索建议
        getSearchSuggest(keywords) {
            searchSuggest(keywords).then(res => {
                this.searchSuggest = res.result.songs
                console.log(res.result.songs)
            })
        },
        getSearch(obj) {
            searchList(obj).then(res => {
                console.log(res)
            })
        },
        indexMethods(index) {
            return index * 1
        },
        focus(event) {
            let search = event == '' ? this.searchDefault : event;
            console.log('focus', search)
        }
    }
};
</script>
<style lang="less" scoped>
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

}
</style>