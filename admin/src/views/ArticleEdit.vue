<template>
  <div class="about">
    <h1>{{id?'編輯':'新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>

      <el-form-item label="详情内容">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import { VueEditor } from "vue2-editor";
export default {
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {},
      categories: []
    };
  },

  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post("/upload", formData);
      //   这里是设置了一个image标签，并且配置了显示路径
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
    //   重置上传
      resetUploader();

      //   axios({
      //     url: "https://fakeapi.yoursite.com/images",
      //     method: "POST",
      //     data: formData
      //   })
      //     .then(result => {
      //       let url = result.data.url; // Get url from response
      //       Editor.insertEmbed(cursorLocation, "image", url);
      //       resetUploader();
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
    },

    async save() {
      let res;
      if (this.id) {
        //   用於修改更新
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        //   用於新增-
        res = await this.$http.post("/rest/articles", this.model);
      }

      window.console.log(res);

      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },

    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },

    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    }
  },

  created() {
    this.id && this.fetch();
    this.fetchCategories();
  }
};
</script>
