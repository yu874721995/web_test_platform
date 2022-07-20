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
          <a style="font-size: 13px">TAPD项目名称</a>
          <el-select v-model="list_page_body.tapd_project_id" clearable filterable placeholder="请选择项目名称"
                     style="width: 150px; margin-left: 10px">
            <el-option v-for="item in project" :key="item.id" :label="item.project_name" :value="item.id"
            ></el-option>
          </el-select>
        </div>

        <div style="float: left; margin-left: 10px">
          <a style="font-size: 13px">创建人</a>
          <el-input placeholder="请输入创建人名称" v-model="list_page_body.creator" style="width: 150px; margin-left: 10px"
                    class="case_input"></el-input>
        </div>

        <div style="float: left; padding-left: 5px">
          <el-button plain icon="el-icon-search" @click="handleCurrentChange(1)">查询</el-button>
        </div>

        <div style="float: right; margin-right: 10px">
          <div style=" width: 100px; float: right; margin-top: 10px; height: 40px; text-align: center; ">
            <el-button type="primary" size="small" style="background-color: #3573fe" @click="init">
              新增配置
            </el-button>
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
              class="tapd_project_table" :data="tapd_project_data"
              style="font-size: 13px;left: 1%;border-radius: 5px;" :header-cell-style="{ background: '#E7EAED' }" height="650" width="98%"
              :row-style="{ height: '40px' }" :cell-style="{ padding: '0px' }" :highlight-current-row="true"
              :stripe="true" :border="true" type="selection">
            <el-table-column label="Tapd项目名称" :formatter="get_tapd_name" prop="tapd_project_id" align="center"
                             width="200"></el-table-column>

            <el-table-column prop="demand_status" label="监视需求状态" align="center" width="200"
                             :formatter="get_after_status_name"></el-table-column>

            <el-table-column prop="middle_status" label="监视需求优先级" align="center" width="200"
                             :formatter="get_after_status_name"></el-table-column>

            <el-table-column prop="time" label="停留时长" align="center" width="200"></el-table-column>

            <el-table-column prop="push_time" label="推送时间" align="center" width="200"></el-table-column>

            <el-table-column prop="webhook_url" label="webhook_url" align="center" width="300"></el-table-column>

            <el-table-column prop="users" :formatter="get_ding_user_name" label="通知人" align="center" width="300">
            </el-table-column>

            <el-table-column prop="creator" label="创建人" align="center" width="300"></el-table-column>

            <el-table-column prop="create_time" label="创建时间" align="center" width="300"></el-table-column>

            <el-table-column style="background-color: #ffffff" fixed="right" label="操作" width="250" align="center">
              <template slot-scope="scope">
                <el-button @click="update_config(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="delete_again_alter(scope.row)" type="text" size="small" style="color: red">删除
                </el-button>
                <el-button @click="run_config(scope.row)" type="text" size="small">测试一下</el-button>
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

    <el-dialog :visible.sync="add_config_dialog" show-footer :close-on-press-escape="false"
               :close-on-click-modal="false" style="height: 900px;margin: auto;width:65%">

      <span slot="title" style="font-size: 20px;float:left;">{{ title }}</span>

      <el-form ref="config_form" :model="config_form" label-width="auto" :rules="config_rules"
               :inline-message="true"
               :status-icon="true" style="float: left;">

        <el-form-item label="项目名称" prop="project_id">
          <el-select v-model="config_form.tapd_project_id" clearable filterable style="width: 300px;float:left;"
                     @change="select_project_change">
            <el-option v-for="item in project" :key="item.id" :label="item.project_name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="监视需求状态" prop="demand_status">
          <el-select v-model="config_form.demand_status" multiple placeholder="请先选择项目"
                     style="width: 300px;float:left;">
            <el-option
                v-for="item in demand_status_arr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="监视需求优先级" prop="middle_status">
          <el-select v-model="config_form.middle_status" multiple placeholder="请先选择项目"
                     style="width: 300px;float:left;">
            <el-option v-for="item in demand_middle_status" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="推送时间:" prop="push_time">
          <el-time-select style="width: 300px;float:left;" v-model="config_form.push_time"
                          :picker-options="{start: '00:00',step: '00:15',end: '24:00'}" placeholder="选择时间">
          </el-time-select>

        </el-form-item>

        <el-form-item label="webhook_url" prop="webhook_url">
          <el-input v-model="config_form.webhook_url" placeholder="请输入webhook_url"
                    style="float:left;width: 300px;"></el-input>
        </el-form-item>

        <el-form-item label="通知人" prop="users">
          <el-select v-model="config_form.users" clearable multiple filterable style="width: 300px;float:left;">
            <el-option v-for="item in ding_user_arr" :key="item.id" :label="item.ding_name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <div style="float: left;">
            <el-button type="primary" @click="add_config">确定</el-button>
            <el-button type="primary" @click="keep_run_config">测试一下</el-button>
            <el-button @click="add_config_dialog=false">取消</el-button>
          </div>
        </el-form-item>

      </el-form>
    </el-dialog>

    <!--删除二次确认弹框-->
    <el-dialog title="删除" :visible.sync="delete_again_dialog" width="400px" style="height: 250px;margin-top: 300px;"
               :close-on-press-escape="false"
               :close-on-click-modal="false">
      <div>是否确认删除</div>
      <div style="margin-right: 5px;margin-top:30px;float: right">
        <el-button @click="delete_again_dialog = false">取 消</el-button>
        <el-button type="primary" @click="delete_config">确 定</el-button>
      </div>
    </el-dialog>
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
      //是否有数据
      is_data: false,
      //表格
      tapd_project_data: [],
      project: [],
      all_demand_status_arr: [],
      demand_status_arr: [],
      demand_middle_arr: [],
      ding_user_arr: [],
      event_type: "",
      //总条数
      total: 0,
      add_config_dialog: false,
      delete_again_dialog: false,
      title: "新增配置",
      delete_id: 0,
      config_form: {
        demand_status: [],
        middle_status: [],
        webhook_url: "",
        users: [],
        project_id: "",
        time: "",
        push_time: ""
      },
      config_rules: {
        project_id: [{required: true, message: "请选择项目", trigger: "blur"}],
        demand_status: [{required: true, message: "请选择需求状态", trigger: "blur"}],
        middle_status: [{required: true, message: "请选择需求优先级", trigger: "blur"}]
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
      },
    };
  },
  methods: {
    //列表数据请求
    init() {
      this.event_type = "";
      this.config_form = {}
      this.add_config_dialog = true;
    },
    get_config_List() {
      axios
          .post("/api/test_tapd/tapdConfList", this.list_page_body)
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.tapd_project_data = res.data.data;
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
    //新增/编辑
    add_config() {
      console.log(this.config_form)
      if (this.event_type === 'update') {
        if (typeof (this.config_form.start_time) === "string") {
          if (this.config_form.start_time) {
            this.config_form.start_time = new Date(this.config_form.start_time).toISOString();
          }
        }
        if (typeof (this.config_form.end_time) === "string") {
          if (this.config_form.end_time) {
            this.config_form.end_time = new Date(this.config_form.end_time).toISOString();
          }
        }
        axios
            .post("/api/test_tapd/updateTapdConf", this.config_form)
            .then((res) => {
              //api接口判断为code=10000成功
              if (res.data["code"] === 10000) {
                this.$message.success(res.data.msg)
                this.is_data = true;
                this.event_type = "";
                this.add_config_dialog = false;
                this.get_config_List();
                this.config_form = {};
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
      } else {
        this.event_type = "";
        axios
            .post("/api/test_tapd/createTapdConf", this.config_form)
            .then((res) => {
              //api接口判断为code=10000成功
              if (res.data["code"] === 10000) {
                this.$message.success(res.data.msg)
                this.is_data = true;
                this.add_config_dialog = false;
                this.get_config_List();
                this.config_form = {};
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
      }

    },
    //编辑
    update_config(row) {
      this.search_demand_status(row.tapd_project_id);
      this.get_mail_list();
      this.config_form = JSON.parse(JSON.stringify(row))
      this.add_config_dialog = true;
      this.event_type = "update";
    },
    //删除弹框显示
    delete_again_alter(row) {
      this.delete_id = row.id;
      this.delete_again_dialog = true;
    },
    //删除
    delete_config() {
      axios
          .post("/api/test_tapd/deleteTapdConf", {id: this.delete_id})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.$message.success(res.data.msg);
              this.delete_again_dialog = false;
              this.get_config_List();
            } else {
              //失败提示
              this.delete_again_dialog = false;
              this.$message.error(res.data.msg);
            }
          })
          .catch((error) => {
            console.log(error); //  错误处理 相当于error
            this.$message.error("服务器错误,请联系测试人员");
          });
    },
    //执行
    run_config(row) {
      axios
          .post("/api/test_tapd/test_to_msg",
              {
                tapd_project_id: row.tapd_project_id,
                webhook_url: row.webhook_url,
                users: row.users
              })
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.$message.success(res.data.msg);
              this.get_config_List();
            } else {
              //失败提示
              this.$message.error(res.data.msg);
            }
          })
          .catch((error) => {
            console.log(error); //  错误处理 相当于error
            this.$message.error("服务器错误,请联系测试人员");
          });
    },
    //新增/编辑执行
    keep_run_config() {
      axios
          .post("/api/test_tapd/test_to_msg", this.config_form)
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.$message.success(res.data.msg);
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
    //页量切换
    handleSizeChange(val) {
      this.list_page_body.limit = val;
      this.get_config_List();
    },
    //页码切换
    handleCurrentChange(val) {
      this.list_page_body.page = val;
      this.get_config_List();
    },
    //单个项目的状态
    search_demand_status(val) {
      axios
          .post("/api/test_tapd/demandStatus", {"tapd_project_id": parseInt(val)})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.demand_status_arr = [];
              for (var key in res.data.data) {
                this.demand_status_arr.push({value: key, label: res.data.data[key]});
              }
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

    //获取项目状态接口
    select_project_change(val) {
      if (val) {
        axios
            .post("/api/test_tapd/demandStatus", {"tapd_project_id": parseInt(val)})
            .then((res) => {
              //api接口判断为code=10000成功
              if (res.data["code"] === 10000) {
                this.demand_status_arr = [];
                this.config_form.demand_before_status = [];
                this.config_form.demand_after_status = [];
                for (var key in res.data.data) {
                  this.demand_status_arr.push({value: key, label: res.data.data[key]});
                }
                this.config_form.demand_after_status = ["9999998"];
                this.config_form.demand_before_status = ["9999998"];
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
    //获取所有状态
    get_demand_status() {
      axios
          .post("/api/test_tapd/AllDemandStatus", this.list_page_body)
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.all_demand_status_arr = res.data.data
            } else {
              //失败提示
              this.$message.error(res.data.msg);
            }
          })
          .catch((error) => {
            console.log(error); //  错误处理 相当于error
            this.$message.error("服务器错误,请联系测试人员");
          });
    },
    //获取项目
    get_tapd_project() {
      axios
          .post("/api/test_management/prolist", this.list_page_body)
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.project = res.data.data
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
    //列表初始化钉钉通讯录
    get_mail_list() {
      axios.post('/api/test_management/mail_list', {page: 1, limit: 1000}).then((res) => {
        if (res.data.code === 10000) {
          this.ding_user_arr = res.data.items;
        }
      })
    },
    //初始化表格分页数据
    initVue() {
      this.list_page_body.page = 1;
      this.list_page_body.limit = 20;
    },
    get_tapd_name(raw) {
      let val = null;
      this.project.forEach((item) => {
        if (raw.tapd_project_id === String(item.id)) {
          val = item.project_name
        }
      })
      return val
    },
    get_ding_user_name(raw) {
      let val = null;
      this.ding_user_arr.forEach((item) => {
        console.log(raw.users, String(item.id))
        for (let i in raw.users) {
          if (raw.users[i] === item.id) {
            if (val === null) {
              val = item.ding_name
            } else {
              val += "," + item.ding_name
            }

          }
        }
      })
      return val
    },
    get_before_status_name(raw) {
      let val = '[';
      this.all_demand_status_arr.forEach((item) => {

        if (raw.tapd_project_id === item.tapd_project_id) {

          raw.demand_before_status.forEach((i) => {
            console.log(item.statusData, i)
            if (val === '[') {
              val += item.statusData[i]
            } else {
              val += "," + item.statusData[i]
            }
          })
        }
      })
      val += ']'
      return val
    },
    get_after_status_name(raw) {
      let val = '[';
      this.all_demand_status_arr.forEach((item) => {

        if (raw.tapd_project_id === item.tapd_project_id) {

          raw.demand_after_status.forEach((i) => {
            console.log(item.statusData, i)
            if (val === '[') {
              val += item.statusData[i]
            } else {
              val += "," + item.statusData[i]
            }
          })
        }
      })
      val += ']'
      return val
    },
  },

  //页面初始化渲染
  created() {
    this.initVue();
    this.get_tapd_project();
    this.get_config_List();
    this.get_mail_list();
    this.get_demand_status();
  },
};
</script>

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