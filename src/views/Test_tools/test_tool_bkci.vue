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
            filterable
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

        <div style="float: left; margin-left: 10px">
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
              v-has="{ class: '88' }"
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
          :highlight-current-row="true"
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
                v-bind:href="
                  'http://devops.ops.nextop.cc/console/pipeline/' +
                  scope.row.project +
                  '/' +
                  scope.row.Assembly_id +
                  '/history'
                "
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
          ></el-table-column>

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
                v-has="{ class: '94' }"
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
                v-has="{ class: '92' }"
                >构建</el-button
              ><el-button type="text" size="small"
                ><el-link
                  type="primary"
                  target="_blank"
                  v-bind:href="scope.row.logs_addr"
                  style="font-size: 12px"
                  v-if="scope.row.logs_addr && scope.row.Assembly_type == 2"
                  v-has="{ class: '96' }"
                  >查看日志</el-link
                ></el-button
              >
              <el-button
                @click="offline(scope.row)"
                type="text"
                size="small"
                v-if="
                  (scope.row.build_status == 1 ||
                    scope.row.build_status == 2 ||
                    scope.row.build_status == 4) &&
                  scope.row.project != 'production'
                "
                v-has="{ class: '93' }"
                >下线</el-button
              >
              <el-button
                @click="dev_seach_pre([scope.row])"
                type="text"
                size="small"
                v-if="
                  scope.row.project == 'devtest' &&
                  (scope.row.build_status == 1 ||
                    scope.row.build_status == 2 ||
                    scope.row.build_status == 4)
                "
                v-has="{ class: '95' }"
                >上预发</el-button
              >
              <!-- <el-button
                  @click="updateAssembly([scope.row])"
                  type="text"
                  size="small"
                  v-has="{class:'95'}"
                  >更新</el-button
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
          :data="build_data"
          style="font-size: 13px; left: 1%; border-radius: 5px"
          :header-cell-style="{ background: '#E7EAED' }"
          :row-style="{ height: '40px' }"
          :cell-style="{ padding: '0px' }"
          :highlight-current-row="true"
          height="90%"
          row-key="id"
          ref="build_data_List"
          :stripe="true"
          :border="true"
          type="selection"
          empty-text="暂无数据"
        >
          <el-table-column
            label="流水线名称"
            prop="Assembly_name"
            align="center"
            width="200"
          ></el-table-column>
          <el-table-column
            label="联调标签"
            prop="Assembly_serverName"
            align="center"
            width="200"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.Assembly_serverName"
                show-word-limit
                :disabled="scope.row.project === 'devtest' ? false : true"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="Assembly_serviceName"
            label="服务名称"
            align="center"
            width="200"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.Assembly_serviceName"
                show-word-limit
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="branch"
            label="发布分支"
            align="center"
            width="250"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.branch" show-word-limit />
            </template>
          </el-table-column>
          <el-table-column
            prop="git"
            label="仓库地址"
            align="center"
            width="300"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.git" show-word-limit />
            </template>
          </el-table-column>

          <el-table-column
            prop="build_examine"
            label="是否审核"
            align="center"
            width="175"
          >
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.build_examine"
                placeholder="请选择是否需要审核"
                style="width: 150px; margin-left: 10px"
                :disabled="scope.row.project === 'devtest' ? false : true"
                @change="build_examine_change($event, 'build_examine')"
              >
                <el-option
                  v-for="item in build_examine"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column
            prop="mergeMaster"
            label="是否发布后合并至master"
            align="center"
            width="175"
            v-if="build_Assembly_env == 'production'"
          >
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.mergeMaster"
                placeholder="请选择是否需要合并"
                filterable
                style="width: 150px; margin-left: 10px"
              >
                <el-option
                  v-for="item in mergeMaster_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column
            prop="examine_man"
            label="审核人"
            align="center"
            width="200"
            v-if="build_Assembly_env != 'production'"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.examine_man"
                @change="build_examine_change($event, 'examine_man')"
                show-word-limit
              />
            </template>
          </el-table-column>

          <el-table-column
            prop="is_checkBuild"
            label="是否等待前一个流水线构建"
            align="center"
            width="175"
          >
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.is_checkBuild"
                placeholder="请选择是否等待"
                style="width: 150px; margin-left: 10px"
                @change="build_examine_change($event, 'is_checkBuild')"
              >
                <el-option
                  v-for="item in is_checkBuild"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column
            prop="is_checkAudit"
            label="是否开启自动审核"
            align="center"
            width="175"
          >
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.is_checkAudit"
                placeholder="请选择是否开启"
                style="width: 150px; margin-left: 10px"
                :disabled="scope.row.project === 'devtest' ? false : true"
                @change="build_examine_change($event, 'is_checkAudit')"
              >
                <el-option
                  v-for="item in is_checkAudit"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
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
          :highlight-current-row="true"
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
      list_page_body: {
        page: 1,
        limit: 20,
        project: "devtest",
      },
      build_Assembly_env: "devtest",
      wsUrl : 'wss://test-platform-api.nextop.com/websocket/bk_ci',
      // wsUrl: "ws://10.192.8.43:8001/websocket/bk_ci",
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
      updateAssemblyList: [],
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
          value: "devtest",
          label: "联调环境",
        },
        {
          value: "pre",
          label: "预发环境",
        },
        {
          value: "production",
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
    };
  },
  mounted() {
    this.initWebSocket();
  },
  beforeDestroy() {
    this.wsClose();
  },
  methods: {
    initWebSocket() {
      this.websocket = new WebSocket(
        `${this.wsUrl}?token=${localStorage.getItem("token")}`
      );
      this.websocket.onmessage = this.wsOnmessage;
      this.websocket.onopen = this.wsOnopen;
      this.websocket.onerror = this.wsOnerror;
      this.websocket.onclose = this.wsClose;
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
    wsOnopen() {
      this.wsSend(JSON.stringify(this.list_page_body));
      console.log("连接成功");
    },
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
          const targetRow = this.build_data.splice(evt.oldIndex, 1)[0];
          this.build_data.splice(evt.newIndex, 0, targetRow);
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
        if (Assembly_list[i].project != "devtest") {
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
    Batch_build(Assembly_list) {
      if (Assembly_list.length == 0 || !Assembly_list) {
        this.$message.error("至少选择一个流水线");
        return;
      }
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
      Assembly_list.forEach((item) => {
        item.is_checkBuild = 0;
        item.is_checkAudit = false;
        item.auto_deploy = false;
        item.mergeMaster = true;
        new_Assembly_list.push(item);
      });
      this.build_data = JSON.parse(JSON.stringify(new_Assembly_list));
      this.builddialog = true;
      this.$nextTick(() => {
        // 延时加载
        this.rowDrop();
      });
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
          cancelButtonText: "驳回",
          confirmButtonText: "通过",
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
        "是否确认下线该流水线,确认后如需取消请跳转至蓝盾操作",
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
      if (this.build_data) {
        axios
          .post("/api/test_tools/structure", {
            Assembly_list: this.build_data,
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