const api = require('../../../utils/reques').default

Page({
  data: {
    type: '',
    changeType:'',
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
      size,changeType
    } = this.data
    const params = {
      type:changeType==0?3:2,
      page,
      size
    }
    type==2 &&(params.stream_type = 4)
    type==3 &&(params.stream_type = changeType==0?8:7)
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
    const {changeType,type} = options
    wx.setNavigationBarTitle({
      title: type == 2 ? `${changeType==0?'拼券积分':'积分'}转赠记录` : `${changeType==0?'拼券积分':'积分'}兑换记录`,
    })
    this.setData({
      type,
      changeType
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