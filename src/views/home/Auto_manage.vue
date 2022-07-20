<template>
  <div id="home">
    <div class="box " style="display: flex; padding-left: 0">
      <el-container>
        <!--顶部导航栏-->
        <el-header>
          <Headers/>
        </el-header>
        <!--左侧导航栏-->
        <el-container>
          <NavLeftMenu/>
          <el-main >
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import NavLeftMenu from "@/views/home/Auto_menu";
import Headers from "@/components/Headers";

export default {
  components: {Headers, NavLeftMenu},
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style>
.el-header {
  background-color: #062E7E;
  color: #333;
  text-align: center;
  line-height: 60px;
}

#home_logo_div {
  float: left;
  margin-top: 7px;
}

#user_icon_div {
  float: right;
  margin-top: 2px;
  margin-right: -18px;
}

#header_menu_div {
  float: left;
  margin-left: 100px;
  margin-top: 2px;
}


.el-main {
  flex: 1;
  background-color: #fff;
  padding-bottom: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin:0;
  height: 100%;
  padding: 0 !important;
}
</style>