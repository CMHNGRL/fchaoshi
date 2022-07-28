import axios from 'axios'

const instance = axios.create({
        baseURL: "http://localhost:3001",
        timeout: 5000
    })
    //axios拦截器区别，拦截的是请求，一般在请求中添加请求信息（例如token)
    //路由拦截，拦截的是页面，可以决定用户有没有权利访问某个页面
instance.interceptors.request.use(config => {
    //是否登录
    let token = sessionStorage.getItem("token")
    if (token) {
        config.headers['Authorization'] = token
    }
    return config
}, err => {
    return Promise.reject(err)
})

instance.interceptors.response.use(res => {
    return res.data
}, err => {
    return Promise.reject(err)
})

export default instance