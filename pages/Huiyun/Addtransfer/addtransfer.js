const api = require('../../../utils/reques').default

Page({
  data: {
    showPassword:false,
    changeType:'',
    to_user: '',
    integral: '',
    userInfo:{},
    type: 0
  },
  scanCode(){
    let that = this
    wx.scanCode({
      success(e){
        let str = e.result
        let index = str.indexOf('=')
        let code = str.slice(index+1)
        that.setData({
          to_user:code
        })
      }
    })
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
    const {to_user,integral,type,changeType} = this.data
    const params = {to_user,type,surplus_password}
    let res = null
    if(changeType==0){
      params.integral_pq = integral
      res = await api.changeIntegral(params)
    }else{
      params.integral = integral
      res = await api.transferIntegral(params)
    }
    if(res.code===0){
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
    const total = this.data.changeType==0?this.data.userInfo.integral_pq:this.data.userInfo.integral
    if(num>total) this.setData({integral:total})
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
    this.setData({changeType:options.type||''})
    this.getUserInfo()
  }

})