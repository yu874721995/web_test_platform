<template>
  <div>
    <div>
      <div>
        <Breadcrumb />
      </div>
    </div>

    <div style="float: left; width: 100%; line-height: 60px">
      <div style="width: 100%">
        <div style="float: left; margin-left: 10px">
          <a style="font-size: 13px">迭代名称</a>
          <el-input
            placeholder="请输入迭代名称"
            v-model="list_page_body.iteration_name"
            style="width: 150px; margin-left: 10px"
            class="case_input"
          ></el-input>
        </div>

        <div style="float: left; margin-left: 10px">
          <a style="font-size: 13px">测试负责人</a>
          <el-input
            placeholder="请输入测试负责人"
            v-model="list_page_body.test_man"
            style="width: 150px; margin-left: 10px"
            class="case_input"
          ></el-input>
        </div>

        <div style="float: left; padding-left: 5px">
          <el-button plain icon="el-icon-search" @click="handleCurrentChange(1)"
            >查询</el-button
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
              @click="update_now"
              v-has="{class:'85'}"
            >
              立即更新
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <!--表格start-->
    <div>
      <div
        style="margin-top: 10px; float: left; width: 98%; text-align: center"
      >
        <template>
          <el-table
            :data="tapd_test_risk_data"
            style="font-size: 13px; left: 1%; border-radius: 5px"
            :header-cell-style="{ background: '#E7EAED' }"
            height="650"
            width="90%"
            :row-style="{ height: '40px' }"
            :cell-style="{ padding: '0px' }"
            :highlight-current-row="true"
            :stripe="true"
            :border="true"
            type="selection"
            empty-text="暂无数据"
          >
            <el-table-column
              label="所属模块"
              prop="module"
              align="center"
              width="100"
              fixed
            ></el-table-column>
            <el-table-column
              label="迭代名称"
              prop="iteration_name"
              align="center"
              width="200"
              fixed
            >
            <template slot-scope="scope">
                  <el-link target="_blank" type="primary" v-bind:href="scope.row.iteration_url">{{ scope.row.iteration_name }}</el-link>
                </template>
            </el-table-column>
            <el-table-column
              prop="start_time"
              label="测试开始时间"
              align="center"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="end_time"
              label="测试结束时间"
              align="center"
              width="120"
            ></el-table-column>
                        <el-table-column
              prop="plant_time"
              label="剩余测试时间"
              align="center"
              width="100"
              :formatter="plant_time_format"
            >
            </el-table-column>
            <el-table-column
              prop="owner"
              label="测试负责人"
              align="center"
              width="100"
            ></el-table-column>

            <el-table-column
              prop="bug_num"
              label="迭代bug总数"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <a
                  @click="openDetail(scope.row, 'bug_num')"
                  style="color: #409EFF; cursor: pointer"
                  >{{ scope.row.bug_num }}</a
                >
              </template>
            </el-table-column>

            <el-table-column
              prop="bug_no_num"
              label="未解决bug数"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <a
                  @click="openDetail(scope.row, 'bug_no_num')"
                  style="color: #409EFF; cursor: pointer"
                  >{{ scope.row.bug_no_num }}</a
                >
              </template>
            </el-table-column>

            <el-table-column
              prop="bug_all_level_num"
              label="严重以上bug数及占比"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <a
                  @click="openDetail(scope.row, 'bug_all_level_num')"
                  style="color: #409EFF; cursor: pointer"
                  v-html="levelbug(scope.row)"
                ></a>
              </template>
            </el-table-column>

            <el-table-column
              prop="bug_rerun_count"
              label="重新打开bug数及占比"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <a
                  @click="openDetail(scope.row, 'bug_rerun_count')"
                  style="color: #409EFF; cursor: pointer"
                  v-html="rerunbug(scope.row)"
                ></a>
              </template>
            </el-table-column>
            <el-table-column
              prop="test_progress"
              label="测试执行进度"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <a
                  @click="openDetail(scope.row, 'test_progress')"
                  style="color: #409EFF; cursor: pointer"
                  v-html="test_progress_format(scope.row)"
                ></a>
              </template>
            </el-table-column>
            <el-table-column
              prop="test_pass"
              label="测试通过率"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <a
                  @click="openDetail(scope.row, 'test_pass')"
                  style="color: #409EFF; cursor: pointer"
                  v-html="test_pass_format(scope.row)"
                ></a>
              </template>
            </el-table-column>

            <el-table-column
              prop="yanqi_num_proportion"
              label="延期修复bug数及占比"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <a
                  @click="openDetail(scope.row, 'yanqi_num_proportion')"
                  style="color: #409EFF; cursor: pointer"
                  v-html="timebug(scope.row)"
                ></a>
              </template>
            </el-table-column>

                        <el-table-column
              prop="before_blockNum"
              label="阻塞用例数及累计阻塞时长"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <a
                  @click="openDetail(scope.row, 'before_blockNum')"
                  style="color: #409EFF; cursor: pointer"
                  v-html="block(scope.row)"
                ></a>
              </template>
            </el-table-column>


            <el-table-column
              prop="risk"
              label="异常告警信息"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <a
                  @click="openDetail(scope.row, 'risk')"
                  style="color: #409EFF; cursor: pointer"
                  >{{ scope.row.risk }}</a
                >
              </template>
            </el-table-column>
            <el-table-column
              prop="convergence_risk"
              label="缺陷收敛风险"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <a
                  @click="openDetail(scope.row, 'convergence_risk')"
                  style="color: #409EFF; cursor: pointer"
                  >{{ scope.row.convergence_risk }}</a
                >
              </template>
            </el-table-column>
            <el-table-column
                style="background-color: #ffffff"
                fixed="right"
                label="操作"
                width="100"
                align="center"
            >
              <template slot-scope="scope">
                <el-button
                    @click="openDetail(scope.row, 'view')"
                    type="text"
                    size="small"
                    v-has="{class:'86'}"
                >查看详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
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
    </div>
<el-dialog
        :visible.sync="dialogVisible"
        width="1400px"
        show-footer
        @open="openform"
        @closed="formdialogclosed"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
    >
    <span slot="title" style="font-size: 20px;">{{ title }}</span>
    <el-row :gutter="24" style="width:1300px">
        <el-col :span="12" id="view"><div class="grid-content bg-purple" ><span style="font-size: 20px;float: left;">所属模块：{{ datail.module }}</span></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple" ><span style="font-size: 20px;float: left;">迭代名称：<el-link target="_blank" type="primary" v-bind:href="datail.iteration_url" style="font-size:20px;">{{ datail.iteration_name }}</el-link></span></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple" ><span style="font-size: 20px;float: left;">测试计划：<el-link target="_blank" type="primary" v-bind:href="datail.plant_url" style="font-size:20px;">{{ datail.plant_name }}</el-link></span></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple" ><span style="font-size: 20px;float: left;">测试开始时间：{{ datail.start_time }}</span></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple" ><span style="font-size: 20px;float: left;">测试结束时间：{{ datail.end_time }}</span></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple" ><span style="font-size: 20px;float: left;">剩余测试时间：{{ plant_time_format(datail) }}</span></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple" ><span style="font-size: 20px;float: left;">测试负责人：{{ datail.owner }}</span></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple" ><span style="font-size: 20px;float: left;">计划所属需求总数：<el-link target="_blank" type="primary" v-bind:href="datail.demand_num_url" style="font-size:20px;">{{ datail.demand_num }}个</el-link></span></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple" ><span style="font-size: 20px;float: left;">未转测需求：<el-link target="_blank" type="primary" v-bind:href="datail.demand_no_test_num_url" style="font-size:20px;">{{ datail.demand_no_test_num }}个</el-link></span></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple" ><span style="font-size: 20px;float: left;">总用例条数：<el-link target="_blank" type="primary" v-bind:href="datail.case_url" style="font-size:20px;">{{ datail.case_num }}个</el-link></span></div></el-col>
        <el-col :span="12" id="test_progress"><div class="grid-content bg-purple" ><span style="font-size: 20px;float: left;">当前测试进度：{{ datail.test_progress }}%</span></div></el-col>
        <el-col :span="12" id="test_pass"><div class="grid-content bg-purple" ><span style="font-size: 20px;float: left;">当前测试通过率：{{ datail.test_pass }}%</span></div></el-col>
        <el-col :span="12" id="bug_num"><div class="grid-content bg-purple" ><span style="font-size: 20px;float: left;">迭代bug总数：<el-link target="_blank" type="primary" v-bind:href="datail.bug_num_url" style="font-size:20px;">{{ datail.bug_num }}个</el-link></span></div></el-col>
        <el-table :data="bug_data" style="font-size: 13px; left: 1%; border-radius: 5px" 
        :header-cell-style="{ background: '#E7EAED' }" height="650" width="95%" :row-style="{ height: '40px' }" 
        :cell-style="{ padding: '0px' }" :highlight-current-row="true" :stripe="true" :border="true" type="selection"
        empty-text="暂无数据" >
            <el-table-column label="缺陷Id" prop="bug_id" align="center" width="100" fixed></el-table-column>
            <el-table-column label="缺陷名称" prop="bug_name" align="center" width="300" fixed >
              <template slot-scope="scope">
                  <el-link target="_blank" type="primary" v-bind:href="scope.row.url">{{ scope.row.bug_name }}</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="缺陷状态" align="center" width="100" ></el-table-column>
            <el-table-column prop="bug_level" label="严重级别" align="center" width="100" :formatter="bug_level_format"></el-table-column>
            <el-table-column prop="createMan" label="创建人" align="center" width="100" ></el-table-column>
            <el-table-column prop="create_Time" label="创建时间" align="center" width="200"></el-table-column>
            <el-table-column prop="name" label="处理人" align="center" width="100"></el-table-column>
            <el-table-column prop="ok_man" label="修复人" align="center" width="100"></el-table-column>
            <el-table-column prop="ok_Time" label="修复时间" align="center" width="200"></el-table-column>
          </el-table>

          <el-col :span="12" id="bug_no_num"><div class="grid-content bg-purple" id="bug_no_num"><span style="font-size: 20px;float: left;">未解决bug总数：<el-link type="primary" v-bind:href="datail.bug_no_num_url" style="font-size:20px;">{{ datail.bug_no_num }}个</el-link></span></div></el-col>
        <el-table :data="bug_no_data" style="font-size: 13px; left: 1%; border-radius: 5px" 
        :header-cell-style="{ background: '#E7EAED' }" height="650" width="95%" :row-style="{ height: '40px' }" 
        :cell-style="{ padding: '0px' }" :highlight-current-row="true" :stripe="true" :border="true" type="selection"
        empty-text="暂无数据" >
            <el-table-column label="缺陷Id" prop="bug_id" align="center" width="100" fixed></el-table-column>
            <el-table-column label="缺陷名称" prop="bug_name" align="center" width="300" fixed >
              <template slot-scope="scope">
                  <el-link target="_blank" type="primary" v-bind:href="scope.row.url">{{ scope.row.bug_name }}</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="缺陷状态" align="center" width="100" ></el-table-column>
            <el-table-column prop="bug_level" label="严重级别" align="center" width="100" :formatter="bug_level_format"></el-table-column>
            <el-table-column prop="createMan" label="创建人" align="center" width="100" ></el-table-column>
            <el-table-column prop="create_Time" label="创建时间" align="center" width="200"></el-table-column>
            <el-table-column prop="name" label="处理人" align="center" width="100"></el-table-column>
            <el-table-column prop="ok_man" label="修复人" align="center" width="100"></el-table-column>
            <el-table-column prop="ok_Time" label="修复时间" align="center" width="200"></el-table-column>
          </el-table>

          <el-col :span="12" id="bug_all_level_num"><div class="grid-content bg-purple"><span style="font-size: 20px;float: left;">严重以上bug总数及占比：<el-link target="_blank" type="primary" v-bind:href="datail.bug_level_num_url" style="font-size:20px;">{{ datail.bug_all_level_num }}个/{{ datail.bug_all_level_num_proportion }}%</el-link></span></div></el-col>
        <el-table :data="bug_level_data" style="font-size: 13px; left: 1%; border-radius: 5px" 
        :header-cell-style="{ background: '#E7EAED' }" height="650" width="95%" :row-style="{ height: '40px' }" 
        :cell-style="{ padding: '0px' }" :highlight-current-row="true" :stripe="true" :border="true" type="selection"
        empty-text="暂无数据" >
            <el-table-column label="缺陷Id" prop="bug_id" align="center" width="100" fixed></el-table-column>
            <el-table-column label="缺陷名称" prop="bug_name" align="center" width="300" fixed >
              <template slot-scope="scope">
                  <el-link target="_blank" type="primary" v-bind:href="scope.row.url">{{ scope.row.bug_name }}</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="缺陷状态" align="center" width="100" ></el-table-column>
            <el-table-column prop="bug_level" label="严重级别" align="center" width="100" :formatter="bug_level_format"></el-table-column>
            <el-table-column prop="createMan" label="创建人" align="center" width="100" ></el-table-column>
            <el-table-column prop="create_Time" label="创建时间" align="center" width="200"></el-table-column>
            <el-table-column prop="name" label="处理人" align="center" width="100"></el-table-column>
            <el-table-column prop="ok_man" label="修复人" align="center" width="100"></el-table-column>
            <el-table-column prop="ok_Time" label="修复时间" align="center" width="200"></el-table-column>
          </el-table>

          <el-col :span="12" id="bug_rerun_count"><div class="grid-content bg-purple"><span style="font-size: 20px;float: left;">重新打开bug数及占比：{{ datail.bug_rerun_count }}个/{{ datail.bug_rerun_count_proportion }}%</span></div></el-col>
        <el-table :data="bug_rerun_data" style="font-size: 13px; left: 1%; border-radius: 5px" 
        :header-cell-style="{ background: '#E7EAED' }" height="650" width="95%" :row-style="{ height: '40px' }" 
        :cell-style="{ padding: '0px' }" :highlight-current-row="true" :stripe="true" :border="true" type="selection"
        empty-text="暂无数据" >
            <el-table-column label="缺陷Id" prop="bug_id" align="center" width="100" fixed></el-table-column>
            <el-table-column label="缺陷名称" prop="bug_name" align="center" width="300" fixed >
              <template slot-scope="scope">
                  <el-link target="_blank" type="primary" v-bind:href="scope.row.url">{{ scope.row.bug_name }}</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="缺陷状态" align="center" width="100" ></el-table-column>
            <el-table-column prop="bug_level" label="严重级别" align="center" width="100" :formatter="bug_level_format"></el-table-column>
            <el-table-column prop="createMan" label="创建人" align="center" width="100" ></el-table-column>
            <el-table-column prop="create_Time" label="创建时间" align="center" width="160"></el-table-column>
            <el-table-column prop="name" label="处理人" align="center" width="90"></el-table-column>
            <el-table-column prop="ok_man" label="修复人" align="center" width="90"></el-table-column>
            <el-table-column prop="ok_Time" label="修复时间" align="center" width="160"></el-table-column>
            <el-table-column label="重新打开次数" align="center" width="100" :formatter="rerun_bug_num"></el-table-column>
          </el-table>

          <el-col :span="12" id="yanqi_num_proportion"><div class="grid-content bg-purple"><span style="font-size: 20px;float: left;">延期修复bug数及占比：{{ datail.yanqi_num }}个/{{ datail.yanqi_num_proportion}}%</span></div></el-col>
        <el-table :data="yanqi_data" style="font-size: 13px; left: 1%; border-radius: 5px" 
        :header-cell-style="{ background: '#E7EAED' }" height="650" width="95%" :row-style="{ height: '40px' }" 
        :cell-style="{ padding: '0px' }" :highlight-current-row="true" :stripe="true" :border="true" type="selection"
        empty-text="暂无数据" >
            <el-table-column label="缺陷Id" prop="bug_id" align="center" width="100" fixed></el-table-column>
            <el-table-column label="缺陷名称" prop="bug_name" align="center" width="250" fixed >
              <template slot-scope="scope">
                  <el-link target="_blank" type="primary" v-bind:href="scope.row.url">{{ scope.row.bug_name }}</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="缺陷状态" align="center" width="100" ></el-table-column>
            <el-table-column prop="bug_level" label="严重级别" align="center" width="100" :formatter="bug_level_format"></el-table-column>
            <el-table-column prop="createMan" label="创建人" align="center" width="100" ></el-table-column>
            <el-table-column prop="create_Time" label="创建时间" align="center" width="200"></el-table-column>
            <el-table-column prop="ok_man" label="修复人" align="center" width="150"></el-table-column>
            <el-table-column prop="ok_Time" label="修复时间" align="center" width="200"></el-table-column>
            <el-table-column prop="ok_Time" label="修复用时" align="center" width="100" :formatter="yanqi_ok_time"></el-table-column>
          </el-table>

          <el-col :span="12" id="before_blockNum"><div class="grid-content bg-purple"><span style="font-size: 20px;float: left;">阻塞用例数及阻塞时长：{{ datail.before_blockNum }}条/{{ datail.before_block_time}}小时</span></div></el-col>
        <el-table :data="before_block_data" style="font-size: 13px; left: 1%; border-radius: 5px" 
        :header-cell-style="{ background: '#E7EAED' }" height="650" width="95%" :row-style="{ height: '40px' }" 
        :cell-style="{ padding: '0px' }" :highlight-current-row="true" :stripe="true" :border="true" type="selection"
        empty-text="暂无数据" >
            <el-table-column label="用例id" prop="case_id" align="center" width="200" fixed></el-table-column>
            <el-table-column label="用例名称" prop="case_name" align="center" width="300" fixed >
              <template slot-scope="scope">
                  <el-link target="_blank" type="primary" v-bind:href="scope.row.case_url">{{ scope.row.case_name }}</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="case_status" label="用例状态" align="center" width="100" ></el-table-column>
            <el-table-column prop="case_excute" label="当前执行情况" align="center" width="100"></el-table-column>
            <el-table-column prop="case_level" label="用例级别" align="center" width="100" ></el-table-column>
            <el-table-column prop="case_owner" label="测试负责人" align="center" width="100" :formatter="case_owner"></el-table-column>
            <el-table-column prop="excute_num" label="执行次数" align="center" width="100" :formatter="excute_num"></el-table-column>
            <el-table-column prop="excute_man" label="执行人" align="center" width="100"></el-table-column>
            <el-table-column prop="zhusai_status" label="是否阻塞过" align="center" width="100" :formatter="zhusai_status"></el-table-column>
            <el-table-column prop="zhusai_Time" label="阻塞时长" align="center" width="100" :formatter="zhusai_Time"></el-table-column>
          </el-table>

          <el-col :span="12" id="risk"><div class="grid-content bg-purple"><span style="font-size: 20px;float: left;">异常告警：{{ datail.risk }}</span></div></el-col>
        <el-table :data="risk_data" style="font-size: 13px; left: 1%; border-radius: 5px"
        :header-cell-style="{ background: '#E7EAED' }" height="650" width="95%" :row-style="{ height: '40px' }" 
        :cell-style="{ padding: '0px' }" :highlight-current-row="true" :stripe="true" :border="true" type="selection"
        empty-text="暂无数据" >
            <el-table-column label="风险说明" prop="remark" align="center" width="1400" fixed></el-table-column>
          </el-table>

          <el-col :span="12" id="convergence_risk"><div class="grid-content bg-purple"><span style="font-size: 20px;float: left;">缺陷收敛风险：{{ datail.convergence_risk }}</span></div></el-col>
        <el-table :data="convergence_data" style="font-size: 13px; left: 1%; border-radius: 5px"
        :header-cell-style="{ background: '#E7EAED' }" height="650" width="95%" :row-style="{ height: '40px' }" 
        :cell-style="{ padding: '0px' }" :highlight-current-row="true" :stripe="true" :border="true" type="selection"
        empty-text="暂无数据" >
            <el-table-column label="日期" prop="days" align="center" width="300" fixed></el-table-column>
            <el-table-column label="实际缺陷数量" prop="bug_num" align="center" width="300" fixed ></el-table-column>
            <el-table-column label="期望缺陷数量" prop="risk_num" align="center" width="300" fixed :formatter="floatTwo_risk_num"></el-table-column>
            <el-table-column label="偏差值" prop="convergenceNum" align="center" width="300" fixed :formatter="floatTwo_convergenceNum"></el-table-column>
          </el-table>
    </el-row>
    </el-dialog>
    
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import axios from "axios";

export default {
  //引入面包屑
  components: { Breadcrumb },
  data() {
    return {
      bug_level:{
        'serious':'严重',
        'prompt':'提示',
        'normal':'一般',
        'fatal':'致命',
        'advice':'建议'
      },
      //分页请求数据
      list_page_body: {
        page: 1,
        limit: 20,
      },
      dialogVisible: false,
      ruleForm: {},
      title:"",
      type:'bug_num',
      datail:{},
      //表格
      tapd_test_risk_data: [],
      bug_data:[],
      bug_no_data:[],
      bug_level_data:[],
      bug_rerun_data:[],
      case_data:[],
      yanqi_data:[],
      risk_data:[],
      convergence_data:[],
      yanqi_bug_times:[],
      before_block_data:[],
      //总条数
      total: 0,
    };
  },
  methods: {
    //字段数据format
    rerun_bug_num(row){
      return String(this.bug_rerun_detail[row.bug_id]) + '次'
    },
    
    case_owner(row){
      if(row.case_owner == ""){
        return '空'
      }else{
        return row.case_owner
      }
    },
    excute_num(row){
      if(row.excute_num == ""){
        return '0'
      }else{
        return row.excute_num
      }
    },
    zhusai_status(row){
      if(row.zhusai_status == "1"){
        return '是'
      }else{
        return '否'
      }
    },
    zhusai_Time(row){
      let val = ''
      if(row.zhusai_Time){
        val = String(parseInt(row.zhusai_Time / 60 / 60 * 100) / 100) + '小时'
      }
      return val
    },
    floatTwo_risk_num(row){
      return String(parseInt(row.risk_num * 100) / 100)
    },
    floatTwo_convergenceNum(row){
      return String(parseInt(row.convergenceNum * 100) / 100)
    },
    yanqi_ok_time(row){
      let val = ''
      this.yanqi_bug_times.forEach((item)=>{
        if(item.bug_id == row.bug_id){
          console.log(item.bug_id,row.bug_id)
          val = String(parseInt(item.yanqi_times * 100) / 100) + '小时'
          }
      })
      return val
    },
    bug_level_format(row){
      return this.bug_level[row.bug_level]
    },
    levelbug(val) {
      return val.bug_all_level_num_proportion
        ? String(val.bug_all_level_num) +
            " / " +
            String(val.bug_all_level_num_proportion) +
            "%"
        : String(val.bug_all_level_num) + " / " + "--";
    },
    rerunbug(val) {
      return val.bug_rerun_count_proportion
        ? String(val.bug_rerun_count) +
            " / " +
            String(val.bug_rerun_count_proportion) +
            "%"
        : String(val.bug_rerun_count) + " / " + "--";
    },
    timebug(val) {
      return val.yanqi_num_proportion
        ? String(val.yanqi_num) + " / " + String(val.yanqi_num_proportion) + "%"
        : String(val.yanqi_num) + " / " + "--";
    },
    block(val) {
      return String(val.before_blockNum) + ' / ' + String(val.before_block_time) + '小时'},
    test_progress_format(val) {
      return String(val.test_progress) + "%";
    },
    test_pass_format(val) {
      return String(val.test_pass) + "%";
    },
    plant_time_format(val) {
      return val.plant_time >= 0
        ? "剩余" + String(val.plant_time) + "天"
        : "已过期" + String(Math.abs(val.plant_time)) + "天";
    },
    openDetail(row, type) {
      this.type = type
      this.title = '查看迭代：| '+String(row.iteration_name)+' | 测试详情'
      this.dialogVisible = true;
      this.datail = row
      this.risk_data = row.riskData
      this.convergence_data = row.convergence_risk_data
      axios
        .post("/api/test_tapd/plant_detail",{'plant_id':row.plant_id})
        .then((res) => {
          //api接口判断为code=10000成功
          if (res.data["code"] === 10000) {
            let data = res.data.data
              this.bug_data = data.bug_data
              this.bug_no_data = data.bug_no_data
              this.bug_level_data = data.bug_all_level_data
              this.bug_rerun_data = data.bug_rerun_data
              this.case_data = data.case_data
              this.yanqi_data = data.yanqi_bug_data
              this.yanqi_bug_times = data.yanqi_bug_times
              this.before_block_data = data.before_block_data
              this.bug_rerun_detail = data.bug_rerun_detail
          } else {
            //失败提示
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          console.log(error); //  错误处理 相当于error
          this.$message.error("服务器错误,请联系测试人员");
        });
    },
      openform(){
        console.log(this.type)
          console.log(document.getElementById(this.type))
          setTimeout(()=>{document.getElementById(this.type).scrollIntoView()},0)
          

      },
    //列表数据请求
    get_risk_List() {
      axios
        .post("/api/test_tapd/groupList", this.list_page_body)
        .then((res) => {
          //api接口判断为code=10000成功
          if (res.data["code"] === 10000) {
            this.tapd_test_risk_data = res.data.data;
            this.total = res.data.count;
          } else {
            //失败提示
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          console.log(error); //  错误处理 相当于error
          this.$message.error("服务器错误,请联系测试人员");
        });
    },
    update_now() {
      axios
        .post("/api/test_tapd/updateNow")
        .then((res) => {
          //api接口判断为code=10000成功
          if (res.data["code"] === 10000) {
            this.$message.success(res.data.msg);
          } else {
            //失败提示
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          console.log(error); //  错误处理 相当于error
          this.$message.error("服务器错误,请联系测试人员");
        });
    },
    //页量切换
    handleSizeChange(val) {
      this.list_page_body.limit = val;
      this.get_risk_List();
    },
    //页码切换
    handleCurrentChange(val) {
      this.list_page_body.page = val;
      this.get_risk_List();
    },
  },

  //页面初始化渲染
  created() {
    this.get_risk_List();
  },
};
</script>

<style scoped>
.abow_dialog {
  display: flex;
  justify-content: center;
  align-items: Center;
  overflow: hidden;
}
  .grid-content {
    border-radius: 4px;
    min-height: 50px;
    margin: 10px;
    line-height:50px;
    border-bottom: 1px slategrey;
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
  padding:30px 50px;
  overflow: hidden;
  overflow-y: auto;
}
</style>