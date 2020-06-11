const mongoose = require('mongoose')
const Schema = mongoose.Schema({
  name: {
    // 名称
    type: String
  },
  avatar: {
    // 头像
    type: String
  },
  title: {
    // 称号
    type: String
  },
  categories: [
    {
      // 属于什么角色定位的英雄
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Category'
    }
  ],

  //  评分
  score: {
    diffcult: { type: Number },
    skills: { type: Number },
    attach: { type: Number },
    survive: { type: Number }
  },

  //   技能详情
  skills: [
    {
      icon: { type: String },
      name: { type: String },
      descrition: { type: String },
      tips: { type: String }
    }
  ],

  //   出装推荐
  //  顺风
  items1: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Item'
    }
  ],
  // 逆风
  items2: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Item'
    }
  ],

  // 使用技巧
  usageTips: {
    type: String
  },
  // 对抗技巧

  battleTips: {
    type: String
  },
  // 团战思维
  teamTips: {
    type: String
  },

  //  英雄关系
  partner: [
    {
      hexo: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hexo' },
      descrition: {
        type: String
      }
    }
  ]
})

module.exports = mongoose.model('Hexo', Schema)
