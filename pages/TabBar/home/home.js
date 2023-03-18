const fetch = require("../../../utils/reques").default;
Page({
  data: {
    statusBar: wx.getMenuButtonBoundingClientRect(),
    loading:true,
    articleList: [],
    showProduct: [],
    swiperList: [{
      url: ''
    }]
  },

  onShow() {
    this.index()
  },
  async index() {
    const {
      code,
      data
    } = await fetch.index()
    if (code === 0) {
      const {
        article,
        banner_list,
        show_product
      } = data
      this.setData({
        showProduct: show_product,
        articleList: article,
        swiperList: banner_list,
        loading:false
      })
    }
  },

  GoProductList(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/Product/list/list?id=' + id,
    })
  }
})