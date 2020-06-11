import axios from 'axios'
import Vue from 'vue'
import router from './router/index'

const http=axios.create({
    baseURL:'http://localhost:3000/admin/api'
})

// axios 客户端发送的数据的链接过滤器
http.interceptors.request.use((config)=>{
    if(localStorage.token){
        config.headers.Authorization='Bearer '+(localStorage.token||'') // 行业规范,注意空格
    }
   
    return config
},
(err)=>{
return Promise.reject(err)
})

// axios 服务端返回的数据的链接过滤器
http.interceptors.response.use(res=>{
    return res
 },(err)=>{
   // 非200进入
     if(err.response.data.message){
         Vue.prototype.$message({
             type:'error',
             message:err.response.data.message
         })
     }

     if(err.response.status===401){
        router.push('/login')
     }
   
     return Promise.reject(err)
 })


// axios 服务端返回的数据的链接过滤器
http.interceptors.response.use(res=>{
   return res
},(err)=>{
   //非200进入                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  

    // if(err.response.data.message){
    //     Vue.prototype.$message({
    //         type:'error',
    //         message:err.response.data.message
    //     })
    // }
  
    return Promise.reject(err)
})


export default http