const api = require('../../utils/reques').default
// const des = require('../../utils/code')
var timer = null
var time = 60
const app = getApp()

Page({
  data: {
    statusBar: wx.getMenuButtonBoundingClientRect(),
    mobile: '',
    username: '',
    code: '',
    password: '',
    up_uuid: '',
    show: false,
    type: false,
    text: '发送验证码'
  },
  // 发送验证码
  async sendCode() {
    if (timer) return
    const that = this
    if (!/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(this.data.mobile)) return wx.showToast({
      title: '手机号码格式错误',
      icon: 'none'
    })
    const params = {
      mobile: this.data.mobile,
      type: 2
    }

    const res = await api.sendcode(params)
      const {
        code,
        msg
      } = res
    console.log(code);
    if (code === 0) {
      wx.showToast({
        title: '发送成功',
        icon: 'none'
      })
      fun()

      function fun() {
        console.log('显示切换');
        clearTimeout(timer)
        timer = setTimeout(() => {
          time--
          that.setData({
            text: `${time}s后重新获取`
          })
          if (time <= 0) {
            clearTimeout(timer)
            timer = null
            time = 60
            that.setData({
              text: '发送验证码'
            })
            return
          }
          fun()
        }, 1000)
      }
    } else {
      wx.showToast({
        title: msg,
        icon: 'none'
      })
    }
  },
  back() {
    wx.navigateBack()
  },
  async login(params) {
    const param = {
      username: params.username,
      password: params.password
    }
    const res = await api.login(param)
    if (res.code === 0) {
      const type = this.data.type
      if (type === false) {
        const accounts = wx.getStorageSync('accounts') || [];
        const existingAccount = accounts.find(account => account.username === res.data.username);
        if (existingAccount) {
          console.log('账号已存在');
        } else {
          accounts.push(res.data);
          wx.setStorageSync('accounts', accounts);
        }
        wx.setStorageSync('USERINFO', res.data)
        wx.showToast({
          title: '登录成功',
          icon: 'none'
        })
        wx.setStorageSync('type', res.data.type)
        wx.switchTab({
          url: '/pages/TabBar/home/home',
        })
      } else {
        const accounts = wx.getStorageSync('accounts') || [];
        accounts.push(res.data);
        wx.setStorageSync('accounts', accounts);
        console.log('账号添加成功');

        wx.showToast({
          title: '添加新账号成功',
          icon: 'none',
          success: function () {
            setTimeout(function () {
              wx.redirectTo({
                url: '../Serve-Tool/SwitchAccount/swacc',
              })
            }, 1500)
          }
        })
      }



    }
  },

  //注册
  async register() {
    const {
      code,
      username,
      password,
      up_uuid,
      mobile
    } = this.data
    if (!/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(mobile)) return wx.showToast({
      title: '手机号码格式错误',
      icon: 'none'
    })
    if (!code) return wx.showToast({
      title: '请输入验证码',
      icon: 'none'
    })
    if (!password) return wx.showToast({
      title: '请输入密码',
      icon: 'none'
    })
    if (!up_uuid) return wx.showToast({
      title: '请输入推荐人账号',
      icon: 'none'
    })
    if (!username) return wx.showToast({
      title: '请输入用户名',
      icon: 'none'
    })

    const params = {
      code,
      username,
      password,
      up_uuid,
      mobile
    }
    const res = await api.register(params)
    if (res.code === 0) {
      wx.showToast({
        title: '注册成功',
        icon: 'none'
      })
      let timer = setTimeout(() => {
        this.login({
          username,
          password
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
  showPaw() {
    this.setData({
      show: !this.data.show
    })
  },
  onUnload() {
    clearTimeout(timer)
    time = 60
    timer = null
  },
  onLoad(options) {
    this.setData({
      type: options.type
    })
    console.log(options.type);
  }
})