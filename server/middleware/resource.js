module.exports=()=>{
    return async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
        // 给请求对象挂载一个Model模型对象
    
        req.Model = require(`../models/${modelName}`)
    
        next()
      }

    
}