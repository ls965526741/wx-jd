import request from '../utils/request'

// 商品
const getGoods = params => request('good', 'get', params) // page=1  size=200
const getRecommend = params => request('good/recommend', 'get', params) //  params:{id:3,page:1,size:10}
const getCategory = () => request('category', 'get')
const getDetail = params => request('good/detail', 'get', params) // id

// 购物车
const getCart = () => request('cart', 'get')
const putCart = data => request('cart', 'put', data) //  "goods_id":107, "goods_num":9
const addCart = data => request('cart', 'post', data) // goods_id
const removeCart = data => request('cart/remove', 'post', data) //  goods_id
const selectAll = data => request('cart/selectAll', 'post', data)

// 订单

// 登陆
const getOrder = data => request('order', 'get', data)
const addOrder = data => request('order', 'post', data)

//  username password
const register = data => request('user/register', 'post', data)
const login = data => request('user/login', 'post', data)
const editPassword = data => request('user', 'post', data)
const upload = data => request('user/upload', 'post', data)

// 个人信息
const updateUserInfo = data => request('user/userInfo', 'post', data)

// 地址
const createAddress = data => request('address', 'post', data)
const getAddress = () => request('address', 'get')
const putAddress = (id, data) => request(`address/${id}`, 'put', data)
const removeAddress = (id, data) => request(`address/${id}`, 'delete', data)
const setDefaultAddr = id => request(`address/${id}`, 'patch')

const getCityName = () => request('cityName', 'get')

//  const getUserInfo = params => request({ method: 'get', url: '/userinfo', params })

module.exports = {
  getGoods,
  getRecommend,
  getCategory,
  getDetail,
  getCart,
  putCart,
  addCart,
  removeCart,
  selectAll,
  getOrder,
  addOrder,
  register,
  login,
  editPassword,
  upload,
  updateUserInfo,
  createAddress,
  getAddress,
  putAddress,
  removeAddress,
  setDefaultAddr,
  getCityName
}
