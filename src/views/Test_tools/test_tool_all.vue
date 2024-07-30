<template>
  <div>
    <div>
      <div>
        <Breadcrumb />
      </div>
    </div>

    <!--表格start-->
    <div>
      <div
        style="margin-top: 10px; float: left; width: 98%; text-align: center"
      >
        <template>
          <el-table
            :data="tool_data"
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
          >
            <el-table-column
              prop="tool_name"
              label="工具名称"
              align="center"
              width="1000"
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
                  @click="use_tool(scope.row.tool_type)"
                  type="primary"
                  size="small"
                  >使用</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <!--表格end-->

      <!--分页start-->
      <!-- <div>
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
      </div> -->
      <!--分页end-->
    </div>

    <el-dialog
      :visible.sync="ContainerListNumberDialog"
      show-footer
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      style="height: 400px; margin: auto; width: 50%"
    >
      <span slot="title" style="font-size: 20px; float: left">生成集装箱单号</span>
      <el-form
        :model="ContainerListNumberForm"
        label-width="auto"
        :inline-message="true"
        :status-icon="true"
        style="float: left; width: 100%"
      >
        <el-form-item label="货主信息(前四位字符):" prop="ContainerMaster">
          <el-input

            :rows="4"
            placeholder="请输入内容"
            v-model="ContainerListNumberForm.ContainerMaster"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="生成集装箱号:">
          <el-input
          disabled="false"
            :rows="4"
            v-model="ContainerListNumber"
          >
          </el-input>
        </el-form-item>

        <el-form-item>
          <div style="float: left">
            <el-button type="primary" @click="ContainerListNumberSubmit">确定</el-button>
            <el-button
              @click="
                ContainerListNumberDialog = false;
                ContainerListNumberForm.ContainerMaster = 'BHLU';
              "
              >取消</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      :visible.sync="XmindToTestCaseDialog"
      show-footer
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      style="height: 400px; margin: auto; width: 50%"
    >
      <span slot="title" style="font-size: 20px; float: left">上传xmind</span>
      <el-form
        :model="XmindToTestCaseForm"
        label-width="auto"
        :inline-message="true"
        :status-icon="true"
        style="float: left; width: 100%"
      > <el-form-item prod="file">
        <el-upload
                    ref="upload"
                    class="upload-demo"
                    :auto-upload="false"
                    :http-request="UploadCaseFile"
                    :multiple="false"
                    :limit="1"
                    :file-list="XmindToTestCaseForm.file">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传xmind文件</div>
                  </el-upload>
      </el-form-item>
      <el-form-item>
          <div style="float: left">
            <el-button type="primary" @click="uploadXmind">确定</el-button>
            <el-button
              @click="
                XmindToTestCaseDialog = false;
                XmindToTestCaseForm = {};
              "
              >取消</el-button
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

export default {
  //引入面包屑
  components: { Breadcrumb },
  data() {
    return {
      ContainerListNumber:null,
      ContainerListNumberDialog:false,
      XmindToTestCase:null,
      XmindToTestCaseDialog:false,
      ContainerListNumberForm:{ContainerMaster:'BLHU'},
      XmindToTestCaseForm:{},
      tool_data:[
        {tool_name:'集装箱单号生成',tool_type:"ContainerListNumber"},
        {tool_name:'Xmind转云效用例',tool_type:"XmindToTestCase"}
      ]
    };
  },
  methods: {
    use_tool(tool_type){
      if(tool_type == 'ContainerListNumber'){
        this.ContainerListNumberDialog = true;
      }
      if(tool_type == 'XmindToTestCase'){
        this.XmindToTestCaseDialog = true;
      }
    },
    
    ContainerListNumberSubmit(){
      axios.post("/api/test_tools/ContainerListNumber",this.ContainerListNumberForm)
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.$nextTick(() => {
                this.ContainerListNumber = String(res.data.data);
              })
            }else{
              this.$message.error(res.data.msg);
            }
          })
          .catch(() => {
            this.is_data = false;
            this.$message.error("服务器错误,请联系测试人员");
          });
    },
    uploadXmind() {
      // 手动调用上传，这里会调用我们自己定义的
      // 手动调用上传，这里会调用我们自己定义的
      this.$refs.upload.submit()
      console.log(this.XmindToTestCaseForm)
      // 新建form表单
      const fd = new FormData()
      // 将data转换为form-data
      Object.keys(this.XmindToTestCaseForm).forEach(key => {
        if (this.XmindToTestCaseForm[key] instanceof Array) {
          // 如果是数组就循环加入表单，key保持相同即可，这就是表达单的数组
          this.XmindToTestCaseForm[key].forEach(item => {
            fd.append(key, item)
          })
        } else {
          // 如果不是数组就直接追加进去
          fd.append(key, this.XmindToTestCaseForm[key])
        }
  })
      axios
        .post("/api/test_tools/XmindToTestCase",fd)
        .then((res) => {
          if (res.data.code === 10000) {
            window.open(res.data.url)
            this.XmindToTestCaseDialog = false;
          } else {
            this.isLoading = false;
            this.$message.error(res.data.msg);
          }
        });


},
UploadCaseFile(param) {
   this.XmindToTestCaseForm.file = param.file
 },
  },

  //页面初始化渲染
  created() {

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