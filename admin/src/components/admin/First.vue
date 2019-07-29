<template>
  <div class="samoyed-content">
    <div class="page-title">
      <h2>本年度销售报表</h2>
    </div>

    <div style="margin-top:20px">
      <el-input v-model="years" placeholder="请输入电话" style="width:100px"></el-input>
      <el-button @click="sale()" icon="el-icon-search" style="float:left;">搜索</el-button>
    </div>
    <schart
      :canvasId="canvasId"
      :type="type"
      :width="width"
      :height="height"
      :data="datas"
      :options="options"
    ></schart>
  </div>
</template>
<script>
import Schart from "vue-schart";
export default {
  data() {
    return {
      years: "",
      canvasId: "myCanvas",
      type: "bar",
      width: 500,
      height: 400,
      datas: [{ name: this.MONTHS, value: this.SUMER }],
      options: {
        bgColor: "#ffffff", // 默认背景颜色
        title: "", // 图表标题
        titleColor: "#000000", // 图表标题颜色
        titlePosition: "top", // 图表标题位置: top / bottom
        legendColor: "#000000", // 图例文本颜色
        legendTop: 40, // 图例距离顶部的长度
        colorList: ["#1E9FFF", "#13CE66", "#F7BA2A", "#FF4949", "#72f6ff"], // 饼图颜色列表
        radius: 100 // 饼图半径
      }
    };
  },
  components: {
    Schart
  },
  created() {
  },
  methods: {
    sale() {
      this.$axios
        .post("http://wxhwg.com:8080/mock/order/selectTop", {
          params: {
            year: this.years
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            this.datas = result.data;
             alert(result.message)
            console.log(JSON.stringify(result.data));
          }else{
            alert(result.message)
          }
        }).catch(error=>{
          console.log(error)
        })
    }
  }
};
</script>
<style>
.samoyed-content {
  widows: 800px;
  margin: 0 auto;
}
.section-title {
  margin: 0;
  height: 100px;
  border-left: 3px solid #4c84ff;
  text-align: center;
}
#chart_example {
  width: 60%;
  height: 500px;
  border: 1px solid red;
  margin: 0 auto;
}
</style>

