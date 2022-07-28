import request from './request.js'

export const getMyCourse = params => request.post('/mycourse/getMyCourse', params)

export const isInMyCourse = params => request.post('/mycourse/isInMyCourse', params)