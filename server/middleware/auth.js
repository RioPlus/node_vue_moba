module.exports=(option)=>{

    const jwt=require('jsonwebtoken')
    const assert=require('http-assert')
    const AdminUser=require('./../models/AdminUser')

    return async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        // 等价于 if (!token) {
        //   return res.status(401).send({
        //     message: '请提供jwt'
        //   })
        // }
        assert(token, 401, '请提供jwt')
        const {id} = jwt.verify(token, req.app.get('secret'))
    
        console.log('id',id)
        assert(id, 401, '无效的token')
        req.user=await AdminUser.findById(id)
    
        assert(req.user, 401, '请先登录')
        await next()
      } 
}