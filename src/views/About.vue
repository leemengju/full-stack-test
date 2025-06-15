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
  </div>
</template>

<script setup>
import { ElCard } from 'element-plus'
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