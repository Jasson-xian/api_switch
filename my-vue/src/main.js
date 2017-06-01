// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routes from './routes/'
import userService from 'services/userService'
import eventEmitter from 'services/timeout'
import store from 'src/vuex/store'

Vue.use(VueRouter)
const router = new VueRouter({routes})

// userService.getLoginInfo()
//    .then((recvdata) => {
//     recvdata = JSON.parse(recvdata)
    let recvdata = {"success":true,"data":{"cert":{"status":"valid","id":"b2f06efbde615660","desc":"\u6d4b\u8bd5","lang":"chinese","licence_owner":"\u5317\u4eac\u536b\u8fbe\u79d1\u6280\u6709\u9650\u516c\u53f8","copy_right":"\u5317\u4eac\u536b\u8fbe\u79d1\u6280\u6709\u9650\u516c\u53f8","type":"test","device_id":"8a17538530e19c88","user":"\u6d4b\u8bd5","model":"\u5e7b\u58831\u7cfb","create_time":1495785528,"start_time":1495785519,"end_time":1498406400,"max_hosts":100,"max_flows":100000,"alive_time":2126574,"tick_count":43470,"utc_timestamp":1496279199},"access":true,"login":{"isLogin":true,"user_id":"admin","user_group":"2","windows":false},"web_ui":900}}
    store.state.access=recvdata.data.access
    store.state.cert=recvdata.data.cert   
    store.state.web_ui=recvdata.data.web_ui
    store.state.time=recvdata.data.web_ui
    store.state.login=recvdata.data.login
    router.beforeEach((to,from,next)=>{
      // if(!store.state.access) {//如果没有权限访问网站，跳转提示页面
      //   if(to.path != "/error") {//对路由过滤，全部路由到error页面
      //     next("/error")
      //   }else{
      //     next()
      //   }
      // }else {
      //   if(!store.state.login.isLogin && to.path != "/login") {//如果有网站访问权限，但没有登录，跳转到登录页面
      //     next("/login")
      //   }else{
      //     if((to.path == "/login" || to.path == "/error") && store.state.login.isLogin) {//如果已经登录，却尝试访问登录页面或者错误页面，将继续保持原本的页面
      //       next(from.path)
      //     }else{
      //       next()
      //     }
      //   }
      // }
      next()
    })
    setInterval(()=>{
      if(store.state.login.isLogin){
          store.state.web_ui-=1
          if(store.state.web_ui==0){ 
            userService.logout()
            eventEmitter.emit('timeout_Event');
          }
      }
    },1000)
    new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router,
      store
    })
// })
/* eslint-disable no-new */