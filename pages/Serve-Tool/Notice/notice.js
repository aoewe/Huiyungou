const fetch = require("../../../utils/reques").default

Page({
  data: {
    list:[],
    botton:wx.getStorageSync('bottom'),
    loading:true,
    page:1,
    total:0
  },
  async getArticleList() {
    const params = {
      type: 2
    }
    const {
      code,
      data
    } = await fetch.getArticleList(params)
    // this.data.list.push(...data.list)
    if (code === 0) {
      this.setData({
        page:++this.data.page,
        list: this.data.list,
        total: data.total,
        loading:false
      })
    }
  },
  onLoad(options) {
    this.getArticleList()
  },
  onReachBottom(){
    if(this.data.list.length===this.data.total) return
    this.setData({loading:true})
    this.getArticleList()
  }
})