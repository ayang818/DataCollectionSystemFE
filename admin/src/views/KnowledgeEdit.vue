<template>
    <div class="about">
        <h2>知识产权审批</h2>
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
            <el-form-item label="知识产权类型">
                <el-radio v-model="model.honorType" :label="value" v-for="(value, index) in knowledge_type" :key="index">{{value}}</el-radio>
            </el-form-item>
            <el-form-item label="知识产权名称">
                <el-input v-model="model.honorName" placeholder="知识产权名称"></el-input>
            </el-form-item>
            <el-form-item label="(软著/专利)登记号">
                <el-input v-model="model.registerNumber" placeholder="如果属于软著/专利，输入登记号"></el-input>
            </el-form-item>
            <el-form-item label="授权状态">
                <el-radio v-model="model.authorizationStatus" label="已授权">已授权</el-radio>
                <el-radio v-model="model.authorizationStatus" label="正在授权">正在授权</el-radio>
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
        id: {}
    },
    data() {
        return {
            model: {},
            auth: {},
            knowledge_type: ["软件著作","发明专利"]
        }
    },
    methods: {
        async submit() {
            this.$confirm('是否提交?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            const res = this.$http.post("/api/honor/edit/knowledge", this.model);
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
            const res = await this.$http.get("/api/honor/detail/knowledge/"+id);
            this.model = res.data;
            this.model.gmtCreate = this.parseDate(this.model.gmtCreate);
            this.model.gmtModified = this.parseDate(this.model.gmtModified);
        },

        async check(status) {
            const res = await this.$http.get("/api/honor/judge/knowledge/"+this.id+"?status="+status)            
            this.$router.push("/admin/approvallist");
        },
    },
    
    created() {
        this.getUserInfo();
        this.id && this.fetch(this.id)
    }
}
</script>
