// 引入vue
import Vue from 'vue';
// 引入路由
import Router from 'vue-router';

// 使用路由
Vue.use(Router);

export default new Router({
  base: __dirname, //配置了路由的情况下，访问路由目录为默认根目录
  routes: [
    // 默认指向登录页面
    {
      path: '/',
      redirect: '/login'
    },
    // 指向登录页面
    {
      path: '/login',
      name: 'login',
      component: resolve =>
        require(['@/components/login'], resolve),
    },
    // 指向主页面
    {
      path: '/home',
      name: 'home',
      component: resolve =>
        require(['@/components/home'], resolve),
    },
    //指向二级页面
    {
      path: '/manage-report',
      name: 'manage-report',
      component: resolve =>
        require(['@/components/manage-report'], resolve),
    },
    //指向二级页面
    {
      path: '/student-report',
      name: 'student-report',
      component: resolve =>
        require(['@/components/student-report'], resolve),
    },
    //指向二级页面
    {
      path: '/modify-data',
      name: 'modify-data',
      component: resolve =>
        require(['@/components/modify-data'], resolve),
    },
    //指向二级页面
    {
      path: '/recruit-detail',
      name: 'recruit-detail',
      component: resolve =>
        require(['@/components/recruit-detail'], resolve),
    }
  ]
});
