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
            <a style="font-size: 13px">接口路径</a>
            <el-input
                clearable
                placeholder="请输入接口路径"
                v-model="list_page_body.url"
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
                style="width: 250px; margin-left: 10px"
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
                style="width: 250px; margin-left: 10px"
            ></el-date-picker>
          </div>

          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">有无用例</a>
            <el-select
                v-model="list_page_body.case_status"
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
                placeholder="请选择环境"
                style="width: 150px; margin-left: 10px"
            >
              <el-option
                  v-for="item in env_arr"
                  :key="item.id"
                  :label="item.env_name"
                  :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">创建人</a>
            <el-input
                clearable
                placeholder="请输入创建人"
                v-model="list_page_body.creator"
                style="width: 150px; margin-left: 10px"
                class="case_input"
            ></el-input>
          </div>
          <!-- <div style="float: left; margin-left: 10px">
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
          </div> -->

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
                @click="downloadMitFile"
                v-has="{class:'68'}"
            >下载mit工具
            </el-button>
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
              prop="name"
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
              label="服务名称"
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
              prop="case_status"
              label="有无用例"
              align="center"
              width="80"
          ></el-table-column>

          <!-- <el-table-column
              :formatter="get_ishave_bug"
              prop="source"
              label="有无bug"
              align="center"
              width="100"
          ></el-table-column> -->

          <el-table-column
              :formatter="get_env_name"
              prop="env"
              label="环境"
              align="center"
              width="100"
          ></el-table-column>

          <!-- <el-table-column
              prop="cookie"
              label="所属账号"
              align="center"
              width="300"
          ></el-table-column> -->

          <el-table-column
              prop="created_time"
              label="创建时间"
              align="center"
              width="200"
          ></el-table-column>
          <el-table-column
              prop="creator"
              label="创建人"
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
                  v-has="{class:'68'}"
              >转bug
              </el-button>
              <el-button
                  @click="putcase(scope.row, 'put')"
                  type="text"
                  size="small"
                  v-has="{class:'69'}"
              >编辑转
              </el-button
              >
              <el-button
                  type="text"
                  v-if="scope.row.status === 1"
                  @click="singleCase(scope.row, 'to_case')"
                  size="small"
                  v-has="{class:'70'}"
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

               <el-form-item label="用例名称" prop="name" style="width: 50%;float: left;">
          <el-input v-model="ruleForm.name" placeholder="请详细输入用例名称" style="width: 300px;"></el-input>
        </el-form-item>

        <el-form-item label="接口路径" prop="url" style="width: 50%;float: left;">
          <el-input v-model="ruleForm.url" placeholder="请输入域名后面的接口url路径" style="width: 300px;"></el-input>
        </el-form-item>

        <el-form-item label="请求方式" prop="req_method" style="width: 50%;float: left;">
          <el-radio-group v-model="ruleForm.req_method">
            <el-radio v-model="ruleForm.req_method" label="GET">GET</el-radio>
            <el-radio v-model="ruleForm.req_method" label="POST">POST</el-radio>
            <el-radio v-model="ruleForm.req_method" label="PUT">PUT</el-radio>
            <el-radio v-model="ruleForm.req_method" label="DELETE">DELETE</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="延时时间" prop="delay_time" style="width: 50%;float: left;">
          <el-input v-model="ruleForm.delay_time" placeholder="请详延时时间(数字)" type="number"
                    style="width: 300px;"></el-input>
        </el-form-item>

        

        <el-form-item label="所属项目" prop="project_id" style="width: 50%;float: left;">
          <el-select v-model="ruleForm.project_id" clearable filterable style="width: 150px;float:left;"
                     @change="add_select_project">
            <el-option v-for="item in project" :key="item.id" :label="item.project_name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用例类型" prop="tag" style="width: 50%;float: left;">
          <el-select v-model="ruleForm.tag" clearable filterable placeholder="请选择"
                     style="width: 250px;float: left;">
            <el-option v-for="item in tags" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属模块" prop="module" style="width: 50%;float: right;">
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


        

        <el-form-item label="接口参数类型" prop="content_type" style="width: 50%;float: left;">
          <el-radio-group v-model="ruleForm.content_type">
            <el-radio v-model="ruleForm.req_method" label="application/json">json</el-radio>
            <el-radio v-model="ruleForm.req_method" label="form-data">data</el-radio>
            <el-radio v-model="ruleForm.req_method" label="application/x-www-form-urlencoded">urlencoded</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="运行环境" prop="env" style="width: 50%;float: left;">
          <el-cascader v-model="ruleForm.execution_env"
                       placeholder="请搜索运行环境"
                       :options="env_options"
                       filterable clearable
                       :props="{value:'id',label:'env_name'}"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="运行账号" prop="cookie" style="width: 50%;float: left;">
          <el-select v-model="ruleForm.execution_account" placeholder="请搜索运行账号" clearable filterable>
            <el-option v-for="item in account" :key="item.id" :label="item.account_name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="启用job" prop="use_job" style="width: 50%;float: left;">
          <el-radio-group v-model="ruleForm.use_job" @change="selectJobChange($event)">
            <el-radio v-model="ruleForm.use_job" label="1">启用</el-radio>
            <el-radio v-model="ruleForm.use_job" label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="选择job" prop="delay_time" style="width: 50%;float: left;">
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

        <div id="header_menu_div"
             style="margin-left: 0; flex-direction: column; width: 100%;height: 440px;float: left;">

             <el-form-item label="单接口参数" prop="single_body" style="float: left;width: 100%;height: 300px;">
            <el-tooltip placement="top">
              <div slot="content">单个接口调试参数，支持关键词<br/>--file.:使用文件参数的参数名，使用实例:"id":"file.xxId"</div>
            <vue-json-editor v-model="ruleForm.single_body" :key="key" :mode="'code'"
                             @has-error="json_editor_error($event,'single_body')"
                             style="float: left;width: 100%;height: 300px;">
            </vue-json-editor>
          </el-tooltip>
          </el-form-item>


          <el-form-item label="多接口参数" prop="group_body" style="float: left;width: 100%;height: 300px;">
            <el-tooltip placement="top">
              <div slot="content">组合执行/批量执行时使用的参数，支持关键词<br/>
                --file.:使用文件参数的参数名，使用实例:"id":"file.xxId",每次使用都会根据文件参数中的配置更改文件内容
                <br/>--parmes.:使用其他接口中的提取参数，使用实例:"id":"parmes.xxId"
                <br/>--func.:使用use_fixture中提前配置的自定义方法，使用实例:"id":"func.xxId"
                <br/>--arrays.:参数化，使用arrays参数会自动将单条用例组合为多条用例，使用实例:"id":"arrays.[1,'1',null,'999999','','parmes.xxx']"
                <br/>arrays参数目前只支持单层结构，即参数化的参数属于最外层
              </div>
            <vue-json-editor v-model="ruleForm.group_body" :key="key" :mode="'code'"
                             style="float: left;width: 100%;height: 300px;"
                             @has-error="json_editor_error($event,'group_body')" lang="zh">
            </vue-json-editor>
            </el-tooltip>
          </el-form-item>

          <el-form-item label="断言" prop="assert_res" style="float: left;width: 100%;height: 200px;">
            <el-tooltip placement="top">
              <div slot="content">接口调用完成后，判断接口是否执行成功的参数校验<br/>
                例：断言设置为{"code":50}即在接口调用完成后检查接口返回内容中code是否等于50,
                <br/>--支持jsonpath,例：断言设置为{"data[0].result[1].values.id":"50"}即检查接口返回内容中data下第一个数据中的result下的第2个数据的values下的id是否等于50
              <br/>--未设置断言时默认断言为：status_code == 200
              </div>
            <vue-json-editor v-model="ruleForm.assert_res" :key="key" :mode="'code'"
                             style="float: left;width: 100%;height: 200px;"
                             @has-error="json_editor_error($event,'assert_res')" lang="zh"></vue-json-editor>
                             </el-tooltip>
          </el-form-item>

          <el-form-item label="前置SQL" prop="pre_sql" style="float: left;width: 100%;height: 200px;">
            <el-tooltip placement="top">
              <div slot="content">前置sql,支持执行或查询sql,在接口请求前调用<br/>
                --执行sql,key使用insert、update、delete，例:{"update":"update xxxx set xxxx = 'xxx' where id = xxx;"}
                <br/>--查询sql,key使用自定义名称，查询完成会赋值给该key,在接口参数中可直接使用parmes关键词使用,例:{"xiaoyu":"select id from xxxx where create_time='xxxx-xx-xx';"}
              </div>
            <vue-json-editor v-model="ruleForm.pre_sql" :key="key" :mode="'code'"
                             style="float: left;width: 100%;height: 200px;"
                             @has-error="json_editor_error($event,'pre_sql')" lang="zh"></vue-json-editor>
                            </el-tooltip>
          </el-form-item>

          <el-form-item label="后置SQL" prop="end_sql" style="float: left;width: 100%;height: 200px;">
            <el-tooltip placement="top">
              <div slot="content">后置sql,支持执行或查询sql,在接口请求后调用<br/>
                --执行sql,key使用insert、update、delete，例:{"update":"update xxxx set xxxx = 'xxx' where id = xxx;"}
                <br/>--查询sql,key使用自定义名称，查询接口会赋值给该key,在接口参数中可直接使用parmes关键词使用,例:{"xiaoyu":"select id from xxxx where create_time='xxxx-xx-xx';"}
              </div>
            <vue-json-editor v-model="ruleForm.end_sql" :key="key" :mode="'code'"
                             style="float: left;width: 100%;height: 200px;"
                             @has-error="json_editor_error($event,'end_sql')" lang="zh"></vue-json-editor>
                            </el-tooltip>
          </el-form-item>

          <el-form-item label="提取参数" prop="extract_param" style="float: left;width: 100%;height: 200px;">
            <el-tooltip placement="top">
              <div slot="content">接口调用成功后，断言执行前提取接口响应中的内容，赋值给指定key，在后续接口参数中使用<br/>
                --提取方式支持jsonpath,例：设置为{"xiaoyu_id":"data[0].result[1].values.id"}即提取接口返回内容中data下第一个数据中的result下的第2个数据的values下的id赋值给xiaoyu_id,在其他接口中使用parmes.xiaoyu_id即可使用
                </div>
            <vue-json-editor v-model="ruleForm.extract_param" :key="key" :mode="'code'"
                             style="float: left;width: 100%;height: 200px;"
                             @has-error="json_editor_error($event,'extract_param')" lang="zh"></vue-json-editor>
                            </el-tooltip>
          </el-form-item>
          

        </div>
        <div style="z-index:6666;position: fixed;margin-left: 700px;margin-top: 300px;float: left;">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
              <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>
          </div>
              


      </el-form>

    </el-dialog>

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
          <el-select v-model="singleTocase.project_id" clearable filterable>
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
              clearable filterable
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
              clearable filterable
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
              clearable filterable
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
              clearable filterable
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

      env_arr: [],

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
        hostName: "",
        creator:localStorage.getItem("username"),
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
      env_options:[],
      account:[],
      new_single_to_case: {},
      more_single_to_case_form: {
        mitIdList: [],
        tag: 1,
        module: [],
        projectId: 1,
      },
      cover_case_total: 0,
      cover_list_data: [],
      job_all_popid_arr: [],
      job_parm_dis: false,
      job_run_id_data: [],
      job_form: {job_parmes: "",},
      cover_list_dialog: false,
      job_arr: [],
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
      changejob:true,
      resultdialog: false,
      title: "批量转换用例",
      tags: [{value: 1, label: '联调环境'}, {value: 2, label: '预发环境'}],
      have_bug: [
        {value: 1, label: "无"},
        {value: 2, label: "有"},
      ],
      has_case: [
        {value: 0, label: "未知"},
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
        tag:1,
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
    this.$set(this.list_page_body,'creator',localStorage.getItem("username"));
  },
  methods: {
    add_select_project() {},
    selectJobChange(val){
      if(val == '1'){
        this.changejob = false;
      }else{
        this.changejob = true;
      }
    },
    job_click() {
      if(this.changejob == true){
        return
      }
      if (this.title === '编辑用例') {
        console.log(this.title)
        this.job_handle_change();
      } else {
        this.job_form = {job_parmes: ""};
        this.title = '用例';
      }

      this.job_parm_dis = true;
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
    putcase(row, type) {
      console.log(row)
      this.title = "编辑用例";
      this.ruleForm = {
        name: row.name,
        req_method: row.req_method,
        content_type:row.content_type,
        url: row.url,
        tag: row.tag,
        single_body:this.str_to_json(row.single_body),
        group_body:this.str_to_json(row.single_body),
        assert_res:this.str_to_json(row.assert_res),
        extract_param: {},
        pre_sql: {},
        end_sql: {},
        source: "抓包转化",
        delay_time: 0,
        use_job: "0",
        module:eval(row.plat_module),
        project_id:row.project_id,
        creator_nickname:localStorage.getItem("username")
      };
      // this.ruleForm = null;
      // this.ruleForm = JSON.parse(JSON.stringify(row));
      // this.ruleForm.module = [];
      // this.ruleForm.use_job = "0";
      // this.ruleForm.content_type = String(row.content_type);
      // this.ruleForm.tag = row.tag;
      // this.ruleForm.delay_time = "0"
      // this.ruleForm.content_type = 'json'
      // this.job_form.job_parmes = null;
      // this.ruleForm.job_id = null;
      // this.job_form.liushuixian_id = null;
      // this.job_form.popId = null;
      // this.ruleForm.single_body = row.single_body;
      // this.ruleForm.group_body = {};
      // this.ruleForm.pre_sql = {};
      // this.ruleForm.end_sql = {};
      // this.ruleForm.extract_param = {};
      // this.ruleForm.assert_res = row.result;
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
          this.ruleForm.tag = [1];
          axios
              .post("api/test_case/CreateCase",this.ruleForm)
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
        this.new_single_to_case.single_body = this.str_to_json(row.single_body);
        this.new_single_to_case.group_body = this.str_to_json(row.single_body);
        this.new_single_to_case.assert_res = row.assert_res;
        this.new_single_to_case.name = row.name;
        this.new_single_to_case.project_id = row.project_id;
        this.new_single_to_case.req_method = row.req_method;
        this.new_single_to_case.url = row.url;
        this.new_single_to_case.content_type = row.content_type;
        this.new_single_to_case.tag = [row.tag];
        this.new_single_to_case.creator_nickname = localStorage.getItem('username');
        this.new_single_to_case.source = "抓包转化";
        this.new_single_to_case.extract_param = {};
        this.new_single_to_case.pre_sql = {};
        this.new_single_to_case.end_sql = {};
        this.new_single_to_case.use_fixture = {};
        this.new_single_to_case.delay_time = 0;
        this.new_single_to_case.use_job = 0;
        this.singleTocase.module = eval(row.plat_module);
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
          .post("/api/test_case/CreateCase", this.new_single_to_case)
          .then((res) => {
            if (res.data.code === 10000) {
              // this.single_change_result = res.data.data;
              // this.keep_to_result = res.data.data;
              this.$message.success(res.data.msg);
              this.cover_list_dialog = false;
              this.singleToCasedislog = false;
            } else {
              this.$message.error(res.data.msg);
            }
          });
    },
    str_to_json(row){
      try{
        return JSON.parse(row)
      }catch{
        return eval('(' + row.replace(/None/g,'null').replace(/False/g,'false').replace(/True/g,'true').replace('"[','[').replace(']"',']').replace('["','[').replace('"]',']').replace(/[\r|\n|\t]/g,'') + ')')
    
      }
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
    downloadMitFile(){
      window.open(window.VUE_APP_BASE_API+"/static/MitForTester.rar")
    },
    // 批量转用例
    more_to_case() {
      this.more_single_to_case_form.projectId = this.singleTocase.project_id;
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
              // this.change_result = res.data.data;
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
          .post("/api/test_case/MitCaseList", this.list_page_body)
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
        if (raw.tag === item.value) {
          val = item.label;
        }
      });
      return val;
    },
    get_env_name() {
      return '测试环境';
    },
    get_has_case_name(raw) {
      let val = null;
      this.has_case.forEach((item) => {
        if (raw.case_status === item.value) {
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
    //获取环境列表
    get_select_env_list() {
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
    get_env_list(){
      axios
          .post("/api/test_management/envlist", {page: 1, limit: 1000})
          .then((res) => {
            if (res.data.code === 10000) {
              this.env_arr = res.data.items;
            }
          });
    },
    get_account() {
      axios
          .post("/api/test_management/AccountList", {page:1,limit:1000})
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
    // this.get_tapd_projects();
    this.get_mail_list();
    this.get_job_list();
    this.get_env_list();
    this.get_select_env_list();
    this.get_account();
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
