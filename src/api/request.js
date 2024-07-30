import axios from 'axios';
import { Message } from 'element-ui';
import router from '@/router/index';
import { Loading } from 'element-ui';

// // 创建axios实例
var baseURL
baseURL = window.VUE_APP_BASE_API //每个环境所对应的不同的baseURL VUE_APP_BASE_API

let loadingInstance = null
function startLoading () {
  loadingInstance = Loading.service({
    fullscreen: true,
    text: '拼命加载中...',
    background: 'rgba(0, 0, 0, 0.8)'
  })
}
function endLoading () {
  loadingInstance.close()
}
let needLoadingRequestCount = 0
function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}
function tryHideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

const service = axios.create({
  baseURL: baseURL,
  timeout: 300000,
    // 链接超时  当发送时间超过300秒就不再发送了
    // 若网速过慢发送不成功就会报错
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json; charset=utf-8',
  }
});

// request求情拦截器
service.interceptors.request.use(config => {
    showFullScreenLoading();

  config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token') || '';
  //某些接口去除token(params里面noToken值为true的时候,传递给后端的token值为空)
  if (config.params && config.params.noToken) {
    config.headers['Authorization'] = '';
  }

  //非表单提交
  if (config.headers['Content-Type'].indexOf('multipart/form-data') < 0) {
    config.data = { ...config.data, _t: Date.now() };

    //api参数统一用data，get方法把它赋值到params
    if (config.method.toLowerCase() === 'get') {
      config.params = config.data || {};
    }
  }

  return config;

}, error => {
    tryHideFullScreenLoading();
    Message({
        message: error.message,
        type: 'error',
        duration: 3 * 1000
      });
});


// response响应拦截器
service.interceptors.response.use(response => {
    /**
     * response.data对象是服务器返回结果对象
     * code: 200-成功，400-失败，401-重新登录，403-未认证，404-接口不存在，500-服务器内部错误
     */
  
    
    const res = response.data || {};
    console.log('123213213213',response)
    tryHideFullScreenLoading();
    
    if (res.code === 10000) {
        let msg = res.msg ? res.msg : '操作成功'
        Message({
            message: msg,
            type: 'success',
            duration: 3 * 1000
          });

      return Promise.resolve(res);
    }
    else if(res.code === 10003){
        Message({
            message: res.msg,
            type: 'error',
            duration: 3 * 1000
          });
        router.push({ name: 'login' })
    }
    else {
        Message({
            message: res.msg,
            type: 'error',
            duration: 3 * 1000
          });
    }
  },
    (error) => {
        tryHideFullScreenLoading();
        Message({
            message: error.message,
            type: 'error',
            duration: 3 * 1000
          });
    }
  );
  export default service;