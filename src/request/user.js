//用户相关api
import request from './request.js'

//获取email 验证码
export const yzm = (params) => request.post('/api/yzm', params)

//获取图形 验证码
export const tyzm = () => request.get('/api/tyzm')

//提交注册信息
export const register = (params) => request.post('/api/register', params)

//登录
export const login = (params) => request.post('/api/login', params)

//重置密码
export const repwd = (params) => request.post('/api/repwd', params)

//修改密码
export const updatePwd = (params) => request.post('/updatePwd', params)

//获取用户默认信息
export const getInfo = (params) => request.post('/getUserInfo', params)

// 上传图片
export const uploadAvatar = (params) => request.post('/uploadImg', params)

//修改头像
export const updateAvatar = (params) => request.post('/updateAvatar', params)

//更新用户各种信息
export const updateUserInfo = (params) => request.post('/updateUserInfo', params)