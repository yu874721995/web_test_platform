<template>
  <div>
    <div>
      <Breadcrumb />
    </div>

    <div>
      <!--      下拉start-->
      <div style="float: left; width: 100%; line-height: 60px">
        <div style="width: 100%">
          <div style="float: left; margin-left: 1%">
            <a style="font-size: 13px">所属项目</a>
            <el-select v-model="pageSC.project_id" clearable filterable style="width: 150px;">
            <el-option v-for="item in project_list" :key="item.id" :label="item.project_name" :value="item.id">
            </el-option>
          </el-select>
          </div>
          <div style="float: left; margin-left: 1%">
            <a style="font-size: 13px">所属环境</a>
            <el-select v-model="pageSC.lable_name" clearable filterable  style="width: 150px; margin-left: 10px">
              <el-option
                v-for="item in env"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">环境名称</a>
            <el-input
              placeholder="请输入环境名称"
              clearable
              v-model="pageSC.env_name"
              style="width: 150px; margin-left: 10px"
              class="case_input"
            ></el-input>
          </div>
          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">环境host</a>
            <el-input
              placeholder="请输入环境host"
              clearable
              v-model="pageSC.env_url"
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
                  @click="addEnv(null)"
                  v-has="{class:'56'}"
              >新增
              </el-button>
            </el-row>
          </div>
        </div>
      </div>
      <!--      下拉end-->
      <div
        style="margin-top: 10px; float: left; width: 98%; text-align: center"
      >
        <!--表格start-->
        <!--                    border-radius: 10px;-->
        <el-table
          :data="evn_data"
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
          :row-class-name="tableRowClassName"
        >
          <el-table-column prop="project_id" label="所属项目" align="center" :formatter="get_pro_name">
          </el-table-column>
          <el-table-column prop="lable_name" label="所属环境" align="center" :formatter="get_env_name">
          </el-table-column>
          <el-table-column prop="env_name" label="环境名称" align="center">
          </el-table-column>
          <el-table-column prop="env_url" label="环境host" align="center">
          </el-table-column>
          <el-table-column prop="username" label="添加人" align="center">
          </el-table-column>
          <el-table-column
            style="background-color: #ffffff"
            fixed="right"
            label="操作"
            width="200"
            align="center"
          >
            <template slot-scope="scope">
              <el-button @click="setCommon(scope.row,1)" type="text" size="small" v-if="scope.row.common === 1"
                         v-has="{class:'53'}"
                >设为常用</el-button
              >
              <el-button style="color:#00CED1" @click="setCommon(scope.row,2)" type="text" size="small" v-if="scope.row.common === 2"
                         v-has="{class:'54'}"
                >取消常用</el-button
              >
              <el-button  @click="addEnv(scope.row)" type="text" size="small" 
                >编辑</el-button
              >
              <el-button  @click="delEnv(scope.row)" type="text" size="small" v-if="scope.row.username === user_name"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--表格end-->
      <div>
        <!--分页start-->
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
        <!--分页end-->
      </div>
    </div>

    <div>
      <el-dialog :visible.sync="addEnvdialog" show-footer
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
          <el-form-item label="所属项目" prop="project_id">
            <el-select v-model="Form.project_id" clearable filterable style="width: 150px;">
              <el-option
                  v-for="item in project_list"
                  :key="item.id"
                  :label="item.project_name"
                  :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属环境" prop="lable_name">
            <el-select v-model="Form.lable_name" clearable filterable style="width: 150px;">
              <el-option
                  v-for="item in env"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="环境名称" prop="env_name">
            <el-input
                v-model="Form.env_name"
                placeholder="请输入环境名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="环境host" prop="env_url">
            <el-input
                v-model="Form.env_url"
                placeholder="请输入环境host"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据库配置" prop="sql_conf">
            <el-cascader
             v-model="Form.sql_conf"
              clearable
               filterable
               :props="{ value: 'id', label: 'database'}"
                :options="mysqlconflist"
                 :show-all-levels="false"></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="creOupEnv('Form')">确定</el-button>
            <el-button @click="addEnvdialog=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import axios from "axios";
import api from '@/api/api.js';

export default {
  //引入面包屑
  components: { Breadcrumb },
  data() {
    return {
      //下拉框数据映射
      env: [
        {
          value: 1,
          label: "联调环境",
        },
        {
          value: 2,
          label: "预发环境",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
        },
        {
          value: 3,
          label: "生产环境",
        }
      ],
      user_name:localStorage.getItem('username'),
      //下拉框数据默认为空
      list_page_body: {},
      //分页请求数据
      pageSC: {
        page: 1,
        limit: 20,
      },                                                    
      //是否有数据
      project_list:[],
      is_data: false,
      addEnvdialog:false,
      mysqlconflist:[],
      Form:{},
      title:'新增环境',
      //表格
      evn_data: [],
      //总条数
      total: 0,
      rules: {}
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      console.log(row);
      if (rowIndex % 4 === 1) {
        return "warning-row";
      } else if (rowIndex % 4 === 3) {
        return "success-row";
      }
      return "";
    },
    creOupEnv(Form) {
      this.$refs[Form].validate((valid) => {
        if (valid) {
          if (this.Form.sql_conf.length){
            this.Form.sql_conf = this.Form.sql_conf[1]
          }
          if (this.title == '新增环境') {
            axios
                .post("/api/test_management/createEnv", this.Form)
                .then((res) => {
                  //api接口判断为code=10000成功
                  if (res.data["code"] === 10000) {
                    // this.$message({
                    //   duration: 2000,
                    //   message: res.data.msg,
                    //   type: "success",
                    // });
                    this.addEnvdialog = false;
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
                .post("/api/test_management/updateEnv", this.Form)
                .then((res) => {
                  //api接口判断为code=10000成功
                  if (res.data["code"] === 10000) {
                    // this.$message({
                    //   duration: 2000,
                    //   message: res.data.msg,
                    //   type: "success",
                    // });
                    this.addEnvdialog = false;
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
    //项目下拉框数据
    get_projct_list() {
      //通过pageSC做查询
      axios
          .post("/api/test_management/proList", {page: 1, size: 100})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.project_list = res.data["items"];
              this.project_name = this.project_list.project_name;
            }
          })
          .catch(() => {
            this.is_data = false;
            this.$message.error("服务器错误,请联系测试人员");
          });
    },
    addEnv(raw){
      this.addEnvdialog = true;
      if(raw){
        this.title = '编辑环境'
        this.Form = raw;
        this.mysqlconflist.forEach((item)=>{
          item.children.forEach((childrenItem)=>{
            if(childrenItem.id == raw.sql_conf){
              this.Form.sql_conf = [item.id,raw.sql_conf]
            }
          })
        })
      }else{
        this.title = '新增环境'
        this.Form = {}
        this.Form.sql_conf = [this.mysqlconflist[0].id,this.mysqlconflist[0].children[0].id]
      }
    },

    //列表数据请求
    // getList() {
    //   //通过pageSC做查询
    //   axios.post("/api/test_management/envlist", this.pageSC).then((res) => {
    //     console.log(res);
    //     //api接口判断为code=10000成功
    //     if (res.data.code === 10000) {
    //       this.evn_data = res.data["items"];
    //       this.total = res.data["count"];
    //       this.is_data = true;
    //     } else {
    //       //失败提示
    //       this.is_data = false;
    //       this.$message.error("查询失败，请联系人员");
    //     }
    //   });
    // },
    async getList() {
      let response = await api.get_env_list(this.pageSC)
      this.evn_data = response["items"];
      this.total = response["count"];
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
    setCommon(row,type){
      if(type==1){
        axios.post("/api/test_management/setCommon", {env_id:row.id}).then((res) => {
        //api接口判断为code=10000成功
        if (res.data.code === 10000) {
          // this.$message({
          //       duration: 2000,
          //       message: res.data.msg,
          //       type: "success",
          //     });
            this.getList();
        } else {
          //失败提示
          this.$message.error(res.data.msg);
        }
      });}else{
        axios.post("/api/test_management/setNoCommon", {env_id:row.id}).then((res) => {
        //api接口判断为code=10000成功
        if (res.data.code === 10000) {
          // this.$message({
          //       duration: 2000,
          //       message: res.data.msg,
          //       type: "success",
          //     });
            this.getList();
        } else {
          //失败提示
          this.$message.error(res.data.msg);
        }
      });
      }
    },
    get_env_name(raw){
      let val = null;
      this.env.forEach((item)=>{
        if(raw.lable_name === item.value){
          val = item.label
        }
      })
      return val
    },
    delEnv(row) {
      axios
          .post("/api/test_management/deleteEnv", {id: row.id})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              // this.$message({
              //   duration: 2000,
              //   message: res.data.msg,
              //   type: "success",
              // });
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
    get_pro_name(raw){
      let val = null;
      this.project_list.forEach((item)=>{
        if(raw.project_id === item.id){
          val = item.project_name
        }
      })
      return val
    },
    get_mysqlconf_list(){
      axios
          .post("/api/test_management/MysqlConfList", {page:1,limit:1000})
          .then((res) => {
            if (res.data["code"] === 10000) {
              this.mysqlconflist = res.data.data
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
    
  },
  //页面初始化渲染
  created() {
    this.getList();
    this.get_projct_list();
    this.get_mysqlconf_list();
  },
};
</script>

<style lang="stylus">
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-table .default-row {
  background: #F3F4F6;
}

.evn_select {
  width: 200px;

  /* selecte 框的高度设置，默认是 40px */
  .el-input__inner {
    height: 35px;
  }

  /* 下面设置右侧按钮居中 */
  .el-input__suffix {
    top: 5px;
  }

  .el-input__icon {
    line-height: inherit;
  }

  .el-input__suffix-inner {
    display: inline-block;
  }
}

/deep/ .el-table__body-wrapper::-webkit-scrollbar {
  width: 10px;
}

// 设置滚动条的背景色和圆角
/deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: pink;
  border-radius: 8px;
}
</style>