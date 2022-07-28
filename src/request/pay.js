import request from './request.js'
//添加购物车
export const checkout = params => request.post('/pay/checkout', params)
    //支付
export const alipay = params => request.post('/pay/alipay', params)

export const statePay = params => request.post('/pay/statePay', params)