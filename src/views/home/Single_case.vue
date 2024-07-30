<template>
  <div>
    <div>
      <Breadcrumb/>
    </div>
    <div>

      <!--搜索start-->
      <div style="float: left; width: 100%; line-height: 60px">
        <div style="width: 100%">

          <div style="float: left; margin-left: 1%;">
            <a style="font-size: 13px">项目名称</a>
            <el-select v-model="project_name" clearable filterable style="width: 150px; margin-left: 10px"
                       @change="search_select_project">
              <el-option v-for="item in project_list" :key="item.id" :label="item.project_name" :value="item.id">
              </el-option>
            </el-select>
          </div>

          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">用例名称</a>
            <el-input placeholder="请输入用例名称" clearable v-model="list_page_body.name"
                      style="width: 150px; margin-left: 10px"
                      class="case_input"></el-input>
          </div>

          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">接口路径</a>
            <el-input placeholder="请输入接口地址" clearable v-model="list_page_body.url"
                      style="width: 150px; margin-left: 10px"
                      class="case_input"></el-input>
          </div>

          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">用例类型</a>
            <el-select v-model="list_page_body.tag" clearable filterable placeholder="请选择" style="width: 150px; margin-left: 10px">
              <el-option
                  v-for="item in tags"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div style="float: left; margin-left: 10px">
            <a style="font-size: 13px">所属模块</a>
            <el-cascader
                v-model="list_page_body.module"
                style="width: 150px;margin-left: 10px;"
                :options="module_options"
                :props="{ value: 'id', label: 'name',multiple: false, checkStrictly: false}"
                :show-all-levels="false"
                clearable
            ></el-cascader>
          </div>

          <div style="float: left; margin-left: 1%">
            <a style="font-size: 13px">执行结果</a>
            <el-select
              v-model="list_page_body.excute_status"
              placeholder="请选择状态"
              clearable filterable 
              style="width: 150px; margin-left: 10px" 
            >
              <el-option label="未执行" value="3"></el-option>
              <el-option label="执行通过" value="1"></el-option>
              <el-option label="执行失败" value="2"></el-option>
            </el-select>
          </div>

          <div style="float: left; margin-left: 1%">
            <a style="font-size: 13px">是否添加到组合用例</a>
            <el-select
              v-model="list_page_body.inGroupCase"
              placeholder="请选择"
              clearable filterable 
              style="width: 150px; margin-left: 10px" 
            >
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
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

        </div>
      </div>
      <!--搜索end-->
      <div>
        <el-button type="primary" style="float: right; margin-right: 20px; background-color: #3573fe;" size="small"
                   @click="addcase">添加用例
        </el-button>
        <el-button type="primary" style="float: right; margin-right: 10px; background-color: #3573fe;" size="small"
                   @click="env_options_dislog=true">批量执行
        </el-button>
        <el-button type="primary" style="float: right; margin-right: 10px; background-color: #3573fe;" size="small"
                   @click="OpenCaseFile()">添加文件参数
        </el-button>
        <el-button type="primary" style="float: right; margin-right: 10px; background-color: #3573fe;" size="small"
                   @click="OpenCaseFixtureMethod()">自定义脚本
        </el-button>
      </div>
      <!--列表start-->
      <div style="margin-top: 10px; float: left; width: 98%; text-align: center">
        <template>
          <!--border-radius: 10px;-->
          <el-table :data="case_data" :v-loading="isLoading" style="font-size: 13px;left: 1%;border-radius: 5px;"
                    :header-cell-style="{ background: '#E7EAED' }"
                    height="650" width="98%" :row-style="{ height: '40px' }" :cell-style="{ padding: '0px' }"
                    :highlight-current-row="true" :stripe="true" :border="true"
                    type="selection" @select="handleSelect" @selection-change="handleSelectionChange">

            <el-table-column type="selection" align="center" width="50"></el-table-column>

            <el-table-column prop="id" label="用例id" align="center" width="60"></el-table-column>

            <el-table-column :formatter="get_module_name" prop="module" label="所属模块" align="center"
                             width="160"></el-table-column>

            <el-table-column prop="req_method" label="请求方法" align="center" width="80"></el-table-column>

            <el-table-column prop="name" label="用例名称" align="center" width="300"></el-table-column>

            <el-table-column prop="delay_time" label="延时(s)" align="center" width="70"></el-table-column>

            <el-table-column prop="url" label="接口路径" align="center" width="330"></el-table-column>

            <el-table-column prop="tag" label="用例类型" align="center" width="100"
                             :formatter="get_tag_name"></el-table-column>

            <el-table-column prop="source" label="用例来源" align="center" width="80"></el-table-column>

            <el-table-column prop="result" :formatter="get_result_name" label="执行结果" align="center" width="80">
              <template slot-scope="scope">
              <i
                class="el-icon-success"
                style="color: #10ee10"
                v-if="scope.row.result == 1"
                ><a v-html="get_result_name(scope.row)"></a
              ></i>
              <i
                class="el-icon-error"
                style="color: red"
                v-if="scope.row.result == 2"
                ><a v-html="get_result_name(scope.row)"></a
              ></i>
              <i
                class="el-icon-message-solid"
                style="color: #362e2e"
                v-if="scope.row.result == 3"
                ><a v-html="get_result_name(scope.row)"></a
              ></i>
            </template>
            </el-table-column>
            <el-table-column
                prop="inGroupCase"
                :formatter="inGroupCase_name"
                label="是否添加到组合用例"
                align="center"
                width="70"
            >
            </el-table-column>
            <el-table-column prop="creator_nickname" label="创建人" align="center" width="110"></el-table-column>

            <el-table-column prop="created_time" label="创建时间" align="center" width="180"></el-table-column>

            <el-table-column label="操作" align="center" fixed="right" width="180">
              <template slot-scope="scope">
                <el-button @click="putcase(scope.row, 'put')"
                           type="text" size="small">编辑
                </el-button>
                <el-button @click="putcase(scope.row, 'copy')" type="text" size="small">复制</el-button>

                <el-button type="text" @click="deletecase(scope.row)"
                           v-if="scope.row.creator_nickname === user_name"
                           size="small" style="color: red">删除
                </el-button>

                <el-button type="text" @click="selectEnv(scope.row)" size="small">调试</el-button>
                <el-button type="text" @click="rerunSelectEnv(scope.row)" size="small">多次调试</el-button>

                <el-button
                    type="text"
                    @click="opengroupcaselist(scope.row)"
                    :disabled="scope.row.inGroupCase === 2"
                    size="small"
                    v-has="{class:'75'}">所在组合用例
                </el-button>

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
    
  <el-dialog title="所在组合用例" :visible.sync="groupcaselistdialog" width="60%" show-footer class="abow_dialog"
               :close-on-press-escape="false"
               :close-on-click-modal="false">
      <div>
        <!--表格start-->
        <div style="margin-top: 10px; float: left; width: 100%; text-align: center">
          <template>
            <el-table
                :data="groupcaselistdata"
                style="font-size: 13px"
                :header-cell-style="{ background: '#E7EAED' }"
                height="500"
                width="100%"
                :row-style="{ height: '40px' }"
                :cell-style="{ padding: '0px' }"
                :highlight-current-row="true"
                :stripe="true"
                :border="true"
                type="selection">
              <el-table-column
                  label="序号"
                  type="index"
                  align="center"
                  width="50"
              >
              </el-table-column>

              <el-table-column
                  prop="id"
                  label="组合用例id"
                  align="center"
                  width="100"
              >
              </el-table-column>

              <el-table-column
                  prop="name"
                  label="用例名称"
                  align="center"
                  width="300"
              >
              </el-table-column>
              <el-table-column
                  prop="description"
                  label="用例描述"
                  align="center"
                  width="300"
              >
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

            </el-table>
          </template>
        </div>
        <!--表格end-->
        <div style="float: right">
          <!--分页start-->
          <el-pagination
              v-on:size-change="handleSizeChangeExcu"
              v-on:current-change="handleCurrentChangeExcu"
              :current-page="group_case_list_page_body.page"
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

    <el-dialog title="查看引用的用例" :visible.sync="singlecaselistdialog" width="50%" show-footer class="abow_dialog"
               :close-on-press-escape="false"
               :close-on-click-modal="false">
      <div>
        <!--表格start-->
        <div style="margin-top: 10px; float: left; width: 100%; text-align: center">
          <template>
            <el-table
                :data="singlecaselistdata"
                style="font-size: 13px"
                :header-cell-style="{ background: '#E7EAED' }"
                height="600"
                width="80%"
                :row-style="{ height: '40px' }"
                :cell-style="{ padding: '0px' }"
                :highlight-current-row="true"
                :stripe="true"
                :border="true"
                type="selection">
              <el-table-column
                  label="序号"
                  type="index"
                  align="center"
                  width="50"
              >
              </el-table-column>

              <el-table-column
                  prop="id"
                  label="用例id"
                  align="center"
                  width="100"
              >
              </el-table-column>

              <el-table-column
                  prop="name"
                  label="用例名称"
                  align="center"
                  width="350"
              >
              </el-table-column>
              <el-table-column
                  prop="creator_nickname"
                  label="创建人"
                  align="center"
                  width="200"
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
              v-on:size-change="handleSizeChangeExcuSingle"
              v-on:current-change="handleCurrentChangeExcuSingle"
              :current-page="single_case_list_page_body.page"
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


    <el-dialog
        title="添加文件参数"
        :visible.sync="CaseFileDialog"
        width="1200px"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        style="margin-top: 20px;height: 100%"
        @close="CaseFileDialog=false"

    >
    <div style="margin-top: 10px; float: left; width: 98%; text-align: center">
        <template>
        <div style="margin-top: 20px; float: left; width: 98%; text-align: center">
        <div style="float: left; margin-left: 20px">
              <a style="font-size: 13px">文件引用名</a>
              <el-input placeholder="请输入文件引用名" v-model="CaseFileListPage.fileField" style="width: 150px; margin-left: 10px"
                        class="case_input"></el-input>
        </div>
        <div style="float: left; margin-left: 20px">
              <a style="font-size: 13px">创建人</a>
              <el-input placeholder="请输入创建人" v-model="CaseFileListPage.creator" style="width: 150px; margin-left: 10px"
                        class="case_input"></el-input>
        </div>
        <div style="float: left; padding-left: 20px">
              <el-button plain icon="el-icon-search" @click="OpenCaseFile(1)">查询</el-button>
        </div>
        </div>
        <div>
        <el-button type="primary" style="float: right; margin-right: 20px; background-color: #3573fe;" size="small"
                   @click="AddCaseFile">添加用例文件
        </el-button>
        
      </div>
          <!--border-radius: 10px;-->
          <el-table :data="CaseFileTableData" :v-loading="isLoading" style="font-size: 13px;left: 1%;border-radius: 5px;"
                    :header-cell-style="{ background: '#E7EAED' }"
                    height="550px" width="98%" :row-style="{ height: '40px' }" :cell-style="{ padding: '0px' }"
                    :highlight-current-row="true" :stripe="true" :border="true"
                    type="selection">

            <el-table-column prop="fileField" label="文件引用名" align="center"
                             width="180"></el-table-column>
            <el-table-column :formatter="FilepathToName" prop="filepath" label="文件名称" align="center" width="150"></el-table-column>

            <el-table-column prop="updatePath" label="修改数据行列" align="center" width="100"></el-table-column>

            <el-table-column prop="sheet" label="指定sheet" align="center" width="100"></el-table-column>

            <el-table-column :formatter="FileFuncToName" prop="updateFunc" label="修改方式" align="center" width="150"></el-table-column>

            <el-table-column prop="created_at" label="创建时间" align="center" width="200"></el-table-column>
            <el-table-column prop="creator" label="创建人" align="center" width="200"></el-table-column>

            <el-table-column label="操作" align="center" fixed="right" width="150">
              <template slot-scope="scope">
              <el-button type="text" @click="AddCaseFile(scope.row,'update')"
                           size="small" style="">重新上传
                </el-button>
                <el-button type="text" @click="DownLoadFile(scope.row)"
                           size="small" style="">下载
                </el-button>
                
                <el-button type="text" @click="DeleteCaseFile(scope.row)"
                           size="small" style="color: red">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <!--表格end-->
      <div style="float: right">
        <!--分页start-->
        <el-pagination
            v-on:size-change="handleSizeCaseFileChange"
            v-on:current-change="handleCurrentCaseFileChange"
            :current-page="CaseFileListPage.page"
            :page-sizes="[10,20, 50, 100]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="CaseFiletotal"
            style="float: right; margin-top: 10px; margin-right: 20px"
        ></el-pagination>
        <!--分页end-->
      </div>
  </el-dialog>



  <el-dialog
        :visible.sync="AddCaseFileDialog"
        width="50%"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        style="margin-top: 20px;height: 80%"
        @close="AddCaseFileDialog=false"

    >
      <span slot="title" style="font-size: 20px">添加文件参数</span>

      <el-form :model="AddCaseFileForm"  label-width="100px" class="demo-ruleForm">

        <el-form-item label="文件引用名称" prop="fileField" >
          <el-input v-model="AddCaseFileForm.fileField" placeholder="请输入文件引用名称" ></el-input>
        </el-form-item>
        <el-form-item label="文件" prop="filefeild">
                <el-upload
                    ref="upload"
                    class="upload-demo"
                    :auto-upload="false"
                    :http-request="UploadCaseFile"
                    :multiple="false"
                    :limit="1"
                    :file-list="AddCaseFileForm.file">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传xls、xlsm、csv、xlsx文件，且不超过10M</div>
                  </el-upload>
        </el-form-item>
        <el-form-item label="字段更改坐标" prop="updatePath" >
          <el-input v-model="AddCaseFileForm.updatePath" placeholder="需要每次执行更换的excel行列：1,3" ></el-input>
        </el-form-item>
        <el-form-item label="字段更改规则" prop="updateFunc">
          <el-select v-model="AddCaseFileForm.updateFunc" clearable filterable style="margin-left: 10px"
                       >
              <el-option v-for="item in CaseFileFuncs" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="指定sheet" prop="sheet" >
          <el-input v-model="AddCaseFileForm.sheet" placeholder="多个sheet时可指定，为空时取默认sheet" ></el-input>
        </el-form-item>

        <el-form-item>
              <el-button type="primary" @click="SubmitrUploadCaseFile()">确定</el-button>
              <el-button @click="AddCaseFileDialog = false">取消</el-button>
              <!-- <el-button type="primary" @click="selectEnv(ruleForm)">调试</el-button> -->
            </el-form-item>
      </el-form></el-dialog>

    <el-dialog
        :visible.sync="CaseFixtureMethodDialog"
        width="1000px"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        style="margin-top: 20px;height: 102%"
        @close="CaseFixtureMethodDialog=false"

    >
    <span slot="title" style="font-size: 20px">自定义脚本</span>
    <div style="margin-top: 10px; float: left; width: 100%; text-align: center">
        <template>

        <div style="float: left; margin-left: 10px">
              <a style="font-size: 13px">方法名</a>
              <el-input placeholder="请输入方法名" v-model="CaseFixtureMethodListPage.method_name" style="width: 140px; margin-left: 10px"
                        class="case_input"></el-input>
        </div>
        <div style="float: left; margin-left: 10px">
              <a style="font-size: 13px">脚本内容</a>
              <el-input placeholder="请输入脚本内容" v-model="CaseFixtureMethodListPage.script" style="width: 140px; margin-left: 10px"
                        class="case_input"></el-input>
        </div>
        <div style="float: left; margin-left: 10px">
              <a style="font-size: 13px">创建人</a>
              <el-input placeholder="请输入创建人" v-model="CaseFixtureMethodListPage.creator" style="width: 140px; margin-left: 10px"
                        class="case_input"></el-input>
        </div>

        <div style="float: left; padding-left: 5px">
              <el-button plain icon="el-icon-search" @click="OpenCaseFixtureMethod(1)">查询</el-button>
        </div>

        <div style="float: right; margin-right: 10px">
          <div style=" width: 100px; float: right; margin-top: 10px; height: 40px;  text-align: center; ">
            <el-row>
              <el-button type="primary" style="background-color: #3573fe" @click="AddCaseFixtureMethod">新增自定义脚本</el-button>
            </el-row>
          </div>
        </div>

          <el-table :data="CaseFixtureMethodTableData" :v-loading="isLoading" style="font-size: 13px;left: 1%;border-radius: 5px;"
                    :header-cell-style="{ background: '#E7EAED' }"
                    height="600" width="98%" :row-style="{ height: '40px' }" :cell-style="{ padding: '0px' }"
                    :highlight-current-row="true" :stripe="true" :border="true"
                    type="selection">
            <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
            <el-table-column prop="method_name" label="方法名" align="center" width="100"></el-table-column>
            <el-table-column prop="script" label="脚本" align="center" width="200"></el-table-column>
            <el-table-column prop="created_at" label="创建时间" align="center" width="150"></el-table-column>
            <el-table-column prop="creator" label="创建人" align="center" width="120"></el-table-column>
            <el-table-column prop="updated_by" label="更新人" align="center" width="120"></el-table-column>
            <el-table-column label="操作" align="center" fixed="right" width="200">
            <template slot-scope="scope">
            <el-button type="text" @click="opensinglecaselist(scope.row)" size="small">查看引用的用例</el-button>
            <el-button type="text" @click="UpdateCaseFixtureMethod(scope.row)" size="small">编辑</el-button>
            <el-button type="text" @click="delete_case_fixture_method(scope.row)" size="small" style="color: red">删除</el-button>
            </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <!--表格end-->
      <div style="float: right">
        <!--分页start-->
        <el-pagination
            v-on:size-change="handleSizeCaseFixtureMethodChange"
            v-on:current-change="handleCurrentCaseFixtureMethodChange"
            :current-page="CaseFixtureMethodListPage.page"
            :page-sizes="[10,20, 50, 100]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="CaseFixtureMethodtotal"
            style="float: right; margin-top: 10px; margin-right: 20px"
        ></el-pagination>
        <!--分页end-->
      </div>
  </el-dialog>


  <el-dialog
        :visible.sync="AddCaseFixtureMethodDialog"
        width="50%"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        style="margin-top: 20px;height: 70%"
        @close="AddCaseFixtureMethodDialog=false"

    >
      <span slot="title" style="font-size: 20px">{{ AddCaseFixtureMethodDialogTitle }}</span>

      <el-form  ref="AddCaseFixtureMethodForm" :model="AddCaseFixtureMethodForm"  label-width="100px" :rules="add_case_fixture_method_rules" class="demo-ruleForm">

        <el-form-item label="方法名" prop="method_name" >
          <el-input v-model="AddCaseFixtureMethodForm.method_name" placeholder="请输入方法名" ></el-input>
        </el-form-item>


      <el-form-item label="脚本内容" prop="script" >
        <el-input
            type="textarea"
            :autosize={minRows:8,maxRows:20}
            :placeholder="examples"
            v-model="AddCaseFixtureMethodForm.script"
          >
          </el-input>
       </el-form-item>

        <el-form-item>
              <el-button type="primary" @click="SubmitAddCaseFixtureMethod('AddCaseFixtureMethodForm')">确定</el-button>
              <el-button @click="AddCaseFixtureMethodDialog = false">取消</el-button>
            </el-form-item>
      </el-form>
      </el-dialog>
    


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

      <el-form :model="ruleForm" :rules="rules" :inline-message="true" :status-icon="true" ref="ruleForm">

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
            <el-option v-for="item in project_list" :key="item.id" :label="item.project_name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用例类型" prop="tag" style="width: 50%;float: left;">
          <el-select v-model="ruleForm.tag" multiple clearable filterable placeholder="请选择"
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

          <el-form-item label="断言" prop="assert_res" style="float: left;width: 100%;height: 300px;">
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

          <el-form-item label="前置SQL" prop="pre_sql" style="float: left;width: 100%;height: 300px;">
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

          <el-form-item label="后置SQL" prop="end_sql" style="float: left;width: 100%;height: 300px;">
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

          <el-form-item label="提取参数" prop="extract_param" style="float: left;width: 100%;height: 300px;">
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

    <!-- start 执行用例选择环境弹窗 -->
    <el-dialog title="选择执行环境" :visible.sync="env_options_dislog" width="30%" style="margin-top: 250px;height: 400px;"
               :close-on-press-escape="false"
               :close-on-click-modal="false">
      <el-form :model="envForm" :rules="env_rules" ref="envForm" label-width="auto">


        <el-form-item label="运行环境" prop="env" style="padding-left: 100px">
          <el-cascader v-model="envForm.env"
                       placeholder="请搜索运行环境"
                       :options="env_options"
                       filterable
                       :props="{value:'id',label:'env_name'}"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="运行账号" prop="cookie" style="padding-left: 100px">
          <el-select v-model="envForm.cookie" placeholder="请搜索运行账号" clearable filterable>
            <el-option v-for="item in account" :key="item.id" :label="item.account_name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 增加选择项，是否更新账号 ---wangmingming  2023-08-09 -->
        <el-form-item label="更新账号" prop="is_edit" style="padding-left: 100px">
          <el-radio-group v-model="envForm.is_edit">
            <el-radio v-model="envForm.is_edit" label="1">是</el-radio>
            <el-radio v-model="envForm.is_edit" label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <!-- 增加选择项，并发执行多次 ---yubei  2024-01-22 -->
        <el-form-item label="重试次数" prop="rerunCount" style="padding-left: 100px" v-if="rerunCount == true">
          <el-input
              type="text"
              :rows="5"
              placeholder="请输入重试次数"
              v-model="envForm.rerunCount"
          >
          </el-input>
        </el-form-item>

        <el-form-item label-width="30%">
          <el-button type="primary" @click="excutioncase"
                     style="margin-right: 10px;float: right;margin-top: 10px;">确 定
          </el-button>
          <el-button @click="env_options_dislog = false" style="margin-right: 10px;float: right;margin-top: 10px;">取 消
          </el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
    <!-- end 执行用例选择环境弹窗 -->

    <!-- 单用例执行弹窗 start -->
    <el-dialog :visible.sync="run_case_dislog" width="50%" title="执行结果" style="margin-top: 50px;"
               :close-on-press-escape="false"
               :close-on-click-modal="false"
               @close="get_case"
    >
      <!-- <span slot="title" style="font-size: 20px">执行结果</span> -->
      <el-form :model="caseForm" ref="caseForm" >

        <el-form-item label="用例名称" prop="name" style="width: 90%; margin-left: 10px;float: left;">
          <el-input :disabled="true" v-model="caseForm.name"></el-input>
        </el-form-item>

        <el-form-item label="请求url" prop="url" style="width: 90%; margin-left: 10px;float: left;">
          <el-input :disabled="true" v-model="caseForm.url"></el-input>
        </el-form-item>

        <el-form-item label="运行环境" prop="env" style="width: 45%; margin-left: 10px;float: left;">
          <el-input :disabled="true" v-model="caseForm.runEnv"></el-input>
        </el-form-item>

        <el-form-item label="执行人" prop="runUserNickname" style="width: 45%; float: left;">
          <el-input :disabled="true" v-model="caseForm.runUserNickname"></el-input>
        </el-form-item>

        <el-form-item label="执行时间" prop="run_time" style="width: 45%; margin-left: 10px;float: left;">
          <el-input :disabled="true" v-model="caseForm.run_time"></el-input>
        </el-form-item>

        <el-form-item disabled="true" label="运行耗时" prop="elapsed" style="width: 45%; float: left;">
          <el-input :disabled="true" v-model="caseForm.elapsed"></el-input>
        </el-form-item>

        <el-form-item label="请求参数" prop="params" style="width: 90%; margin-left: 10px;float: left;">
          <vue-json-editor v-model="caseForm.params" :mode="'code'" lang="zh">
          </vue-json-editor>
        </el-form-item>

        <el-form-item :disabled="true" label="返回结果" prop="response" style="width: 90%; margin-left: 10px;float: left;">
          <vue-json-editor v-model="caseForm.response" :mode="'code'" lang="zh">
          </vue-json-editor>
        </el-form-item>

      </el-form>
    </el-dialog>
    <!-- 单用例执行弹窗 end-->

    <!--删除二次确认弹框-->
    <el-dialog title="删除" :visible.sync="delete_again_alter" width="20%" style="height: 200px;margin-top: 300px;"
               :close-on-press-escape="false"
               :close-on-click-modal="false">
      <div>是否确认删除</div>
      <div style="margin-right: 10px;margin-top:5px;float: right">
        <el-button @click="delete_again_alter = false">取 消</el-button>
        <el-button type="primary" @click="delete_single_case()">确 定</el-button>
      </div>
    </el-dialog>

    <!--自定义脚本删除二次确认弹框-->
    <el-dialog title="删除" :visible.sync="delete_case_fixture_method_alter" width="20%" style="height: 200px;margin-top: 300px;"
               :close-on-press-escape="false"
               :close-on-click-modal="false">
      <div>是否确认删除</div>
      <div style="margin-right: 10px;margin-top:5px;float: right">
        <el-button @click="delete_case_fixture_method_alter = false">取 消</el-button>
        <el-button type="primary" @click="DeleteCaseFixtureMethod()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import axios from "axios";
import vueJsonEditor from "vue-json-editor";
import api from '@/api/api.js';

export default {
  components: {
    Breadcrumb,
    vueJsonEditor,
  },
  props: {
    height: {
      type: Number,
      default: 100,
    }
  },
  name: "Single_case",
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
      single_case_active: "single_body",
      more_excution_case_arr: [],
      user_name: "",
      project_name: "",
      project_list: [],
      env_list: [],
      env_options: [],
      account: [],
      Form:{},
      list_page_body: {
        //分页请求数据
        page: 1,
        size: 20,
        create_user:localStorage.getItem("username")
      },
      CaseFileFuncs: [{value: '1', label: '自增'}, {value: '2', label: '原数值随机变更'}],
      tags: [{value: 1, label: '联调环境'}, {value: 2, label: '预发环境'}],
      results:[{value: 3, label: '未执行'}, {value: 1, label: '通过'},{value: 2, label: '失败'}],
      case_data: [],
      total: 0,
      excu_total: 0,
      envForm: JSON.parse(window.localStorage.getItem('envForm')) || {env: [],is_edit:"1"},
      changejob:true,
      module_options: [],
      excutionrow: {},
      delete_id: "",
      delete_again_alter: false,
      dialogVisible: false,
      env_options_dislog: false,
      run_case_dislog: false,
      //执行结果返回输入框高度
      codeHeight: window.innerHeight - 500,
      inGroupCase_array:[{value:1,label:'是'},{value:2,label:'否'}],
      groupcaselistdata: '',
      groupcaselistdialog: false,
      singlecaselistdata: '',
      singlecaselistdialog: false,
      editorOptions: {
        // 设置editor代码编辑器的样式
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        tabSize: 2,
        fontSize: 15,
        showPrintMargin: false, //去除编辑器里的竖线
      },
      title: "添加用例",
      env_conf: 0,
      selectcheck: [],
      rerunCount:false,
      //是否刷新
      isLoading: false,
      ruleForm: {
        name: "",
        req_method: "POST",
        content_type:"application/json",
        url: "",
        tag: [1],
        single_body: {},
        group_body: {},
        assert_res: {},
        extract_param: {},
        pre_sql: {},
        end_sql: {},
        source: "手工创建",
        delay_time: 0,
        // job_param: "",
        // job_podid: "",
        // job_id: "",
        // job_parmes: "",
        // assembly_id: "",
        use_job: "0",
      },
      env_rules: {
        env: [{required: true, message: "请选择环境", trigger: "blur"}],
        cookie: [{required: true, message: "请选择账号", trigger: "blur"}],
      },
      rules: {
        name: [
          {required: true, message: "请输入用例名称", trigger: "blur"},
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur",
          },
        ],
        url: [{required: true, message: "请输入接口地址", trigger: "blur"}],
        req_method: [
          {required: true, message: "请选择请求方式", trigger: "blur"},
        ],
        tag: [{required: true, message: "请选择标签", trigger: "blur"}],
        module: [
          {required: true, message: "请选择所属模块", trigger: "blur"},
        ],
        project_id: [
          {required: true, message: "请选择所属项目", trigger: "blur"},
        ],
      },
      //添加自定义脚本，必填校验
      add_case_fixture_method_rules: {
        method_name: [{required: true, message: "请输入方法名", trigger: "blur"}],
        script: [{required: true, message: "请编写脚本内容", trigger: "blur"}],
      },
      caseForm: {},
      CaseFileTableData:[],
      CaseFileListPage:{
        page:1,
        limit:10
      },
      CaseFileDialog:false,
      AddCaseFileDialog:false,
      AddCaseFileForm:{},
      CaseFiletotal:0,
      CaseFixtureMethodTableData:[],
      CaseFixtureMethodListPage:{
        page:1,
        limit:10
      },
      CaseFixtureMethodDialog:false,
      AddCaseFixtureMethodDialog:false,
      AddCaseFixtureMethodDialogTitle: '新增自定义脚本',
      AddCaseFixtureMethodForm:{},
      CaseFixtureMethodtotal:0,
      delete_case_fixture_method_alter:false,
      //脚本参考例子
      examples:'脚本事例：\nfrom datetime import datetime\ndef time(args):\n    #参数解析:args[0]为第1个参数，args[1]为第2个参数，依此类推...\n    if args[0]=="%Y-%m-%d":\n        value = datetime.today().strftime(args[0])#不带时分秒\n    else:\n        value = datetime.today().strftime("%Y-%m-%d %H:%M:%S")#带时分秒\n    return value',
      group_case_list_page_body: {
        page: 1,
        limit: 10,
      },
      single_case_list_page_body: {
        page: 1,
        limit: 10,
      },
    };
  },
  methods: {
    SubmitrUploadCaseFile() {
      // 手动调用上传，这里会调用我们自己定义的
      this.$refs.upload.submit()
      console.log(this.AddCaseFileForm)
      // 新建form表单
      const fd = new FormData()
      // 将data转换为form-data
      Object.keys(this.AddCaseFileForm).forEach(key => {
        if (this.AddCaseFileForm[key] instanceof Array) {
          // 如果是数组就循环加入表单，key保持相同即可，这就是表达单的数组
          this.AddCaseFileForm[key].forEach(item => {
            fd.append(key, item)
          })
        } else {
          // 如果不是数组就直接追加进去
          fd.append(key, this.AddCaseFileForm[key])
        }
  })
      axios
        .post("/api/test_case/uploadCaseFile",fd)
        .then((res) => {
          if (res.data.code === 10000) {
            this.AddCaseFileDialog = false;
            this.get_case_file_list();
          } else {
            this.isLoading = false;
            this.$message.error(res.data.msg);
          }
        });


},


    UploadCaseFile(param) {
   this.AddCaseFileForm.file = param.file
 },
    AddCaseFile(row,type){
    if (type === "update") {
        this.AddCaseFileForm=JSON.parse(JSON.stringify(row));
      } else {
        this.AddCaseFileForm={};
      }
    this.AddCaseFileDialog = true;
    },
    get_case_file_list(){
      axios
        .post("/api/test_case/CaseFileList",this.CaseFileListPage)
        .then((res) => {
          if (res.data.code === 10000) {
            this.CaseFileTableData = res.data.data
            this.CaseFiletotal = res.data.totalNum
          } else {
            this.isLoading = false;
            this.$message.error(res.data.error);
          }
        });
    },
    OpenCaseFile(val){
      if (val==1){
      this.get_case_file_list();}
      else{
      this.get_case_file_list();
      this.CaseFileDialog =true;
      }

    },

SubmitAddCaseFixtureMethod(AddCaseFixtureMethodForm) {
      this.$refs[AddCaseFixtureMethodForm].validate((valid) => {
        if (valid) {
        if (this.AddCaseFixtureMethodDialogTitle == '新增自定义脚本') {
            axios
                .post("/api/test_case/CreateCaseFixtureMethod", this.AddCaseFixtureMethodForm)
                .then((res) => {
                  //api接口判断为code=10000成功
                  if (res.data["code"] === 10000) {
                    // this.$message({
                    //   duration: 2000,
                    //   message: res.data.msg,
                    //   type: "success",
                    // });
                    this.AddCaseFixtureMethodDialog = false;
                    this.get_case_fixture_method_list();
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
          } else {
            axios
                .post("/api/test_case/UpdateCaseFixtureMethod", {
                                                "id": this.AddCaseFixtureMethodForm.id,
                                                "method_name": this.AddCaseFixtureMethodForm.method_name,
                                                "script": this.AddCaseFixtureMethodForm.script})
                .then((res) => {
                  //api接口判断为code=10000成功
                  if (res.data["code"] === 10000) {
                    // this.$message({
                    //   duration: 2000,
                    //   message: res.data.msg,
                    //   type: "success",
                    // });
                    this.AddCaseFixtureMethodDialog = false;
                    this.get_case_fixture_method_list();
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
          }
        } else {
          return false
        }
      })

    },

    //新增自定义脚本
     AddCaseFixtureMethod(){
      this.AddCaseFixtureMethodForm = {};
      this.AddCaseFixtureMethodDialogTitle = "新增自定义脚本";
      this.AddCaseFixtureMethodDialog = true
    },

    //编辑自定义脚本
    UpdateCaseFixtureMethod(raw) {
      if (this.$refs.AddCaseFixtureMethodForm) {
        this.$refs.AddCaseFixtureMethodForm.clearValidate();
      }
      this.AddCaseFixtureMethodDialog = true;
      this.AddCaseFixtureMethodDialogTitle = "编辑自定义脚本";
      this.AddCaseFixtureMethodForm=JSON.parse(JSON.stringify(raw));
      //this.AddCaseFixtureMethodForm.id = ).id;
      //this.AddCaseFixtureMethodForm.method_name = JSON.parse(JSON.stringify(raw)).method_name;
      //this.AddCaseFixtureMethodForm.script = JSON.parse(JSON.stringify(raw)).script;
      this.get_case_fixture_method_list();
    },

    //删除自定义脚本
    delete_case_fixture_method(row) {
      this.delete_case_fixture_method_id = row.id;
      this.delete_case_fixture_method_alter = true;
    },

    //查看方法所在单用例
    ViewInCase(row) {
      this.ViewInCase_id = row.id;
      this.ViewInCase_alter = true;
    },

    DeleteCaseFixtureMethod(){
      axios.post("/api/test_case/DeleteCaseFixtureMethod",{id:this.delete_case_fixture_method_id}).then((res) => {
        if (res.data["code"] === 10000) {
          this.delete_case_fixture_method_alter = false;
          //this.handleCurrentChange(1);
          this.get_case_fixture_method_list();
        } else {
          this.delete_case_fixture_method_alter = false;
          this.isLoading = false;
          this.is_data = false;
          this.$message.error(res.data.msg);
        }
      });
    },

   
    get_case_fixture_method_list(){
      axios
        .post("/api/test_case/CaseFixtureMthodList",this.CaseFixtureMethodListPage)
        .then((res) => {
          if (res.data.code === 10000) {
            this.CaseFixtureMethodTableData = res.data.data
            this.CaseFixtureMethodtotal = res.data.totalNum
          } else {
            this.isLoading = false;
            this.$message.error(res.data.error);
          }
        });
    },
    OpenCaseFixtureMethod(val){
      if(val == '1'){
        this.get_case_fixture_method_list();
      }else{
        this.get_case_fixture_method_list();
        this.CaseFixtureMethodDialog =true;
      }
    },
    selectJobChange(val){
      if(val == '1'){
        this.changejob = false;
      }else{
        this.changejob = true;
      }
    },
    async get_case() {
      let response = await api.get_case_list(this.list_page_body);
      this.case_data = response.data;
      if(this.case_data){
        this.case_data.forEach((item)=>{
item.execution_env = eval(item.execution_env)
})
      }
      
      this.total = response["totalNum"];
      this.run_case_dislog = false;
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.title === "编辑用例") {
            this.ruleForm.delay_time = parseInt(this.ruleForm.delay_time);
            axios
                .post("/api/test_case/UpdateCase",this.ruleForm)
                .then((res) => {
                  if (res.data.code === 10000) {
                    this.isLoading = false;
                    this.dialogVisible = false;
                    this.get_case();
                  } else {
                    this.isLoading = false;
                    this.$message.error(res.data.error);
                  }
                });
          } else {
            this.ruleForm.delay_time = parseInt(this.ruleForm.delay_time)
            axios.post("/api/test_case/CreateCase", this.ruleForm).then((res) => {
              this.isLoading = true;
              if (res.data.code === 10000) {
                this.isLoading = false;
                this.dialogVisible = false;
                this.get_case();
              } else {
                this.isLoading = false;
                this.$message.error(res.data.error);
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },

    //获取编辑/复制的用例信息
    putcase(row, type) {
      this.ruleForm = null;
      this.ruleForm = JSON.parse(JSON.stringify(row));
      this.ruleForm.module = []
      eval(row.module).forEach((item) => {
        this.ruleForm.module.push(parseInt(item))
      })
      this.ruleForm.use_job = String(row.use_job);
      this.ruleForm.content_type = String(row.content_type);
      this.ruleForm.tag = [parseInt(row.tag)];
      this.job_form.job_parmes = this.ruleForm.job_parmes;
      this.job_form.job_id = this.ruleForm.job_id;
      this.job_form.liushuixian_id = this.ruleForm.assembly_id;
      this.job_form.popId = this.ruleForm.job_podid;
      this.ruleForm.single_body = this.str_to_json(row.single_body);
      this.ruleForm.group_body = this.str_to_json(row.group_body)
      this.ruleForm.pre_sql = this.str_to_json(row.pre_sql)
      this.ruleForm.end_sql = this.str_to_json(row.end_sql)
      this.ruleForm.extract_param = this.str_to_json(row.extract_param)
      this.ruleForm.assert_res = this.str_to_json(row.assert_res)
      if (type === "copy") {
        this.title = "复制用例";
      } else {
        this.title = "编辑用例";
      }
      this.dialogVisible = true;
    },

    addcase() {
      this.title = "添加用例";
      this.ruleForm = {
        name: "",
        req_method: "POST",
        content_type:"application/json",
        url: "",
        tag: [1],
        single_body: {},
        group_body: {},
        assert_res: {},
        extract_param: {},
        pre_sql: {},
        end_sql: {},
        source: "手动创建",
        delay_time: 0,
        // job_parmes: "",
        // job_podid: "",
        // job_id: "",
        // assembly_id: "",
        use_job: "0",
        creator_nickname:localStorage.getItem("username")
      };
      this.dialogVisible = true;
    },

    deletecase(row) {
      this.delete_id = row.id;
      this.delete_again_alter = true;
    },
    DeleteCaseFile(row){
      axios.post("/api/test_case/DeleteCaseFile",{id:row.id}).then((res) => {
        if (res.data["code"] === 10000) {
          this.handleCurrentChange(1);
          this.get_case_file_list();
        } else {
          this.delete_again_alter = false;
          this.isLoading = false;
          this.is_data = false;
          this.$message.error(res.data.msg);
        }
      });
    },
    DownLoadFile(row){
    window.open("https://yt-public-test.yintaerp.com/"+row.filepath)
    //let download_url="https://yt-public-test.yintaerp.com/"+row.filepath
    //this.axios({
    //method:'get',
    //url:download_url,}
    //).then((data) =>{
    //if(!data){
    //return
    //}})
   },

    delete_single_case() {
      axios.post("/api/test_case/DeleteCase",{id:this.delete_id}).then((res) => {
        if (res.data["code"] === 10000) {
          this.handleCurrentChange(1);
          this.delete_again_alter = false;
        } else {
          this.delete_again_alter = false;
          this.isLoading = false;
          this.is_data = false;
          this.$message.error(res.data.msg);
        }
      });
    },
    selectEnv(row) {
      this.env_conf = 1;
      this.env_options_dislog = true;
      this.excutionrow = row;
      this.rerunCount = false;
      this.envForm.rerunCount = 1;
    },
    rerunSelectEnv(row) {
      this.env_conf = 1;
      this.rerunCount = true;
      this.env_options_dislog = true;
      this.excutionrow = row;
    },
    

    //单用例执行执行用例
    excutioncase() {
      if (!window.localStorage.getItem('envForm') || window.localStorage.getItem('envForm') != this.envForm){
          window.localStorage.setItem('envForm',JSON.stringify(this.envForm))
        }
      if (this.env_conf === 1) {
        axios
            .post("/api/test_case/buildSingleCase",
            {id:this.excutionrow.id,
              project_id: this.excutionrow.project_id,
              runCookie: this.envForm.cookie,
              runEnv: this.envForm.env[1],
              rerunCount:this.envForm.rerunCount,
              is_edit: this.envForm.is_edit
            })
            .then((res) => {
              if (res.data["code"] === 10000) {
                this.run_case_dislog = true
                this.env_options_dislog = false;
                this.caseForm = res.data.data
                this.caseForm.name = this.excutionrow.name
                this.caseForm.response = res.data.data.output.response;
                this.caseForm.params = res.data.data.output.params;
                this.caseForm.error_reason = res.data.data.output.error_reason;
                this.caseForm.url = res.data.data.output.url;
                this.env_conf = 2;
              } else {
                this.$message.error(res.data.msg);
                this.env_options_dislog = false;
                this.get_case();
              }
            });
      } else {
        this.more_excution_case_arr = [];
        for (let i in this.selectcheck) {
          this.more_excution_case_arr.push(parseInt(this.selectcheck[i].id));
        }
        axios
            .post("/api/test_case/BuildGroupCase", {
              caseList: this.more_excution_case_arr,
              caseGroupList: [],
              runEnv: this.envForm.env[1],
              runCookie: this.envForm.cookie,
              runUserNickname: this.user_name,
              run_type:1
            })
            .then((res) => {
              if (res.data["code"] === 10000) {
                this.env_options_dislog = false;
              } else {
                this.$message.error(res.data.msg);
              }
            });
      }
    },
    //行选中
    handleSelect(val) {
      this.selectcheck = val;
    },
    handleSelectionChange(val) {
      this.selectcheck = val;
    },
    // // 查看用例结果
    // single_case_result(row) {
    //   this.caseForm = {};
    //   axios.get("/api/api_case/case/" + row.id + "/result").then((res) => {
    //     if (res.data["code"] === 10000) {
    //       this.caseForm = res.data.data;
    //       this.caseForm.response = res.data.data.output.response;
    //       this.caseForm.params = res.data.data.output.params;
    //       this.caseForm.url = res.data.data.output.url;
    //       this.run_case_dislog = true;
    //     } else {
    //       this.$message.error(res.data.msg)
    //     }
    //   });
    // },


    get_group_case_list() {
      axios.post('/api/test_case/in_group_case_list', this.group_case_list_page_body).then((res) => {
        if (res.data.code == 10000) {
          this.groupcaselistdata = res.data.data
          this.excu_total = res.data.totalNum
          this.$message(
              {
                duration: 2000,
                message: '查询成功',
                type: "success",
              }
          )
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },

    get_single_case_list() {
      axios.post('/api/test_case/inSingleCaseList', this.single_case_list_page_body).then((res) => {
        if (res.data.code == 10000) {
          this.singlecaselistdata = res.data.data
          this.excu_total = res.data.totalNum
          this.$message(
              {
                duration: 2000,
                message: '查询成功',
                type: "success",
              }
          )
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },

    opengroupcaselist(row) {
      this.groupcaselistdialog = true
      this.group_case_list_page_body.case_id = row.id
      this.get_group_case_list()

    },

    opensinglecaselist(row) {
      this.singlecaselistdialog = true
      this.single_case_list_page_body.case_id = row.id
      this.single_case_list_page_body.method_name = row.method_name
      this.get_single_case_list()

    },

    group_case_status(raw) {
      if (raw.execution_status == "Executed" || raw.status == "Executed") {
        return '正常执行'
      } else if (raw.execution_status == "Error!" || raw.status == "Error!") {
        return '错误'
      } else if (raw.execution_status == "Started execution" || raw.status == "Started execution") {
        return '执行中'
      } else if (raw.execution_status == "Missed!" || raw.status == "Missed!") {
        return '跳过'
      }
    },
   
    //页量切换-组合用例列表
    handleSizeChangeExcu(val) {
      this.group_case_list_page_body.limit = val;
      this.get_group_case_list();
    },
    //页码切换-组合用例列表
    handleCurrentChangeExcu(val) {
      this.group_case_list_page_body.page = val;
      this.get_group_case_list();
    },

    //页量切换-方法所在单个用例列表
    handleSizeChangeExcuSingle(val) {
      this.single_case_list_page_body.limit = val;
      this.get_single_case_list();
    },
    //页码切换-方法所在单个用例列表
    handleCurrentChangeExcuSingle(val) {
      this.single_case_list_page_body.page = val;
      this.get_single_case_list();
    },


    //页量切换
    handleSizeChange(val) {
      this.list_page_body.limit = val;
      this.get_case();
    },
    //页码切换
    handleCurrentChange(val) {
      this.list_page_body.page = val;
      this.get_case();
    },

    //页量切换
    handleSizeCaseFileChange(val) {
      this.CaseFileListPage.limit = val;
      this.get_case_file_list();
    },
    //页码切换
    handleCurrentCaseFileChange(val) {
      this.CaseFileListPage.page = val;
      this.get_case_file_list();
    },
    
    //页量切换
    handleSizeCaseFixtureMethodChange(val) {
      this.CaseFixtureMethodListPage.limit = val;
      this.get_case_fixture_method_list();
    },
    //页码切换
    handleCurrentCaseFixtureMethodChange(val) {
      this.CaseFixtureMethodListPage.page = val;
      this.get_case_fixture_method_list();
    },

    FilepathToName(row){
      var val = row.filepath.split('Files/')
      return val[val.length - 1]
    },
    FileFuncToName(row){
      var val = row.updateFunc;
      this.CaseFileFuncs.forEach((item)=>{
        console.log(item.value,row.updateFunc)
        if(item.value == row.updateFunc){
          val =  item.label
        }
      })
      return val
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
    inGroupCase_name(raw) {
      let val = null;
      this.inGroupCase_array.forEach((item) => {
        if (raw.inGroupCase === item.value){
          val = item.label
        }
      })
      return val
    },
    get_tag_name(raw) {
      let val = null;
      this.tags.forEach((item) => {
        if (raw.tag === item.value){
          val = item.label
        }
      })
      return val
    },
    get_result_name(raw) {
      let val = null;
      this.results.forEach((item) => {
        if (raw.result === item.value){
          val = item.label
        }
      })
      return val
    },
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
    str_to_json(row){
      try{
        row = JSON.parse(row)
        if(typeof(row) == 'object'){
          return row
        }else{
          row = eval('(' + row.replace(/None/g,'null').replace(/False/g,'false').replace(/True/g,'true').replace(/[\r|\n|\t]/g,'') + ')')
          return row
        }
      }catch{
        return eval('(' + row.replace(/None/g,'null').replace(/False/g,'false').replace(/True/g,'true').replace(/[\r|\n|\t]/g,'') + ')')
    
      }
    },
    //json-editor空监听
    json_editor_error(val, type) {
      if (val.toString() === "Error: Parse error on line 1:\n" +
          "\n" +
          "^\n" +
          "Expecting 'STRING', 'NUMBER', 'NULL', 'TRUE', 'FALSE', '{', '[', got 'EOF'") {
        if (type === 'single_body') {
          this.ruleForm.single_body = {};
        }
        if (type === 'group_body') {
          this.ruleForm.group_body = {};
        }
        if (type === 'assert_res') {
          this.ruleForm.assert_res = {};
        }
        if (type === 'pre_sql') {
          this.ruleForm.pre_sql = {};
        }
        if (type === 'end_sql') {
          this.ruleForm.end_sql = {};
        }
        if (type === 'extract_param') {
          this.ruleForm.extract_param = {};
        }
      }
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

    //搜索选中下拉框事件
    search_select_project(val) {
      if (val) {
        this.list_page_body.projectId = val;
      } else {
        delete this.list_page_body['projectId'];
      }
    },
    //新增用例项目下拉框
    add_select_project(val) {
      if (val) {
        this.ruleForm.project_id = val;
      } else {
        delete this.ruleForm['projectId'];
      }
    },
    handleClose() {
      this.$data = this.$options.data();
    },
    job_click() {
      if(this.changejob == true){
        return
      }
      if (this.title === '编辑用例' || this.title === "用例" || this.title === "复制用例") {
        console.log(this.title)
        this.job_handle_change();
      } else {
        this.job_form = {job_parmes: ""};
        this.title = '用例';
      }

      this.job_parm_dis = true;
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
    //handleSizeCaseFileChange(){},
    //handleCurrentCaseFileChange(){},
  },
  created() {
    this.get_case();
    this.get_projct_list();
    this.get_env_list();
    this.get_account();
    this.get_moudle();
    this.get_user_name();
    this.get_job_list();
    this.get_liushui_list();
    this.get_case_fixture_method_list();
  },
};
</script>
<style>
.jsoneditor-vue {
  height: 100%;
}

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

.submit_button {
  position: fixed;
  z-index: 6666;
}
</style>
