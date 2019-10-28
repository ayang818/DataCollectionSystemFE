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
import AdminApprovalList from "./views/AdminApprovalList"
import EditDict from "./views/EditDict"
import ImportExcel from "./views/ImportExcel"

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/',
  routes: [
    {path: "/login", name: "home", component: Login, meta: {isPublic: true}},
    {
      path: '/',
      component: Main,
      redirect: "/profile/approvallist",
      children: [
        {path: "/honor/competition", component: CompetitionEdit},
        {path: "/honor/competition/edit/:id", component: CompetitionEdit, props: true},

        {path: "/honor/paper", component: PaperEdit},
        {path: "/honor/paper/edit/:id", component: PaperEdit, props: true},

        {path: "/honor/knowledge", component: KnowledgeEdit},
        {path: "/honor/knowledge/edit/:id", component: KnowledgeEdit, props: true},
      
        {path: "/honor/ability", component: AbilityEdit},
        {path: "/honor/ability/edit/:id", component: AbilityEdit, props: true},

        {path: "/honor/graduation", component: GraduationEdit},

        {path: "/profile/edit", component: ProfileEdit},
        {path: "/profile/approvallist", component: ApprovalList},
        {path: "/profile/approvaledit", component: ApprovalList},
        
        {path: "/admin/approvallist", component: AdminApprovalList},

        {path: "/admin/editdict", component: EditDict},
        {path: "/admin/editdict/:parent", component: EditDict, props: true},

        {path: "/admin/importexcel", component: ImportExcel}
      ] 
    },    
  ]
})

router.beforeEach((to, from ,next) => {
  // 既没token 访问的又不是登陆页面
  if (!to.meta.isPublic && !localStorage.token) {
    return next("/login");
  }
  next()
})
export default router