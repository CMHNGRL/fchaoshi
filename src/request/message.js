import request from './request.js'

export const getMsg = params => request.post('/message/getMsg', params)
    //回复
export const sendCommentReply = params => request.post('/message/sendCommentReply', params)
    //删除
export const deleteMsg = params => request.post('/message/deleteMsg', params)