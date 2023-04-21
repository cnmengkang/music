<template>
    <div class="lyrics">
        <ul>
            歌词
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        lyric: {
            type: Array,
            require: true
        }
    },
    data() {
        return {
        };
    },
    created() {

    },
    mounted() {
        // 获取当前播放音乐id
    },
    methods: {

    },
    computed: {
    }
};
</script>
  
<style scoped lang="less"></style>
  