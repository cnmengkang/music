<template>
    <div class="recently mt-30">
        <h2>最近播放 &nbsp;{{ total }}</h2>
        <song-list :tableDate="recentlyArray" :recently="recently" />
    </div>
</template>

<script>
import { RecordRecentSong } from '@/api/user/user';
import SongList from '@/components/SongList'
export default {
    components: { SongList },
    props: {},
    data() {
        return {
            params: {
                offset: 0,
                limit: 100,
            },
            recently: [],
            total: 0,
        };
    },
    mounted() {
        this.GetRecordRecentSong()
    },
    methods: {
        async GetRecordRecentSong() {
            const { data } = await RecordRecentSong(this.params);
            this.recently = data.list;
            this.total = data.total;
        }
    },
    computed: {
        recentlyArray() {
            return this.recently.map(item => item.data)
        },
    },
}
</script>