export const VALIDATE = 'VALIDATE'; //用于向服务器发送验证请求
export const CHANGE_AVATAR = 'CHANGE_AVATAR'; //用于改变用户当前的头像
export const LOGOUT = 'LOGOUT'; //退出登录

export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY'; //设置首页header的当前分类
export const GET_SLIDERS = 'GET_SLIDERS'; //首页轮播图获取

export const GET_LESSONS = 'GET_LESSONS'; //获取课程列表
export const SET_LESSONS_LOADING = 'SET_LESSONS_LOADING'; //设置loading状态，加载中为true，加载完成为false
export const SET_LESSONS = 'SET_LESSONS'; //设置课程列表，类似于加载更多，会把最新返回的数据跟老数据合并
export const REFRESH_LESSONS = 'REFRESH_LESSONS'; //刷新课程列表，类似于重置功能，会直接覆盖丢弃老数据

export const ADD_CART_ITEM = 'ADD_CART_ITEM'; //添加购物车商品
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'; //删除购物车商品
export const CLEAR_CART_ITEMS = 'CLEAR_CART_ITEMS'; //清空购物车商品
export const CHNAGE_CART_ITEM_AMOUNT = 'CHNAGE_CART_ITEM_AMOUNT'; //修改购物车商品数量
export const CHANGE_CHECKED_CART_ITEMS = 'CHANGE_CHECKED_CART_ITEMS'; //设置是否选中某些商品
export const SETTLE = 'SETTLE'; //结算