<template>
  <div>
    <div>
      <Breadcrumb/>
    </div>
    <div>
      <!--      下拉start-->
      <div style="float: left; width: 100%; line-height: 60px">
        <div style="width: 100%">
          <div style="float: left; margin-left: 1%">
            <a style="font-size: 13px">任务名称</a>
            <el-input
                placeholder="请输入任务名称"
                v-model="list_page_body.taskName"
                style="width: 150px; margin-left: 10px"
                class="case_input"
            ></el-input>
          </div>

          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">任务状态</a>
            <el-select v-model="list_page_body.status" placeholder="请选择状态" clearable filterable
                       style="width: 150px; margin-left: 10px">
              <el-option label="启用" value=1></el-option>
              <el-option label="禁用" value=2></el-option>
            </el-select>
          </div>
          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">最后编辑人</a>
            <el-input
                placeholder="请输入最后编辑人"
                v-model="list_page_body.creator"
                style="width: 150px; margin-left: 10px"
                class="case_input"
            ></el-input>
          </div>
          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">最后编辑时间</a>
            <el-date-picker
                v-model="list_page_body.createTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 200px; margin-left: 10px"
            >
            </el-date-picker>
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
                    @click="addgroup"
                    v-has="{class:'115'}"
                >新增
                </el-button>
              </el-row>
            </div>
          </div>
        </div>
      </div>
      <!--      下拉end-->
      <!--表格start-->
      <div style="margin-top: 10px; float: left; width: 98%; text-align: center">
        <template>
          <!--                    border-radius: 10px;-->
          <el-table
              :data="case_data"
              style="font-size: 13px;left: 1%;border-radius: 5px;"
              :header-cell-style="{ background: '#E7EAED' }"
              height="650"
              width="98%"
              :row-style="{ height: '40px' }"
              :cell-style="{ padding: '0px' }"
              highlight-current-row="true"
              stripe="true"
              border="true"
              type="selection"
              @select="handleSelect"
              @selection-change="handleSelectionChange">
            >
            <el-table-column
                prop="task_name"
                label="任务名称"
                align="center"
                width="250"
            >
            </el-table-column>
            <el-table-column
                :formatter="status_view"
                prop="status"
                label="状态"
                align="center"
                width="80"
            >
            </el-table-column>
            <el-table-column
                prop="task_type"
                label="执行方式"
                align="center"
                width="80"
            >
            </el-table-column>
            <el-table-column
                :formatter="exec_time_type"
                prop="times"
                label="时间方案"
                align="center"
                width="200"
            >
            </el-table-column>
            <el-table-column
                :formatter="next_status_view"
                prop="execution_status"
                label="最后一次执行状态"
                align="center"
                width="150"
            >
            </el-table-column>
            <el-table-column
                prop="execution_run_time"
                label="最后一次执行时间"
                align="center"
                width="200"
            >
            </el-table-column>
            <el-table-column
                prop="next_run_time"
                label="下次执行时间"
                align="center"
                width="200"
            >
            </el-table-column>
            <el-table-column
                prop="remark"
                label="备注信息"
                align="center"
                width="200"
            >
            </el-table-column>
            <el-table-column
                prop="creator"
                label="最后编辑人"
                align="center"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="create_time"
                label="最后编辑时间"
                align="center"
                width="200"
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
                <el-button @click="putplant(scope.row,'put')" type="text" size="small"
                           v-if="scope.row.creator === user_name " v-has="{class:'116'}">编辑
                </el-button
                >
                <el-button
                    type="text"
                    @click="deletecase(scope.row)"
                    size="small"
                    v-if="scope.row.creator === user_name "
                v-has="{class:'117'}">删除
                </el-button
                >
                <el-button
                    type="text"
                    @click="excuone(scope.row)"
                    size="small"
                    v-has="{class:'118'}"
                >执行一次
                </el-button
                >
                <el-button
                    type="text"
                    @click="openexculist(scope.row)"
                    size="small"
                    v-has="{class:'119'}"
                >执行记录
                </el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <!--表格end-->
      <div style="float: right">
        <!--分页start-->
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
        <!--分页end-->
      </div>
    </div>

    <el-dialog title="执行记录" :visible.sync="plantexculistdialog" width="60%" show-footer class="abow_dialog"
               :close-on-press-escape="false"
               :close-on-click-modal="false">
      <div>
        <!--表格start-->
        <div style="margin-top: 10px; float: left; width: 100%; text-align: center">
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
                highlight-current-row="true"
                stripe="true"
                border="true"
                type="selection">
              <el-table-column
                  label="序号"
                  type="index"
                  align="center"
                  width="55"
              >
              </el-table-column>
              <el-table-column
                  prop="runtime"
                  label="执行时间"
                  align="center"
                  width="200"
              >
              </el-table-column>
              <el-table-column
                  :formatter="next_status_view"
                  prop="status"
                  label="任务状态"
                  align="center"
                  width="100"
              >
              </el-table-column>
              <el-table-column
                  prop="duration"
                  label="执行用时(秒)"
                  align="center"
                  width="100"
              >
              </el-table-column>
              <el-table-column
                  :formatter="excu_type"
                  prop="type"
                  label="执行方式"
                  align="center"
                  width="200"
              >
              </el-table-column>
              <el-table-column
                  prop="exception"
                  label="错误信息"
                  align="center"
                  width="300"
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
              :current-page="case_list_page_body.page"
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


    <!-- 用例列表dialog -->

    <el-dialog title="添加用例" :visible.sync="caselistdialog" width="72%" show-footer class="abow_dialog"
               :close-on-press-escape="false"
               :close-on-click-modal="false">
      <div>
        <!--      下拉start-->
        <div style="float: left; width: 100%; line-height: 60px">
          <div style="width: 100%">
            <div style="float: left; margin-left: 10px">
              <a style="font-size: 10px">项目名称</a>
              <el-select v-model="case_list_page_body.projectId" clearable filterable
                         style="width: 150px; margin-left: 10px">
                <el-option label="erp商业化项目" value="32444113"></el-option>
                <el-option label="开放平台" value="beijing"></el-option>
              </el-select>
            </div>

            <div style="float: left; margin-left: 10px">
              <a style="font-size: 10px">用例名称</a>
              <el-input
                  placeholder="请输入用例名称"
                  v-model="case_list_page_body.name"
                  style="width: 140px; margin-left: 10px"
                  class="case_input"
              ></el-input>
            </div>

            <div style="float: left; margin-left: 10px">
              <a style="font-size: 10px">用例类型</a>
              <el-select v-model="case_list_page_body.tag" placeholder="请选择用例类型" clearable filterable
                         style="width: 150px; margin-left: 10px">
                <el-option label="冒烟用例" value="regress"></el-option>
                <el-option label="回归用例" value="dontknow"></el-option>
              </el-select>
            </div>

            <div style="float: left; margin-left: 10px">
              <a style="font-size: 10px">所属模块</a>
              <el-select v-model="case_list_page_body.module" placeholder="请选择所属模块" clearable filterable
                         style="width: 150px; margin-left: 10px">
                <el-option label="仓库" value="warehouse"></el-option>
                <el-option label="商品" value="goods"></el-option>
              </el-select>
            </div>

            <div style="float: left; padding: 5px">
              <!-- <div style="width: 100px;float: right;margin-top: 10px;height: 40px;text-align: center;"> -->
              <!-- <el-row> -->
              <el-button
                  plain
                  icon="el-icon-search"
                  @click="handleCurrentChangeCase(1)"
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
                      @click="ok"
                  >确定
                  </el-button>
                </el-row>
              </div>
            </div>
          </div>
        </div>
        <!--      下拉end-->
        <!--表格start-->
        <div style="margin-top: 10px; float: left; width: 100%; text-align: center">
          <template>
            <!--                    border-radius: 10px;-->
            <el-table
                :data="caselistdata"
                style="font-size: 13px"
                :header-cell-style="{ background: '#E7EAED' }"
                height="500"
                width="100%"
                :row-style="{ height: '40px' }"
                :cell-style="{ padding: '0px' }"
                highlight-current-row="true"
                stripe="true"
                border="true"
                type="selection"
                @select="handleSelectCase"
                @selection-change="handleSelectionChangeCase">
              >
              <el-table-column
                  type="selection"
                  width="55">
              </el-table-column>
              <el-table-column
                  prop="name"
                  label="用例名称"
                  align="center"
                  width="400"
              >
              </el-table-column>
              <el-table-column
                  prop="module"
                  label="所属模块"
                  align="center"
                  width="100"
              >
              </el-table-column>
              <el-table-column
                  prop="url"
                  label="请求地址"
                  align="center"
                  width="300"
              >
              </el-table-column>
              <el-table-column
                  prop="tag"
                  label="所属标签"
                  align="center"
                  width="100"
              >
              </el-table-column>
              <el-table-column
                  prop="source"
                  label="用例来源"
                  align="center"
                  width="100"
              >
              </el-table-column>
              <el-table-column
                  prop="creator_nickname"
                  label="创建人"
                  align="center"
                  width="100"
              >
              </el-table-column>
              <el-table-column
                  prop="created_time"
                  label="创建时间"
                  align="center"
                  width="200"
              >
              </el-table-column>
            </el-table>
          </template>
        </div>
        <!--表格end-->
        <div style="float: right">
          <!--分页start-->
          <el-pagination
              v-on:size-change="handleSizeChangeCase"
              v-on:current-change="handleCurrentChangeCase"
              :current-page="case_list_page_body.page"
              :page-sizes="[10, 20, 50]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="case_total"
              style="float: right; margin-top: 10px; margin-right: 20px"
          ></el-pagination>
          <!--分页end-->
        </div>
      </div>
    </el-dialog>

    <el-dialog
        :visible.sync="dialogVisible"
        width="300px;"
        show-footer
        @opened="openform"
        @closed="formdialogclosed"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
    >
      <span slot="title" style="font-size:20px;">{{ title }}</span>
      <el-form
          :model="ruleForm"
          :rules="rules"
          inline-message="true"
          status-icon="true"
          ref="ruleForm"
          label-width="auto"
      >
        <el-form-item label="任务名称" prop="task_name">
          <el-input
              v-model="ruleForm.task_name"
              placeholder="请输入任务名称"
              style="width:150px"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio v-model="ruleForm.status" label='1'>启用</el-radio>
          <el-radio v-model="ruleForm.status" label='2'>禁用</el-radio>
        </el-form-item>

        <el-form-item label="选择任务" prop="regjob_id">
          <el-select clearable filterable v-model="ruleForm.regjob_id" placeholder="请选择任务">
            <el-option
                v-for="item in task_list"
                :key="item.id"
                :label="item.task_name"
                :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="执行政策" prop="task_type">
          <el-select clearable filterable v-model="ruleForm.task_type" placeholder="请选择状态" @change="chose_plan_policy">
            <el-option label="固定周期" value="cron"></el-option>
            <el-option label="间隔周期" value="interval"></el-option>
            <el-option label="执行一次" value="date"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="执行时间" id='times' style="margin-top: 22px;display: none;" prop="times">
          <el-input
              type="textarea"
              autosize
              @blur="jsonprint('times')"
              v-model="ruleForm.times"
              placeholder='请输入单接口执行时的接口参数，使用键值对形式，例如{"status":200}'
          ></el-input>
        </el-form-item>

        <el-form-item label="执行时间" id="date_time" style="margin-top:22px;display: none;" prop="datetimes">
          <el-col :span="7">
            <el-date-picker v-model="ruleForm.datetimes" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="执行参数" prop="args">
          <el-input
              type="textarea"
              autosize
              v-model="ruleForm.args"
              placeholder='请输入执行参数，以"[]"形式'
          ></el-input>
        </el-form-item>

        <el-form-item label="备注信息" prop="remark">
          <el-input
              type="textarea"
              autosize
              v-model="ruleForm.remark"
              placeholder='请输入备注信息'
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
          >确定
          </el-button
          >
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import axios from "axios";
import api from '@/api/api.js';

export default {
  components: {Breadcrumb},
  name: "Task_manage",
  data() {
    //   const checkJson = (rule, value, callback) => {
    //     if(this.ruleForm.task_type == 'cron' || this.ruleForm.task_type == 'interval'){
    //       try {
    //       if (this.ruleForm.times) {
    //         var str = JSON.parse(value);
    //         if (typeof str == "number") {
    //           callback(new Error("json格式错误"));
    //         }
    //       }
    //     } catch (e) {
    //       callback(new Error("json格式错误"));
    //     }
    //   }
    // }

    return {
      user_name: "",
      //分页请求数据
      list_page_body: {
        page: 1,
        limit: 20,
      },
      case_list_page_body: {
        page: 1,
        size: 10,
        projectId: "32444113",
      },
      plant_excu_list_page_body: {
        page: 1,
        limit: 10,
      },
      env_options: [
        {
          value: "daily",
          label: "日常环境",
          children: [{value: "daily", label: "日常环境"}],
        },
        {
          value: "nextop-pre",
          label: "预发环境",
          children: [{value: "nextop-pre", label: "预发环境"}]
        },
        {
          value: "nextop-prod",
          label: "生产环境",
          children: [{value: "nextop-prod", label: "生产环境"}]
        },
        {
          value: "test",
          label: "联调环境",
          children: [
            {value: "e125yuio", label: "e125yuio"},
            {value: "e126yuio", label: "e126yuio"},
            {value: "e127yuio", label: "e127yuio"},
            {value: "e128yuio", label: "e128yuio"},
          ]
        }
      ],
      case_name: "",
      case_createor: "",
      case_tags: "",
      case_data: [],
      total: 0,
      case_total: 0,
      excu_total: 0,
      envForm: {env: ""},
      excutionrow: {},
      dialogVisible: false,
      env_options_dislog: false,
      caselistdialog: false,
      plantexculistdialog: false,
      plantexculistdata: '',
      title: "新增任务",
      env_conf: 0,
      selectcheck: [],
      selectcheckCase: [],
      caselistdata: [],
      task_list: [],
      is_case: "点击选择",
      ruleForm: {
        status: '1',
      },
      rules: {
        task_name: [
          {required: true, message: "请输入任务名称", trigger: "blur"},
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur",
          }
        ],
        status: [{required: true, message: "请选择任务状态", trigger: "blur"}],
        regjob_id: [{required: true, message: "请选择任务", trigger: "blur"}],
        task_type: [{required: true, message: "请选择执行方式", trigger: "blur"}],
        // times: [{validator: checkJson,message: "请输入正确的json格式执行时间",trigger: "blur",}]
      },
      style: "height:" + (document.body.clientHeight - 60) + "px",
    };
  },
  methods: {
    async get_task() {

      let response = await api.get_task_list(this.list_page_body)
      this.task_list = response.data
      console.log(this.task_list)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          try {
            if (this.ruleForm.times) {
              this.ruleForm.times = JSON.parse(this.ruleForm.times);
            }
          } catch {
            // pass
          }
          this.ruleForm.args = eval(this.ruleForm.args)
          if (this.title == '编辑任务') {
            axios.put("/api/test_plant/update_job", this.ruleForm).then((res) => {
              if (res.data.code == 10000) {
                this.$message({
                  duration: 2000,
                  message: res.data.msg,
                  type: "success",
                });
                this.dialogVisible = false;
                this.handleCurrentChange(1);
              } else {
                this.$message.error(res.data.msg);
              }
            })
          } else {
            axios.post("/api/test_plant/create_job", this.ruleForm).then((res) => {
              console.log(res.data.code == 10000);
              if (res.data.code == 10000) {
                this.$message({
                  duration: 2000,
                  message: res.data.msg,
                  type: "success",
                });
                this.dialogVisible = false;
                this.handleCurrentChange(1);
              } else {
                this.$message.error(res.data.msg);
              }
            })
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    openexculist(row) {
      this.plantexculistdialog = true
      this.plant_excu_list_page_body.excu_id = row.id
      this.get_plant_excu_list()

    },
    jsonprint(input_name) {
      console.log(input_name);
      if (this.ruleForm[input_name]) {
        try {
          var val = JSON.parse(this.ruleForm[input_name].replace(/'/g, '"'));
          if (typeof val == "number" || JSON.stringify(val) == "{}") {
            return false;
          } else {
            this.ruleForm[input_name] = JSON.stringify(val, null, 4);
          }
        } catch {
          return false;
        }
      }
    },
    chose_plan_policy(val) {
      console.log(this.ruleForm)
      if (val === "cron") {
        document.getElementById("times").style.display = 'block';
        this.$set(this.ruleForm, 'times', '{"year":"2022","month":"1-12","day_of_week":"mon-fri","hour":"1-23","minute":"1-59","second":"10"}')
      } else if (val === "interval") {
        document.getElementById("times").style.display = 'block';
        this.$set(this.ruleForm, 'times', '{"weeks":0,"days":0,"hours":0,"minutes":0,"seconds":0}')
      } else if (val === "date") {
        this.$set(this.ruleForm, 'datetimes', '')
        document.getElementById("times").style.display = 'none';
        document.getElementById("date_time").style.display = 'block';
      } else {
        this.$set(this.ruleForm, 'now', '')
        document.getElementById("times").style.display = 'none';
        document.getElementById("date_time").style.display = 'none';
      }
      console.log(this.ruleForm)
    },
    chose_case_tags() {
    },
    excuone(row) {
      axios.post('/api/test_plant/execution_one_job', {excu_id: row.id}).then(
          (res) => {
            if (res.data.code == 10000) {
              this.$message(
                  {
                    duration: 2000,
                    message: res.data.msg,
                    type: "success",
                  }
              )
            } else {
              this.$message.error(res.data.msg)
            }
          }
      )
    },
    onJsonChange(value) {
      console.log("value:", value);
    },
    onJsonSave(value) {
      console.log("value:", value);
    },
    get_plant_excu_list() {
      axios.post('/api/test_plant/job_executions_list', this.plant_excu_list_page_body).then((res) => {
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
    get_plant_list() {
      axios
          .post("/api/test_plant/ScheduledTaskExcuList", this.list_page_body)
          .then((res) => {
            if (res.data["code"] == 10000) {
              this.case_data = res.data["data"];
              this.total = res.data["count"];
              this.is_data = true;
            } else {
              this.is_data = false;
              this.$message.error(res.data.msg);
            }
          })
          .catch(() => {
            this.is_data = false;
            this.$message.error("服务器错误，请联系测试人员");
          });
    },
    //页量切换
    handleSizeChange(val) {
      this.list_page_body.limit = val;
      // this.getList();
      this.get_plant_list();
    },
    //页码切换
    handleCurrentChange(val) {
      this.list_page_body.page = val;
      this.get_plant_list();
    },

    //页量切换
    handleSizeChangeExcu(val) {
      this.plant_excu_list_page_body.limit = val;
      // this.getList();
      this.get_plant_excu_list();
    },
    //页码切换
    handleCurrentChangeExcu(val) {
      this.plant_excu_list_page_body.page = val;
      this.get_plant_excu_list();
    },

    //页量切换
    handleSizeChangeCase(val) {
      this.case_list_page_body.size = val;
      // this.getList();
      this.caselist();
    },
    //页码切换
    handleCurrentChangeCase(val) {
      this.case_list_page_body.page = val;
      this.caselist();
    },
    openform() {
      if (this.ruleForm.task_type === "cron") {
        document.getElementById("times").style.display = 'block';
        this.$set(this.ruleForm, 'times', this.ruleForm.times)
      } else if (this.ruleForm.task_type === "interval") {
        console.log(222)
        document.getElementById("times").style.display = 'block';
        this.$set(this.ruleForm, 'times', this.ruleForm.times)
      } else if (this.ruleForm.task_type === "date") {
        this.$set(this.ruleForm, 'datetimes', this.ruleForm.exec_time)
        document.getElementById("times").style.display = 'none';
        document.getElementById("date_time").style.display = 'block';
      } else {
        document.getElementById("times").style.display = 'none';
        document.getElementById("date_time").style.display = 'none';
      }
      console.log(this.ruleForm)
    },
    putplant(row, type) {
      if (this.$refs.ruleForm) {
        this.$refs.ruleForm.clearValidate();
      }
      this.ruleForm = JSON.parse(JSON.stringify(row));
      if (this.ruleForm.task_type == 'date') {
        this.ruleForm.datetimes = this.ruleForm.times
      }
      this.ruleForm.status = String(row.status)
      this.ruleForm.regjob_id = row.regjob_id
      this.ruleForm.excu_id = row.id
      if (type == 'copy') {
        this.title = '复制任务'

      } else {
        this.title = '编辑任务'
      }
      this.dialogVisible = true;
    },
    addgroup() {
      if (this.$refs.ruleForm) {
        this.$refs.ruleForm.clearValidate();
      }
      this.title = '新增任务'
      this.ruleForm = {
        status: '1',
        times: '',
        datetimes: '',
        task_type: '',
        task_name: '',
        regjob_id: '',
        args: "[]",
        remark: ''

      };
      this.dialogVisible = true;
    },
    formdialogclosed() {
      this.ruleForm = {
        status: '1',
        times: '',
        datetimes: '',
        task_type: '',
        task_name: '',
        regjob_id: '',
        args: "[]",
        remark: ''

      };
      document.getElementById("times").style.display = 'none';
      document.getElementById("date_time").style.display = 'none';
    },
    deletecase(row) {
      axios.post("/api/test_plant/delete_job", {excu_id: row.id}).then((res) => {
        if (res.data["code"] == 10000) {
          this.handleCurrentChange(1);
          this.$message({
            duration: 2000,
            message: res.data.msg,
            type: "success",
          });
        } else {
          this.is_data = false;
          this.$message.error(res.data.msg);
        }
      });
    },
    selectEnv(row) {
      this.env_conf = 1;
      this.env_options_dislog = true;
      this.excutionrow = row;
    },
    handleSelect(selection, row) {
      if (selection.indexOf(row) != -1) {
        row.state = 1
      } else {
        row.state = 0
      }
    },
    handleSelectCase(selection, row) {
      if (selection.indexOf(row) != -1) {
        row.state = 1
      } else {
        row.state = 0
      }
    },
    moregroup() {
      if (this.selectcheck.length != 0) {
        this.env_conf = 2
        this.env_options_dislog = true
      } else {
        this.$message.error('请先选择组合')
      }
    },
    ok() {
      if (this.selectcheckCase.length != 0) {
        this.caselistdialog = false
        for (let i in this.selectcheckCase) {
          if (parseInt(this.selectcheckCase[i].id) in this.ruleForm.case_list) {
            continue
          } else {
            this.ruleForm.case_list.push(parseInt(this.selectcheckCase[i].id))
          }
        }
        this.is_case = "已选择" + this.ruleForm.case_list.length + "条用例,点击继续增加"
      } else {
        this.$message.error('请先选择用例')
      }
    },
    handleSelectionChange(val) {
      this.selectcheck = val
    },
    handleSelectionChangeCase(val) {
      this.selectcheckCase = val
    },
    caselist() {
      this.caselistdialog = true
      axios.get('/api/api_case/case', {params: this.case_list_page_body}).then((res) => {
        this.caselistdata = res.data.items.data
        this.case_total = res.data.items.totalNum
      })
      console.log(this.caselistdata)
    },
    clearcaselist() {
      this.ruleForm.case_list = []
      this.is_case = "点击选择"
    },
    next_status_view(raw) {
      if (raw.execution_status == "Executed" || raw.status == "Executed") {
        return '正常执行'
      } else if (raw.execution_status == "Error!" || raw.status == "Error!") {
        return '错误'
      } else if (raw.execution_status == "Started execution" || raw.status == "Started execution") {
        return '执行中'
      } else if (raw.execution_status == "Missed!" || raw.status == "Missed!") {
        return '跳过'
      }
    },
    status_view(raw) {
      if (raw.status == 1) {
        return '启用'
      } else {
        return '禁用'
      }
    },
    excu_type(raw) {
      if (raw.type == 1) {
        return '自动执行'
      } else {
        return '手动触发'
      }
    },
    get_user_name() {
      this.user_name = localStorage.getItem('username')
    },
    // exec_time_type(raw){
    //   if(raw.exec_type == 'date'){
    //     return raw.times
    //   }else if(raw.exec_type == 'now'){
    //     return '-'
    //   }else{
    //     return raw.times
    //   }
    // }

  },
  created() {
    this.get_plant_list();
    this.get_task();
    this.get_user_name();
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
  height: 90%;
  overflow: hidden;

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