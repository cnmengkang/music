<template>
    <div class="title-component mb-15" @click="Back">
        <i :class="iconClass"></i>
        <h2>{{ title }}</h2>
    </div>
</template>
  
<script>
export default {
    name: 'TitleComponent',
    props: {
        icon: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            required: true
        }
    },
    computed: {
        iconClass() {
            return `iconFont ${this.icon}`; // 假设你的图标使用了类似 "icon-xxx" 的命名约定
        }
    },
    methods: {
        Back() {
            history.back()
        }
    }
};
</script>
  
<style scoped lang="less">
.title-component {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
}

.title-component {
    i {
        font-size: 16px;
    }
}
</style>
  