<template>
    <div class="category-menu">
        分类
    </div>
</template>
<script>
export default {
    name: "videos",
    components: {},
    data() {
        return {

        };
    },
    created() {

    },
    methods: {


    }
};
</script>
<style lang="less" scoped>
.category-menu {
    width: 100%;

    .box-card {
        width: 80%;
        height: 520px;
        overflow-y: scroll;
    }

    .card_body {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        text-align: center;

        .el-tag {
            border: none;
            width: 15%;
            transition: all .3s linear;
        }

        .active {
            background: #ffc0cb;
        }
    }

    .video-tabs {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>
