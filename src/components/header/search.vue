<template>
    <div class="search">
        <el-autocomplete class="autoWidth" placement="bottom" @focus="focus(state)" popper-class="my-autocomplete"
            v-model.trim="state" :fetch-suggestions="querySearch" size="small" :placeholder="searchDefault"
            @select="handleSelect" @keyup.enter.native="handleIconClick(state)">
            <template slot-scope="{ item }">
                <div class="item-content">
                    <p class="name">{{ item.searchWord }}</p>
                    <span class="addr">{{ item.content }}</span>
                </div>
            </template>
            <i slot="suffix" class="el-icon-search el-input__icon" @click="handleIconClick(state)"></i>
        </el-autocomplete>
    </div>
</template>
<script>
import { searchDefault, searchHot, searchSuggest } from '@/api/search/search';
export default {
    components: {},
    props: {},
    data() {
        return {
            searchDefault: '',
            state: '',
            searchHot: [],
            result: false,
            params: {
                limit: 50,
                keywords: ''
            }
        };
    },
    created() { },
    mounted() {
        this.getSearchDefault();
        this.getSearchHot();
    },
    computed: {
        // 序号
        indexMethods(index = 0) {
            return index * 1
        },
    },
    methods: {
        // 默认搜索内容
        getSearchDefault() {
            searchDefault().then(res => {
                console.log(res.data)
                this.searchDefault = res.data.styleKeyword.keyWord
            })
        },
        // 获取搜索列表详情
        getSearchHot() {
            searchHot().then(res => {
                this.searchHot = res.data
            })
        },
        // 
        querySearch(queryString, cb) {
            cb(this.searchHot)

        },
        // 点击下拉框内容触发函数
        handleSelect(item) {
            this.state = item.searchWord
            this.params.keywords = item.searchWord
            this.getSearch()
        },
        // 点击搜索图标响应逻辑
        handleIconClick(icon) {
            let search = icon == '' ? this.searchDefault : icon;
            this.state = search
            this.params.keywords = search;
            this.getSearch()
        },
        // 搜索建议
        getSearchSuggest(keywords) {
            searchSuggest(keywords).then(res => {
                console.log('建议', res)
            })
        },
        // 搜索结果
        getSearch() {
            if (this.params == '') return;
            this.$store.dispatch('search/getResult', this.params);
            this.$router.push('/search')
        },
        // 聚焦
        focus(event) {
            let search = event == '' ? this.searchDefault : event;
            console.log('focus', search)
        },
        // // input值改变时触发
        // SetInput(event) {
        //     this.getSearchSuggest(event)
        //     console.log(event)
        // }
    }
};
</script>
<style lang="less" scoped>
.autoWidth {
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

    i {
        cursor: pointer;
    }

}
</style>