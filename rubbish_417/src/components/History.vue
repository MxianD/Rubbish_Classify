<template>
  <div style="display: flex; height: 90vh; flex-direction: column">
    <div class="search">
      <div class="date_search">
        <el-date-picker
          v-model="dateData"
          type="date"
          placeholder="选择日期"
          format="YYYY年 MM月 DD日"
          value-format="YYYY-MM-DD"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="history_record">
      <el-table
        :data="
          tableData.filter(
            (data) =>
              !search ||
              data.Bgroup.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column label="垃圾" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.image_path"
                :zoom-rate="1.2"
                :initial-index="4"
                fit="cover"
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column label="大类" prop="Bgroup" />
        <el-table-column label="小类" prop="Sgroup" />
        <el-table-column label="日期" prop="process_time" />
        <el-table-column align="right">
          <template #header>
            <el-input
              v-model="search"
              size="small"
              placeholder="Type to search"
              :change="test()"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="end">
      <!-- <el-button @click="test">11111</el-button> -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="5"
        layout="prev, pager, next"
        :total="total_records"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request.js";
export default {
  name: "History",
  component: {},
  created() {
    this.getHistory();
  },
  computed: {},
  data() {
    return {
      url: [],
      tableData: [],
      search: "",
      // 默认显示第几页
      page: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 默认每页显示的条数（可修改）
      per_page: 5,
      total_records: 0,
      total_pages: 1,
      dateData: "",
    };
  },
  methods: {
    test() {
      console.log("tst", this.search);
      this.getHistory();
    },
    getData(per_page, page) {
      per_page = 5;
      console.log('per_page',per_page);
      this.tableData = []; // 清空tableData数组
      console.log("get");
      request({
        method: "get",
        url: "/history",
        params: {
          username: "scq",
          page: page,
          per_page: per_page,
          date: this.dateData,
          bgourp: this.search,
        },
      }).then((res) => {
        console.log('length ', res.records.length);
        let img_path = res.records[i].image_path.replace(/\\/g, '/').replace(/^.*validate\//, '../../public/');
        // 将数据赋值给tableData
        for (let i = 0; i < res.records.length; i++) {
          this.tableData.push({
            img_path: img_path,
            process_time: res.records[i].process_time,
            Bgroup: JSON.stringify(res.records[i].result.Bgroup),
            Sgroup: JSON.stringify(res.records[i].result.Sgroup),
          });
          //转化图片路径
          console.log('getData',i, this.tableData[i].image_path);
        }

        // 将数据的长度赋值给total_records
        this.total_records = res.total_records;
        // 将页面的总数赋值
        this.total_pages = res.total_pages;
        console.log('total_records',this.total_records);
        console.log('total_pages',this.total_pages);
      });
    },
    // 分页
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.per_page = val;
      console.log("每页显示的条数", val);
      // 点击每页显示的条数时，显示第一页
      this.getData(val, 1);
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.page = 1;
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.page = val;
      console.log("val", val);
      console.log("page", this.page);
      // 切换页码时，要获取每页显示的条数
      this.getData(this.per_page, val * this.page);
    },
    // test() {
    //   console.log(this.dateSearch);
    // },
    getHistory() {
      this.tableData = []; // 清空tableData数组
      request({
        method: "get",
        url: "/history",
        params: {
          username: "scq",
          page: this.page,
          per_page: this.per_page,
          date: this.dateData,
          bgourp: this.search,
        },
      }).then((res) => {
        console.log("res", res);
        console.log("1", res.records);
        console.log('length ', res.records.length);
        for (let i = 0; i < res.records.length; i++) {
          let img_path = res.records[i].image_path.replace(/\\/g, '/').replace(/^.*validate\//, '../../public/');
          console.log('img_path', img_path);
          this.tableData.push({
            image_path: img_path,
            process_time: res.records[i].process_time,
            Bgroup: JSON.stringify(res.records[i].result.Bgroup),
            Sgroup: JSON.stringify(res.records[i].result.Sgroup),
          });
          //转化图片路径
          console.log(i,  this.tableData[i].image_path);
        }
        // 将数据的长度赋值给total_records
        this.total_records = res.total_records;
        // 将页面的总数赋值
        this.total_pages = res.total_pages;
        console.log('total_records',this.total_records);
        console.log('total_pages', this.total_pages);
        console.log('getHistory');
      });
    },
  },
};
</script>

<style scoped>
.search {
  flex: 2;
  min-height: 100px;
  /* background-color: black; */
}
.history_record {
  flex: 8;
  /* background-color: rebeccapurple; */
}
.end {
  flex: 1;
  /* background-color: antiquewhite; */
  display: flex;
  justify-content: center;
}
.date_search {
  margin-top: 60px;
}
</style>
