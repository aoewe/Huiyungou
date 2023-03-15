const fetch = require("../../../utils/reques").default
Page({
  data: {
    bottom: wx.getStorageSync('bottom'),
    statusbar: 0,
    orderInfo: {},
    isRefresh: false,
    time: '',
    id: '' //当前订单id
  },
  //导航
  navigation() {
    let {
      server_name,
      lat,
      lng
    } = this.data.orderInfo
    wx.openLocation({
      type: 'gcj02',
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
      name: server_name
    })
  },
  // 查看物流
  toLogistics(e) {
    wx.navigateTo({
      url: '../logistics/logistics?id=' + e.currentTarget.dataset.id,
    })
  },
  back() {
    wx.navigateBack()
  },
  // 订单剩余时间
  startTime() {
    let nowtime = Date.parse(new Date())
    let time = this.data.orderInfo.order_invalid_time * 1000
    if (nowtime > time) {
      this.setData({
        time: '00:00'
      })
    } else {
      let num = (time - nowtime) / 1000
      var timer = setInterval(() => {
        num--
        let mm = parseInt(num / 60)
        let ss = num % 60
        if (mm < 10) {
          mm = '0' + mm
        }
        if (ss < 10) {
          ss = '0' + ss
        }
        let str = mm + ':' + ss
        this.setData({
          time: str
        })
        if (num < 0) {
          this.setData({
            time: '00:00'
          })
          clearInterval(timer)
        }
      }, 1000)
    }
  },
  // 订单二次支付
  toTowPay(e) {
    let {
      order_invalid_time,
      payment_money,
      district_money,
      order_sn,
      create_time,
      product_info
    } = e.currentTarget.dataset.item
    let good_name = product_info[0].good_name
    let data = {
      order_invalid_time,
      payment_money,
      district_money,
      order_sn,
      id: this.data.id,
      create_time,
      good_name
    }
    data = JSON.stringify(data)
    wx.redirectTo({
      url: '/winePages/pages/twoPayment/twoPayment?info=' + data,
    })
  },
  getDate: function (time) {
    var date = new Date(parseInt(time) * 1000)
    var y = date.getFullYear()
    var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    var h = date.getHours();
    var mm = date.getMinutes();
    var s = date.getSeconds();
    return y + '-' + m + '-' + d + '  ' + h + ':' + mm + ':' + s
  },
  async getOrderInfo(id) {
    const {
      code,
      data
    } = await fetch.getWinOrderInfo({
      id
    })
    if (code === 0) {
      let orderInfo = data
      orderInfo.create_time = this.getDate(orderInfo.create_time)
      orderInfo.shipping_time = this.getDate(orderInfo.shipping_time)
      orderInfo.pay_time = this.getDate(orderInfo.pay_time)
      this.setData({
        orderInfo
      })
      if (orderInfo.pay_status === 0 && orderInfo.order_status !== 5) {
        this.startTime()
      }
    }
  },
  // 退款
  applyRefund() {
    let refundOrderInfo = this.data.orderInfo
    wx.getStorageSync('refundOrderInfo') && wx.removeStorageSync('refundOrderInfo')
    wx.setStorageSync('refundOrderInfo', refundOrderInfo)
    wx.navigateTo({
      url: '../cancelOrder/cancelOrder'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      isRefresh: options.isRefresh || false,
      statusbar: wx.getMenuButtonBoundingClientRect()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getOrderInfo(this.data.id)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.removeStorage({
      key: 'orderInfo',
    })
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    prevPage.setData({
      isRefresh: this.data.isRefresh
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})