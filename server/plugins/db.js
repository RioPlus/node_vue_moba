// 数据库链接公共插件
module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect(
    'mongodb://127.0.0.1:27017/node-vue-moba',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },err=>{
        if(err){
          return  console.log('链接失败')
        }
        console.log("链接成功")
    }
  )
}
