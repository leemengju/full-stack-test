<template>
 <!-- 父元件傳遞的參數 -->
<h1>{{titleContent}}</h1>


</template>

<script >
export default{
name:"title",
// data(){
//     return{
//         title:"Hello Lancer"
//     }
// }

// 父元件傳遞的參數
props:{
    titleContent:{
        type:String,
        required:true
    }
}
}
</script>

<!-- scoped:限制style只用在該coms，其他引用的母元件不會被影響 -->

<style scoped>
h1{
    color:orange;
}
</style>

