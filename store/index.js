// store.js
import { observable, action } from 'mobx-miniprogram'
import { getCategory } from '../api/index'

export const store = observable({
  // 数据字段
  tabbarCurrentPage: 0,
  categoryList: [],

  // 计算属性

  // actions
  update: action(function () {}),
  setTabbarCurrentPage: action(function (payload) {
    this.tabbarCurrentPage = payload
  }),
  getCategoryList: action(async function () {
    if (this.categoryList.length) return
    const res = await getCategory()
    if (res) {
      this.categoryList = res.result.rows
    }
  })
})
