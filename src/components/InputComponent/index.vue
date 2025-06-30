<script>
export default{
    name:"InputComponent",
    props:{
        titleContent:{
            type:String,
            required:true
        }
    },
    computed:{
        inputText:{
            
            get(){
                return this.titleContent
            },
            set(val){
                // 子組件傳遞內容給父組件的方式
                // 做"textContentChange"事件，把val代入
                this.$emit("update:titleContent",val)
                console.log(val)
            }
        }
    }
    }
    // enxport default

</script>
<template src="./template.html"></template>
<style scoped src="./style.css">
</style>