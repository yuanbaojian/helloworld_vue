<template>
  <div>
    <el-button type="primary"  @click="getIpFromWeb()" style="margin-bottom: 20px; float:right" round>爬取</el-button>
    <el-table
      :data="IpList"
      border
      style="width: 100%">
      <el-table-column
        prop="serverAddress"
        label="地址"
        width="180">
      </el-table-column>
      <el-table-column
        prop="anonymityType"
        label="匿名类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="protocolType"
        label="协议类型">
      </el-table-column>
      <el-table-column
        prop="ipAddress"
        label="ip地址">
      </el-table-column>
      <el-table-column
        prop="ipPort"
        label="端口">
      </el-table-column>
    </el-table>

<!--    不满一页， 就不显示分页栏-->
    <template v-if="total > 0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </template>
  </div>
</template>

<script>
  export default {
    name: "IpList",
    created() {
      this.getIpList(this.pageNum, this.pageSize)
    },

    data() {
      return {
        IpList: [],
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    },
    methods: {
      async getIpList(pageNum, pageSize) {
        this.pageNum = pageNum;
        this.pageSize = pageSize;
        let response = await this.$http.get('/IpBean/getAllIp',{
          params:{
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        });
        debugger
        this.IpList = response.data.list;
        this.pageNum = response.data.pageNum;
        this.total = response.data.total;
      },

      handleSizeChange(val) {
        window.console.log(`每页 ${val} 条`);
        //this.getIpList( `${val}`, 10)
      },
      handleCurrentChange(val) {
        window.console.log(`当前页: ${val}`);
        this.getIpList(`${val}`, 10)
      },


      getIpFromWeb() {
        this.$http.get('/IpBean/save')
        this.getIpList(this.pageNum,this.pageSize)
      }
    }
  }
</script>

<style scoped>

</style>
