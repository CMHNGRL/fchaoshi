import request from './request.js'
export const getQuestion = (params) => request.post('/getQuestion', params)