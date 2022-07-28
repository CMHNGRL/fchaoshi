import request from './request.js'
//添加购物车
export const addShopCar = params => request.post('/cart/addShopCar', params)

//获取购物车信息
export const getShopCarList = params => request.post('/cart/getShopCar', params)
    //删除
export const deleteShopCar = params => request.post('/cart/deleteShopCar', params)

//删除
export const delCarsAndAddCor = params => request.post('/cart/delCarsAndAddCor', params)