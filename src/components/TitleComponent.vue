<template>
    <div class="title-component mb-15">
        <div class="back-button cursor" v-if="showBackButton" @click="goBack">
            <i class="el-icon-arrow-left"></i>
        </div>
        <div class="title">
            <i :class="iconClass" v-if="icon"></i>
            {{ title }}
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'TitleComponent',
    props: {
        icon: String,
        title: String,
        showBackButton: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        iconClass() {
            return `iconFont ${this.icon}`;
        }
    },
    methods: {
        goBack() {
            history.back()
        }
    }
}
</script>
  
<style lang="less" scoped>
.title-component {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: bold;

    .back-button {
        display: flex;
        align-items: center;
        padding-right: 10px;
        cursor: pointer;

        i {
            font-size: 16px;
            font-weight: bold;
        }
    }

    .title {
        display: flex;
        align-items: center;
    }
}
</style>
  