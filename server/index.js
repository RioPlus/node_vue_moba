
const express =require('express')

const app=express()
app.set('secret','fafafa')
app.use(require('cors')()) //解决跨域
app.use(express.json())
app.use('/upload',express.static(__dirname+'/uploads')) //托管静态文件

require('./plugins/db')(app) // 链接数据库
require('./routes/admin')(app) // 链接路由

app.post('/categories',(req,res)=>{
    res.json({
        name:'hh'
    })
})

app.listen(3000,()=>{
    console.log('http://localhost:3000')
})