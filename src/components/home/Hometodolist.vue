<template>
  <div style="width:24%">
    <el-card>
      <div>
        <div class="box">
          <div>﹀</div>
          <div>Todo List</div>
        </div>
        <div v-for="(item,index) in list " :key="index" @mouseenter="enter(item)" @mouseleave="leave(item)">
          <div class="box1">
            <div>
              <input type="checkbox" v-model="item.checked" />
              {{item.name}}
            </div>
            <div>
              <el-button type="primary" plain v-if="item.flag===true" @click="deletes(item,index)">删除</el-button>
            </div>
          </div>
        </div>
        <div class="box2">
          <div>{{length}}items left</div>
          <button @click="all">All</button>
          <div @click="active">Acive</div>
          <div @click="completed">Completed</div>
        </div>
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
      list: [],
      list1: []
    };
  },
  //监听方法  click事件等
  methods: {
    //请求todolist的数据
    getData() {
      axios
        .get("/api/todoList")
        .then(res => {
          //  console.log(res.data)
          // 赋值
          if (res.data.code === 0) {
            this.list = res.data.data;
            this.list1 = res.data.data;
            // console.log(this.list);
            this.list.map(item=>{
              this.$set(item, 'flag', false)
            })
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //鼠标移入事件
    enter(item){
      item.flag = true;
    },
    //鼠标移出事件
    leave(item){
      item.flag = false
    },
    //删除事件
    deletes(item,index){
      this.list.splice(index,1)
    },
    //点击All
    all() {
      this.list = this.list1;
    },
    //过滤没选中的
    active() {
      this.list = this.list1.filter(item => {
        return item.checked === false;
      });
      // console.log(this.list1);
    },
    //过滤选中的
    completed() {
      this.list = this.list1.filter(item => {
        return item.checked === true;
      });
    }
  },
  //挂载
  mounted() {
    this.getData();
  },
  watch: {},
  //计算
  computed: {
    //计算数组长度
    length() {
      let arr2 = this.list.filter(item => {
        return item.checked === false;
      });
      return arr2.length;
    }
  }
};
</script>

<style scoped lang='scss'>
.box {
  display: flex;
  justify-content: space-between;
}
.box1 {
  height: 52px;
  display: flex;
  justify-content: space-between;
}
.box2 {
  display: flex;
  justify-content: space-between;
}
</style>