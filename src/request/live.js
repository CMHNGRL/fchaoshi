import request from './request.js'


//首页展示
export const queryNew = () => request.get('/api/queryList')

//根据id获取直播间信息
export const getLiveDetailInfo = (params) => request.post('/api/getLiveDetailInfo', params)

//课程中心获取课程分类
export const liveSearch = (params) => request.post('/api/liveSearch', params)