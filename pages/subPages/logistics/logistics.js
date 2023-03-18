const http = require('../../../utils/reques').default
Page({
  data: {
    info: [],
    loading: true
  },
  async getExpressInfo(id) {
    const { code, data } = await http.getExpressInfo({ id })
    if (code === 0) {
      data[0].logisticsTraceDetailList.reverse()
      this.setData({
        info: data[0],
        loading: false
      })
    }
  },
  onLoad(options) {
    this.getExpressInfo(options.id)
  }
})