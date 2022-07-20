<template>
  <div>
    <div>
      <div>
        <Breadcrumb/>
      </div>
    </div>
    <div style="float: left; width: 100%; line-height: 60px">
      <div style="width: 100%">
        <div style="float: left; margin-left: 10px">
          <a style="font-size: 13px">项目名称</a>
          <el-select v-model="list_page_body.project_id" clearable filterable placeholder="请选择项目名称"
                     style="width: 150px; margin-left: 10px">
            <el-option
                v-for="item in project"
                :key="item.id"
                :label="item.project_name"
                :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div style="float: left; margin-left: 10px">
          <a style="font-size: 13px">所属环境</a>
          <el-select v-model="list_page_body.env" placeholder="请选择所属环境" clearable filterable
                     style="width: 150px; margin-left: 10px">
            <el-option
                v-for="item in env"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
          </el-select>
        </div>

        <div style="float: left; margin-left: 10px">
          <a style="font-size: 13px">手机号码</a>
          <el-input
              placeholder="请输入手机号码"
              v-model="list_page_body.account"
              style="width: 150px; margin-left: 10px"
              class="case_input"
          ></el-input>
        </div>

        <div style="float: left; margin-left: 10px">
          <a style="font-size: 13px">账号描述</a>
          <el-input
              placeholder="请输入手机号码"
              v-model="list_page_body.account_name"
              style="width: 150px; margin-left: 10px"
              class="case_input"
          ></el-input>
        </div>

        <div style="float: left; margin-left: 10px">
          <a style="font-size: 13px">最后修改人</a>
          <el-input
              placeholder="请输入最后修改人"
              v-model="list_page_body.creator"
              style="width: 150px; margin-left: 10px"
              class="case_input"
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
                  v-has="{class:'100'}"
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
              style="font-size: 13px;margin-left: 1%;border-radius: 5px;"
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
                label="账号描述"
                prop="account_name"
                align="center"
                width="200"

            >
            </el-table-column>

            <el-table-column
                :formatter="get_project_name"
                prop="project_id"
                label="所属项目"
                align="center"
                width="200"
            >
            </el-table-column>
            <el-table-column
                :formatter="get_env_name"
                prop="env"
                label="所属环境"
                align="center"
                width="200"
            >
            </el-table-column>
            <el-table-column
                prop="account"
                label="手机号码"
                align="center"
                width="200"
            >
            </el-table-column>
            <el-table-column
                prop="cookie"
                label="cookie"
                align="center"
                width="300"
            >
            </el-table-column>
            <el-table-column
                prop="creator"
                label="最后修改人"
                align="center"
                width="200"
            >
            </el-table-column>
            <el-table-column
                prop="create_time"
                label="最后编辑时间"
                align="center"
                width="250"
            >
            </el-table-column>
            <el-table-column
                style="background-color: #ffffff"
                fixed="right"
                label="操作"
                width="250"
                align="center"
            >
              <template slot-scope="scope">
                <el-button
                    @click="putAccount(scope.row)"
                    type="text"
                    size="small"
                    v-has="{class:'101'}"
                >编辑
                </el-button
                >
                <el-button
                    @click="delAccount(scope.row)"
                    type="text"
                    size="small"
                    v-has="{class:'102'}"
                >删除
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
          <el-form-item label="账号描述" prop="account_name">
            <el-input
                v-model="Form.account_name"
                placeholder="请输入账号描述"
            ></el-input>
          </el-form-item>
          <el-form-item label="项目名称" prop="project_id">
            <el-select v-model="Form.project_id" clearable filterable style="width: 150px;">
              <el-option
                  v-for="item in project"
                  :key="item.id"
                  :label="item.project_name"
                  :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属环境" prop="env">
            <el-select v-model="Form.env" clearable filterable style="width: 150px;">
              <el-option
                  v-for="item in env"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="登录账号" prop="account">
            <el-input
                v-model="Form.account"
                placeholder="请输入登录账号"
            ></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
            <el-input
                v-model="Form.password"
                placeholder="请输入登录密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="默认租户" prop="tenantId">
            <el-select
                v-model="Form.tenantId"
                clearable filterable
                placeholder="请选择租户"
                style="width: 150px;"
                @focus="update_tenantList('Form')"
            >
              <el-option
                  v-for="item in tenant"
                  :key="item.tenantId"
                  :label="item.tenantName"
                  :value="item.tenantId"
              ></el-option>
            </el-select>
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
      //分页请求数据
      list_page_body: {
        page: 1,
        limit: 20,
      },
      env: [
        {
          value: "daily",
          label: "联调环境",
        },
        {
          value: "nextop-pre",
          label: "预发环境",
        },
        {
          value: "nextop-prod",
          label: "生产环境",
        }
      ],
      Form: {
        type: 1
      },
      rules: {
        project_id: [{required: true, message: "请选择项目", trigger: "blur"}],
        account_name: [{required: true, message: "请输入账号名称", trigger: "blur"}],
        env: [{required: true, message: "请选择所属环境", trigger: "blur"}],
        account: [{required: true, message: "请输入登录账号", trigger: "blur"}],
        password: [{required: true, message: "请输入登录密码", trigger: "blur"}],
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
          .post("/api/test_management/AccountList", this.list_page_body)
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
      this.title = "新增账号";
      this.addAccountdialog = true;
      this.Form = {}
      this.tenant = []
    },
    //编辑项目
    putAccount(raw) {
      if (this.$refs.Form) {
        this.$refs.Form.clearValidate();
      }
      this.title = "编辑账号";
      this.tenant = raw.tenant;
      this.Form = JSON.parse(JSON.stringify(raw));
      this.addAccountdialog = true;
    },
    update_tenantList(Form) {
      this.$refs[Form].validate((valid) => {
        if (valid) {
          this.tenant = []
          axios
              .post("/api/test_management/checkAccount", this.Form)
              .then((res) => {
                //api接口判断为code=10000成功
                if (res.data["code"] === 10000) {
                  this.Form.tenant = this.tenant = res.data.data
                  this.Form.cookie = res.data.cookie
                  this.$message({
                    duration: 2000,
                    message: res.data.msg,
                    type: "success",
                  });
                } else {
                  //失败提示
                  this.$message.error(res.data.msg);
                }
              })

        } else {
          return false
        }
      })
    },
    creOrupAccount(Form) {
      this.$refs[Form].validate((valid) => {
        if (valid) {
          if (this.title == '新增账号') {
            axios
                .post("/api/test_management/createAccount", this.Form)
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
                .post("/api/test_management/updateAccount", this.Form)
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
    delAccount(row) {
      axios
          .post("/api/test_management/deleteAccount", {id: row.id})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.$message({
                duration: 2000,
                message: res.data.msg,
                type: "success",
              });
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
    },
    get_project() {
      axios
          .post("/api/test_management/proList", this.list_page_body)
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.project = res.data.items
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
    },
    get_project_name(raw) {
      let val = null;
      this.project.forEach((item) => {
        if (raw.project_id == item.id) {
          val = item.project_name
        }
      })
      return val
    },
    get_env_name(raw) {
      let val = null;
      this.env.forEach((item) => {
        console.log(item, raw)
        if (raw.env == item.value) {
          val = item.label
        }
      })
      return val
    },

  },

  //页面初始化渲染
  created() {
    this.initVue();
    this.getList();
    this.get_project();
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