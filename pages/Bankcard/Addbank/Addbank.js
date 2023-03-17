const api = require('../../../utils/reques').default

Page({
  data: {
    name: '',
    id_card: '',
    bank_card: '',
    bank_name: ''
  },

  onLoad(options) {

  },

  onShow() {

  },


  async submit() {
    const {
      name,
      id_card,
      bank_card,
      bank_name
    } = this.data

    if (!name) return wx.showToast({
      title: '请输入用户名',
      icon: 'none'
    })
    if (bank_card.length !== 16) return wx.showToast({
      title: '请输入16位数的卡号',
      icon: 'none'
    })
    if (!bank_name) return wx.showToast({
      title: '请输入用银行卡名称',
      icon: 'none'
    })
    if (id_card.length !== 18) return wx.showToast({
      title: '请输入18数身份证',
      icon: 'none'
    })
    const params = {
      name:name,
      id_card: id_card,
      bank_card: bank_card,
      bank_name: bank_name
    }
    const {code,data} = await api.editBackCard(params)
    if (code === 0) {
      wx.showToast({
        title: '添加成功',
        icon: 'none',
        success: function () {
          setTimeout(function () {
            //要延时执行的代码
            wx.redirectTo({
              url: '../Banklist/banklist',
            })
          }, 1500) //延迟时间
        }
      })
    }
  }
})