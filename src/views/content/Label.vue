<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="length1"  name="first">
        <el-card>
          <div v-for="(item,index) in unread" :key="index">
            <div class="box1">
              <div>
                <div>{{item.name}}</div>
              </div>
              <div class="box2">
                <div class="right">{{item.time}}</div>
                <el-button @click="markasread(item,index)">标为已读</el-button>
              </div>
            </div>
          </div>
          <div class="box3">
          <el-button type="primary" @click="markasreads">全部标为已读</el-button>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane :label="length2" name="second">
         <el-card>
          <div v-for="(item,index) in read" :key="index">
            <div class="box1">
              <div>
                <div>{{item.name}}</div>
              </div>
              <div class="box2">
                <div class="right">{{item.time}}</div>
                <el-button @click="deletes(item,index)" >删除</el-button>
              </div>
            </div>
          </div>
          <div class="box3">
          <el-button type="danger" @click="deletess">删除全部</el-button>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane :label="length3" name="third">
         <el-card>
          <div v-for="(item,index) in recovery" :key="index">
            <div class="box1">
              <div>
                <div>{{item.name}}</div>
              </div>
              <div class="box2">
                <div class="right">{{item.time}}</div>
                <el-button type="warning" @click="reduction(item,index)">还原</el-button>
              </div>
            </div>
          </div>
          <div class="box3">
          <el-button type="info" @click="reductions">清空回收站</el-button>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {},
  // 定义变量
  data() {
    return {
      activeName: "first",
      unread: [
        {
          name: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
          time: "2018-04-19 20:00:00"
        },
        {
          name: "今晚12点整发大红包，先到先得",
          time: "2018-04-19 21:00:00"
        }
      ],
      read: [
        {
          name: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
          time: "2018-04-19 20:00:00"
        }
      ],
      recovery: [
        {
          name: "【系统通知】您的优惠券已经过期",
          time: "2018-04-19 20:00:00"
        }
      ]
    };
  },
  //监听方法  click事件等
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //标记已读
    markasread(item,index){
       this.read.push(item),
       this.unread.splice(index,1)
    },
    //全部标为已读
    markasreads(){
       this.unread.map(item =>{
          this.read.push(item)
       })
       this.unread.splice(0)
    },
   //已读消息删除
   deletes(item,index){
      this.recovery.push(item),
      this.read.splice(index,1)
   },
   //删除全部已读消息
   deletess(){
      this.read.map(item=>{
         this.recovery.push(item)
      })
      this.read.splice(0)
   },
   //回收站还原
   reduction(item,index){
      this.read.push(item),
      this.recovery.splice(index,1)
   },
   //清空回收站
   reductions(){
      this.recovery.splice(0)
   }
  },
  //挂载
  mounted() {},
  watch: {},
  //计算
  computed: {
     length1(){
        let a = `未读消息（${this.unread.length}）`
        return a
     },
     length2(){
        let b = `已读消息（${this.read.length}）`
        return b
     },
     length3(){
        let c = `回收站（${this.recovery.length}）`
        return c
     }
  }
};
</script>

<style scoped lang='scss'>
.box1 {
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding: 10px;
}
.box2 {
  display: flex;
  .right{
     margin-right: 20px;
  }
}
.box3{
   padding: 10px;
}
</style>