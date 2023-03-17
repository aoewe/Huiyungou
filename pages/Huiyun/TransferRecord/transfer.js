const api = require('../../../utils/reques').default

Page({

  data: {
    type: '',
    list: [],
    total: 0,
    page: 1,
    size: 10,
    loading: true
  },

  async getStreamList() {
    const {
      type,
      page,
      size
    } = this.data
    const params = {
      type,
      page,
      size
    }
    type == 2 && (params.stream_type = 4)
    const {
      code,
      data
    } = await api.getStreamList(params)
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
    wx.setNavigationBarTitle({
      title: options.type == 2 ? '转赠记录' : '兑换记录',
    })
    this.setData({
      type: options.type
    }, () => {
      this.getStreamList()
    })
  },
  onReachBottom() {
    if (this.data.list.length === this.data.total) return
    this.setData({
      loading: true
    })
    this.getStreamList()
  }
})