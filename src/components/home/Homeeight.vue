<template>
  <div style="width:24%">
    <el-card>
      <div class="box"></div>
      <div v-for="(item,index) in arr" :key="index">
        <div>{{item.name}}</div>
        <el-progress :percentage="item.progress*100" v-if="item.progress*100 != 100"></el-progress>
        <el-progress :percentage="item.progress*100" status="success" :format='format' v-if="item.progress*100 == 100"></el-progress>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {},
  // 定义变量
  data() {
    return {
        arr:[],
    };
  },
  //监听方法  click事件等
  methods: {
      format(percentage) {
        return percentage === 100 ? '满' : `${percentage}%`;
      },
      //请求进度条数据
      getData(){
          axios.get("/api/progress").then(res=>{
            //   console.log(res.data)
              if(res.data.code === 0){
                  //赋值
                  this.arr = res.data.data
                //   console.log(this.arr)
              }
          }).catch(err=>{
              console.log(err)
          })
      }
  },
  //挂载
  mounted() {
      this.getData()
  },
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
.box{
    width: 100%;
    height: 200px;
    background: url('https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-bottom: 30px;
}
</style>