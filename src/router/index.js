import Vue from 'vue'
import VueRouter from 'vue-router'
import Auto_manage from '../views/home/Auto_manage.vue'
import Login from '../views/login/Login.vue'
import project_home from '../views/home/Project_home.vue'
import Env_manage from '../views/home/Env_manage.vue'
import Group_case from '../views/home/Group_case.vue'
import Single_case from '../views/home/Single_case.vue'
import Plan_manage from '../views/home/Plan_manage.vue'
import Task_manage from '../views/home/Task_manage.vue'
import Test_report from '../views/home/Test_report.vue'
import module_manage from '../views/home/module_manage.vue'
import Home from '../views/home/Home.vue'
import Acount_manage from '../views/home/Acount_manage.vue'
import Role_auth from '../views/home/Role_auth.vue'
import Mitmproxy_case from '../views/home/Mitmproxy_case.vue'
import Swagger_api from '@/views/home/Swagger_api.vue'
import Swagger_api_new from '@/views/home/Swagger_api_new.vue'
import dubbo_mananger from '@/views/home/dubbo_manage.vue'
import ElementUI from 'element-ui'
import Tapd_Project_home from '../views/project_manage/Project_manage.vue'
import Tapd_Projects from '../views/project_manage/Project_home.vue'
import Tapd_demand_config from '../views/project_manage/Tapd_demand_config.vue'
import Tapd_demand_middle_config from '../views/project_manage/Tapd_demand_middle_config.vue'
import system_manage from '@/views/home/systemConf.vue'
import Tapd_test_risk from '../views/project_manage/Tapd_test_risk.vue'
import 'element-ui/lib/theme-chalk/index.css'
import test_tool_bkci from '../views/Test_tools/test_tool_bkci_new.vue'
import test_tool_xxjob from '../views/Test_tools/test_tool_xxjob.vue'
import test_tool_all from '../views/Test_tools/test_tool_all.vue'
import test_tool_sql_data from '../views/Test_tools/test_tool_sql_data.vue'
import test_tools_manage from '../views/Test_tools/test_tools_manage.vue'
import jursidiction_manage from '@/views/home/jursidiction_manage.vue'
import interfaceConfig from '../views/home/InterFaceConfig.vue'
import mock_data from '../views/home/mockDetail.vue'
import axios from 'axios'
import store from '../store/index'
import Env_Navigations_manage from '../views/Env_Navigations/Env_Navigations_manage.vue'
import Env_Navigation from '../views/Env_Navigations/Env_Navigation.vue'

Vue.use(ElementUI)
Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        name: 'Auto_manage',
        component: Auto_manage
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/Tapd_Project_home',
        name: 'Tapd_Project_home',
        component: Tapd_Project_home,
        children: [
            {
                path: '/Tapd_Project',
                name: 'Tapd_Project',
                meta: { "title": "Tapd项目管理" },
                component: Tapd_Projects
            },
            {
                path: '/Tapd_demand_config',
                name: 'Tapd_demand_config',
                meta: { "title": "Tapd需求配置" },
                component: Tapd_demand_config
            },
            {
                path: '/Tapd_demand_middle_config',
                name: 'Tapd_demand_middle_config',
                meta: { "title": "Tapd需求配置" },
                component: Tapd_demand_middle_config
            },
            {
                path: '/Tapd_test_risk',
                name: 'Tapd_test_risk',
                meta: { "title": "测试风险统计" },
                component: Tapd_test_risk
            }
        ]
    },
    {
        path: '/test_tools_manage',
        name: 'test_tools_manage',
        component: test_tools_manage,
        children: [
            {
                path: '/test_tool_bkci',
                name: 'test_tool_bkci',
                meta: { "title": "Jenkins构建工具" },
                component: test_tool_bkci
            },
            {
                path: '/test_tool_xxjob',
                name: 'test_tool_xxjob',
                meta: { "title": "xxjob-执行工具" },
                component: test_tool_xxjob
            },
            {
                path: '/test_tool_all',
                name: 'test_tool_all',
                meta: { "title": "其他测试工具" },
                component: test_tool_all
            },
            {
                path: '/test_tool_sql_data',
                name: 'test_tool_sql_data',
                meta: { "title": "数据对比" },
                component: test_tool_sql_data
            },
            {
              path: '/mock_data',
              name: 'mock_data',
              meta: { "title": "mock数据" },
              component: mock_data
            },
        ]
    },
    {
        path: "/Auto_manage",
        name: "",
        component: Auto_manage,
        children: [
            {
                path: '/Home',
                name: 'Home',
                meta: { "title": "YinTa-Test-Platform" },
                component: Home
            },
            {
                path: '/system_manage',
                name: 'system_manage',
                meta: { "title": "配置管理" },
                component: system_manage
            },
            {
                path: '/project_manage',
                name: 'project_manage',
                meta: { "title": "项目管理" },
                component: project_home
            },
            {
                path: '/Env_manage',
                name: 'Env_manage',
                meta: { "title": "环境管理" },
                component: Env_manage
            },
            {
                path: '/Acount_manage',
                name: 'Acount_manage',
                meta: { "title": "账号管理" },
                component: Acount_manage
            },
            {
                path: '/module_manage',
                name: 'module_manage',
                meta: { "title": "模块管理" },
                component: module_manage
            },
            {
                path: '/Single_case',
                name: 'Single_case',
                meta: { "title": "用例列表" },
                component: Single_case
            },
            {
                path: '/Group_case',
                name: 'Group_case',
                meta: { "title": "组合用例" },
                component: Group_case
            },
            {
                path: '/Mitmproxy_case',
                name: 'Mitmproxy_case',
                meta: { "title": "用例列表" },
                component: Mitmproxy_case
            },
            {
                path: '/Swagger_api',
                name: 'Swagger_api',
                meta: { "title": "所有接口" },
                component: Swagger_api
            },
            {
                path: '/dubbo_mananger',
                name: 'dubbo_mananger',
                meta: { "title": "dubbo接口" },
                component: dubbo_mananger
            },
            {
                path: '/interFaceConfig',
                name: 'interFaceConfig',
                meta: { "title": "接口配置" },
                component: interfaceConfig
            },
            {
                path: '/swagger-update',
                name: 'Swagger_api_new',
                meta: { "title": "更新接口" },
                component: Swagger_api_new
            },
            {
                path: '/Plan_manage',
                name: 'Plan_manage',
                meta: { "title": "计划管理" },
                component: Plan_manage
            },
            {
                path: '/Task_manage',
                name: 'Task_manage',
                meta: { "title": "任务管理" },
                component: Task_manage
            },
            {
                path: '/Test_report',
                name: 'Test_report',
                meta: { "title": "测试报表" },
                component: Test_report
            },
            {
                path: '/jursidiction_manage',
                name: 'jursidiction_manage',
                meta: { "title": "权限管理" },
                component: jursidiction_manage
            },
            {
                path: '/Role_auth_manage',
                name: 'Role_auth_manage',
                meta: { "title": "角色管理" },
                component: Role_auth
            }
        ]
    },
            {
                path: '/Env_Navigations_manage',
                name: 'Env_Navigations_manage',
                component: Env_Navigations_manage,
                children: [
                    {
                        path: '/Env_Navigation',
                        name: 'Env_Navigation',
                        meta: { "title": "环境导航" },
                        component: Env_Navigation
                    }
                ]
            }
]

const router = new VueRouter({
    mode: 'history',
    routes: routes,
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router

router.beforeEach((to, from, next) => {
    //to到哪儿 from从哪儿离开 next跳转 为空就是放行 
    if (to.path === '/login') {
        //如果跳转为登录，就放行 
        next();
    } else if (to.path === '') {
        router.push({ name: 'Home' });
        window.localStorage.setItem("activeName", 'Auto_manage');
    }
    else {
        //取出localStorage判断
        let token = localStorage.getItem('token');
        if (token == null || token === '') {
            ElementUI.Message('请先登录');
            router.push({ name: 'login' });
        } else {
            if (window.sessionStorage.getItem('auth') && store.state.menuData!=[] && store.state.buttonData!=[]) { next() } else {
                axios
                    .post("/api/users/userAuthMenu")
                    .then((res) => {
                        //api接口判断为code=10000成功
                        if (res.data["code"] === 10000) {
                            // 延时加载
                            window.sessionStorage.setItem('auth', JSON.stringify(res.data.authMenu))
                            window.sessionStorage.setItem('button', JSON.stringify(res.data.jurisdiction_ids))
                            store.commit({
                                type: "setmenuData",
                                data: res.data.authMenu,
                              });
                              store.commit({
                                type: "setbuttonData",
                                data: res.data.jurisdiction_ids,
                              });
                            next()
                        } else {
                            //失败提示
                            this.$message.error(res.data.msg);
                        }
                    })
                    .catch((error) => {
                        console.log(error); //  错误处理 相当于error
                        this.$message.error("服务器错误,请联系测试人员");
                    });
            }

        }
    }
});