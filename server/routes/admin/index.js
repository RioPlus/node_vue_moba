// routes层，主要负责逻辑，特别是请求处理，
module.exports = app => {
  const express = require('express')

  const jwt = require('jsonwebtoken') // 引入token插件
  const assert = require('http-assert') // 引入assert插件,判断存在不存在,不存在抛出信息
  const AdminUser = require('./../../models/AdminUser')
  
  // const categories = require('../../models/Category')
  const router = express.Router({
    // 保留来自父路由器的req.params值。
    mergeParams: true
  })

  // 新增
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  //   更新
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  //   刪除
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    console.log(req.params.id)
    res.send({
      success: true
    })
  })

  //   獲取信息
  router.get('/', async (req, res) => {
    // 获取模型名称
    // const modelName=require('inflection').classify(req.params.resource)
    // 调用模型对象
    // const Model=require(`../../models/${modelName}`)
    // const items = await categories.find().limit(10)

    let queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }

    const items = await req.Model.find()
      .setOptions(queryOptions)
      .limit(10)
    res.send(items)
  })


  // 登录校验中间件
  const authMiddleware= require('./../../middleware/auth')()

  const resourceMiddleware= require('./../../middleware/resource')()

  // 獲取想要編輯的那條id信息
  router.get('/:id', authMiddleware,async (req, res) => {
  
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  app.use(
    '/admin/api/rest/:resource',authMiddleware,
    resourceMiddleware
   ,
    router
  )

  // 引入了一个node插件，只处理文件,文件上传
  const multer = require('multer')
  // 文件储存位置
  const upload = multer({
    dest: __dirname + '/../../uploads'
  })
  // single代表一次处理一个上传文件
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    // 手动给图片上传对象添加一个url属性
    file.url = `http://localhost:3000/upload/${file.filename}`
    // 追加url属性的file对象发送回客户端，用于客户端通过路径渲染图片
    res.send(file)
  })

  app.post('/admin/api/login', async (req, res) => {
    // 1. 根据用户名找用户
    const { username, password } = req.body

    const user = await AdminUser.findOne({
      username: username
    }).select('+password')

    // if (!user) {
    //   return res.status(422).send({
    //     message: '用户不存在'
    //   })
    // }

    /* 利用http-assert改写 */
    assert(user, 422, '用户不存在') // 一句替代上面五句

    // 2.  校验密码
    const isValid = require('bcryptjs').compareSync(password, user.password) // 明文   密文 进行比较
    if (!isValid) {
      return res.status(422).send({
        message: '密码错误'
      })
    }

    // 3.返回token

    // 第一个参数是唯一标记做散列，第二个是签名防止篡改

    const token = jwt.sign({ id: user._id }, app.get('secret'))


    return res.send({
      token: token
    })
  })

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    // console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}
