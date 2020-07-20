<template>
  <div>
    <div class="navigation">
      <el-button type="danger" @click="looks">查看</el-button>
      <el-button type="primary" @click="release">发布</el-button>
    </div>
    <div>
      <el-form
        :model="ruleForm"
        :rules="rules"
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
              <el-select v-model="ruleForm.category" placeholder="请选择">
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
              <el-select v-model="ruleForm.source" placeholder="请选择">
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
              <el-select v-model="ruleForm.star" placeholder="请选择">
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
              <el-date-picker v-model="ruleForm.date" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </div>
        </div>
        <mavon-editor v-model="ruleForm.text" prop="text" />
        <div class="button">
          <el-button type="primary" @click="release">发布</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
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
      rules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        abstract: [
          { required: true, message: "请输入文章摘要", trigger: "blur" }
        ],
        author: [{ required: true, message: "请输入作者", trigger: "blur" }],
        category: [{ required: true, message: "请选择",}],
        source: [{ required: true, message: "请选择",}],
        star: [{ required: true, message: "请选择",}],
        date: [{ required: true, message: "请选择时间和日期", trigger: "blur" }],
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
    //发表文章
    release(){
      this.$refs.ruleForm.validate(vaild=>{
        if(vaild){
          axios.post('/api/article/create',{
            title:this.ruleForm.title,
            abstract:this.ruleForm.abstract,
            author:this.ruleForm.author,
            category:this.ruleForm.category,
            source:this.ruleForm.source,
            star:this.ruleForm.star,
            text:this.ruleForm.text,
            date:this.ruleForm.date,
          }).then(res=>{
            if(res.data.code === 200){
            this.$message.success(res.data.data)
            this.$router.push('/releases')
            // this.ruleForm=''
              // this.ruleForm.title='',
              // this.ruleForm.abstract='',
              // this.ruleForm.author='',
              // this.ruleForm.category='',
              // this.ruleForm.source='',
              // this.ruleForm.star='',
              // this.ruleForm.text='',
              // this.ruleForm.date=''
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
    //查看跳转到已发布
    looks(){
      this.$router.push('/releases')
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
.navigation {
  width: 100%;
  display: flex;
  justify-content: flex-end;
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