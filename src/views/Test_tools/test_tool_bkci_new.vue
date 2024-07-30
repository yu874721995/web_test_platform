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
          <a style="font-size: 13px">流水线名称</a>
          <el-input
            placeholder="请输入流水线名称"
            v-model="list_page_body.Assembly_name"
            style="width: 150px; margin-left: 10px"
            class="case_input"
            @keyup.enter.native="handleCurrentChange(1)"
          ></el-input>
        </div>

        <div style="float: left; margin-left: 10px">
          <a style="font-size: 13px">联调标签</a>
          <el-input
            placeholder="请输入联调标签"
            v-model="list_page_body.Assembly_serverName"
            style="width: 150px; margin-left: 10px"
            class="case_input"
            @keyup.enter.native="handleCurrentChange(1)"
          ></el-input>
        </div>

        <div style="float: left; margin-left: 10px">
          <a style="font-size: 13px">服务名称</a>
          <el-input
            placeholder="请输入服务名称"
            v-model="list_page_body.Assembly_serviceName"
            style="width: 150px; margin-left: 10px"
            class="case_input"
            @keyup.enter.native="handleCurrentChange(1)"
          ></el-input>
        </div>

        <div style="float: left; margin-left: 10px">
          <a style="font-size: 13px">分支名称</a>
          <el-input
            placeholder="请输入分支名称"
            v-model="list_page_body.branch"
            style="width: 150px; margin-left: 10px"
            class="case_input"
            @keyup.enter.native="handleCurrentChange(1)"
          ></el-input>
        </div>

        <div style="float: left; margin-left: 10px">
          <a style="font-size: 13px">最后构建人</a>
          <el-input
            placeholder="请输入最后构建人"
            v-model="list_page_body.build_man"
            style="width: 150px; margin-left: 10px"
            class="case_input"
            @keyup.enter.native="handleCurrentChange(1)"
          ></el-input>
        </div>

        <div style="float: left; margin-left: 10px">
          <a style="font-size: 13px">所属环境</a>
          <el-select
            v-model="list_page_body.project"
            ref="projectSelect"
            placeholder="请选择所属环境"
            clearable filterable
            style="width: 150px; margin-left: 10px"
            @keyup.enter.native="handleCurrentChange(1)"
            @keydown.enter.native="enterdisableVisible"
          >
            <el-option
              v-for="item in env"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>

        <div style="float: left; margin-left: 10px">
          <a style="font-size: 13px">最后构建状态</a>
          <el-select
            v-model="list_page_body.build_status"
            ref="build_statusSelect"
            placeholder="请选择最后构建状态"
            clearable
            filterable
            style="width: 150px; margin-left: 10px"
            @keyup.enter.native="handleCurrentChange(1)"
            @keydown.enter.native="enterdisableVisible"
          >
            <el-option
              v-for="item in build_status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>

        <!-- <div style="float: left; margin-left: 10px">
          <a style="font-size: 13px">流水线类型</a>
          <el-select
            v-model="list_page_body.Assembly_type"
            ref="Assembly_typeSelect"
            placeholder="请选择流水线类型"
            clearable
            filterable
            style="width: 150px; margin-left: 10px"
            @keyup.enter.native="handleCurrentChange(1)"
            @keydown.enter.native="enterdisableVisible"
          >
            <el-option
              v-for="item in Assembly_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div> -->
        <div style="float: left; margin-left: 10px">
          <a style="font-size: 13px">构建时间</a>
          <el-date-picker
          style="width: 250px; margin-left: 10px"
            v-model="list_page_body.buildTime"
            type="daterange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">>
          </el-date-picker>
        </div>

        <div style="float: left; padding-left: 5px">
          <el-button plain icon="el-icon-search" @click="handleCurrentChange(1)"
            >查询</el-button
          >
        </div>

        <div style="float: left; padding-left: 5px">
          <el-button plain icon="el-icon-search" @click="uploadBuildHistory()"
            >导出</el-button
          >
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
            <el-button
              type="primary"
              size="small"
              style="background-color: #3573fe"
              @click="dev_seach_pre(examine_data)"
              v-has="{ class: '91' }"
            >
              批量上预发
            </el-button>
          </div>

          <div
            style="
              width: 100px;
              float: right;
              margin-top: 10px;
              height: 40px;
              text-align: center;
            "
          >
            <el-button
              type="primary"
              size="small"
              style="background-color: #3573fe"
              @click="Batch_build(build_data)"
              v-has="{ class: '90' }"
            >
              批量构建
            </el-button>
          </div>

          <div
            style="
              width: 100px;
              float: right;
              margin-top: 10px;
              height: 40px;
              text-align: center;
            "
          >
            <el-button
              type="primary"
              size="small"
              style="background-color: #3573fe"
              @click="Batch_audit(examine_data)"
              v-has="{class:'44'}"
            >
              批量审核
            </el-button>
          </div>

          <!-- <div
            style="
              width: 100px;
              float: right;
              margin-top: 10px;
              height: 40px;
              text-align: center;
            "
          >
            <el-button
              type="primary"
              size="small"
              style="background-color: #3573fe"
              @click="updateAssembly(examine_data)"
            >
              批量更新
            </el-button>
          </div> -->
        </div>
      </div>
    </div>
    <!--表格start-->
    <div>
      <div
        style="margin-top: 10px; float: left; width: 98%; text-align: center"
      >
        <!-- <template> -->
        <el-table
          class="tapd_project_table"
          :data="bk_ci_data"
          ref="bkciTableRef"
          style="font-size: 13px; left: 1%; border-radius: 5px"
          :header-cell-style="{ background: '#E7EAED' }"
          height="650"
          width="98%"
          :row-style="{ height: '40px' }"
          :cell-style="{ padding: '0px' }"
          :stripe="true"
          :border="true"
          @select="handleSelectionChangeCase"
          @select-all="handleSelectionChangeCase"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
            fixed
          ></el-table-column>
          <el-table-column
            prop="status"
            label="所属环境"
            align="center"
            width="100"
            fixed
            :formatter="get_env_name"
          ></el-table-column>

          <el-table-column label="流水线名称" align="center" width="250" fixed
            ><template slot-scope="scope"
              ><el-link
                type="primary"
                target="_blank"
                :href="scope.row.project == 'prod' ? 'https://jenkins.yintaerp.com/job/'+scope.row.job_name : 'https://newjenkins.yintaerp.com/job/' +scope.row.job_name"
                >{{ scope.row.Assembly_name }}</el-link
              ></template
            ></el-table-column
          >
          <el-table-column
            prop="Assembly_serverName"
            label="联调标签"
            align="center"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="Assembly_serviceName"
            label="服务名称"
            align="center"
            width="180"
          ></el-table-column>

          <el-table-column
            prop="build_status"
            label="最后构建状态"
            align="center"
            width="100"
          >
            <template slot-scope="scope">
              <i
                class="el-icon-success"
                style="color: #10ee10"
                v-if="scope.row.build_status == 1"
                ><a v-html="get_build_status(scope.row)"></a
              ></i>
              <i
                class="el-icon-error"
                style="color: red"
                v-if="scope.row.build_status == 2"
                ><a v-html="get_build_status(scope.row)"></a
              ></i>
              <i
                class="el-icon-message-solid"
                style="color: #362e2e"
                v-if="scope.row.build_status == 4"
                ><a v-html="get_build_status(scope.row)"></a
              ></i>
              <i
                class="el-icon-eleme"
                style="color: #3178ec"
                v-if="scope.row.build_status == 3"
                ><a v-html="get_build_status(scope.row)"></a
              ></i>
              <i
                class="el-icon-user-solid"
                style="color: #e8e800"
                v-if="scope.row.build_status == 5"
                ><a v-html="get_build_status(scope.row)"></a
              ></i>
            </template>
          </el-table-column>

          <el-table-column
            prop="build_task"
            label="最后构建任务"
            align="center"
            width="200"
          >   <template slot-scope="scope"
              ><el-link
                type="primary"
                target="_blank"
                :href="scope.row.project == 'prod' ? 'https://jenkins.yintaerp.com/job/'+scope.row.job_name : 'https://newjenkins.yintaerp.com/job/' +scope.row.job_name"
                >{{ scope.row.build_task }}</el-link
              ></template></el-table-column>

          <el-table-column
            prop="buildBeginTime"
            label="最后构建时间"
            align="center"
            width="200"
          ></el-table-column>

          <el-table-column
            prop="build_man"
            label="最后构建人"
            align="center"
            width="200"
          ></el-table-column>

          <el-table-column
            prop="examine_man"
            label="最后审核人"
            align="center"
            width="100"
          >
          </el-table-column>

          <el-table-column
            prop="branch"
            label="最后构建分支"
            align="center"
            width="200"
          >
          </el-table-column>

          <el-table-column
            prop="gateway_addr"
            label="网关地址"
            align="center"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="popId"
            label="popId"
            align="center"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="Assembly_type"
            label="流水线类型"
            align="center"
            width="100"
            :formatter="get_Assembly_type"
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
                @click="Batch_audit([scope.row])"
                type="text"
                size="small"
                v-if="scope.row.build_status == 5"
                v-has="{class:'50'}"
                >审核</el-button
              >
              <el-button
                @click="Batch_build([scope.row])"
                type="text"
                size="small"
                v-if="
                  scope.row.build_status == 1 ||
                  scope.row.build_status == 2 ||
                  scope.row.build_status == 4
                "
                >构建</el-button
              ><el-button type="text" size="small"
                ><el-link
                  type="primary"
                  target="_blank"
                  v-bind:href="scope.row.logs_addr"
                  style="font-size: 12px"
                  v-if="scope.row.logs_addr && scope.row.Assembly_type == 2"
                  >查看日志</el-link
                ></el-button
              >
              <el-button
                @click="dev_seach_pre([scope.row])"
                type="text"
                size="small"
                v-if="
                  scope.row.project == 'sit' &&
                  (scope.row.build_status == 1 ||
                    scope.row.build_status == 2 ||
                    scope.row.build_status == 4)
                "
                >上预发</el-button
              >
              <el-button
                  @click="updateAssembly([scope.row])"
                  type="text"
                  size="small"
                  >更新流水线</el-button
                >
                <el-button
                @click="jacoco_build(scope.row)"
                type="text"
                size="small"
                v-if="
                  (scope.row.project == 'sit' || scope.row.project == 'uat' ) &&
                  scope.row.Assembly_type == 2
                "
                >生成覆盖率</el-button
              >
              <el-button
                @click="jacoco_build_history(scope.row)"
                type="text"
                size="small"
                v-if="
                  (scope.row.project == 'sit' || scope.row.project == 'uat' ) &&
                  scope.row.Assembly_type == 2
                "
                >覆盖率报告</el-button
              >
              <el-button
                @click="jenkins_build_history(scope.row.Assembly_id)"
                type="text"
                size="small"
                v-if="
                  scope.row.project == 'prod'
                "
                >构建记录</el-button
              >
              <el-button
                :style="{ color: scope.row.build_swatch == 0 ? 'red' : null}"
                @click="updateBuildSwatch(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.project != 'prod'"
                >{{ scope.row.build_swatch == 0 ? '禁止构建' : '允许构建' }}</el-button
              >
              <!-- <el-button
                @click="updateBuildSwatch(scope.row,0)"
                type="text"
                size="small"
                v-if="scope.row.project == 'sit' && scope.row.build_swatch == 1"
                >允许构建</el-button
              > -->
            </template>
          </el-table-column>
        </el-table>
        <!-- </template> -->
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
      <el-dialog
        :visible.sync="builddialog"
        width="80%"
        show-footer
        @open="openBuilddialog"
        @closed="closedBuilddialog"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        style="height: 80%; margin-top: 5%"
      >
        <span slot="title" style="font-size: 20px">构建流水线</span>
        <el-table
          :data="build_table_data"
          style="font-size: 13px; left: 1%; border-radius: 5px"
          :header-cell-style="{ background: '#E7EAED' }"
          :row-style="{ height: '40px' }"
          :cell-style="{ padding: '0px' }"
          height="90%"
          row-key="id"
          ref="build_data_List"
          :stripe="true"
          :border="true"
          type="selection"
          empty-text="暂无数据"
        ><el-table-column
            label="流水线名称"
            prop="Assembly_name"
            align="center"
            width="200"
          ></el-table-column>
          <el-table-column
            v-for="(item, ix) in build_table_head"
            :key="ix + ''"
            :label="item"
            :prop="item"
            align="center"
            width="200"
          >
            <template #default="{row}">
              <div v-if="row.hasOwnProperty(item)">
                <div v-if="item === 'diffs'">
                  <el-tooltip placement="top">
                    <div slot="content" v-html="row.diffs_text"></div>
                    <span>
                      {{ row[item] }}
                    </span>
                  </el-tooltip>
                  
                </div>
                <div v-else-if="item === 'diffs_4_hours'">
                  <el-tooltip placement="top">
                    <div slot="content" v-html="row.diffs_4_hours_text"></div>
                    <span>
                      {{ row[item] }}
                    </span>
                  </el-tooltip>
                  
                </div>
                <div v-else>
                  <el-input v-if="!row[item]" v-model="row[`${item}_value`]"></el-input>
                  <el-select v-else v-model="row[`${item}_value`]" filterable clearable :allow-create="true" @change="changeBranch(row)">
                    <el-option v-for="(d, idx) in row[item]" :key="idx" :label="d.name || d" :value="d.value || d"></el-option>
                  </el-select>
                </div>
              </div>
              <span v-else></span>
            </template>
          </el-table-column>
        </el-table>
        <el-footer style="padding: 20px">
          <el-button type="primary" @click="build"> 冲,上线 </el-button>
          <el-button type="primary" @click="closedBuilddialog">
            算了算了
          </el-button>
        </el-footer>
      </el-dialog>
      <el-dialog
        :visible.sync="buildResponsedialog"
        width="35%"
        show-footer
        @open="openbuildResponsedialog"
        @closed="closedbuildResponsedialog"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        style="height: 50%; margin-top: 10%"
      >
        <span slot="title" style="font-size: 20px">{{ field_name }}结果</span>
        <el-table
          :data="build_response_data"
          style="font-size: 13px; left: 1%; border-radius: 5px"
          :header-cell-style="{ background: '#E7EAED' }"
          :row-style="{ height: '40px' }"
          :cell-style="{ padding: '0px' }"
          height="90%"
          :stripe="true"
          :border="true"
          type="selection"
          empty-text="暂无数据"
        >
          <el-table-column
            prop="name"
            label="流水线名称"
            align="center"
            width="240"
          ></el-table-column>
          <el-table-column
            prop="status"
            label="操作结果"
            align="center"
            width="200"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.status == 1 ? "成功" : "失败" }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="msg"
            label="结果说明"
            align="center"
            width="200"
          ></el-table-column>
        </el-table>
      </el-dialog>

      <el-dialog :visible.sync="jacoco_build_dialog"
      title="生成覆盖率" show-footer
                 style="height: 600px;margin-top: 100px;"
                 :close-on-press-escape="false"
                 :close-on-click-modal="false">
        <el-form
            ref="Form"
            :model="jacoco_build_form"
            label-width="auto"
            :rules="rules"
            :inline-message="true"
            :status-icon="true"
        >
          <el-form-item label="git地址" prop="git_addr">
            <el-input
                v-model="jacoco_build_form.git_addr"
                placeholder="请输入git地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="服务名称" prop="service_name">
            <el-input
                v-model="jacoco_build_form.service_name"
                placeholder="请输入服务名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="jenkins-workspace" prop="jenkins_target_path">
            <el-input
                v-model="jacoco_build_form.jenkins_target_path"
                placeholder="请输入jenkins工作目录"
            ></el-input>
          </el-form-item>
          <el-form-item label="代码目录" prop="code_path">
            <el-input
                v-model="jacoco_build_form.code_path"
                placeholder="请输入代码目录"
            ></el-input>
          </el-form-item>
          <el-form-item label="服务路由" prop="jacoco_server_ip">
            <el-input
                v-model="jacoco_build_form.jacoco_server_ip"
                placeholder="请输入服务路由"
            ></el-input>
          </el-form-item>
          <el-form-item label="分支" prop="branch">
            <el-select v-model="jacoco_build_form.branch" clearable filterable @change="rerun_last_commit() "
                       style="width:100%">
              <el-option v-for="item in buildParmesBranch" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="jenkins_job名称" prop="job_name">
            <el-input
                v-model="jacoco_build_form.job_name"
                placeholder="请输入jenkins_job名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="构建id" prop="build_id">
            <el-input
                v-model="jacoco_build_form.build_id"
                placeholder="请输入构建id"
            ></el-input>
          </el-form-item>
          <el-form-item label="旧commit" prop="old_version">
            <el-input
                v-model="jacoco_build_form.old_version"
                placeholder="请输入旧commit"
            ></el-input>
          </el-form-item>
          <el-form-item label="新commit" prop="begin_version">
            <el-input
                v-model="jacoco_build_form.begin_version"
                placeholder="请输入新commit"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="jacoco_build_contorl()">生成</el-button>
            <el-button @click="jacoco_build_dialog=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog
        title="覆盖率报告"
        :visible.sync="jacoco_build_history_dialog"
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
                :data="jacoco_build_history_data"
                style="font-size: 13px"
                :header-cell-style="{ background: '#E7EAED' }"
                height="500"
                width="100%"
                :row-style="{ height: '40px' }"
                :cell-style="{ padding: '0px' }"
                :stripe="true"
                :border="true"
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
                  prop="job_name"
                  label="jenkins-job名称"
                  align="center"
                  width="150"
              >
              </el-table-column>
              <el-table-column
                  prop="service_name"
                  label="服务名称"
                  align="center"
                  width="150"
              >
              </el-table-column>
              <el-table-column
                  :formatter="jacoco_status"
                  prop="status"
                  label="执行状态"
                  align="center"
                  width="100"
              >
              </el-table-column>
              <el-table-column
                  prop="error_msg"
                  label="错误原因"
                  align="center"
                  width="250"
              >
              </el-table-column>
              <el-table-column
                  prop="creator"
                  label="执行人"
                  align="center"
                  width="100"
              >
              </el-table-column>
              <el-table-column
                  prop="create_time"
                  label="执行时间"
                  align="center"
                  width="150"
              >
              </el-table-column>
              <el-table-column
                  prop="jacoco_report"
                  label="执行报告"
                  align="center"
                  width="100"
              >
                <template slot-scope="scope">
                  <el-link type="primary"
                  v-if="scope.row.status == 2" 
                  @click="reviewReport(scope.row)"
                  >查看报告</el-link>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
        <!--表格end-->
      </div>
    </el-dialog>

    <el-dialog
        title="构建历史"
        :visible.sync="jenkins_build_history_dialog"
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
                :data="jenkins_build_history_data"
                style="font-size: 13px"
                :header-cell-style="{ background: '#E7EAED' }"
                height="500"
                width="100%"
                :row-style="{ height: '40px' }"
                :cell-style="{ padding: '0px' }"
                :stripe="true"
                :border="true"
                type="selection"
            >
              <el-table-column
                  prop="Assembly_serviceName"
                  label="构建服务"
                  align="center"
                  width="150"
              >
              </el-table-column>
              <el-table-column
                  prop="Assembly_serverName"
                  label="构建环境"
                  align="center"
                  width="100"
              >
              </el-table-column>
              <el-table-column
                  prop="build_status"
                  label="构建状态"
                  align="center"
                  width="100"
              >
              <template slot-scope="scope">
              <i
                class="el-icon-success"
                style="color: #10ee10"
                v-if="scope.row.build_status == 1"
                ><a v-html="get_build_status(scope.row)"></a
              ></i>
              <i
                class="el-icon-error"
                style="color: red"
                v-if="scope.row.build_status == 2"
                ><a v-html="get_build_status(scope.row)"></a
              ></i>
              <i
                class="el-icon-message-solid"
                style="color: #362e2e"
                v-if="scope.row.build_status == 4"
                ><a v-html="get_build_status(scope.row)"></a
              ></i>
              <i
                class="el-icon-eleme"
                style="color: #3178ec"
                v-if="scope.row.build_status == 3"
                ><a v-html="get_build_status(scope.row)"></a
              ></i>
              <i
                class="el-icon-user-solid"
                style="color: #e8e800"
                v-if="scope.row.build_status == 5"
                ><a v-html="get_build_status(scope.row)"></a
              ></i>
            </template>
              </el-table-column>
              <el-table-column
                  prop="branch"
                  label="构建分支"
                  align="center"
                  width="250"
              >
              </el-table-column>
              <el-table-column
                  prop="build_man"
                  label="构建人"
                  align="center"
                  width="150"
              >
              </el-table-column>
              <el-table-column
                  prop="buildBeginTime"
                  label="构建开始时间"
                  align="center"
                  width="150"
              >
              </el-table-column>
              <el-table-column
                  prop="commit_id"
                  label="commit_id"
                  align="center"
                  width="250"
              >
              </el-table-column>
              <el-table-column
                  prop="commits_list"
                  label="commits_list"
                  align="center"
                  width="150"
              >
              <template slot-scope="{row}">
                <el-tooltip placement="top">
                    <div slot="content" v-html="row.commits_list"></div>
                    <span>
                      {{ row.commits_list.length }}
                    </span>
                  </el-tooltip>
              </template>
              </el-table-column>
              <el-table-column
                  prop="commits_list_4_hours"
                  label="commits_list_4_hours"
                  align="center"
                  width="150"
              ><template slot-scope="{row}">
                <el-tooltip placement="top">
                    <div slot="content" v-html="row.commits_list_4_hours"></div>
                    <span>
                      {{ row.commits_list_4_hours.length }}
                    </span>
                  </el-tooltip>
              </template>
              </el-table-column>
              <el-table-column
                  prop="build_reason"
                  label="构建原因"
                  align="center"
                  width="250"
              >
              <template slot-scope="{row}">
                <el-input v-if="row.build_status != 2 && row.build_status != 4" v-model="row.build_reason" type="textarea"></el-input>
              </template>
              </el-table-column>
              <el-table-column
                  label="操作"
                  align="center"
                  width="100"
              >
                <template slot-scope="scope">
                  <el-link type="primary"
                  v-if="scope.row.build_status != 2 && scope.row.build_status != 4" 
                  @click="addBuildHistoryReason(scope.row)"
                  >保存</el-link>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
        <!--表格end-->
        <div>
        <el-pagination
          v-on:size-change="jenkins_history_handleSizeChange"
          v-on:current-change="jenkins_history_handleCurrentChange"
          :current-page="jenkins_history_list_page_body.page"
          :page-sizes="[20, 50, 100]"
          :page-size="20"
          layout="total, sizes, prev, pager, next, jumper"
          :total="jenkins_build_history_total"
          style="float: right; margin-top: 10px; margin-right: 20px"
        ></el-pagination>
      </div>
      </div>
    </el-dialog>

    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import axios from "axios";
import Sortable from "sortablejs";

export default {
  //引入面包屑
  components: { Breadcrumb },
  data() {
    return {
      //分页请求数据
      jenkins_history_list_page_body:{
        page:1,
        limit:20,
        Assembly_id:null
      },
      list_page_body: {
        page: 1,
        limit: 20,
        project: "sit",
      },
      build_Assembly_env: "sit",

      //wsUrl : 'wss://test-platform-api.nextop.com/websocket/bk_ci',
      wsUrl: "ws://test-platform.sit.yintaerp.com/websocket/bk_ci",

      websock: null,

      //是否有数据
      is_data: false,
      build_data: [],
      examine_data: [],
      builddialog: false,
      buildResponsedialog: false,
      build_response_data: [],
      field_name: "构建",
      audit_status: 1,
      //表格
      bk_ci_data: [],
      //总条数
      total: 0,
      jenkins_build_history_total:0,
      updateAssemblyList: [],
      rules: {},
      mergeMaster_type: [
        {
          value: true,
          label: "需要合并",
        },
        {
          value: false,
          label: "无需合并",
        },
      ],
      Assembly_type: [
        {
          value: 1,
          label: "前端",
        },
        {
          value: 2,
          label: "后端",
        },
      ],
      build_examine: [
        {
          value: true,
          label: "需要审核",
        },
        {
          value: false,
          label: "无需审核",
        },
      ],
      env: [
        {
          value: "sit",
          label: "联调环境",
        },
        {
          value: "uat",
          label: "预发环境",
        },
        {
          value: "prod",
          label: "生产环境",
        },
      ],
      build_status: [
        {
          value: 1,
          label: "构建正常",
        },
        {
          value: 2,
          label: "构建失败",
        },
        {
          value: 3,
          label: "构建中",
        },
        {
          value: 4,
          label: "取消构建",
        },
        {
          value: 5,
          label: "待审核",
        },
      ],
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      is_checkBuild: [
        {
          value: 0,
          label: "无需等待",
        },
        {
          value: 1,
          label: "构建完成时开始",
        },
        {
          value: 2,
          label: "待审核时开始",
        },
      ],
      is_checkAudit: [
        {
          value: true,
          label: "自动审核",
        },
        {
          value: false,
          label: "手动审核",
        },
      ],
      auto_deploy: [
        {
          value: true,
          label: "自动发布",
        },
        {
          value: false,
          label: "无需自动发布",
        },
      ],
      confirm: {
        build_examine: false,
        is_checkBuild: false,
        is_checkAudit: false,
        examine_man: false,
      },
      build_new_data: [],
      build_table_head: [],
      build_table_data: [],
      jacoco_build_dialog:false,
      jacoco_build_form:{},
      buildParmesBranch:{},
      jacoco_build_history_dialog:false,
      jacoco_build_history_data:[],
      jacoco_status_data:[
        {value:1,label:"执行中"},
        {value:2,label:"执行成功"},
        {value:3,label:"执行失败"},
      ],
      jenkins_build_history_Assembly_id:null,
      jenkins_build_history_dialog:false,
      jenkins_build_history_data:[],
      compatibleAssemblyList:[]
    };
  },
  mounted() {
    //this.initWebSocket();
  },
  beforeDestroy() {
   // this.wsClose();
  },
  methods: {
    reviewReport(row){
      window.open('http://test-platform.sit.yintaerp.com'+row.jacoco_report)
    },
    jacoco_status(raw) {
      let val = null;
      this.jacoco_status_data.forEach((item) => {
        if (raw.status === item.value) {
          val = item.label;
        }
      });
      return val;
    },
    jacoco_build(row){
      const branch = eval(row.branch).length === 1 ? eval(row.branch)[0] : eval(row.branch)[1]
      const commit_id = JSON.parse(row.commit_id)
      this.buildParmesBranch = JSON.parse(row.buildParmes).branch2
      if(row.jacoco_build_parmes){
        this.jacoco_build_form = JSON.parse(JSON.stringify(row.jacoco_build_parmes))
        this.jacoco_build_form.pipline_id = row.Assembly_id
        if(!Object.keys(this.jacoco_build_form).includes("jenkins_target_path")){
          this.$set(this.jacoco_build_form,"jenkins_target_path",row.Assembly_serviceName)
        }
        if(!Object.keys(this.jacoco_build_form).includes("code_path")){
          this.$set(this.jacoco_build_form,"code_path","/"+ row.job_name + "/" + row.Assembly_serviceName)
        }
        this.jacoco_build_form.git_addr = row.git.split("@")[1].replace(":","/")
        this.jacoco_build_form.old_git_addr = row.git
        this.jacoco_build_form.branch = branch
        this.jacoco_build_form.server_name = row.Assembly_serverName
        this.jacoco_build_form.build_id = row.build_id
        this.jacoco_build_form.begin_version = commit_id[branch]
      }else{
            this.jacoco_build_form = {
                pipline_id:row.Assembly_id,
                git_addr:row.git.split("@")[1].replace(":","/"),
                jenkins_target_path:row.Assembly_serviceName,
                code_path:"/"+ row.job_name + "/" + row.Assembly_serviceName,
                old_git_addr:row.git,
                server_name:row.Assembly_serverName,
                service_name:row.Assembly_serviceName,
                jacoco_server_ip:row.Assembly_serviceName + ".erp-"+ row.project + ".svc",
                branch:branch,
                job_name:row.job_name,
                build_id:row.build_id,
                old_version:"",
                begin_version:commit_id[branch]
          };
      }
    this.jacoco_build_dialog = true;
      axios
        .post("/api/test_tools/get_last_commitid", {git:row.git,branch:branch})
        .then((res) => {
          // api接口判断为code=10000成功
          if (res.data.code === 10000) {
            this.jacoco_build_form.old_version = res.data.last_commit_id ? res.data.last_commit_id : commit_id[branch]
            this.$message({
              duration: 2000,
              message: res.data.msg,
              type: "success",
            });
          } else {  
            //失败提示
            this.$message.error(res.data.msg);
          }
        }
        )
        .catch(() => {
          this.$message.error("服务器错误,请联系测试人员");
        });
    },
    addBuildHistoryReason(row){
      axios
        .post("/api/test_tools/addBuildHistoryReason", {
          Assembly_id:row.Assembly_id,
          build_id:row.build_id,
          build_reason:row.build_reason
        })
        .then((res) => {
          //api接口判断为code=10000成功
          if (res.data.code === 10000) {
            this.get_jenkins_build_history();
            this.$message({
              duration: 2000,
              message: res.data.msg,
              type: "success",
            });
          } else {
            //失败提示
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {
          this.$message.error("服务器错误,请联系测试人员");
        });
    },
    uploadBuildHistory(){
      axios
        .post("/api/test_tools/uploadBuildHistroy", this.list_page_body)
        .then((res) => {
          //api接口判断为code=10000成功
          if (res.data.code === 10000) {
            this.$message({
              duration: 2000,
              message: res.data.msg,
              type: "success",
            });
            window.open(res.data.report_url)
          } else {
            //失败提示
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {
          this.$message.error("服务器错误,请联系测试人员");
        });
    },
    jacoco_build_contorl(){
      axios
        .post("/api/test_tools/jacoco_build", this.jacoco_build_form)
        .then((res) => {
          //api接口判断为code=10000成功
          if (res.data.code === 10000) {
            this.jacoco_build_dialog = false;
            this.$message({
              duration: 2000,
              message: res.data.msg,
              type: "success",
            });
          } else {
            //失败提示
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {
          this.$message.error("服务器错误,请联系测试人员");
        });
    },
    jacoco_build_history(row){
      axios
        .post("/api/test_tools/jacoco_build_history_list", {page:1,limit:100,server_name:row.Assembly_serverName,service_name:row.Assembly_serviceName})
        .then((res) => {
          //api接口判断为code=10000成功
          if (res.data.code === 10000) {
            this.jacoco_build_history_data = res.data.data
              this.jacoco_build_history_dialog = true;
              this.$message({
              duration: 2000,
              message: res.data.msg,
              type: "success",
            });
          } else {
            //失败提示
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {
          this.$message.error("服务器错误,请联系测试人员");
        });
    },
    initWebSocket() {
      this.websocket = new WebSocket(
        `${this.wsUrl}?token=${localStorage.getItem("token")}`
      );
      this.websocket.onmessage = this.wsOnmessage;
      // this.websocket.onopen = this.wsOnopen;
      this.websocket.onerror = this.wsOnerror;
      this.websocket.onclose = this.wsClose;
    },
    openbuildResponsedialog(){

    },
    // 客户端接收到服务端数据的回调
    wsOnmessage(res) {
      const list = JSON.parse(res.data);
      for (let i = 0; i < this.bk_ci_data.length; i++) {
        this.$nextTick(() => {
          list.message.find((obj) => {
            if (this.bk_ci_data[i].id == obj.id) {
              this.$set(this.bk_ci_data, i, obj);
            }
          });
        });
      }
      for(let i=0;i<this.build_data.length;i++){
        this.$nextTick(()=>{
          this.bk_ci_data.find((obj)=>{
            if(this.build_data[i].id == obj.id){
              this.$refs.bkciTableRef.toggleRowSelection(obj,true)
            }
          })
        })
      }
    },
    // 连接成功后的回调
    // wsOnopen() {
    //   this.wsSend(JSON.stringify(this.list_page_body));
    //   console.log("连接成功");
    // },
    // 连接失败后的回调
    wsOnerror() {},
    // 连接关闭后的回调
    wsClose(event) {
      console.log("链接关闭：" + event);
      this.websocket.close();
    },
    // 向服务器发送数据
    wsSend(data) {
      this.websocket.send(JSON.stringify(data));
    },
    openBuilddialog() {
      this.confirm = {
        build_examine: false,
        is_checkBuild: false,
        is_checkAudit: false,
        examine_man: false,
      };
    },
    get_jenkins_build_history(){axios
        .post("/api/test_tools/buildHistoryList",this.jenkins_history_list_page_body)
        .then((res) => {
          //api接口判断为code=10000成功
          if (res.data.code === 10000) {
            this.jenkins_build_history_data = res.data.data;
            this.jenkins_build_history_total = res.data.count;
            this.$message({
              duration: 2000,
              message:'操作成功',
              type: "success",
            });
          } else {
            //失败提示
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {
          this.$message.error("服务器错误,请联系测试人员");
        });
      },
    jenkins_build_history(Assembly_id){
      this.jenkins_build_history_dialog = true;
      this.jenkins_history_list_page_body.Assembly_id = Assembly_id;
      this.get_jenkins_build_history()
      
    },
    build_examine_change(val, field) {
      if (this.build_data.length <= 1) {
        return;
      }
      if (this.confirm[field] == true) {
        return;
      }
      this.$confirm("是否同步选项至其他流水线", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.build_data.forEach((item) => {
          item[field] = val;
        });
      });
      this.confirm[field] = true;
    },
    updateAssembly(AssemblyList) {
      this.updateAssemblyList = [];
      console.log(AssemblyList);
      if (!AssemblyList || AssemblyList.length === 0) {
        this.$message.error("请至少选择一个流水线");
        return;
      }
      AssemblyList.forEach((item) => {
        this.updateAssemblyList.push(item.Assembly_id);
      });
      axios
        .post("/api/test_tools/updateAssembly", {
          AssemblyId_list: this.updateAssemblyList,
        })
        .then((res) => {
          //api接口判断为code=10000成功
          if (res.data.code === 10000) {
            this.field_name = "更新";
            this.buildResponsedialog = true;
            this.build_response_data = res.data.data;
            this.$message({
              duration: 2000,
              message: res.data.msg,
              type: "success",
            });
            this.get_config_List();
          } else {
            //失败提示
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {
          this.$message.error("服务器错误,请联系测试人员");
        });
    },
    enterdisableVisible() {
      this.$refs.projectSelect.visible = false;
      this.$refs.build_statusSelect.visible = false;
      this.$refs.Assembly_typeSelect.visible = false;
    },
    //初始化拖动列表
    rowDrop() {
      const el = this.$refs.build_data_List.$el.querySelectorAll(
        ".el-table__body-wrapper > table > tbody"
      )[0];
      this.sortable = Sortable.create(el, {
        ghostClass: "sortable-ghost",
        setData: function (dataTransfer) {
          dataTransfer.setData("Text", "");
        },
        onEnd: (evt) => {
          const targetRow = this.build_table_data.splice(evt.oldIndex, 1)[0];
          this.build_table_data.splice(evt.newIndex, 0, targetRow);
        },
      });
    },
    dev_seach_pre(Assembly_list) {
      if (Assembly_list.length == 0 || !Assembly_list) {
        this.$message.error("至少选择一个流水线");
        return;
      }
      let AssemblyId_list = [];
      let Assembly_Assembly_serviceName_list = [];
      for (let i = 0; i < Assembly_list.length; i++) {
        if (
          Assembly_list[i].build_status == 3 ||
          Assembly_list[i].build_status == 5
        ) {
          this.$message.error("请勿选择构建中或待审核的流水线");
          return;
        }
        if (Assembly_list[i].project != "sit") {
          this.$message.error("包含非联调环境的流水线");
          return;
        }
        if (
          Assembly_list[i].Assembly_serviceName in
          Assembly_Assembly_serviceName_list
        ) {
          this.$message.error(
            "请不要选择多个同样服务名的流水线:${Assembly_list[i].Assembly_serviceName}"
          );
          return;
        }
        AssemblyId_list.push(Assembly_list[i].Assembly_id);
        Assembly_Assembly_serviceName_list.push(
          Assembly_list[i].Assembly_serviceName
        );
      }
      axios
        .post("/api/test_tools/dev_seach_pre", {
          AssemblyId_list: AssemblyId_list,
        })
        .then((res) => {
          //api接口判断为code=10000成功
          if (res.data.code === 10000) {
            const pre_Assembly_list = res.data.data;
            let dev_Assembly_obj = {};
            Assembly_list.forEach((item) => {
              dev_Assembly_obj[item.Assembly_serviceName] = item;
            });
            let new_Assembly_list = [];
            pre_Assembly_list.forEach((item) => {
              item.branch = dev_Assembly_obj[item.Assembly_serviceName].branch;
              item.examine_man =
                dev_Assembly_obj[item.Assembly_serviceName].examine_man;
              item.git = dev_Assembly_obj[item.Assembly_serviceName].git;
              item.is_checkBuild = 0;
              item.is_checkAudit = false;
              item.auto_deploy = false;
              item.mergeMaster = true;
              new_Assembly_list.push(item);
            });
            this.build_data = JSON.parse(JSON.stringify(new_Assembly_list));
            this.setBuildData(this.build_data)
            this.builddialog = true;
            this.$nextTick(() => {
              // 延时加载
              this.rowDrop();
            });
          } else {
            //失败提示
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {
          this.$message.error("服务器错误,请联系测试人员");
        });
    },
    updateBuildSwatch(row){
      const type = row.build_swatch == 0 ? 1: 0
      axios
        .post("/api/test_tools/switchBuildSwatch", {Assembly_id:row.Assembly_id,build_swatch:type})
        .then((res) => {
          //api接口判断为code=10000成功
          if (res.data.code === 10000) {
            this.$message({
              duration: 2000,
              message: res.data.msg,
              type: "success",
            });
            this.$nextTick(()=>{
              this.$set(row,'build_swatch',type)
              this.bk_ci_data = [...this.bk_ci_data]
            })
                    } else {
            //失败提示
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {
          this.$message.error("服务器错误,请联系测试人员");
        });
    },
    get_compatibleAssemblyList(){
      axios
        .post("/api/test_tools/compatibleAssemblyList", {})
        .then((res) => {
          //api接口判断为code=10000成功
          if (res.data.code === 10000) {
            this.compatibleAssemblyList = res.data.data;
          } else {
            //失败提示
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {
          this.$message.error("服务器错误,请联系测试人员");
        });
    },
    Batch_build(Assembly_list) {
      var prod_pipline = false
      if (Assembly_list.length == 0 || !Assembly_list) {
        this.$message.error("至少选择一个流水线");
        return;
      }
      this.get_compatibleAssemblyList();
      this.build_Assembly_env = Assembly_list[0].project;
      for (let i = 0; i < Assembly_list.length; i++) {
        if (
          Assembly_list[i].build_status == 3 ||
          Assembly_list[i].build_status == 5
        ) {
          this.$message.error("请勿选择构建中或待审核的流水线");
          return;
        }
        if (Assembly_list[i].project != this.build_Assembly_env) {
          this.$message.error("请勿选择不同环境的流水线");
          return;
        }
      }
      let new_Assembly_list = [];
      let AssemblyId_list = []
      Assembly_list.forEach((item) => {
        item.is_checkBuild = 0;
        item.is_checkAudit = false;
        item.auto_deploy = false;
        item.mergeMaster = true;
        new_Assembly_list.push(item);
        AssemblyId_list.push(item.Assembly_id)
        if(item.project == 'prod'){
          prod_pipline = true
        }
      });
      this.build_data = JSON.parse(JSON.stringify(new_Assembly_list));
      this.setBuildData(this.build_data,prod_pipline,AssemblyId_list)
      this.builddialog = true;
      this.$nextTick(() => {
        // 延时加载
        this.rowDrop();
      });
    },
    async setBuildData(list,prod_pipline,AssemblyId_list) {
      let arr = []
      let uat_data = []
      if(prod_pipline){
       let res = await axios.post("/api/test_tools/dev_seach_pre", {
          AssemblyId_list: AssemblyId_list,
          env:"prod"
        })
        if(res.data.code == 10000){
          uat_data = res.data.data
          // commitdList = res.data.commits
        }
        // let diff_res = await axios.post("/api/test_tools/checkCommitDiff", {
        //   Assembly_id:Assembly_id,
        //   build_branch: branch2,
        //   gitAddr:git_addr
        // })
        // if(res.data.code == 10000){
        //   diff_data = res.data.data
        //   // commitdList = res.data.commits
        // }
      }
      const build_table_data = list.map(e => {
        arr.push(JSON.parse(e.buildParmes))
        const data = e.old_buildParmes ? JSON.parse(e.old_buildParmes) : {}
        let obj = {
          ...e,
          ...JSON.parse(e.buildParmes)
        }
        for (let key in data) {
          if(e.Assembly_type === 2 && key == 'action' && !this.compatibleAssemblyList.includes(e.Assembly_name)){
            obj[`${key}_value`] = e.Assembly_name
          }else if(
            (e.Assembly_type === 1 && key == 'action') || (e.Assembly_type === 2 && key == 'action' && this.compatibleAssemblyList.includes(e.Assembly_name))
          ){
            obj[`${key}_value`] = data.deployenv
          }else if(uat_data?.length && key == 'commitId'){
            obj[`${key}_value`] = ''
            for(let uat_assembly in uat_data){
              if(uat_data[uat_assembly].Assembly_name == e.Assembly_name){
                obj[`${key}_value`] = JSON.parse(uat_data[uat_assembly].commit_id.replace(/'/g,'"'))[JSON.parse(uat_data[uat_assembly].old_buildParmes).branch2]
              }
            }
          }else if(uat_data?.length && key == 'branch2'){      
            for(let uat_assembly in uat_data){
              if(uat_data[uat_assembly].Assembly_name == e.Assembly_name){
                obj[`${key}_value`] = JSON.parse(uat_data[uat_assembly].old_buildParmes).branch2
              }
            }
          }else{
          obj[`${key}_value`] = data[key]}
        }
        return obj
      })
      let head_data = []
      let have_prod = false
      arr.forEach(e => {
        const list = Object.keys(e)
        head_data = head_data.concat(list)
      })
      console.log(build_table_data)
      for (let index = 0; index < build_table_data.length; index++) {
        const element = build_table_data[index];
        if(element.project != 'prod'){continue}
        let diff_res = await axios.post("/api/test_tools/checkCommitDiff", {
          Assembly_id: element.Assembly_id,
          branch: element.branch2_value,
          gitAddr: element.git
        })
        if(diff_res.data.code == 10000){
          element.diffs = diff_res.data.data?.length
          element.diffs_text = diff_res.data.data?.join('<br/>')
          element.diffs_4_hours = diff_res.data.commits_list_4_hours?.length
          element.diffs_4_hours_text = diff_res.data.commits_list_4_hours?.join('<br/>')
        }else{
          element.diffs = diff_res.data.msg
          element.diffs_4_hours = diff_res.data.msg
      }
      have_prod = true
      }
      
      console.log(build_table_data)
      this.build_table_data = build_table_data
      let build_table_head = [...new Set(head_data)]
      let idx = build_table_head.findIndex(e => e === 'commitId')
      if(have_prod){
        build_table_head.splice(idx+1, 0, 'diffs')
        build_table_head.splice(idx+2, 0, 'diffs_4_hours')
      }
      this.build_table_head = build_table_head
      console.log(this.build_table_data, this.build_table_head)
    },
    async changeBranch(row) {
      if(row.project == 'prod'){
        let diff_res = await axios.post("/api/test_tools/checkCommitDiff", {
        Assembly_id: row.Assembly_id,
        branch: row.branch2_value,
        gitAddr: row.git
      })
console.log(row)
      if(diff_res.data.code == 10000){
        this.$set(row, 'diffs', diff_res.data.data?.length)
        this.$set(row, 'diffs_text', diff_res.data.data?.join('<br/>'))
        this.$set(row, 'diffs_4_hours', diff_res.data.commits_list_4_hours?.length)
        this.$set(row, 'diffs_4_hours_text', diff_res.data.commits_list_4_hours?.join('<br/>'))
        this.$set(row,'commitId_value', diff_res.data.branchs[row.branch2_value])
      }else{
        this.$set(row, 'diffs', diff_res.data.msg)
        this.$set(row, 'diffs_4_hours', diff_res.data.msg)
        
      }
      }
      
    },
    Batch_audit(Assembly_list) {
      let audit_list = [];
      this.examine_data = JSON.parse(JSON.stringify(Assembly_list));
      if (!Assembly_list || Assembly_list.length == 0) {
        this.$message.error("请选择至少一条待审核流水线");
        return;
      }

      for (let i = 0; i < this.examine_data.length; i++) {
        if (this.examine_data[i].build_status != 5) {
          this.$message.error("包含不处于待审核状态的流水线");
          return;
        }
        audit_list.push(this.examine_data[i].Assembly_id);
      }
      this.examine_data = audit_list;
      this.$confirm(
        "请选择通过或驳回，如需返回请点击右上角关闭按钮",
        "审核提示",
        {
          distinguishCancelAndClose: true,
          confirmButtonText: "通过",
          cancelButtonText: "驳回",
          cancelButtonClass: "cancelButton",
          type: "warning",
        }
      )
        .then(() => {
          this.audit_status = 1;
          this.audit();
        })
        .catch((action) => {
          console.log(action);
          if (action === "cancel") {
            this.audit_status = 2;
            this.audit();
          } else {
            this.$message({
              type: "info",
              message: "已取消",
            });
          }
        });
    },
    offline(row) {
      this.$confirm(
        "是否确认下线该流水线,确认后如需取消请跳转至jenkins操作",
        "下线提示",
        {
          confirmButtonText: "确定下线",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          let userKey = window.localStorage.getItem("userKey");
          axios
            .post("/api/test_tools/offline", {
              Assembly: row,
              userKey: userKey,
            })
            .then((res) => {
              //api接口判断为code=10000成功
              if (res.data.code === 10000) {
                this.$message({
                  duration: 2000,
                  message: res.data.msg,
                  type: "success",
                });
                this.get_config_List();
              } else {
                //失败提示
                this.$message.error(res.data.msg);
              }
            })
            .catch(() => {
              this.$message.error("服务器错误,请联系测试人员");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    rerun_last_commit(){
      axios
        .post("/api/test_tools/get_last_commitid", {git:this.jacoco_build_form.old_git_addr,branch:this.jacoco_build_form.branch})
        .then((res) => {
          // api接口判断为code=10000成功
          if (res.data.code === 10000) {
            this.jacoco_build_form.old_version = res.data.last_commit_id ? res.data.last_commit_id : this.jacoco_build_form.begin_version
            this.$message({
              duration: 2000,
              message: res.data.msg,
              type: "success",
            });
          } else {
            //失败提示
            this.$message.error(res.data.msg);
          }
        }
        )
        .catch(() => {
          this.$message.error("服务器错误,请联系测试人员");
        });
    },
    audit() {
      let userKey = window.localStorage.getItem("userKey");
      axios
        .post("/api/test_tools/to_examine", {
          Assembly_list: this.examine_data,
          userKey: userKey,
          status: this.audit_status,
        })
        .then((res) => {
          //api接口判断为code=10000成功
          if (res.data.code === 10000) {
            this.field_name = "审核";
            this.buildResponsedialog = true;
            this.build_response_data = res.data.data;
            this.$message({
              duration: 2000,
              message: res.data.msg,
              type: "success",
            });
          } else {
            //失败提示
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {
          this.$message.error("服务器错误,请联系测试人员");
        });
    },
    closedBuilddialog() {
      this.builddialog = false;
    },
    closedbuildResponsedialog() {
      this.buildResponsedialog = false;
      this.get_config_List();
      this.updateAssemblyList = [];
    },
    build() {
      let userKey = window.localStorage.getItem("userKey");
      if (this.build_table_data) {
        axios
          .post("/api/test_tools/structure", {
            Assembly_list: this.build_table_data.map(e => {
              const obj = {}
              obj.Assembly_id = e.Assembly_id
              for (let key in e) {
                if (key.includes('_value')) {
                  obj[key.split('_')[0]] = e[key]
                }
              }
              return obj
            }),
            userKey: userKey,
          })
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data.code === 10000) {
              this.field_name = "构建";
              this.builddialog = false;
              this.build_response_data = res.data.data;
              this.buildResponsedialog = true;
              this.$message({
                duration: 2000,
                message: res.data.msg,
                type: "success",
              });
            } else {
              //失败提示
              this.$message.error(res.data.msg);
            }
          })
          .catch(() => {
            this.$message.error("服务器错误,请联系测试人员");
          });
      }
    },
    get_config_List() {
      axios
        .post("/api/test_tools/list", this.list_page_body)
        .then((res) => {
          //api接口判断为code=10000成功
          if (res.data["code"] === 10000) {
            this.bk_ci_data = res.data.data;
            this.total = res.data.count;
            this.is_data = true;
            this.build_data = []
          } else {
            //失败提示
            this.is_data = false;
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {
          this.is_data = false;
          this.$message.error("服务器错误,请联系测试人员");
        });
    },
    //页量切换
    handleSizeChange(val) {
      this.list_page_body.limit = val;
      this.get_config_List();
    },
    //页码切换
    handleCurrentChange(val) {
      this.list_page_body.page = val;
      this.get_config_List();
      this.wsSend(JSON.stringify(this.list_page_body));
    },
    jenkins_history_handleSizeChange(val) {
      this.jenkins_history_list_page_body.limit = val;
      this.get_jenkins_build_history();
    },
    //页码切换
    jenkins_history_handleCurrentChange(val) {
      this.jenkins_history_list_page_body.page = val;
      this.get_jenkins_build_history();
    },

    handleSelectionChangeCase(val) {
      this.build_data = [];
      this.examine_data = [];
      val.forEach((item) => {
        this.build_data.push(item);
        this.examine_data.push(item);
      });
    },
    get_env_name(raw) {
      let val = null;
      this.env.forEach((item) => {
        if (raw.project === item.value) {
          val = item.label;
        }
      });
      return val;
    },
    get_build_status(raw) {
      let val = null;
      this.build_status.forEach((item) => {
        if (raw.build_status === item.value) {
          val = item.label;
        }
      });
      return val;
    },
    get_Assembly_type(raw) {
      if (raw.Assembly_type == 1) {
        return "前端";
      } else {
        return "后端";
      }
    },
  },

  //页面初始化渲染
  created() {
    this.get_config_List();
  },
};
</script>

<style>
.cancelButton {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}
</style>

<style scoped>
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