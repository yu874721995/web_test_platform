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
            <a style="font-size: 13px">计划名称</a>
            <el-input
                placeholder="请输入计划名称"
                v-model="list_page_body.planName"
                style="width: 150px; margin-left: 10px"
                class="case_input"
            ></el-input>
          </div>

          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">计划状态</a>
            <el-select
                v-model="list_page_body.status"
                placeholder="请选择状态"
                clearable filterable
                style="width: 150px; margin-left: 10px"
            >
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="2"></el-option>
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
                    v-has="{class:'120'}"
                >新增
                </el-button>
              </el-row>
            </div>
          </div>
        </div>
      </div>
      <!--      下拉end-->
      <!--表格start-->
      <div
          style="margin-top: 10px; float: left; width: 98%; text-align: center"
      >
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
              @selection-change="handleSelectionChange"
          >
            >
            <el-table-column
                prop="task_name"
                label="计划名称"
                align="center"
                width="250"
            >
            </el-table-column>
            <el-table-column
                :formatter="status_view"
                prop="status"
                label="状态"
                align="center"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="exec_type"
                label="执行方式"
                align="center"
                width="200"
            >
            </el-table-column>
            <el-table-column
                :formatter="exec_time_type"
                prop="exec_time"
                label="时间方案"
                align="center"
                width="200"
            >
            </el-table-column>
            <el-table-column
                :formatter="get_project_name"
                prop="project_id"
                label="所属项目"
                align="center"
                width="200"
            >
            </el-table-column>
            <el-table-column
                :formatter="next_status_view"
                prop="execution_status"
                label="最后一次执行状态"
                align="center"
                width="200"
            >
            </el-table-column>
            <el-table-column
                prop="execution_run_time"
                label="最后一次执行时间"
                align="center"
                width="250"
            >
            </el-table-column>
            <el-table-column
                :formatter="get_dingding_woman"
                prop="dingding"
                label="钉钉通知人"
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
                width="200"
                align="center"
            >
              <template slot-scope="scope">
                <el-button
                    @click="putplant(scope.row, 'put')"
                    type="text"
                    size="small"
                    v-if="scope.row.creator === user_name "
                    v-has="{class:'121'}"
                >编辑
                </el-button
                >
                <el-button
                    type="text"
                    @click="deletecase(scope.row)"
                    size="small"
                    v-if="scope.row.creator === user_name "
                    v-has="{class:'122'}"
                >删除
                </el-button
                >
                <el-button
                    type="text"
                    @click="openexculist(scope.row)"
                    size="small"
                    v-has="{class:'123'}"
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

    <el-dialog
        title="执行记录"
        :visible.sync="plantexculistdialog"
        width="72%"
        show-footer
        class="abow_dialog"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
    >
      <div>
        <!--表格start-->
        <div
            style="margin-top: 10px; float: left; width: 100%; text-align: center"
        >
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
                type="selection"
            >
              <el-table-column
                  label="序号"
                  type="index"
                  align="center"
                  width="55"
              >
              </el-table-column>
              <el-table-column
                  prop="create_time"
                  label="执行时间"
                  align="center"
                  width="200"
              >
              </el-table-column>
              <el-table-column
                  :formatter="plan_status_view"
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
                  prop="env"
                  label="执行环境"
                  align="center"
                  width="150"
              >
              </el-table-column>
              <el-table-column
                  prop="case_num"
                  label="执行用例数"
                  align="center"
                  width="100"
              >
              </el-table-column>
              <el-table-column
                  prop="pass_num"
                  label="成功用例数"
                  align="center"
                  width="100"
              >
              </el-table-column>
              <el-table-column
                  prop="lose_num"
                  label="失败用例数"
                  align="center"
                  width="100"
              >
              </el-table-column>
              <el-table-column
                  prop="report_url"
                  label="测试报告地址"
                  align="center"
                  width="435"
              >
                <template slot-scope="scope">
                  <el-link type="primary">{{ scope.row.report_url }}</el-link>
                </template>
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

    <el-dialog
        title="添加用例"
        :visible.sync="caselistdialog"
        width="72%"
        show-footer
        class="abow_dialog"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
    >
      <div>
        <!--      下拉start-->
        <div style="float: left; width: 100%; line-height: 60px">
          <div style="width: 100%">
            <div style="float: left; margin-left: 10px">
              <a style="font-size: 10px">项目名称</a>
              <el-select v-model="case_list_page_body.projectId" clearable filterable>
                <el-option
                    v-for="item in project"
                    :key="item.id"
                    :label="item.project_name"
                    :value="item.id"
                ></el-option>
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
              <el-select v-model="case_list_page_body.tag" multiple clearable filterable placeholder="请选择"
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
                  :props="{ value: 'id', label: 'name',multiple: true, checkStrictly: true}"
                  collapse-tags
                  :show-all-levels="false"
                  clearable
              ></el-cascader>
            </div>

            <div style="float: left; padding-left: 5px">
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
        <div
            style="margin-top: 10px; float: left; width: 100%; text-align: center"
        >
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
                @selection-change="handleSelectionChangeCase"
            >
              >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column
                  prop="name"
                  label="用例名称"
                  align="center"
                  width="400"
              >
              </el-table-column>
              <el-table-column
                  :formatter="get_module_name"
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
                  :formatter="get_tag_name"
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


    <!-- 组合列表dialog -->

    <el-dialog
        title="添加组合"
        :visible.sync="grouplistdialog"
        width="72%"
        show-footer
        class="abow_dialog"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
    >
      <div>
        <!--      下拉start-->
        <div style="float: left; width: 100%; line-height: 60px">
          <div style="width: 100%">
            <div style="float: left; margin-left: 10px">
              <a style="font-size: 13px">项目名称</a>
              <el-select v-model="group_list_page_body.projectId" clearable filterable
                         style="width: 150px; margin-left: 10px"
                         @change="select_project">
                <el-option v-for="item in project_list" :key="item.id" :label="item.project_name" :value="item.id">
                </el-option>
              </el-select>
            </div>

            <div style="float: left; margin-left: 10px">
              <a style="font-size: 13px">组合名称</a>
              <el-input placeholder="请输入组合名称" v-model="group_list_page_body.name"
                        style="width: 150px; margin-left: 10px"
                        class="case_input"></el-input>
            </div>

            <div style="float: left; margin-left: 10px">
              <a style="font-size: 13px">所属模块</a>
              <el-cascader
                  style="width: 150px; margin-left: 10px"
                  v-model="group_list_page_body.module"
                  :options="module_options"
                  :props="{ value: 'id', label: 'name',multiple: true, checkStrictly: true}"
                  collapse-tags
                  :show-all-levels="false"
                  clearable
              ></el-cascader>
            </div>

            <div style="float: left; margin-left: 10px">
              <a style="font-size: 13px">创建人</a>
              <el-input placeholder="请输入创建人" clearable v-model="group_list_page_body.create_user"
                        style="width: 150px; margin-left: 10px"
                        class="case_input"></el-input>
            </div>

            <div style="float: left; padding-left: 5px">
              <!-- <div style="width: 100px;float: right;margin-top: 10px;height: 40px;text-align: center;"> -->
              <!-- <el-row> -->
              <el-button
                  plain
                  icon="el-icon-search"
                  @click="handleCurrentChangeGroup(1)"
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
                      @click="ok_group"
                  >确定
                  </el-button>
                </el-row>
              </div>
            </div>
          </div>
        </div>
        <!--      下拉end-->
        <!--表格start-->
        <div
            style="margin-top: 10px; float: left; width: 100%; text-align: center"
        >
          <template>
            <!--                    border-radius: 10px;-->
            <el-table
                :data="grouplistdata"
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
                @select="handleSelectGroup"
                @selection-change="handleSelectionChangeGroup"
            >
              >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="id" label="组合id" align="center" width="100"></el-table-column>
              <el-table-column prop="name" label="组合名称" width="250"></el-table-column>
              <el-table-column prop="module" label="所属模块" width="200"></el-table-column>
              <el-table-column prop="description" label="组合描述" width="300"></el-table-column>
              <el-table-column prop="status" label="状态" width="200"></el-table-column>
              <el-table-column prop="creator_nickname" label="创建人" width="150"></el-table-column>
            </el-table>
          </template>
        </div>
        <!--表格end-->
        <div style="float: right">
          <!--分页start-->
          <el-pagination
              v-on:size-change="handleSizeChangeGroup"
              v-on:current-change="handleCurrentChangeGroup"
              :current-page="group_list_page_body.page"
              :page-sizes="[10, 20, 50]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="group_total"
              style="float: right; margin-top: 10px; margin-right: 20px"
          ></el-pagination>
          <!--分页end-->
        </div>
      </div>
    </el-dialog>

    <el-dialog
        :visible.sync="dialogVisible"
        width="1400px"
        show-footer
        @opened="openform"
        @closed="formdialogclosed"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
    >
      <span slot="title" style="font-size: 20px">{{ title }}</span>
      <el-form
          :model="ruleForm"
          :rules="rules"
          inline-message="true"
          status-icon="true"
          ref="ruleForm"
          label-width="auto"
      >
        <el-form-item
            label="计划名称:"
            prop="planName"
            style="width: 500px;float:left;"
        >
          <el-input
              v-model="ruleForm.task_name"
              placeholder="请输入计划名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="状态:" prop="status" style="width:500px;float:left;padding-left:25px;">
          <el-radio v-model="ruleForm.status" label="1">启用</el-radio>
          <el-radio v-model="ruleForm.status" label="2">禁用</el-radio>
        </el-form-item>

        <el-form-item
            label="所属项目:"
            prop="project_id"
            style="width: 500px;float:left;"
        >
          <el-select v-model="ruleForm.project_id" clearable filterable>
            <el-option
                v-for="item in project"
                :key="item.id"
                :label="item.project_name"
                :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
            label="运行环境:"
            :label-width="formLabelWidth"
            prop="env"
            style="width: 500px;float:left;padding-left:25px;"
        >
          <el-cascader
              v-model="ruleForm.env"
              placeholder="请搜索运行环境"
              :options="env_options"
              filterable
              :props="{value:'id',label:'lable_name'}"
          ></el-cascader>
        </el-form-item>

        <el-form-item
            label="运行账号:"
            :label-width="formLabelWidth"
            prop="account_id"
            style="width: 500px;float:left;"
        >
          <el-select
              v-model="ruleForm.account_id"
              placeholder="请搜索运行账号"
              clearable filterable
          >
            <el-option
                v-for="item in account"
                :key="item.id"
                :label="item.account_name"
                :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
            label="钉钉通知人:"
            prop="dingding"
            style="width: 500px;float:left;padding-left:25px;"
        >
          <el-select v-model="ruleForm.dingding" clearable filterable>
            <el-option
                v-for="item in mail_list"
                :key="item.id"
                :label="item.ding_name"
                :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
            label="执行政策:"
            prop="task_type"
            style="width: 500px;float:left;"
        >
          <el-select
              clearable filterable
              v-model="ruleForm.task_type"
              placeholder="请选择状态"
              @change="chose_plan_policy"
          >
            <el-option label="固定周期" value="cron"></el-option>
            <el-option label="间隔周期" value="interval"></el-option>
            <el-option label="执行一次" value="date"></el-option>
            <el-option label="立即执行" value="now"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
            label="执行时间:"
            id="times"
            style="margin-top: 22px; display: none;width: 500px;float:left;"
            prop="times"

        >
          <el-input
              type="textarea"
              autosize
              @blur="jsonprint('times')"
              v-model="ruleForm.times"
              placeholder='请输入json格式参数,使用键值对形式,例如{"status":200}'
          ></el-input>
        </el-form-item>

        <el-form-item
            label="执行时间:"
            id="date_time"
            style="margin-top: 22px; display: none;width: 500px;float:left;"
            prop="datetimes"
        >
          <el-col :span="7">
            <el-date-picker
                v-model="ruleForm.datetimes"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间"
                :picker-options="pickerOptions"
            ></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="用例列表:" prop="caseId_list" style="float: left;width:1400px;">

          <el-tabs v-model="activeName" @tab-click="handleClick" style="width:90%;">
            <el-tab-pane label="按用例添加" name="first">

              <div style="margin-left:0;float: left; width: 100%; text-align: center;">
                <el-button type="primary" @click="caselist" style="float: left;margin-bottom: 10px;">添加明细</el-button>
                <el-button type="primary" @click="selectcheckCase=[]" style="float: left;margin-bottom: 10px;">全部移除
                </el-button>
                <el-form-item style="float: right;width: 150px;">
                  <el-button type="primary" @click="submitForm('ruleForm')" style="float: left;">保存</el-button>
                  <el-button @click="dialogVisible = false;selectcheckCase=[]" style="float: left;">取消</el-button>
                </el-form-item>
                <el-table
                    :data="selectcheckCase" :v-loading="isLoading" style="font-size: 13px"
                    :header-cell-style="{ background: '#E7EAED' }" height="500"
                    row-key="id" ref="singleCaseList"
                    width="100%" :row-style="{ height: '40px' }" :cell-style="{ padding: '0px' }"
                    :highlight-current-row="true" :stripe="true" :border=true>
                  <el-table-column prop="id" label="用例id" width="100"></el-table-column>
                  <el-table-column prop="name" label="用例名称" width="250"></el-table-column>
                  <el-table-column prop="url" label="请求地址" width="350"></el-table-column>
                  <el-table-column prop="module" label="所属模块" width="200"
                                   :formatter="get_module_name"></el-table-column>
                  <el-table-column prop="tag" label="所属标签" width="200" :formatter="get_tag_name"></el-table-column>
                  <el-table-column prop="creator_nickname" label="创建人" width="100"></el-table-column>
                </el-table>

              </div>
            </el-tab-pane>

            <el-tab-pane label="按组合添加" name="two">
              <div style="margin-left:0;float: left; width: 100%; text-align: center;">
                <el-button type="primary" @click="grouplist" style="float: left;margin-bottom: 10px;">添加明细</el-button>
                <el-button type="primary" @click="selectcheckGroup=[]" style="float: left;margin-bottom: 10px;">全部移除
                </el-button>
                <el-form-item style="float: right;width: 150px;">
                  <el-button type="primary" @click="submitForm('ruleForm')" style="float: left;">保存</el-button>
                  <el-button @click="dialogVisible = false;this.selectcheckGroup=[]" style="float: left;">取消</el-button>
                </el-form-item>

                <el-table
                    :data="selectcheckGroup" :v-loading="isLoading" style="font-size: 13px"
                    :header-cell-style="{ background: '#E7EAED' }" height="500"
                    width="100%" :row-style="{ height: '40px' }" :cell-style="{ padding: '0px' }"
                    :highlight-current-row="true" :stripe="true" :border=true>
                  <el-table-column prop="id" label="组合id" align="center" width="100"></el-table-column>
                  <el-table-column prop="name" label="组合名称" width="250"></el-table-column>
                  <el-table-column prop="module" label="所属模块" width="200"></el-table-column>
                  <el-table-column prop="description" label="组合描述" width="300"></el-table-column>
                  <el-table-column prop="status" label="状态" width="200"></el-table-column>
                  <el-table-column prop="creator_nickname" label="创建人" width="150"></el-table-column>
                </el-table>
              </div>
            </el-tab-pane>

          </el-tabs>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import axios from "axios";
import Sortable from 'sortablejs'

export default {
  components: {Breadcrumb},
  name: "Plan_manage",
  data() {
    return {
      user_name: "",
      //分页请求数据
      list_page_body: {
        page: 1,
        limit: 20,
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
      },
      case_list_page_body: {
        page: 1,
        size: 10
      },
      group_list_page_body: {
        page: 1,
        size: 10
      },
      plant_excu_list_page_body: {
        page: 1,
        limit: 10,
      },
      env_options: [],
      activeName: 'first',
      case_name: "",
      case_createor: "",
      case_tags: "",
      tags: [{value: 1, label: '联调环境'}, {value: 2, label: '预发环境'}, {value: 3, label: '生产环境'}],
      case_data: [],
      total: 0,
      case_total: 0,
      group_total: 0,
      excu_total: 0,
      envForm: {env: ""},
      excutionrow: {},
      module_options: [],
      dialogVisible: false,
      env_options_dislog: false,
      caselistdialog: false,
      grouplistdialog: false,
      plantexculistdialog: false,
      plantexculistdata: "",
      title: "新增计划",
      env_conf: 0,
      selectcheck: [],
      selectcheckCase: [],
      selectcheckGroup: [],
      mail_list: [],
      account: [],
      project: [],
      caselistdata: [],
      grouplistdata: [],
      ruleForm: {
        case_list: [],
        group_list: []
      },
      rules: {
        task_name: [
          {required: true, message: "请输入计划名称", trigger: "blur"},
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur",
          },
        ],
        env: [{required: true, message: "请选择执行环境", trigger: "blur"}],
        account_id: [
          {required: true, message: "请选择执行账号", trigger: "blur"},
        ],
        case_list: [
          {required: true, message: "请选择执行用例", trigger: "blur"},
        ],
        status: [
          {required: true, message: "请选择计划状态", trigger: "blur"},
        ],
        task_type: [
          {required: true, message: "请选择执行方式", trigger: "blur"},
        ],
        project_id: [
          {required: true, message: "请选择所属项目", trigger: "blur"},
        ],
        // times: [{validator: checkJson,message: "请输入正确的json格式执行时间",trigger: "blur",}]
      },
      style: "height:" + (document.body.clientHeight - 60) + "px",
    };
  },
  methods: {
    //初始化排序列表
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
    //最终提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.case_list = [];
          this.ruleForm.group_list = [];
          for (let i in this.selectcheckCase) {
            this.ruleForm.case_list.push(parseInt(this.selectcheckCase[i].id));
          }
          for (let i in this.selectcheckGroup) {
            this.ruleForm.group_list.push(parseInt(this.selectcheckGroup[i].id));
          }
          if (this.ruleForm.times) {
            console.log(this.ruleForm.times);
            this.ruleForm.times = JSON.parse(this.ruleForm.times);
          }
          if (this.title === "编辑计划") {
            axios
                .put("/api/test_plant/update_test_plant", this.ruleForm)
                .then((res) => {
                  if (res.data.code === 10000) {
                    this.$message({
                      duration: 2000,
                      message: res.data.msg,
                      type: "success",
                    });
                    this.dialogVisible = false;
                    this.handleCurrentChange(1);
                  } else {
                    this.$message.error(res.data.msg);
                    this.ruleForm.times = JSON.stringify(this.ruleForm.times);
                  }
                });
          } else {
            axios
                .post("/api/test_plant/create_test_plant", this.ruleForm)
                .then((res) => {
                  console.log(res.data.code === 10000);
                  if (res.data.code === 10000) {
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
                });
          }
        } else {
          return false;
        }
      });
    },
    //打开执行记录
    openexculist(row) {
      this.plantexculistdialog = true;
      this.plant_excu_list_page_body.plant_id = row.id;
      this.get_plant_excu_list();
    },
    //执行时间格式转义
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
    //执行方式change时触发
    chose_plan_policy(val) {
      console.log(this.ruleForm);
      if (val === "cron") {
        document.getElementById("times").style.display = "block";
        this.$set(
            this.ruleForm,
            "times",
            '{"year":"2022","month":"1-12","day_of_week":"mon-fri","hour":"1-23","minute":"1-59","second":"10"}'
        );
      } else if (val === "interval") {
        document.getElementById("times").style.display = "block";
        this.$set(
            this.ruleForm,
            "times",
            '{"weeks":0,"days":0,"hours":0,"minutes":0,"seconds":0}'
        );
      } else if (val === "date") {
        this.$set(this.ruleForm, "datetimes", "");
        document.getElementById("times").style.display = "none";
        document.getElementById("date_time").style.display = "block";
      } else {
        this.$set(this.ruleForm, "now", "");
        document.getElementById("times").style.display = "none";
        document.getElementById("date_time").style.display = "none";
      }
      console.log(this.ruleForm);
    },
    //测试执行记录列表初始化
    get_plant_excu_list() {
      axios
          .post(
              "/api/test_plant/test_plant_excu_list",
              this.plant_excu_list_page_body
          )
          .then((res) => {
            if (res.data.code === 10000) {
              this.plantexculistdata = res.data.data;
              this.excu_total = res.data.count;
              this.$message({
                duration: 2000,
                message: "查询成功",
                type: "success",
              });
            } else {
              this.$message.error(res.data.msg);
            }
          });
    },
    //测试计划列表初始化
    get_plant_list() {
      axios
          .post("/api/test_plant/test_plant_list", this.list_page_body)
          .then((res) => {
            if (res.data["code"] === 10000) {
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
    //测试计划列表页量切换
    handleSizeChange(val) {
      this.list_page_body.limit = val;
      // this.getList();
      this.get_plant_list();
    },
    //测试计划列表页码切换
    handleCurrentChange(val) {
      this.list_page_body.page = val;
      this.get_plant_list();
    },

    //执行记录页量切换
    handleSizeChangeExcu(val) {
      this.plant_excu_list_page_body.limit = val;
      // this.getList();
      this.get_plant_excu_list();
    },
    //执行记录页码切换
    handleCurrentChangeExcu(val) {
      this.plant_excu_list_page_body.page = val;
      this.get_plant_excu_list();
    },

    //添加用例列表页量切换
    handleSizeChangeCase(val) {
      this.case_list_page_body.size = val;
      // this.getList();
      this.caselist();
    },
    //添加用例列表页码切换
    handleCurrentChangeCase(val) {
      this.case_list_page_body.page = val;
      this.caselist();
    },

    //添加组合列表页量切换
    handleSizeChangeGroup(val) {
      this.group_list_page_body.size = val;
      // this.getList();
      this.grouplist();
    },
    //添加组合列表页码切换
    handleCurrentChangeGroup(val) {
      this.group_list_page_body.page = val;
      this.grouplist();
    },

    //添加/编辑dialog初始化时执行方法
    openform() {
      if (this.ruleForm.task_type === "cron") {
        document.getElementById("times").style.display = "block";
        this.$set(this.ruleForm, "times", this.ruleForm.exec_time);
      } else if (this.ruleForm.task_type === "interval") {
        console.log(222);
        document.getElementById("times").style.display = "block";
        this.$set(this.ruleForm, "times", this.ruleForm.exec_time);
      } else if (this.ruleForm.task_type === "date") {
        document.getElementById("times").style.display = "none";
        document.getElementById("date_time").style.display = "block";
        this.$set(this.ruleForm, "datetimes", this.ruleForm.exec_time);
      } else {
        document.getElementById("times").style.display = "none";
        document.getElementById("date_time").style.display = "none";
      }
      console.log(this.ruleForm);
    },
    //编辑按钮执行方法
    putplant(row, type) {
      let body = {}
      if (this.$refs.ruleForm) {
        this.$refs.ruleForm.clearValidate();
      }
      this.ruleForm = JSON.parse(JSON.stringify(row));
      this.ruleForm.env = eval(row.env);
      this.ruleForm.case_list = row.case_list && row.case_list !== '' ? eval(row.case_list) : [];
      this.ruleForm.group_list = row.group_list && row.group_list !== '' ? eval(row.group_list) : [];
      this.ruleForm.status = String(row.status);
      body.caseList = this.ruleForm.case_list && this.ruleForm.case_list !== [] ? this.ruleForm.case_list : [];
      body.caseGroupList = this.ruleForm.group_list && this.ruleForm.group_list !== [] ? this.ruleForm.group_list : [];
      axios.post('/api/api_case/case/get', body).then((res) => {
        if (res.data.code === 10000) {
          this.selectcheckCase = res.data.data.case;
          this.selectcheckGroup = res.data.data.cases;
          this.rowDrop();
        } else {
          this.$message.error(res.data.msg);
        }
      })
      this.ruleForm.task_type = row.exec_type;
      if (this.ruleForm.task_type === 'date') {
        this.ruleForm.datetimes = row.exec_time
        this.ruleForm.exec_time = row.exec_time
      } else {
        this.ruleForm.exec_time = JSON.stringify(row.exec_time)
      }
      this.ruleForm.plant_id = row.id;
      console.log(this.ruleForm)
      this.is_case =
          "已选择" + this.ruleForm.case_list.length + "条用例,点击继续增加";
      if (type === "copy") {
        this.title = "复制计划";
      } else {
        this.title = "编辑计划";
      }
      this.dialogVisible = true;
    },
    //新增按钮执行方法
    addgroup() {
      if (this.$refs.ruleForm) {
        this.$refs.ruleForm.clearValidate();
      }
      this.title = "新增计划";
      this.ruleForm = {
        case_list: [],
        group_list: [],
        status: "1",
      };
      this.selectcheckCase = [];
      this.selectcheckGroup = [];
      this.dialogVisible = true;
    },
    //dialog关闭时执行方法
    formdialogclosed() {
      this.ruleForm = {
        status: "1",
        case_list: [],
        times: "",
        datetimes: "",
        env: [],
        cookie: "",
        dingding: "",
        task_type: "",
      };
      this.is_case = "点击选择";
      document.getElementById("times").style.display = "none";
      document.getElementById("date_time").style.display = "none";
    },
    //删除计划
    deletecase(row) {
      axios
          .post("/api/test_plant/delete_plant", {plant_id: row.id})
          .then((res) => {
            if (res.data["code"] === 10000) {
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
    //I don't know
    handleSelect(selection, row) {
      if (selection.indexOf(row) !== -1) {
        row.state = 1;
      } else {
        row.state = 0;
      }
    },
    //~
    handleSelectCase(selection, row) {
      if (selection.indexOf(row) !== -1) {
        row.state = 1;
      } else {
        row.state = 0;
      }
    },
    //~
    handleSelectGroup(selection, row) {
      if (selection.indexOf(row) !== -1) {
        row.state = 1;
      } else {
        row.state = 0;
      }
    },
    //确认选择用例时执行方法
    ok() {
      if (this.selectcheckCase.length !== 0) {
        this.caselistdialog = false;
        this.rowDrop();
      } else {
        this.$message.error("请先选择用例");
      }
    },
    ok_group() {
      if (this.selectcheckGroup.length !== 0) {
        this.grouplistdialog = false;
      } else {
        this.$message.error("请先选择组合");
      }
    },
    //计划列表复选框选中触发
    handleSelectionChange(val) {
      this.selectcheck = val;
    },
    //选择用例时，每选中一条，执行一次该方法
    handleSelectionChangeCase(val) {
      val.forEach((item) => {
        this.selectcheckCase.push(item);
        this.ruleForm.case_list.push(item.id);
      })
    },
    //选择用例时，每选中一条，执行一次该方法
    handleSelectionChangeGroup(val) {
      console.log(val)
      val.forEach((item) => {
        this.selectcheckGroup.push(item);
        this.ruleForm.group_list.push(item.id);
      })
    },
    //切换tags时触发，预留
    handleClick(tab) {
      console.log(tab)
    },
    //用例列表请求
    caselist() {
      this.caselistdialog = true;
      axios
          .post("/api/api_case/case/page", this.case_list_page_body)
          .then((res) => {
            this.caselistdata = res.data.data;
            this.case_total = res.data.totalNum;
          });
      console.log(this.caselistdata);
    },
    //用例列表请求
    grouplist() {
      this.grouplistdialog = true;
      axios
          .post("/api/api_case/cases/page", this.group_list_page_body)
          .then((res) => {
            this.grouplistdata = res.data.data;
            this.group_total = res.data.totalNum;
          });
      console.log(this.caselistdata);
    },
    //初始化获取项目
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
    //初始化获取账号
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
    //初始化获取项环境
    get_env() {
      axios
          .post("/api/test_management/selectEnvlist")
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.env_options = res.data.items;
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
    //列表映射项目
    get_project_name(raw) {
      let val = null;
      this.project.forEach((item) => {
        if (raw.project_id === item.id) {
          val = item.project_name;
        }
      });
      return val;
    },
    //列表映射环境
    get_env_name(raw) {
      let val = null;
      this.env.forEach((item) => {
        console.log(item, raw);
        if (raw.env === item.value) {
          val = item.label;
        }
      });
      return val;
    },
    //列表映射状态
    status_view(raw) {
      if (raw.status === 1) {
        return '启用'
      } else {
        return '禁用'
      }
    },
    //列表映射执行记录执行状态
    next_status_view(raw) {
      if (raw.execution_status === "Executed") {
        return '执行正常'
      } else if (raw.execution_status === "Error!") {
        return '错误'
      } else if (raw.execution_status === "Started execution") {
        return '执行中'
      }
    },
    //列表映射计划执行状态
    plan_status_view(raw) {
      if (raw.status === 1) {
        return '执行中'
      } else if (raw.status === 2) {
        return '执行完成'
      } else if (raw.status === 5) {
        return '任务异常'
      }
    },
    //初始化获取模块
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
    //列表映射tag
    get_tag_name(raw) {
      let val = null;
      this.tags.forEach((item) => {
        if (raw.tag === String(item.value)) {
          val = item.label
        }
      })
      return val
    },
    //列表映射钉钉名称
    get_dingding_woman(raw) {
      let val = null;
      this.mail_list.forEach((item) => {
        if (raw.dingding === item.id) {
          val = item.ding_name
        }
      })
      return val
    },
    //列表映射模块名称
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
    //列表初始化钉钉通讯录
    get_mail_list() {
      axios.post('/api/test_management/mail_list', {page: 1, limit: 1000}).then((res) => {
        if (res.data.code === 10000) {
          this.mail_list = res.data.items;
        }
      })
    },
    //编辑时数据处理
    exec_time_type(raw) {
      if (raw.exec_type === 'date') {
        return raw.exec_time
      } else if (raw.exec_type === 'now') {
        return '-'
      } else {
        return JSON.stringify(raw.exec_time)
      }
    },
    get_user_name() {
      this.user_name = localStorage.getItem('username')
    },
  },
  created() {
    this.get_plant_list();
    this.get_project();
    this.get_account();
    this.get_env();
    this.get_moudle();
    this.get_mail_list();
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