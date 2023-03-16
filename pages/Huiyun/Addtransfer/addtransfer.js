const api = require('../../../utils/reques').default

Page({
  data: {
    showPassword:false,
    to_user: '',
    integral: '',
    userInfo:{},
    type: 0
  },
  async getUserInfo() {
    const {code,data} = await api.getUserInfo()
    if (code === 0) {
      this.setData({
        userInfo: data,
      })
    }
  },
  async transferIntegral(surplus_password){
    const {to_user,integral,type} = this.data
    const params = {to_user,integral,type,surplus_password}
    const {code} = await api.transferIntegral(params)
    if(code===0){
      this.setData({
        showPassword:false,
        to_user:'',
        integral:''
      })
      this.getUserInfo()
      wx.showToast({
        title: '转赠成功',
        icon:'none'
      })
    }
  },
  payOrderNext(e){
    this.transferIntegral(e.detail)
  },
  changeIntegral(e){
    const num = parseInt(e.detail.value)
    if(num>this.data.userInfo.integral) this.setData({integral:this.data.userInfo.integral})
  },
  closePay(){this.setData({showPassword:false})},
  async register(){
    const {to_user,integral} = this.data
    if(!integral)return wx.showToast({
      title: '请输入转赠数量',
      icon:'none'
    })
    if(!to_user)return wx.showToast({
      title: '请输入转赠人编号',
      icon:'none'
    })
    this.setData({
      showPassword:true
    })
  },
  onLoad(options) {
    this.getUserInfo()
  }

})