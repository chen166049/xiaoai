<template>
  <div>
    <div>
      <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
        <el-table-column type="index" label="#" width="50"></el-table-column>
        <el-table-column label="标题" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="作者" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类目" width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.category }}</span>
          </template>
        </el-table-column>
        <el-table-column label="来源" width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.source }}</span>
          </template>
        </el-table-column>
        <el-table-column label="重要性" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.star }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.date |formt }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button size="mini" type="success" @click="handleDeletes(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import axios from "axios";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {},
  // 定义变量
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 5
    };
  },
  //监听方法  click事件等
  methods: {
    getData() {
      axios
        .get("/api/article/allArticle")
        .then(res => {
          //   console.log(res.data)
          if (res.data.code === 200) {
            this.tableData = res.data.data;
            // console.log(this.tableData);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //选择每页多少条
    handleSizeChange(val) {
      this.pagesize = val;
      console.log(`每页 ${val} 条`);
    },
    //选择当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    //删除
    handleDelete($index,row) {
       axios.post('/api/article/delete',{_id:row._id}).then(res=>{
          if(res.data.code === 200){
             this.tableData.splice($index,1)
            // console.log(this.tableData)
            if(this.tableData.length === (this.currentPage-1)*this.pagesize){
              this.currentPage--
            }
          }
         //  console.log(res.data)
       }).catch(err=>{
          console.log(err)
       })
    },
    //编辑
    handleEdit($index,row) {
       this.$router.push({path:'/adit',query:{id: row._id}})
      //  console.log(row._id)
    },
    //查看
    handleDeletes($index,row) {
       this.$router.push({path:'/looks',query:{id: row._id}})
    }
  },
  //挂载
  mounted() {
    this.getData();
  },
  watch: {},
  //计算
  computed: {
     
  },
   filters: {
      formt(val){
         return dayjs(val).format('YYYY年MM月DD日HH时mm分ss秒')
      }
   }
};
</script>

<style scoped lang='scss'>
</style>