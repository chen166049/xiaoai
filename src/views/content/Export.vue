<template>
  <div>
    <el-card>
      <div style="width:250px">
        <el-input v-model="input" placeholder="请输入内容" @keydown.enter.native="leave" ></el-input>
      </div>
      <div>
        <div class="box">
          <div class="box1">名称</div>
          <div class="box2">商品编号</div>
          <div class="box3">原价</div>
          <div class="box4">现价</div>
          <div class="box5">操作</div>
        </div>
        <div
          v-for="(item,index) in arr.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          :key="index"
        >
          <div class="box">
            <div class="box1">{{item.NAME}}</div>
            <div class="box2">{{item.GOODS_SERIAL_NUMBER}}</div>
            <div class="box3">{{item.ORI_PRICE}}</div>
            <div class="box4">{{item.PRESENT_PRICE}}</div>
            <div class="box5">
              <el-button type="primary" @click="modify(item,index)">修改</el-button>
              <el-button type="danger" @click="deletes(item,index)">删除</el-button>
            </div>
          </div>
        </div>
        <el-dialog :visible.sync="dialogFormVisible">
          <el-form>
            <el-form-item label="名称:" :label-width="formLabelWidth">
              <el-input v-model="NAME" autocomplete="off" class="width"></el-input>
            </el-form-item>
          </el-form>
          <el-form>
            <el-form-item label="原价:" :label-width="formLabelWidth">
              <el-input v-model="ORI_PRICE" autocomplete="off" class="width"></el-input>
            </el-form-item>
          </el-form>
          <el-form>
            <el-form-item label="现价:" :label-width="formLabelWidth">
              <el-input v-model="PRESENT_PRICE" autocomplete="off" class="width"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="determine">确 定</el-button>
          </div>
        </el-dialog>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="arr.length"
        ></el-pagination>
      </div>
      <download-excel
        class="export-excel-wrapper"
        :fetch="fetchData"
        :fields="json_fields"
        name="filename.xls"
        type="xls"
      >
        <el-button type="primary">导出xls</el-button>
      </download-excel>
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
      input: '',
      json_fields: {
        名称: "NAME",
        商品编号: "GOODS_SERIAL_NUMBER",
        原价: "ORI_PRICE",
        现价: "PRESENT_PRICE"
      },
      arr: [],
      currentPage: 1,
      pagesize: 10,
      dialogFormVisible: false, //弹出框显示默认为false
      formLabelWidth: "100px", //弹出框中输入框前文字的宽度
      NAME: "", //弹出框输入框名称的内容
      ORI_PRICE: "", //弹出框输入框原价的内容
      PRESENT_PRICE: "", //弹出框输入框现价的内容
      number: "" //记录下标
    };
  },
  //监听方法  click事件等
  methods: {
    //请求表格的数据
    getDate() {
      axios
        .get("/api/tableData")
        .then(res => {
          // console.log(res.data)
          //赋值
          if (res.data.code === 0) {
            this.arr = res.data.data;
            // console.log(this.arr);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      // console.log(`当前页: ${val}`);
    },
    //点击删除
    deletes(item, index) {
      //获得点击删除项在整个数组中的下标
      let a = index + (this.currentPage - 1) * this.pagesize;
      // console.log(a)
      this.arr.splice(a, 1);
    },
    //点击修改
    modify(item, index) {
      //获得点击删除项在整个数组中的下标
      this.number = index + (this.currentPage - 1) * this.pagesize;
      // console.log(this.number);
      this.dialogFormVisible = true;
      this.NAME = item.NAME;
      this.ORI_PRICE = item.ORI_PRICE;
      this.PRESENT_PRICE = item.PRESENT_PRICE;
    },
    //取消修改
    cancel() {
      this.dialogFormVisible = false;
    },
    //确定修改
    determine() {
      this.arr[this.number].NAME = this.NAME;
      this.arr[this.number].ORI_PRICE = this.ORI_PRICE;
      this.arr[this.number].PRESENT_PRICE = this.PRESENT_PRICE;
      this.dialogFormVisible = false;
    },
    //导出xls
    async fetchData() {
      const list = this.arr;
      return list;
    },
    //搜索
    leave(){
      // console.log('1')
      // console.log(this.input)
      this.currentPage = 1
      let abc = this.arr.filter(item =>{
        // console.log(item)
        return item.NAME.includes(this.input) 
      })
      this.arr = abc
    }
  },
  //挂载
  mounted() {
    this.getDate();
  },
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 5px;
  .box1 {
    flex: 1;
  }
  .box2 {
    flex: 1;
  }
  .box3 {
    flex: 1;
  }
  .box4 {
    flex: 1;
  }
  .box5 {
    flex: 1;
  }
}
.width {
  width: 400px;
}
</style>