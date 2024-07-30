<template>
    <div>
      <div><breadcrumb /></div>
      <div>
        <!--下拉筛选start-->
        <div style="float: left; width: 100%; line-height: 60px">
          <div style="width: 100%">
            <div style="float: left; margin-left: 10px">
              <a style="font-size: 13px">应用名称</a>
              <el-input
                placeholder="请输入应用名称"
                v-model="list_page_body.serviceName"
                style="width: 150px; margin-left: 10px"
                class="case_input"
              ></el-input>
            </div>
            <div style="float: left; margin-left: 10px">
              <a style="font-size: 13px">服务名称</a>
              <el-input
                placeholder="请输入服务名称"
                v-model="list_page_body.InterFaceService"
                style="width: 150px; margin-left: 10px"
                class="case_input"
              ></el-input>
            </div>
            <div style="float: left; margin-left: 10px;">
              <el-button
                plain
                icon="el-icon-search"
                @click="handleCurrentChange(1)"
            >查询</el-button>
            </div>
          </div>
        </div>
        <!--下拉筛选end-->
        <!--表格start-->
        <div
          style="margin-top: 10px; float: left; width: 98%; text-align: center"
        >
          <template>
            <el-table
              :data="dubbo_api_data"
              v-loading="isLoading"
              style="font-size: 13px;left: 1%;border-radius: 5px;"
              :header-cell-style="{ background: '#E7EAED' }"
              width="98%"
              :row-style="{ height: '40px' }"
              :cell-style="{ padding: '0px' }"
              type="selection"
              :default-sort="{ prop: 'url', order: 'ascending' }"
              :highlight-current-row="true"
              :stripe="true"
              :border="true"
              @selection-change="handleSelectionChange"
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
                prop="serviceName"
                label="应用名称"
                align="center"
                min-width="100" max-width="200"
                              ></el-table-column>
              <el-table-column
                prop="InterFaceService"
                label="服务名称"
                align="center"
                min-width="100" max-width="500"
              ></el-table-column>
              <el-table-column prop="version" label="version" align="center" min-width="50" max-width="200">
              </el-table-column>
              <el-table-column prop="group" label="group" align="center" min-width="50" max-width="200">
              </el-table-column>
              <el-table-column
                label="注册IP"
                align="center"
                min-width="100" max-width="200"
              >
              <template slot-scope="scope">
                <span v-html="scope.row.providers.join('<br>')"></span>
            </template>
              </el-table-column>
              <el-table-column
                prop="updated_time"
                label="最近更新时间"
                align="center"
                min-width="100" max-width="200"
              >
              </el-table-column>
              <el-table-column
                style="background-color: #ffffff"
                fixed="right"
                label="操作"
                width="50"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button @click="dubbo_detail(scope.row)" type="text" size="small">详情</el-button>
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
      <el-dialog
        :visible.sync="dubbo_detail_dialog"
        width="1200px"
        show-footer
    ><div>
        <!--表格start-->
        <div
          style="margin-top: 10px; float: left; width: 98%; text-align: center"
        >
          <template>
            <el-table
              :data="method_api_data"
              v-loading="isLoading"
              style="font-size: 13px;left: 1%;border-radius: 5px;"
              :header-cell-style="{ background: '#E7EAED' }"
              width="98%"
              :row-style="{ height: '40px' }"
              :cell-style="{ padding: '0px' }"
              type="selection"
              :default-sort="{ prop: 'url', order: 'ascending' }"
              :highlight-current-row="true"
              :stripe="true"
              :border="true">
              <el-table-column
                prop="id"
                label="编号"
                align="center"
                width="50"
              ></el-table-column>
              <el-table-column
                prop="methodName"
                label="接口名称"
                align="center"
                min-width="100" max-width="200"
                              ></el-table-column>
              <el-table-column
                prop="methodNamedocs"
                label="接口备注"
                align="center"
                min-width="100" max-width="500"
              ></el-table-column>
              <el-table-column
                prop="moduleDocName"
                label="接口组别"
                align="center"
                min-width="100" max-width="200"
              >
              </el-table-column>
              <el-table-column prop="paramsDesc" label="调用路径" align="center" min-width="50" max-width="200">
              </el-table-column>
              <el-table-column prop="parmesType" label="请求类型" align="center" min-width="50" max-width="200">
              </el-table-column>
              
              <el-table-column
                prop="updated_time"
                label="最近更新时间"
                align="center"
                min-width="100" max-width="200"
              >
              </el-table-column>
              <el-table-column
                style="background-color: #ffffff"
                fixed="right"
                label="操作"
                width="50"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button @click="dubbo_req(scope.row)" type="text" size="small">调用</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
        <!--表格end-->
      </div>

</el-dialog>
<!--调用dubbo接口form弹窗--->>
<el-dialog
        :visible.sync="dubbo_req_dialog"
        width="1000px"
        show-footer
        @closed="dubbo_req_dialog=false"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
    >
    <el-form :model="ruleForm" :inline-message="true" :status-icon="true" ref="ruleForm"
               label-width="auto">

        <el-form-item label="应用名称" prop="serviceName" style="width: 50%;float: left;">
          <el-input v-model="ruleForm.serviceName" disabled="true" style="width: 300px;"></el-input>
        </el-form-item>

        <el-form-item label="服务名称" prop="InterFaceService" style="width: 50%;float: left;">
          <el-input v-model="ruleForm.InterFaceService" disabled="true" style="width: 300px;"></el-input>
        </el-form-item>

        <el-form-item label="接口名称" prop="methodName" style="width: 50%;float: left;">
          <el-input v-model="ruleForm.methodName" disabled="true"
                    style="width: 300px;"></el-input>
        </el-form-item>

        <el-form-item label="接口组别" prop="moduleDocName" style="width: 50%;float: left;">
          <el-input v-model="ruleForm.moduleDocName" disabled="true"
                    style="width: 300px;"></el-input>
        </el-form-item>

        <el-form-item label="接口备注" prop="methodNamedocs" style="width: 50%;float: left;">
          <el-input v-model="ruleForm.methodNamedocs" disabled="true"
                    style="width: 300px;"></el-input>
        </el-form-item>

        <el-form-item label="paramsDesc" prop="paramsDesc" style="width: 50%;float: left;">
          <el-input v-model="ruleForm.paramsDesc" disabled="true"
                    style="width: 300px;"></el-input>
        </el-form-item>

        <el-form-item label="version" prop="version" style="width: 50%;float: left;">
          <el-input v-model="ruleForm.version" 
                    style="width: 300px;"></el-input>
        </el-form-item>

        <el-form-item label="group" prop="group" style="width: 50%;float: left;">
          <el-input v-model="ruleForm.group"
                    style="width: 300px;"></el-input>
        </el-form-item>

        <el-form-item label="parmesType" prop="parmesType" style="width: 50%;float: left;">
          <el-input v-model="ruleForm.parmesType" disabled="true"
                    style="width: 300px;"></el-input>
        </el-form-item>

        <div id="header_menu_div"
             style="margin-left: 0; flex-direction: column; width: 100%;height: 440px;float: left;">

          <el-form-item label="多接口参数" prop="parmesDetail" style="float: left;width: 100%;height: 300px;">
            <el-tooltip placement="top">
              <div slot="content">dubbo接口调用的参数，外层的[]必须保留
              </div>
            <vue-json-editor v-model="ruleForm.parmesDetail" :key="key" :mode="'code'"
                             style="float: left;width: 100%;height: 300px;"
                             @has-error="json_editor_error($event,'parmesDetail')" lang="zh">
            </vue-json-editor>
            </el-tooltip>
          </el-form-item>

        </div>
        <div style="z-index:6666;position: fixed;margin-left: 700px;margin-top: 300px;float: left;">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
              <el-button @click="dubbo_req_dialog = false">取消</el-button>
              <!-- <el-button type="primary" @click="selectEnv(ruleForm)">调试</el-button> -->
            </el-form-item>
          </div>
              


      </el-form>
</el-dialog>

<!-- 单用例执行弹窗 start -->
<el-dialog :visible.sync="dubbo_rsp_dialog" width="50%" title="执行结果" style="margin-top: 50px;"
               :close-on-press-escape="false"
               :close-on-click-modal="false"
    >
      <!-- <span slot="title" style="font-size: 20px">执行结果</span> -->
      <el-form :model="caseForm" ref="caseForm" label-width="auto">

        <el-form-item label="请求参数" prop="params" style="width: 90%; margin-left: 10px;float: left;">
          <vue-json-editor v-model="caseForm.params" :mode="'code'" lang="zh">
          </vue-json-editor>
        </el-form-item>

        <el-form-item disabled="true" label="返回结果" prop="data" style="width: 90%; margin-left: 10px;float: left;">
          <vue-json-editor v-model="caseForm.data" :mode="'code'" lang="zh">
          </vue-json-editor>
        </el-form-item>

      </el-form>
    </el-dialog>
    <!-- 单用例执行弹窗 end-->
    </div>
  </template>
  
  <script>
  import Breadcrumb from "@/components/Breadcrumb";
  import axios from "axios";
  import vueJsonEditor from "vue-json-editor";

  export default {
    components: { Breadcrumb,vueJsonEditor },
    name: "dubbo_mananger",
    data() {
      return {
        title: "",
        // 分页请求数据
        list_page_body: {
          page: 1,
          limit: 20,
        },
        caseForm:[],
        to_case_result:{},
        swagger_single_case:{},
        single_to_case:{},
        api_id_list: [],
        case_createor: "",
        case_tags: "",
        case_data: [],
        resulttext: "",
        total: 0,
        envForm: { env: "" },
        excutionrow: {},
        dialogVisible: false,
        env_options_dislog: false,
        resultdialog: false,
        env_conf: 0,
        selectcheck: [],
        //是否刷新
        isLoading: false,
        dubbo_api_data: [],
        project:[],
        dubbo_detail_dialog:false,
        method_api_data:[],
        dubbo_req_dialog:false,
        ruleForm:{},
        key: 1,
        dubbo_rsp_dialog:false
      };
    },
  
    methods: {
        submitForm(){
            axios
          .post("/api/test_case/reqDubboMethod", {method:this.ruleForm.methodName,
            parameterTypes:this.ruleForm.parmesType,
            service:this.ruleForm.InterFaceService+':'+this.ruleForm.version,
            parmes:this.ruleForm.parmesDetail
        })
          .then((res) => {
            this.isLoading = true;
            if (res.data["code"] === 10000) {
              this.dubbo_rsp_dialog = true;
              this.caseForm = res.data;
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
      get_dubbo_api_list() {
        axios
          .post("/api/test_case/dubboInterfaceList", this.list_page_body)
          .then((res) => {
            this.isLoading = true;
            if (res.data["code"] === 10000) {
              this.dubbo_api_data = res.data.data;
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
      dubbo_detail(row){
        axios
          .post("/api/test_case/dubboInterfaceMethod", {interfaceId:row.id})
          .then((res) => {
            this.isLoading = true;
            if (res.data["code"] === 10000) {
                this.dubbo_detail_dialog = true;
              this.method_api_data = res.data.data;
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
      dubbo_req(row){
        this.ruleForm = row
        this.dubbo_req_dialog = true
      },
      //页面选择
      handleSelectionChange(val) {
        this.selectcheck = val;
      },
      //页量切换
      handleSizeChange(val) {
        this.list_page_body.limit = val;
        this.get_dubbo_api_list();
      },
      //页码切换
      handleCurrentChange(val) {
        this.list_page_body.page = val;
        this.get_dubbo_api_list();
      },
    },
    created() {
      this.get_dubbo_api_list();
    },
  };
  </script>
  <style>
  .jsoneditor-vue {
  height: 250px;
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
  </style>