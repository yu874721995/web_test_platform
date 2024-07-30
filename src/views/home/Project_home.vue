<template>
  <div>
    <div>
      <div>
        <Breadcrumb/>
      </div>
    </div>
    <div style="float: right; margin-right: 10px">
      <div
          style="
          width: 100px;
          float: right;
          margin-top: 10px;
          height: 40px;
          text-align: center;
        "
      >
          <el-button
              type="primary"
              style="background-color: #3573fe"
              @click="addproject"
              v-has="{class:'43'}"
          >新增
          </el-button>
      </div>
    </div>

    <!--表格start-->
    <div>
      <div
          style="margin-top: 10px; float: left; width: 98%; text-align: center"
      >
        <template>
          <el-table
              class="project_table"
              :data="project_data"
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
            <el-table-column
                prop="project_name"
                label="项目名称"
                align="center"
                width="150"
            >
            </el-table-column>
            <el-table-column
                prop="host"
                label="项目标识"
                align="center"
                width="150"
            >
            </el-table-column>
            <el-table-column
                prop="remark"
                label="项目描述"
                align="center"
                width="150"
            >
            </el-table-column>
            <el-table-column
                prop="interFaceNum"
                label="接口数量"
                align="center"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="caseNum"
                label="用例数量"
                align="center"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="isNum"
                :formatter="isNum_format"
                label="接口覆盖率"
                align="center"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="principal_name"
                label="项目负责人"
                align="center"
                width="400"
            >
            </el-table-column>
            <el-table-column
                prop="creator"
                label="添加人"
                align="center"
                width="150"
            >
            </el-table-column>
            <el-table-column
                prop="create_time"
                label="添加时间"
                align="center"
                width="250"
            >
            </el-table-column>
            <el-table-column
                style="background-color: #ffffff"
                fixed="right"
                label="操作"
                width="150"
                align="center"
            >
              <template slot-scope="scope">
                <el-button
                    @click="putproject(scope.row)"
                    type="text"
                    size="small"
                    v-has="{class:'45'}"
                >编辑
                </el-button
                >
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
    <div>
      <el-dialog :visible.sync="addprojectdialog" show-footer
                 style="height: 600px;margin-top: 100px;"
                 :close-on-press-escape="false"
                 :close-on-click-modal="false">
        <span slot="title" style="font-size: 20px">{{ title }}</span>
        <el-form
            ref="Form"
            :model="Form"
            label-width="auto"
            :rules="rules"
            :inline-message="true"
            :status-icon="true"
        >
          <el-form-item label="项目名称" prop="project_name">
            <el-input
                v-model="Form.project_name"
                placeholder="请输入项目名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="标识" prop="host">
            <el-input
                v-model="Form.host"
                placeholder="请输入标识"
            ></el-input>
          </el-form-item>
          <el-form-item label="项目描述" prop="remark">
            <el-input
                v-model="Form.remark"
                placeholder="请输入项目描述"
            ></el-input>
          </el-form-item>
          <el-form-item label="项目负责人" prop="principal_code">
            <el-select v-model="Form.principal_code" clearable filterable style="width: 150px;">
              <el-option
                  v-for="item in dingUser_list"
                  :key="item.id"
                  :label="item.principal_name"
                  :value="item.principal_code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="creOrupPro('Form')">确定</el-button>
            <el-button @click="addprojectdialog=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";

import axios from "axios";

export default {
  //引入面包屑
  components: {Breadcrumb},
  data() {
    return {
      //分页请求数据
      pageSC: {
        page: 1,
        limit: 20,
      },
      Form: {
        type: 1
      },
      //是否有数据
      dingUser_list:[],
      is_data: false,
      //新增项目的显示
      addprojectdialog: false,
      //表格
      project_data: [],
      //总条数
      total: 0,
      title: '新增项目',
      rules: {
        project_name: [{required: true, message: "请填写项目名称", trigger: "blur"}],
        host: [{required: true, message: "请填写项目标识", trigger: "blur"}],
      },
    };
  },
  methods: {
    //初始化表格分页数据
    initVue() {
      this.pageSC.page = 1;
      this.pageSC.limit = 20;
    },
    //列表数据请求
    getList() {
      //通过pageSC做查询
      axios
          .post("/api/test_management/proManageList", this.pageSC)
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.project_data = res.data["items"];
              this.total = res.data["totalNum"];
              this.is_data = true;
            } else {
              //失败提示
              this.is_data = false;
              this.$message.error(res.data.msg);
            }
          })
          .catch((error) => {
            this.is_data = false;
            console.log(error); //  错误处理 相当于error
            this.$message.error("服务器错误,请联系测试人员");
          });
    },
    //项目负责人下拉框数据
    get_dingUser_list() {
      axios
          .post("/api/test_management/dingUserlist", {})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.dingUser_list = res.data["data"];
              this.principal_name = this.dingUser_list.principal_name;
            }
          })
          .catch(() => {
            this.is_data = false;
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
    //新增项目
    addproject() {
      if (this.$refs.Form) {
        this.$refs.Form.clearValidate();
      }
      this.title = "新增项目";
      this.Form = {
        "type": 1
      };
      delete this.Form.principal_name;
      this.addprojectdialog = true;
    },
    //编辑项目
    putproject(raw) {
      if (this.$refs.Form) {
        this.$refs.Form.clearValidate();
      }
      this.title = "编辑项目";
      this.Form = JSON.parse(JSON.stringify(raw));
      this.Form.type = 2;
      delete this.Form.principal_name;
      this.addprojectdialog = true;
    },
    isNum_format(raw){
      return String(raw.isNum) + '%'
    },
    creOrupPro(Form) {
      this.$refs[Form].validate((valid) => {
        if (valid) {
          axios
              .post("/api/test_management/createPro", this.Form)
              .then((res) => {
                //api接口判断为code=10000成功
                if (res.data["code"] === 10000) {
                  this.$message({
                    duration: 2000,
                    message: res.data.msg,
                    type: "success",
                  });
                  this.addprojectdialog = false;
                  this.getList();
                } else {
                  //失败提示
                  this.$message.error(res.data.msg);
                }
              })
              .catch((error) => {
                this.is_data = false;
                console.log(error); //  错误处理 相当于error
                this.$message.error("服务器错误,请联系测试人员");
              });
        } else {
          return false
        }
      })
    },
    get_principal_name(raw){
      let val = null;
      this.dingUser_list.forEach((item)=>{
        if(raw.principal_code === item.principal_code){
          val = item.principal_code
        }
      })
      return val
    },
  },
  //页面初始化渲染
  created() {
    this.initVue();
    this.getList();
    this.get_dingUser_list();
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
