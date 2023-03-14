
const api = require('../../utils/reques').default

Page({
  data: {
    username:'',
    password:'',
  },

  onLoad(options) {

  },
  onShow() {

  },
  async submit() {
    const {
      username,
      password,
    } = this.data
    if (!username) return wx.showToast({
      title: '请输入用户名',
      icon: 'none'
    })
    if (!password) return wx.showToast({
      title: '请输入密码',
      icon: 'none'  
    })

    const params = {
      username,
      password,
    }
    const res = await api.login(params)
    if (res.code === 0) {
      console.log(res.data);
      wx.setStorageSync('USERINFO', res.data)
      // if(res.data.mobile==='13400000000'){
      //   wx.redirectTo({
      //     url: '../../showPage/showPage',
      //   })
      //   return
      // }
      wx.showToast({
        title: '登录成功',
        icon: 'none'
      })
      
      let timer = setTimeout(() => {
        wx.redirectTo({
          url: '/pages/TabBar/home/home',
        })
        clearTimeout(timer)
      }, 500)
    } else {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    }
  },

})