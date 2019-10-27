<template>
    <div class="about">
        <h2>申报竞赛获奖审批</h2>
        <el-form ref="form" :model="model" label-width="150px" @submit.native.prevent>
            <el-form-item label="竞赛等级">
                <el-radio v-model="model.competitionLevel" :label="value" v-for="(value, index) in comp_level" :key="index">{{value}}</el-radio>
            </el-form-item>
            <el-form-item label="竞赛名称">
                <el-input v-model="model.competitionName" placeholder="输入竞赛名称"></el-input>
            </el-form-item>
            <el-form-item label="获奖等级">
                <el-select v-model="model.honorLevel" placeholder="请选择">
                    <el-option
                        v-for="item in honor_level"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="(选填)指导教师">
                <el-input v-model="model.teacherName" placeholder="教师名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit" @click="submit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    props: {
        id: {},
    },
    data() {
        return {
            model: {},
            comp_level: ["校级竞赛","省级竞赛","国家级竞赛"],
            honor_level: ["国家一等奖","国家二等奖","国家三等奖"]
        }
    },
    methods: {
        async submit() {
            this.$confirm('是否提交?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            const res = this.$http.post("/api/honor/edit/competition", this.model);
            this.$message({
                type: 'success',
                message: '提交成功!'
            });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消提交'
            });          
            });
 
        }
    },
    
    created() {

    }
}
</script>
