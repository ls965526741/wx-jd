import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../store/index'
Component({
  behaviors: [storeBindingsBehavior],
  data: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'static/navBar/shouye_1.png',
        selectedIconPath: 'static/navBar/shouye_1_active.png'
      },
      {
        pagePath: 'pages/menu/menu',
        text: '商品',
        iconPath: 'static/navBar/shangpin.png',
        selectedIconPath: 'static/navBar/shangpin_acitve.png'
      },
      {
        pagePath: 'pages/cart/cart',
        text: '购物车',
        iconPath: 'static/navBar/shouye.png',
        selectedIconPath: 'static/navBar/shouye_acitve.png'
      },
      {
        pagePath: 'pages/profile/profile',
        text: '个人',
        iconPath: 'static/navBar/geren.png',
        selectedIconPath: 'static/navBar/geren_active.png'
      }
    ]
  },
  storeBindings: {
    store,
    fields: {
      active: () => store.tabbarCurrentPage
    },
    actions: {
      setActive: 'setTabbarCurrentPage'
    }
  },

  methods: {
    onChange(event) {
      wx.switchTab({
        url: `/${this.data.list[event.detail].pagePath}`
      })
      this.setActive(event.detail)
    }
  }
})
