<template>
  <div class="home">
    <el-container height="100%" width="200px">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
      >
        <el-menu-item index="1-1">
          <i class="el-icon-s-unfold" style="line-height:56px" @click="collapse()"></i>
        </el-menu-item>
        <el-submenu index="1">
          
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span>用户管理</span>
          </template>
          <router-link :to="{path:'/home/user'}">
            <el-menu-item index="1-1">用户查询</el-menu-item>
          </router-link>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span>订单管理</span>
          </template>
          <router-link :to="{path:'/home/order'}">
            <el-menu-item index="1-1">订单查询</el-menu-item>
          </router-link>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-shopping-bag-1"></i>
            <span>商品管理</span>
          </template>
          <router-link :to="{path:'/home/searchproduct'}">
            <el-menu-item index="1-1">商品查询</el-menu-item>
          </router-link>
          <router-link :to="{path:'/home/newproduct'}">
            <el-menu-item index="1-2">商品上架</el-menu-item>
          </router-link>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-notebook-2"></i>
            <span>类别管理</span>
          </template>
          <router-link :to="{path:'/home/category'}">
            <el-menu-item index="1-1">类别查询</el-menu-item>
          </router-link>
        </el-submenu>
      </el-menu>

      <!-- </div>      -->

      <el-container>
        <el-header height="80px">
          <router-link :to="{path:'/home/first'}">
            <i class="el-icon-s-home"></i>
            首页
          </router-link>
        </el-header>
        <el-main style="height:670px">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      isCollapse: false,

      isc: true
    };
  },
  methods: {
    //折叠导航栏
    collapse() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>
<style>
.el-header {
  background: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
  height: 100px;
}

.el-main {
  background-color: #f5f5f5;
  color: #333;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-col {
  height: 740px;
  width: 200px;
}
.el-header a {
  float: left;
  text-decoration: none;
  color: dimgray;
  line-height: 80px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

