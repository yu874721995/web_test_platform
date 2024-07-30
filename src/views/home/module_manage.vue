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
          <a style="font-size: 13px">项目名称:</a>
          <el-select
              v-model="list_page_body.project_id"
              clearable filterable
              placeholder="请选择项目名称"
              style="width: 150px; margin-left: 10px"
          >
            <el-option
                v-for="item in project"
                :key="item.id"
                :label="item.project_name"
                :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div style="float: left; margin-left: 10px">
          <a style="font-size: 13px">模块名称:</a>
          <el-input
              placeholder="请输入模块名称"
              v-model="list_page_body.module_name"
              style="width: 150px; margin-left: 10px"
              class="case_input"
          ></el-input>
        </div>
        <div style="float: left; margin-left: 10px">
          <a style="font-size: 13px">负责人:</a>
          <el-select v-model="list_page_body.master" clearable filterable
                     style="width: 150px; margin-left: 10px"
          >
            <el-option
                v-for="item in mail_list"
                :key="item.id"
                :label="item.ding_name"
                :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div style="float: left; padding-left: 5px">
          <!-- <div style="width: 100px;float: right;margin-top: 10px;height: 40px;text-align: center;"> -->
          <!-- <el-row> -->
          <el-button plain icon="el-icon-search" @click="handleCurrentChange(1)"
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
                  @click="addAccount(1)"
                  v-has="{class:'59'}"
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
              row-key="id"
              lazy
              :load="table_load"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            >
            <el-table-column
                :formatter="get_project_name"
                prop="project_id"
                label="所属项目"
                align="left"
                width="250"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                label="模块名称"
                align="center"
                width="200"
            >
            </el-table-column>
            <el-table-column
                prop="server_env"
                label="服务名称"
                align="center"
                width="200"
            >
            </el-table-column>
            <el-table-column
                :formatter="get_dingding_woman_master"
                prop="master"
                label="模块负责人"
                align="center"
                width="200"
            >
            </el-table-column>
            <el-table-column
                :formatter="get_dingding_woman_dev_master"
                prop="dev_master"
                label="模块开发负责人"
                align="center"
                width="200"
            >
            </el-table-column>
            <el-table-column
                :formatter="module_type"
                prop="type"
                label="模块分类"
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
                    v-if="scope.row.type == 1 || scope.row.type == 2"
                    @click="addAccount(scope.row.type + 1, scope.row)"
                    type="text"
                    size="small"
                    v-has="{class:'60'}"
                >增加下级分类
                </el-button
                >
                <el-button
                    @click="putAccount(scope.row)"
                    type="text"
                    size="small"
                    v-has="{class:'61'}"
                >编辑
                </el-button
                >
                <el-button
                    @click="delAccount(scope.row,1)"
                    type="text"
                    size="small"
                    style="color:red"
                    v-if="scope.row.status==1"
                    v-has="{class:'62'}"
                >禁用
                </el-button
                >
                <el-button
                    @click="delAccount(scope.row,2)"
                    type="text"
                    size="small"
                    v-if="scope.row.status==2"
                >启用
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
            :page-sizes="[10, 20,50, 100]"
            :page-size="10"
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
      style="margin-top: 100px;height: 600px;">
        <span slot="title" style="font-size: 20px">{{ title }}</span>
        <el-form
            ref="Form"
            :model="Form"
            label-width="auto"
            :rules="rules"
            :inline-message="true"
            :status-icon="true"
        >
          <el-form-item label="所属项目" prop="project_id">
            <el-select
                v-model="Form.project_id"
                clearable filterable
                :disabled="isdisabled"
                style="width: 150px;"
            >
              <el-option
                  v-for="item in project"
                  :key="item.id"
                  :label="item.project_name"
                  :value="item.id"
              ></el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="模块名称" prop="name">
            <el-input
                v-model="Form.name"
                placeholder="请输入模块名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="服务名称" prop="server_env" v-if="envShow">
            <el-input
                v-model="Form.server_env"
                placeholder="请输入服务名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="上级模块" prop="up_id" v-if="upShow">
            <el-select
                v-model="Form.up_id"
                :disabled="up_isdisabled"
                clearable filterable
                style="width: 150px; margin-left: 10px"
            >
              <el-option
                  v-for="item in form_module_data"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
              label="测试负责人"
              prop="master"
          >
            <el-select v-model="Form.master" clearable filterable>
              <el-option
                  v-for="item in mail_list"
                  :key="item.id"
                  :label="item.ding_name"
                  :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
              label="开发负责人"
              prop="dev_master"
          >
            <el-select v-model="Form.dev_master" clearable filterable>
              <el-option
                  v-for="item in mail_list"
                  :key="item.id"
                  :label="item.ding_name"
                  :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="creOrupAccount('Form')">确定</el-button>
            <el-button @click="addAccountdialog = false">取消</el-button>
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
        type: 1
      },
      rules: {
        project_id: [{required: true, message: "请选择项目", trigger: "blur"}],
        name: [{required: true, message: "请输入模块名称", trigger: "blur"}],
      },
      envShow: true,
      upShow: false,
      up_isdisabled: false,
      //是否有数据
      is_data: false,
      mail_list: [],
      //新增项目的显示
      addAccountdialog: false,
      allData: [],
      //表格
      project_data: [],
      form_module_data:[],
      project: [],
      //总条数
      total: 0,
      title: '新增模块',
      isdisabled: false
    };
  },
  methods: {
    //初始化表格分页数据
    initVue() {
      this.list_page_body.page = 1;
      this.list_page_body.limit = 20;
    },
    table_load(tree, treeNode, resolve) {
      console.log(tree, treeNode)
      console.log(treeNode)
      setTimeout(() => {
        resolve(tree.childrens)
      }, 1000)
    },
    setTreeData(list) {
      for (let i = 0; i < list.length; i++) {
        list[i].hasChildren = !!list[i].children?.length
        list[i].childrens = list[i].children
        delete list[i].children
        if (list[i].hasChildren) {
          this.setTreeData(list[i].childrens)
        }
      }
    },
    //列表数据请求
    getList() {
      axios
          .post("/api/test_management/moduleList", this.list_page_body)
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              const allData = res.data.items
              this.setTreeData(allData)
              console.log(allData)
              this.project_data = allData
              console.log(this.project_data)
              this.form_module_data = JSON.parse(JSON.stringify(res.data.items))
              this.form_module_data.forEach((form_data)=>{
                if(form_data.children && form_data.children != []){
                  form_data.children.forEach((two_data)=>{
                    this.form_module_data.push(two_data)
                  })
                }
              })
              this.total = res.data["count"];
              this.is_data = true;
            } else {
              //失败提示
              this.is_data = false;
              this.$message.error(res.data.msg);
            }
          })
          .catch(() => {
            this.is_data = false;
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
    //增加模块
    addAccount(type, raw) {
      if (this.$refs.Form) {
        this.$refs.Form.clearValidate();
      }
      this.Form = {}
      if (type == 1) {
        this.title = "新增模块";
        this.addAccountdialog = true;
        this.Form.type = 1;
        this.isdisabled = false
        this.upShow = false
        this.envShow = true
        this.up_isdisabled = false
      } else if(type == 2){
        this.title = "增加二级模块";
        this.addAccountdialog = true;
        this.Form.type = 2;
        this.Form.project_id = raw.project_id
        this.envShow = true
        this.Form.up_id = raw.id
        this.upShow = true
        this.isdisabled = true
        this.up_isdisabled = true
      }
      else{
        this.title = "增加三级模块";
        this.addAccountdialog = true;
        this.Form.type = 3;
        this.Form.project_id = raw.project_id
        this.envShow = true
        this.Form.up_id = raw.id
        this.upShow = true
        this.isdisabled = true
        this.up_isdisabled = true
      }
    },
    //编辑项目
    putAccount(raw) {
      if (this.$refs.Form) {
        this.$refs.Form.clearValidate();
      }
      this.title = "编辑模块";
      this.Form = JSON.parse(JSON.stringify(raw));
      this.addAccountdialog = true;
      if (raw.type == 1) {
        this.envShow = true
        this.upShow = false
        this.isdisabled = false
      } else if (raw.type == 2) {
        this.envShow = true
        this.upShow = true
        this.isdisabled = true
      }else{
        this.envShow = true
        this.upShow = true
        this.isdisabled = true
      }
    },
    creOrupAccount(Form) {
      console.log(this.Form)
      this.$refs[Form].validate((valid) => {
        if (valid) {
          if (this.title == '新增模块') {
            axios
                .post("/api/test_management/createModule", this.Form)
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
                .catch(() => {
                  this.is_data = false;
                  this.$message.error("服务器错误,请联系测试人员");
                });
          } else if (this.title == '增加二级模块' || this.title == '增加三级模块') {
            axios
                .post("/api/test_management/createModule", this.Form)
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
                .catch(() => {
                  this.is_data = false;
                  this.$message.error("服务器错误,请联系测试人员");
                });
          } else if (this.title == '编辑模块') {
            axios
                .post("/api/test_management/createModule", this.Form)
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
                .catch(() => {
                  this.is_data = false;
                  this.$message.error("服务器错误,请联系测试人员");
                });
          }
        } else {
          return false
        }
      })

    },
    delAccount(row, type) {
      axios
          .post("/api/test_management/typeModule", {id: row.id, type: type})
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
          .catch(() => {
            this.is_data = false;
            this.$message.error("服务器错误,请联系测试人员");
          });
    },
    module_type(raw) {
      let val = null;
      if (raw.type == 1) {
        val = '一级模块'
      } else if(raw.type == 2){
        val = '二级模块'
      }else{
        val = '三级模块'
      }
      return val
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
          .catch(() => {
            this.is_data = false;
            this.$message.error("服务器错误,请联系测试人员");
          });
    },
    get_mail_list() {
      axios.post('/api/test_management/mail_list', {page: 1, limit: 1000}).then((res) => {
        if (res.data.code == 10000) {
          this.mail_list = res.data.items;
        }
      })
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
    get_dingding_woman_master(raw) {
      let val = null;
      this.mail_list.forEach((item) => {
        if (raw.master == item.id) {
          val = item.ding_name
        }
      })
      return val
    },
    get_dingding_woman_dev_master(raw) {
      let val = null;
      this.mail_list.forEach((item) => {
        if (raw.dev_master == item.id) {
          val = item.ding_name
        }
      })
      return val
    },
    get_env_name(raw) {
      let val = null;
      this.env.forEach((item) => {
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
    this.get_mail_list();
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