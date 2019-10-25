import Vue from 'vue'
import Router from 'vue-router'
import Main from "./views/Main.vue"
import Edit from "./views/CategoriesEdit"
import List from "./views/CategoriesList"
import Login from "./views/Login"

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/',
  routes: [
    {path: "/login", name: "home", component: Login, meta: {isPublic: true}},
    {
      path: '/',
      component: Main,
      redirect: "/categories/list",
      children: [
        {path: "/categories/create", component: Edit},
        {path: "/categories/list", component: List},
        {path: "/categories/edit/:id", component: Edit, props: true}
      ] 
    },    
  ]
})

router.beforeEach((to, from ,next) => {
  // 既没token 访问的又不是登陆页面
  // if (!to.meta.isPublic) {
  //   return next("/login");
  // }
  next()
})
export default router