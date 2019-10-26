<template>
    <div class="about">
        <h2>知识产权审批</h2>
        <el-form ref="form" :model="model" label-width="150px">
            <el-form-item label="知识产权类型">
                <el-radio v-model="model.honorType" :label="value" v-for="(value, index) in knowledge_type" :key="index">{{value}}</el-radio>
            </el-form-item>
            <el-form-item label="知识产权名称">
                <el-input v-model="model.honorName" placeholder="知识产权名称"></el-input>
            </el-form-item>
            <el-form-item label="(软著/专利)登记号">
                <el-input v-model="model.honorName" placeholder="如果属于软著/专利，输入登记号"></el-input>
            </el-form-item>
            <el-form-item label="授权状态">
                <el-radio v-model="model.authorizationStatus" label="已授权">已授权</el-radio>
                <el-radio v-model="model.authorizationStatus" label="正在授权">正在授权</el-radio>
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
        id: {}
    },
    data() {
        return {
            model: {},
            knowledge_type: ["软件著作","发明专利"]
        }
    },
    methods: {
        async save(){
            
        },
        async fetch() {
            
        },
    },
    
    created() {
        this.id && this.fetch(this.id);
    }
}
</script>
