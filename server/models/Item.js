const moongose=require('mongoose')

const Schema=new moongose.Schema({
    name:{
        type:String
    },
    icon:{
        type:String
    }
})

module.exports=moongose.model("Item",Schema)