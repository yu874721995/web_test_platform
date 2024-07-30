<template>
  <div>
    <div>
      <Breadcrumb/>
    </div>
    <div class="mock-detail">
      <el-form class="mock-detail__form" :model="mockInfo" inline label-width="100px">
        <el-form-item label="所属项目" prop="project_id">
          <el-select v-model="mockInfo.project_id" clearable filterable style="width: 150px; margin-left: 10px"
                       @change="search_select_project">
              <el-option v-for="item in project_list" :key="item.id" :label="item.project_name" :value="item.id">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="mock名称" prop="name">
          <el-input v-model="mockInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="创建人" prop="creator">
          <el-input v-model="mockInfo.creator"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
      <div style="text-align: right; margin-bottom: 10px;">
        <el-button type="primary" @click="add(1)">添加</el-button>
      </div>
      <el-table :data="mockData" 
      style="font-size: 13px;left: 1%;border-radius: 5px;"
          :header-cell-style="{ background: '#E7EAED' }"
          height="650"
          width="98%"
          :row-style="{ height: '40px' }"
          :cell-style="{ padding: '0px' }"
          :highlight-current-row="true"
          :stripe="true"
          :border="true"
          type="selection">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="mock名称" prop="name"></el-table-column>
        <el-table-column label="所属项目" prop="project_id" :formatter="get_pro_name"></el-table-column>
        <el-table-column label="所属服务" prop="server_name"></el-table-column>
        <el-table-column label="状态" >
          <template #default="{row}">
              <i
                class="el-icon-success"
                style="color: #10ee10"
                v-if="row.status == 1"
                ><a v-html="get_build_status(row)"></a
              ></i>
              <i
                class="el-icon-error"
                style="color: red"
                v-if="row.status == 0"
                ><a v-html="get_build_status(row)"></a
              ></i>
            </template>
        </el-table-column>
        <el-table-column label="操作人" prop="creator"></el-table-column>
        <el-table-column label="操作">
          <template #default="{row}">
            <el-button type="text" @click="add(row)">添加版本</el-button>
            <el-button type="text" @click="handleClick(row, 1)">{{ row.status ? '禁用' : '启用' }}</el-button>
            <el-button type="text" @click="handleClick(row, 2)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          v-on:size-change="handleSizeChange"
          v-on:current-change="handleCurrentChange"
          :current-page="mockInfo.page"
          :page-sizes="[20, 50, 100]"
          :page-size="mockInfo.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="float: right; margin-top: 10px; margin-right: 20px"
        ></el-pagination>
      </div>
    </div>
    <el-dialog 
      :visible.sync="showDig"
      title="添加"
      width="80%"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :before-close="closeDig"
      class="mock-dig"
    >
      <div v-if="addType === 1">
        <el-form :model="addInfo" :rules="rules" ref="mockDigForm" inline label-width="90px" class="mock-dig__form">
          <el-form-item label="mock名称" prop="name">
            <el-input v-model="addInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="所属项目" prop="project_id">
            <el-select v-model="addInfo.project_id" clearable filterable style="width: 150px;">
              <el-option
                  v-for="item in project_list"
                  :key="item.id"
                  :label="item.project_name"
                  :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属服务" prop="server_name">
            <el-input v-model="addInfo.server_name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-else-if="addType === 2">
        <el-form :model="detail" inline label-width="90px" disabled>
          <el-form-item label="mock名称:" prop="name">
            <div >{{ detail.name }}</div>
          </el-form-item>
          <el-form-item label="所属服务:" prop="server_name">
            <div>{{ detail.server_name }}</div>
          </el-form-item>
        </el-form>
        <div style="text-align: right;margin-bottom: 10px;">
          <el-button type="primary" @click="add(3)">添加</el-button>
        </div>
        <el-table :data="detailData" 
        style="font-size: 13px;left: 1%;border-radius: 5px;"
          :header-cell-style="{ background: '#E7EAED' }"
          width="98%"
          :row-style="{ height: '40px' }"
          :cell-style="{ padding: '0px' }"
          :highlight-current-row="true"
          :stripe="true"
          :border="true"
          type="selection">
          <el-table-column type="index"></el-table-column>
          <el-table-column label="版本名称" prop="version_name"></el-table-column>
          <el-table-column label="mock接口版本" prop="version"></el-table-column>
          <el-table-column label="请求方式" prop="method"></el-table-column>
          <el-table-column label="请求url" prop="url"></el-table-column>
          <!-- <el-table-column label="请求头" prop="headers_data"></el-table-column> -->
          <!-- <el-table-column label="请求内容" prop="headers_data"></el-table-column> -->
          <!-- <el-table-column label="返回参数" prop="response_data"></el-table-column> -->
          <el-table-column label="操作人" prop="creator"></el-table-column>
          <el-table-column label="修改时间" prop="update_time"></el-table-column>
          <el-table-column label="状态" >
            <template #default="{row}">
              <i
                class="el-icon-success"
                style="color: #10ee10"
                v-if="row.status == 1"
                ><a v-html="get_build_status(row)"></a
              ></i>
              <i
                class="el-icon-error"
                style="color: red"
                v-if="row.status == 0"
                ><a v-html="get_build_status(row)"></a
              ></i>
            </template>
          </el-table-column>
          <el-table-column label="操作人" prop="creator"></el-table-column>
          <el-table-column label="操作" >
            <template #default="{row}">
             <el-button type="text" @click="rowClick(row, 0)">修改</el-button>
             <el-button type="text" @click="rowClick(row, 1)">{{ row.status ? '禁用' : '启用' }}</el-button>
             <el-button type="text" @click="rowClick(row, 2)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else-if="addType === 3">
        <el-form :model="detailInfo" ref="detailForm" inline :rules="rule" label-width="120px" class="mock-dig__form">
          <el-form-item label="版本名称" prop="version_name">
            <el-input v-model="detailInfo.version_name"></el-input>
          </el-form-item>
          <el-form-item label="mock接口版本" prop="version">
            <el-input v-model="detailInfo.version"></el-input>
          </el-form-item>
          <el-form-item label="请求方式" prop="method">
            <el-input v-model="detailInfo.method"></el-input>
          </el-form-item>
          <el-form-item label="请求url" prop="url">
            <el-input v-model="detailInfo.url"></el-input>
          </el-form-item>
          <el-form-item label="请求头" prop="headers_data">
            <vue-json-editor v-model="detailInfo.headers_data" style="float: left;width: 100%;height: 300px;" :mode="'code'" lang="zh"  @has-error="json_editor_error($event,'headers_data')"></vue-json-editor>
            <!-- <el-input v-model="detailInfo.headers_data"></el-input> -->
          </el-form-item>
          <el-form-item label="请求内容" prop="request_data">
            <vue-json-editor v-model="detailInfo.request_data" style="float: left;width: 100%;height: 300px;" :mode="'code'" lang="zh" @has-error="json_editor_error($event,'request_data')"></vue-json-editor>
            <!-- <el-input v-model="detailInfo.request_data"></el-input> -->
          </el-form-item>
          <el-form-item label="返回参数" prop="response_data">
            <vue-json-editor v-model="detailInfo.response_data" style="float: left;width: 100%;height: 300px;" :mode="'code'" lang="zh" @has-error="json_editor_error($event,'response_data')"></vue-json-editor>
            <!-- <el-input v-model="detailInfo.response_data"></el-input> -->
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" v-if="addType !== 2" style="text-align: center;">
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button @click="closeDig('')">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb";
import axios from "axios";
import vueJsonEditor from "vue-json-editor";
export default {
  name: "",
  components: {Breadcrumb, vueJsonEditor},
  data() {
    return {
      showDig: false,
      addType: 1,
      mockInfo: {
        limit: 20,
        page: 1,
      },
      version_status:[
        {value:1,label:'启用'},{value:0,label:'禁用'}
    ],
      mockData: [],
      detailData: [],
      total: 0,
      loading: false,
      detail: {},
      addInfo: {},
      detailInfo: {},
      project_list:[],
      rules: {
        name: [{required: true, message: '请输入mock名称', trigger: ['blur', 'change']}],
        project_id: [{required: true, message: '请输入所属项目', trigger: ['blur', 'change']}],
        server_name: [{required: true, message: '请输入所属服务', trigger: ['blur', 'change']}],
      },
      rule: {
        response_data: [{required: true, message: '请输入返回参数', trigger: ['blur', 'change']}],
        url: [{required: true, message: '请输入请求url', trigger: ['blur', 'change']}],
        version: [{required: true, message: '请输入请求方式', trigger: ['blur', 'change']}],
      }
    };
  },
  mounted() {
    this.getList()
  },
  methods: {
    search_select_project() {},
    get_pro_name(raw){
      let val = null;
      this.project_list.forEach((item)=>{
        if(raw.project_id === item.id){
          val = item.project_name
        }
      })
      return val
    },
    search() {
      this.mockInfo.page = 1
      this.getList()
    },
    getList() {
      this.loading = true
      axios
        .post("/api/test_tools/MockApiViewList", this.mockInfo)
        .then((res) => {
          this.loading = false
          //api接口判断为code=10000成功
          if (res.data["code"] === 10000) {
            this.mockData = res.data["data"];
            this.total = res.data.count
          }
        })
        .catch(() => {
          this.loading = false
          this.$message.error("服务器错误,请联系测试人员");
        });
    },
    add(row) {
      if (row === 1) {
        this.addType = 1
      } else if (row === 3) {
        this.detailInfo = {
          version:'1.0.0',
          method:'POST'
        }
        this.addType = 3
        this.$nextTick(()=> {
          this.$refs.detailForm.clearValidate()
        })
      } else {
        this.addType = 2
        const data = {
          page: 1,
          limit: 1000,
          parent_id:row.id
        }
        this.detail = {...row}
        axios
        .post("/api/test_tools/MockApiVersionViewList", data)
        .then((res) => {
          this.loading = false
          //api接口判断为code=10000成功
          if (res.data["code"] === 10000) {
            this.detailData = res.data["data"]
          } else {
            this.$message.error(res.data.msg || "服务器错误,请联系测试人员");
          }
        })
        .catch(() => {
          this.loading = false
          this.$message.error("服务器错误,请联系测试人员");
        });
        
        
      }
      this.showDig = true
    },
    handleClick(row, type) {
      console.log(row, type)
      if (type === 2) {
        this.$confirm('确定删除？', '提示', {
          type: 'warning'
        }).then(()=> {
          axios
          .post("/api/test_tools/MockApiViewDelete", {id: row.id})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.$message.success('删除成功')
              this.search()
            } else {
              this.$message.error(res.data.msg || "服务器错误,请联系测试人员");
            }
          })
          .catch(() => {
            this.$message.error("服务器错误,请联系测试人员");
          });
        }).catch(()=> {

        })
      } else {
        axios
          .post("/api/test_tools/MockApiViewupdateStatus", {id: row.id, status: row.status == 1 ? 0 : 1})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.$message.success('操作成功')
              this.search()
            } else {
              this.$message.error(res.data.msg || "服务器错误,请联系测试人员");
            }
          })
          .catch(() => {
            this.$message.error("服务器错误,请联系测试人员");
          });
      }
    },
    confirm() {
      if (this.addType === 1) {
        this.$refs.mockDigForm.validate(valid => {
          if (valid) {
            const params = {
              name: this.addInfo.name.trim(),
              project_id: this.addInfo.project_id,
              server_name: this.addInfo.server_name.trim()
            }
            axios
            .post("/api/test_tools/MockApiViewCreate", params)
            .then((res) => {
              //api接口判断为code=10000成功
              if (res.data["code"] === 10000) {
                this.$message.success('操作成功')
                this.showDig = false
                this.search()
              } else {
                this.$message.error(res.data.msg || "服务器错误,请联系测试人员");
              }
            })
            .catch(() => {
              this.$message.error("服务器错误,请联系测试人员");
            });
          }
        })
      } else {
        const info = JSON.parse(JSON.stringify(this.detailInfo))
        for (let key in info) {
          if (info[key] && typeof info[key] === 'string') {
            info[key] = info[key].trim()
          } else if (typeof info[key] === 'object') {
            info[key] = JSON.stringify(info[key])
          }
        }
        this.$refs.detailForm.validate(valid => {
          if (valid) {
            const params = {
              ...info
            }
            let url = '/api/test_tools/MockApiVersionViewCreate'
            params.parent_id = this.detail.id
            if (this.detailInfo.id) {
              params.id = this.detailInfo.id
              url = '/api/test_tools/MockApiVersionViewUpdate'
            }
            axios
            .post(url, params)
            .then((res) => {
              //api接口判断为code=10000成功
              if (res.data["code"] === 10000) {
                this.$message.success('操作成功')
                this.addType = 2
                this.add({id: this.detail.id})
              } else {
                this.$message.error(res.data.msg || "服务器错误,请联系测试人员");
              }
            })
            .catch(() => {
              this.$message.error("服务器错误,请联系测试人员");
            });
          }
        })
      }
    },
    rowClick(row, type) {
      if (type === 2) {
        this.$confirm('确定删除？', '提示', {
          type: 'warning'
        }).then(()=> {
          axios
          .post("/api/test_tools/MockApiVersionViewDelete", {id: row.id})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.$message.success('删除成功')
              this.add({id: this.detail.id})
            } else {
              this.$message.error(res.data.msg || "服务器错误,请联系测试人员");
            }
          })
          .catch(() => {
            this.$message.error("服务器错误,请联系测试人员");
          });
        }).catch(()=> {

        })
      } else if (type === 1) {
        axios
          .post("/api/test_tools/MockApiVersionViewupdateStatus", {id: row.id, status: row.status == 1 ? 0 : 1})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.$message.success('操作成功')
              this.add({id: this.detail.id})
            } else {
              this.$message.error(res.data.msg || "服务器错误,请联系测试人员");
            }
          })
          .catch(() => {
            this.$message.error("服务器错误,请联系测试人员");
          });
      } else {
        this.detailInfo = {
          ...row,
          headers_data: row.headers_data ? JSON.parse(row.headers_data) : '',
          request_data: row.request_data ? JSON.parse(row.request_data) : '',
          response_data: row.response_data ? JSON.parse(row.response_data) : '',
        }
        this.addType = 3
      }
    },
    closeDig(done) {
      if (this.addType === 3) {
        this.$refs.detailForm.clearValidate()
        this.addType = 2
      } else {
        if (done) {
          done()
        }
        this.showDig = false
        this.addType = null
      }
    },
    handleSizeChange(val) {
      this.mockInfo.limit = val;
      this.getList();
    },
    //页码切换
    handleCurrentChange(val) {
      this.mockInfo.page = val;
      this.getList();
    },
    //项目下拉框数据
    get_projct_list() {
      axios
          .post("/api/test_management/proList", {page: 1, size: 100})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.project_list = res.data["items"];
            }
            console.log(this.project_list)
          })
          .catch(() => {
            this.is_data = false;
            this.$message.error("服务器错误,请联系测试人员");
          });
    },
    //json-editor空监听
    json_editor_error(val, type) {
      if (val.toString() === "Error: Parse error on line 1:\n" +
          "\n" +
          "^\n" +
          "Expecting 'STRING', 'NUMBER', 'NULL', 'TRUE', 'FALSE', '{', '[', got 'EOF'") {
        if (type === 'headers_data') {
          this.detailInfo.headers_data = {};
        }
        if (type === 'request_data') {
          this.detailInfo.request_data = {};
        }
        if (type === 'response_data') {
          this.detailInfo.response_data = {};
        }
      }
    },
    get_build_status(raw) {
      let val = null;
      this.version_status.forEach((item) => {
        if (raw.status === item.value) {
          val = item.label;
        }
      });
      return val;
    }
  },
  created(){
    this.get_projct_list()
  },
};
</script>

<style scoped>
.mock-detail {
  height: calc(100vh - 60px);
  margin: 20px 10px 0;
}
.mock-detail .mock-detail__form {
  text-align: left;
  
}
.mock-dig {
  text-align: left;
}
.mock-dig /deep/.el-dialog {
  height: auto !important;
}
.mock-dig /deep/.el-dialog__header {
  border-bottom: 1px solid #EBEEF5 !important;
}
.mock-dig /deep/.el-dialog__body {
  position: initial;
  padding: 20px 15px !important;
}
.mock-dig__form .el-form-item{
  width: 100%;
}
.mock-dig__form /deep/ .el-form-item__content {
  width: calc(100% - 125px);
}
.jsoneditor-vue {
  height: 100%;
}
div.jsoneditor-menu {
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
}
.ace_content {
  background: #F9FAFB;
}

div.jsoneditor {
  border: 0px;
}

.ace-jsoneditor .ace_scroller {
  border-bottom-right-radius: 10px;
}

.ace-jsoneditor .ace_gutter {
  border-bottom-left-radius: 10px;
}
</style>
