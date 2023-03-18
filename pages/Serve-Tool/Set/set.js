const api = require('../../../utils/reques').default
Page({

  data: {
    userInfo:{}
  },
  imgError(){
    this.setData({
      'userInfo.avatar':'http://tshui.taoqiy.com/register/static/default.png'
    })
  },
  async getUserInfo() {
    const {
      code,
      data
    } = await api.getUserInfo()
    if (code === 0) {
      this.setData({
        userInfo: data
      })
    }
  },
  onShow(options) {
    this.getUserInfo()
  }
})