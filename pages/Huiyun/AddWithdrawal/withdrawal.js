const api = require('../../../utils/reques').default
Page({

  data: {
    bankInfo: '',
    integral:'',
    info:{}
  },
  async readyWithdrawal() {
    const {code,data} = await api.readyWithdrawal()
    if (code === 0) {
      this.setData({
        info: data,
      })
    }
  },
  async withdrawal(surplus_password){
    const {bankInfo,integral,type} = this.data
    const params = {user_bank_id:bankInfo.id,integral,surplus_password}
    const {code} = await api.withdrawal(params)
    if(code===0){
      this.setData({
        showPassword:false,
        integral:''
      })
      this.readyWithdrawal()
      wx.showToast({
        title: '提现已提交，请等待审核！',
        icon:'none'
      })
    }
  },
  payOrderNext(e){
    this.withdrawal(e.detail)
  },
  changeIntegral(e){
    const num = parseInt(e.detail.value)
    if(num>this.data.info.integral) this.setData({integral:this.data.info.integral})
  },
  closePay(){this.setData({showPassword:false})},
  async register(){
    const {bankInfo,integral} = this.data
    if(!integral)return wx.showToast({
      title: '请输入提现数量',
      icon:'none'
    })
    if(!bankInfo)return wx.showToast({
      title: '请选择提现卡号',
      icon:'none'
    })
    this.setData({
      showPassword:true
    })
  },
  onShow() {
    if (this.data.bankInfo) this.setData({
      bankInfo: JSON.parse(this.data.bankInfo)
    })
  },
  onLoad(options) {
    this.readyWithdrawal()
  }
})