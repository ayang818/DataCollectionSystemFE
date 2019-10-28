<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router unique-opened :default-active="$route.path">
        <el-submenu index="1" v-if="auth.type == 1">
          <template slot="title">
            <i class="el-icon-menu"></i>新增审批
          </template>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/honor/competition">学科竞赛获奖</el-menu-item>
            <el-menu-item index="/honor/paper">发表科研论文</el-menu-item>
          <el-menu-item index="/honor/knowledge">申请知识产权</el-menu-item>
          <el-menu-item index="/honor/ability">综合素质提升</el-menu-item>
          <el-menu-item index="/honor/graduation">提交毕业去向</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2" >
          <template slot="title">
            <i class="el-icon-menu"></i>我的信息
          </template>
          <el-menu-item-group>
            <el-menu-item index="/profile/edit">修改账号信息</el-menu-item>
            <el-menu-item index="/profile/approvallist" v-if="auth.type == 1">我的审批</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3" v-if="auth.type == 2">
          <template slot="title">
            <i class="el-icon-menu"></i>管理员目录
          </template>
          <el-menu-item-group>
            <el-menu-item index="/admin/approvallist">所有提交的审核</el-menu-item>
            <el-menu-item index="/admin/editdict">编辑数据条目</el-menu-item>
            <el-menu-item index="/admin/importexcel">导入信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span>欢迎，{{auth.type == "1" ? auth.studentName : auth.username}}</span>
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
        
      }
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("api/user");
      // this.$set(this.auth, "username", res.data.studentName);
      this.$set(this.auth, "type", res.data.type);
      this.auth = res.data;
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