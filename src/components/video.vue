<template>
    <div class="video">
        <video :src="url" autoplay controls></video>
    </div>
</template>

<script>
export default {
    props: {
        url: {
            type: String,
            require: true,
        }
    },
}
</script>
<style lang="less" scoped>
.video {
    width: 620px;
    height: 350px;
    video{
        width: 100%;
    }
}
</style>