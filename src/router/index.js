import Vue from 'vue'
import Router from 'vue-router'
import Board from '@/components/Board'
import ContentDetatil from '@/components/ContentDetail'
import Create from '@/components/Create'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import Detail3 from '@/components/Detail3'
import LocationDetail from '@/components/LocationDetail'
import Mypage from '@/components/Mypage'
import OauthRedirect from '@/components/oauth/Redirect'
import IndexPage from '@/components/Index'


Vue.use(Router)

export default new Router({

  scrollBehavior(to, from, savedPosition) {
    return {x:0, y:0};
  },
  component: IndexPage,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/board/free',
      name: 'Board',
      component: Board
    },
    {
      path: '/detail3',
      name: 'Detail3',
      component: Detail3
    },
    {
      path: '/board/free/detail/:contentNo',
      name: 'ContentDetail',
      component: ContentDetatil
    },
    {
      path: '/board/free/create/:contentNo?',
      name: 'Create',
      component: Create
    },
    {
      path: '/detail3/locationdetail', // /:locaNo
      name: 'LocationDetail',
      component: LocationDetail
    },
    {
      path: '/mypage',
      name: 'Mypage',
      component: Mypage
    },
    {
      path: '/oauth/redirect',
      name: 'OauthRedirect',
      component: OauthRedirect
    }
  ],
  mode:'history'
  
});



