<template>
  <div class="about">
    <h1>文章列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <!-- <el-table-column prop="parent.name" label="上级分类" width="240"></el-table-column> -->
      <el-table-column prop="title" label="文章标题" width="240"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="$router.push(`/articles/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button size="mini" type="danger" @click="remove(scope.row)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      items: []
    };
  },

  methods: {
    async fetch() {
      const res = await this.$http.get("rest/articles");
      window.console.log(res);
      this.items = res.data;
    },

    remove(row) {
      this.$confirm(`是否刪除分类 ${row.title}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/articles/${row._id}`);

        window.console.log(res.data.success);
        if (res.data.success) {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch();
        }
      });
    }
  },

  created() {
    this.fetch();
  }

  //  总结一下书写思路

  // 前端：
  //     1：views：中书写vue组件页面
  //     2：router： 配置前端组件路由
  //     3：写好脚本请求，测试请求路径正确否 和 数据有没有发送，到这里前端获取数据就结束了

  // 后端：
  //     1：models： 书写某一个数据库模型
  //     2：routes：引入模型，书写请求接口
  //     3：把接口或者router挂载到app服务对象实例上
};
</script>





