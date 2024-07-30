<template>
  <div>
    <div id="home_logo_div">
      <img
        src="../views/home/statc/logo_yinta.png"
        class="home_logo"
        alt="nextop"
        style="height: 50px;"
        @click="home_click"
      />
    </div>
    <el-tooltip
      class="item"
      effect="dark"
      content="退出登录"
      placement="top-start"
    >
      <img
        v-bind:src="usericon"
        class="user_icon"
        alt="user"
        @click="user_icon_click"
      />
    </el-tooltip>
    <!-- <span class="welcomn" slot="welcomn">{{ welcomn }}</span> -->

    <div id="header_menu_div" style="display: flex; flex-direction: column">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in headerMenu"
          :label="item.title"
          :name="item.name"
          :key="index"
        ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from '../store/index'
export default {
  name: "Headers",
  data() {
    return {
      activeName: window.localStorage.getItem("activeName"),
      usericon:
        "https://img1.baidu.com/it/u=1371756451,2408220877&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
      welcomn: localStorage.getItem("nickname")
        ? localStorage.getItem("nickname")
        : "",
    };
  },
  computed: {
    ...mapGetters(["menuData"]),
    headerMenu() {
      return this.menuData;
    },
  },
  methods: {
    handleClick(tab) {
      const { name } = tab;
      this.activeName = name;
      if (name === "Auto_manage") {
        window.localStorage.setItem("activeName", "Auto_manage");
        this.$router.push(this.return_header_firstMenu("Auto_manage"),
        );
      } else if (name === "Tapd_Project_home") {
        window.localStorage.setItem("activeName", "Tapd_Project_home");
        this.$router.push(this.return_header_firstMenu("Tapd_Project_home"),
        );
      } else if (name === "test_tool") {
        window.localStorage.setItem("activeName", "test_tool");
        this.$router.push(this.return_header_firstMenu("test_tool"));
      }
      else if (name === "Env_Navigation") {
        window.localStorage.setItem("activeName", "Env_Navigation");
        this.$router.push(this.return_header_firstMenu("Env_Navigation"));
      }
    },
    user_icon_click() {
      this.$confirm("是否退出登录？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (localStorage.getItem("token")) {
            localStorage.removeItem("token");
          }
          if (localStorage.getItem("usericon")) {
            localStorage.removeItem("usericon");
          }
          if (localStorage.getItem("nickname")) {
            localStorage.removeItem("nickname");
          }
          if (localStorage.getItem("username")) {
            localStorage.removeItem("username");
          }
          if (localStorage.getItem("password")) {
            localStorage.removeItem("password");
          }
          if (localStorage.getItem("userKey")) {
            localStorage.removeItem("userKey");
          }
          if (localStorage.getItem("activeName")) {
            localStorage.removeItem("activeName");
          }
          if (sessionStorage.getItem("auth")) {
            sessionStorage.removeItem("auth");
          }
          if (sessionStorage.getItem("button")) {
            sessionStorage.removeItem("button");
          }
          store.commit({
            type: "setmenuData",
            data: [],
          });
          store.commit({
            type: "setbuttonData",
            data: [],
          });

          this.$router.push("/login"); //页面跳转
          this.$message({
            type: "success",
            message: "退出登录!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    home_click() {
      this.$router.push("Home");
    },
    get_userIcon() {
      if (localStorage.getItem("usericon")) {
        this.usericon = localStorage.getItem("usericon");
      }
    },
    init_base_route() {
      this.activeName = window.localStorage.getItem("activeName");
      if (this.activeName === "Auto_manage") {
        this.$router.push({ name: 'Home' });
      } else if (this.activeName === "Tapd_Project_home") {
        this.$router.push({ name: this.return_header_firstMenu("Tapd_Project_home") });
      } else if (this.activeName === "test_tool") {
        this.$router.push({ name: this.return_header_firstMenu("test_tool") });
      } else if (this.activeName === "Env_Navigation") {
        this.$router.push({ name: this.return_header_firstMenu("Env_Navigation") });
      }
    },
    //默认页面取对应权限下的第一个页面的name，所以必须要配置
    return_header_firstMenu(headerName) {
      for (let i = 0; i < this.headerMenu.length; i++) {
        if (this.headerMenu[i].name == headerName) {
          if (
            this.headerMenu[i].children &&
            this.headerMenu[i].children.length != 0
          ) {
            try {
              return this.headerMenu[i].children[0].children[0].name;
            } catch {
              return "Home";
            }
          } else {
            return "Home";
          }
        }
      }
    },
  },
  created() {
    this.get_userIcon();
    this.init_base_route();
  },
};
</script>

<style scoped>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.bg-purple {
  background: #d3dce6;
}
.user_icon {
  width: 50px;
  border-radius: 50%;
  margin-top: 5px;
  position: static;
  float: right;
  height: 50px;
}

::v-deep .el-tabs__item {
  color: #ffffff;
}

.welcomn {
  color: white;
  position: fixed;
  right: 0.5%;
  letter-spacing: 5px;
  float: right;
}
</style>