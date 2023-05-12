<template>
    <el-tabs :value="tabsName" @tab-click="handleTabClick" :tab-position="position">
        <slot></slot>
    </el-tabs>
</template>
<script>
export default {
    name: 'Tabs',
    props: {
        position: {
            type: String,
            require: 'top'
        },
        tabsName: {
            type: String,
            require: true
        }
    },
    methods: {
        handleTabClick(tab) {
            this.$emit('tab-click', tab);
        },
    }
}
</script>