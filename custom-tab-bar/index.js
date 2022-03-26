const { tabBar } = require('../app')
Component({
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
    ],
    active: 0
  },
  methods: {
    onChange(event) {
      wx.switchTab({
        url: `/${this.data.list[event.detail].pagePath}`
      })
      this.setData({ active: event.detail })
    }
  },
  lifetimes: {
    created() {
      console.log(tabBar)
    },
    ready() {
      var obj = this.createSelectorQuery()
      obj
        .select('.van-tabbar')
        .boundingClientRect(function (rect) {
          console.log('获取tabBar元素的高度', rect)
          wx.setStorageSync('tabBarHeight', rect.height) // 将获取到的高度设置缓存，以便之后使用
        })
        .exec()
    }
  }
})
