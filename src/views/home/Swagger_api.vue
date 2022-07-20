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
            <a style="font-size: 13px">所属状态</a>
            <el-select
                v-model="list_page_body.status"
                placeholder="请选择状态"
                clearable filterable
                style="width: 150px; margin-left: 10px"
            >
              <el-option label="待更新" value="待更新"></el-option>
              <el-option label="有用例" value="有用例"></el-option>
              <el-option label="废弃" value="废弃"></el-option>
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
        </div>
      </div>
      <!--下拉筛选end-->
      <!-- <div>
        <el-button type="primary"  size="small" style="background-color: #3573fe" @click="sync_swagger()">
          同步接口
        </el-button>
      </div> -->
      <div style="width: 100px;float: right; margin-right: 10px;text-align: center;">
        <el-button type="primary" size="small" style="background-color: #3573fe" @click="sync_swagger" v-has="{class:'107'}"
        >同步接口
        </el-button>
      </div>
      <!--表格start-->
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
                width="80"
            ></el-table-column>
            <el-table-column
                prop="module"
                label="模块"
                align="center"
                width="180"
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
                label="状态"
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
                <el-button @click="apiEdit(scope.row, 'edit')" type="text" size="small"  v-has="{class:'108'}">编辑</el-button>
                <el-button @click="swagger_case(scope.row)" type="text" size="small"  v-has="{class:'109'}">转为用例</el-button>
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
        <el-form-item label="接口编号" prop="id">
          <el-input v-model="ruleForm.id" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="接口名称" prop="api_name">
          <el-input v-model="ruleForm.api_name" placeholder="请输入接口名称">
          </el-input>
        </el-form-item>

        <el-form-item
            label="所属项目" prop="project_id">
          <el-select v-model="ruleForm.project_id">
            <el-option
                v-for="item in project"
                :key="item.id"
                :label="item.project_name"
                :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="请求方式" prop="method">
          <el-radio v-model="ruleForm.method" label="GET">GET</el-radio>
          <el-radio v-model="ruleForm.method" label="POST">POST</el-radio>
          <el-radio v-model="ruleForm.method" label="PUT">PUT</el-radio>
          <el-radio v-model="ruleForm.method" label="DELETE">DELETE</el-radio>
        </el-form-item>

        <el-form-item label="接口路径" prop="url">
          <el-input v-model="ruleForm.url"></el-input>
        </el-form-item>

        <el-form-item label="所属模块(转用例)" prop="module">
          <el-cascader v-model="ruleForm.module" :options="module_options"
                       :props="{ value: 'id', label: 'name'}" collapse-tags
                       :show-all-levels="false" clearable></el-cascader>
        </el-form-item>

        <el-form-item label="请求参数" prop="params">
          <vue-json-editor v-model="ruleForm.params" @has-error="json_editor_error($event,'params')" :mode="'code'"
                           lang="zh" :key="ruleForm.id">
          </vue-json-editor>
        </el-form-item>

        <div style="position: fixed;z-index: 6666;margin-left: 550px;margin-top: 30px;">
          <el-form-item>
            <el-button type="primary" @click="saveForm('ruleForm')">保存</el-button>
            <el-button type="primary" @click="keep_to_case()">保存转用例</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </div>

        <el-form-item label="返回结果" prop="responses">
          <vue-json-editor v-model="ruleForm.responses" :mode="'code'" lang="zh" :key="ruleForm.id">
          </vue-json-editor>
        </el-form-item>

        <el-form-item label="接口状态" prop="status">
          <el-input v-model="ruleForm.status" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="返回结果" prop="responses">
          <vue-json-editor v-model="this.to_case_result" :mode="'code'" lang="zh" :key="ruleForm.id">
          </vue-json-editor>
        </el-form-item>



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


    <!-- 转用例弹框 -->
    <el-dialog :visible.sync="swagger_to_case_dislog" width="200" style="margin-top: 100px; height: 600px" show-footer
               :close-on-press-escape="false"
               :close-on-click-modal="false">

      <span slot="title" style="font-size: 20px">转为用例</span>

      <el-form :model="swagger_single_case" :inline-message="true" :status-icon="true"
               ref="singleTocase">

        <el-form-item label="所属项目" prop="project_id" style="width: 300px;">
          <el-select v-model="swagger_single_case.project_id">
            <el-option v-for="item in project" :key="item.id" :label="item.project_name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属模块" prop="module" style="float: left;width: 300px;">
          <el-cascader
              v-model="swagger_single_case.module" :options="module_options" :props="{ value: 'id', label: 'name'}"
              collapse-tags
              :show-all-levels="false" clearable></el-cascader>
        </el-form-item>

        <el-form-item style="float: right; margin-top: 50px;">
          <el-button type="primary" @click="swagger_to_case">确定</el-button>
          <el-button @click="swagger_to_case_dislog = false">取消</el-button>
        </el-form-item>

        <el-form-item label="转用例结果" prop="result2" style="float: top;margin-top: 100px;">
          <vue-json-editor v-model="single_to_case" :key="swagger_single_case.id" :mode="'code'" lang="zh">
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
      row_module: "",
      syncData: {},
      // 分页请求数据
      list_page_body: {page: 1, size: 20},
      title: "",
      api_data: [],
      total: 0,
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
        method: "",
        api_name: "",
        url: "",
        params: {},
        responses: {},
        assert_res: {},
        status: "",
        updated_time: "",
        source: "",
      },
      swagger_to_case_rules: {
        id: [{required: true, message: "id", trigger: "blur"}],
        api_name: [
          {required: true, message: "请输入接口名称", trigger: "blur"},
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur",
          },
        ],
        url: [{required: true, message: "请输入接口地址", trigger: "blur"}],
        method: [
          {required: true, message: "请选择请求方式", trigger: "blur"},
        ],
        tag: [{required: true, message: "请选择标签", trigger: "blur"}],
        project_id: [
          {required: true, message: "请选择所属项目", trigger: "blur"},
        ],
      },
    };
  },

  methods: {
    //保存
    saveForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const fromdata = {};
          for (let key in this.ruleForm) {
            fromdata[key] = this.ruleForm[key];
          }
          this.ruleForm.module = this.row_module;
          axios
              .put("api/api_case/swagger/" + this.ruleForm.id, fromdata)
              .then((res) => {
                if (res.data.code === 10000) {
                  this.isLoading = false;
                  this.$message({
                    durations: 2000,
                    message: res.data.msg,
                    type: "success",
                  });
                  this.dialogVisible = false;
                  this.handleCurrentChange(1);
                } else {
                  this.isLoading = false;
                  this.$message.error(res.data.msg);
                }
              });
        } else {
          return false;
        }
      });
    },
    //编辑转用例
    keep_to_case() {
      this.single_to_case = {};
      this.swagger_single_case.id = this.ruleForm.id;
      this.swagger_single_case.params = this.ruleForm.params;
      this.swagger_single_case.tag = [1];
      this.swagger_single_case.name = this.ruleForm.api_name;
      this.swagger_single_case.req_method = this.ruleForm.method;
      this.swagger_single_case.url = this.ruleForm.url;
      this.swagger_single_case.only_api = this.ruleForm.only_api;
      this.swagger_single_case.module = this.ruleForm.module;
      this.swagger_single_case.project_id = this.ruleForm.project_id;
      if (typeof (this.swagger_single_case.module) == 'string') {
        this.$message.error("请选择模块")
      } else {
        axios
            .post("/api/api_case/case/convertApi", this.swagger_single_case)
            .then((res) => {
              if (res.data.code === 10000) {
                this.isLoading = false;
                this.$message({
                  durations: 2000,
                  message: res.data.msg,
                  type: "success",
                });
                this.to_case_result = res.data.data;
                // this.dialogVisible = false;
                this.handleCurrentChange(1);
              } else {
                this.isLoading = false;
                this.$message.error(res.data.msg);
              }
            });
      }
    },

    //编辑查询
    apiEdit(row) {
      this.to_case_result = {};
      axios.get("/api/api_case/swagger/" + row.id).then((res) => {
        this.ruleForm = res.data;
        this.ruleForm.params = res.data.params;
        this.ruleForm.responses = res.data.responses;
      });
      this.title = "编辑接口";
      this.dialogVisible = true;
      this.row_module = row.module;
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
    },
    //列表直接转
    swagger_to_case() {
      axios.post("api/api_case/case/convertApi", this.swagger_single_case).then((res) => {
        if (res.data["code"] === 10000) {
          this.$message({
            duration: 2000,
            message: res.data.msg,
            type: "success",
          });
          this.single_to_case = res.data.data;
          // this.swagger_to_case_dislog = false;
        } else {
          this.$message.error(res.data.msg);
          this.swagger_to_case_dislog = false;
        }
      });
    },

    //列表查询
    get_api_list() {
      axios
          .get("/api/api_case/swagger?status=all", {params: this.list_page_body})
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