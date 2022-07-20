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
            <a style="font-size: 13px">Host名称</a>
            <el-input
                clearable
                placeholder="请输入Host名称"
                v-model="list_page_body.hostName"
                style="width: 150px; margin-left: 10px"
                class="case_input"
            ></el-input>
          </div>

          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">用例名称</a>
            <el-input
                clearable
                placeholder="请输入用例名称"
                v-model="list_page_body.only_api"
                style="width: 150px; margin-left: 10px"
                class="case_input"
            ></el-input>
          </div>

          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">所属账号</a>
            <el-input
                clearable
                placeholder="请输入抓包账号手机号"
                v-model="list_page_body.cookie"
                style="width: 150px; margin-left: 10px"
                class="case_input"
            ></el-input>
          </div>

          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">所属服务</a>
            <el-input
                clearable
                placeholder="请输入服务名称"
                v-model="list_page_body.module"
                style="width: 150px; margin-left: 10px"
                class="case_input"
            ></el-input>
          </div>

          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">开始时间</a>
            <el-date-picker
                v-model="list_page_body.start_time"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择开始时间"
                style="width: 150px; margin-left: 10px"
            ></el-date-picker>
          </div>

          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">结束时间</a>
            <el-date-picker
                v-model="list_page_body.end_time"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择结束时间"
                style="width: 150px; margin-left: 10px"
            ></el-date-picker>
          </div>

          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">有无用例</a>
            <el-select
                v-model="list_page_body.status"
                clearable
                filterable
                placeholder="请选择项目名称"
                style="width: 150px; margin-left: 10px"
            >
              <el-option
                  v-for="item in has_case"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              ></el-option>
            </el-select>
          </div>

          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px; margin-left: 10px">响应时长</a>
            <el-select
                v-model="list_page_body.elapsed"
                clearable
                filterable
                placeholder="请选择时长"
                style="width: 150px; margin-left: 10px"
            >
              <el-option
                  v-for="item in has_time"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              ></el-option>
            </el-select>
          </div>

          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">环境</a>
            <el-select
                v-model="list_page_body.env"
                clearable
                filterable
                placeholder="请选择项目名称"
                style="width: 150px; margin-left: 10px"
            >
              <el-option
                  v-for="item in env_arr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              ></el-option>
            </el-select>
          </div>

          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">有无bug</a>
            <el-select
                v-model="list_page_body.source"
                clearable
                filterable
                placeholder="请选择项目名称"
                style="width: 150px; margin-left: 10px"
            >
              <el-option
                  v-for="item in have_bug"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              ></el-option>
            </el-select>
          </div>

          <div style="float: left; padding-left: 10px">
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
                v-has="{class:'111'}"
            >批量转换用例
            </el-button>
          </div>
        </div>
      </div>
      <!--      下拉end-->

      <!--表格start-->
      <div
          style="margin-top: 10px; float: left; width: 98%; text-align: center"
      >
        <el-table
            :data="case_data"
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
            @select="handleSelect"
            @selection-change="handleSelectionChange"
            ref="group_case_table"
        >
          <el-table-column type="selection" width="55"></el-table-column>

          <el-table-column
              prop="id"
              label="id"
              align="center"
              width="100"
          ></el-table-column>

          <el-table-column
              prop="only_api"
              label="用例名称"
              align="center"
              width="300"
          ></el-table-column>

          <el-table-column
              prop="elapsed"
              label="响应时间(s)"
              align="center"
              width="100"
          ></el-table-column>

          <el-table-column
              prop="module"
              label="所属服务"
              align="center"
              width="100"
          ></el-table-column>

          <el-table-column
              prop="req_method"
              label="请求方法"
              align="center"
              width="100"
          ></el-table-column>

          <el-table-column
              prop="url"
              label="接口路径"
              align="center"
              width="350"
          ></el-table-column>

          <el-table-column
              :formatter="get_has_case_name"
              prop="status"
              label="有无用例"
              align="center"
              width="80"
          ></el-table-column>

          <el-table-column
              :formatter="get_ishave_bug"
              prop="source"
              label="有无bug"
              align="center"
              width="100"
          ></el-table-column>

          <el-table-column
              :formatter="get_env_name"
              prop="env"
              label="环境"
              align="center"
              width="100"
          ></el-table-column>

          <el-table-column
              prop="cookie"
              label="所属账号"
              align="center"
              width="300"
          ></el-table-column>

          <el-table-column
              prop="created_time"
              label="创建时间"
              align="center"
              width="200"
          ></el-table-column>

          <el-table-column
              style="background-color: #ffffff"
              fixed="right"
              label="操作"
              width="200"
              align="center"
          >
            <template slot-scope="scope">
              <el-button
                  @click="get_bug(scope.row)"
                  type="text"
                  v-if="scope.row.elapsed > 1"
                  size="small"
                  style="color: red"
                  v-has="{class:'112'}"
              >转bug
              </el-button>
              <el-button
                  @click="putcase(scope.row, 'put')"
                  type="text"
                  size="small"
                  v-has="{class:'113'}"
              >编辑转
              </el-button
              >
              <el-button
                  type="text"
                  v-if="scope.row.status === 1"
                  @click="singleCase(scope.row, 'to_case')"
                  size="small"
                  v-has="{class:'114'}"
              >转为用例
              </el-button>
            </template>
          </el-table-column>
        </el-table>
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

    <!--编辑弹框-->
    <el-dialog
        :visible.sync="dialogVisible"
        style="margin-top: 60px"
        width="1000px"
        show-footer
        :close-on-press-escape="false"
        :close-on-click-modal="false"
    >
      <span slot="title" style="font-size: 20px">{{ title }}</span>
      <el-form
          :model="ruleForm"
          :rules="mitToCaseRules"
          :inline-message="true"
          :status-icon="true"
          ref="keep_to_case"
          label-width="auto"
      >
        <el-form-item label="用例名称" prop="only_api">
          <el-input
              v-model="ruleForm.only_api"
              placeholder="请输入用例名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="所属项目" prop="project_id">
          <el-select v-model="ruleForm.project_id">
            <el-option
                v-for="item in project"
                :key="item.id"
                :label="item.project_name"
                :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="请求方式" prop="req_method">
          <el-radio v-model="ruleForm.req_method" label="GET">GET</el-radio>
          <el-radio v-model="ruleForm.req_method" label="POST">POST</el-radio>
          <el-radio v-model="ruleForm.req_method" label="PUT">PUT</el-radio>
          <el-radio v-model="ruleForm.req_method" label="DELETE"
          >DELETE
          </el-radio
          >
        </el-form-item>
        <el-form-item label="接口路径" prop="url">
          <el-input
              v-model="ruleForm.url"
              placeholder="请输入接口路径"
          ></el-input>
        </el-form-item>

        <el-form-item label="用例类型" prop="tag">
          <el-select
              disabled
              v-model="ruleForm.tag"
              multiple
              placeholder="请选择"
          >
            <el-option
                v-for="item in tags"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属模块(转用例)" prop="module">
          <el-cascader
              v-model="ruleForm.module"
              :options="module_options"
              :props="{ value: 'id', label: 'name' }"
              collapse-tags
              :show-all-levels="false"
              clearable
          ></el-cascader>
        </el-form-item>

        <el-form-item label="单接口参数" prop="single_body">
          <vue-json-editor
              v-model="ruleForm.single_body"
              @has-error="json_editor_error($event, 'single_body')"
              :key="1"
              :mode="'code'"
              lang="zh"
          >
          </vue-json-editor>
        </el-form-item>
        <div
            style="
            position: fixed;
            z-index: 6666;
            margin-left: 500px;
            margin-top: 30px;
          "
        >
          <el-form-item>
            <el-button type="primary" @click="submitForm('keep_to_case')"
            >保存
            </el-button
            >
            <el-button type="primary" @click="select_cover_case"
            >保存转用例
            </el-button
            >
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </div>

        <el-form-item label="断言" prop="assert_res">
          <vue-json-editor
              v-model="ruleForm.assert_res"
              @has-error="json_editor_error($event, 'assert_res')"
              :key="2"
              :mode="'code'"
              lang="zh"
          >
          </vue-json-editor>
        </el-form-item>

        <el-form-item label="返回结果" prop="result">
          <vue-json-editor
              v-model="ruleForm.result"
              :key="3"
              :mode="'code'"
              lang="zh"
              :aria-disabled="true"
          >
          </vue-json-editor>
        </el-form-item>

        <el-form-item label="转用例结果" prop="result2">
          <vue-json-editor
              v-model="keep_to_result"
              :key="4"
              :mode="'code'"
              lang="zh"
          >
          </vue-json-editor>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
        title="查看result"
        :visible.sync="resultdialog"
        width="70%"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
    >
      <el-input
          type="textarea"
          autosize
          @blur="jsonprint('result')"
          v-model="this.ruleForm.result"
          placeholder=""
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="resultdialog = false"
        >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 单转用例弹框 -->
    <el-dialog
        :visible.sync="singleToCasedislog"
        width="200"
        style="margin-top: 150px; height: 580px"
        show-footer
        :close-on-press-escape="false"
        :close-on-click-modal="false"
    >
      <span slot="title" style="font-size: 20px">转为用例</span>

      <el-form
          :model="singleTocase"
          :rules="to_case_rules"
          :inline-message="true"
          :status-icon="true"
          ref="singleTocase"
      >
        <el-form-item label="所属项目" prop="project_id">
          <el-select v-model="singleTocase.project_id">
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
              v-model="singleTocase.module"
              :options="module_options"
              :props="{ value: 'id', label: 'name' }"
              collapse-tags
              :show-all-levels="false"
              clearable
          ></el-cascader>
        </el-form-item>

        <el-form-item style="float: right">
          <el-button type="primary" @click="tocase('singleTocase')"
          >确定
          </el-button
          >
          <el-button @click="singleToCasedislog = false">取消</el-button>
        </el-form-item>

        <el-form-item
            label="转换结果"
            prop="result"
            style="float: top; margin-top: 50px"
        >
          <vue-json-editor
              v-model="this.single_change_result"
              :mode="'code'"
              lang="zh"
          >
          </vue-json-editor>
        </el-form-item>
      </el-form>
    </el-dialog>

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
          <el-select v-model="more_single_to_case_form.project_id">
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
          <el-button @click="more_single_to_case_form_dislog = false"
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

    <!-- 添加用例列表dialog -->
    <el-dialog
        title="已有用例，请选择覆盖用例（单选）"
        :visible.sync="cover_list_dialog"
        width="72%"
        show-footer
        class="abow_dialog"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
    >
      <div>
        <div>
          <el-button
              type="primary"
              size="small"
              style="background-color: #3573fe; float: right"
              @click="singleCase({}, 'keep_to_case')"
          >
            确定
          </el-button>
        </div>
        <!--表格start-->
        <div
            style="margin-top: 10px; float: left; width: 100%; text-align: center"
        >
          <template>
            <el-table
                :data="cover_list_data"
                ::v-loading="isLoading"
                style="font-size: 13px"
                ref="cover_select_table"
                :header-cell-style="{ background: '#E7EAED' }"
                height="500"
                width="100%"
                :row-style="{ height: '40px' }"
                :cell-style="{ padding: '0px' }"
                :highlight-current-row="true"
                :stripe="true"
                :border="true"
                type="selection"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column
                  prop="id"
                  label="用例id"
                  align="center"
                  width="100"
              ></el-table-column>
              <el-table-column
                  prop="name"
                  label="用例名称"
                  align="center"
                  width="400"
              ></el-table-column>
              <el-table-column
                  prop="module"
                  label="所属模块"
                  align="center"
                  width="200"
                  :formatter="get_module_name"
              ></el-table-column>
              <el-table-column
                  prop="url"
                  label="请求地址"
                  align="center"
                  width="300"
              ></el-table-column>
              <el-table-column
                  prop="tag"
                  label="用例类型"
                  align="center"
                  width="100"
                  :formatter="get_tag_name"
              ></el-table-column>
              <el-table-column
                  prop="source"
                  label="用例来源"
                  align="center"
                  width="100"
              ></el-table-column>
              <el-table-column
                  prop="creator_nickname"
                  label="创建人"
                  align="center"
                  width="100"
              ></el-table-column>
              <el-table-column
                  prop="created_time"
                  label="创建时间"
                  align="center"
                  width="200"
              ></el-table-column>
            </el-table>
          </template>
        </div>
        <!--表格end-->
        <div style="float: right">
          <!--分页start-->
          <el-pagination
              v-on:size-change="handleSizeChangeCase"
              v-on:current-change="handleCurrentChangeCase"
              :current-page="cover_case_list_page_body.page"
              :page-sizes="[10, 20, 50]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="cover_case_total"
              style="float: right; margin-top: 10px; margin-right: 20px"
          ></el-pagination>
          <!--分页end-->
        </div>
      </div>
    </el-dialog>

    <!-- 转bug弹框 -->
    <el-dialog
        :visible.sync="create_bug_dis"
        width="850px"
        style="margin-top: 20px; height: 90%"
        show-footer
        :close-on-press-escape="false"
        :close-on-click-modal="false"
    >
      <span slot="title" style="font-size: 20px">转bug弹框</span>

      <el-form
          :model="create_bug_case_form"
          :rules="create_bug_rule"
          :inline-message="true"
          :status-icon="true"
          ref="more_single_to_case_form"
      >
        <el-form-item
            label="bug标题"
            prop="title"
            style="width: 800px; float: left"
        >
          <el-input
              v-model="create_bug_case_form.title"
              filterable
              style="width: 690px"
              placeholder="bug标题"
          ></el-input>
        </el-form-item>

        <el-form-item
            label="项目名称"
            prop="project_id"
            style="width: 400px; float: left"
        >
          <el-select
              v-model="create_bug_case_form.project_id"
              disabled
              filterable
              style="width: 300px"
          >
            <el-option
                v-for="item in tapd_project"
                :key="item.id"
                :label="item.project_name"
                :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
            label="优先级"
            prop="priority"
            style="width: 400px; float: left"
        >
          <el-select
              v-model="create_bug_case_form.priority"
              filterable
              style="width: 300px"
          >
            <el-option
                v-for="item in demand_middle"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
            label="严重程度"
            prop="severity"
            style="width: 400px; float: left"
        >
          <el-select
              v-model="create_bug_case_form.severity"
              filterable
              style="width: 300px"
          >
            <el-option
                v-for="item in bug_level"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
            label="处理人"
            prop="owner"
            style="width: 400px; float: left"
        >
          <el-select
              v-model="create_bug_case_form.owner"
              filterable
              style="width: 300px"
          >
            <el-option
                v-for="item in mail_list"
                :key="item.id"
                :label="item.ding_name"
                :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="width: 800px; float: left">
          <Editor
              v-model="create_bug_case_form.description"
              placeholder="内容(必填)"
              style="width: 800px; height: 300px"
          />
        </el-form-item>

        <el-form-item style="float: right; margin-right: 50px">
          <el-button type="primary" @click="put_bug">确定</el-button>
          <el-button @click="create_bug_dis = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--删除二次确认弹框-->
    <el-dialog title="重复提醒" :visible.sync="create_again_alter" width="350px" style="height: 300px;margin-top: 300px;"
               :close-on-press-escape="false"
               :close-on-click-modal="false">
      <div>当前接口已提交bug，请确认</div>
      <div style="margin-right: 10px;margin-top:5px;float: right">
        <el-button type="primary" @click="create_again_alter = false;">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import axios from "axios";
import vueJsonEditor from "vue-json-editor";
import Editor from "@/components/Editor";

export default {
  components: {Breadcrumb, vueJsonEditor, Editor},
  name: "Single_case",
  data() {
    return {
      create_again_alter:false,
      create_bug_dis: false,
      create_bug_case_form: {},

      bug_level: [
        {value: "fatal", label: "致命"},
        {value: "serious", label: "严重"},
        {value: "normal", label: "一般"},
      ],

      env_arr: [
        {value: "1", label: "联调"},
        {value: "2", label: "预发"},
        {value: "3", label: "生产"},
        {value: "0", label: "未知"},
      ],

      demand_middle: [
        {value: "urgent", label: "紧急"},
        {value: "high", label: "高"},
        {value: "medium", label: "中"},
      ],

      tapd_project: [],
      //分页请求数据
      list_page_body: {
        page: 1,
        size: 20,
        hostName: "api.nextop.com",
      },
      cover_case_list_page_body: {
        page: 1,
        size: 20,
      },
      isLoading: false,
      case_name: "",
      case_createor: "",
      case_tags: "",
      case_data: [],
      resulttext: "",
      singleTocase: {},
      new_single_to_case: {},
      more_single_to_case_form: {
        mitIdList: [],
        tag: [1],
        module: [],
        projectId: 1,
      },
      cover_case_total: 0,
      cover_list_data: [],
      cover_list_dialog: false,
      cover_case_id: "",
      project: [],
      mail_list: [],
      keep_to_result: {},
      single_change_result: {},
      change_result: {},
      singleToCasedislog: false,
      more_single_to_case_form_dislog: false,
      module_options: [],
      total: 0,
      envForm: {env: ""},
      excutionrow: {},
      dialogVisible: false,
      resultdialog: false,
      title: "批量转换用例",
      tags: [
        {value: 1, label: "联调环境"},
        {value: 2, label: "预发环境"},
      ],
      have_bug: [
        {value: 1, label: "无"},
        {value: 2, label: "有"},
      ],
      has_case: [
        {value: 1, label: "无"},
        {value: 2, label: "有"},
      ],
      has_time: [
        {value: 1, label: "大于1秒"},
        {value: 2, label: "大于2秒"},
        {value: 3, label: "大于3秒"},
      ],
      selectcheck: [],
      //是否刷新
      ruleForm: {
        mitIdList: [],
        tag: [1],
      },
      to_case_rules: {
        module: [{required: true, message: "请选择模块", trigger: "blur"}],
        project_id: [
          {required: true, message: "请选择项目", trigger: "blur"},
        ],
      },
      create_bug_rule: {
        title: [{required: true, message: "请输入名称", trigger: "blur"}],
        project_id: [
          {required: true, message: "请选择项目", trigger: "blur"},
        ],
        priority: [{required: true, message: "请选择等级", trigger: "blur"}],
        severity: [
          {required: true, message: "请选择优先级", trigger: "blur"},
        ],
        description: [
          {required: true, message: "请输入内容", trigger: "blur"},
        ],
        owner: [{required: true, message: "请选择创建人", trigger: "blur"}],
      },

      mitToCaseRules: {
        url: [{required: true, message: "请输入URL", trigger: "blur"}],
        req_method: [
          {required: true, message: "请选择请求方式", trigger: "blur"},
        ],
        only_api: [
          {required: true, message: "请输入用例名称", trigger: "blur"},
        ],
        project_id: [
          {required: true, message: "请选择项目", trigger: "blur"},
        ],
        tag: [{required: true, message: "请选择模块", trigger: "blur"}],
      },
      style: "height:" + (document.body.clientHeight - 60) + "px",
      // pickerOptions: {
      //   disabledDate(time) {
      //     return time.getTime() < Date.now();
      //   },
      // },
    };
  },
  mounted() {
  },
  methods: {
    //编辑获取信息
    putcase(row, type) {
      this.clear_data();
      this.ruleForm = [];
      axios.get("/api/api_case/mitdata/" + row.id).then((res) => {
        console.log(res.data.data);
        this.ruleForm = res.data.data;
        this.ruleForm.id = res.data.data.id;
        this.ruleForm.only_api = res.data.data.only_api;
        this.ruleForm.req_method = res.data.data.req_method;
        this.ruleForm.body = res.data.data.body;
        // this.ruleForm.project_id = "1";
        this.ruleForm.assert_res = res.data.data.assert_res;
        this.ruleForm.result = res.data.data.result;
        this.ruleForm.tag = [1];
      });
      if (type === "copy") {
        this.title = "复制用例";
      } else {
        this.title = "编辑用例";
      }
      this.dialogVisible = true;
    },

    //转为bug
    get_bug(row) {
      if (row.source === "2"){
        this.create_again_alter = true;
      }
      this.create_bug_case_form = {
        priority: '',
        severity: '',
        owner: 186
      };
      this.create_bug_dis = true;
      if (row.elapsed > 1 && row.elapsed <= 2) {
        this.create_bug_case_form.priority = "medium";
        this.create_bug_case_form.severity = "normal";
      } else if (row.elapsed > 2 && row.elapsed <= 3) {
        this.create_bug_case_form.priority = "high";
        this.create_bug_case_form.severity = "serious";
      } else if (row.elapsed > 3) {
        this.create_bug_case_form.priority = "urgent";
        this.create_bug_case_form.severity = "fatal";
      } else {
        this.create_bug_case_form.priority = "medium";
        this.create_bug_case_form.severity = "normal";
      }
      this.create_bug_case_form.project_id = "53004465";
      this.create_bug_case_form.title =
          "【" + row.module + "】" + row.url + " 响应时长" + row.elapsed;
      this.create_bug_case_form.description =
          "请求参数：</br>" + JSON.stringify(row.single_body);
      this.create_bug_case_form.mit_id = row.id;

      for (let i = 0; i < this.module_options.length; i++) {
        if (this.module_options[i].server_env.search(row.module) !== -1) {
          this.create_bug_case_form.owner = this.module_options[i].dev_master;
        }
      }
    },

    put_bug() {
      this.mail_list.forEach((item) => {
        if (this.create_bug_case_form.owner === item.id) {
          this.create_bug_case_form.owner = item.ding_name + ";";
          return
        }
      });
      axios
          .post("api/test_tapd/createBug", this.create_bug_case_form)
          .then((res) => {
            if (res.data["code"] === 10000) {
              this.create_bug_dis = false;
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
              this.create_bug_dis = false;
            }
          });
    },

    //编辑保存
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.selectcheck.forEach((item) => {
            if (item) {
              this.ruleForm.mitIdList.push(item.id);
            }
          });
          this.ruleForm.tag = 1;
          axios
              .put("api/api_case/mitdata/" + this.ruleForm.id, this.ruleForm)
              .then((res) => {
                if (res.data.code === 10000) {
                  this.$message.success(res.data.msg);
                  this.dialogVisible = false;
                  this.handleCurrentChange(1);
                } else {
                  this.$message.error(res.data.msg);
                }
              });
        } else {
          return false;
        }
      });
    },
    //单用列表请求数据
    cover_case_list() {
      if (typeof this.ruleForm.module === "string") {
        this.$message.error("请先选择模块");
        return false;
      }
      this.cover_case_list_page_body.exact = this.ruleForm.only_api;
      this.cover_case_list_page_body.tag = 1;
      axios
          .post("/api/api_case/case/page", this.cover_case_list_page_body)
          .then((res) => {
            this.cover_list_data = res.data.data;
            this.cover_case_total = res.data.totalNum;
            if (this.cover_list_data.length === 0) {
              this.tocase("cover_no_case");
            } else if (this.cover_list_data.length === 1) {
              this.new_single_to_case.case_id = this.cover_list_data[0].id;
              this.tocase("cover_have_one_case");
            } else {
              this.cover_list_dialog = true;
            }
          });
    },

    // 单条转用例
    singleCase(row, type) {
      // this.clear_data();
      this.single_change_result = {};
      this.keep_to_result = {};
      this.singleTocase = row;
      this.new_single_to_case = {};
      if (type === "to_case") {
        this.new_single_to_case.id = row.id;
        this.new_single_to_case.single_body = row.single_body;
        this.new_single_to_case.assert_res = row.assert_res;
        this.new_single_to_case.name = row.only_api;
        this.new_single_to_case.project_id = row.project_id;
        this.new_single_to_case.req_method = row.req_method;
        this.new_single_to_case.host = "api.nextop.com";
        this.new_single_to_case.url = row.url;
        this.new_single_to_case.tag = [parseInt(row.tag)];
        this.source = "抓包";
        this.singleTocase.module = [];
        this.singleToCasedislog = true;
      }
      if (type === "keep_to_case") {
        this.ruleform_to_new();
        this.tocase("cover_have_case");
      }
    },
    ruleform_to_new() {
      this.new_single_to_case = {};
      this.new_single_to_case.id = this.ruleForm.id;
      this.new_single_to_case.project_id = this.ruleForm.project_id;
      this.new_single_to_case.single_body = this.ruleForm.single_body;
      this.new_single_to_case.assert_res = this.ruleForm.assert_res;
      this.new_single_to_case.name = this.ruleForm.only_api;
      this.new_single_to_case.req_method = this.ruleForm.req_method;
      this.new_single_to_case.host = "api.nextop.com";
      this.new_single_to_case.url = this.ruleForm.url;
      this.new_single_to_case.tag = this.ruleForm.tag;
      this.new_single_to_case.module = this.ruleForm.module;
    },
    select_cover_case() {
      this.cover_case_list();
    },
    //转用例/保存为用例
    tocase(singleTocase) {
      //列表直接转
      if (singleTocase === "singleTocase") {
        this.single_change_result = {};
        this.keep_to_result = {};
        this.new_single_to_case.case_id = "";
        this.new_single_to_case.module = this.singleTocase.module;
        this.new_single_to_case.project_id = this.singleTocase.project_id;
      }
      //编辑选择用例转
      if (singleTocase === "cover_have_case") {
        let select_case = this.$refs.cover_select_table.selection;
        if (select_case.length === 0) {
          this.$message.error("请选择要覆盖的用例");
          return false;
        }
        if (select_case.length > 1) {
          this.$message.error("只可覆盖单条用例,不可多选");
          return false;
        }
        this.new_single_to_case.case_id = select_case[0].id;
      }
      //编辑没有用例转
      if (singleTocase === "cover_no_case") {
        this.single_change_result = {};
        this.keep_to_result = {};
        this.ruleform_to_new();
        this.new_single_to_case.case_id = "";
      }
      //编辑有一条用例直接覆盖
      if (singleTocase === "cover_have_one_case") {
        this.single_change_result = {};
        this.keep_to_result = {};
        this.ruleform_to_new();
      }
      if (this.new_single_to_case.project_id === "") {
        this.$message.error("请选择项目");
        return false;
      }
      axios
          .post("/api/api_case/case/convertCase", this.new_single_to_case)
          .then((res) => {
            if (res.data.code === 10000) {
              this.single_change_result = res.data.data;
              this.keep_to_result = res.data.data;
              this.$message.success(res.data.msg);
              this.cover_list_dialog = false;
            } else {
              this.$message.error(res.data.msg);
            }
          });
    },

    // 批量转用例弹框数据
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
          this.more_single_to_case_form.mitIdList.push(select_data[i]["id"]);
          this.more_single_to_case_form.tag = [1];
        }
      } else {
        this.$message.error("请先选择用例");
      }
    },
    // 批量转用例
    more_to_case() {
      this.more_single_to_case_form.projectId = this.singleTocase.project_id;
      axios
          .post(
              "api/api_case/case/convertCase/batch",
              this.more_single_to_case_form
          )
          .then((res) => {
            if (res.data.code === 10000) {
              this.$message.success(res.data.msg);
              this.change_result = res.data.data;
            } else {
              this.$message.error(res.data.msg);
            }
          });
      // this.more_single_to_case_form_dislog = false;
    },
    //关闭弹框初始化数据
    clear_data() {
      this.new_single_to_case = {};
      this.singleTocase = {};
      this.ruleForm = {};
      this.single_change_result = {};
      this.keep_to_result = {};
      this.change_result = {};
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    lookresult() {
      this.resultdialog = true;
    },
    jsonprint(input_name) {
      console.log(input_name);
      if (this.ruleForm[input_name]) {
        try {
          var val = JSON.parse(this.ruleForm[input_name].replace(/'/g, '"'));
          if (typeof val == "number" || JSON.stringify(val) === "{}") {
            return false;
          } else {
            this.ruleForm[input_name] = JSON.stringify(val, null, 4);
          }
        } catch {
          return false;
        }
      }
    },
    get_case_list() {
      axios
          .get("/api/api_case/mitdata", {params: this.list_page_body})
          .then((res) => {
            if (res.data["code"] === 10000) {
              this.case_data = res.data.data;
              this.total = res.data["totalNum"];
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
      this.list_page_body.size = val;
      this.get_case_list();
    },
    //页码切换
    handleCurrentChange(val) {
      this.list_page_body.page = val;
      this.get_case_list();
    },

    addcase() {
      this.title = "新增用例";
      this.ruleForm = {
        only_api: "",
        project_id: "1",
        req_method: "get",
        url: "",
        tag: "",
        single_body: "",
        group_body: "",
        assert_res: "",
        extract_param: "",
        pre_sql: "",
        end_sql: "",
        result: "",
        source: "platform",
      };
      this.dialogVisible = true;
    },

    handleSelect(selection, row) {
      if (selection.indexOf(row) !== -1) {
        row.state = 1;
      } else {
        row.state = 0;
      }
    },
    handleSelectionChange(val) {
      this.selectcheck = val;
    },
    //页量切换
    handleSizeChangeCase(val) {
      this.cover_list_data.size = val;
      this.caselist();
    },

    //页码切换
    handleCurrentChangeCase(val) {
      this.cover_list_data.page = val;
      this.caselist();
    },
    get_project() {
      axios
          .post("/api/test_management/proList", this.list_page_body)
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.project = res.data.items;
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
    //获取项目
    get_tapd_projects() {
      axios
          .post("/api/test_management/prolist", {
            limit: 20,
            page: 1,
          })
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.tapd_project = res.data.data;
              console.log(this.tapd_project);
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
              this.module_options = res.data.items;
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
          val = item.label;
        }
      });
      return val;
    },
    get_env_name(raw) {
      let val = null;
      this.env_arr.forEach((item) => {
        if (String(raw.env) === String(item.value)) {
          val = item.label;
        }
      });
      return val;
    },
    get_has_case_name(raw) {
      let val = null;
      this.has_case.forEach((item) => {
        if (raw.status === item.value) {
          val = item.label;
        }
      });
      return val;
    },
    //获取模块名称
    get_module_name(raw) {
      let val = null;
      if (raw.module && raw.module !== "") {
        this.module_options.forEach((item) => {
          if (raw.module[0] === item.id) {
            val = item.name;
          }
          if (item.children) {
            item.children.forEach((dow_item) => {
              if (raw.module[1] === dow_item.id) {
                val += "-";
                val += dow_item.name;
              }
            });
          }
        });
      } else {
        return "-";
      }
      return val;
    },
    //列表初始化钉钉通讯录
    get_mail_list() {
      axios
          .post("/api/test_management/mail_list", {page: 1, limit: 1000})
          .then((res) => {
            if (res.data.code === 10000) {
              this.mail_list = res.data.items;
            }
          });
    },
    get_ishave_bug(row) {
      let val = "无";
      if (String(row.source) === "2") {
        val = "有";
      }
      return val;
    },
    json_editor_error(val, type) {
      if (
          val.toString() ===
          "Error: Parse error on line 1:\n" +
          "\n" +
          "^\n" +
          "Expecting 'STRING', 'NUMBER', 'NULL', 'TRUE', 'FALSE', '{', '[', got 'EOF'"
      ) {
        if (type === "single_body") {
          this.ruleForm.single_body = {};
        }
        if (type === "assert_res") {
          this.ruleForm.assert_res = {};
        }
      }
    },
  },
  created() {
    this.get_case_list();
    this.get_project();
    this.get_moudle();
    this.get_tapd_projects();
    this.get_mail_list();
  },
};
</script>
<style>
.w-e-toolbar {
  width: 760px;
}

.w-e-text-container {
  width: 760px;
}
</style>