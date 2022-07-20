<template>
  <div>
    <div>
      <div>
        <Breadcrumb/>
      </div>
    </div>
    <div style="float: left; width: 100%; line-height: 60px">
      <div style="width: 100%">

        <div style="float: left; margin-left: 1%">
          <a style="font-size: 13px">配置名称</a>
          <el-input
              placeholder="请输入配置名称"
              v-model="list_page_body.name"
              style="width: 150px; margin-left: 10px"
              class="case_input"
              clearable
          ></el-input>
        </div>

        <div style="float: left; padding-left: 5px">
          <!-- <div style="width: 100px;float: right;margin-top: 10px;height: 40px;text-align: center;"> -->
          <!-- <el-row> -->
          <el-button
              plain
              icon="el-icon-search"
              @click="handleCurrentChange(1)"
          >查询
          </el-button>
          <!-- </el-row> -->
          <!-- </div> -->
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
            <el-row>
              <el-button
                  type="primary"
                  style="background-color: #3573fe"
                  @click="addAccount"
                  v-has="{class:'84'}"
              >新增
              </el-button>
            </el-row>
          </div>
        </div>
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
                label="配置名称"
                prop="name"
                align="center"
                width="300"

            >
            </el-table-column>

            <el-table-column
                prop="ext"
                label="配置内容"
                align="center"
                width="800"
            >
            </el-table-column>
            <el-table-column
                prop="remark"
                label="配置描述"
                align="center"
                width="600"
            >
            </el-table-column>
            <el-table-column
                style="background-color: #ffffff"
                fixed="right"
                label="操作"
                width="100"
                align="center"
            >
              <template slot-scope="scope">
                <el-button
                    @click="putAccount(scope.row)"
                    type="text"
                    size="small"
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
            :current-page="list_page_body.page"
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
      <el-dialog :visible.sync="addAccountdialog" show-footer
                 :close-on-press-escape="false"
                 :close-on-click-modal="false"
                  style="height: 700px;margin-top: 100px;">
        <span slot="title" style="font-size: 20px">{{ title }}</span>
        <el-form
            ref="Form"
            :model="Form"
            label-width="auto"
            :rules="rules"
            :inline-message="true"
            :status-icon="true"
        >
          <el-form-item label="配置名称" prop="account_name">
            <el-input
                v-model="Form.name"
                placeholder="请输入配置名称"
                :validate-event="false"
                @input="
                    Form.name = Form.name.replace(/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g,'')"
            ></el-input>
          </el-form-item>
          <el-form-item label="配置内容" prop="account_name">
            <el-input
                v-model="Form.ext"
                placeholder="请输入配置内容"
            ></el-input>
          </el-form-item>
          <el-form-item label="配置说明" prop="account_name">
            <el-input
                v-model="Form.remark"
                placeholder="请输入配置说明"
            ></el-input>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="creOrupAccount('Form')">确定</el-button>
            <el-button @click="addAccountdialog=false">取消</el-button>
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
      buttonAuth:JSON.parse(window.sessionStorage.getItem('button')),
      //分页请求数据
      list_page_body: {
        page: 1,
        limit: 20,
      },
      Form: {
        type: 1
      },
      rules: {
        name: [{required: true, message: "请输入配置名称", trigger: "blur"}],
        ext: [{required: true, message: "请输入配置内容", trigger: "blur"}],
      },
      //是否有数据
      is_data: false,
      //新增项目的显示
      addAccountdialog: false,
      addTenantdialog: false,
      //表格
      project_data: [],
      tenant: [],
      project: [],
      //总条数
      total: 0,
      title: '新增账号',
    };
  },
  methods: {
    //初始化表格分页数据
    initVue() {
      this.list_page_body.page = 1;
      this.list_page_body.limit = 20;
    },
    //列表数据请求
    getList() {
      axios
          .post("/api/test_management/ConfPage", this.list_page_body)
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.project_data = res.data["items"];
              this.total = res.data["count"];
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
    //页量切换
    handleSizeChange(val) {
      this.list_page_body.limit = val;
      this.getList();
    },
    //页码切换
    handleCurrentChange(val) {
      this.list_page_body.page = val;
      this.getList();
    },
    //新增项目
    addAccount() {
      if (this.$refs.Form) {
        this.$refs.Form.clearValidate();
      }
      this.title = "新增配置";
      this.addAccountdialog = true;
      this.Form = {}
      this.tenant = []
    },
    //编辑项目
    putAccount(raw) {
      if (this.$refs.Form) {
        this.$refs.Form.clearValidate();
      }
      this.title = "编辑配置";
      this.tenant = raw.tenant;
      this.Form = JSON.parse(JSON.stringify(raw));
      this.addAccountdialog = true;
    },
    creOrupAccount(Form) {
      this.$refs[Form].validate((valid) => {
        if (valid) {
          if (this.title == '新增配置') {
            axios
                .post("/api/test_management/CreateConf", this.Form)
                .then((res) => {
                  //api接口判断为code=10000成功
                  if (res.data["code"] === 10000) {
                    this.$message({
                      duration: 2000,
                      message: res.data.msg,
                      type: "success",
                    });
                    this.addAccountdialog = false;
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
            axios
                .post("/api/test_management/CreateConf", this.Form)
                .then((res) => {
                  //api接口判断为code=10000成功
                  if (res.data["code"] === 10000) {
                    this.$message({
                      duration: 2000,
                      message: res.data.msg,
                      type: "success",
                    });
                    this.addAccountdialog = false;
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
          }
        } else {
          return false
        }
      })
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