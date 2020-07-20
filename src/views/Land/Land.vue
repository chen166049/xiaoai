<template>
  <div class="box">
      <div class="box1">欢迎来到小爱后台管理系统</div>
      <div class="box2">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
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
      form: {
        username: "",
        password: ""
      },
      //验证规则
      rules:{
        username:[
          {required:true, message:'用户名不能为空', trigger:'blur'},
          {min:2, max:8, message:'用户名在2-8位之间', trigger:'blur'}
        ],
        password:[
          {required:true, message:'密码不能为空', trigger:'blur'},
          {min:6, max:10, message:'密码在6-10位之间', trigger:'blur'}
        ]
      }
    };
  },
  //监听方法  click事件等
  methods: {
    //点击注册
    register(){
      this.$refs.form.validate(vaild=>{
        if(vaild){
          axios.post('/api/user/register',{
            username:this.form.username,
            password:this.form.password,
          }).then(res=>{
            if(res.data.code === 200){
              //注册成功清空输入框
              this.form.username='',
              this.form.password='',
              //注册成功提示注册成功
              this.$message.success(res.data.message)
              this.$router.path('/register')
            }else{
              //用户名已存在提示用户名已存在
              this.$message.error(res.data.message)
            }
            console.log(res.data)
          }).catch(err=>{
            console.log(err)
          })
        }else{
          //输入框有未输入提示注册有误
          this.$message.error('注册有误')
        }
      })
    },
    //跳转到登录
    land(){
      this.$router.push('/register')
    }
  },
  //挂载
  mounted() {},
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
.box{
  width: 100%;
  height: 400px;
  background:  rgb(99, 228, 228);
  display: flex;
  flex-wrap: wrap;
  .box1{
    width:100%;
    height: 50px;
    font-size: 30px;
    color: rgb(14, 151, 21);
    text-align: center;
  }
  .box2{
    width: 100%;
  }
}
</style>