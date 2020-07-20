<template>
  <div>
    <div class="navigation">
      <div>今日发布{{this.number1}}</div>
      <div>原创文章{{this.number}}</div>
      <div>新留言</div>
      <div>新消息</div>
    </div>
    <div>
      <el-card>
        <div class="box">
          <div class="box1">
            <ve-pie :data="chartData"></ve-pie>
          </div>
          <div class="box1">
            <ve-pie :data="chartDatas"></ve-pie>
          </div>
        </div>
      </el-card>
      <el-card>
        <ve-waterfall :data="chartDatass"></ve-waterfall>
      </el-card>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import axios from "axios";
import lodash from "lodash";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {},
  // 定义变量
  data() {
    return {
       number: '',
       number1: '',
      chartData: {
        columns: ["分类", "数量"],
        rows: []
      },
      chartDatas: {
        columns: ["分类", "数量"],
        rows: []
      },
      chartDatass: {
        columns: ["时间", "数量"],
        rows: []
      }
    };
  },
  //监听方法  click事件等
  methods: {
    getData() {
      axios
        .get("/api/article/allArticle")
        .then(res => {
         //  console.log(res.data);
         //统计发布文章类型
          let category = lodash.groupBy(res.data.data, "category");
          for (let i in category) {
            let obj = {};
            obj["分类"] = i;
            obj["数量"] = category[i].length;
            this.chartData.rows.push(obj);
            //  console.log(i)
            //  console.log(category[i])
          }
            //统计发布方式类型
          let source = lodash.groupBy(res.data.data, "source");
          for (let j in source) {
             if(j === '原创'){
                this.number = source[j].length
             }
            let abc = {};
            abc["分类"] = j;
            abc["数量"] = source[j].length;
            this.chartDatas.rows.push(abc);
            //  console.log(j)
            //  console.log(category[j])
          }
            // console.log(source)
            //统计发布日期
          let date = lodash.groupBy(res.data.data, "date");
          for (let k in date) {
            let abd = {};
            //获取发布文章的日
            let time = dayjs(k).format('YYYY年MM月DD日')
            //获取当前日
            let nowtime = dayjs().format('YYYY年MM月DD日')
            if(time === nowtime){
               this.number1++
            }
            // console.log(time)
            // console.log(nowtime)
            abd["时间"] =dayjs(k).format('YYYY年MM月DD日HH时');
            abd["数量"] = date[k].length;
            this.chartDatass.rows.push(abd);
            //  console.log(k)
            //  console.log(category[k])
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  //挂载
  mounted() {
    this.getData();
  },
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
.navigation {
  display: flex;
}
.navigation > div {
  flex: 1;
}
.box {
  display: flex;
  .box1 {
    width: 50%;
  }
}
</style>