<template>
   <div class="app">
    <Title :titleContent="titleContent"/>
    <InputComponent v-model:titleContent="titleContent" placeholder="Hello Lancer" />
    <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  <el-container>
    <el-header>
      <el-menu mode="horizontal" router>
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/about">关于</el-menu-item>
        <el-menu-item index="/test">測試</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <!-- <router-view> 是 Vue Router 的一个核心组件，它的作用是：
路由出口：它作为路由组件的渲染出口，会根据当前的路由路径显示对应的组件内容
动态内容区域：当用户点击导航菜单（如"首页"或"关于"）时，<router-view> 会动态替换为相应的页面组件
单页应用的核心：在你的应用中，它位于 <el-main> 容器内，这意味着页面内容会在这个主内容区域中切换显示 -->
      <router-view></router-view>
    </el-main>
  </el-container>
  
 </div>
</template>
<script >
import { ElContainer, ElHeader, ElMain, ElMenu, ElMenuItem } from 'element-plus'
import HelloWorld from './components/HelloWorld.vue'
import Title from './components/Title.vue'
import InputComponent from './components/InputComponent/index.vue'

export default{
  name:"App",
  data(){
    return{
      titleContent:"Hello Lancer",
    
    }
  },
  components:{
    HelloWorld,
    Title,
    InputComponent
  },
};
// methods:{
//   handleTextContentChange(val){
//     this.titleContent = val
//   }
// }
</script>
<style>
.el-header {
  padding: 0;
}
</style>
