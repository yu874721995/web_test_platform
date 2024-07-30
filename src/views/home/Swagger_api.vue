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
          
          <div style="float: left; margin-left: 1%;">
            <a style="font-size: 13px">所属状态</a>
            <el-select
                v-model="list_page_body.status"
                placeholder="请选择状态"
                clearable filterable
                style="width: 150px; margin-left: 10px"
            >
              <el-option label="最新" value="1"></el-option>
              <el-option label="有更新" value="2"></el-option>
            </el-select>
          </div>

          <div style="float: left; margin-left: 1%;">
            <a style="font-size: 13px">有无用例</a>
            <el-select
                v-model="list_page_body.case_status"
                placeholder="请选择状态"
                clearable filterable
                style="width: 150px; margin-left: 10px"
            >
              <el-option label="无用例" value="1"></el-option>
              <el-option label="有用例" value="2"></el-option>
            </el-select>
          </div>

          <div style="float: left; margin-left: 1%;">
            <a style="font-size: 13px">是否需要测试</a>
            <el-select
                v-model="list_page_body.test_status"
                placeholder="请选择状态"
                clearable filterable
                style="width: 150px; margin-left: 10px"
            >
              <el-option label="需要" value="1"></el-option>
              <el-option label="不需要" value="2"></el-option>
            </el-select>
          </div>

          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">请求方法</a>
            <el-select
                v-model="list_page_body.method"
                placeholder="请选择"
                clearable filterable
                style="width: 120px; margin-left: 10px"
            >
              <el-option label="GET" value="GET"></el-option>
              <el-option label="POST" value="POST"></el-option>
              <el-option label="PUT" value="PUT"></el-option>
              <el-option label="DELETE" value="DELETE"></el-option>
            </el-select>
          </div>
          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">所属模块</a>
            <el-input
                clearable
                placeholder="请输入模块名"
                v-model="list_page_body.module"
                style="width: 150px; margin-left: 10px"
                class="case_input"
            ></el-input>
          </div>
          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">接口名称</a>
            <el-input
                clearable
                placeholder="请输入接口名称"
                v-model="list_page_body.name"
                style="width: 150px; margin-left: 10px"
                class="case_input"
            ></el-input>
          </div>
          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">接口路径</a>
            <el-input
                clearable
                placeholder="请输入接口地址"
                v-model="list_page_body.url"
                style="width: 150px; margin-left: 10px"
                class="case_input"
            ></el-input>
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
          <div style="float: right; margin-right: 20px">
            <el-button
                type="primary"
                size="small"
                style="background-color: #3573fe"
                @click="more_to_case_alter"
                v-has="{class:'67'}"
            >批量转换用例
            </el-button>
          </div>
        </div>
      </div>
      <!--下拉筛选end-->
      <div
          style="margin-top: 10px; float: left; width: 98%; text-align: center"
      >
        <template>
          <el-table
              :data="api_data"
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
              @selection-change="handleSelectionChange"
              ref="group_case_table"
          >
            <el-table-column
                type="selection"
                align="center"
                width="50"
            ></el-table-column>
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
            <el-table-column
                prop="module"
                label="模块"
                align="center"
                width="150"
            ></el-table-column>
            <el-table-column
                prop="method"
                label="请求方法"
                align="center"
                width="80"
            ></el-table-column>
            <el-table-column prop="api_name" label="接口名称" align="center">
            </el-table-column>

            <el-table-column prop="url" label="接口路径" align="center">
            </el-table-column>
            <el-table-column
                prop="status"
                :formatter="status_name"
                label="更新状态"
                align="center"
                width="70"
            >
            </el-table-column>
            <el-table-column
                prop="case_status"
                :formatter="case_status_name"
                label="有无用例"
                align="center"
                width="70"
            >
            </el-table-column>
            <el-table-column
                prop="source"
                label="接口来源"
                align="center"
                width="70"
            >
            </el-table-column>
            <el-table-column
                prop="created_time"
                label="创建时间"
                align="center"
                width="160"
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
                <el-button @click="apiEdit(scope.row, 'edit')" type="text" size="small"  v-has="{class:'64'}">转为用例</el-button>
                <el-button @click="notest_swagger_case(scope.row)" type="text" size="small" v-if="scope.row.test_status==1" v-has="{class:'65'}">无需测试</el-button>
                <el-button @click="notest_swagger_case(scope.row)" type="text" size="small" v-if="scope.row.test_status==2" v-has="{class:'65'}">需要测试</el-button>
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

    <!-- 接口编辑页面-->
    <el-dialog
        :visible.sync="dialogVisible"
        width="1000px"
        show-foolter
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        style="margin-top: 60px;"
    >
      <span slot="title" style="font-size: 20px"> {{ title }} </span>
      <el-form :model="ruleForm" :rules="swagger_to_case_rules" :inline-message="true" :status-icon="true"
               ref="ruleForm"
               label-width="auto">
        <el-form-item label="接口headers格式" prop="consumess">
          <el-input v-model="querys.consumess" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="接口名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入接口名称">
          </el-input>
        </el-form-item>

        <el-form-item
            label="所属项目" prop="project_id">
          <el-select v-model="ruleForm.project_id" clearable filterable>
            <el-option
                v-for="item in project"
                :key="item.id"
                :label="item.project_name"
                :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="请求方式" prop="req_method">
          <el-radio-group v-model="ruleForm.req_method">
          <el-radio label="GET">GET</el-radio>
          <el-radio label="POST">POST</el-radio>
          <el-radio label="PUT">PUT</el-radio>
          <el-radio label="DELETE">DELETE</el-radio>
        </el-radio-group>
        </el-form-item>

        <el-form-item label="接口参数类型" prop="content_type">
          <el-radio-group v-model="ruleForm.content_type">
            <el-radio label="application/json">json</el-radio>
            <el-radio label="form-data">data</el-radio>
            <el-radio label="application/x-www-form-urlencoded">urlencoded</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="接口路径" prop="url">
          <el-input v-model="ruleForm.url"></el-input>
        </el-form-item>

        <el-form-item label="所属模块" prop="module">
          <el-input v-model="querys.module" :disabled="true"></el-input>

        </el-form-item>

        <el-form-item label="转用例" prop="module">
          <el-cascader v-model="ruleForm.module" :options="module_options"
                       :props="{ value: 'id', label: 'name'}" collapse-tags
                       :show-all-levels="false" clearable></el-cascader>
        </el-form-item>

        <el-form-item label="单接口参数" prop="single_body">
          <vue-json-editor v-model="ruleForm.single_body" @has-error="json_editor_error($event,'params')" :mode="'code'"
                           lang="zh" :key="ruleForm.id">
          </vue-json-editor>
        </el-form-item>
        <el-form-item label="多接口参数" prop="group_body">
          <vue-json-editor v-model="ruleForm.group_body" @has-error="json_editor_error($event,'params')" :mode="'code'"
                           lang="zh" :key="ruleForm.id">
          </vue-json-editor>
        </el-form-item>

        <el-form-item label="返回结果" prop="responses">
          <vue-json-editor v-model="ruleForm.responses" :mode="'code'" lang="zh" :key="ruleForm.id">
          </vue-json-editor>
        </el-form-item>

        <el-form-item label="断言" prop="responses">
          <vue-json-editor v-model="ruleForm.assert_res" :mode="'code'" lang="zh" :key="ruleForm.id">
          </vue-json-editor>
        </el-form-item>

        <div >
            <el-form-item>
              <el-button type="primary" @click="keep_to_case('ruleForm')">保存转用例</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>
          </div>
      </el-form>
    </el-dialog>

    <!-- 同步接口弹窗 start-->
    <el-dialog :visible.sync="syncApiVisible" width="60%" title="同步接口详情"
               show-foolter @close="get_api_list"
               :close-on-press-escape="false"
               :close-on-click-modal="false">
      <editor
          :value="this.syncData" @init="editorInit" lang="json" theme="chrome" height="550px"
          :options="editorOptions"></editor>
    </el-dialog>
    <!-- 同步接口弹窗 end-->

    <!-- 批量转用例弹框 -->
    <el-dialog
        :visible.sync="more_single_to_case_form_dislog"
        width="200"
        style="margin-top: 150px; height: 580px"
        show-footer
        :close-on-press-escape="false"
        :close-on-click-modal="false"
    >
      <span slot="title" style="font-size: 20px">批量转换用例</span>

      <el-form
          :model="more_single_to_case_form"
          :rules="to_case_rules"
          :inline-message="true"
          :status-icon="true"
          ref="more_single_to_case_form"
      >
        <el-form-item label="所属项目" prop="project_id">
          <el-select v-model="more_single_to_case_form.project_id" clearable filterable>
            <el-option
                v-for="item in project"
                :key="item.id"
                :label="item.project_name"
                :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属模块" prop="module">
          <el-cascader
              v-model="more_single_to_case_form.module"
              :options="module_options"
              :props="{ value: 'id', label: 'name' }"
              collapse-tags
              :show-all-levels="false"
              clearable
          ></el-cascader>
        </el-form-item>

        <el-form-item style="float: right">
          <el-button type="primary" @click="more_to_case">确定</el-button>
          <el-button @click="more_single_to_case_form_dislog = false;selectcheck=[];"
          >取消
          </el-button
          >
        </el-form-item>

        <el-form-item
            label="转换结果"
            prop="result"
            style="float: top; margin-top: 50px"
        >
          <vue-json-editor
              v-model="this.change_result"
              :mode="'code'"
              lang="zh"
          >
          </vue-json-editor>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import axios from "axios";
import vueJsonEditor from "vue-json-editor";
import editor from "vue2-ace-editor";

export default {
  components: {Breadcrumb, vueJsonEditor, editor},
  name: "Swagger_api",
  data() {
    return {
      to_case_rules: {},
      more_single_to_case_form_dislog:false,
      more_single_to_case_form:{
        swagger_ids:[],
        tag:[]
      },
      change_result: {},
      row_module: "",
      syncData: {},
      // 分页请求数据
      list_page_body: {page: 1, size: 20},
      title: "",
      api_data: [],
      total: 0,
      status_array:[{value:1,label:'新增'},{value:2,label:'有更新'}],
      case_status_array:[{value:1,label:'无用例'},{value:2,label:'有用例'}],
      editorOptions: {
        // 设置editor代码编辑器的样式
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        tabSize: 2,
        fontSize: 15,
        showPrintMargin: false, //去除编辑器里的竖线
      },
      module_options: [],
      project: [],
      single_to_case: {},
      swagger_to_case_dislog: false,
      syncApiVisible: false,
      dialogVisible: false,
      selectcheck: [],
      swagger_single_case: {},
      //是否刷新
      isLoading: false,
      to_case_result: {},
      ruleForm: {
        id: "",
        module: "",
        project_id: "",
        content_type:"",
        req_method: "",
        name: "",
        url: "",
        single_body:{},
        group_body: {},
        responses: {},
        assert_res: {},
        source: "",
        tag:[1],
        pre_sql:{},
        end_sql:{},
        extract_param:{},
      },
      querys:{},
      swagger_to_case_rules: {
        name: [
          {required: true, message: "请输入接口名称", trigger: "blur"},
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur",
          },
        ],
        module:[{required: true, message: "请选择模块", trigger: "blur"}],
        url: [{required: true, message: "请输入接口地址", trigger: "blur"}],
        method: [
          {required: true, message: "请选择请求方式", trigger: "blur"},
        ],
        content_type: [{required: true, message: "请选择content_type", trigger: "blur"}],
        project_id: [
          {required: true, message: "请选择所属项目", trigger: "blur"},
        ],
      },
    };
  },

  methods: {
    //编辑转用例
    keep_to_case(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        axios
            .post("/api/test_case/CreateCase", this.ruleForm)
            .then((res) => {
              if (res.data.code === 10000) {
                this.isLoading = false;
                this.$message({
                  durations: 2000,
                  message: res.data.msg,
                  type: "success",
                });
                // this.to_case_result = res.data.data;
                this.dialogVisible = false;
                this.handleCurrentChange(1);
              } else {
                this.isLoading = false;
                this.$message.error(res.data.msg);
              }
            });

          }else {
              return false;
            }
          })
        },
        handleSelectionChange(val) {
      this.selectcheck = val;
    },
    //编辑查询
    apiEdit(row) {
      this.to_case_result = {};
      axios.get("/api/api_case/swagger/" + row.id).then((res) => {
        this.querys = res.data;
        this.ruleForm.name = res.data.api_name;
        this.ruleForm.project_id = res.data.project_id;
        this.ruleForm.req_method = res.data.method;
        this.ruleForm.url = res.data.url;
        this.ruleForm.single_body = res.data.params;
        this.ruleForm.group_body = res.data.params;
        this.ruleForm.responses = res.data.responses;
        this.ruleForm.assert_res = res.data.assert_res;
        this.ruleForm.source = res.data.source;

      });
      this.title = "编辑接口";
      this.dialogVisible = true;
      
    },
    editorInit: function (editor) {
      require("brace/theme/chrome"),
          require("brace/snippets/json"),
          require("brace/mode/json"),
          editor.setReadOnly(true),
          editor.getSession().setUseWrapMode(true)
    },
    sync_swagger() {
      axios.post("/api/api_case/swagger/sync", {}).then((res) => {
        if (res.data["code"] === 10000) {
          this.$message({
            duration: 2000,
            message: res.data.msg,
            type: "success",
          });
          this.syncData = JSON.stringify(res.data.data, null, 2);
          this.syncApiVisible = true;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //转用例数据转换
    swagger_case(row) {
      this.single_to_case = {};
      this.swagger_single_case = {};
      this.swagger_to_case_dislog = true;
      // console.log(this.swagger_single_case);
      // this.swagger_single_case = row;
      this.swagger_single_case.id = row.id;
        this.swagger_single_case.params = row.params;
        this.swagger_single_case.tag = [1];
        this.swagger_single_case.name = row.api_name;
        this.swagger_single_case.req_method = row.method;
        this.swagger_single_case.url = row.url;
        this.swagger_single_case.only_api = row.only_api;
        this.swagger_single_case.module = row.module;
        this.swagger_single_case.single_body = row.params
        this.swagger_single_case.group_body = row.params
        this.swagger_single_case.assert_res = row.responses
        this.swagger_single_case.content_type = 'application/json'
        this.swagger_single_case.creator_nickname = localStorage.getItem('username')
        this.swagger_single_case.source = 'swagger转'
        this.swagger_single_case.extract_param = {}
        this.swagger_single_case.pre_sql = {}
        this.swagger_single_case.end_sql = {}
        this.swagger_single_case.use_fixture = {}
        this.swagger_single_case.delay_time = 0
        this.swagger_single_case.use_job = 0
    },
    //列表直接转
    swagger_to_case() {
      axios.post("api/test_case/CreateCase", this.swagger_single_case).then((res) => {
        if (res.data["code"] === 10000) {
          this.$message({
            duration: 2000,
            message: res.data.msg,
            type: "success",
          });
          // this.single_to_case = res.data.data;
          this.swagger_to_case_dislog = false;
        } else {
          this.$message.error(res.data.msg);
          // this.swagger_to_case_dislog = false;
        }
      });
    },
    notest_swagger_case(row){
      var status = 1
      if(row.test_status == 1){
        status = 2
      }else{
        status = 1
      }
      axios
          .post("/api/test_case/noTestToSwagger",{id:row.id,status:status})
          .then((res) => {
            this.isLoading = true;
            if (res.data["code"] === 10000) {
              this.get_api_list()
            } else {
              this.isLoading = false;
              this.is_data = false;
              this.$message.error(res.data.msg);
            }
          })
          .catch(() => {
            this.isLoading = false;
            this.is_data = false;
            this.$message.error("服务器错误，请联系测试人员");
          });
    },

    //列表查询
    get_api_list() {
      axios
          .get("/api/test_case/swagger", {params: this.list_page_body})
          .then((res) => {
            this.isLoading = true;
            if (res.data["code"] === 10000) {
              this.api_data = res.data.data;
              this.total = res.data.totalNum;
              this.is_data = true;
              this.isLoading = false;
            } else {
              this.isLoading = false;
              this.is_data = false;
              this.$message.error(res.data.msg);
            }
          })
          .catch(() => {
            this.isLoading = false;
            this.is_data = false;
            this.$message.error("服务器错误，请联系测试人员");
          });
    },
    //页量切换
    handleSizeChange(val) {
      this.list_page_body.size = val;
      this.get_api_list();
    },
    //页码切换
    handleCurrentChange(val) {
      this.list_page_body.page = val;
      this.get_api_list();
    },
    CreateMoreCase(){

    },
    more_to_case_alter() {
      this.change_result = {};
      if (this.selectcheck.length !== 0) {
        // for (let i in this.selectcheck) {
        //   if (this.selectcheck[i].status === 2) {
        //     this.$message.error("批量选择只可选择无用例的数据")
        //     return false
        //   }
        // }
        // this.env_conf = 2;
        this.more_single_to_case_form_dislog = true;
        var select_data = this.$refs.group_case_table.selection;
        for (let i in select_data) {
          this.more_single_to_case_form.swagger_ids.push(select_data[i]["id"]);
          this.more_single_to_case_form.tag = [1];
        }
      } else {
        this.$message.error("请先选择用例");
      }
    },
    more_to_case() {
      console.log(this.more_single_to_case_form)
      axios
          .post(
              "api/test_case/CreateMoreCase",
              this.more_single_to_case_form
          )
          .then((res) => {
            if (res.data.code === 10000) {
              this.$message.success(res.data.msg);
              this.more_single_to_case_form_dislog = false;
              this.selectcheck = [];
              this.$refs.group_case_table.selection = []
              this.get_api_list()
              // this.change_result = res.data.data;
            } else {
              this.$message.error(res.data.msg);
            }
          });
      // this.more_single_to_case_form_dislog = false;
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
    json_editor_error(val, type) {
      if (val.toString() === "Error: Parse error on line 1:\n" +
          "\n" +
          "^\n" +
          "Expecting 'STRING', 'NUMBER', 'NULL', 'TRUE', 'FALSE', '{', '[', got 'EOF'") {
        if (type === 'params') {
          this.ruleForm.params = {};
        }
      }
    },
    status_name(raw) {
      let val = null;
      this.status_array.forEach((item) => {
        if (raw.status === item.value){
          val = item.label
        }
      })
      return val
    },
    case_status_name(raw) {
      let val = null;
      this.case_status_array.forEach((item) => {
        if (raw.case_status === item.value){
          val = item.label
        }
      })
      return val
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
  },

  created() {
    this.get_api_list();
    this.get_moudle();
    this.get_project();
  },
};
</script>
<style>
/* jsoneditor右上角默认有一个链接,加css去掉 */
.jsoneditor-poweredBy {
  display: none;
}
</style>