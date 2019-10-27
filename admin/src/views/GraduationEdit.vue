<template>
    <div class="about">
        <h2>提交毕业去向</h2>
        <el-form ref="form" :model="model" label-width="150px" @submit.native.prevent>
            <el-form-item label="去向类别">
                  <el-select v-model="model.goneType" placeholder="请选择">
                    <el-option
                    v-for="item in gone_type"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="毕业去向">
                 <el-input v-model="model.whereabouts" placeholder="毕业去向"></el-input>
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
            gone_type: ["出国","考研","创业","工作","其它"]
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
