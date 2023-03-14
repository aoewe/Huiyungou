// pages/Productlist/list.js
const api = require('../../../utils/reques').default

Page({

  data: {
    products:[],
  },

  onLoad(options) {
    let category_id = options.id
    this.Getlist(category_id)
  },

  onShow() {

  },

  async Getlist(e) {
    const params = {
      category_id:e
    }
    console.log(params);

    const res = await api.getProductList(params)
    if (res.code === 0) {
      const {
        list
      } = res.data
      this.setData ({
        products:list
      })
    }
  }
})