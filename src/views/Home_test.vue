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
import{ref,onMounted} from 'vue'
import {ElMessage,ElMessageBox} from 'element-plus'
import {postApi} from '../api'


const posts=ref([])
const dialogVisible=ref(false)
const isEdit=ref(false)
const form=ref({
title:"",
content:""

})
const currentId=ref(null)

const fetchPosts=async()=>{
try {
  const data=await postApi.getAllPosts()
  posts.value=data
}  catch{
  ElMessage.error("獲取文章列表失敗")
}
}

const showAddDialog=()=>{
 isEdit.value=false
 dialogVisible.value=true
 form.value={
  title:"",
  content:""
 }
    
}

const handleEdit=(row)=>{
  isEdit.value=true
  dialogVisible.value=true
  currentId.value=row.id
  form.value={
    title:row.title,
    content:row.content
  }

}

const handleDelete=async(row)=>{
  dialogVisible.value=true
  try{
    await ElMessageBox.confirm("確定要刪除這篇文章嗎？","提示",{
      type:"warning"
    })
    await postApi.deletePost(row.id)
    ElMessage.success("文章刪除成功")
    fetchPosts()
  }catch{
    if(error!=cancel){
      ElMessage.error("文章刪除失敗")
    } 
  }
}

const handleSubmit=async()=>{
try{if(isEdit.value){
  await postApi.updatePost(currentId.value,form.value)
}else{
  await postApi.createPost(form.value)
}
dialogVisible.value=false
fetchPosts()

}catch(error){
ElMessage.error(isEdit.value? "編輯文章失敗":"新增文章失敗")
}

}
// end of handleSubmit

onMounted(()=>{
    fetchPosts()
})






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