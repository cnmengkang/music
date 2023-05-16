<template>
    <div class="edit mt-30 flex">
        <div class="edit-user-left">
            <el-form ref="form" :model="form" label-width="40px" size="small">
                <el-form-item label="昵称">
                    <el-input placeholder="请输入昵称" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="介绍">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="生日">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                        style="width: 100%;"></el-date-picker>

                </el-form-item>
                <el-form-item label="地区">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                        style="width: 100%;"></el-date-picker>

                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="edit-user-right ml-30">
            <el-avatar :size="200"></el-avatar>
        </div>
    </div>
</template>
<script>
export default {
    components: {},
    props: {},
    data() {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    }
}
</script>
<style lang="less" scoped>
.edit {
    .edit-user-left {
        width: calc(100% - 260px);
    }
}
</style>