const api = require('../../../utils/reques').default
Page({
  data: {
    category_id:null,
    products: [],
    total: 0,
    loading: true,
    size:1,
    page:1
  },
  async Getlist() {
    const { category_id,page,size } = this.data
    const params = { category_id,page,size }
    const { code, data } = await api.getProductList(params)
    if (code === 0) {
      this.data.products.push(...data.list)
      this.setData({
        products: this.data.products,
        total: data.total,
        page: ++this.data.page,
        loading: false
      })
    }
  },
  onLoad(options) {
    const type = options.id
    wx.setNavigationBarTitle({
      title: type==1?'复购专区':type==2?'VIP专区':type==3?'团购专区':type==4?'普通商品':'拼券专区',
    })
    this.setData({
      category_id:type || null
    },()=>{
      this.Getlist()
    })
  },
  onReachBottom() {
    if (this.data.products.length === this.data.total) return
    this.setData({
      loading: true
    })
    this.Getlist()
  }
})