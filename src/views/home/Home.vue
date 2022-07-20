<template>
  <div>
    <div style="background: #F3F4F6; height: 875px;overflow:auto">
      <div style="width: 100%;height: 50px;box-shadow: 0 2px 6px 0 rgb(15 23 42 / 12%), 0 0.5px 0 0 #e5e7eb;">
        <div style="margin-left: 1%;margin-top: 15px;float: left;"><a style="font-size: 13px;">首页</a></div>
        <el-select v-model="iteration_name" clearable filterable
                   style="margin-top:5px;float:right;width: 200px; margin-right: 1%;height: 30px;"
                   @change="select_diedai">
          <el-option v-for="item in iteration_value" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div>
        <!--start顶部bug-总数div-->
        <div style="border: none;box-shadow: var(--box-shadow-base,0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06));
          border-radius: 4px;float: left;width: 24%;margin-top: 20px;height: 120px;margin-left: 1%;background: #FFFFFF">
          <div style="margin-left: 16px;margin-top: 16px;float: left;"><a style="font-size: 13px;color: #6B7280;">迭代bug总数</a>
          </div>
          <div style="margin-left: 2px;margin-top: 18px;float: left;"><img src="./statc/help.png"
                                                                           style="width: 20px;height: 20px;"></div>
          <div style="margin-right: 16px;margin-top: 18px;float: right;"><img src="./statc/to.png"
                                                                              style="width: 20px;height: 20px;"></div>


          <div style="margin-left: 16px;font-size: 20px;color: black;width: 95%;float: left;">
            <b>{{ bug_un_num }}</b><a style="font-size: 10px"> 未解决</a>
          </div>

          <div style="margin-left: 16px;height: 4px;width: 90%;margin-top: 10px; float: left;">
            <el-progress :percentage="Number(bug_ratio)" :show-text="false"
            ></el-progress>
          </div>

          <div style="margin-left: 16px;float: left;margin-top: 5px;">
            <el-link :href="this.bug_href"><a style="font-size: 12px;color: #EF4444;">共{{ bug_total_num }}个bug 占比
              {{ bug_ratio }}%</a></el-link>
          </div>

          <div style="margin-left: 3px;float: left;margin-top: 8px;"><img src="./statc/jiantou.png"
                                                                          style="width: 20px;height: 20px;"></div>
        </div>
        <!--        leve-div-->
        <div style="border: none;box-shadow: var(--box-shadow-base,0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06));
          border-radius: 4px;float: left;width: 24%;margin-top: 20px;height: 120px;margin-left: 0.5%;background: #FFFFFF">

          <div style="margin-left: 16px;margin-top: 16px;float: left;"><a
              style="font-size: 13px;color: #6B7280;">level</a>
          </div>
          <div style="margin-left: 2px;margin-top: 18px;float: left;"><img src="./statc/help.png"
                                                                           style="width: 20px;height: 20px;"></div>
          <div style="margin-right: 16px;margin-top: 18px;float: right;"><img src="./statc/to.png"
                                                                              style="width: 20px;height: 20px;"></div>


          <div style="margin-left: 16px;font-size: 20px;color: black;width: 95%;float: left;">
            <b>{{ bug_high_num }}</b><a style="font-size: 10px"> 高</a>
          </div>
          <div style="margin-left: 16px;height: 4px;width: 90%;margin-top: 10px; float: left;">
            <el-progress :percentage="bug_level_ratio" :show-text="false"
            ></el-progress>
          </div>

          <div style="margin-left: 16px;float: left;margin-top: 5px;">
            <el-link :href="this.bug_level_href"><a style="font-size: 12px;color: #EF4444;">共{{ bug_total_num }}个bug 占比
              {{ bug_level_ratio }}%</a></el-link>
          </div>

          <div style="margin-left: 3px;float: left;margin-top: 8px;"><img src="./statc/jiantou.png"
                                                                          style="width: 20px;height: 20px;"></div>
        </div>

        <!--        reopen-div-->
        <div style="border: none;box-shadow: var(--box-shadow-base,0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06));
          border-radius: 4px;float: left;width: 24%;margin-top: 20px;height: 120px;margin-left: 1%;background: #FFFFFF">

          <div style="margin-left: 16px;margin-top: 16px;float: left;"><a
              style="font-size: 13px;color: #6B7280;">reopen</a>
          </div>
          <div style="margin-left: 2px;margin-top: 18px;float: left;"><img src="./statc/help.png"
                                                                           style="width: 20px;height: 20px;"></div>
          <div style="margin-right: 16px;margin-top: 18px;float: right;"><img src="./statc/to.png"
                                                                              style="width: 20px;height: 20px;"></div>


          <div style="margin-left: 16px;font-size: 20px;color: black;width: 95%;float: left;">
            <b>{{ bug_reopen_num }}</b><a style="font-size: 10px"> 重开</a>
          </div>
          <div style="margin-left: 16px;height: 4px;width: 90%;margin-top: 10px; float: left;">
            <el-progress :percentage="bug_reopen_ratio" :show-text="false"
            ></el-progress>
          </div>

          <div style="margin-left: 16px;float: left;margin-top: 5px;">
            <el-link :href="this.bug_href"><a style="font-size: 12px;color: #EF4444;">共{{ bug_total_num }}个bug 占比
              {{ bug_reopen_ratio }}%</a></el-link>
          </div>

          <div style="margin-left: 3px;float: left;margin-top: 8px;"><img src="./statc/jiantou.png"
                                                                          style="width: 20px;height: 20px;"></div>
        </div>

        <!--        延期bug-->
        <div style="border: none;box-shadow: var(--box-shadow-base,0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06));
          border-radius: 4px;float: left;width: 24%;margin-top: 20px;height: 120px;margin-left: 0.5%;background: #FFFFFF">
          <div style="margin-left: 16px;margin-top: 16px;float: left;"><a
              style="font-size: 13px;color: #6B7280;">延期bug</a>
          </div>
          <div style="margin-left: 2px;margin-top: 18px;float: left;"><img src="./statc/help.png"
                                                                           style="width: 20px;height: 20px;"></div>
          <div style="margin-right: 16px;margin-top: 18px;float: right;"><img src="./statc/to.png"
                                                                              style="width: 20px;height: 20px;"></div>


          <div style="margin-left: 16px;width: 95%;float: left;">
            <b style="font-size: 20px;color: black;">{{ bug_rerun_num }}</b><a
              style="font-size: 10px;color: black;"> 延期</a>
          </div>
          <div style="margin-left: 16px;height: 4px;width: 90%;margin-top: 10px; float: left;">
            <el-progress :percentage="bug_rerun_ratio" :show-text="false"
            ></el-progress>
          </div>

          <div style="margin-left: 16px;float: left;margin-top: 5px;">
            <el-link :href="this.bug_href"><a style="font-size: 12px;color: #EF4444;">共{{ bug_total_num }}个bug 占比
              {{ bug_rerun_ratio }}%</a></el-link>
          </div>

          <div style="margin-left: 3px;float: left;margin-top: 8px;"><img src="./statc/jiantou.png"
                                                                          style="width: 20px;height: 20px;"></div>
        </div>
        <!--end顶部div-->

        <!--        第一个图表-->
        <div style="width: 48.5%;height: 500px;background: #FFFFFF;border-radius: 4px; margin-top: 20px; margin-left: 1%;
            box-shadow: var(--box-shadow-base,0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)); float: left;
            ">

          <div style="margin-top: 3%;margin-left: 2%;float: left;width: 70%">
            <b>缺陷收敛风险 </b>
            <b style="font-size: 13px;background-color: #FDE2E2;color: #DC2626;border-radius: 5px;width: 30px;
            padding: 5px 10px 5px 10px; height: 20px;">{{ convergence_risk }}</b>
          </div>

          <div style="margin-right: 3%;margin-top: 3%;float: right;"><img src="./statc/to.png"
                                                                          style="width: 20px;height: 20px;"></div>

          <div><img src="./statc/no_data.png"
                    style="width: 170px;height: 170px;float: left;margin-left: 37%;margin-top: 20%"
                    v-if="risk_have_data === true"></div>

          <div v-if="risk_is_show === true" id="risk_view"
               style="margin-left:5%;margin-top:2%;width: 90%;height:400px;float: left;"></div>
        </div>

        <!--第二个图表-->
        <div style="width: 48.5%;height: 500px;background: #FFFFFF;border-radius: 4px; margin-top: 20px; margin-left: 1%;
            box-shadow: var(--box-shadow-base,0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)); float: left;
            ">
          <div style="margin-top: 3%;margin-left: 2%;float: left;width: 70%">
            <b>测试时间 </b>
          </div>

          <div><img src="./statc/no_data.png"
                    style="width: 170px;height: 170px;float: left;margin-left: 37%;margin-top: 20%"
                    v-if="time_have_data === true">
          </div>
          <div v-if="time_is_show === true" id="second_view"
               style="width: 90%;height:400px;margin-left: 5%;margin-top: 5%;"></div>
        </div>

        <!--第三个图表-->
        <div style="width: 98%;height: 500px;background: #FFFFFF;border-radius: 4px; margin-top: 20px; margin-left: 1%;
            box-shadow: var(--box-shadow-base,0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)); float: left;
            ">
          <div style="margin-top: 1%;margin-left: 1%;float: left;width: 97%;">
            <b>用例</b>
          </div>

          <div style="width: 48%;height: 400px;float: left;margin-left: 1%;">
            <div style="margin-top: 2%;margin-left: 3%;float: left;width: 49%;">
              <a style="background-color: #E5E7EB;color: black;font-size: 15px; padding: 5px 10px 5px 10px;border-radius: 5px;">
                测试执行进度</a>
            </div>

            <div><img src="./statc/no_data.png"
                      style="width: 170px;height: 170px;float: left;margin-left: 37%;margin-top: 20%"
                      v-if="speed_have_data === true">
            </div>

            <div v-if="speed_is_show === true" id="test_speed_view"
                 style="width: 90%;height:400px;margin-left: 3%;"></div>
          </div>

          <div
              style="width: 0.1%;height: 400px;background-color: #E5E7EB;float: left;margin-left: 1%;margin-top: 1%;"></div>

          <div style="width: 48%;height: 400px;float: left;margin-left: 1%;">
            <div style="margin-top: 2%;margin-left: 3%;float: left;width: 49%;">
              <a style="background-color: #E5E7EB;color: black;font-size: 15px; padding: 5px 10px 5px 10px;border-radius: 5px;">
                测试通过率</a>
            </div>

            <div><img src="./statc/no_data.png"
                      style="width: 170px;height: 170px;float: left;margin-left: 37%;margin-top: 20%"
                      v-if="progress_have_data === true"></div>

            <div v-if="progress_is_show === true" id="test_progress_view"
                 style="width: 90%;height:400px;margin-left: 0%;"></div>
          </div>


        </div>

        <!--第四个图表-->
        <div style="width: 98%;height: 470px;background: #FFFFFF;border-radius: 4px; margin-top: 20px; margin-left: 1%;
            box-shadow: var(--box-shadow-base,0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)); float: left;">
          <div style="margin-top: 2%;margin-left: 2%;float: left;width: 97%;">
            <b>用例阻塞时长</b>
          </div>

          <div><img src="./statc/no_data.png"
                    style="width: 170px;height: 170px;float: left;margin-left: 37%;margin-top: 20%"
                    v-if="block_have_data === true">
          </div>

          <div v-if="block_is_show === true" id="block_time_view"
               style="width: 98%;height:400px;margin-left: 2%;margin-top: 2.5%"></div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import * as echarts from "echarts";
import axios from "axios";

export default {
  name: "home",

  data() {
    return {
      all_data: [],
      y_diedai_name: [],
      x_date_start_time1: [],
      x_date_end_time1: [],
      x_date_start_time2: [],
      x_date_end_time2: [],
      dur_time_arr: [],
      date_min: 0,
      date_max: 0,
      iteration_value: [],
      iteration_name: "",

      convergence_risk: "",

      test_pass: 0,
      test_no_pass: 0,
      test_progress: 0,
      test_no_progress: 0,
      bug_total_num: 0,
      bug_un_num: 0,
      bug_ratio: 0,
      bug_href: "",
      bug_high_num: 0,
      bug_level_ratio: 0,
      bug_level_href: "",
      bug_reopen_num: 0,
      bug_reopen_ratio: 0,
      bug_rerun_num: 0,
      bug_rerun_ratio: 0,

      x_risk_arr: [],
      y_risk_arr: [],
      y_risk_expect_arr: [],
      y_risk_offset_arr: [],
      y_scale_arr: [0],
      y_block_time: [],

      risk_have_data: false,
      risk_is_show: true,
      time_have_data: false,
      time_is_show: true,
      speed_have_data: false,
      speed_is_show: true,
      progress_have_data: false,
      progress_is_show: true,
      block_have_data: false,
      block_is_show: true,
    }
  },
  mounted() {
    this.init_data("999999999");
  },
  methods: {
    select_diedai(val) {
      this.init_data(String(val))
    },
    init_value() {
      this.all_data = [];
      this.y_diedai_name = [];
      this.x_date_start_time1 = [];
      this.x_date_end_time1 = [];
      this.x_date_start_time2 = [];
      this.x_date_end_time2 = [];
      this.date_min = 0;
      // this.iteration_value = [];
      this.iteration_name = "";
      this.convergence_risk = "";

      this.test_pass = 0;
      this.test_no_pass = 0;
      this.test_progress = 0;
      this.test_no_progress = 0;
      this.bug_total_num = 0;
      this.bug_un_num = 0;
      this.bug_ratio = 0;
      this.bug_href = "";
      this.bug_high_num = 0;
      this.bug_level_ratio = 0;
      this.bug_level_href = "";
      this.bug_reopen_num = 0;
      this.bug_reopen_ratio = 0;
      this.bug_rerun_num = 0;
      this.bug_rerun_ratio = 0;

      this.x_risk_arr = [];
      this.y_risk_arr = [];
      this.y_risk_expect_arr = [];
      this.y_risk_offset_arr = [];
      this.y_scale_arr = [0];
      this.y_block_time = [];
      this.all_date = [];
    },
    init_data(iteration_id) {
      this.init_value();
      //加载接口数据
      axios
          .post("/api/test_tapd/groupList", {page: 1, limit: 1000})
          .then((res) => {
            if (res.data['code'] === 10000) {
              this.all_data = res.data.data;
              this.all_data.forEach((item) => {
                this.y_diedai_name.push(item.iteration_name);
                this.y_block_time.push(item.before_block_time);
                this.x_date_start_time2 = this.x_date_start_time1.map((item) => {
                  return new Date(item).valueOf()
                })
                this.date_min = this.x_date_start_time2.sort()[0];

                //bug数量处理 //level等级 //reopen //延期
                if (iteration_id === "999999999") {
                  //下拉框迭代数据
                  let iteration_dir = {};
                  iteration_dir.value = item.plant_id;
                  iteration_dir.label = item.iteration_name;
                  this.iteration_value.push(iteration_dir);

                  if (this.iteration_value.length === 1) {
                    this.iteration_name = item.iteration_name;
                    this.bug_num(item);
                    this.bug_level(item);
                    this.bug_reopen(item);
                    this.bug_rerun(item);
                    this.bug_risk(item);
                    this.draw_risk_line();
                    this.draw_case_speed();
                    this.draw_case_progress();
                  }
                } else {
                  if (iteration_id === item.plant_id) {
                    this.iteration_name = item.iteration_name;
                    this.bug_num(item)
                    this.bug_level(item)
                    this.bug_reopen(item)
                    this.bug_rerun(item);
                    this.bug_risk(item);
                    this.draw_risk_line();
                    this.draw_case_speed();
                    this.draw_case_progress();
                  }
                }
              })

              this.draw_block_time();
              this.draw_test_time_line();
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((error) => {
            console.log(error);
            this.$message.error("服务器错误，请联系测试人员");
          });
    },

    bug_num(item) {
      this.convergence_risk = item.convergence_risk;
      this.test_pass = item.test_pass;
      this.test_no_pass = 100 - this.test_pass;
      this.test_progress = item.test_progress;
      this.test_no_progress = 100 - this.test_progress;
      this.bug_total_num = item.bug_num;
      this.bug_un_num = item.bug_no_num;
      this.bug_href = item.bug_num_url;
      if (this.bug_un_num === 0) {
        this.bug_ratio = 0;
      } else {
        this.bug_ratio = (this.bug_un_num / this.bug_total_num * 100).toFixed(2);
      }
    },
    bug_level(item) {
      this.bug_high_num = item.bug_all_level_num;
      if (item.bug_all_level_num_proportion) {
        this.bug_level_ratio = item.bug_all_level_num_proportion;
      } else {
        this.bug_level_ratio = 0;
      }
      this.bug_level_href = item.bug_all_level_num_url;
    },

    bug_reopen(item) {
      this.bug_reopen_num = item.bug_rerun_count;
      if (item.bug_rerun_count_proportion) {
        this.bug_reopen_ratio = item.bug_rerun_count_proportion;
      } else {
        this.bug_reopen_ratio = 0;
      }
    },

    bug_rerun(item) {
      this.bug_rerun_num = item.yanqi_num;
      if (this.bug_rerun_num === null) {
        this.bug_rerun_ratio = 0;
      } else {
        this.bug_rerun_ratio = (this.bug_rerun_num / this.bug_total_num).toFixed(2) * 100;
        if (this.bug_rerun_ratio) {
          return this.bug_rerun_ratio;
        } else {
          this.bug_rerun_ratio = 0;
        }
      }
    },

    bug_risk(item) {
      if (item.convergence_risk_data) {
        item.convergence_risk_data.forEach((item2) => {
          this.x_risk_arr.push(item2.days);
          this.y_risk_arr.push(item2.bug_num);
          this.y_risk_expect_arr.push(item2.risk_num);
          this.y_risk_offset_arr.push(item2.convergenceNum);
        })
        let maxCount = 0;
        if (this.y_risk_arr.sort(function (a, b) {
          return b - a;
        })[0] > this.y_risk_expect_arr.sort(function (a, b) {
          return b - a;
        })[0]) {
          maxCount = this.y_risk_arr.sort(function (a, b) {
            return b - a;
          })[0]
        } else {
          maxCount = this.y_risk_expect_arr.sort(function (a, b) {
            return b - a;
          })[0]
        }

        maxCount = parseInt(maxCount)

        for (let i = 1; i < 6; i++) {
          if (maxCount % 5 === 0) {
            break
          } else {
            maxCount = maxCount + 1
          }
        }
        for (let i = 1; i < 6; i++) {
          this.y_scale_arr.push(maxCount / 5 * i)
        }
      } else {
        this.y_scale_arr = [];
      }

    },

    draw_test_time_line() {
      var chartDom = document.getElementById('second_view');
      var myChart = echarts.init(chartDom);
      var option;

      var data = [];
      var categories = this.y_diedai_name;
      var categories_data = this.all_data;
      var types = [
        {name: '测试时间', color: '#5A8EF9'},
        {name: '剩余时间', color: '#B1BACD'},
        {name: '逾期时间', color: '#ED6666'},
      ];
      categories_data.forEach(function (category, index) {
        var baseTime = new Date(category.start_time).valueOf();
        var endTime = new Date(category.end_time).valueOf();
        var duration = 0;
        for (var i = 0; i < types.length; i++) {
          var typeItem = types[i]; //哪一类数据
          if (typeItem.name === "测试时间") {
            if (new Date() <= baseTime) {
              continue;
            }
            if (new Date() <= endTime) {
              duration = new Date() - baseTime;
            } else {
              duration = endTime - baseTime;
            }
            //数据长度-对应时间
          } else if (typeItem.name === "剩余时间") {
            if (endTime <= new Date()) {
              continue;
            }
            duration = endTime - new Date(); //数据长度-对应时间
          } else {
            if (new Date() <= endTime) {
              continue;
            }
            duration = new Date() - endTime; //数据长度-对应时间
          }
          data.push({
            name: typeItem.name,
            value: [index, baseTime, (baseTime += duration), duration],
            itemStyle: {
              normal: {
                color: typeItem.color,
              },
            },
            diedai_name: category.iteration_name,
          });
          // console.log(data)
        }
      });

      function renderItem(params, api) {
        var categoryIndex = api.value(0);
        var start = api.coord([api.value(1), categoryIndex]);
        var end = api.coord([api.value(2), categoryIndex]);
        var height = api.size([0, 1])[1] * 0.3;
        var rectShape = echarts.graphic.clipRectByRect(
            {
              x: start[0],
              y: start[1] - height / 2,
              width: end[0] - start[0],
              height: height
            },
            {
              x: params.coordSys.x,
              y: params.coordSys.y,
              width: params.coordSys.width,
              height: params.coordSys.height
            }
        );
        return (
            rectShape && {
              type: 'rect',
              transition: ['shape'],
              shape: rectShape,
              style: api.style()
            }
        );
      }

      option = {
        tooltip: {
          formatter: function (params) {
            // console.log(params)
            return params.data.diedai_name +  params.marker + params.name + ': ' + Math.ceil(params.value[3] / (1000 * 60 * 60 * 24)) + ' 天';
          }
        },
        legend: {
          data: ['测试时间', '剩余时间', '逾期时间']
        },
        grid: {
          top: 48,
          left: 200,// 调整这个属性
          right: 50,
          bottom: 70,
        },
        dataZoom: [
          {
            id: 'dataZoomX',
            type: 'slider',
            xAxisIndex: [0],
            filterMode: 'filter',
            start: 0,
            end: 100,
            showDetail: false
          },
          {
            type: 'inside',
            filterMode: 'weakFilter'
          }
        ],
        xAxis: {
          // type: 'category',
          // data: this.all_date,
          min: this.date_min,
          scale: true,
          axisLabel: {
            show: true,
            formatter: function (value) {
              let date = new Date(Number(value));
              let dateLabel = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
              return dateLabel;
            }
          }
        },
        yAxis: {
          data: categories,
          nameTextStyle: {
            overflow: "truncate"
          },
          axisLabel: {
            show: true,
            formatter: function (value) {
              var texts = value;
              if (texts.length > 15) { // 具体多少字就看自己了
                texts = texts.substr(0, 15) + '...';
              }
              return texts;
            }
          }
        },

        series: [
          {
            type: 'custom',
            renderItem: renderItem,
            itemStyle: {
              opacity: 0.8
            },
            encode: {
              x: [1, 2],
              y: 0
            },
            label: {
              // 柱图头部显示值
              show: true,
              position: ['30%', '30%'],
              color: "#333",
              fontSize: "10px",
              formatter: (params) => {
                return Math.ceil(params.value[3] / (1000 * 60 * 60 * 24));
              },
            },
            data: data
          },
        ]
      };

      option && myChart.setOption(option)
    },

    //风险
    draw_risk_line() {

      var option;
      option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['偏差数量', '预判新增', '每日新增']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          minInterval: 1,
          data: this.x_risk_arr
        },
        yAxis: {
          // type: 'value'
          type: 'category',
          boundaryGap: false,
          data: this.y_scale_arr
        },
        series: [
          {
            name: '偏差数量',
            type: 'line',
            stack: 'Total',
            data: this.y_risk_offset_arr
          },
          {
            name: '预判新增',
            type: 'line',
            stack: 'Total',
            data: this.y_risk_expect_arr
          },
          {
            name: '每日新增',
            type: 'line',
            stack: 'Total',
            color: "red",
            data: this.y_risk_arr
          },
        ]
      };
      if (this.y_risk_arr.length === 0) {
        this.risk_have_data = true;
        this.risk_is_show = false;
      } else {
        this.risk_is_show = true;
        this.$nextTick(() => {
          let chartDom = document.getElementById('risk_view');
          let myChart = echarts.init(chartDom);
          option && myChart.setOption(option);
          this.risk_have_data = false;
        })
      }
    },

    //用例执行进度
    draw_case_speed() {
      var option;
      option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          left: 'center',
          bottom: 0
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '执行进度',
            type: 'pie',
            radius: '50%',
            data: [
              {value: this.test_pass, name: '已执行' + this.test_pass},
              {value: this.test_no_pass, name: '未执行' + this.test_no_pass.toFixed(2)},
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      if (this.test_pass) {
        this.speed_have_data = false;
        this.speed_is_show = true;
        this.$nextTick(() => {
          var chartDom = document.getElementById('test_speed_view');
          var myChart = echarts.init(chartDom);
          option && myChart.setOption(option);
        })
      } else {
        this.speed_is_show = false;
        this.speed_have_data = true;
      }

    },

    //用例
    draw_case_progress() {
      var option;
      option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          left: 'center',
          bottom: 0
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '通过率',
            type: 'pie',
            radius: '50%',
            data: [
              {value: this.test_progress, name: '通过' + this.test_progress},
              {value: this.test_no_progress, name: '未通过' + this.test_no_progress.toFixed(2)},
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      if (this.test_progress) {
        this.progress_have_data = false;
        this.progress_is_show = true;
        this.$nextTick(() => {
          var chartDom = document.getElementById('test_progress_view');
          var myChart = echarts.init(chartDom);
          option && myChart.setOption(option);
        })
      } else {
        this.progress_is_show = false;
        this.progress_have_data = true;
      }
    },

    draw_block_time() {
      var option;
      option = {
        // title: {
        //   text: '阻塞时长'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          orient: 'horizontal',
          left: 'center',
          bottom: 0
        },
        grid: {
          top: 48,
          left: 200,// 调整这个属性
          right: 50,
          bottom: 70,
        },
        xAxis: {
          type: 'value',
        },
        yAxis: {
          type: 'category',
          data: this.y_diedai_name,
          axisLabel: {
            show: true,
            formatter: function (value) {
              var texts = value;
              if (texts.length > 15) { // 具体多少字就看自己了
                texts = texts.substr(0, 15) + '...';
              }
              return texts;
            }
          }
        },
        series: [
          {
            name: '阻塞时长(H):',
            type: 'bar',
            data: this.y_block_time
          },
        ]
      };
      if (this.y_block_time) {
        this.block_have_data = false;
        this.$nextTick(() => {
          var chartDom = document.getElementById('block_time_view');
          var myChart = echarts.init(chartDom);
          option && myChart.setOption(option);
        })
      } else {
        this.block_is_show = false;
        this.block_have_data = true;
      }
    },

  },
}
</script>

<style>
.title_font {
  align-items: center;
  font-weight: 700;
  font-size: 14px;
  margin-left: 3px;
  color: #374151;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", 微软雅黑, Arial, sans-serif;
}

.el-input__inner {
  height: 35px !important;
}
</style>