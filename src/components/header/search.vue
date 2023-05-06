<template>
    <div class="search">
        <el-autocomplete class="auto_Width" placement="bottom" popper-class="my-autocomplete" v-model="value"
            :placeholder="placeholder" size="small" :fetch-suggestions="getSuggestions" @select="handleSelect"
            @input="input(value)">
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
import { search_default, search_hot_detail, search_suggest, } from '@/api/search/search'
export default {
    components: {},
    props: {},
    data() {
        return {
            placeholder: '',
            value: '',
            hotSearch: [],
            params: {
                limit: 30,
                keywords: ''
            }

        }
    },
    created() {
        this.getSearchDefault();
    },
    mounted() {
        this.getSearchHotDetail();
    },
    methods: {
        // 默认搜索关键词placeholder
        async getSearchDefault() {
            const { data } = await search_default();
            this.placeholder = data.showKeyword
        },
        // 点击搜索按钮
        getBtnSearchIcon(value) {
            console.log(value)
        },
        // 聚焦显示热搜版
        getSuggestions(value, cb) {
            const restaurants = this.hotSearch;
            const result = value ? restaurants.filter(this.createFilter(value)) : restaurants;
            cb(result)
        },
        // 过滤数据
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        // 获取热搜数据
        getSearchHotDetail() {
            search_hot_detail().then(res => {
                this.hotSearch = res.data
            });
        },

        // 获取下拉选中的数据
        handleSelect(item) {
            if (item == '') return;
            this.value = item.searchWord;
            this.params.keywords = item.searchWord;
            this.getCloudResult();
            this.$router.push('search');
        },
        getCloudResult() {
            this.$store.dispatch('search/getCloudSearch', this.params);
        },
        // input值改变时触发
        input(value) {
            this.params.keywords = value;
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