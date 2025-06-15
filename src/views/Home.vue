<template>
  <div class="home">
    <el-card class="box-card">

      <template #header>
        <div class="card-header">
          <span>文章列表</span>
          <el-button type="primary" @click="showAddDialog">新增文章</el-button>
        </div>
      </template>
      
      <el-table :data="posts" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="content" label="内容" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑文章' : '新增文章'"
      width="50%"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item label="标题">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="form.content" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
// ref：是 Vue 3 的響應式 API，用來建立「可變的響應式資料」。
import { ref, onMounted } from 'vue'
// ElMessage：Element Plus 的訊息提示，例如錯誤、成功提示。
import { ElMessage, ElMessageBox } from 'element-plus'
import { postApi } from '../api'

const posts = ref([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const form = ref({
  title: '',
  content: ''
})
const currentId = ref(null)

// 获取所有文章
const fetchPosts = async () => {
  try {
    const data = await postApi.getAllPosts()
    posts.value = data
  } catch (error) {
    ElMessage.error('获取文章列表失败')
  }
}

// 显示新增对话框
const showAddDialog = () => {
  isEdit.value = false
  form.value = {
    title: '',
    content: ''
  }
  dialogVisible.value = true
}

// 显示编辑对话框
const handleEdit = (row) => {
  isEdit.value = true
  currentId.value = row.id
  form.value = {
    title: row.title,
    content: row.content
  }
  dialogVisible.value = true
}

// 处理删除
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定要删除这篇文章吗？', '提示', {
      type: 'warning'
    })
    await postApi.deletePost(row.id)
    ElMessage.success('删除成功')
    fetchPosts()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

// 提交表单
const handleSubmit = async () => {
  try {
    if (isEdit.value) {
      await postApi.updatePost(currentId.value, form.value)
      ElMessage.success('更新成功')
    } else {
      await postApi.createPost(form.value)
      ElMessage.success('创建成功')
    }
    dialogVisible.value = false
    fetchPosts()
  } catch (error) {
    ElMessage.error(isEdit.value ? '更新失败' : '创建失败')
  }
}

onMounted(() => {
  fetchPosts()
})
</script>

<style scoped>
.home {
  padding: 20px;
}
.box-card {
  width: 100%;
  margin: 0 auto;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style> 