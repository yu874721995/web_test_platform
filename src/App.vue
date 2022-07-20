<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script>
import axios from "axios";
import store from "./store/index";
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    },
  },
  beforeCreate() {
    if(window.localStorage.getItem('token')){
      axios
      .post("/api/users/userAuthMenu")
      .then((res) => {
        //api接口判断为code=10000成功
        if (res.data["code"] === 10000) {
          // 延时加载
          window.sessionStorage.setItem(
            "auth",
            JSON.stringify(res.data.authMenu)
          );
          window.sessionStorage.setItem(
            "button",
            JSON.stringify(res.data.jurisdiction_ids)
          );
          store.commit({
            type: "setmenuData",
            data: res.data.authMenu,
          });
          store.commit({
            type: "setbuttonData",
            data: res.data.jurisdiction_ids,
          });
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
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background: #cfcbcb;
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 10px;
  background: #ededed;
}
</style>