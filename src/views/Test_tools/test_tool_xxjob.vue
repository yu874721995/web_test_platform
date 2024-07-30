<template>
  <div>
    <div>
      <div>
        <Breadcrumb />
      </div>
    </div>

    <div style="float: left; width: 100%; line-height: 60px">
      <div style="width: 100%">
        <div style="float: left; margin-left: 1%">
          <a style="font-size: 13px">所属环境</a>
          <el-select
            v-model="list_page_body.env"
            ref="Assembly_typeSelect"
            placeholder="请选择所属环境"
            clearable
            filterable
            style="width: 150px; margin-left: 10px"
          >
            <el-option
              v-for="item in envs"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>

        <div style="float: left; margin-left: 1%">
          <a style="font-size: 13px">任务组名称</a>
          <el-input
            placeholder="请输入任务组名称"
            v-model="list_page_body.group_name"
            style="width: 150px; margin-left: 10px"
            class="case_input"
          ></el-input>
        </div>

        <div style="float: left; margin-left: 10px">
          <a style="font-size: 13px">任务名称</a>
          <el-input
            placeholder="请输入任务名称"
            v-model="list_page_body.job_name"
            style="width: 150px; margin-left: 10px"
            class="case_input"
          ></el-input>
        </div>

        <div style="float: left; padding-left: 5px">
          <el-button plain icon="el-icon-search" @click="handleCurrentChange(1)"
            >查询</el-button
          >
        </div>

        <!-- <div style="float: right; margin-right: 10px">
          <div style=" width: 100px; float: right; margin-top: 10px; height: 40px; text-align: center; ">
            <el-button type="primary" size="small" style="background-color: #3573fe" @click="init">
              新增配置
            </el-button>
          </div>
        </div> -->
      </div>
    </div>
    <!--表格start-->
    <div>
      <div
        style="margin-top: 10px; float: left; width: 98%; text-align: center"
      >
        <template>
          <el-table
            :data="build_data"
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
              label="所属环境"
              :formatter="env"
              prop="env"
              align="center"
              width="200"
            ></el-table-column>

            <el-table-column
              prop="group_name"
              label="所属任务组"
              align="center"
              width="200"
            ></el-table-column>

            <el-table-column
              prop="job_name"
              label="任务名称"
              align="center"
              width="200"
            >
            <template slot-scope="scope">
                  <el-link target="_blank" type="primary" v-bind:href="'http://xxl-job-admin.erp-'+format_env(scope.row.env)+'.yintaerp.com/xxl-job-admin/joblog?jobId='+scope.row.job_id">{{ scope.row.job_name }}</el-link>
                </template>
              </el-table-column>

            <el-table-column
              prop="job_status"
              label="任务状态"
              align="center"
              width="200"
              :formatter="job_status"
            ></el-table-column>

            <el-table-column
              prop="job_owner"
              label="任务负责人"
              align="center"
              width="200"
            ></el-table-column>

            <el-table-column
              prop="job_popid_list"
              label="任务注册节点"
              align="center"
              width="300"
            ></el-table-column>

            <el-table-column
              prop="job_parmes"
              label="任务预置参数"
              align="center"
              width="300"
            ></el-table-column>

            <el-table-column
              style="background-color: #ffffff"
              fixed="right"
              label="操作"
              width="250"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  @click="build_job(scope.row)"
                  type="text"
                  size="small"
                  v-has="{class:'55'}"
                  >执行一次</el-button
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

    <el-dialog
      :visible.sync="build_xxjob_dialog"
      show-footer
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      style="height: 500px; margin: auto; width: 65%"
    >
      <span slot="title" style="font-size: 20px; float: left">{{ title }}</span>

      <el-form
        ref="build_form"
        :model="build_form"
        label-width="auto"
        :inline-message="true"
        :status-icon="true"
        style="float: left; width: 100%"
      >
        <el-form-item label="执行参数" prop="job_parmes">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="build_form.job_parmes"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="执行路径" prop="popType">
          <el-cascader
            style="float: left; width: 45%"
            v-model="build_form.popType"
            :options="popType_options"
            @change="handleChange"
          ></el-cascader>
          <el-cascader
            style="float: left; width: 45%"
            v-model="build_form.popId"
            :options="popId_options"
            filterable
          ></el-cascader>
        </el-form-item>

        <el-form-item>
          <div style="float: left">
            <el-button type="primary" @click="build_xxjob_now">确定</el-button>
            <el-button
              @click="
                build_xxjob_dialog = false;
                job_popid_data = [];
              "
              >取消</el-button
            >
          </div>
        </el-form-item>
      </el-form>
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
      //分页请求数据
      list_page_body: {
        page: 1,
        limit: 20,
        useType: 1,
      },
      envs:[
        { value: 1, label: "联调环境" },
        { value: 2, label: "预发环境" },
      ],
      popType_options: [
        { value: 1, label: "注册地址" },
        { value: 2, label: "使用流水线POPID" },
      ],
      project_format: {
        devtest: "联调环境",
        pre: "预发环境",
      },
      //是否有数据
      is_data: false,
      popId_options: [],
      job_popid_list: [],
      job_popid_data: [],
      bkci_list_data: [],
      build_xxjob_dialog: false,
      //表格
      build_data: [],
      //总条数
      total: 0,
      title: "执行一次",
      build_form: { popType: 1 ,job_parmes:""},
    };
  },
  methods: {
    format_env(env){
      let envVal = '';
      if(env==1){
        envVal = 'sit'
      }else{
        envVal = 'uat'
      }
      return envVal
    },
    get_xxjob_List() {
      axios
        .post("/api/test_tools/xxjob_list", this.list_page_body)
        .then((res) => {
          //api接口判断为code=10000成功
          if (res.data["code"] === 10000) {
            this.build_data = res.data.data;
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
    build_job(raw) {
      let data = JSON.parse(JSON.stringify(raw))
      this.popId_options = [];
      this.job_popid_data = [];
      this.build_form.job_id = data.job_id;
      this.build_form.popType = 1;
      this.build_form.env = data.env;
      this.build_form.job_parmes = data.job_parmes;
      this.job_popid_list = eval(data.job_popid_list);
      this.job_popid_list.forEach((element) => {
        let dicts = {};
        dicts.value = element;
        dicts.label = element;
        this.job_popid_data.push(dicts);
      });
      console.log(this.popId_options);
      this.build_xxjob_dialog = true;
      this.popId_options = this.job_popid_data;
    },
    handleChange(raw) {
      if (raw[0] == 2) {
        this.popId_options = this.bkci_list_data;
      } else {
        this.popId_options = this.job_popid_data;
      }
      console.log(this.popId_options);
    },
    //页量切换
    handleSizeChange(val) {
      this.list_page_body.limit = val;
      this.get_xxjob_List();
    },
    //页码切换
    handleCurrentChange(val) {
      this.list_page_body.page = val;
      this.get_xxjob_List();
    },
    get_bkci_list() {
      axios
        .post("/api/test_tools/list", {
          page: 1,
          limit: 10000,
          project: "devtest",
        })
        .then((res) => {
          //api接口判断为code=10000成功
          if (res.data["code"] === 10000) {
            res.data.data.forEach((item) => {
              let bkci_data = {};
              if (item.popId && item.popId != "") {
                bkci_data.value = "http://" + item.popId + ":9999/";
                bkci_data.label =
                  this.project_format[item.project] + "-" + item.Assembly_name;
                this.bkci_list_data.push(bkci_data);
              }
            });
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
    env(raw) {
      let val = "";
      this.envs.forEach((item) => {
        if (raw.env === item.value) {
          val = item.label;
        }
      });
      return val;
    },
    job_status(raw) {
      let val = "";
      const status_data = [
        { value: 1, label: "定时执行" },
        { value: 2, label: "停止执行" },
      ];
      status_data.forEach((item) => {
        if (raw.job_status === item.value) {
          val = item.label;
        }
      });
      return val;
    },
    build_xxjob_now() {
      axios
        .post("/api/test_tools/build_xxjob", this.build_form)
        .then((res) => {
          //api接口判断为code=10000成功
          if (res.data["code"] === 10000) {
            this.$message({
              duration: 2000,
              message: res.data.msg,
              type: "success",
            });
            this.is_data = true;
            this.build_xxjob_dialog = false;
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
  },

  //页面初始化渲染
  created() {
    this.get_xxjob_List();
    this.get_bkci_list();
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