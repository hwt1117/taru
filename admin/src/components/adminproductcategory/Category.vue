<template>
  <div>
    <!-- 修改弹窗 -->
    <el-dialog title="用户信息" :visible.sync="dialogVisible" width="30%">
      类别Id:
      <el-input :disabled="true" type="text" v-model="categoryId"></el-input>类别名称:
      <el-input type="text" v-model="categoryName"></el-input>类别排序:
      <el-input type="text" v-model="categoryOrder"></el-input>类别状态:
      <el-select v-model="categoryStatus" placeholder="请选择状态">
        <el-option label="0" value="0">
          <slot>已删除</slot>
        </el-option>
        <el-option label="1" value="1">
          <slot>正常</slot>
        </el-option>
      </el-select>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClick()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加类别弹窗 -->
    <el-dialog title="用户信息" :visible.sync="dialogVisibles" width="30%">
      类别名称:
      <el-input type="text" v-model="categoryName"></el-input>类别排序:
      <el-input type="text" v-model="categoryOrder"></el-input>类别状态:
      <el-select v-model="categoryStatus" placeholder="请选择状态">
        <el-option label="0" value="0">
          <slot>已删除</slot>
        </el-option>
        <el-option label="1" value="1">
          <slot>正常</slot>
        </el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibles= false">取 消</el-button>
        <el-button type="primary" @click="handleClick1()">确 定</el-button>
      </div>
    </el-dialog>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <h3>类别查询</h3>
          <el-button type="primary" @click="addCategory()" id="addCategory" style="float:right">添加类别</el-button>
        </span>
        <br>
      </div>
      <el-table :data="lists" style="width: 80%；height:100px">
        <el-table-column label="类别名称" prop="categoryName"></el-table-column>
        <el-table-column label="类别排序" prop="categoryOrder">
          <template slot-scope="scope">
            <el-button
              @click="add(scope.row)" circle
              style="width:30px;height:30px"
            ><i class="el-icon-plus"></i></el-button>
            <el-input v-model="scope.row.categoryOrder" style="width:40px"></el-input>
            <el-button
              circle
              icon="el-icon-minus"
              @click="reduce(scope.row)"
              style="width:30px;height:30px;margin-left:0"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="类别状态" prop="categoryStatus">
          <template slot-scope="scope">
            <div v-if="scope.row.categoryStatus===1">正常</div>
            <div v-if="scope.row.categoryStatus===0">异常</div>
          </template>
        </el-table-column>

        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="updataCategory(scope.$index)">修改</el-button>
            <el-button size="mini" type="danger" @click="confirmDel(scope.$index, lists)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

 
<script>
export default {
  data() {
    return {
      lists: [],
      list1: "",
      search: "",
      categoryId: "",
      categoryName: "",
      categoryOrder: "",
      categoryStatus: "",
      dialogVisible: false,
      dialogVisibles: false,
      visible: false
    };
  },
  created() {
    this.first();
  },
  methods: {
    //查询商品类别
    first() {
      this.$axios
        .get("http://www.wxhwg.com:8080/mock/category/qryList")
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            this.lists = result.data;
          }
        })
        .catch(response => {});
    },
    //根据类别id查询类别
    cate(index) {
      var self = this;
      this.$axios
        .get("http://wxhwg.com:8080/mock/category/selectById", {
          params: {
            categoryId: self.lists[index].categoryId
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            // alert("djkl")
            this.list1 = result.data;
            this.categoryId = self.list1.categoryId;
            this.categoryName = self.list1.categoryName;
            this.categoryOrder = self.list1.categoryOrder;
            this.categoryStatus = self.list1.categoryStatus;
          }
          this.first();
        })
        .catch(error => {
          console.log("error");
        });
    },
    //对应修改按钮
    updataCategory(index) {
      var self = this;
      self.dialogVisible = true;
      self.cate(index);
    },
    handleClick(index) {
      var self = this;
      self.dialogVisible = false;
      this.$axios({
        method: "post",
        url: "http://www.wxhwg.com:8080/mock/category/update",
        data: self.$qs.stringify({
          categoryId: self.categoryId,
          categoryName: self.categoryName,
          categoryOrder: self.categoryOrder,
          categoryStatus: self.categoryStatus
        })
      })
        .then(function(response) {
          var result = response.data;
          alert(result.message);
          this.first();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //对应添加按钮
    addCategory(index) {
      var self = this;
      self.dialogVisibles = true;
      self.categoryName = "";
      self.categoryOrder = "";
      self.categoryStatus = "";
    },
    //确定添加类别
    handleClick1() {
      console.log(this.$axios);
      console.log(this.$qs);
      var self = this;
      var params = this.$qs.stringify({
        categoryId: self.categoryId,
        categoryName: self.categoryName,
        categoryOrder: self.categoryOrder,
        categoryStatus: self.categoryStatus
      });
      console.log(params);

      self.dialogVisibles = false;
      this.$axios
        .post("http://www.wxhwg.com:8080/mock/category/add", params)
        .then(function(response) {
          var result = response.data;
          if (result.status == 200) {
            alert(result.message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //删除类别
    handleDelete(index, rows) {
      this.$axios
        .get("http://www.wxhwg.com:8080/mock/category/delById", {
          params: {
            categoryId: rows[index].categoryId
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            alert(result.message);
          } else {
            alert(result.message);
          }
          this.first();
        })
        .catch(error => {
          alert(error);
        });
    },
    //排序加减
    add(row) {
      this.$axios
        .get("http://www.wxhwg.com:8080/mock/category/updateById", {
          params: {
            categoryId: row.categoryId
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
          }
          this.first();
        })
        .catch(response => {});
    },
    reduce(row) {
      this.$axios
        .get("http://www.wxhwg.com:8080/mock//category/downdateById", {
          params: {
            categoryId: row.categoryId
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
          }
          this.first();
        })
        .catch(response => {});
    },
    confirmDel(index, rows) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.handleDelete(index, rows);
        })
        .catch(() => {
          this.$handleDelete({
            type: "info",
            handleDelete: "已取消删除"
          });
        });
    }
    // handleClick() {
    //       this.$confirm('此操作将修改该文件, 是否继续?', '提示', {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         type: 'warning'
    //       }).then(() => {
    //         this.$cate({
    //           type: 'success',
    //           cate: '修改成功!'
    //         });
    //       }).catch(() => {
    //         this.$cate({
    //           type: 'info',
    //           cate: '已取消修改'
    //         });
    //       });
    //     }
  }
};
</script>
<style>
.el-table-column tr,
.el-table-column th {
  height: 100px;
}
</style>
