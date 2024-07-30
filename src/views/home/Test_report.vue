<template>
  <div>
    <div>
      <Breadcrumb/>
    </div>
    <!--搜索start-->
    <div style="float: left; width: 100%; line-height: 60px">
      <div style="width: 100%">
        <div style="float: left; margin-left: 1%">
          <a style="font-size: 13px">报告名称</a>
          <el-input placeholder="请输入报告名称" clearable v-model="pageSC.name" style="width: 150px; margin-left: 10px"
                    class="case_input"></el-input>
        </div>
        <div style="float: left; margin-left: 10px">
          <a style="font-size: 13px">执行人</a>
          <el-input placeholder="请输入执行人" clearable v-model="pageSC.creator_name" style="width: 150px; margin-left: 10px"
                    class="case_input"></el-input>
        </div>
        <div style="float: left; padding-left: 5px">
          <el-button plain icon="el-icon-search" @click="handleCurrentChange(1)">查询</el-button>
        </div>
      </div>
    </div>

    <!--表格start-->
    <div style="margin-top: 10px; float: left; width: 98%; text-align: center">
      <!--                    border-radius: 10px;-->
      <el-table
          class="report_tab"
          :data="report_data"
          style="font-size: 13px;left: 1%;border-radius: 5px;"
          :header-cell-style="{ background: '#E7EAED' }"
          height="650"
          width="98%"
          :row-style="{ height: '40px' }"
          :cell-style="{ padding: '0px' }"
          :highlight-current-row="true"
          :stripe="true"
          :border="true"
          type="selection"
      >
        <el-table-column prop="name" label="测试名称" align="center" width="300"></el-table-column>
        <el-table-column prop="case_num" label="总用例数" align="center" width="150"></el-table-column>
        <el-table-column prop="pass_num" label="成功用例数" align="center" width="150"></el-table-column>
        <el-table-column prop="lose_num" label="失败用例数" align="center" width="150"></el-table-column>
        <el-table-column prop="pass_rate" label="通过率" align="center" width="100"></el-table-column>
        <el-table-column prop="updated_time" label="执行开始时间" align="center" width="250"></el-table-column>
        <el-table-column prop="elapsed" label="执行耗时(秒)" align="center" width="150"></el-table-column>
        <el-table-column prop="run_user_nickname" label="执行人" align="center" width="150"></el-table-column>
        <!-- <el-table-column prop="report_name" label="测试报告地址" align="center" width="400">
          <template slot-scope="scope">
            <button @click="report_details(scope.row)"
                    style="background-color: transparent;border:0;font-size: 10px;color: #409EFF">
              {{ scope.row.report_name }}
            </button>
          </template>
        </el-table-column> -->

        <el-table-column label="测试报告地址" align="center" width="250" 
            ><template slot-scope="scope"
              ><el-link 
                v-if="scope.row.report_status === 1"
                type="primary"
                target="_blank"
                @click="reportView(scope.row.id)"
                >查看报告</el-link
              ></template
            ></el-table-column
          >

        <!-- <el-table-column style="background-color: #ffffff" fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button @click="re_execute(scope.row)" type="text" size="small">重新执行</el-button>
            <el-button @click="send_ding(scope.row)" type="text" size="small">发送钉钉</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <!--表格end-->
    <div style="float: right">
      <!--分页start-->
      <div>
        <el-pagination
            v-on:size-change="handleSizeChange"
            v-on:current-change="handleCurrentChange"
            :current-page="pageSC.page"
            :page-sizes="[20, 50, 100]"
            :page-size="20"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            style="float: right; margin-top: 10px; margin-right: 20px"
        ></el-pagination>
      </div>
      <!--分页end-->
    </div>

    <el-dialog :visible.sync="report_details_dis" width="80%" style="margin-top: 20px;height: 105%;"
               :close-on-press-escape="false"
               :close-on-click-modal="false">
      <span slot="title" style="font-size: 20px">{{ report_title }}</span>
      <!--表格start-->
      <div style="margin-top: 10px; float: left; width: 98%; text-align: center">
        <!--                    border-radius: 10px;-->
        <el-table
            class="report_tab"
            :data="report_group_detail_arr"
            style="font-size: 13px;left: 1%;border-radius: 5px;"
            :header-cell-style="{ background: '#E7EAED' }"
            height="80%"
            width="98%"
            :row-style="{ height: '40px' }"
            :cell-style="{ padding: '0px' }"
            :highlight-current-row="true"
            :stripe="true"
            :border="true"
        >
          <!--          <el-table-column prop="report_name" label="类型" align="center" width="250"></el-table-column>-->
          <el-table-column prop="group_name" label="组合用例名称" align="center" width="120"></el-table-column>
          <!--          <el-table-column prop="pass_num" label="单用例名称" align="center" width="150"></el-table-column>-->
          <el-table-column prop="run_env" label="执行环境" align="center" width="200"></el-table-column>
          <!--          <el-table-column prop="result" label="状态" align="center" width="150"></el-table-column>-->
          <el-table-column prop="run_elapsed" label="执行耗时" align="center" width="200"></el-table-column>
          <el-table-column prop="run_time" label="执行时间" align="center" width="150"></el-table-column>
          <el-table-column prop="run_user" label="执行人" align="center" width="150">
            <!--            <template slot-scope="scope">-->
            <!--              <button @click="report_details(scope.row)"-->
            <!--                      style="background-color: transparent;border:0;font-size: 10px;color: #409EFF">-->
            <!--                {{ scope.row.report_name }}-->
            <!--              </button>-->
            <!--            </template>-->
          </el-table-column>
          <!--          <el-table-column style="background-color: #ffffff" fixed="right" label="操作" width="150" align="center">-->
          <!--            <template slot-scope="scope">-->
          <!--              <el-button @click="re_execute(scope.row)" type="text" size="small">重新执行</el-button>-->
          <!--              <el-button @click="send_ding(scope.row)" type="text" size="small">发送钉钉</el-button>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
        </el-table>
      </div>
      <!--表格end-->
      <div style="float: right">
        <!--分页start-->
        <div>
          <el-pagination
              v-on:size-change="handleSizeChange"
              v-on:current-change="handleCurrentChange"
              :current-page="pageSC.page"
              :page-sizes="[20, 50, 100]"
              :page-size="20"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              style="float: right; margin-top: 10px; margin-right: 20px"
          ></el-pagination>
        </div>
        <!--分页end-->
      </div>
    </el-dialog>

    <!--    <div class="report_details_back_alter">-->
    <!--      <div aria-modal="true" class="report_details_right_alter">-->

    <!--      </div>-->
    <!--    </div>-->

  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import axios from "axios";

export default {
  components: {Breadcrumb},
  name: "Test_report",
  data() {
    return {
      //分页请求数据
      pageSC: {
        page: 1,
        size: 20,
      },
      report_title: "",
      //表格
      report_data: [],
      report_group_detail_arr: [],
      report_details_dis: false,
      //总条数
      total: 0,
    };
  },
  methods: {
    get_report_list() {
      axios
          .post("/api/test_case/ReportList",this.pageSC)
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              res.data.data.forEach((item)=>{
              if (item.case_num===null){item.pass_rate="";}
              else
              {item.pass_rate =((item.pass_num/item.case_num)*100).toFixed(1)+"%";}
              this.report_data.push(item);
              });
              this.report_data = res.data.data;
              this.total = res.data.totalNum;
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
    reportView(reportId){
      axios
          .post("/api/test_case/reportView",{reportId:reportId})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.report_url = res.data.report_url
              window.open('http://test-platform.sit.yintaerp.com'+this.report_url)
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
    report_details(row) {
      axios
          .post("/api/api_case/report/detail", {
            "report_id": row.id
          })
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.report_title = res.data.data['name'] + " 耗时：" + res.data.data['elapsed'] + " 结果" + res.data.data['result'];
              if (res.data.data['case_group_id'].length !== 0) {
                this.report_group_detail_arr = res.data.data['case_group_result'];
                for (let i = 0; i < res.data.data['case_group_result'].length; i++) {
                  for (let j = 0; j < res.data.data['case_group_result'][i]['output']['case_res'].length; j++) {
                    var case_details = {};
                    case_details['group_name'] = res.data.data['case_group_result'][i]['name']
                    // this.report_group_detail_arr[j]['single_name'] = res.data.data['case_group_result'][i]['runEnv']
                    case_details['run_env'] = res.data.data['case_group_result'][i]['runEnv']
                    // this.report_group_detail_arr[j]['run_status'] = res.data.data['case_group_result'][i]['name']
                    case_details['run_time'] = res.data.data['case_group_result'][i]['run_time']
                    case_details['run_user'] = res.data.data['case_group_result'][i]['runUserNickname']
                    this.report_group_detail_arr.push(case_details)
                    console.log(this.report_group_detail_arr)
                  }
                }
              }
              this.report_details_dis = true;
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
    //页量切换
    handleSizeChange(val) {
      this.pageSC.size = val;
      this.get_report_list();
    },
    //页码切换
    handleCurrentChange(val) {
      this.pageSC.page = val;
      this.get_report_list();
    },

  },
  created() {
    this.get_report_list();
  },
}
</script>

<style>
.report_details_back_alter {
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: .5;
  background: #000;
}

.report_details_right_alter {
  position: fixed;
  background-color: #FFF;
  -webkit-box-direction: normal;
  width: 40%;
  height: 100%;
  right: 0;
}
</style>
