const api = require('../../../utils/reques').default

Page({
  data: {
    statusBar: wx.getMenuButtonBoundingClientRect(),
    orderIcon: [],
    cardInfo: [],
    swiperIndex: 0,
    vertical: false,
    cardLoading: true,
    autoplay: false,
    interval: 2000,
    duration: 500
  },

  onShow() {
    this.getUserInfo()
  },

  async getUserInfo() {
    const res = await api.getUserInfo()
    if (res.code === 0) {
      let re = res.data
      let content = [{
          type: '拼券积分',
          value: 3,
          img: '/static/icons/DC1.png',
          color: '#2295FF',
          url: '../subPages/orderList/orderList?active=1',
          balance: re.integral_pq,
        },
        {
          type: '积分',
          value: 2,
          img: '/static/icons/DC2.png',
          color: '#ff9947',
          url: '../subPages/orderList/orderList?active=2',
          balance: re.integral_pq,
        },
        {
          type: '购物券',
          value: 4,
          img: '/static/icons/DC3.png',
          color: '#fa5361',
          url: '../subPages/orderList/orderList?active=3',
          balance: re.coupon,
        },
        {
          type: '奖励值',
          value: 5,
          img: '/static/icons/DC4.png',
          color: '#737feb',
          url: '../subPages/orderList/orderList?active=4',
          balance: re.reward,
        },
        {
          type: '余额',
          value: 1,
          img: '/static/icons/DC5.png',
          color: '#0bd5ba',
          url: '../subPages/orderList/orderList?active=4',
          balance: re.balance,
        },
      ]
      this.setData({
        orderIcon: content,
        cardLoading: false
      })
    }
  },
  async getStreamList() {
    const {
      swiperIndex,
      orderIcon
    } = this.data
    const {
      code,
      data
    } = await api.getStreamList({
      type: orderIcon[swiperIndex].value
    })
    if (code === 0) {
      this.setData({
        cardLoading: false,
        cardInfo: data.list
      })
    }
  },
  bindchange(e) {
    this.setData({
      swiperIndex: e.detail.current,
      cardInfo:[],
      cardLoading: true
    }, () => {
      this.getStreamList()
    })
  },
  // onReachBottom() {
  //   if (this.data.list.length === this.list.total) return
  //   this.setData({
  //     loading: true
  //   })
  //   this.getStreamList()
  // }
})