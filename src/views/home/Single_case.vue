<template>
  <div>
    <div>
      <Breadcrumb/>
    </div>
    <div>

      <!--搜索start-->
      <div style="float: left; width: 100%; line-height: 60px">
        <div style="width: 100%">

          <div style="float: left; margin-left: 1%;">
            <a style="font-size: 13px">项目名称</a>
            <el-select v-model="project_name" clearable filterable style="width: 150px; margin-left: 10px"
                       @change="search_select_project">
              <el-option v-for="item in project_list" :key="item.id" :label="item.project_name" :value="item.id">
              </el-option>
            </el-select>
          </div>

          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">用例名称</a>
            <el-input placeholder="请输入用例名称" clearable v-model="list_page_body.name"
                      style="width: 150px; margin-left: 10px"
                      class="case_input"></el-input>
          </div>

          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">接口路径</a>
            <el-input placeholder="请输入接口地址" clearable v-model="list_page_body.url"
                      style="width: 150px; margin-left: 10px"
                      class="case_input"></el-input>
          </div>

          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">用例类型</a>
            <el-select v-model="list_page_body.tag" clearable placeholder="请选择" style="width: 150px; margin-left: 10px">
              <el-option
                  v-for="item in tags"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">所属模块</a>
            <el-cascader
                v-model="list_page_body.module"
                style="width: 150px;margin-left: 10px;"
                :options="module_options"
                :props="{ value: 'id', label: 'name',multiple: true, checkStrictly: true}"
                collapse-tags
                :show-all-levels="false"
                clearable
            ></el-cascader>
          </div>

          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">创建人</a>
            <el-input placeholder="请输入创建人" clearable v-model="list_page_body.create_user"
                      style="width: 150px; margin-left: 10px"
                      class="case_input"></el-input>
          </div>

          <div style="float: left; padding-left: 5px">
            <el-button plain icon="el-icon-search" @click="handleCurrentChange(1)">查询</el-button>
          </div>

        </div>
      </div>
      <!--搜索end-->
      <div>
        <el-button type="primary" style="float: right; margin-right: 20px; background-color: #3573fe;" size="small"
                   @click="addcase">添加用例
        </el-button>
        <el-button type="primary" style="float: right; margin-right: 10px; background-color: #3573fe;" size="small"
                   @click="env_options_dislog=true">批量执行
        </el-button>
      </div>
      <!--列表start-->
      <div style="margin-top: 10px; float: left; width: 98%; text-align: center">
        <template>
          <!--border-radius: 10px;-->
          <el-table :data="case_data" :v-loading="isLoading" style="font-size: 13px;left: 1%;border-radius: 5px;"
                    :header-cell-style="{ background: '#E7EAED' }"
                    height="650" width="98%" :row-style="{ height: '40px' }" :cell-style="{ padding: '0px' }"
                    :highlight-current-row="true" :stripe="true" :border="true"
                    type="selection" @select="handleSelect" @selection-change="handleSelectionChange">

            <el-table-column type="selection" align="center" width="50"></el-table-column>

            <el-table-column prop="id" label="用例id" align="center" width="60"></el-table-column>

            <el-table-column :formatter="get_module_name" prop="module" label="所属模块" align="center"
                             width="160"></el-table-column>

            <el-table-column prop="req_method" label="请求方法" align="center" width="80"></el-table-column>

            <el-table-column prop="name" label="用例名称" align="center" width="300"></el-table-column>

            <el-table-column prop="delay_time" label="延时(s)" align="center" width="70"></el-table-column>

            <el-table-column prop="url" label="接口路径" align="center" width="330"></el-table-column>

            <el-table-column prop="tag" label="用例类型" align="center" width="100"
                             :formatter="get_tag_name"></el-table-column>

            <el-table-column prop="source" label="用例来源" align="center" width="80"></el-table-column>

            <el-table-column prop="result" label="执行结果" align="center" width="80">
              <template slot-scope="scope">
                <button @click="single_case_result(scope.row)"
                        style="background-color: transparent;border:0;font-size: 10px;color: #409EFF">
                  {{ scope.row.result }}
                </button>
              </template>
            </el-table-column>

            <el-table-column prop="creator_nickname" label="创建人" align="center" width="110"></el-table-column>

            <el-table-column prop="created_time" label="创建时间" align="center" width="180"></el-table-column>

            <el-table-column label="操作" align="center" fixed="right" width="180">
              <template slot-scope="scope">
                <el-button @click="putcase(scope.row, 'put')"
                           v-if="scope.row.creator_nickname === user_name || user_name ==='yude.gu' || user_name ==='yulong.wang'"
                           type="text" size="small">编辑
                </el-button>

                <el-button @click="putcase(scope.row, 'copy')" type="text" size="small">复制</el-button>

                <el-button type="text" @click="deletecase(scope.row)"
                           v-if="scope.row.creator_nickname === user_name || user_name ==='yude.gu' || user_name ==='yulong.wang'"
                           size="small" style="color: red">删除
                </el-button>

                <el-button type="text" @click="selectEnv(scope.row)" size="small">执行</el-button>
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


    <!--用例编辑窗start-->
    <el-dialog
        :visible.sync="dialogVisible"
        width="1000px"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        style="margin-top: 20px;height: 102%"
        @close="dialogVisible=false"

    >
      <span slot="title" style="font-size: 20px">{{ title }}</span>

      <el-form :model="ruleForm" :rules="rules" :inline-message="true" :status-icon="true" ref="ruleForm"
               label-width="auto">

        <el-form-item label="用例名称" prop="name" style="width: 450px;float: left;">
          <el-input v-model="ruleForm.name" placeholder="请详细输入用例名称" style="width: 300px;"></el-input>
        </el-form-item>

        <el-form-item label="接口路径" prop="url" style="width: 450px;float: left;">
          <el-input v-model="ruleForm.url" placeholder="请输入域名后面的接口url路径" style="width: 300px;"></el-input>
        </el-form-item>

        <el-form-item label="延时时间" prop="delay_time" style="width: 450px;float: left;">
          <el-input v-model="ruleForm.delay_time" placeholder="请详延时时间(数字)" type="number"
                    style="width: 300px;"></el-input>
        </el-form-item>

        <el-form-item label="选择job" prop="delay_time" style="width: 300px;float: left;">
          <!--          <el-input v-model="ruleForm.job_id" placeholder="按需选择job" disabled-->
          <!--                    style="width: 300px;" @click.native="job_click"></el-input>-->
          <el-cascader
              style="width: 300px"
              v-model="ruleForm.job_id"
              :options="job_arr"
              filterable
              :disabled="changejob"
              @click.native="job_click"
              @change="job_handle_change"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="所属项目" prop="project_id" style="width: 300px;float: left;">
          <el-select v-model="ruleForm.project_id" clearable filterable style="width: 150px;float:left;"
                     @change="add_select_project">
            <el-option v-for="item in project_list" :key="item.id" :label="item.project_name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用例类型" prop="tag" style="width: 300px;float: left;">
          <el-select v-model="ruleForm.tag" multiple clearable filterable placeholder="请选择"
                     style="width: 150px;float: left;">
            <el-option v-for="item in tags" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属模块" prop="module" style="width: 300px;float: left;">
          <el-cascader
              v-model="ruleForm.module"
              style="width: 150px;float: left;"
              :options="module_options"
              :props="{ value: 'id', label: 'name'}"
              collapse-tags
              :show-all-levels="false"
              clearable
          ></el-cascader>
        </el-form-item>


        <el-form-item label="请求方式" prop="req_method" style="width: 100%;float: left;">
          <el-radio-group v-model="ruleForm.req_method">
            <el-radio v-model="ruleForm.req_method" label="GET">GET</el-radio>
            <el-radio v-model="ruleForm.req_method" label="POST">POST</el-radio>
            <el-radio v-model="ruleForm.req_method" label="PUT">PUT</el-radio>
            <el-radio v-model="ruleForm.req_method" label="DELETE">DELETE</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="启用job" prop="use_job" style="width: 300px;float: left;">
          <el-radio-group v-model="ruleForm.use_job" @change="selectJobChange($event)">
            <el-radio v-model="ruleForm.use_job" label="1">启用</el-radio>
            <el-radio v-model="ruleForm.use_job" label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>

        <div id="header_menu_div"
             style="margin-left: 0; flex-direction: column; width: 100%;height: 440px;float: left;">

          <el-form-item label="单接口参数" prop="single_body" style="float: left;width: 100%;height: 300px;">
            <vue-json-editor v-model="ruleForm.single_body" :key="key" :mode="'code'"
                             @has-error="json_editor_error($event,'single_body')"
                             style="float: left;width: 100%;height: 300px;">
            </vue-json-editor>
          </el-form-item>


          <el-form-item label="多接口参数" prop="group_body" style="float: left;width: 100%;height: 300px;">
            <vue-json-editor v-model="ruleForm.group_body" :key="key" :mode="'code'"
                             style="float: left;width: 100%;height: 300px;"
                             @has-error="json_editor_error($event,'group_body')" lang="zh">
            </vue-json-editor>
          </el-form-item>

          <div style="z-index:6666;position: fixed;margin-left: 700px;margin-top: 300px;float: left;">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
              <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>
          </div>

          <el-form-item label="断言" prop="assert_res" style="float: left;width: 100%;height: 200px;">
            <vue-json-editor v-model="ruleForm.assert_res" :key="key" :mode="'code'"
                             style="float: left;width: 100%;height: 200px;"
                             @has-error="json_editor_error($event,'assert_res')" lang="zh"></vue-json-editor>
          </el-form-item>

          <el-form-item label="前置SQL" prop="pre_sql" style="float: left;width: 100%;height: 200px;">
            <vue-json-editor v-model="ruleForm.pre_sql" :key="key" :mode="'code'"
                             style="float: left;width: 100%;height: 200px;"
                             @has-error="json_editor_error($event,'pre_sql')" lang="zh"></vue-json-editor>
          </el-form-item>

          <el-form-item label="后置SQL" prop="end_sql" style="float: left;width: 100%;height: 200px;">
            <vue-json-editor v-model="ruleForm.end_sql" :key="key" :mode="'code'"
                             style="float: left;width: 100%;height: 200px;"
                             @has-error="json_editor_error($event,'end_sql')" lang="zh"></vue-json-editor>
          </el-form-item>

          <el-form-item label="提取参数" prop="extract_param" style="float: left;width: 100%;height: 200px;">
            <vue-json-editor v-model="ruleForm.extract_param" :key="key" :mode="'code'"
                             style="float: left;width: 100%;height: 200px;"
                             @has-error="json_editor_error($event,'extract_param')" lang="zh"></vue-json-editor>
          </el-form-item>
        </div>


      </el-form>
    </el-dialog>
    <!--用例编辑窗end-->

    <!--    xxjob选择弹框-->
    <el-dialog
        :visible.sync="job_parm_dis"
        show-footer
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        style="height: 700px; margin: auto; width: 90%;"
    >
      <span slot="title" style="font-size: 20px; float: left">job执行参数<b style="font-size: 14px;">--(优先使用流水线，再用job地址)</b></span>

      <el-form
          ref="ruleForm"
          :model="job_form"
          label-width="auto"
          :inline-message="true"
          :status-icon="true"
          style="float: left; width: 100%"
      >
        <el-form-item label="xxjob" prop="xxjob">
          <el-cascader
              style="float: left;width: 90%;"
              v-model="job_form.job_id"
              :options="job_arr"
              filterable
              @change="job_handle_change"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="使用job地址" prop="popId">
          <el-cascader
              style="float: left;width: 90%;"
              v-model="job_form.popId"
              :options="job_run_id_data"
              placeholder="请先选择自带的执行xxjob地址"
              filterable
              clearable
          ></el-cascader>
        </el-form-item>

        <el-form-item label="使用流水线" prop="liushuixian_id">
          <el-cascader
              style="float: left;width: 90%;"
              v-model="job_form.liushuixian_id"
              :options="liushuixian_arr"
              placeholder="使用流水线会自动覆盖xxjob自带地址"
              filterable
              clearable
          ></el-cascader>
        </el-form-item>

        <el-form-item label="执行参数" prop="job_parmes">
          <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="job_form.job_parmes"
          >
          </el-input>
        </el-form-item>

        <el-form-item>
          <div style="float: left">
            <el-button type="primary" @click="keep_job_parm">确定</el-button>
            <el-button
                @click="
                job_parm_dis = false;
              "
            >取消
            </el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- start 执行用例选择环境弹窗 -->
    <el-dialog title="选择执行环境" :visible.sync="env_options_dislog" width="30%" style="margin-top: 250px;height: 350px;"
               :close-on-press-escape="false"
               :close-on-click-modal="false">
      <el-form :model="envForm" :rules="env_rules" ref="envForm" label-width="auto">


        <el-form-item label="运行环境" prop="env" style="padding-left: 100px">
          <el-cascader v-model="envForm.env"
                       placeholder="请搜索运行环境"
                       :options="env_options"
                       filterable
                       :props="{value:'server_env',label:'server_env'}"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="运行账号" prop="cookie" style="padding-left: 100px">
          <el-select v-model="envForm.cookie" placeholder="请搜索运行账号" clearable filterable>
            <el-option v-for="item in account" :key="item.id" :label="item.account_name"
                       :value="item.cookie"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label-width="30%">
          <el-button type="primary" @click="excutioncase"
                     style="margin-right: 10px;float: right;margin-top: 10px;">确 定
          </el-button>
          <el-button @click="env_options_dislog = false" style="margin-right: 10px;float: right;margin-top: 10px;">取 消
          </el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
    <!-- end 执行用例选择环境弹窗 -->

    <!-- 单用例执行弹窗 start -->
    <el-dialog :visible.sync="run_case_dislog" width="50%" title="执行结果" style="margin-top: 50px;"
               :close-on-press-escape="false"
               :close-on-click-modal="false"
               @close="get_case"
    >
      <!-- <span slot="title" style="font-size: 20px">执行结果</span> -->
      <el-form :model="caseForm" ref="caseForm" label-width="auto">

        <el-form-item label="用例名称" prop="name" style="width: 90%; margin-left: 10px;float: left;">
          <el-input disabled="true" v-model="caseForm.name"></el-input>
        </el-form-item>

        <el-form-item label="请求url" prop="url" style="width: 90%; margin-left: 10px;float: left;">
          <el-input disabled="true" v-model="caseForm.url"></el-input>
        </el-form-item>

        <el-form-item label="运行环境" prop="env" style="width: 45%; margin-left: 10px;float: left;">
          <el-input disabled="true" v-model="caseForm.runEnv"></el-input>
        </el-form-item>

        <el-form-item label="执行人" prop="runUserNickname" style="width: 45%; float: left;">
          <el-input disabled="true" v-model="caseForm.runUserNickname"></el-input>
        </el-form-item>

        <el-form-item label="执行时间" prop="run_time" style="width: 45%; margin-left: 10px;float: left;">
          <el-input disabled="true" v-model="caseForm.run_time"></el-input>
        </el-form-item>

        <el-form-item disabled="true" label="运行耗时" prop="elapsed" style="width: 45%; float: left;">
          <el-input disabled="true" v-model="caseForm.elapsed"></el-input>
        </el-form-item>

        <el-form-item label="请求参数" prop="params" style="width: 90%; margin-left: 10px;float: left;">
          <vue-json-editor v-model="caseForm.params" :mode="'code'" lang="zh">
          </vue-json-editor>
        </el-form-item>

        <el-form-item disabled="true" label="返回结果" prop="response" style="width: 90%; margin-left: 10px;float: left;">
          <vue-json-editor v-model="caseForm.response" :mode="'code'" lang="zh">
          </vue-json-editor>
        </el-form-item>

      </el-form>
    </el-dialog>
    <!-- 单用例执行弹窗 end-->

    <!--删除二次确认弹框-->
    <el-dialog title="删除" :visible.sync="delete_again_alter" width="20%" style="height: 200px;margin-top: 300px;"
               :close-on-press-escape="false"
               :close-on-click-modal="false">
      <div>是否确认删除</div>
      <div style="margin-right: 10px;margin-top:5px;float: right">
        <el-button @click="delete_again_alter = false">取 消</el-button>
        <el-button type="primary" @click="delete_single_case">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import axios from "axios";
import vueJsonEditor from "vue-json-editor";
import api from '@/api/api.js';

export default {
  components: {
    Breadcrumb,
    vueJsonEditor,
  },
  props: {
    height: {
      type: Number,
      default: 100,
    }
  },
  name: "Single_case",
  data() {
    return {
      liushuixian_arr: [],
      job_parm_dis: false,
      job_run_id_data: [],
      project_format: {
        devtest: "联调环境",
        pre: "预发环境",
      },
      job_arr: [],
      job_all_popid_arr: [],
      job_form: {job_parmes: "",},
      key: 1,
      single_case_active: "single_body",
      more_excution_case_arr: [],
      user_name: "",
      project_name: "",
      project_list: [],
      env_name: "",
      env_list: [],
      env_options: [],
      account: [],
      list_page_body: {
        //分页请求数据
        page: 1,
        size: 20,
        module: [],
        tag: [],
      },
      tags: [{value: 1, label: '联调环境'}, {value: 2, label: '预发环境'}],
      case_data: [],
      total: 0,
      envForm: {env: ""},
      changejob:true,
      module_options: [],
      excutionrow: {},
      delete_id: "",
      delete_again_alter: false,
      dialogVisible: false,
      env_options_dislog: false,
      run_case_dislog: false,
      //执行结果返回输入框高度
      codeHeight: window.innerHeight - 500,
      editorOptions: {
        // 设置editor代码编辑器的样式
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        tabSize: 2,
        fontSize: 15,
        showPrintMargin: false, //去除编辑器里的竖线
      },
      title: "添加用例",
      env_conf: 0,
      selectcheck: [],
      //是否刷新
      isLoading: false,
      ruleForm: {
        name: "",
        req_method: "get",
        url: "",
        tag: [1],
        single_body: {},
        group_body: {},
        assert_res: {},
        extract_param: {},
        pre_sql: {},
        end_sql: {},
        source: "手工创建",
        delay_time: 0,
        // job_param: "",
        // job_podid: "",
        // job_id: "",
        // job_parmes: "",
        // assembly_id: "",
        use_job: "0",
      },
      env_rules: {
        env: [{required: true, message: "请选择环境", trigger: "blur"}],
        cookie: [{required: true, message: "请选择账号", trigger: "blur"}],
      },
      rules: {
        name: [
          {required: true, message: "请输入用例名称", trigger: "blur"},
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur",
          },
        ],
        url: [{required: true, message: "请输入接口地址", trigger: "blur"}],
        req_method: [
          {required: true, message: "请选择请求方式", trigger: "blur"},
        ],
        tag: [{required: true, message: "请选择标签", trigger: "blur"}],
        module: [
          {required: true, message: "请选择所属模块", trigger: "blur"},
        ],
        project_id: [
          {required: true, message: "请选择所属项目", trigger: "blur"},
        ],
      },
      caseForm: {},
    };
  },
  methods: {
    selectJobChange(val){
      if(val == '1'){
        this.changejob = false;
      }else{
        this.changejob = true;
      }
    },
    async get_case() {
      let response = await api.get_case_list(this.list_page_body);
      this.case_data = response.data;
      this.total = response["totalNum"];
      this.run_case_dislog = false;
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.title === "编辑用例") {
            this.ruleForm.delay_time = parseInt(this.ruleForm.delay_time);
            axios
                .put("/api/api_case/case/" + this.ruleForm.id, this.ruleForm)
                .then((res) => {
                  if (res.data.code === 10000) {
                    this.isLoading = false;
                    this.$message({
                      duration: 2000,
                      message: res.data.msg,
                      type: "success",
                    });
                    this.dialogVisible = false;
                    this.handleCurrentChange(1);
                  } else {
                    this.isLoading = false;
                    this.$message.error(res.data.error);
                  }
                });
          } else {
            this.ruleForm.delay_time = parseInt(this.ruleForm.delay_time)
            axios.post("/api/api_case/case", this.ruleForm).then((res) => {
              this.isLoading = true;
              if (res.data.code === 10000) {
                this.isLoading = false;
                this.$message({
                  duration: 2000,
                  message: res.data.msg,
                  type: "success",
                });
                this.dialogVisible = false;
                this.handleCurrentChange(1);
              } else {
                this.isLoading = false;
                this.$message.error(res.data.error);
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },

    //获取编辑/复制的用例信息
    putcase(row, type) {
      this.ruleForm = null;
      axios.get("/api/api_case/case/" + row.id).then((res) => {
        this.ruleForm = JSON.parse((JSON.stringify(res.data.data)));
        this.ruleForm.tag = [parseInt(this.ruleForm.tag)];
        this.ruleForm.module = [];

        if (this.ruleForm.use_job === "null" || this.ruleForm.use_job === null){
            this.ruleForm.use_job = "0";
          }else{
            this.ruleForm.use_job = String(this.ruleForm.use_job);
          }


        this.job_form.job_parmes = this.ruleForm.job_parmes;
        this.job_form.job_id = this.ruleForm.job_id;
        this.job_form.liushuixian_id = this.ruleForm.assembly_id;
        this.job_form.popId = this.ruleForm.job_podid;
        row.module.forEach((item) => {
          this.ruleForm.module.push(parseInt(item))
        });
      });
      if (type === "copy") {
        this.title = "复制用例";
      } else {
        this.title = "编辑用例";
      }
      this.dialogVisible = true;
    },

    addcase() {
      this.title = "添加用例";
      this.ruleForm = {
        name: "",
        req_method: "get",
        url: "",
        tag: [1],
        single_body: {},
        group_body: {},
        assert_res: {},
        extract_param: {},
        pre_sql: {},
        end_sql: {},
        source: "手动创建",
        delay_time: 0,
        // job_parmes: "",
        // job_podid: "",
        // job_id: "",
        // assembly_id: "",
        use_job: "0",
      };
      this.dialogVisible = true;
    },

    deletecase(row) {
      this.delete_id = row.id;
      this.delete_again_alter = true;
    },

    delete_single_case() {
      axios.delete("/api/api_case/case/" + this.delete_id).then((res) => {
        if (res.data["code"] === 10000) {
          this.handleCurrentChange(1);
          this.$message({
            duration: 2000,
            message: res.data.msg,
            type: "success",
          });
          this.delete_again_alter = false;
        } else {
          this.delete_again_alter = false;
          this.isLoading = false;
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

    //单用例执行执行用例
    excutioncase() {
      if (this.env_conf === 1) {
        axios
            .post("/api/api_case/case/" + this.excutionrow.id + "/run", {
              project_id: this.excutionrow.project_id,
              runCookie: this.envForm.cookie,
              runEnv: this.envForm.env[1],
            })
            .then((res) => {
              if (res.data["code"] === 10000) {
                this.$message({
                  duration: 2000,
                  message: res.data.msg,
                  type: "success",
                });
                this.env_options_dislog = false;
                this.caseForm = res.data.data
                this.caseForm.name = this.excutionrow.name
                this.run_case_dislog = true
                this.caseForm.response = res.data.data.output.response;
                this.caseForm.params = res.data.data.output.params;
                this.caseForm.error_reason = res.data.data.output.error_reason;
                this.caseForm.url = res.data.data.output.url;
                this.env_conf = 2;
              } else {
                this.$message.error(res.data.msg);
              }
            });
      } else {
        this.more_excution_case_arr = [];
        for (let i in this.selectcheck) {
          this.more_excution_case_arr.push(parseInt(this.selectcheck[i].id));
        }
        axios
            .post("/api/api_case/case/batch_run", {
              projectId: this.selectcheck[0]['project_id'],
              caseList: this.more_excution_case_arr,
              caseGroupList: [],
              runEnv: this.envForm.env[1],
              runCookie: this.envForm.cookie,
              runUserNickname: this.user_name,
            })
            .then((res) => {
              if (res.data["code"] === 10000) {
                this.$message({
                  duration: 5000,
                  message: "批量执行中，请在测试报告页查看测试结果",
                  type: "success",
                });
                this.env_options_dislog = false;
              } else {
                this.$message.error(res.data.msg);
              }
            });
      }
    },
    //行选中
    handleSelect(val) {
      this.selectcheck = val;
    },
    handleSelectionChange(val) {
      this.selectcheck = val;
    },
    // 查看用例结果
    single_case_result(row) {
      this.caseForm = {};
      axios.get("/api/api_case/case/" + row.id + "/result").then((res) => {
        if (res.data["code"] === 10000) {
          this.caseForm = res.data.data;
          this.caseForm.response = res.data.data.output.response;
          this.caseForm.params = res.data.data.output.params;
          this.caseForm.url = res.data.data.output.url;
          this.run_case_dislog = true;
        } else {
          this.$message.error(res.data.msg)
        }
      });
    },

    //页量切换
    handleSizeChange(val) {
      this.list_page_body.size = val;
      this.get_case();
    },
    //页码切换
    handleCurrentChange(val) {
      this.list_page_body.page = val;
      this.get_case();
    },

    get_account() {
      axios
          .post("/api/test_management/AccountList", this.list_page_body)
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {

              this.account = res.data.items;
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
    get_moudle() {
      axios
          .post("/api/test_management/moduleList", {page: 1, limit: 100})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.module_options = res.data.items
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
    get_tag_name(raw) {
      let val = null;
      this.tags.forEach((item) => {
        if (raw.tag === String(item.value)) {
          val = item.label
        }
      })
      return val
    },
    get_module_name(raw) {
      let val = null;
      if (raw.module && raw.module !== "") {
        this.module_options.forEach((item) => {
          if (raw.module[0] === item.id) {
            val = item.name
          }
          if (item.children) {
            item.children.forEach((dow_item) => {
              if (raw.module[1] === dow_item.id) {
                val += '-'
                val += dow_item.name
              }
            })
          }
        })
      } else {
        return '-'
      }
      return val
    },
    get_user_name() {
      this.user_name = localStorage.getItem('username')
    },
    //json-editor空监听
    json_editor_error(val, type) {
      if (val.toString() === "Error: Parse error on line 1:\n" +
          "\n" +
          "^\n" +
          "Expecting 'STRING', 'NUMBER', 'NULL', 'TRUE', 'FALSE', '{', '[', got 'EOF'") {
        if (type === 'single_body') {
          this.ruleForm.single_body = {};
        }
        if (type === 'group_body') {
          this.ruleForm.group_body = {};
        }
        if (type === 'assert_res') {
          this.ruleForm.assert_res = {};
        }
        if (type === 'pre_sql') {
          this.ruleForm.pre_sql = {};
        }
        if (type === 'end_sql') {
          this.ruleForm.end_sql = {};
        }
        if (type === 'extract_param') {
          this.ruleForm.extract_param = {};
        }
      }
    },
    //项目下拉框数据
    get_projct_list() {
      axios
          .post("/api/test_management/proList", {page: 1, size: 100})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.project_list = res.data["items"];
            }
            console.log(this.project_list)
          })
          .catch(() => {
            this.is_data = false;
            this.$message.error("服务器错误,请联系测试人员");
          });
    },

    //获取环境列表
    get_env_list() {
      axios
          .post("/api/test_management/selectEnvlist", {page: 1, limit: 200})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.env_options = res.data["items"];
              this.env_name = this.env_options.env_name;
            }
          })
          .catch(() => {
            this.is_data = false;
            this.$message.error("服务器错误,请联系测试人员");
          });
    },

    //搜索选中下拉框事件
    search_select_project(val) {
      if (val) {
        this.list_page_body.projectId = val;
      } else {
        delete this.list_page_body['projectId'];
      }
    },
    //新增用例项目下拉框
    add_select_project(val) {
      if (val) {
        this.ruleForm.project_id = val;
      } else {
        delete this.ruleForm['projectId'];
      }
    },
    handleClose() {
      this.$data = this.$options.data();
    },
    job_click() {
      if(this.changejob == true){
        return
      }
      if (this.title === '编辑用例' || this.title === "用例" || this.title === "复制用例") {
        console.log(this.title)
        this.job_handle_change();
      } else {
        this.job_form = {job_parmes: ""};
        this.title = '用例';
      }

      this.job_parm_dis = true;
    },
    //流水线下拉框数据
    get_liushui_list() {
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
                if (item.popId && item.popId !== "") {
                  bkci_data.value = item.id;
                  bkci_data.label = this.project_format[item.project] + "-" + item.Assembly_name;
                  this.liushuixian_arr.push(bkci_data);
                }
              });
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

    get_job_list() {
      axios
          .post("/api/test_tools/xxjob_list", {
            "page": 1,
            "limit": 10000,
            "useType": 1
          })
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              console.log(res.data.data);
              res.data.data.forEach((element) => {
                let dicts = {};
                dicts.value = element.id;
                if (element.env === 2){
                  dicts.label = "预发环境-" + element.job_name;
                this
                }else{
                  dicts.label = "联调环境-" + element.job_name;
                }
                this.job_arr.push(dicts);

                let dicts2 = {};
                dicts2.value = element.id;
                dicts2.label = element.job_popid_list;
                this.job_all_popid_arr.push(dicts2);
              });
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

    job_handle_change() {

      this.job_run_id_data = [];
      this.job_all_popid_arr.forEach((item) => {
        if (String(item.value) === String(this.job_form.job_id)) {
          eval(item.label).forEach((down_item) => {
            let dicts = {};
            dicts.value = down_item;
            dicts.label = down_item;
            this.job_run_id_data.push(dicts);
          })
        }
      })
    },
    keep_job_parm() {
      if (this.job_form.job_id === null || (this.job_form.popId === null && this.job_form.liushuixian_id === null)) {
        this.$message.error("请选择job参数");
        return false;
      }

      if (typeof (this.job_form.job_id) === "object") {
        if ( this.job_form.job_id === null || this.job_form.job_id === "" ||  this.job_form.job_id.length === 0) {
          delete this.ruleForm['job_id']
        } else {
          this.ruleForm.job_id = this.job_form.job_id[0];
        }
      } else {
        this.ruleForm.job_id = this.job_form.job_id;
      }

      if (typeof (this.job_form.popId) === "object") {
        if (this.job_form.popId === null || this.job_form.popId === "" || this.job_form.popId.length === 0) {
          delete this.ruleForm['podid']
        } else {
          this.ruleForm.job_podid = this.job_form.popId[0];
        }
      } else {
        this.ruleForm.job_podid = this.job_form.popId;
      }

      if (typeof (this.job_form.liushuixian_id) === "object") {
        if (this.job_form.liushuixian_id === null || this.job_form.liushuixian_id === "" || this.job_form.liushuixian_id.length === 0) {
          delete this.ruleForm['assembly_id']
        } else {
          this.ruleForm.assembly_id = this.job_form.liushuixian_id[0];
        }
      } else {
        this.ruleForm.assembly_id = this.job_form.liushuixian_id;
      }
      this.ruleForm.job_parmes = this.job_form.job_parmes;

      this.job_parm_dis = false;
    },
  },
  created() {
    this.get_case();
    this.get_projct_list();
    this.get_env_list();
    this.get_account();
    this.get_moudle();
    this.get_user_name();
    this.get_job_list();
    this.get_liushui_list();
  },
};
</script>
<style>
.jsoneditor-vue {
  height: 100%;
}

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

div.jsoneditor-menu {
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
}

.ace_content {
  background: #F9FAFB;
}

div.jsoneditor {
  border: 0px;
}

.ace-jsoneditor .ace_scroller {
  border-bottom-right-radius: 10px;
}

.ace-jsoneditor .ace_gutter {
  border-bottom-left-radius: 10px;
}

.submit_button {
  position: fixed;
  z-index: 6666;
}
</style>