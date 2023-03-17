const api = require('../../utils/reques').default

Page({

  data: {
    statusBar: wx.getMenuButtonBoundingClientRect(),
    page: 1,
    size: 10,
    loading: true,
    pageNum:0,
    list: [],
    total: 0
  },
  changePage(e) {
    this.data.page = e.currentTarget.dataset.type === 'next' ? ++this.data.page : --this.data.page
    this.setData({
      list: [],
      page: this.data.page,
      loading: true
    }, () => {
      this.getRewardIntegral(e.currentTarget.dataset.type)
    })

  },
  async getRewardIntegral(e) {
    const {page,size} = this.data
    const {code,data} = await api.getRewardIntegral({page,size})
    if (code === 0) {
      this.data.list.push(...data.list)
      this.setData({
        pageNum:e==='next'?this.data.pageNum+=data.list.length:this.data.list.length,
        loading: false,
        list: this.data.list,
        total: data.total
      })
    }
  },
  onLoad(options) {
    this.getRewardIntegral('next')
  }
})