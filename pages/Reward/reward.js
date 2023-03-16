const api = require('../../utils/reques').default

Page({

  data: {
    statusBar: wx.getMenuButtonBoundingClientRect(),
    page: 1,
    size: 10,
    loading: true,
    list: [],
    total: 0
  },
  async getRewardIntegral() {
    const {page,size} = this.data
    const {code, data} = await api.getRewardIntegral({ page, size })
    if (code === 0) {
      this.setData({
        loading: false,
        list: this.data.list,
        page: ++this.data.page,
        total: data.total
      })
    }
  },
  onLoad(options) {
    this.getRewardIntegral()
  }
})