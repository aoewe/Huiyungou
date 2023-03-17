const api = require('../../../utils/reques').default
Page({

  data: {
    page:1,
    size:20,
    list:[],
    total:0,
    loading:true
  },
  async getDealOrder() {
    const { page,size } = this.data
    const {code,data} = await api.getDealOrder({page,size})
    if (code === 0) {
      this.data.list.push(...data.list)
      this.setData({
        list: this.data.list,
        page: ++this.data.page,
        loading: false,
        total: data.total
      })
    }
  },
  onLoad(options) {
    this.getDealOrder()
  },
  onReachBottom() {
    if (this.data.list.length === this.data.total) return
    this.setData({
      loading: true
    })
    this.getDealOrder()
  }
})