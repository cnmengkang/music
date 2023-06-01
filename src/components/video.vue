<template>
    <div class="video mb-15">
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
    }
}
</script>
<style lang="less" scoped>
.video {
    video {
        width: 100%;
    }
}
</style>