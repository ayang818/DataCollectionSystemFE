<template>
  <div class="container">
    <div>
      <div class="text item">
          <h2 style="text-align: center;">卓越学院信息管理系统</h2>
          <el-form label-position="left" label-width="80px">
            <el-form-item label="用户名">
              <el-col>
                <el-input v-model="model.username" clearable></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="密码">
              <el-col>
              <el-input v-model="model.password" show-password></el-input>
              </el-col>
            </el-form-item>
             <el-form-item>
                <el-button type="primary" @click="login">登陆</el-button>
              </el-form-item>
          </el-form>
      </div>
    </div>
  </div>
</template>

<style>
 .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 30%;
    margin: 0 auto;
  }
  .container {
    margin: 15% auto;
    border: 1px solid #aaaaaa;
    width: 40%;
    padding: 0 5rem;
    border-radius: 2rem;
  }
  .html .body {
    height: 100vh;
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
            const res =  await this.$http.post("/api/login", this.model);
            let code = String(res.data.code);
            if (code.startsWith("4")) {
                this.$message({
                  type: "error",
                  message: res.data.message,
                })
                return;
            }
            // 存入浏览器数据中
            localStorage.token = res.data.token;
            this.$router.push("/");
            this.$message({
              type: "success",
              message: "登陆成功",
            })
        },
    }
}
</script>