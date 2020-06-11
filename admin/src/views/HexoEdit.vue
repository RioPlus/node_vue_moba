<template>
  <div class="about">
    <h1>{{id?'編輯':'新建'}}英雄</h1>

    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="skills">
        <el-tab-pane label="基础信息">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>

          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>

          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL+'/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="难度">
            <el-rate style="margin-top:0.6rem" v-model="model.score.diffcult" :max="9" show-score></el-rate>
          </el-form-item>

          <el-form-item label="技能">
            <el-rate style="margin-top:0.6rem" v-model="model.score.skills" :max="9" show-score></el-rate>
          </el-form-item>

          <el-form-item label="攻击">
            <el-rate style="margin-top:0.6rem" v-model="model.score.attach" :max="9" show-score></el-rate>
          </el-form-item>

          <el-form-item label="生存">
            <el-rate style="margin-top:0.6rem" v-model="model.score.survive" :max="9" show-score></el-rate>
          </el-form-item>

          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>

          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>

          <el-form-item label="团战技巧">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="技能管理" name="skills">
          <el-button icon="el-icon-plus" size="small" @click="model.skills.push({})">添加技能</el-button>
          <el-row type="flex" class="row-bg" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(item,index) in model.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL+'/upload'"
                  :show-file-list="false"
                  :on-success="res=>$set(item,'icon',res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.descrition"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type='danger' size='small' @click='model.skills.splice(index,1)'>删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-form-item style="margin-top:1rem;margin-left:-3.6rem">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        name: "",
        avatar: "",
        categories: [],
        score: {
          diffcult: 0,
          skills: 0,
          attach: 0,
          survive: 0
        },
        items1: [],
        items2: [],

        usageTips: ``,
        battleTips: ``,
        teamTips: ``
      },

      items: [],
      categories: [],

      parents: []
    };
  },

  methods: {
    //图标上传
    afterUpload(res) {
      window.console.log(res);
      //   this.$set(this.model,'icon',res.url)
      this.model.avatar = res.url;
    },

    async save() {
      let res;
      if (this.id) {
        //   用於修改更新
        res = await this.$http.put(`rest/hexoes/${this.id}`, this.model);
      } else {
        //   用於新增
        res = await this.$http.post("/rest/hexoes", this.model);
      }

      window.console.log(res);

      this.$router.push("/hexoes/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },

    async fetch() {
      const res = await this.$http.get(`rest/hexoes/${this.id}`);
      //   this.model = res.data;
      this.model = Object.assign({}, this.model, res.data); // 后面的res.data 会替换this.model中同属性的数据，没有的不会
    },

    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },

    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    }
  },

  created() {
    this.id && this.fetch();
    this.fetchCategories();
    this.fetchItems();
  }
};
</script>

<style>

</style>
