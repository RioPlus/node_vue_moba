// models层，提供数据库模型，为routes层面服务
const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    name:{type:String},
    parent:{
        // 关联字段
        type:mongoose.SchemaTypes.ObjectId,ref:'Category'
    }

})

module.exports= mongoose.model('Category',schema)

