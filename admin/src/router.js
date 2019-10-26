import Vue from 'vue'
import Router from 'vue-router'
import Main from "./views/Main.vue"
import Login from "./views/Login"
import CompetitionEdit from "./views/CompetitionEdit"
import PaperEdit from "./views/PaperEdit"
import KnowledgeEdit from "./views/KnowledgeEdit"
import AbilityEdit from "./views/AbilityEdit"
import GraduationEdit from "./views/GraduationEdit"
import ApprovalList from "./views/ApprovalList"
import ProfileEdit from "./views/ProfileEdit"

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/',
  routes: [
    {path: "/login", name: "home", component: Login, meta: {isPublic: true}},
    {
      path: '/',
      component: Main,
      redirect: "/honor",
      children: [
        {path: "/honor/competition", component: CompetitionEdit},
        {path: "/honor/paper", component: PaperEdit},
        {path: "/honor/knowledge", component: KnowledgeEdit},
        {path: "/honor/abliity", component: AbilityEdit},
        {path: "/honor/graduation", component: GraduationEdit},
        {path: "/profile/edit", component: ProfileEdit},
        {path: "/profile/approvallist", component: ApprovalList},
        {path: "/profile/approvaledit", component: ApprovalList},
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