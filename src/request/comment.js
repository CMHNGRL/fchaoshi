import request from './request.js'
//发表
export const sendComment = params => request.post('/comment/send', params)
    // 获取
export const getCommentPage = (_id, page = 1) => request({
        url: '/comment/page',
        method: 'get',
        params: {
            _id,
            page
        }
    })
    //回复
export const sendCommentReply = params => request.post('/comment/reply', params)
    //删除
export const deleteComment = params => request.post('/comment/delete', params)