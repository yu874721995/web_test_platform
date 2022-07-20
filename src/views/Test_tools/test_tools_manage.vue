<template>
  <div id="test_tools_manage">
    <div class="test_tools_manage_div">
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
import NavLeftMenu from "@/views/Test_tools/test_tools_menu.vue";
import Headers from "@/components/Headers";

export default {
  components: {Headers,NavLeftMenu},
  data() {
    return {
    }
  },
  methods: {

  },
  created(){
  }
}
</script>

<style scoped>
.el-main {
  background-color: #FFFFFF;
  color: #333;
  text-align: center;
  line-height: 20px !important;
}
</style>