<template>
  <div class="home">
    <el-dialog title="用户信息" :visible.sync="dialogVisible" width="30%">
      <el-form :model="ruleForm" status-icon :ref="ruleForm">
        用户姓名:
        <el-input type="text" v-model="usename"></el-input>密码:
        <el-input type="text" v-model="usepassword"></el-input>手机号:
        <el-input type="text" v-model="usetel" clearable maxlength="11"></el-input>地址:
        <el-input type="text" v-model="useadress"></el-input>商店名称:
        <el-input type="text" v-model="useshopname"></el-input>备注:
        <el-input type="text" v-model="usecomment"></el-input>状态:
        <el-select v-model="usestatus" placeholder="请选择状态">
           <el-option label="0">
            <slot>
              已删除
            </slot>
          </el-option>
          <el-option label="1">
             <slot>
              正常
            </slot>
          </el-option>
        </el-select>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmhandleClick()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加用户 -->
    <el-dialog title="用户信息" :visible.sync="dialogVisibles" width="30%">
      <el-form :model="ruleForm" status-icon :ref="ruleForm">
        用户姓名:
        <el-input type="text" v-model="usename"></el-input>密码:
        <el-input type="text" v-model="usepassword"></el-input>手机号:
        <el-input type="text" v-model="usetel" clearable maxlength="11"></el-input>地址:
        <el-input type="text" v-model="useadress"></el-input>商店名称:
        <el-input type="text" v-model="useshopname"></el-input>备注:
        <el-input type="text" v-model="usecomment"></el-input>状态:
        <el-select v-model="usestatus" placeholder="请选择状态">
          <el-option label="0">
            <slot>
              已删除
            </slot>
          </el-option>
          <el-option label="1">
             <slot>
              正常
            </slot>
          </el-option>
        </el-select>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibles = false">取 消</el-button>
        <el-button type="primary" @click="handleClick1()">确 定</el-button>
      </div>
    </el-dialog>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <h3>用户查询</h3>
        </span>
        <div style="margin-top:20px">
          <el-input v-model="phone" placeholder="请输入电话" id="usertelephone" style="width:100px"></el-input>
          <el-button
            type="primary"
            @click="serchUser1"
            id="serchUser1"
            icon="el-icon-search"
            style="float:left;"
          >搜索</el-button>
          <el-button type="primary" @click="addUser()" id="addUser" style="float:right">添加用户</el-button>
          <el-input
            v-model="shop"
            placeholder="输入商户名"
            id="shopname"
            style="width:200px;float:right;margin-right:500px;margin-left:20px"
          ></el-input>
          <el-button
            type="primary"
            @click="serchUser2"
            id="serchUser2"
            icon="el-icon-search"
            style="float:right"
          >搜索</el-button>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%;margin-top:20px">
        <el-table-column label="用户名" prop="userUserName"></el-table-column>
        <el-table-column label="地址" prop="userAddress"></el-table-column>
        <el-table-column label="电话" prop="userTelphone"></el-table-column>
        <el-table-column label="商店名" prop="userShopName"></el-table-column>
        <el-table-column label="状态" prop="userStatus">
          <template slot-scope="scope">
            <span v-if="scope.row.userStatus===0">已删除</span>
            <span v-if="scope.row.userStatus===1">正常</span>
          </template>
        </el-table-column>
        <el-table-column label="评论" prop="userComment"></el-table-column>

        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="updataUser(scope.$index)">修改</el-button>
            <el-button size="mini" type="danger" @click="confirmDel(scope.$index,tableData)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="tatol_size"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  // main页面展示数据
  data() {
    return {
      input: "",
      tableData: [],
      list1: [],
      tatol_size: 0,
      phone: "",
      shop: "",
      radio: "1",
      ruleForm: {
        usetel: ""
      },

      dialogVisible: false,
      dialogVisibles: false,
      visible: false,

      useid: "",
      usename: "",
      usepassword: "",
      usetel: "",
      useadress: "",
      useshopname: "",
      usecomment: "",
      usestatus: "",
      form: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$axios
        .get("http://www.wxhwg.com:8080/mock/user/list", {
          params: {
            pageSize: 1000
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            this.tatol_size = result.data.list.length;
            this.tableData = result.data.list.slice(0, 10);
          } else {
            alert(result.message);
          }
        })
        .catch(error => {
          alert(error);
        });
    },
    // 设置页码 补齐
    handleCurrentChange(val) {
      this.$axios
        .get("http://www.wxhwg.com:8080/mock/user/list", {
          params: {
            pageNum: val,
            pageSize: 10
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            this.tableData = result.data.list;
            if (this.tableData.length != 10) {
              var num = 10 - this.tableData.length;
              for (var index = 0; index < num; index++) {
                this.tableData.push({});
              }
            }
          } else {
            alert(result.message);
          }
        })
        .catch(error => {
          alert(error);
        });
    },
    // 删除用户
    delUser(index, rows) {
      this.$axios
        .get("http://www.wxhwg.com:8080/mock/user/del", {
          params: {
            uid: rows[index].userId
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            alert(result.message);
          } else {
            alert(result.message);
          }
        })
        .catch(error => {
          alert(error);
        });
    },
    // 查询用户
    serchUser1() {
      var that = this;
      this.$axios
        .get("http://www.wxhwg.com:8080/mock/user/list", {
          params: {
            telphone: that.phone
          }
        })
        .then(response => {
          let result = response.data.data.list;
          this.tatol_size = result.length;
          this.tableData = result;
        })
        .catch(error => {
          alert(error);
        });
    },
    serchUser2() {
      var that = this;
      this.$axios
        .get("http://www.wxhwg.com:8080/mock/user/list", {
          params: {
            shopName: that.shop
          }
        })
        .then(response => {
          let result = response.data.data.list;
          this.tatol_size = result.length;
          this.tableData = result;
        })
        .catch(error => {
          alert(error);
        });
    },
    // 修改用户
    //对应弹窗修改好后的确定按钮
    handleClick() {
      var self = this;
      self.dialogVisible = false;
      this.$axios({
        method: "post",
        url: "http://www.wxhwg.com:8080/mock/user/update",
        data: self.$qs.stringify({
          userId: self.useid,
          userUserName: self.usename,
          userPassword: self.usepassword,
          userTelphone: self.usetel,
          userAddress: self.useadress,
          userShopName: self.useshopname,
          userComment: self.usecomment,
          userStatus: self.usestatus
        })
      })
        .then(function(response) {
          var result = response.data;
          alert(result.message);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //对应修改按钮
    updataUser(index) {
      var self = this;
      self.dialogVisible = true;
      self.userx(index);
    },
    //按照ID查询用户 已有数据放入对话框中
    userx(index) {
      var self = this;
      this.$axios
        .get("http://wxhwg.com:8080/mock/user/findById", {
          params: {
            uid: self.tableData[index].userId
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            this.list1 = result.data;
            this.ruleForm.usetel = self.list1.userTelphone;
            this.useid = self.list1.userId;
            this.usename = self.list1.userUserName;
            this.usepassword = self.list1.userPassword;
            this.usetel = self.list1.userTelphone;
            this.useadress = self.list1.userAddress;
            this.useshopname = self.list1.userShopName;
            this.usecomment = self.list1.userComment;
            this.usestatus = self.list1.userStatus;
          }
        })
        .catch(response => {});
    },
    // 添加用户
    addUser() {
      var self = this;
      self.dialogVisibles = true;
      this.useid = this.list1.userId;
      this.ruleForm.usetel = "";
      this.usename = "";
      this.usepassword = "";
      this.usetel = "";
      this.useadress = "";
      this.useshopname = "";
      this.usecomment = "";
      this.usestatus = "";
    },
    handleClick1() {
      var self = this;
      self.dialogVisible = false;
      this.$axios({
        method: "post",
        url: "http://www.wxhwg.com:8080/mock/user/add",
        data: this.$qs.stringify({
          userId: this.useid,
          userUserName: this.usename,
          userPassword: this.usepassword,
          userTelphone: this.usetel,
          userAddress: this.useadress,
          userShopName: this.useshopname,
          userComment: this.usecomment,
          userStatus: this.usestatus
        })
      })
        .then(function(response) {
          var result = response.data;
          alert(result.message);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    confirmDel(index, rows) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delUser(index, rows);
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "修改失败!"
          });
        });
    },
    confirmhandleClick() {
      this.$confirm("此操作将修改该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.handleClick();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    }
  }
};
</script>
<style>
#usertelephone {
  margin-left: 20px;
  width: 200px;
  float: left;
}

.el-col {
  height: 740px;
  width: 200px;
}
</style>