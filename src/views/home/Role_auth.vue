<template>
  <div>


    <div class="left_div"
         style="width: 200px;height:800px; border-right: 1px  #F3F4F6 solid;float: left;">

      <div style=" margin-left:1%;">
        <el-button type="primary" size="small" style="margin-top:10px;background-color: #3573fe;float: left;margin-left: 10px;"
                   v-has="{class:'80'}"

                   @click="create_role_dis=true;title='创建角色';">创建角色
        </el-button>
      </div>

      <div style="width: 90%;height: 710px;margin-left: 1%;margin-top: 20px;">
        <el-table
            ref="role_table"
            :data="role_data"
            style="font-size: 12px;border: none;margin-left: 10px;padding: 5px 4px;"
            height="690"
            width="100%"
            :show-header="false"
            :row-style="{ height: '30px'}"
            :cell-style="{ padding: '0px' ,border:'none'}"
            highlight-current-row
            @row-click="row_click"
        >
          <el-table-column prop="name" width="100" align="left" :show-overflow-tooltip="true"
                           style="border-radius: 20px;"></el-table-column>

          <el-table-column label="操作" width="70" align="center">
            <template slot-scope="scope">

              <el-button style="border:none;width: 20px;height: 20px;float: left;padding: 0;line-height: 20px;"
                         class="el-icon-edit-outline" v-if="scope.row.id !==1" v-has="{class:'81'}"
                         @click="create_role_dis=true;select_role = scope.row.id;title='编辑角色';
                         select_role_name=scope.row.name;"></el-button>

              <el-button style="border:none;width: 20px;height: 20px;float: left;padding: 0;line-height: 20px;"
                         class="el-icon-delete" @click="delete_role_dis=true;delete_role_id = scope.row.id"
                         v-if="scope.row.id !==1" v-has="{class:'82'}"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>


      <!--删除二次确认弹框-->
      <el-dialog title="关闭弹框" :visible.sync="delete_role_dis" width="350px"
                 style="height: 250px;margin-top: 300px;border-radius: 5px;"
                 :close-on-press-escape="false"
                 :close-on-click-modal="false">
        <div>是否关闭弹框</div>
        <div style="margin-right: 10px;margin-top:5px;float: right">
          <el-button @click="delete_role_dis = false">取 消</el-button>
          <el-button type="primary" @click="delete_role">确 定
          </el-button>
        </div>
      </el-dialog>
    </div>


    <div class="right_div" style="width: 75%;height: 800px;margin-left: 1%;float:left;">
      <el-tabs v-model="activeName" style="margin-left: 1%;">
        <el-tab-pane label="角色用户" name="role_user" :key="'role_user'">
          <div style="float: left;">
            <p style="font-size: 13px;">共{{ this.role_user_num }}个用户</p>
          </div>
          <div style="float: right;margin-bottom: 10px;">
            <el-button type="primary" size="small" style="background-color: #3573fe;"
                       @click="add_role_user_dis = true" v-has="{class:'83'}">新增
            </el-button>
          </div>
          <div style="float: top;">
            <el-table
                :data="role_user_data"
                style="font-size: 13px;border-radius: 5px;"
                height="690"
                width="100%"
                :border="false"
                :stripe="true"
                :header-cell-style="{ background: '#E7EAED' }"
                :row-style="{ height: '40px'}"
                :cell-style="{ padding: '0px' }">
              <el-table-column label="姓名" prop="name" :formatter="get_user_name" align="center"></el-table-column>
              <el-table-column label="账号" prop="username" :formatter="get_user_username"
                               align="center"></el-table-column>
              <el-table-column label="手机号" prop="phone" :formatter="get_user_phone" align="center"></el-table-column>
              <el-table-column label="操作" width="100" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="delete_role_user(scope.row)" size="small" style="color: red"
                             v-has="{class:'84'}">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

            <!--新增角色start-->
            <el-dialog
                :visible.sync="add_role_user_dis"
                width="450px"
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                style="margin-top:150px;height: 300px;"
                @close="add_role_user_dis=false">
              <span slot="title" style="font-size: 20px">添加用户</span>

              <el-form :model="add_role_user_form" :inline-message="true"
                       :status-icon="true"
                       ref="ruleForm"
                       label-width="auto">

                <el-form-item label="名称" prop="user_id" style="float: left;">
                  <el-select v-model="add_role_user_form.user_id" clearable filterable placeholder="请选择"
                             style="width: 300px;float: left;">
                    <el-option v-for="item in all_user" :key="item.id" :label="item.name"
                               :value="item.id"></el-option>
                  </el-select>

                </el-form-item>

                <div style="margin-right: 10%;margin-top: 20px;float: right;">
                  <el-form-item>
                    <el-button type="primary" @click="add_role_user">确定</el-button>
                    <el-button @click="add_role_user_dis = false">取消</el-button>
                  </el-form-item>
                </div>

              </el-form>
            </el-dialog>
            <!--新增角色弹框end-->

          </div>
        </el-tab-pane>


        <el-tab-pane label="功能权限" name="auth" :key="'auth'">

          <div style="float: bottom;margin-bottom: 10px;">
            <el-button type="primary" size="small" style="background-color: #3573fe;"
                       @click="update_role_auth" v-has="{class:'85'}">保存
            </el-button>
          </div>

          <div class="container">
            <el-tree
                class="el-tree"
                :data="role_auth_data"
                :render-content="renderContent"
                show-checkbox
                node-key="id"
                ref="tree"
                highlight-current
                :default-checked-keys="role_auth_default_select"
                @node-expand="handleExpand"
                :props="defaultProps"
            ></el-tree>
          </div>


        </el-tab-pane>

      </el-tabs>
    </div>


    <!--新增角色start-->
    <el-dialog
        :visible.sync="create_role_dis"
        width="450px"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        style="margin-top:150px;height: 300px;"
        @close="create_role_dis=false">
      <span slot="title" style="font-size: 20px">{{ this.title }}</span>

      <el-form :model="create_role_form" :rules="create_roles" :inline-message="true" :status-icon="true" ref="ruleForm"
               label-width="auto">

        <el-form-item label="角色名称" prop="name" style="float: left;">
          <el-input v-model="create_role_form.name" placeholder="请输入角色名称" style="width: 300px;"></el-input>
        </el-form-item>

        <div style="margin-left: 30%;margin-top: 20px;float: left;">
          <el-form-item>
            <el-button type="primary" @click="create_role">确定</el-button>
            <el-button @click="create_role_dis = false">取消</el-button>
          </el-form-item>
        </div>

      </el-form>
    </el-dialog>
    <!--新增角色弹框end-->
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "Role_auth",
  data() {
    return {
      title: '',
      activeName: "role_user",
      role_user_data: [],
      all_leaf_menu: [],
      role_auth_default_select: [],
      select_role_name: "管理员",
      delete_role_id: 0,
      role_user_num: 0,
      all_user: [],
      select_role: 1,
      delete_role_dis: false,
      create_role_dis: false,
      add_role_user_dis: false,
      add_role_user_form: {},
      role_data: [],
      create_role_form: {},
      create_roles: [
        {name: true, message: "请输入名称", trigger: "blur"},
      ],
      role_auth_data: [],
      defaultProps: {
        children: 'children',
        label: 'title',
        disabled: this.isDisabledFalse,
      },
    };
  },
  methods: {
    // 获取角色列表
    get_role() {
      axios
          .post("/api/users/roleList", {page: 1, limit: 200})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.role_data = res.data.data;
              this.$nextTick(function () {
                this.$refs.role_table.setCurrentRow(this.role_data[0])
              });
              this.get_role_user(1);
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

    // 创建角色
    create_role() {
      if (this.title === '创建角色') {
        this.create_role_form.auth = [];
        axios
            .post("/api/users/createRole", this.create_role_form)
            .then((res) => {
              //api接口判断为code=10000成功
              if (res.data["code"] === 10000) {
                this.create_role_dis = false;
                this.get_role();
              } else {
                //失败提示
                this.$message.error(res.data.msg);
              }
            })
            .catch((error) => {
              console.log(error); //  错误处理 相当于error
              this.$message.error("服务器错误,请联系测试人员");
            });
      } else {
        this.update_role_auth()
      }
    },

    // 删除角色
    delete_role() {
      axios
          .post("/api/users/deleteRole", {role_id: this.delete_role_id})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.get_role();
              this.delete_role_dis = false;
              this.delete_role_id = null;
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
    //添加角色下用户
    add_role_user() {
      this.add_role_user_form.role_id = this.select_role;

      axios
          .post("/api/users/bindUser", this.add_role_user_form)
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.$message.success(res.data.msg);
              this.add_role_user_dis = false;
              this.get_role_user(this.select_role);
            } else {
              //失败提示
              this.add_role_user_dis = false;
              this.$message.error(res.data.msg);
            }
          })
          .catch((error) => {
            console.log(error); //  错误处理 相当于error
            this.$message.error("服务器错误,请联系测试人员");
          });
    },
    //删除角色下的用户
    delete_role_user(row) {
      axios
          .post("/api/users/unbindUser", {role_id: row.role_id, user_id: row.user_id})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.$message.success(res.data.msg);
              this.get_role_user(this.select_role);
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

    // 角色行点击
    row_click(row) {
      this.select_role = row.id;
      this.select_role_name = row.name;
      this.get_role_user(row.id);
      this.get_role_auth(row.id);
    },

    //获取当前角色下用户
    get_role_user(role_id) {
      axios
          .post("/api/users/roleUserList", {role_id: role_id, page: 1, limit: 2000})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.role_user_num = res.data.data.length;
              this.role_user_data = res.data.data;
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
    //比对数组相同数据
    compare(arr1, arr2) {
      return arr1.filter((v) => {
        return arr2.includes(v);
      });
    },
    isDisabledFalse() {
      return true
    },
    isDisabledTrue() {
      return false
    },

    //获取角色下权限
    get_role_auth(role_id) {
      this.role_auth_default_select = [];
      this.$refs.tree.setCheckedKeys([]);
      axios
          .post("/api/users/roleJurisdictionList", {role_id: role_id})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              //如果是管理员
              if (this.select_role === 1) {
                //选中所有及禁用
                this.$refs.tree.setCheckedKeys(this.all_leaf_menu)
                this.defaultProps.disabled = this.isDisabledFalse;
                //不是
              } else {
                this.defaultProps.disabled = this.isDisabledTrue;
                //选中对应的菜单或按钮
                if (res.data['jurisdiction_ids'].length > 0) {
                  //比对所有菜单子节点和返回数据对比取
                  // 相同数据
                  this.role_auth_default_select = this.compare(this.all_leaf_menu, res.data['jurisdiction_ids']);
                  this.$refs.tree.setCheckedKeys(this.role_auth_default_select)
                } else {
                  this.defaultProps.disabled = this.isDisabledTrue;
                  this.role_auth_default_select = [];
                }
              }
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
    //更新角色权限
    update_role_auth() {
      this.checkStrictly = false;
      this.ckeckedVal = this.$refs.tree.getCheckedKeys();
      let number = this.$refs.tree.getHalfCheckedKeys();
      this.ckeckedVal = this.ckeckedVal.concat(number);
      var update_parm = {
        role_id: this.select_role,
        auth: this.ckeckedVal,
        name: this.select_role_name
      }
      if (this.title === "编辑角色") {
        update_parm.name = this.create_role_form.name
      }
      axios
          .post("/api/users/createRole", update_parm)
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.$message.success(res.data.msg);
              this.create_role_dis = false;
              this.get_role();
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
    //获取所有菜单
    get_all_menu() {
      this.all_leaf_menu = [];
      axios
          .post("/api/users/jurisdictionList", {page: 1, limit: 2000})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.role_auth_data = res.data.data;
              //取出所有的叶子节点
              this.$nextTick(() => {
                var allNodes = this.$refs.tree.store._getAllNodes()
                var leafNodes = allNodes.filter(item => item.isLeaf)
                for (let i = 0; i < leafNodes.length; i++) {
                  this.all_leaf_menu.push(leafNodes[i].data.id);
                }
                this.$refs.tree.setCheckedKeys(this.all_leaf_menu)
              })
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
    // 获取所有用户
    get_user_list() {
      axios
          .post("/api/users/userList", {page: 1, limit: 2000})
          .then((res) => {
            //api接口判断为code=10000成功
            if (res.data["code"] === 10000) {
              this.all_user = res.data.data;
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
    get_user_name(row) {
      let val = null;
      this.all_user.forEach((item) => {
        if (String(row.user_id) === String(item.id)) {
          val = item.name;
        }
      })
      return val;
    },
    get_user_phone(row) {
      let val = null;
      this.all_user.forEach((item) => {
        if (String(row.user_id) === String(item.id)) {
          val = item.phone;
        }
      })
      return val;
    },
    get_user_username(row) {
      let val = null;
      this.all_user.forEach((item) => {
        if (String(row.user_id) === String(item.id)) {
          val = item.username;
        }
      })
      return val;
    },

    //节点横向排列处理start------------------
    handleExpand() {//节点被展开时触发的事件
      //因为该函数执行在renderContent函数之前，所以得加定时
      setTimeout(() => {
        this.changeCss();
      }, 10);
    },
    renderContent(h, {node}) {//树节点的内容区的渲染 Function
      let classname = "";
      // 由于项目中有三级菜单也有四级级菜单，就要在此做出判断
      if (node.level === 4) {
        classname = "foo";
      }
      return h(
          "p",
          {
            class: classname
          },
          node.label
      );
    },
    changeCss() {
      var levelName = document.getElementsByClassName("foo"); // levelname是上面的最底层节点的名字
      for (var i = 0; i < levelName.length; i++) {
        // cssFloat 兼容 ie6-8  styleFloat 兼容ie9及标准浏览器
        levelName[i].parentNode.style.cssFloat = "left"; // 最底层的节点，包括多选框和名字都让他左浮动
        levelName[i].parentNode.style.styleFloat = "left";
        levelName[i].parentNode.onmouseover = function () {
          this.style.backgroundColor = "#fff";
        };
      }
    },
    refreshTreeNode(isParent) {
      isParent.loaded = true;
    },
    //节点横向排列处理end------------------
  },
  created() {
    this.get_role();
    this.get_user_list();
    this.get_all_menu();
  },
}
</script>

<style scoped>

.tableSelectedRowBgColor td {
  background-color: #fedcbd !important;
}

div /deep/ .el-table--border::after,
div /deep/ .el-table--group::after,
div /deep/ .el-table::before {
  background-color: transparent;
}

.el-tree {
  margin: 12px 0;
  font-size: 13px;

}

/deep/ .el-icon-arrow-right:before {
  color: #409eff;
}

/deep/ .el-tree-node__content::before {
  content: "";
  font-size: 13px;
  padding-left: 10px;
}

/deep/ .el-checkbox__input {
  margin-right: 6px;
  font-size: 13px;
}

.el-tree-node__label {
  font-size: 13px;
}
</style>