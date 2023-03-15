const api = require('../../../utils/reques').default

Page({

  /**
   * 页面的初始数据
   */
  data: {
    UserInfo:'',
    orderIcon: [{
      img: '/static/icons/FK.png',
      lable: '待付款',
      url: '../../subPages/orderList/orderList?active=1'
    },
    {
      img: '/static/icons/FH.png',
      lable: '待发货',
      url: '../../subPages/orderList/orderList?active=2'
    },
    {
      img: '/static/icons/SH.png',
      lable: '待收货',
      url: '../../subPages/orderList/orderList?active=3'
    },
    {
      img: '/static/icons/QB.png',
      lable: '全部',
      url: '../../subPages/orderList/orderList?active=4'
    },
  ],
  contIcon: [{
    img: '/static/icons/1.png',
    lable: '实名认证',
    url: '../../subPages/orderList/orderList?active=1'
  },
  {
    img: '/static/icons/2.png',
    lable: '邀请好友',
    url: '../../subPages/orderList/orderList?active=2'
  },
  {
    img: '/static/icons/3.png',
    lable: '银行卡管理',
    url: '/pages/Bankcard/banklist/banklist'
  },
  {
    img: '/static/icons/4.png',
    lable: '公告中心',
    url: '../subPages/orderList/orderList?active=4'
  },
  {
    img: '/static/icons/5.png',
    lable: '设置中心',
    url: '/pages/Serve-Tool/Set/set'
  },
  {
    img: '/static/icons/6.png',
    lable: '推荐收益',
    url: '../subPages/orderList/orderList?active=4'
  },
  {
    img: '/static/icons/7.png',
    lable: '客服中心',
    url: '../subPages/orderList/orderList?active=4'
  },
],
  },

  onLoad(options) {
    
  },

  onReady() {

  },

  onShow() {
    this.getUserInfo()
  },

  async getUserInfo(){
    const res = await api.getUserInfo()
    if (res.code === 0) {
      this.setData({
        UserInfo:res.data
      })
    }
  },

  exit() {
    wx.removeStorageSync('USERINFO')
    var value = wx.getStorageSync('USERINFO')
    console.log('退出',value);
    wx.redirectTo({
      url: '/pages/Login/login',
    })
  }
})