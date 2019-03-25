// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入vue
import Vue from 'vue'
// 引入babel-polyfill支持在低版本浏览器的es6新语法
import 'babel-polyfill'
// 引入es6-promise兼容axios并起到异步回调函数的作用
import promise from 'es6-promise';
promise.polyfill();
// 引入路由
import router from '@/router'

Vue.config.productionTip = false

// 引入elementui组件
import ElementUI from 'element-ui';
// 引入elementui样式
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  template: '<router-view/>'
})
