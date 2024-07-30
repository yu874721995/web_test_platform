<template>
  <div>
    <div>
      <div>
        <Breadcrumb />
      </div>
    </div>



    <div style="float: left; width: 100%; line-height: 60px">
      <div style="width: 100%">

        <div style="float: left; margin-left: 10px">
          <a style="font-size: 13px">记录名称</a>
          <el-input
            placeholder="请输入任务名称"
            v-model="list_page_body.name"
            style="width: 150px; margin-left: 10px"
            class="case_input"
          ></el-input>
        </div>
          <div style="float: left; ">
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

        <div style="float: left; margin-left: 10px">
          <a style="font-size: 13px">添加人</a>
          <el-input
            placeholder="请输入添加人"
            v-model="list_page_body.creator"
            style="width: 150px; margin-left: 10px"
            class="case_input"
          ></el-input>
        </div>

        <div style="float: left; padding-left: 5px">
          <el-button plain icon="el-icon-search" @click="handleCurrentChange(1)"
            >查询</el-button
          >
        </div>

        <div style="float: right; margin-right: 10px">
            <el-button type="primary"
                       style="background-color: #3573fe;margin-right: 20px; float: right;margin-top: 50px;text-align: center;"
                       size="small" @click="DataComparisonCreate">新增SQL
            </el-button>
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
            :data="table_data"
            style="font-size: 13px; left: 1%; border-radius: 5px"
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
              label="SQL名称"
              prop="name"
              :show-overflow-tooltip='true'
              align="center"
              width="200"
            ></el-table-column>

                        <el-table-column
                prop="project_id"
                :formatter="get_project_name"
                label="所属项目"
                align="center"
                width="150"
            ></el-table-column>

            <el-table-column
              prop="value"
              label="SQL语句"
              :show-overflow-tooltip='true'
              align="center"
              width="300"
            ></el-table-column>
            <el-table-column
              prop="creator"
              label="创建人"
              align="center"
              width="100"
            ></el-table-column>

            <el-table-column
              prop="create_time"
              label="创建时间"
              align="center"
              width="150"
            ></el-table-column>

            <el-table-column
              style="background-color: #ffffff"
              fixed="right"
              label="操作"
              width="250"
              align="center"
            >
              <template slot-scope="scope">
                <el-button @click="PutDataComparison(scope.row)"
                v-if="scope.row.creator === user_name"
                           type="text" size="small">编辑
                </el-button>

                <el-button
                  @click="SubmitBuildDataComparison(scope.row)"
                  type="text"
                  size="small"
                  v-has="{class:'55'}"
                  >执行</el-button
                >
                <el-button type="text" @click="DeleteDataComparison(scope.row)"
                           v-if="scope.row.creator === user_name"
                           size="small" style="color: red">删除
                </el-button>
                <el-button
                    type="text"
                    @click="openexculist(scope.row)"
                    size="small"
                >执行记录
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
          :page-sizes="[10,20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="float: right; margin-top: 10px; margin-right: 20px"
        ></el-pagination>
      </div>
      <!--分页end-->
    </div>

    <el-dialog
      :visible.sync="DataComparisonCreateDialog"
      show-footer
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      style="height: 110%; margin: auto; width: 100%"
    >
      <span slot="title" style="font-size: 20px; float: left">{{ title }}</span>

      <el-form
        :model="DataComparisonCreateForm"
        label-width="auto"
        :inline-message="true"
        :status-icon="true"
        style="float: left; width: 100%"
      >

      <el-form-item label="SQL名称" prop="name">
            <el-input
              placeholder="请输入SQL名称"
              v-model="DataComparisonCreateForm.name"
              clearable>
            </el-input>
        </el-form-item>

        <el-form-item
            label="所属项目" prop="project_id" style="text-align: left;">
          <el-select v-model="DataComparisonCreateForm.project_id" clearable filterable>
            <el-option
                v-for="item in project"
                :key="item.id"
                :label="item.project_name"
                :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>


         <el-form-item
            label="数据库项目" prop="database_config_id" style="text-align: left;">
          
            <el-cascader
            :show-all-levels="false"
              v-model="DataComparisonCreateForm.database_config_id"
              :options="options"
              :props="{label:'database',value:'id' }"
              >
            </el-cascader>
        </el-form-item>


        <el-form-item label="SQL语句:" prop="value">
          <el-input
            type="textarea"
            :autosize={minRows:8,maxRows:20}
            placeholder="请输入内容"
            v-model="DataComparisonCreateForm.value"
          >
          </el-input>
        </el-form-item>

        <el-form-item>
          <div style="float: left">
            <el-button type="primary" @click="SubmitDataComparison">确定</el-button>
            <el-button
              @click="
                DataComparisonCreateDialog = false;
                job_popid_data = [];
              "
              >取消</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- <el-dialog title="选择执行环境" :visible.sync="DataComparison_env_options_dislog" width="30%"
               style="margin-top: 10%px;height: 60%;"
               :close-on-press-escape="false"
               :close-on-click-modal="false"
               @close="DataComparison_env_options_dislog=false"
    >
      <el-form :model="envForm"
               label-width="auto">

        <el-form-item label="主sql运行环境" prop="env" style="padding-left: 100px">
          <el-cascader v-model="envForm.env"
                       placeholder="请搜索运行环境"
                       :options="env_options"
                       filterable
                       :props="{value:'id',label:'env_name'}"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="副sql运行环境" prop="env" style="padding-left: 100px">
          <el-cascader v-model="envForm.secondary_env"
                       placeholder="请搜索运行环境"
                       :options="env_options"
                       filterable
                       :props="{value:'id',label:'env_name'}"
          ></el-cascader>
        </el-form-item>

        <el-form-item label-width="30%">
          <el-button @click="DataComparison_env_options_dislog = false"
                     style="margin-right: 10px;float: right;margin-top: 10px;">取 消
          </el-button>
          <el-button type="primary" @click="SubmitBuildDataComparison"
                     style="margin-right: 10px;float: right;margin-top: 10px;">确 定
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog> -->

    <el-dialog title="执行记录" :visible.sync="plantexculistdialog"
    :close-on-press-escape="false"
               :close-on-click-modal="false"
               @close="plantexculistdialog=false" 
     width="60%">
      <div>
        <!--表格start-->
        <div style="margin-top: 10px; float: left; width: 100%; text-align: center">
          <div style="float: right; margin-right: 10px">
            <el-button type="primary"
                       style="background-color: #3573fe;margin-right: 20px; float: right;margin-top: 50px;text-align: center;"
                       size="small" @click="get_data_excu_list()" icon="el-icon-refresh">刷新列表
            </el-button>
          </div>
          <template>
            <!--                    border-radius: 10px;-->
            <el-table
                :data="plantexculistdata"
                style="font-size: 13px"
                :header-cell-style="{ background: '#E7EAED' }"
                height="500"
                width="100%"
                :row-style="{ height: '40px' }"
                :cell-style="{ padding: '0px' }"
                :highlight-current-row="true"
                :stripe="true"
                :border="true"
                type="selection">
              <el-table-column
                  label="id"
                  prop="id"
                  align="center"
                  width="55"
              >
              </el-table-column>
             
              
              <el-table-column
                  :formatter="get_env_name"
                  prop="env"
                  label="执行环境"
                  align="center"
                  width="100"
              >
              </el-table-column>
              <el-table-column
                :formatter="get_status_name"
                  prop="status"
                  label="执行状态"
                  align="center"
                  width="100"
              >
              </el-table-column>
              <el-table-column
                  prop="result"
                  label="执行结果"
                  align="center"
                  width="100"
              ><template slot-scope="scope">
                  <el-link target="_blank" 
                  v-if="scope.row.status==2"
                  type="primary" 
                  @click="downloadMitFile(scope.row)"
                  >下载结果</el-link>
                </template>
              </el-table-column>
              <el-table-column
                  prop="error_content"
                  label="错误信息"
                  :show-overflow-tooltip="true"
                  align="center"
                  width="100"
              >
              </el-table-column>
              <el-table-column
                  prop="creator"
                  label="执行人"
                  align="center"
                  width="100"
              >
              </el-table-column>
              <el-table-column
                  prop="create_time"
                  label="执行时间"
                  align="center"
                  width="150"
              >
              </el-table-column>

            </el-table>
          </template>
        </div>
        <!--表格end-->
        <div style="float: right">
          <!--分页start-->
          <el-pagination
              v-on:size-change="handleSizeChangeExcu"
              v-on:current-change="handleCurrentChangeExcu"
              :current-page="plant_excu_list_page_body.page"
              :page-sizes="[10, 20, 50]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="excu_total"
              style="float: right; margin-top: 10px; margin-right: 20px"
          ></el-pagination>
          <!--分页end-->
        </div>
      </div>
    </el-dialog>

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
      value: [],
      options:[
        {
            database: 'uat',
            id: 'uat',
            children: []
          },
        {
            id: 'sit',
            database: 'sit',
            children: []
          },
      ],
      Dataexculistdialog:false,
      envForm:{},
      dataConfig:[],
      user_name:localStorage.getItem('username'),
      title:'新增SQL',
      project:[],
      //分页请求数据
      list_page_body: {
        page: 1,
        limit: 10
      },
      project_format: {
        devtest: "联调环境",
        pre: "预发环境",
      },
      //表格
      table_data: [],
      //总条数
      total: 0,
      DataComparisonCreateDialog:false,
      DataComparisonCreateForm:{},
      DataComparison_env_options_dislog:false,
     
      plant_excu_list_page_body:{
        page:1,
        limit:10
      },
      plantexculistdialog:false,
      plantexculistdata:[],
      excu_total:0
     
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    openexculist(row) {
      this.plantexculistdialog = true
      this.plant_excu_list_page_body.id = row.id
      this.get_data_excu_list()

    },
    get_data_excu_list() {
      axios.post('/api/test_tools/TreasureBoxBuild', this.plant_excu_list_page_body).then((res) => {
        if (res.data.code == 10000) {
          this.plantexculistdata = res.data.data
          this.excu_total = res.data.count
          this.$message(
              {
                duration: 2000,
                message: '查询成功',
                type: "success",
              }
          )
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    init() {
      console.log('init')
      axios
          .post("/api/test_tools/TreasureBoxConfigList", {page: 1, limit: 1000})
          .then((res) => {
            //api接口判断为code=10000成功
            console.log(res.data,"--res.data--")

          res.data.data.forEach(item => {
            if (item.env === 1) {
              this.options[1].children.push(item)
            }else {
              this.options[0].children.push(item)
            }
          })
          console.log(this.options,"--pp--")
          })
          .catch(() => {
            this.is_data = false;
            this.$message.error("服务器错误,请联系测试人员");
          });
    },
    //页量切换
    handleSizeChangeExcu(val) {
      this.plant_excu_list_page_body.limit = val;
      // this.getList();
      this.get_data_excu_list();
    },
    //页码切换
    handleCurrentChangeExcu(val) {
      this.plant_excu_list_page_body.page = val;
      this.get_data_excu_list();
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

    DataComparisonCreate(){
      this.title = '新增SQL'
      this.DataComparisonCreateForm = {};
      this.DataComparisonCreateDialog = true;
    },
    PutDataComparison(row){
      this.DataComparisonCreateForm = JSON.parse(JSON.stringify(row))
      this.title = '编辑SQL'
      this.DataComparisonCreateForm.env = eval(row.env)
      this.DataComparisonCreateForm.secondary_env = eval(row.secondary_env)
      this.DataComparisonCreateDialog = true
    },
    Build_DataComparison(row){
      this.DataComparison_env_options_dislog = true;
      this.envForm.id = row.id
    },
    SubmitBuildDataComparison(row){
      this.envForm.id = row.id
      // if(typeof(this.envForm.env)=='object'){
      //   this.envForm.env = this.envForm.env[1]
      // }
      // if(typeof(this.envForm.secondary_env)=='object'){
      //   this.envForm.secondary_env = this.envForm.secondary_env[1]
      // }
      axios
        .post("/api/test_tools/BuildDataComparison", this.envForm)
        .then((res) => {
          //api接口判断为code=10000成功
          if (res.data["code"] === 10000) {
            this.$message({
              duration: 2000,
              message: res.data.msg,
              type: "success",
            });
            this.DataComparison_env_options_dislog = false;
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
    DeleteDataComparison(row){
      axios
        .post("/api/test_tools/TreasureBoxDelete", {id:row.id})
        .then((res) => {
          //api接口判断为code=10000成功
          if (res.data["code"] === 10000) {
            this.$message({
              duration: 2000,
              message: res.data.msg,
              type: "success",
            });
            this.get_sql_data_List();
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
    format_env(env){
      let envVal = '';
      if(env==1){
        envVal = 'sit'
      }else{
        envVal = 'uat'
      }
      return envVal
    },
    SubmitDataComparison(){
      this.DataComparisonCreateForm.database_config_id = this.DataComparisonCreateForm.database_config_id[1]
       var url = this.title == '新增SQL'?'/api/test_tools/TreasureBoxCreate' :'/api/test_tools/TreasureBoxUpdate'
      axios
        .post(url, this.DataComparisonCreateForm)
        .then((res) => {
          //api接口判断为code=10000成功
          if (res.data["code"] === 10000) {
            this.$message({
              duration: 2000,
              message: res.data.msg,
              type: "success",
            });
            this.DataComparisonCreateDialog = false
            this.get_sql_data_List();
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
    get_sql_data_List() {
      axios
        .post("/api/test_tools/TreasureBoxList", this.list_page_body)
        .then((res) => {
          //api接口判断为code=10000成功
          if (res.data["code"] === 10000) {
            this.table_data = res.data.data;
            this.total = res.data.count;
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
      this.get_sql_data_List();
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
     get_data_config() {
      axios
          .post("/api/test_tools/TreasureBoxConfigList", this.list_page_body)
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.dataConfig = res.data.data
              console.log(1111,this.dataConfig)
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
    //页码切换
    handleCurrentChange(val) {
      this.list_page_body.page = val;
      this.get_sql_data_List();
    },
    // env(raw) {
    //   let val = "";
    //   this.envs.forEach((item) => {
    //     if (raw.env === item.value) {
    //       val = item.label;
    //     }
    //   });
    //   return val;
    // },
    get_env_list() {
      axios
          .post("/api/test_management/selectEnvlist", {page: 1, limit: 200})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.env_options = res.data["items"];
            }
          })
          .catch(() => {
            this.is_data = false;
            this.$message.error("服务器错误,请联系测试人员");
          });
    },
    get_env_name(raw) {
      let val = null;
      this.env_options.forEach((item) => {
        item.children.forEach((childrenItem)=>{
          if (raw.env === childrenItem.id) {
          val = childrenItem.env_name;
        }
        })
      });
      return val;
    },
    get_status_name(raw){
      if(raw.status == 1){
        return '执行中'
      }else if(raw.status == 2){
        return '执行成功'
      }else{
        return '执行失败'
      }
    },
    downloadMitFile(row){
      window.open('https://yt-public-test.yintaerp.com/'+row.result)
    },
  },

  //页面初始化渲染
  created() {
    this.get_sql_data_List();
    this.get_env_list();
    this.get_project();
    this.get_data_config();
   
  },
};
</script>
<style>
.el-tooltip__popper {
  max-width: 500px;
}
</style>
<style>
.abow_dialog {
  display: flex;
  justify-content: center;
  align-items: Center;
  overflow: hidden;
}

.el-dialog {
  margin: 0 auto !important;
  height: 85%;
  overflow: hidden;
  margin-top: 50px !important;
}

.el-dialog__body {
  position: absolute;
  left: 0;
  top: 54px;
  bottom: 0;
  right: 0;
  z-index: 1;
  overflow: hidden;
  overflow-y: auto;
}
</style>
