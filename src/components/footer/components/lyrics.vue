<template>
    <div class="lyrics">
        <ul>
            <li>
                {{ singerId }}
            </li>
        </ul>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    components: {},
    props: {

    },
    data() {
        return {
            
        };
    },
    created() {
    },
    mounted() {
    },
    computed: {
        ...mapState({
            singerId: state => state.musicInfo.singerId,
        }),

    },
    methods: {


    }
};
</script>
<style lang="less" scoped>
.lyrics {
    width: calc(100% - 200px);
    background: #ffffffad;
    position: absolute;
    height: 30px;
    line-height: 30px;
    right: 0px;
    top: -32px;
    z-index: 99;
    border-top: 1px solid #ccc;
    overflow: hidden;

    ul {
        li {
            text-align: center;
            font-size: 12px;

        }
    }
}
</style>