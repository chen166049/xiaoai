<template>
  <div class="box">
    <div class="box1">欢迎来到小爱后台管理系统</div>
    <div class="box2">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="form.code" placeholder="请输入验证码" style="width:200px"></el-input>
          <div v-html="codeimg" @click="codes"></div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:35%" @click="register">注册</el-button>
          <el-button type="primary" style="width:35%" @click="land">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {},
  // 定义变量
  data() {
    return {
      codeimg:'',
      form: {
        username: "",
        password: "",
        code:''
      },
      //验证规则
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 2, max: 8, message: "用户名在2-8位之间", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 10, message: "密码在6-10位之间", trigger: "blur" }
        ],
        code:[
           { required: true, message: "验证码不能为空", trigger: "blur" },
        ]
      }
    };
  },
  //监听方法  click事件等
  methods: {
    //跳转到注册
    register() {
      this.$router.push("/land");
    },
    //登录
    land() {
      this.$refs.form.validate(vaild=>{
        if(vaild){
          axios.post('/api/user/login',{
            username:this.form.username,
            password:this.form.password,
            code:this.form.code
          }).then(res=>{
            if(res.data.code === 200){
              console.log(res.data)
              //登录成功清空输入框
              this.form.username='',
              this.form.password='',
              this.form.code='',
              //登录成功存入数据
              localStorage.setItem('username',JSON.stringify(res.data.data))
              //登录成功跳转
              this.$router.push('/homepage')
              //提示登录成功
              this.$message.success(res.data.message)
            }else{
              //验证码或密码输入错误提示用户不存在
              this.$message.error(res.data.message)
            }
            console.log(res.data)
          }).catch(err=>{
            console.log(err)
          })
        }else{
           //有输入框未输入提示登录失败
          this.$message.error('登录失败')
        }
      })
    },
    //刷新验证码图片
    codes(){
       axios.get('/api/captcha').then(res=>{
        window.console.log('验证码图片',res.data)
        this.codeimg=res.data
     }).catch(err=>{
        window.console.log(err)
     })
    }
  },
  //挂载
  mounted() {
     //初始化获取验证码图片
     axios.get('/api/captcha').then(res=>{
        window.console.log('验证码图片',res.data)
        this.codeimg=res.data
     }).catch(err=>{
        window.console.log(err)
     })
  },
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
.box {
  width: 100%;
  height: 400px;
  background: rgb(99, 228, 228);
  display: flex;
  flex-wrap: wrap;
  .box1 {
    width: 100%;
    height: 50px;
    font-size: 30px;
    color: rgb(14, 151, 21);
    text-align: center;
  }
  .box2 {
    width: 100%;
  }
}
</style>