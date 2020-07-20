<template>
 <div class="box">
    <div class="box1">
      <div>期待你的下次光临</div>
      <div>
         <el-button type="primary" @click="out">确认退出</el-button>
      </div>
    </div>
 </div>
</template>

<script>
import axios from "axios"
 export default {
   name: '',
//接收父组件传递过来的参数
   props: {
   },
   components: {

   },
// 定义变量
   data () {
     return {

     }
   },
//监听方法  click事件等
   methods: {
      out(){
         axios.get('/api/user/logout').then(res=>{
            console.log(res.data)
            localStorage.clear()
            this.$router.push('/register')
         }).catch(err=>{
            console.log(err)
         })
      },
   },
//挂载
   mounted() {
   
   },
   watch: {

   },
//计算
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.box{
   height: 80vh;
   position: relative;
}
.box1{
   font-size: 40px;
   text-align: center;
   position: absolute;
   top: 20%;
   left: 30%;
}
</style>