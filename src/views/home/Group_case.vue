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
            <a style="font-size: 13px">项目名称</a>
            <el-select v-model="list_page_body.projectId" clearable filterable style="width: 150px; margin-left: 10px"
                       >
              <el-option v-for="item in project_list" :key="item.id" :label="item.project_name" :value="item.id">
              </el-option>
            </el-select>
          </div>

          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">组合名称</a>
            <el-input placeholder="请输入组合名称" v-model="list_page_body.name" style="width: 150px; margin-left: 10px"
                      class="case_input"></el-input>
          </div>

          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">所属模块</a>
            <el-cascader
                style="width: 150px; margin-left: 10px"
                v-model="list_page_body.module"
                :options="module_options"
                :props="{ value: 'id', label: 'name',multiple: false, checkStrictly: false}"
                :show-all-levels="false"
                clearable></el-cascader>
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

          <div style="float: right; margin-right: 10px">
            <el-button type="primary"
                       style="background-color: #3573fe;margin-right: 20px; float: right;margin-top: 50px;text-align: center;"
                       size="small" @click="addgroup">添加用例
            </el-button>
            <!-- <el-button type="primary"
                       style="background-color: #3573fe;margin-right: 20px; float: right;margin-top: 50px;text-align: center;"
                       size="small" @click="group_env_options_dislog=true">批量执行
            </el-button> -->
          </div>
        </div>
      </div>
      <!--      下拉end-->

      <!--表格start-->
      <div style="margin-top: 10px; float: left; width: 98%; text-align: center">
        <template>
          <el-table
              :data="case_data" :v-loading="isLoading" style="font-size: 13px;left: 1%;border-radius: 5px;"
              :header-cell-style="{ background: '#E7EAED' }"
              height="650" width="98%" :row-style="{ height: '40px' }"
              :cell-style="{ padding: '0px' }" :highlight-current-row=true
              :stripe=true :border=true type="selection" @select="handleSelect"
              @selection-change="handleSelectionChange">
            <el-table-column type="selection" fixed="left" width="55">
            </el-table-column>
            <el-table-column prop="id" label="组合id" align="center" width="70">
            </el-table-column>
            <el-table-column prop="name" label="组合名称" align="center" width="350">
            </el-table-column>
            <el-table-column
                :formatter="get_module_name"
                prop="module"
                label="所属模块"
                align="center"
                width="200"
            >
            </el-table-column>
            <el-table-column
                prop="description"
                label="组合描述"
                align="center"
                width="300"
            >
            </el-table-column>
            <el-table-column
                prop="result"
                label="状态"
                align="center"
                width="150"
            >
              <template slot-scope="scope">
                <button @click="viewResult(scope.row)"
                        style="background-color: transparent;border:0;font-size: 10px;color: #409EFF">
                  {{ scope.row.result }}
                </button>
              </template>
            </el-table-column>
            <el-table-column
                prop="creator_nickname"
                label="创建人"
                align="center"
                width="150"
            >
            </el-table-column>
            <el-table-column
                prop="created_time"
                label="创建时间"
                align="center"
                width="200"
            >
            </el-table-column>

            <el-table-column style="background-color: #ffffff" fixed="right" label="操作" width="200" align="center">
              <template slot-scope="scope">
                <el-button @click="putgroup(scope.row,'put')"
                           type="text" size="small">编辑
                </el-button>
                <el-button @click="putgroup(scope.row,'copy')" type="text" size="small">复制</el-button>
                <el-button type="text" @click="deletecase(scope.row)"
                           v-if="scope.row.creator_nickname === user_name "
                           size="small" style="color: red">删除
                </el-button>
                <el-button type="text" @click="selectEnv(scope.row,1)" size="small">执行</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <!--表格end-->
      <div style="float: right">
        <!--分页start-->
        <el-pagination
            v-on:size-change="handleSizeChange" v-on:current-change="handleCurrentChange"
            :current-page="list_page_body.page"
            :page-sizes="[20, 50, 100]" :page-size="20" layout="total, sizes, prev, pager, next, jumper"
            :total="total" style="float: right; margin-top: 10px; margin-right: 20px"></el-pagination>
        <!--分页end-->
      </div>


    </div>
    <!--删除二次确认弹框-->
    <el-dialog title="删除" :visible.sync="delete_again_alter" width="350px" style="height: 300px;margin-top: 300px;"
               :close-on-press-escape="false"
               :close-on-click-modal="false">
      <div>是否确认删除</div>
      <div style="margin-right: 10px;margin-top:5px;float: right">
        <el-button @click="delete_again_alter = false">取 消</el-button>
        <el-button type="primary" @click="delete_group_case">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加用例列表dialog -->
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
                         style="width: 150px; margin-left: 10px"
                         >
                <el-option v-for="item in project_list" :key="item.id" :label="item.project_name" :value="item.id">
                </el-option>
              </el-select>
            </div>

            <div style="float: left; margin-left: 10px">
              <a style="font-size: 10px">用例名称</a>
              <el-input placeholder="请输入用例名称" v-model="case_list_page_body.name" style="width: 140px; margin-left: 10px"
                        class="case_input"></el-input>
            </div>

            <div style="float: left; margin-left: 10px">
              <a style="font-size: 10px">用例类型</a>
              <el-select v-model="case_list_page_body.tag" clearable filterable placeholder="请选择"
                         style="width: 150px; margin-left: 10px">
                <el-option
                    v-for="item in tags"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div style="float: left; margin-left: 10px">
              <a style="font-size: 10px">所属模块</a>
              <el-cascader
                  style="width: 150px; margin-left: 10px"
                  v-model="case_list_page_body.module"
                  :options="module_options"
                  :props="{ value: 'id', label: 'name',multiple: false, checkStrictly: false}"
                  :show-all-levels="false"
                  clearable
              ></el-cascader>
            </div>

            <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">创建人</a>
            <el-input placeholder="请输入创建人" clearable v-model="case_list_page_body.create_user"
                      style="width: 150px; margin-left: 10px"
                      class="case_input"></el-input>
          </div>

            <div style="float: left; padding-left: 5px">
              <el-button plain icon="el-icon-search" @click="handleCurrentChangeCase(1)">查询</el-button>
            </div>
            <div style="float: right; margin-right: 10px">
              <div style=" width: 100px; float: right; margin-top: 10px; height: 40px;  text-align: center; ">
                <el-row>
                  <el-button type="primary" style="background-color: #3573fe" @click="add_select_case()">确定</el-button>
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
                :data="caselistdata" ::v-loading="isLoading" style="font-size: 13px" ref="add_select_table"
                :header-cell-style="{ background: '#E7EAED' }" height="500"
                width="100%" :row-style="{ height: '40px' }" :cell-style="{ padding: '0px' }"
                :highlight-current-row="true" :stripe="true" :border="true" type="selection">

              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="name" label="用例名称" align="center" width="400"></el-table-column>
              <el-table-column prop="module" label="所属模块" align="center" width="200"
                               :formatter="get_module_name"></el-table-column>
              <el-table-column prop="url" label="请求地址" align="center" width="300"></el-table-column>
              <el-table-column prop="tag" label="所属标签" align="center" width="100"
                               :formatter="get_tag_name"></el-table-column>
              <el-table-column prop="source" label="用例来源" align="center" width="100"></el-table-column>
              <el-table-column prop="creator_nickname" label="创建人" align="center" width="100"></el-table-column>
              <el-table-column prop="created_time" label="创建时间" align="center" width="200"></el-table-column>

            </el-table>
          </template>
        </div>
        <!--表格end-->
        <div style="float: right">
          <!--分页start-->
          <el-pagination v-on:size-change="handleSizeChangeCase"
                         v-on:current-change="handleCurrentChangeCase" :current-page="case_list_page_body.page"
                         :page-sizes="[10, 20, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper"
                         :total="case_total" style="float: right; margin-top: 10px; margin-right: 20px"></el-pagination>
          <!--分页end-->
        </div>
      </div>
    </el-dialog>

    <!--    新增弹框-->
    <el-dialog :visible.sync="add_group_case_dis" width="1200px" style="margin-top: -20px; height: 100%" show-footer
               :close-on-press-escape="false"
               @closed="formdialogclosed"
               :close-on-click-modal="false">
      <span slot="title" style="font-size:20px;">{{ title }}</span>
      <el-form :model="ruleForm" :rules="rules" :inline-message="true" :status-icon=true ref="ruleForm">

        <el-form-item label="组合名称" prop="name" style="width: 500px!important; float: left;">
          <el-input v-model="ruleForm.name" placeholder="请输入组合名称" style="width: 300px"></el-input>
        </el-form-item>

        <el-form-item label="所属项目" prop="project_id" style="float: left;width: 500px;">
          <el-select v-model="ruleForm.project_id" clearable filterable style="width: 300px;"
                     @change="select_project">
            <el-option v-for="item in project_list" :key="item.id" :label="item.project_name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属模块" prop="module" style="float: left;width: 500px;">
          <el-cascader
              v-model="ruleForm.module"
              style="width: 300px"
              :options="module_options"
              :props="{ value: 'id', label: 'name'}"
              :show-all-levels="false"
              clearable
          ></el-cascader>
        </el-form-item>

        <el-form-item label="组合描述" prop="description" style="float: left;width: 500px;">
          <el-input type="textarea" autosize v-model="ruleForm.description" placeholder='请输入组合描述'
                    style="width: 300px;margin-left: 10px"></el-input>
        </el-form-item>

        <el-form-item label="用例列表" prop="caseId_list" style="float: left;width: 1150px;">

          <div style="margin-top: 40px; float: top; width: 1150px; text-align: center">
            <el-button type="primary" @click="caselist" style="float: left;margin-bottom: 10px;">添加明细</el-button>
            <el-button type="primary" @click="clearcaselist" style="float: left;margin-bottom: 10px;">全部移除</el-button>
            <el-form-item style="float: right;width: 275px;">
              <!-- <el-button type="primary" @click="add_single_case" style="float: left;">新增单用例</el-button> -->
              <el-button type="primary" @click="submitForm('ruleForm')" style="float: left;">保存</el-button>
              <el-button @click="cancel_again_alter = true" style="float: left;">取消</el-button>
            </el-form-item>

            <el-table :data="selectcheckCase" :v-loading="isLoading" style="font-size: 13px"
                      :header-cell-style="{ background: '#E7EAED' }" height="500" row-key="id" ref="singleCaseList"
                      width="100%" :row-style="{ height: '40px' }" :cell-style="{ padding: '0px' }"
                      :highlight-current-row="true" :stripe="true" :border=true>
              <!-- <el-table-column prop="sorts" label="排序" width="100px" sortable="custom" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.sorts" @input="sort_input($event,scope.$index)" required></el-input>
                </template>
              </el-table-column> -->
              <el-table-column prop="id" label="用例id" width="70"></el-table-column>
              <el-table-column prop="name" label="用例名称" width="250"></el-table-column>
              <el-table-column prop="delay_time" label="延时(s)" align="center" width="70"></el-table-column>
              <el-table-column prop="url" label="请求地址" width="300"></el-table-column>
              <el-table-column prop="module" label="所属模块" width="150" :formatter="get_module_name"></el-table-column>
              <el-table-column prop="tag" label="所属标签" width="100" :formatter="get_tag_name"></el-table-column>
              <el-table-column prop="source" label="用例来源" width="100"></el-table-column>
              <el-table-column prop="creator_nickname" label="创建人" width="100"></el-table-column>
              <el-table-column prop="created_time" label="创建时间" width="200"></el-table-column>
              <el-table-column
                  style="background-color: #ffffff"
                  fixed="right"
                  label="操作"
                  width="150"
                  align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="update_select_case(scope.row)" size="small">
                    编辑
                  </el-button>
                  <el-button type="text" @click="delete_select_case(scope.row,scope.$index)" size="small">删除</el-button>
                  <el-button type="text" @click="selectEnv(scope.row,3)" size="small">执行一次</el-button>
                </template>
              </el-table-column>
            </el-table>

          </div>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--删除二次确认弹框-->
    <el-dialog title="关闭弹框" :visible.sync="cancel_again_alter" width="350px" style="height: 300px;margin-top: 300px;"
               :close-on-press-escape="false"
               :close-on-click-modal="false">
      <div>是否关闭弹框</div>
      <div style="margin-right: 10px;margin-top:5px;float: right">
        <el-button @click="cancel_again_alter = false">取 消</el-button>
        <el-button type="primary"
                   @click="cancel_again_alter = false;add_group_case_dis = false;this.selectcheckCase=[]">确 定
        </el-button>
      </div>
    </el-dialog>

    <!--选择执行环境弹框-->
    <el-dialog title="选择执行环境" :visible.sync="group_env_options_dislog" width="30%"
               style="margin-top: 250px;height: 400px;"
               :close-on-press-escape="false"
               :close-on-click-modal="false"
               @close="group_env_options_dislog=false"
    >
      <el-form :model="envForm" :rules="env_rules" ref="envForm"
               label-width="auto">

        <el-form-item label="运行环境" prop="env" style="padding-left: 100px">
          <el-cascader v-model="envForm.env"
                       placeholder="请搜索运行环境"
                       :options="env_options"
                       filterable clearable
                       :props="{value:'id',label:'env_name'}"
          ></el-cascader>
        </el-form-item>
        <el-form-item
            label="运行账号"
            prop="cookie"
            style="padding-left: 100px"
        >
          <el-select
              v-model="envForm.cookie"
              placeholder="请搜索运行账号"
              clearable filterable>
            <el-option
                v-for="item in account"
                :key="item.id"
                :label="item.account_name"
                :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 增加选择项，是否更新账号 ---wangmingming  2023-08-09 -->
        <el-form-item label="更新账号" prop="is_edit" style="padding-left: 100px">
          <el-radio-group v-model="envForm.is_edit">
            <el-radio v-model="envForm.is_edit" label="1">是</el-radio>
            <el-radio v-model="envForm.is_edit" label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label-width="30%">
          <el-button @click="group_env_options_dislog = false"
                     style="margin-right: 10px;float: right;margin-top: 10px;">取 消
          </el-button>
          <el-button type="primary" @click="excutioncase"
                     style="margin-right: 10px;float: right;margin-top: 10px;">确 定
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 单组合用例调试执行结果弹窗 start -->
    <el-dialog :visible.sync="run_groupcase_dislog" width="50%" title="执行结果"
               style="margin-top: 50px;" :close-on-press-escape="false"
               :close-on-click-modal="false" @close="run_groupcase_dislog=false">
      <el-form :model="group_case_result_form" ref="group_case_result_form" label-width="auto">

        <el-form-item label="用例名称" prop="name">
          <el-input disabled v-model="group_case_result_form.name"></el-input>
        </el-form-item>

        <el-form-item label="运行环境" prop="env">
          <el-input disabled v-model="group_case_result_form.runEnv"></el-input>
        </el-form-item>

        <el-form-item label="运行耗时" prop="elapsed">
          <el-input disabled v-model="group_case_result_form.elapsed"></el-input>
        </el-form-item>

        <el-form-item label="执行时间" prop="elapsed">
          <el-input disabled v-model="group_case_result_form.run_time"></el-input>
        </el-form-item>

        <el-form-item label="返回结果" prop="response" style="width: 90%; margin-left: 10px;float: left;">
          <vue-json-editor v-model="group_case_result_form.response" :mode="'code'" lang="zh">
          </vue-json-editor>
        </el-form-item>

        <el-form-item label="请求参数" prop="params" style="width: 90%; margin-left: 10px;float: left;">
          <vue-json-editor v-model="group_case_result_form.params" :mode="'code'" lang="zh">
          </vue-json-editor>
        </el-form-item>

        <el-form-item label="失败原因" prop="assert_data" style="width: 90%; margin-left: 10px;float: left;">
          <vue-json-editor v-model="group_case_result_form.assert_data" :mode="'code'" lang="zh">
          </vue-json-editor>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 单用例执行弹窗 end-->

    <!--用例编辑窗start-->
    <el-dialog
        :visible.sync="single_case_update_dis"
        width="1000px"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        style="margin-top: 20px;height: 102%"
        @close="single_case_update_dis=false"

    >
      <span slot="title" style="font-size: 20px">编辑用例</span>

      <el-form :model="single_case_form" :rules="rules" :inline-message="true" :status-icon="true" ref="ruleForm"
               label-width="auto">

               <el-form-item label="用例名称" prop="name" style="width: 50%;float: left;">
          <el-input v-model="single_case_form.name" placeholder="请详细输入用例名称" style="width: 300px;"></el-input>
        </el-form-item>

        <el-form-item label="接口路径" prop="url" style="width: 50%;float: left;">
          <el-input v-model="single_case_form.url" placeholder="请输入域名后面的接口url路径" style="width: 300px;"></el-input>
        </el-form-item>

        <el-form-item label="请求方式" prop="req_method" style="width: 50%;float: left;">
          <el-radio-group v-model="single_case_form.req_method">
            <el-radio v-model="single_case_form.req_method" label="GET">GET</el-radio>
            <el-radio v-model="single_case_form.req_method" label="POST">POST</el-radio>
            <el-radio v-model="single_case_form.req_method" label="PUT">PUT</el-radio>
            <el-radio v-model="single_case_form.req_method" label="DELETE">DELETE</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="延时时间" prop="delay_time" style="width: 50%;float: left;">
          <el-input v-model="single_case_form.delay_time" placeholder="请详延时时间(数字)" type="number"
                    style="width: 300px;"></el-input>
        </el-form-item>

        

        <el-form-item label="所属项目" prop="project_id" style="width: 50%;float: left;">
          <el-select v-model="single_case_form.project_id" clearable filterable style="width: 150px;float:left;"
                     @change="add_select_project">
            <el-option v-for="item in project_list" :key="item.id" :label="item.project_name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用例类型" prop="tag" style="width: 50%;float: left;">
          <el-select v-model="single_case_form.tag" multiple clearable filterable placeholder="请选择"
                     style="width: 250px;float: left;">
            <el-option v-for="item in tags" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属模块" prop="module" style="width: 50%;float: right;">
          <el-cascader
              v-model="single_case_form.module"
              style="width: 150px;float: left;"
              :options="module_options"
              :props="{ value: 'id', label: 'name'}"
              collapse-tags
              :show-all-levels="false"
              clearable
          ></el-cascader>
        </el-form-item>


        

        <el-form-item label="接口参数类型" prop="content_type" style="width: 50%;float: left;">
          <el-radio-group v-model="single_case_form.content_type">
            <el-radio v-model="single_case_form.req_method" label="application/json">json</el-radio>
            <el-radio v-model="single_case_form.req_method" label="form-data">data</el-radio>
            <el-radio v-model="single_case_form.req_method" label="application/x-www-form-urlencoded">urlencoded</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="运行环境" prop="env" style="width: 50%;float: left;">
          <el-cascader v-model="single_case_form.execution_env"
                       placeholder="请搜索运行环境"
                       :options="env_options"
                       filterable clearable 
                       :props="{value:'id',label:'env_name'}"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="运行账号" prop="cookie" style="width: 50%;float: left;">
          <el-select v-model="single_case_form.execution_account" placeholder="请搜索运行账号" clearable filterable>
            <el-option v-for="item in account" :key="item.id" :label="item.account_name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="启用job" prop="use_job" style="width: 50%;float: left;">
          <el-radio-group v-model="single_case_form.use_job" @change="selectJobChange($event)">
            <el-radio v-model="single_case_form.use_job" label="1">启用</el-radio>
            <el-radio v-model="single_case_form.use_job" label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="选择job" prop="job_id" style="width: 50%;float: left;">
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
             style="margin-left: 0px; flex-direction: column; width: 100%;height: 440px;float: left;">

             <el-form-item label="单接口参数" prop="single_body" style="float: left;width: 100%;height: 300px;">
            <el-tooltip placement="top">
              <div slot="content">单个接口调试参数，支持关键词<br/>--file.:使用文件参数的参数名，使用实例:"id":"file.xxId"</div>
            <vue-json-editor v-model="single_case_form.single_body" :key="key" :mode="'code'"
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
            <vue-json-editor v-model="single_case_form.group_body" :key="key" :mode="'code'"
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
            <vue-json-editor v-model="single_case_form.assert_res" :key="key" :mode="'code'"
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
            <vue-json-editor v-model="single_case_form.pre_sql" :key="key" :mode="'code'"
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
            <vue-json-editor v-model="single_case_form.end_sql" :key="key" :mode="'code'"
                             style="float: left;width: 100%;height: 200px;"
                             @has-error="json_editor_error($event,'end_sql')" lang="zh"></vue-json-editor>
                            </el-tooltip>
          </el-form-item>

          <el-form-item label="提取参数" prop="extract_param" style="float: left;width: 100%;height: 200px;">
            <el-tooltip placement="top">
              <div slot="content">接口调用成功后，断言执行前提取接口响应中的内容，赋值给指定key，在后续接口参数中使用<br/>
                --提取方式支持jsonpath,例：设置为{"xiaoyu_id":"data[0].result[1].values.id"}即提取接口返回内容中data下第一个数据中的result下的第2个数据的values下的id赋值给xiaoyu_id,在其他接口中使用parmes.xiaoyu_id即可使用
                </div>
            <vue-json-editor v-model="single_case_form.extract_param" :key="key" :mode="'code'"
                             style="float: left;width: 100%;height: 200px;"
                             @has-error="json_editor_error($event,'extract_param')" lang="zh"></vue-json-editor>
                            </el-tooltip>
          </el-form-item>
        </div>
        <div style="z-index:6666;position: fixed;margin-left: 700px;margin-top: 300px;float: left;">
            <el-form-item>
              <el-button type="primary" @click="submitSingleForm()">确定</el-button>
              <el-button @click="single_case_update_dis = false">取消</el-button>
              <!-- <el-button type="primary" @click="selectEnv(ruleForm)">调试</el-button> -->
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
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import axios from "axios";
import vueJsonEditor from "vue-json-editor";
import Sortable from 'sortablejs'

export default {

  components: {Breadcrumb, vueJsonEditor},
  name: "Group_case",
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
      more_excution_case_arr: [],
      single_case_active: "single_body",
      //项目list
      user_name: "",
      project_list: [],
      project_name: "",
      module_options: [],
      env_options: [],
      delete_id: "",
      //分页请求数据
      list_page_body: {
        page: 1,
        size: 20,
        module: [],
        create_user:localStorage.getItem("username")
      },
      case_list_page_body: {
        page: 1,
        size: 20,
        create_user:localStorage.getItem("username")
      },
      //运行结果表单
      group_case_result_form: {},
      single_title: "",
      // case_name: "",
      // case_createor: "",
      // case_tags: "",
      case_data: [],
      total: 0,
      case_total: 0,
      changejob:true,
      account: [],
      envForm: JSON.parse(window.localStorage.getItem('envForm')) || {env: "",is_edit:"1"},
      excutionrow: {},
      //运行弹框状态
      run_groupcase_dislog: false,
      //删除二次确认状态
      delete_again_alter: false,
      cancel_again_alter: false,
      add_group_case_dis: false,
      group_env_options_dislog: false,
      caselistdialog: false,
      title: "新增组合",
      env_conf: 0,
      //执行结果输入框高度，及样式
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
      //选中用例数据
      selectcheck: [],
      selectcheckCase: [
        {sorts: 0}
      ],
      //传参id数组
      caselistdata: [],
      is_case: "点击选择",
      //列表是否刷新
      isLoading: false,
      //新增弹框表单
      ruleForm: {
        name: "",
        tag: [1],
        description: "",
        caseId_list: []
      },
      single_case_update_dis: false,
      single_case_form: {},
      env_rules: {
        env: [{required: true, message: "请选择环境", trigger: "blur"}],
        cookie: [{required: true, message: "请选择账号", trigger: "blur"}],
      },
      tags: [{value: 1, label: '联调环境'}, {value: 2, label: '预发环境'}],
      rules: {
        name: [
          {required: true, message: "请输入用例名称", trigger: "blur"},
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur",
          }
        ],
        module: [{required: true, message: "请选择所属模块", trigger: "blur"}],
        project_id: [{required: true, message: "请选择所属项目", trigger: "blur"}],
      },
      style: "height:" + (document.body.clientHeight - 60) + "px",
    };
  },
  methods: {

    rowDrop() {
      console.log(this.$refs.singleCaseList.$el.querySelectorAll('.el-table__body-wrapper > table > tbody'))
      const el = this.$refs.singleCaseList.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost',
        setData: function (dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const targetRow = this.selectcheckCase.splice(evt.oldIndex, 1)[0];
          this.selectcheckCase.splice(evt.newIndex, 0, targetRow);
        }
      });
    },

    selectJobChange(val){
      if(val == '1'){
        this.changejob = false;
      }else{
        this.changejob = true;
      }
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
    //选中下拉框事件
    select_project() {
      // if (val) {
      //   this.list_page_body.projectId = val;
      // } else {
      //   delete this.list_page_body['projectId'];
      // }
    },
    //获取环境列表
    get_env_list() {
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
    //保存/编辑组合用例
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.selectcheckCase.length === 0) {
            this.$message.error("单用例不能为空，请选择单用例")
            return false
          }
          if (this.title === '编辑组合') {
            this.ruleForm.caseId_list = [];
            // this.changeTableSort()
            for (var i = 0; i < this.selectcheckCase.length; i++) {
              this.ruleForm.caseId_list.push(this.selectcheckCase[i].id)
            }
            this.ruleForm.case_data = this.selectcheckCase
            axios.post("/api/test_case/UpdateGroupCase" , {
              id:this.ruleForm.id,
              project_id:this.ruleForm.project_id,
              name:this.ruleForm.name,
              description:this.ruleForm.description,
            module:this.ruleForm.module,
          caseId_list:this.ruleForm.caseId_list}).then((res) => {
              if (res.data.code === 10000) {
                this.isLoading = false;
                this.$message({
                  duration: 2000, message: res.data.msg, type: "success",
                });
                this.add_group_case_dis = false;
                this.handleCurrentChange(1);
                this.selectcheckCase = [];
              } else {
                // this.ruleForm.caseId_list = [];
                this.isLoading = false;
                this.$message.error(res.data.msg);
              }
            })
          } else {
            this.ruleForm.caseId_list = [];
            for (var j = 0; j < this.selectcheckCase.length; j++) {
              this.ruleForm.caseId_list.push(this.selectcheckCase[j].id)
            }
            this.ruleForm.case_data = this.selectcheckCase
            axios.post("/api/test_case/CreateGroupCase", 
            {project_id:this.ruleForm.project_id,
              name:this.ruleForm.name,
              description:this.ruleForm.description,
            module:this.ruleForm.module,
          caseId_list:this.ruleForm.caseId_list}
              ).then((res) => {
              this.isLoading = true;
              if (res.data.code === 10000) {
                this.isLoading = false;
                this.$message({
                  duration: 2000, message: res.data.msg, type: "success",
                });
                this.add_group_case_dis = false;
                this.handleCurrentChange(1);
                this.selectcheckCase = [];
              } else {
                // this.selectcheckCase = [];
                this.isLoading = false;
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
    get_group_list() {
      axios
          .post("/api/test_case/GroupCaseList", this.list_page_body)
          .then((res) => {
            this.isLoading = true;
            if (res.data["code"] === 10000) {
              this.case_data = res.data.data;
              this.total = res.data["totalNum"];
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
    //复制/编辑用例
    putgroup(row, type) {
      this.ruleForm = JSON.parse(JSON.stringify(row))
      axios
            .post("/api/test_case/getCaseList", {
              caseList:eval(this.ruleForm.caseId_list),
            })
            .then((res) => {
              if (res.data["code"] === 10000) {
                this.$message({
                  duration: 2000, message: res.data.msg, type: "success",
                });
                this.ruleForm.case_data = res.data.data
                this.ruleForm.module = []
                if (row.module) {
                  eval(row.module).forEach((item) => {
                    this.ruleForm.module.push(parseInt(item))
                  })
                }
                this.selectcheckCase =  this.ruleForm.case_data;
                this.add_group_case_dis = true;
                this.rowDrop();
              } else {
                this.$message.error(res.data.msg);
                this.ruleForm.case_data = []
              }
            });
      if (type === 'copy') {
        this.title = '复制组合'
      } else {
        this.title = '编辑组合'
      }
    },
    //新增弹框初始化
    addgroup() {
      this.title = '新增组合'
      this.ruleForm = {
        name: "",
        tag: [1],
        description: "",
        caseId_list: []
      };
      this.selectcheckCase = [];
      this.add_group_case_dis = true;
    },

    //删除组合用例
    deletecase(row) {
      this.delete_id = row.id;
      this.delete_again_alter = true;
    },
    delete_group_case() {
      axios.post("/api/test_case/DeleteGroupCase" ,{id:this.delete_id}).then((res) => {
        if (res.data["code"] === 10000) {
          this.delete_again_alter = false;
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
    selectEnv(row, type) {
      this.group_env_options_dislog = true;
      this.env_conf = type;
      this.excutionrow = row;
    },
    //执行组合用例
    excutioncase() {
      if (!window.localStorage.getItem('envForm') || window.localStorage.getItem('envForm') != this.envForm){
          window.localStorage.setItem('envForm',JSON.stringify(this.envForm))
        }
      if (this.env_conf === 1) {
        axios
            .post("/api/test_case/BuildGroupCase", {
              caseList:[],
              caseGroupList:[this.excutionrow.id],
              project_id: this.excutionrow.project_id,
              runEnv: this.envForm.env[1],
              is_edit: this.envForm.is_edit,
              runCookie: this.envForm.cookie,
              runUserNickname: "admin",
              run_type:2
            })
            .then((res) => {
              if (res.data["code"] === 10000) {
                this.$message({
                  duration: 2000, message: res.data.msg, type: "success",
                });
                this.group_env_options_dislog = false;
                // this.group_case_result_form = res.data.data;
                // console.log(this.group_case_result_form)
                // this.group_case_result_form.name = this.excutionrow.name;
                // this.run_groupcase_dislog = true;
                // this.env_conf = 2;
                // this.group_case_result_form.response = res.data.data.output.case_res;
                // this.group_case_result_form.assert_data = res.data.data.output.assert_data;
              } else {
                this.$message.error(res.data.msg);
              }
            });
      } else if (this.env_conf === 3) {
        axios
            .post("/api/test_case/buildSingleCase", {
              id:this.excutionrow.id,
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
                this.group_env_options_dislog = false;
                this.group_case_result_form = res.data.data
                this.group_case_result_form.name = this.excutionrow.name
                this.run_groupcase_dislog = true
                this.group_case_result_form.response = res.data.data.output.response;
                this.group_case_result_form.assert_data = res.data.data.output.error_reason;
                this.group_case_result_form.params = res.data.data.output.params;
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
            .post("/api/test_case/BuildGroupCase", {
              projectId: this.selectcheck[0]['project_id'],
              caseList: [],
              caseGroupList: this.more_excution_case_arr,
              runEnv: this.envForm.env[1],
              runCookie: this.envForm.cookie,
              runUserNickname: this.user_name,
              run_type:2
            })
            .then((res) => {
              if (res.data["code"] === 10000) {
                this.$message({
                  duration: 5000,
                  message: "批量执行中，请在测试报告页查看测试结果",
                  type: "success",
                });
                this.group_env_options_dislog = false;
              } else {
                this.$message.error(res.data.msg);
              }
            });
      }
    },

    // 查看用例结果
    viewResult(row) {
      this.group_case_result_form = null;
      axios.get("/api/api_case/cases/" + row.id + "/result").then((res) => {
        if (res.data['code'] === 10000) {
          this.group_case_result_form = res.data.data;
          this.group_case_result_form.response = res.data.data.output.case_res;
          this.group_case_result_form.assert_data = res.data.data.output.assert_data;
          this.run_groupcase_dislog = true;
        } else {
          this.$message.error(res.data.msg)
        }
      });
    },
    submitSingleForm(){
    this.ruleForm.delay_time = this.single_case_form.delay_time;
    axios
        .post("/api/test_case/UpdateCase",this.single_case_form)
        .then((res) => {
          if (res.data.code === 10000) {
            this.isLoading = false;
            this.$message({
              duration: 2000,
              message: res.data.msg,
              type: "success",
            });
            this.single_case_update_dis = false;
            this.updateGroupCaseList(this.ruleForm.id)
          } else {
            this.isLoading = false;
            this.$message.error(res.data.msg);
          }
        });
    },

    updateGroupCaseList(groupId){
      axios
        .post("/api/test_case/updateGroupCaseList",{groupId:groupId})
        .then((res) => {
          if (res.data.code === 10000) {
            this.isLoading = false;
            this.$message({
              duration: 2000,
              message: res.data.msg,
              type: "success",
            });
              this.selectcheckCase = res.data.data
            
          } else {
            this.isLoading = false;
            this.$message.error(res.data.msg);
          }
        });
    },

    //主页/添加用例列表选中事件
    handleSelect(selection, row) {
      if (selection.indexOf(row) !== -1) {
        row.state = 1
      } else {
        row.state = 0
      }
    },
    //批量选择执行弹框事件
    moregroup() {
      if (this.selectcheck.length !== 0) {
        this.env_conf = 2
        this.group_env_options_dislog = true
      } else {
        this.$message.error('请先选择组合')
      }
    },
    str_to_json(row){
      try{
        return JSON.parse(row)
      }catch{
      try{
        return eval('(' + row.replace(/None/g,'null').replace(/False/g,'false').replace(/True/g,'true').replace('"[','[').replace(']"',']').replace('["','[').replace('"]',']').replace(/[\r|\n|\t]/g,'') + ')')
      }catch{
        return row
      }
      }
    },
    //添加选中的用例
    add_select_case() {
      var select_data = this.$refs.add_select_table.selection;
      // var sort_arr = [];
      // var max = 0;
      this.rowDrop();

      for (let i in select_data) {
      //   //提取排序数组
      //   for (let j in this.selectcheckCase) {
      //     if (this.selectcheckCase[j]['sorts'] !== undefined) {
      //       sort_arr.push(parseInt(this.selectcheckCase[j]['sorts']))
      //     }
      //   }
      //   //排序数组最大值
      //   for (var k = 1; k < sort_arr.length; k++) {
      //     if (max < sort_arr[k]) {
      //       max = sort_arr[k];
      //     }
      //   }
      //   if (max !== 0) {
      //     select_data[i]['sorts'] = max + 1;
      //   } else {
      //     select_data[i]['sorts'] = this.selectcheckCase.length + 1;
      //   }
        this.selectcheckCase.push(select_data[i]);
      }
      this.caselistdialog = false;
    },

    //删除选中的明细用例
    delete_select_case(data, index) {
      this.selectcheckCase.splice(index, 1)
    },

    add_single_case() {
      this.single_case_form = {
        creator_nickname:localStorage.getItem('username'),
        req_method: "GET",
        tag: [1],
        module: [],
        content_type:"1",
        single_body: {},
        group_body: {},
        assert_res: {"code": "000000"},
        extract_param: {},
        pre_sql: {},
        end_sql: {},
        single_case_reponse: {},
        delay_time: 0,
        source: "手动创建",
        // job_param: "",
        // job_podid: "",
        // job_id: "",
        // job_parmes: "",
        // assembly_id: "",
        use_job: "0",
      };
      this.single_title = "新增用例";
      this.single_case_active = "single_body";
      this.single_case_update_dis = true;
    },
    //编辑选中的单用例明细
    update_select_case(row) {
      //获取编辑
      this.single_case_form = null;
      this.single_case_active = "single_body";
      this.single_title = "编辑用例";
      this.single_case_form = JSON.parse(JSON.stringify(row));
      
      this.single_case_form.use_job = String(row.use_job);
      this.single_case_form.content_type = String(row.content_type);
      this.single_case_form.tag = [parseInt(row.tag)];
      this.job_form.job_parmes = this.single_case_form.job_parmes;
      this.job_form.job_id = this.single_case_form.job_id;
      this.single_case_form.delay_time = row.delay_time
      this.job_form.liushuixian_id = this.single_case_form.assembly_id;
      this.job_form.popId = this.single_case_form.job_podid;
      this.single_case_form.single_body = this.str_to_json(row.single_body)
      this.single_case_form.group_body = this.str_to_json(row.group_body)
      this.single_case_form.pre_sql = this.str_to_json(row.pre_sql)
      this.single_case_form.end_sql = this.str_to_json(row.end_sql)
      this.single_case_form.extract_param = this.str_to_json(row.extract_param)
      this.single_case_form.assert_res = this.str_to_json(row.assert_res)
      this.single_case_form.module = []
      this.single_case_form.execution_env = eval(this.single_case_form.execution_env)
      eval(row.module).forEach((item) => {
        this.single_case_form.module.push(parseInt(item))
      })
      this.single_case_update_dis = true;
        
      
      // // 查看用例结果
      // axios.get("/api/api_case/case/" + row.id + "/result").then((res) => {
      //   this.single_case_form.single_case_reponse = res.data.data.output.response;
      // });

    },
    formdialogclosed(){
      this.get_group_list();
    },

    update_single_case() {
      this.single_case_form.delay_time = parseInt(this.single_case_form.delay_time);
      if (this.single_title === "编辑用例") {
        axios
            .post("/api/test_case/UpdateCase" , this.single_case_form)
            .then((res) => {
              if (res.data.code === 10000) {
                this.$message({
                  duration: 2000,
                  message: res.data.msg,
                  type: "success",
                });
                this.single_case_update_dis = false;
                this.handleCurrentChange(1);
              } else {
                this.$message.error(res.data.msg);
              }
            });
      } else {
        axios.post("/api/test_case/CreateCase", this.single_case_form).then((res) => {
          this.isLoading = true;
          if (res.data.code === 10000) {
            this.$message({
              duration: 2000,
              message: res.data.msg,
              type: "success",
            });
            this.single_case_update_dis = false;
            this.handleCurrentChange(1);
          } else {
            this.$message.error(res.data.msg);
          }
        });
      }
    },
    // //调用排序方法
    // changeTableSort() {
    //   this.selectcheckCase = this.select_check_case_sort(this.selectcheckCase)
    // },
    // //sorts值列表冒泡排序
    // select_check_case_sort(arr) {
    //   var len = arr.length;
    //   for (var i = 0; i < len - 1; i++) {
    //     for (var j = 0; j < len - 1 - i; j++) {
    //       // 相邻元素两两对比，元素交换，大的元素交换到后面
    //       if (arr[j]['sorts'] > arr[j + 1]['sorts']) {
    //         var temp = arr[j];
    //         arr[j] = arr[j + 1];
    //         arr[j + 1] = temp;
    //       }
    //     }
    //   }
    //   return arr;
    // },

    // //输入框入职selectcheckcasesorts排序值
    // sort_input(sorts_num, index) {
    //   if (sorts_num.length === 0) {
    //     this.$message.error("不能为空，已重置")
    //     return false
    //   }
    //   this.selectcheckCase[index].sorts = parseInt(sorts_num)
    //   this.$set(this.selectcheckCase, index, this.selectcheckCase[index])

    //   for (let i in this.selectcheckCase) {
    //     if (parseInt(sorts_num) === this.selectcheckCase[i].sorts) {
    //       for (let j = parseInt(i) + 1; j <= this.selectcheckCase.length; j++) {
    //         if (j === this.selectcheckCase.length) {
    //           break
    //         }
    //         if (parseInt(sorts_num) === this.selectcheckCase[j].sorts) {
    //           // this.selectcheckCase[index].sorts = parseInt(0)
    //           // this.$set(this.selectcheckCase,index,this.selectcheckCase[index])
    //           this.$message.warning("存在相同顺序,请注意顺序");
    //           break;
    //         }
    //       }
    //     }
    //   }
    // },

    handleSelectionChange(val) {
      this.selectcheck = val
    },
    handleSelectionChangeCase(val) {
      this.selectcheckCase = val
    },

    //单用列表请求数据
    caselist() {
      this.caselistdialog = true
      axios.post('/api/test_case/CaseList', this.case_list_page_body).then((res) => {
        this.caselistdata = res.data.data
        this.case_total = res.data.totalNum
      })
    },
    //清空选中数据
    clearcaselist() {
      this.selectcheckCase = []
      // this.is_case = "点击选择"
    },

    //主页页量切换
    handleSizeChange(val) {
      this.list_page_body.size = val;
      this.get_group_list();
    },
    //主页页码切换
    handleCurrentChange(val) {
      this.list_page_body.page = val;
      this.get_group_list();
    },
    //添加用例弹框页量切换
    handleSizeChangeCase(val) {
      this.case_list_page_body.size = val;
      this.caselist();
    },
    //添加用例弹框页码切换
    handleCurrentChangeCase(val) {
      console.log(this.case_list_page_body)
      this.case_list_page_body.page = val;
      this.caselist();
    },
    //获取模块
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
    //获取账号信息
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
    //获取用例tag
    get_tag_name(raw) {
      let val = null;
      this.tags.forEach((item) => {
        if (raw.tag === item.value) {
          val = item.label
        }
      })
      return val
    },
    //获取模块名称
    get_module_name(raw) {
      let val = null;
      if (raw.module && raw.module !== "") {
        this.module_options.forEach((item) => {
          if (eval(raw.module)[0] === item.id) {
            val = item.name
          }
          if (item.children) {
            item.children.forEach((dow_item) => {
              if (eval(raw.module)[1] === dow_item.id) {
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
    // //新增用例项目下拉框
    add_select_project() {
      // if (val) {
      //   this.ruleForm.project_id = val;
      // } else {
      //   delete this.ruleForm['projectId'];
      // }
    },
    //json-editor空监听
    json_editor_error(val, type) {
      if (val.toString() === "Error: Parse error on line 1:\n" +
          "\n" +
          "^\n" +
          "Expecting 'STRING', 'NUMBER', 'NULL', 'TRUE', 'FALSE', '{', '[', got 'EOF'") {
        if (type === 'single_body') {
          this.single_case_form.single_body = {};
        }
        if (type === 'group_body') {
          this.single_case_form.group_body = {};
        }
        if (type === 'assert_res') {
          this.single_case_form.assert_res = {};
        }
        if (type === 'pre_sql') {
          this.single_case_form.pre_sql = {};
        }
        if (type === 'end_sql') {
          this.single_case_form.end_sql = {};
        }
        if (type === 'extract_param') {
          this.single_case_form.extract_param = {};
        }
        if (type === "single_case_reponse") {
          this.single_case_form.single_case_reponse = {};
        }
      }
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
        if (this.job_form.job_id === null || this.job_form.job_id === ""  || this.job_form.job_id.length === 0) {
          delete this.single_case_form['job_id']
        } else {
          this.single_case_form.job_id = this.job_form.job_id[0];
        }
      } else {
        this.single_case_form.job_id = this.job_form.job_id;
      }

      if (typeof (this.job_form.popId) === "object") {
        if (this.job_form.popId === null || this.job_form.popId === "" || this.job_form.popId.length === 0) {
          delete this.single_case_form['podid']
        } else {
          this.single_case_form.job_podid = this.job_form.popId[0];
        }
      } else {
        this.single_case_form.job_podid = this.job_form.popId;
      }

      if (typeof (this.job_form.liushuixian_id) === "object") {
        if (this.job_form.liushuixian_id === null || this.job_form.liushuixian_id === "" || this.job_form.liushuixian_id.length === 0) {
          delete this.single_case_form['assembly_id']
        } else {
          this.single_case_form.assembly_id = this.job_form.liushuixian_id[0];
        }
      } else {
        this.single_case_form.assembly_id = this.job_form.liushuixian_id;
      }
      this.single_case_form.job_parmes = this.job_form.job_parmes;

      this.job_parm_dis = false;
    },
    job_click() {
      if(this.changejob == true){
        return
      }
      if (this.single_title === '编辑用例' || this.single_title === "用例" || this.single_title === "复制用例") {
        this.job_handle_change();
      } else {
        this.job_form = {job_parmes: ""};
        this.single_title = '用例';
      }

      this.job_parm_dis = true;
    },
  },
  created() {
    this.get_projct_list();
    this.get_group_list();
    this.get_moudle();
    this.get_env_list();
    this.get_account();
    this.get_user_name();
    this.get_job_list();
    this.get_liushui_list();
  },

};
</script>

<style>
.abow_dialog {
  justify-content: center;
  align-items: Center;
}

.el-dialog {
  height: 85%;
  margin-top: 50px !important;
}

.el-dialog__body {
  left: 0;
  top: 54px;
  bottom: 0;
  right: 0;
  z-index: 1;
}

.el-dialog__footer {
  margin-top: 50px;
}
</style>