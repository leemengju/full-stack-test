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
          <!-- 這表示這個 <template> 是一個具名插槽（slot），名稱為 default，並且接收一個叫做 row 的資料物件作為插槽的上下文參數。 -->
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
// <-------------------------------------------引用--------------------------------------->
// ref：是 Vue 3 的響應式 API，用來建立「可變的響應式資料」。
import { ref, onMounted } from 'vue'
// ElMessage：Element Plus 的訊息提示，例如錯誤、成功提示。
// ELMessage無title彈窗;ELMessageBox有title彈窗
import { ElMessage, ElMessageBox } from 'element-plus'
// 引入 API 文件
import { postApi } from '../api'

// <------------------------------------------定義參數--------------------------------------->
// ref就是v-model，雙向綁定
const posts = ref([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const form = ref({
  title: '',
  content: ''
})
const currentId = ref(null)


// <------------------------------------------functions--------------------------------------->
// 获取所有文章
// // 因為 posts 是由 ref([]) 建立的 響應式引用物件（ref），真正的值是存在 posts.value 裡面。
// posts = {
  // value: []  // 真正的資料存在這裡
// }
//  .value 存取或改動值，Vue 會追蹤 posts.value 的變化，自動更新 UI
const fetchPosts = async () => {
  try {
    const data = await postApi.getAllPosts()
    console.log(data)
    posts.value = data
  } catch (error) {
    ElMessage.error('获取文章列表失败')
  }
}

// 显示新增对话框
const showAddDialog = () => {
 
  // 新增文章時，isEdit設為false，因為這是新增而不是編輯
  // 這樣在handleSubmit時就會執行createPost而不是updatePost
  isEdit.value = false
  dialogVisible.value = true
  form.value={
    title:"",
    content:""
  }
}

// 显示编辑对话框
const handleEdit = (row) => {
  isEdit.value = true
  dialogVisible.value = true
  currentId.value = row.id
  form.value = {
    title: row.title,
    content: row.content
  }
 
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
    // 當使用者點擊取消按鈕時，error 會是 'cancel'，這時不需要顯示錯誤訊息
    // 只有在真正發生錯誤時才顯示錯誤訊息
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

// 提交表单
// 先編輯(傳入id,form)，後新增(id系統自動生成)，並重新渲染(fetchPosts)
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