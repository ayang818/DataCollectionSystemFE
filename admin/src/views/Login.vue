<template>
  <div class="login-container">
    <el-card header="登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
            <el-input class="input" v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input class="input" type="password" v-model="model.password"></el-input>
        </el-form-item>

        <el-form-item>
           <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style>
.login-card {
  width: 25%;
  text-align: center;
  margin: 10rem auto;
  font-weight: bolder;

}
body {
  
}
.input {
    margin: 0;
}
</style>

<script>
export default {
    data() {
        return {
            model: {}
        } 
    },
    methods: {
        async login() {
            // 得到token
            const res =  await this.$http.post("/login", this.model);
            // 存入浏览器数据中
            localStorage.token = res.data.token;
            this.$router.push("/");
            this.$message({
              type: "success",
              message: "登陆成功",
            })
        }
    }
}
</script>