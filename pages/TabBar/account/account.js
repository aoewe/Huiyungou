const api = require('../../../utils/reques').default


Page({

  data: {
    
    orderIcon:'',

    current: 0,
    swiperIndex: 0,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500
  },

  onLoad(options) {

  },

  onShow() {
    this.getUserInfo()
    this.getReInt()
  },

  async getUserInfo() {
    const res = await api.getUserInfo()
    if (res.code === 0) {
      console.log('个人信息', res);

      let re = res.data

      let content = [{
        type: '拼券积分',
        img: '/static/icons/DC1.png',
        color: '#2295FF',
        url: '../subPages/orderList/orderList?active=1',
        balance:re.integral_pq,
      },
      {
        type: '积分',
        img: '/static/icons/DC2.png',
        color: '#ff9947',
        url: '../subPages/orderList/orderList?active=2',
        balance:re.integral_pq,
      },
      {
        type: '购物券',
        img: '/static/icons/DC3.png',
        color: '#fa5361',
        url: '../subPages/orderList/orderList?active=3',
        balance:re.coupon,
      },
      {
        type: '奖励值',
        img: '/static/icons/DC4.png',
        color: '#737feb',
        url: '../subPages/orderList/orderList?active=4',
        balance:re.reward,
      },
      {
        type: '余额',
        img: '/static/icons/DC5.png',
        color: '#0bd5ba',
        url: '../subPages/orderList/orderList?active=4',
        balance:re.balance,
      },
    ]
      this.setData({
        orderIcon:content
      })
    }
  },

async getReInt() {
  const res = await api.getRewardIntegral()
    if (res.code === 0) {
      console.log(res.data);
    }
},

  bindchange(e) {
    console.log(e)
    this.setData({
      swiperIndex: e.detail.current,
      current: e.detail.current
    })
  },

})