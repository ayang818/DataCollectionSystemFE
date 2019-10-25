<template>
  <div>
    <el-card class="box-card">
      <div class="text item">
          <el-form label-position="left" label-width="80px">
            <el-form-item label="用户名">
              <el-input v-model="model.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="model.password"></el-input>
            </el-form-item>
             <el-form-item>
                <el-button type="primary" @click="login">立即创建</el-button>
              </el-form-item>
          </el-form>
      </div>
    </el-card>
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
    margin: 20% auto;
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