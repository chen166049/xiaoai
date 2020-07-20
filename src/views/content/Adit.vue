<template>
  <div>
    <div>
      <div class="navigation">
      <el-button type="danger" @click="returns">返回</el-button>
      <el-button type="primary" @click="release">发布</el-button>
    </div>
    </div>
    <div>
      <el-form
        :model="ruleForm"
        
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="文章摘要" prop="abstract">
          <el-input v-model="ruleForm.abstract"></el-input>
        </el-form-item>
        <div class="top">
          <div>
            <el-form-item label="作者" prop="author">
              <el-input v-model="ruleForm.author"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="类目" prop="category">
              <el-select v-model="ruleForm.category" >
                <el-option
                  v-for="item in category"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="来源" prop="source">
              <el-select v-model="ruleForm.source">
                <el-option
                  v-for="item in source"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="重要性" prop="star">
              <el-select v-model="ruleForm.star">
                <el-option
                  v-for="item in star"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="data">
            <el-form-item label="发布日期" prop="date">
              <el-date-picker v-model="ruleForm.date" type="datetime"></el-date-picker>
            </el-form-item>
          </div>
        </div>
        <mavon-editor v-model="ruleForm.text" prop="text" />
        
      </el-form>
    </div>
  </div>
</template>

<script>
import  axios from 'axios'
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {

  },
  components: {},
  // 定义变量
  data() {
    return {
       ruleForm: {
        title: "",//文章标题
        abstract: "",//文章摘要
        author: "",//作者
        category: "",//类目默认
        source: "",//来源默认
        star: "", //重要性默认
        date: "",//发布日期
        text: ""//文章内容
      },
      //类目
      category: [
        {
          value: "Vue",
          label: "Vue"
        },
        {
          value: "React",
          label: "React"
        },
        {
          value: "Node.js",
          label: "Node.js"
        },
        {
          value: "性能优化",
          label: "性能优化"
        },
        {
          value: "JaveScript",
          label: "JaveScript"
        },
        {
          value: "小程序",
          label: "小程序"
        },
        {
          value: "工具类",
          label: "工具类"
        },
        {
          value: "其他",
          label: "其他"
        }
      ],
      //来源
      source: [
        {
          value: "原创",
          label: "原创"
        },
        {
          value: "转载",
          label: "转载"
        },
        {
          value: "与他人合作",
          label: "与他人合作"
        }
      ],
      //重要性
      star: [
        {
          value: "1",
          label: "1"
        },
        {
          value: "2",
          label: "2"
        },
        {
          value: "3",
          label: "3"
        },
        {
          value: "4",
          label: "4"
        },
        {
          value: "5",
          label: "5"
        }
      ]
    };
    
  },
  //监听方法  click事件等
  methods: {
     //点击返回
     returns(){
        this.$router.push('/releases')
     },
     //编辑完点击发布
     release(){
      this.$refs.ruleForm.validate(vaild=>{
        if(vaild){
          axios.post('/api/article/update',{
            id: this.$route.query.id,
            title:this.ruleForm.title,
            abstract:this.ruleForm.abstract,
            author:this.ruleForm.author,
            category:this.ruleForm.category,
            source:this.ruleForm.source,
            star:this.ruleForm.star,
            text:this.ruleForm.text,
            date:this.ruleForm.date,
          }).then(res=>{
            if(res.data.success === true){
               this.$router.push('/releases')
            // this.$message.success(res.data.data)
            // this.$router.push('/releases')
            }else{
              this.$message.error('发布失败')
            }
            // console.log(res.data)
          }).catch(err=>{
            console.log(err)
          })
        }else{
          this.$message.error('有必填项未填')
        }
      })
    },
  },
  //挂载
  mounted() {
     //获取编辑文章的数据
     let number = this.$route.query.id
      // console.log(number)
      axios.post('/api/article/article',{_id:number}).then(res=>{
         // console.log(res.data)
         if(res.data.code === 200){
            this.ruleForm = res.data.data
         }
      }).catch(err=>{
         console.log(err)
      })    
  },
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
.navigation {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;
  background: #59a586;
}
.top {
  display: flex;
  justify-content: space-between;
}
.data {
  display: flex;
  justify-content: center;
}
.button {
  display: flex;
  justify-content: center;
}
</style>