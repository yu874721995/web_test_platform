import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import {Loading} from 'element-ui';
// import * as echarts from "echarts";
import { has } from "./directives/permission";

Vue.use(VueAxios, axios);
Vue.use(qs)
Vue.use(has)
Vue.prototype.qs = qs;
Vue.config.productionTip = false

Vue.prototype.$http.defaults.baseURL = window.VUE_APP_BASE_API
axios.defaults.baseURL = window.VUE_APP_BASE_API
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = 'YinTa_Test_Platform'
  }
  next()
})

let loadingInstance = null

function startLoading() {
    loadingInstance = Loading.service({
        fullscreen: true,
        text: '拼命加载中...',
        background: 'rgba(0, 0, 0, 0.8)'
    })
}

function endLoading() {
    loadingInstance.close()
}

let needLoadingRequestCount = 0

function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}

//设置axios请求头加入token
axios.interceptors.request.use(config => {
    showFullScreenLoading()
    if (config.push === '/') {
        //
    } else {
        if (localStorage.getItem('token')) {
            config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        }
    }
    return config;
});

axios.interceptors.response.use(response => {
        tryHideFullScreenLoading()
        if (response.data.code === 10003) {
            ElementUI.Message(response.data.msg);
            //清除token
            localStorage.removeItem('token');
            //跳转
            router.push({name: 'login'});
        } else {
            return response
        }
    },
    error => {
        console.log(error)
        tryHideFullScreenLoading()
    }
);


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
