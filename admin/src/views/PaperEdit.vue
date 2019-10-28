<template>
    <div class="about">
        <h2>发表论文审批</h2>
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
            <el-form-item label="论文题目">
                <el-input v-model="model.paperTitle" placeholder="输入论文名称"></el-input>
            </el-form-item>
            <el-form-item label="论文等级">
                <el-input v-model="model.paperLevel" placeholder="输入论文等级"></el-input>
            </el-form-item>
            <el-form-item label="发表年份">
                <el-date-picker
                    v-model="model.publishYear"
                    type="year"
                    placeholder="选择年">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="所有作者姓名">
                <el-input v-model="model.authorName" placeholder="输入所有作者姓名"></el-input>
            </el-form-item>
            <el-form-item label="所载刊物">
                <el-input v-model="model.publicationName" placeholder="输入所载刊物名称"></el-input>
            </el-form-item>
            <el-form-item label="第几作者">
                <el-select v-model="model.authorOrder" placeholder="请选择你是第几作者">
                    <el-option
                        v-for="item in author_order"
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
                <el-button type="primary" native-type="submit" @click="submit" v-if="this.auth.type == 1">提交</el-button>
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
            author_order: ["1","2","3","4","5","6"]
        }
    },
    methods: {
        async submit() {
            this.$confirm('是否提交?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            const res = this.$http.post("/api/honor/edit/paper", this.model);
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
            const res = await this.$http.get("/api/honor/detail/paper/"+id);
            this.model = res.data;
            this.model.gmtCreate = this.parseDate(this.model.gmtCreate);
            this.model.gmtModified = this.parseDate(this.model.gmtModified);
        },

        async check(status) {
            const res = await this.$http.get("/api/honor/judge/paper/"+this.id+"?status="+status)            
            this.$router.push("/admin/approvallist");
        },
    },
    
    created() {
        this.getUserInfo();
        this.id && this.fetch(this.id);
    }
}
</script>
