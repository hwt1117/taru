<template>
  <div id="searchproduct">
    <el-card class="box-card1">
      <div slot="header" class="clearfix">
        <span>
          <h3>商品查询</h3>
        </span>
      </div>
      <div class="box">
        <el-card
          :body-style="{ padding: '15px' }"
          v-for="item in list"
          :key="item.productId"
          shadow="always"
        >
          <div class="demo-image__lazy">
            <el-image
              :src="web_static_serve+item.productPhoto"
              class="image"
              style="width:170px;height:150px;"
              lazy
            ></el-image>
          </div>
          <div style="width:170px;height:135px">
            <p>商品：{{item.productName}}</p>
            <p>单价：{{item.productSmallPrice}}</p>
            <p>品牌：{{item.productBrandId}}</p>
            <div class="bottom clearfix" style="width:170px">
              <el-button @click="nolack(item.productId)" type="text" class="button">重新上货</el-button>
              <el-button @click="drop(item.productId)" type="text" class="button">删除</el-button>
              <el-button type="text" @click="searchbyid(item.productId)">详情</el-button>
            </div>
          </div>
        </el-card>
        <div class="block">
    
    <el-pagination style="position:relative"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      
      :page-size="16"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
      </div>
    </el-card>
    <!-- Form -->

    <el-dialog title="商品详情" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="商品名称 " :label-width="formLabelWidth">
          <el-input v-model="this.form.productName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="最小单位" :label-width="formLabelWidth">
          <el-input v-model="form.productSmallUnit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单价" :label-width="formLabelWidth">
          <el-input v-model="form.productSmallPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类别ID" :label-width="formLabelWidth">
          <el-input v-model="form.productCategoryId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否在销" :label-width="formLabelWidth">
          <el-input v-model="form.productIsSale" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否缺货" :label-width="formLabelWidth">
          <el-input v-model="form.productIsLack" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input v-model="form.productStatus" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="建议零售价" :label-width="formLabelWidth">
          <el-input v-model="form.productSuggestPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-upload
          class="upload-demo"
          drag
          action="http://www.wxhwg.com:8080/mock/product/photo"
          name="photo"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="lack()" type="primary">缺货设置</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { Loading } from "element-ui";
export default {
  data() {
    return {
      list: [],
      list1: "",
      web_static_serve: "http://www.wxhwg.com:8080/mock/static/",
      pagenum: 1,
      pagesize: 12,
      category: "",
      proid: "",
      total:0,
      dialogFormVisible: false,
      form: {
        productName: "",
        productSmallUnit: "",
        productSmallPrice: "",
        productCategoryId: "",
        productIsSale: "",
        productIsLack: "",
        productStatus: "",
        productSuggestPrice: "",
        productPhoto: "",
        type: []
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    this.handleCurrentChange(1);
  },
  methods: {
    //查询所有商品
    handleCurrentChange(val) {
      this.$axios
        .get("http://www.wxhwg.com:8080/mock/product/list", {
          params: {
            pageNum: val,
            pageSize: this.pagesize,
            categoryId: "",
            productName: "",
            isLack: ""
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            this.total=result.data.total;
            this.list = result.data.list;
          }
        })
        .catch(error => {
          alert(error);
        });
    },
    //改变当前页
    handleSizeChange(){

    },
    //显示商品详情
    searchbyid(proid) {
      this.$axios
        .get("http://www.wxhwg.com:8080/mock/product/find", {
          params: {
            productId: proid
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            this.dialogFormVisible = true;
            this.list1 = result.data;
            this.form = this.list1;
          }
        })
        .catch(error => {
          alert(error);
        });
    },
    //缺货设置
    lack() {
      this.$axios
        .get("http://www.wxhwg.com:8080/mock/product/lack", {
          params: {
            id: ""
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            alert(result.message);
          }
        })
        .catch(error => {
          alert(error);
        });
    },

    //删除商品
    drop(proid) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.$axios
            .get("http://www.wxhwg.com:8080/mock/product/drop", {
              params: {
                productId: proid
              }
            })
            .then(response => {
              let result = response.data;
              if (result.status == 200) {
                alert(result.message);
                this.list.splice(proid, 1); //动态删除无刷新
                this.handleCurrentChange(1);
              }
            })
            .catch(error => {
              alert(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //重新上货
    nolack(proid) {
      this.$axios
        .get("http://www.wxhwg.com:8080/mock/product/noLack", {
          params: {
            id: proid
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            alert(result.message);
          }
        })
        .catch(error => {
          alert(error);
        });
    },
    
  }
};
</script>
 <style scoped>
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  float: right;
 
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.box {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
</style>
