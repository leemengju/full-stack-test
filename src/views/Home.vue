<template>
  <div class="home">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>首页</span>
        </div>
      </template>
      <div class="text item">
        欢迎使用 Vue 3 + Element Plus
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ElCard } from 'element-plus'
</script>

<style scoped>
.home {
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