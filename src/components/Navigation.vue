<template>
  <div class="box">
    <div class="box1">
      <div>欢迎{{username.username}}来到小爱后台管理系统</div>
      <div>{{hello}},亲爱的{{username.username}}上次登录时间：{{time}}</div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {},
  // 定义变量
  data() {
    return {
      username:'',
      time:'',
      hello:''
    };
  },
  //监听方法  click事件等
  methods: {},
  //挂载
  mounted() {
    //取出存入的数据
    // console.log(JSON.parse(localStorage.getItem('username')))
    let num = JSON.parse(localStorage.getItem('username'))
    // console.log(num)
    //取出数据里面需要的对象
    this.username = num[0]
    // console.log(this.username)
    //获取到的时间格式化
    this.time = dayjs(this.username.date).format('YYYY年MM月DD日HH时mm分ss秒')
    // console.log(this.time)
    //获取当前时间的小时
    let time1 = dayjs().hour()
    // console.log(time1)
    //根据小时进行判断
    if(time1>6 && time1<=12){
      this.hello = '早上好'
    }else if(time1>12 && time1<=14){
      this.hello = '中午好'
    }else if(time1>14 && time1<=18){
      this.hello = '下午好'
    }else if(time1>18 && time1<=24){
      this.hello = '晚上好'
    }else{
      this.hello = '该睡觉了'
    }
  },
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
.box{
    width: 100%;
    background: #2e5e85;
    .box1{
    width: 100%;
    color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    }
}
</style>