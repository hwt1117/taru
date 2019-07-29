<template>
  <div id="newproduct">
    <el-card class="box-card" style="height:620px">
      <div slot="header" class="clearfix">
        <span><h1>商品上架</h1></span>
      </div>
      <div>
        
<el-card class="box-card" style="width:500px;float:left" >
  <div slot="header" class="clearfix">
    <span><h3>基本信息</h3></span>
  </div>
  <div>
  
            
          <el-form :model="formInline" class="el-form-row">
            <el-form-item label="商品名称">
              <el-input
                style="height:40px;width:300px"
                v-model="formInline.productName"
                placeholder="商品名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品序列号">
              <el-input style="height:40px;width:300px" v-model="formInline.productCode"></el-input>
            </el-form-item>
            <el-form-item label="商品类别">
              <el-select style="height:40px;width:300px" v-model="catename" placeholder="请选择商品类别">
                <el-option v-for="item in list" :key="item.categoryId" :value="item.categoryName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品品牌">
              <el-input v-model="formInline.productBrandId" style="height:40px;width:300px"></el-input>
            </el-form-item>
            <el-form-item label="商品规格">
              <el-input v-model="formInline.productStandard" style="height:40px;width:300px"></el-input>
            </el-form-item>
            <el-form-item label="大单位规格">
              <el-input v-model="formInline.productlargerstandard" style="height:40px;width:300px"></el-input>
            </el-form-item>
          </el-form>
        </div>
   
</el-card>
        <el-card class="box-card" style="width:700px;float:right">
  <div slot="header" class="clearfix">
    <span><h3>价格库存</h3></span>

  </div>
  <div style="float:left;margin-left:5px">
            
          <el-form :model="formInline" class="el-form-row">
            <el-form-item :inline="true" label="建议零售价">
              <el-input v-model="formInline.productSuggestPrice" style="height:40px;width:200px"></el-input>
            </el-form-item>
            <el-form-item label="是否在销">
              <el-input v-model="formInline.productissale" style="height:40px;width:200px"></el-input>
            </el-form-item>
            <el-form-item label="是否缺货">
              <el-input v-model="formInline.productislack" style="height:40px;width:200px"></el-input>
            </el-form-item>
          </el-form>

          <el-form :inline="true" :model="formInline" class="el-form-row">
            <el-form-item label="大单位">
              <el-input v-model="formInline.productlargerunit" style="width:100px"></el-input>
            </el-form-item>
            <el-form-item label="大单位价格">
              <el-input v-model="formInline.productlargerprice" style="width:100px"></el-input>
            </el-form-item>
          </el-form>

          <el-form :inline="true" :model="formInline" class="el-form-row">
            <el-form-item label="小单位">
              <el-input v-model="formInline.productSmallUnit" style="width:100px"></el-input>
            </el-form-item>
            <el-form-item label="小单位价格 ">
              <el-input v-model="formInline.productSmallPrice" style="width:100px"></el-input>
            </el-form-item>
          </el-form>

          <el-form :inline="true" :model="formInline" class="el-form-row">
            排序：
            <el-input-number
              v-model="formInline.productOrder"
              controls-position="right"
              :min="1"
              :max="100"
            ></el-input-number>
          </el-form>

          <el-form :model="formInline" class="el-form-row">
            <!-- <el-form-item label="状态:" style="margin-top:10px">
              <el-input
                style="height:40px;width:200px;"
                v-model="formInline.productStatus"
                placeholder="状态"
                
              ></el-input>
            </el-form-item> -->
            <el-form-item label="状态">
              <el-select style="height:40px;width:200px;margin-top:10px" v-model="formInline.productStatus" placeholder="请选择状态">
                <el-option label="0" value="0"></el-option>
                <el-option label="1" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          
        </div>
        <div style="float:left ;height:200px;width:150px">
          <el-upload
            class="upload-demo"
            drag
            action="http://www.wxhwg.com:8080/mock/common/upload"
            name="image-file"
            :on-success="addphoto"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <p style="text-align:center;font-size:12px">只能上传jpg/png文件，且不超过500kb</p>
          </el-upload>

          <el-button type="primary" @click="addnewproduct()" style="margin-top:130px;margin-left:230px">确定添加</el-button>
        </div>
   
</el-card>

      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      catename: "",
      formInline: {
        productCode: "",
        productName: "",
        productCategoryId: "",
        productBrandId: "",
        productStandard: "",
        productLargerStandard: "",
        productSuggestPrice: "",
        productIsSale: "",
        productIsLack: "",
        productLargerUnit: "",
        productLargerPrice: "",
        productSmallUnit: "",
        productSmallPrice: "",
        productOrder: "",
        productStatus: "",
        productPhoto: ""
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    //上传图片
    addphoto(response) {
      this.formInline.productPhoto = response.data;
      alert(response.data);
    },

    //初始化商品类别
    init() {
      this.$axios
        .get("http://www.wxhwg.com:8080/mock/api/category/list")
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            this.list = result.data;
          }
        })
        .catch(error => {});
    },
    //类别名称赋给ID实现前台通过类别可以查到商品
    catenametoid() {
      var self = this;
      for (let i of this.list) {
        if (i.categoryName === self.catename) {
          self.formInline.productCategoryId = i.categoryId; //上架商品的类别名称获得类别id
        }
      }
    },
    //新上架商品
    addnewproduct() {
      var self = this;
      this.catenametoid();
      this.$axios
        .post(
          "http://www.wxhwg.com:8080/mock/product/add",
          this.$qs.stringify(this.formInline)
        )
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            alert(result.message);
          } else if (result.status == 500) {
            alert(result.message);
          }
        })
        .catch(error => {
          alert(result.message);
        });
    }
  }
};
</script>


<style>
</style>
