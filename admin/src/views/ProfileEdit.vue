<template>
    <div>
        <h2>修改账号信息</h2>  
        <el-form ref="form" :model="model" label-width="150px" @submit.native.prevent>
            <el-form-item label="修改密码">
                <el-input placeholder="请输入密码" v-model="model.password" show-password></el-input>
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

    },
    data() {
        return {
            model: {},
        }
    },
    methods: {
        async submit() {
            const res = await this.$http.post("/api/profile/edit", this.model);
            let code = String(res.data.code);
            if (code.startsWith("4")) {
                this.$message({
                  type: "error",
                  message: res.data.message,
                })
                return;
            }
            localStorage.clear()
            this.$router.push("/login")
            this.$message({
              type: "success",
              message: "密码修改成功,请重新登陆",
            })
        }
    },
    
    created() {

    }
}
</script>