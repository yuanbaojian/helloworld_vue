import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home'
import login from '../pages/login'
import Welcome from "../pages/Welcome";
import userList from "../pages/user/userList";
import role from "../pages/user/role";
import ipList from "../pages/Utils/IpList"
import editUserInfo from "../pages/user/editUserInfo";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    //路由重定向
    redirect: '/welcome',
    children:[{
      path: '/welcome',
      component :Welcome
    },
      {
      path: '/userList',
      component :userList
    },
      {
      path: '/role',
      component :role
    },
      {
      path: '/ipList',
      component :ipList
    },
      {
      path: '/editUserInfo',
      component :editUserInfo
    }

    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach(((to, from, next) => {
  window.console.log(to.path);
  if(to.path === '/login'){
    next();
  } else{
    let token = window.sessionStorage.getItem('token');
    if(!token){
      next('/login');
    } else{
      next();
    }
  }
}))


export default router
