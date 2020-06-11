<template>
  <div class="about">
    <h1>英雄列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <!-- <el-table-column prop="parent.name" label="上级分类" width="240"></el-table-column> -->
      <el-table-column prop="name" label="英雄名称" width="140"></el-table-column>
      <el-table-column prop="title" label="英雄名称" width="140"></el-table-column>
      <el-table-column label="图标" width="140">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt="加载中。。。" style='height:3em'>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="$router.push(`/hexoes/edit/${scope.row._id}`)"
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
      const res = await this.$http.get("rest/hexoes");
      window.console.log(res);
      this.items = res.data;
    },

    remove(row) {
      this.$confirm(`是否刪除分类 ${row.name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/hexoes/${row._id}`);

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
};
</script>


