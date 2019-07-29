<template>
  <div>
    <div>
      <!-- 订单详情弹窗 -->
      <el-dialog :visible.sync="dialogTableVisible">
        <div class="table">
          <el-table :data="lists" style="width: 100%">
            <!--  @selection-change="getRowDatas" 获取当前行的函数-->
            <el-table-column prop="product.productName" label="产品名称" width="100"></el-table-column>
            <el-table-column prop="product.productStandard" label="规格" width="100"></el-table-column>
            <el-table-column prop="detailProductCount" label="数量" width="100">
            </el-table-column>
            <el-table-column prop="detailProductUnit" label="单位" width="100"></el-table-column>
            <el-table-column prop="product.productSmallPrice" label="单价" width="100"></el-table-column>
            <el-table-column prop="detailProductPrice" label="总价" width="100">
            </el-table-column>
            <el-table-column prop="detailComment" label="备注" width="100"></el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="sent()">发货</el-button>
            <el-button>
              <a :href="'http://www.wxhwg.com:8080/mock/order/export?orderid='+this.form.orderid">导出</a>
            </el-button>
          </div>
        </div>
      </el-dialog>
    </div>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <h3>订单查询</h3>
        </span>

        <div style="margin-top:20px">
          <el-form :inline="true">
            <el-form-item style="float: left;" label="商店名称查询:">
              <el-input v-model="shopname" placeholder="请输入商店名"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                size="small"
                icon="el-icon-edit-outline"
                @click="shna()"
                style="float: right"
              >搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <!-- 所有订单的表格 -->
        <el-table-column prop="orderId" label="订单编号" width="140" height="40px"></el-table-column>
        <el-table-column prop="user.userShopName" label="商店名称" width="120" height="40"></el-table-column>
        <el-table-column prop="orderDateTime" label="下单日期" height="40"></el-table-column>
        <el-table-column prop="orderIsSend" label="是否发货" width="140" height="40">
          <template slot-scope="scope">
            <div v-if="scope.row.orderIsSend===1">发货</div>
            <div v-if="scope.row.orderIsSend===0">未发货</div>
          </template>
        </el-table-column>
        <el-table-column prop="orderIsValid" label="是否有效" width="140" height="40">
          <template slot-scope="scope">
            <div v-if="scope.row.orderIsValid===1">有效</div>
            <div v-if="scope.row.orderIsValid===0">无效</div>
          </template>
        </el-table-column>
        <el-table-column prop="orderTotalPrice" label="总价" width="140" height="40"></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button @click="details(scope.row.orderId);" type="text" size="small">查看</el-button>
            <el-button @click="handleDelete(scope.row.orderId)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 页码 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-sizes="[8, 16, 24, 32]"
          :page-size="pz"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "order",

  data() {
    return {
      lists: [],
      tableData: [],
      shopname: "",
      orderId: "",
      pz: 8,
      currentPage1: 1, //分页的
      total: 0,
      dialogTableVisible: false,
      productLargerPrice: "",
      detailProductCount: "",
      form: {
        orderid: ""
      }
    };
  },
  created() {
    this.handleCurrentChange(1);
  },
  methods: {
    //分页
    handleSizeChange(val) {
      var self = this;
      console.log(`每页 ${val} 条`);
      self.pz = val;
    },
    handleCurrentChange(val) {
      //查询所有订单
      var self = this;
      this.$axios({
        method: "get",
        url: "http://www.wxhwg.com:8080/mock/order/list",
        params: {
          pageNum: val,
          pageSize: self.pz
        }
      })
        .then(response => {
          // alert(herf);
          let result = response.data;
          if (result.status == 200) {
            self.total = result.data.total;
            self.tableData = result.data.list; //箭头函数this内部指针 指向外部vue对象
          } else {
            alert(result.message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //根据商品名称查询历史订单
    shna() {
      var self = this;
      this.$axios({
        method: "get",
        url: "http://www.wxhwg.com:8080/mock/order/list",
        params: {
          pageNum: self.currentPage1,
          pageSize: 8,
          shopName: self.shopname
        }
      })
        .then(response => {
          let result = response.data;
          if ((result.status == 200) & (this.shopname != null)) {
            self.total = result.data.total;
            self.tableData = result.data.list; //箭头函数this内部指针 指向外部vue对象
          } else {
            alert(result.message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    oid() {
      //根据订单id查询订单
      var self = this;
      this.$axios({
        method: "get",
        url: "http://www.wxhwg.com:8080/mock/order/qyrOderById",
        params: {
          orderid: self.orderId
        }
      })
        .then(response => {
          let result = response.data;
          if ((result.status == 200) & (self.orderId != null)) {
            self.tableData = null;
            alert(result.message);
            self.tableData = result.data.product; //箭头函数this内部指针 指向外部vue对象
          } else {
            alert(result.message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    handleDelete(orderId) {
      // 删除订单
      this.$confirm("此操作将删除此订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.$axios({
            method: "get",
            url: "http://www.wxhwg.com:8080/mock/order/invalid",
            params: {
              orderid: orderId
            }
          }).then(response => {
            let result = response.data;
            if (result.status == 200) {
              this.handleCurrentChange(1); //删除数据，更新视图
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    details(orderId) {
      //跳转到订单详情
      this.dialogTableVisible = true; //显示弹
      //订单详情
      this.$axios({
        method: "get",
        url: "http://www.wxhwg.com:8080/mock/order/detail",
        params: {
          orderid: orderId
        }
      })
        .then(response => {
          
          let result = response.data;
          if (result.status == 200) {
            this.lists = result.data; //箭头函数this内部指针 指向外部vue对象
            this.form.orderid = orderId;
          } else {
            alert(result.data);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    sent() {
      //发货
      var self = this;
      this.$axios({
        method: "get",
        url: "http://www.wxhwg.com:8080/mock/order/send",
        params: {
          orderid: self.form.orderid
        }
      })
        .then(response => {
           
          let result = response.data;
          if (result.status == 200) {
            this.$message({
              type: "success",
              message: "发货成功!"
            });
            this.handleCurrentChange(1);
          } else {
            alert(result.message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style >
</style>
