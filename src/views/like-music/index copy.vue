<template>
  <div>
    <el-table :data="tableData" border>
      <el-table-column prop="clzssName" label="班级" :rowspan="rowspanMethod">
      </el-table-column>
      <el-table-column label="对象">
        <template slot-scope="scope">
          <div class="border">{{ scope.row.airTaskClzssInfoDetailList[0].educationName }}</div>
          <div>{{ scope.row.airTaskClzssInfoDetailList[1].educationName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="时间">
        <template slot-scope="scope">
          <div>{{ scope.row.airTaskClzssInfoDetailList[0].createDate }}</div>
          <div>{{ scope.row.airTaskClzssInfoDetailList[1].createDate }}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 855,
          airTaskId: 106,
          clzssId: 5604,
          clzssName: "1班",
          fileStatus: 1,
          fileUrl: null,
          isDeleted: false,
          createUserId: 12380008,
          createTime: "2023-04-19 16:29:41",
          updateUserId: null,
          updateTime: null,
          airTaskClzssInfoDetailList: [
            {
              educationName: "教师版",
              createDate: "2023-04-21 11:49:57",
              copies: 1,
              studentNum: null,
            },
            {
              educationName: "学生版",
              createDate: "2023-04-21 11:49:57",
              copies: 49,
              studentNum: 49,
            },
          ],
        },
        {
          id: 100,
          airTaskId: 106,
          clzssId: 5604,
          clzssName: "2班",
          fileStatus: 1,
          fileUrl: null,
          isDeleted: false,
          createUserId: 12380008,
          createTime: "2023-04-19 16:29:41",
          updateUserId: null,
          updateTime: null,
          airTaskClzssInfoDetailList: [
            {
              educationName: "教师版",
              createDate: "2023-04-21 11:49:57",
              copies: 1,
              studentNum: null,
            },
            {
              educationName: "学生版",
              createDate: "2023-04-21 11:49:57",
              copies: 49,
              studentNum: 49,
            },
          ],
        },
      ],
    };
  },
  methods: {
    rowspanMethod(row, index) {
      if (index === 0) {
        // 判断是否需要合并
        const count = this.tableData.filter((item) => item.clzssName === row.clzssName).length;
        return count;
      } else {
        return 0;
      }
    },

  },
};
</script>

<style>
.merge-class-name {
  text-align: center;
  line-height: 60px;
}

.border {
  border-bottom: 1px solid #ccc;
}
</style>
