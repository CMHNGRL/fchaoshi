import request from './request.js'

//获取课程分类
export const getCourseAllType = () => request.get('/api/courseType')
    //首页展示课程
export const queryNew = () => request.get('/api/queryNew')

//根据id课程获取课程信息
export const getCouresDetailInfo = (params) => request.post('/api/courseInfoById', params)

//根据id课程获取课程所有章节
export const getCouresAllSection = (params) => request.post('/api/couresAllSection', params)

//根据课程id获取，章节列表。根据章节id获取改章节信息
export const playCourse = (params) => request.post('/sectionList', params)
    //获取弹幕
export const getDanmu = (query) => request({
        url: '/danmu',
        method: 'get',
        params: {
            id: query
        }
    })
    //发送弹幕
export const sendDanmu = (params) => request.post('/danmu', params)

//课程中心获取课程分类
export const courseSearch = (params) => request.post('/api/courseSearch', params)