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

                v-for="item in envs"
                :key="item.id"
                :label="item.env_name"
                :value="item.id"
            ></el-option>
          </el-select>
        </div>

        <div style="float: left; margin-left: 10px">

          <a style="font-size: 13px">账号描述</a>
          <el-input
              placeholder="请输入账号描述"
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
                  v-has="{class:'56'}"
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

                :formatter="get_login_env"
                prop="config_id"
                label="使用配置"

                align="center"
                width="200"
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
                    v-has="{class:'57'}"
                >编辑
                </el-button
                >
                <el-button
                    @click="delAccount(scope.row)"
                    type="text"
                    size="small"
                    v-has="{class:'58'}"
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
                  v-for="item in envs"
                  :key="item.id"
                  :label="item.env_name"
                  :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="使用配置" prop="config_id">
            <el-select v-model="Form.config_id" @change = "changeEvent" clearable filterable style="width: 150px;">
              <el-option
                  v-for="item in loginEnvList"
                  :key="item.id"
                  :label="item.remark"
                  :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            v-for="(domain) in Form.domains"
            :label="domain.key"
            :key = "domain.key"
            :prop="domain.key"
          ><el-input v-model="domain.value" @input="changeValue"></el-input>
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

      Form: {
        type: 1,
        config_json:[],
        domains:[],
        creator:localStorage.getItem('username')
      },
      rules: {
        project_id: [{required: true, message: "请选择项目", trigger: "blur"}],
        account_name: [{required: true, message: "请输入账号名称", trigger: "blur"}],
        env: [{required: true, message: "请选择所属环境", trigger: "blur"}],

        config_id: [{required: true, message: "请选择登录配置", trigger: "blur"}],
      },
      //是否有数据
      is_data: false,
      //新增项目的显示
      addAccountdialog: false,
      addTenantdialog: false,
      //表格
      project_data: [],
      tenant: [],

      req_config_json:{},
      project: [],
      loginEnvList:[],
      login_data:null,
      envs:[],
      domain:[],
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
      this.Form={
        type: 1,
        config_json:{},
        domains:[],
        creator:localStorage.getItem('username')
      },
      this.tenant = []
    },
    //编辑账号
    putAccount(raw) {
      if (this.$refs.Form) {
        this.$refs.Form.clearValidate();
      }
      this.title = "编辑账号";
      this.Form = JSON.parse(JSON.stringify(raw));
      this.Form.domains = []
      var dict = eval('(' + raw.body.replace(/None/g,'null').replace(/False/g,'false') + ')');
      for(var key in dict){
        this.Form.domains.push({
          'key':key,'value':dict[key]
        })
      }
      this.req_config_json = eval('(' + raw.config_json.replace(/None/g,'null').replace(/False/g,'false') + ')');
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
            var dict = {}
            this.Form.domains.forEach((item)=>{
              dict[item.key] = item.value
            })
            this.req_config_json.login_body = dict
            this.Form.config_json = this.req_config_json
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
    get_login_config(){
      axios
          .post("/api/test_management/loginEnvList", this.list_page_body)
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.loginEnvList = res.data.items
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
    get_login_env(raw){
      let val = null;
      this.loginEnvList.forEach((item) => {
        if (raw.config_id == item.id) {
          val = item.remark
        }
      })
      return val
    },
    get_env(){
      axios
          .post("/api/test_management/envlist", {limit:1000,page:1})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.envs = res.data.items
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
    get_env_name(raw) {
      let val = null;
      this.envs.forEach((item) => {
        if (raw.env == item.id) {
          val = item.env_name
        }
      })
      return val
    },
    changeEvent(val){
      this.Form.domains = [];
      this.loginEnvList.forEach((item)=>{
        if(item.id == val){
          this.login_data =  JSON.parse(item.ext).login_body
          this.req_config_json = JSON.parse(item.ext)
        }
      })
      for(var key in this.login_data){
          this.Form.domains.push({
            'value':this.login_data[key],
            'key':key
          })
      }
    },
    changeValue () {
      this.$forceUpdate()
    }

  },

  //页面初始化渲染
  created() {
    this.initVue();
    this.getList();
    this.get_project();

    this.get_env();
    this.get_login_config();
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