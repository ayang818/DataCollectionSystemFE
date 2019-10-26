<template>
    <div class="about">
        <h2>发表论文审批</h2>
        <el-form ref="form" :model="model" label-width="150px">
            <el-form-item label="论文题目">
                <el-input v-model="model.paperTitle" placeholder="输入论文名称"></el-input>
            </el-form-item>
            <el-form-item label="论文等级">
                <el-input v-model="model.competitionName" placeholder="输入论文等级"></el-input>
            </el-form-item>
            <el-form-item label="发表年份">
                <el-date-picker
                    v-model="model.publicYear"
                    type="year"
                    placeholder="选择年">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="所有作者姓名">
                <el-input v-model="model.authorName" placeholder="输入所有作者姓名"></el-input>
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
            author_order: ["一","二","三","四","五","六"]
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
