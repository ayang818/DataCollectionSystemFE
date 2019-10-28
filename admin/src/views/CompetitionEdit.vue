<template>
    <div class="about">
        <h2>申报竞赛获奖审批</h2>
        <el-form ref="form" :model="model" label-width="150px" @submit.native.prevent>
            <el-form-item label="提交人" v-if="this.auth.type == 2">
                <el-input v-model="model.studentName"></el-input>
            </el-form-item>
            <el-form-item label="学号" v-if="this.auth.type == 2">
                <el-input v-model="model.schoolNumber"></el-input>
            </el-form-item>
            <el-form-item label="创建审批时间" v-if="this.auth.type == 2">
                <el-input v-model="model.gmtCreate"></el-input>
            </el-form-item>
            <el-form-item label="最终修改审批时间" v-if="this.auth.type == 2">
                <el-input v-model="model.gmtModified"></el-input>
            </el-form-item>
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
                <el-button type="primary" native-type="submit" @click="submit" v-if="this.auth.type == 1 && this.model.pass != 2">提交</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="success" native-type="submit" @click="check(2)" v-if="this.auth.type == 2">通过审批</el-button>
                <el-button type="danger" native-type="submit" @click="check(0)" v-if="this.auth.type == 2">未通过审批</el-button>
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
            auth: {},
            type: "",
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
            if (this.id) {
                const res = this.$http.post("/api/honor/edit/competition?id="+this.id, this.model);
            } else {
                const res = this.$http.post("/api/honor/edit/competition", this.model);
            }
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
        },

        async fetch(id) {
            const res = await this.$http.get("/api/honor/detail/competition/"+this.id);
            this.model = res.data;
            this.model.gmtCreate = this.parseDate(this.model.gmtCreate);
            this.model.gmtModified = this.parseDate(this.model.gmtModified);
        },

        async check(status) {
            const res = await this.$http.get("/api/honor/judge/competition/"+this.id+"?status="+status)            
            this.$router.push("/admin/approvallist");
        },

        setDisable() {
            this.type = "disabled"
        }
    },
    
    created() {
        this.getUserInfo();
        this.id && this.fetch(this.id); 
    }
}
</script>
