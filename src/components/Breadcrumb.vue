<template>
  <el-breadcrumb separator="/" style="width: 100%;height: 50px;box-shadow: 0 2px 6px 0 rgb(15 23 42 / 12%), 0 0.5px 0 0 #e5e7eb;">
    <el-breadcrumb-item v-for="v in lists" :key="v.path" style="line-height: 50px;">{{v.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      lists:[]
    }
  },
  watch:{
    $route(to){
      this.lists = to.matched;
    }
  },
  methods: {},
  mounted() {
    this.lists = this.$route.matched;
  }
}
</script>

<style scoped>
.bread_class{
border:0;
border-bottom: 1px solid #BFBFBF;
margin: 20px auto;
}

.bread_class{
box-shadow:0 0  5px 2px #aaa;
}
</style>