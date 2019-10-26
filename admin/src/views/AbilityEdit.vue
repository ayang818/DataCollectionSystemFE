<template>
    <div class="about">
        <h2>提升综合素质审批</h2>
        <el-form ref="form" :model="model" label-width="150px">
            <el-form-item label="综合能力提升类别">
                <el-select v-model="model.abilityType" placeholder="请选择综合能力提升类别">
                    <el-option
                    v-for="item in abilityType"
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
            abilityType: ["获国家奖学金","获浙江省政府奖学金","获省级优秀毕业生称号"]
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
