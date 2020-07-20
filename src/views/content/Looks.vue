<template>
 <div>
    <div><el-button type="danger" @click="returns">返回</el-button></div>
    <div>
      <div>{{arr.title}}</div>
      <div>摘要:{{arr.abstract}}</div>
      <div>发表于:{{arr.date}}</div>
      <div>
         <el-card>{{arr.text}}</el-card>
      </div>
    </div>
 </div>
</template>

<script>
import axios from 'axios'
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
        arr: '',
     }
   },
//监听方法  click事件等
   methods: {
      //点击返回
      returns(){
         this.$router.push('/releases')
      }
   },
//挂载
   mounted() {
      //获取查看文章的数据
     let number = this.$route.query.id
      // console.log(number)
      axios.post('/api/article/article',{_id:number}).then(res=>{
         // console.log(res.data)
         if(res.data.code === 200){
            this.arr = res.data.data
         }
      }).catch(err=>{
         console.log(err)
      })
   },
   watch: {

   },
//计算
   computed: {

   }
 }
</script>

<style scoped lang='scss'>

</style>