<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router unique-opened :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>内容管理
          </template>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span>欢迎，{{auth.username}}</span>
        <button class="btn" @click="quit()">退出登陆</button>
      </el-header>
      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.btn {
  border: none;
  margin: 5px;
  background: #b3c0d1;
  color: red;
}
</style>

<script>
export default {
  data() {
    return {
      auth: {
        username: ""
      }
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("api/user");
      this.$set(this.auth, "username", res.data.studentName);
    },
    quit() {
      localStorage.clear();
      this.$router.push("/login");
    }
  },
  created() {
    this.fetch();
  }
};
</script>