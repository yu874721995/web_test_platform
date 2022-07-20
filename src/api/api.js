import request from './request'

const Api = {
    //登录
    login:(data) => {
        return request({
            url:'/api/users/login',
            method:"post",
            data:data,
            params:{
                // noToken:true,
            },
        })
    },
    get_env_list:(data) => {
        return request({
            url:'/api/test_management/envlist',
            method:"post",
            data:data
        })
    },
    get_task_list:(data) => {
        return request({
            url:'/api/test_plant/ScheduledTaskList',
            method:"post",
            data:data
        })
    },
    get_case_list:(data) => {
        return request({
            url:'api/api_case/case/page',
            method:"post",
            data:data
        })
    },
};

export default Api;