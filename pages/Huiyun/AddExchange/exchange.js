const api = require('../../../utils/reques').default
Page({
  data: {
    integral_pq: '',
    showPassword:false
  },
  async getUserInfo() {
    const {
      code,
      data
    } = await api.getUserInfo()
    if (code === 0) {
      this.setData({
        userInfo: data,
      })
    }
  },
  payOrderNext(e) {
    this.submit(e.detail)
  },
  changeIntegral(e) {
    const num = parseInt(e.detail.value)
    if (num > this.data.userInfo.integral_pq) this.setData({
      integral_pq: this.data.userInfo.integral_pq
    })
  },
  closePay() {
    this.setData({
      showPassword: false
    })
  },
  async register() {
    const {
      integral_pq
    } = this.data
    if (!integral_pq) return wx.showToast({
      title: '请输入兑换数量',
      icon: 'none'
    })
    this.setData({
      showPassword: true
    })
  },
  async submit(surplus_password) {
    const {
      code
    } = await api.changeIntegral({
      integral_pq: this.data.integral_pq,
      surplus_password
    })
    if (code === 0) {
      this.setData({
        integral_pq: '',
        showPassword:false
      })
      wx.showToast({
        title: '兑换成功',
        icon: 'none'
      })
      this.getUserInfo()
    }
  },
  onLoad(options) {
    this.getUserInfo()
  }
})