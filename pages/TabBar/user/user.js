const api = require('../../../utils/reques').default

Page({
  data: {
    statusBar: wx.getMenuButtonBoundingClientRect(),
    UserInfo: '',
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
        url: '../../subPages/orderList/orderList'
      },
    ],
    contIcon: [
      {
        img: '/static/icons/2.png',
        lable: '邀请好友',
        url: '../../Serve-Tool/Invite/invite'
      },
      {
        img: '/static/icons/3.png',
        lable: '银行卡管理',
        url: '../../Bankcard/Banklist/banklist'
      },
      {
        img: '/static/icons/4.png',
        lable: '公告中心',
        url: '/pages/Serve-Tool/Notice/notice'
      },
      {
        img: '/static/icons/5.png',
        lable: '设置中心',
        url: '/pages/Serve-Tool/Set/set'
      },
      {
        img: '/static/icons/6.png',
        lable: '推荐收益',
        url: '../../Reward/reward'
      },
      {
        img: '/static/icons/7.png',
        lable: '客服中心',
        url: '../subPages/orderList/orderList?'
      },
      {
        img: '/static/icons/8.png',
        lable: '我的直推',
        url: '../../Serve-Tool/FansList/FansList'
      },
    ],
  },
  imgError(){
    this.setData({
      'UserInfo.avatar':'http://tshui.taoqiy.com/register/static/default.png'
    })
  },

  onShow() {
    this.getUserInfo()
  },

  async getUserInfo() {
    const res = await api.getUserInfo()
    if (res.code === 0) {
      this.setData({
        UserInfo: res.data
      })
    }
  },

  exit() {
    wx.removeStorageSync('USERINFO')
    wx.redirectTo({
      url: '/pages/Login/login',
    })
  }
})