<template>
  <el-aside width="200px" style="height: 800px">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      router
      style="height: 800px"
    >
      <!--无子集下拉-->
      <el-menu-item index="/home" style="text-align: left">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <template v-for="(pItem, pIndex) in menuList">
        <el-submenu v-if="!pItem.url" :index="pIndex + ''" :key="pIndex">
          <template slot="title">
            <span>{{ pItem.title }}</span>
          </template>

          <el-menu-item
            :index="child.path"
            v-for="(child, cIndex) in pItem.children"
            :key="cIndex"
            @click="enterOperate(child.url, child.menuId)"
            style="padding-left: 55px"
          >
            {{ child.title }}
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
    };
  },
  methods: {
  },
  computed: {
    ...mapGetters(["menuData"]),
    menuList() {
      // console.log(this.menuData)
      const obj = this.menuData.find((item) => item.title === "接口自动化");
      return obj.children;
    },
  },
  //页面初始化渲染
  created() {
  },
};
</script>