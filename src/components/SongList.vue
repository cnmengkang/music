<template>
  <!-- list列表组件 -->
  <div class="song-list">
    <el-skeleton
      :rows="6"
      animated
      :loading="tableDate.length != 0 ? false : true"
    />
    <el-table
      @row-dblclick="getCurrentMusicId"
      size="small"
      :data="tableDate"
      :row-class-name="rowClassName"
    >
      <el-table-column label="序号" width="50" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.id != rowId">{{
            indexMethod(scope.row, scope.$index)
          }}</span>
          <i v-else class="el-icon-video-pause font-16"></i>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="70">
        <template slot-scope="scope">
          <i class="iconFont icon-love" type="selection"></i>
          <i
            class="iconFont icon-down ml-10"
            @click="downloadMusic(scope.row)"
          ></i>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="标题"
        width="350"
        class-name="title"
      >
        <template slot-scope="scope">
          <div class="ellipsis">
            <span class="name" :title="scope.row.name">{{
              scope.row.name
            }}</span>
            <span class="name-tips" v-if="scope.row.alia.length != 0"
              >({{ scope.row.alia[0] }})</span
            >
          </div>
          <div class="right">
            <span
              v-if="scope.row.mv != 0"
              @click="getMv(scope.row)"
              class="mv ml-5"
              >MV<i class="el-icon-caret-right"></i
            ></span>
            <span
              class="originType ml-5"
              v-if="scope.row.originCoverType != 0"
              >{{ scope.row.originCoverType == 1 ? "原唱" : "翻唱" }}</span
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="ar[0].name" label="歌手" />
      <el-table-column show-overflow-tooltip prop="al.name" label="专辑" />
      <el-table-column label="时间" width="65">
        <template slot-scope="scope">
          <span>{{ $formatTime(scope.row.dt, "{i}:{s}") }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- list列表组件 -->
</template>
<script>
import { mapState } from "vuex";
import { songDownloadUrl } from "@/api/music/music";
export default {
  props: {
    tableDate: {
      type: Array,
      require: true,
    },
    total: {
      type: Number,
      require: 0,
    },
  },

  data() {
    return {
      rowId: 0,
      params: {
        index: 0,
        ids: 0,
        playlist: "",
      },
      like: true,
    };
  },
  watch: {
    "player.params.id"(isPlayId) {
      localStorage.setItem("isPlay", isPlayId);
      this.rowId = localStorage.getItem("isPlay");
    },
  },
  mounted() {
    this.rowId = localStorage.getItem("isPlay");
  },
  methods: {
    // 双击获取当前单曲id
    getCurrentMusicId(row) {
      this.params.index = this.tableDate.indexOf(row);
      this.params.playlist = this.tableDate;
      this.$store.dispatch("getCurrentMusicIsPlay", this.params);
    },
    indexMethod(row, index) {
      return String(index + 1).padStart(2, "0");
      // 序号不够两位，补0 ，padStart
    },
    // 下载
    downloadMusic(row) {
      songDownloadUrl(row.id).then((res) => {
        console.log(res)
        const blob = new Blob([res.data.url],{type:res.data.type});
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${row.ar[0].name}-${row.name}.${res.data.type}`;
        link.click();
      });
    },
    rowClassName({ row }) {
      return this.rowId == row.id ? "isPlay" : "";
    },
    getMv(row) {
      alert("暂无数据！！！");
      console.log(row);
    },
  },
  computed: {
    ...mapState({ player: (state) => state.player }),
  },
};
</script>
<style lang="less" scoped>
.icon-love-red:before {
  content: "\e64e";
}
.isPlay .isActive {
  text-indent: -8888;
}
.song-list {
  .mv {
    display: inline-block;
  }

  .name-tips {
    font-size: 12px;
    color: #a39c9c;
  }

  .icon-love-red {
    color: red;
  }

  .hot {
    background: red;
  }
}
.font-16 {
  font-size: 16px;
}
</style>
