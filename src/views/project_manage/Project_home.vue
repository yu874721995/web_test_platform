<template>
  <div>
    <div>
      <div>
        <Breadcrumb />
      </div>
    </div>

    <!--表格start-->
    <div>
      <div
        style="margin-top: 10px; float: left; width: 98%; text-align: center"
      >
        <template>
          <el-table
            :data="project_data"
            v-loading="isLoading"
            style="font-size: 13px;left: 1%;border-radius: 5px;"
            :header-cell-style="{ background: '#E7EAED' }"
            height="650"
            width="98%"
            :row-style="{ height: '40px' }"
            :cell-style="{ padding: '0px' }"
            :highlight-current-row="true"
            :stripe="true"
            :border="true"
            type="selection"
          >
            <el-table-column prop="id" label="项目ID"  align="left">
            </el-table-column>
            <el-table-column prop="project_name" label="项目名称"  align="left">
            </el-table-column>
            <el-table-column style="background-color: #ffffff" fixed="right" label="操作" width="250" align="center">
              <template slot-scope="scope">
                <el-button @click="init_project(scope.row)" type="text" size="small" v-has="{class:'75'}">初始化</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <!--表格end-->

      <!--分页start-->
      <div>
        <el-pagination
          v-on:size-change="handleSizeChange"
          v-on:current-change="handleCurrentChange"
          :current-page="pageSC.page"
          :page-sizes="[20, 50, 100]"
          :page-size="20"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="float: right; margin-top: 10px; margin-right: 20px"
        ></el-pagination>
      </div>
      <!--分页end-->
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import axios from "axios";

export default {
  //引入面包屑
  components: { Breadcrumb },
  data() {
    return {
      //分页请求数据
      pageSC: {
        page: 1,
        limit: 20,
      },
      //是否刷新
      isLoading: false,
      //是否有数据
      is_data: false,
      //表格
      project_data: [],
      //总条数
      total: 0,
      dialogFormVisible: false,
    };
  },
  methods: {
    //列表数据请求
    init_project(raw){
      console.log(raw)
      axios
        .post("/api/test_management/tapd_project_init",{tapd_project_id:raw.id})
        .then((res) => {
          //api接口判断为code=10000成功
          if (res.data["code"] === 10000) {
                    this.$message({
                    duration: 2000,
                    message: res.data.msg,
                    type: "success",
                  });
          } else {
            //失败提示
            this.is_data = false;
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          this.is_data = false;
          this.isLoading = false;
          console.log(error); //  错误处理 相当于error
          this.$message.error("服务器错误,请联系测试人员");
        });
    },
    getList() {
      //是否刷新
      this.isLoading = true;
      //通过pageSC做查询
      axios
        .post("/api/test_management/prolist", this.pageSC)
        .then((res) => {
          this.isLoading = false;
          //api接口判断为code=10000成功
          if (res.data["code"] === 10000) {
            this.project_data = res.data.data;
            this.total = res.data["count"];
            this.is_data = true;
          } else {
            //失败提示
            this.is_data = false;
            this.$message.error("查询失败，请联系人员");
          }
        })
        .catch((error) => {
          this.is_data = false;
          this.isLoading = false;
          console.log(error); //  错误处理 相当于error
          this.$message.error("服务器错误,请联系测试人员");
        });
    },
    //页量切换
    handleSizeChange(val) {
      this.pageSC.limit = val;
      this.getList();
    },
    //页码切换
    handleCurrentChange(val) {
      this.pageSC.page = val;
      this.getList();
    },
    //编辑弹框
    handleClick(row) {
      this.dialogFormVisible = true;
      console.log(row.id, row.project_name);
    },
  },
  //页面初始化渲染
  created() {
    this.getList();
  },
};
</script>

<style scoped>
/*表格宽度及滚动条固定*/
.project_table_div {
  overflow-y: auto;
}

.project_table {
  /* 这一步是必须的 */
  min-width: 800px;
  overflow: hidden;
}
</style>