<template>
  <div>
    <div>
      <breadcrumb/>
    </div>
    <div>
      <!--下拉筛选start-->
      <div style="float: left; width: 100%; line-height: 60px">
        <div style="width: 100%">
          <div style="float: left; margin-left: 1%;">
            <a style="font-size: 13px">所属项目</a>
            <el-select
              v-model="list_page_body.project_id"
              clearable filterable
              placeholder="请选择项目"
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
          <div style="float: left; padding-left: 5px">
            <el-button
                plain
                icon="el-icon-search"
                @click="handleCurrentChange(1)"
            >查询
            </el-button
            >
          </div>
        </div>
      </div>
      <!--下拉筛选end-->
      <div style="width: 100px;float: right; margin-right: 10px;text-align: center;">
        <el-button type="primary" size="small" style="background-color: #3573fe" @click="addInterFaceConfig"
        >添加配置
        </el-button>
      </div>

      <!--表格start-->
      <div
          style="margin-top: 10px; float: left; width: 98%; text-align: center"
      >
        <template>
          <el-table
              :data="config_data"
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
          >
            <el-table-column
                prop="id"
                label="编号"
                align="center"
                width="50"
            ></el-table-column>
            <el-table-column
                prop="project_id"
                :formatter="get_project_name"
                label="所属项目"
                align="center"
                width="150"
            ></el-table-column>

            <el-table-column prop="type" label="配置类型" width="100" align="center" :formatter="get_type_name">
            </el-table-column>
            <el-table-column
                prop="config_url"
                label="配置url"
                align="center"
                width="300"
            >
            </el-table-column>
            <el-table-column
                prop="token"
                label="token"
                align="center"
                width="300"
            ></el-table-column>
            <el-table-column prop="module_name" label="模块名称" width="150" align="center">
            </el-table-column>

            <el-table-column
                prop="basePath"
                label="接口前缀"
                align="center"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="creator"
                label="创建人"
                align="center"
                width="100"
            >
            </el-table-column>
            <!-- <el-table-column prop="params"  label="请求参数"  align="center" width="420">  </el-table-column>   -->
            <el-table-column
                style="background-color: #ffffff"
                fixed="right"
                label="操作"
                width="200"
                align="center"
            >
              <template slot-scope="scope">
                <el-button @click="Edit(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="Delete(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <!--表格end-->

      <!--分页start-->
      <div style="float: right">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
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
    <el-dialog :visible.sync="addInterFaceConfigDialog" show-footer
                 :close-on-press-escape="false"
                 :close-on-click-modal="false"
      style="margin-top: 100px;height: 600px;">
        <span slot="title" style="font-size: 20px">{{ title }}</span>
        <el-form
            ref="Form"
            :model="Form"
            label-width="auto"
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

          <el-form-item label="配置类型" prop="type">
          <el-radio-group v-model="Form.type">
            <el-radio v-model="Form.type" label="1" border>Yapi</el-radio>
            <el-radio v-model="Form.type" label="2" border>Swagger</el-radio>
          </el-radio-group>
        </el-form-item>

          <el-form-item label="module_name" prop="module_name" >
            <el-input
                v-model="Form.module_name"
                placeholder="请输入模块名称"
            ></el-input>
          </el-form-item>

          <el-form-item label="接口前缀" prop="basePath" >
            <el-input
                v-model="Form.basePath"
                placeholder="请输入接口前缀-swagger/yapi无法获取时使用"
            ></el-input>
          </el-form-item>

          <el-form-item label="token" prop="token" v-if="this.Form.type == '1'">
            <el-input
                v-model="Form.token"
                placeholder="请输入token"
            ></el-input>
          </el-form-item>
          
          <el-form-item label="config_url" prop="config_url" v-if="this.Form.type == '2'">
            <el-input
                v-model="Form.config_url"
                placeholder="请输入swagger拉取地址"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="CreateInterFaceConfig()">确定</el-button>
            <el-button @click="addInterFaceConfigDialog = false">取消</el-button>
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
  components: {Breadcrumb},
  name: "interfaceConfig",
  data() {
    return {
      isLoading: false,
      isdisabled: false,
      project:[],
      total:0,
      // 分页请求数据
      list_page_body: {page: 1, size: 20},
      config_data:[],
      addInterFaceConfigDialog:false,
      title:'添加配置',
      Form:{type:'1',status:1},
      typeName:[{type:'1',val:'Yapi'},{type:'2',val:'Swagger'}]
    };
  },

  methods: {
    CreateInterFaceConfig(){
      if (this.title === "添加配置") {
            axios
                .post("/api/test_case/CreateInterFaceConfig",this.Form)
                .then((res) => {
                  this.isLoading = true;
                  if (res.data.code === 10000) {
                    this.isLoading = false;
                    this.addInterFaceConfigDialog = false;
                    this.handleCurrentChange(1);
                  } else {
                    this.isLoading = false;
                    this.$message.error(res.data.msg);
                  }
                });
          } else {
            axios.post("/api/test_case/UpdateInterFaceConfig", this.Form).then((res) => {
              this.isLoading = true;
              if (res.data.code === 10000) {
                this.isLoading = false;
                this.addInterFaceConfigDialog = false;
                this.handleCurrentChange(1);
              } else {
                this.isLoading = false;
                this.$message.error(res.data.msg);
              }
            });
          }
    },
    Edit(row){
      this.Form = JSON.parse(JSON.stringify(row))
      this.title = '编辑配置'
      this.addInterFaceConfigDialog = true;
    },
    Delete(row){
      axios
          .post("/api/test_case/DeleteInterFaceConfig",{id:row.id})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.$message({
                      duration: 2000,
                      message: res.data.msg,
                      type: "success",
                    });
              this.handleCurrentChange()
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
    get_config_list(){
      axios
          .post("/api/test_case/InterFaceConfigList", this.list_page_body)
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.config_data = res.data.data
              this.total = res.data.totalNum;
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
    get_project() {
      axios
          .post("/api/test_management/proList", {page:1,limit:100})
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
    addInterFaceConfig(){
      this.Form = {
        type:'1',
        status:1
      }
      this.title = '添加配置'
      this.addInterFaceConfigDialog = true
    },
        //页量切换
    handleSizeChange(val) {
      this.list_page_body.size = val;
      this.get_config_list();
    },
    //页码切换
    handleCurrentChange(val) {
      this.list_page_body.page = val;
      this.get_config_list();
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
    get_type_name(raw) {
      let val = null;
      this.typeName.forEach((item) => {
        if (raw.type == item.type) {
          val = item.val
        }
      })
      return val
    },
  },

  created() {
    this.get_config_list();
    this.get_project();
  },
};
</script>
<style>
</style>