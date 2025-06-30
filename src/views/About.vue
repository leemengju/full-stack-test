<template>
  <div class="about">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>关于</span>
        </div>
      </template>
      <div class="text item">
        这是一个使用 Vue 3 和 Element Plus 构建的示例项目
      </div>
    </el-card>
    <br>
    <br>
      <!-- 子路由info頁面 -->
       <el-button-group>
      <el-button @click="gocv">cv</el-button>
      <el-button @click="goInfo">info</el-button>
       </el-button-group>
      <router-view></router-view>
  </div>
</template>

<script setup>
import { ElCard } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const goInfo = () => {
  router.push('/about/info')
}
const gocv = () => {
  router.push('/about/cv')
}
</script>

<style scoped>
.about {
  padding: 20px;
}
.box-card {
  width: 480px;
  margin: 0 auto;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style> 