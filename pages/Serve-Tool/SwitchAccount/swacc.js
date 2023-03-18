const api = require('../../../utils/reques').default

Page({

  data: {
    userInfo: '',
    accounts: [],
    isHidden: Number
  },


  onLoad(options) {
    this.getaccounts()
  },

  onReady() {

  },

  onShow() {

  },

  getaccounts() {
    const Info = wx.getStorageSync('USERINFO')
    const account = wx.getStorageSync('accounts') || []
    const exis = account.find(account => account.username === Info.username);
    const index = account.indexOf(exis); 


    this.setData({
      isHidden:index,
      userInfo: Info,
      accounts: account
    })
  },

  changing(e) {
    const {
      id,
      index
    } = e.currentTarget.dataset

    const accounts = wx.getStorageSync('accounts') || [];
    const existingAccount = accounts.find(account => account.username === id.username);
    if (existingAccount) {
      console.log('账号已存在');
    } else {
      accounts.push(res.data);
      wx.setStorageSync('accounts', accounts);
      console.log('账号添加成功');
    }
    wx.setStorageSync('USERINFO', id)

    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
      wx.showToast({
        title: '账号切换成功',
        icon: 'none'
      })
    }, 1000)

    
    this.getaccounts()

    this.setData({
      isHidden: index
    })
  }
})