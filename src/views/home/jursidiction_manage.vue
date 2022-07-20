<template>
  <div>
    <div>
      <div>
        <Breadcrumb/>
      </div>
    </div>
    <div style="float: left; width: 100%; line-height: 60px">
      <div style="width: 100%">
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
                  @click="addJursidiction(1)"
                  v-has="{class:'76'}"
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
              :data="Jurisdiction_data"
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
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
            <el-table-column
                prop="title"
                label="菜单名称"
                align="center"
                width="200"
            >
            </el-table-column>
                          <el-table-column
                prop="id"
                label="权限id"
                align="center"
                width="100"
            >
            </el-table-column>

            <el-table-column
                prop="name"
                label="权限名称"
                align="center"
                width="200"
            >
            </el-table-column>
            <el-table-column
                prop="path"
                label="菜单路径"
                align="center"
                width="200"
            >
            </el-table-column>

            <el-table-column
                :formatter="Jurisdiction_type"
                prop="type"
                label="权限分类"
                align="center"
                width="300"
            >
            </el-table-column>
            <el-table-column
                prop="up_id"
                label="上级权限"
                align="center"
                width="200"
                :formatter="Jurisdiction_name"
            >
            </el-table-column>
            <el-table-column
                prop="created_time"
                label="创建时间"
                align="center"
                width="250"
            >
            </el-table-column>
            <el-table-column
                prop="updated_time"
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
                    v-if="scope.row.level != 4"
                    @click="addJursidiction(2, scope.row)"
                    type="text"
                    size="small"
                    v-has="{class:'78'}"
                >增加下级权限
                </el-button
                >
                <el-button
                    @click="putjurisdiction(scope.row)"
                    type="text"
                    size="small"
                    v-has="{class:'79'}"
                >编辑
                </el-button
                >
                <el-button
                    @click="deljurisdiction(scope.row,1)"
                    type="text"
                    size="small"
                    style="color:red"
                    v-has="{class:'80'}"
                    v-if="scope.row.status==1"
                >删除
                </el-button
                >
                <el-button
                    @click="deljurisdiction(scope.row,2)"
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
      <el-dialog :visible.sync="addJursidictiondialog" show-footer
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
          <el-form-item label="权限名称" prop="name">
            <el-input
                v-model="Form.name"
                placeholder="请输入权限名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="菜单路径" prop="server_env">
            <el-input
                v-model="Form.path"
                placeholder="请输入菜单路径"
            ></el-input>
          </el-form-item>

          <el-form-item label="菜单名称" prop="server_env">
            <el-input
                v-model="Form.title"
                placeholder="请输入菜单名称"
            ></el-input>
          </el-form-item>

          <el-form-item label="上级权限" prop="up_id" v-if="upShow">
            <el-select
                v-model="Form.up_id"
                :disabled="up_isdisabled"
                clearable filterable
                style="width: 150px; margin-left: 10px"
            >
              <el-option
                  v-for="item in all_Jurisdiction_data"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="creOrupjurisdiction('Form')">确定</el-button>
            <el-button @click="addJursidictiondialog = false">取消</el-button>
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
        name: [{required: true, message: "请输入权限名称", trigger: "blur"}],
      },
      envShow: true,
      upShow: false,
      up_isdisabled: false,
      //是否有数据
      is_data: false,
      mail_list: [],
      //新增项目的显示
      addJursidictiondialog: false,
      //表格
      Jurisdiction_data: [],
      all_Jurisdiction_data:[],
      project: [],
      //总条数
      total: 0,
      title: '新增权限',
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
          .post("/api/users/jurisdictionList", this.list_page_body)
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.Jurisdiction_data = res.data["data"];
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
      this.get_all_Jurisdiction_data();
    },
    //页码切换
    handleCurrentChange(val) {
      this.list_page_body.page = val;
      this.getList();
      this.get_all_Jurisdiction_data();
    },
    //新增项目
    addJursidiction(type, raw) {
      let data = {}
      if(raw){data = JSON.parse(JSON.stringify(raw))}
      if (this.$refs.Form) {
        this.$refs.Form.clearValidate();
      }
      this.Form = {}
      if (type == 1) {
        this.title = "新增权限";
        this.addJursidictiondialog = true;
        this.Form.level = 1;
        this.upShow = false
        this.up_isdisabled = false
      } else {
        this.title = "增加下级权限";
        this.addJursidictiondialog = true;
        this.Form.level = data.level+1;
        this.Form.project_id = data.project_id
        this.Form.up_id = data.id
        this.upShow = true
        this.up_isdisabled = true
      }
    },
    //编辑项目
    putjurisdiction(raw) {
      if (this.$refs.Form) {
        this.$refs.Form.clearValidate();
      }
      this.title = "编辑权限";
      this.Form = JSON.parse(JSON.stringify(raw));
      this.addJursidictiondialog = true;
      this.Form.jurisdiction_id = raw.id
      if (raw.level == 1) {
        this.upShow = false
        this.up_isdisabled = false
      } else{
        this.upShow = true
        this.up_isdisabled = true
      }
    },
    creOrupjurisdiction(Form) {
      this.$refs[Form].validate((valid) => {
        if (valid) {
          if (this.title == '新增权限') {
            axios
                .post("/api/users/createjurisdiction", this.Form)
                .then((res) => {
                  //api接口判断为code=10000成功
                  if (res.data["code"] === 10000) {
                    this.$message({
                      duration: 2000,
                      message: res.data.msg,
                      type: "success",
                    });
                    this.addJursidictiondialog = false;
                    this.getList();
                    this.get_all_Jurisdiction_data();
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
          } else if (this.title == '增加下级权限') {
            axios
                .post("/api/users/createjurisdiction", this.Form)
                .then((res) => {
                  //api接口判断为code=10000成功
                  if (res.data["code"] === 10000) {
                    this.$message({
                      duration: 2000,
                      message: res.data.msg,
                      type: "success",
                    });
                    this.addJursidictiondialog = false;
                    this.getList();
                    this.get_all_Jurisdiction_data();
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
          } else if (this.title == '编辑权限') {
            axios
                .post("/api/users/updatajurisdiction", this.Form)
                .then((res) => {
                  //api接口判断为code=10000成功
                  if (res.data["code"] === 10000) {
                    this.$message({
                      duration: 2000,
                      message: res.data.msg,
                      type: "success",
                    });
                    this.addJursidictiondialog = false;
                    this.getList();
                    this.get_all_Jurisdiction_data();
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
    deljurisdiction(row) {
      axios
          .post("/api/users/deletejurisdiction", {jurisdiction_id: row.id})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.$message({
                duration: 2000,
                message: res.data.msg,
                type: "success",
              });
              this.getList();
              this.get_all_Jurisdiction_data();
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
    Jurisdiction_type(raw) {
      let val = null;
      if (raw.level == 1) {
        val = '顶部权限'
      } else if(raw.level == 2) {
        val = 'menu权限'
      }
      else if(raw.level == 3) {
        val = '菜单权限'
      }
      else{
        val = '按钮权限'
      }
      return val
    },
    Jurisdiction_name(raw){
      let val = ''
      this.all_Jurisdiction_data.forEach((item)=>{
        if(item.id == raw.up_id){
          val = item.title
        } 
      })
      return val
    },
    get_all_Jurisdiction_data(){
      axios
          .post("/api/users/jurisdictionAllList", {page:1,limit:1000})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.all_Jurisdiction_data = res.data.data;
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
  },
  //页面初始化渲染
  created() {
    this.getList();
    this.get_all_Jurisdiction_data();
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