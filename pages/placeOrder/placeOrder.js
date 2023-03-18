const fetch = require("../../utils/reques").default
const app = getApp()
Page({
  data: {
    order_sn: '',
    order_id: 0,
    address: null, //头部地址
    remark: '', //备注
    commodityList: [], //商品内容
    amount: {}, //商品金额
    piece: 0, //共几件
    payPrice: 0,
    //支付方式
    payModeWX: true,
    payModeQB: false,
    walletBalance: {
      money: 0
    },
    //合计
    total: 0,
    showPassword: false,
    codeList: [],
    userInfo:{},
    payType:1
  },
  async getUserInfo(){
    const {code,data} = await fetch.getUserInfo()
    if(code===0){
      this.setData({
        userInfo:data
      })
    }
  },
  changePayType(e){
    this.setData({payType:e.target.dataset.type||e.currentTarget.dataset.type})
  },
  // 钱包支付输完回调
  async payOrderNext(e) {
    let data = {
      id: this.data.order_id,
      order_sn: this.data.order_sn,
      pay_type: this.data.payType,
      password: e.detail,
      openid: app.globalData.openId
    }
    const res = await fetch.getPayOrder(data)
    if (res.code === 0) {
      this.setData({
        showPassword:false
      })
      wx.showToast({
        title: '支付成功',
      })
      let timer = setTimeout(()=>{
        wx.redirectTo({
          url: `../subPages/orderDetails/orderDetails?id=${this.data.order_id}`,
        })
        clearTimeout(timer)
      },500)
    }
  },

  closePay() {
    this.setData({
      showPassword: false,
      codeList: []
    })
  },
  // 提交订单
  async submit(e) {
    if (!this.data.address) {
      wx.navigateTo({
        url: '../Address/GetAddress/getAddress',
      })
      return
    }
    let list = []
    this.data.commodityList.forEach(el => {
      let item = {
        goods_code: el.sku.goods_code,
        buy_cnt: el.selectNum,
        room_coupons: el.sku.room_coupons,
        price: el.sku.price
      }
      list.push(item)
    })
    let data = {
      user_address_id: this.data.address.id,
      product: list,
      // send_type: this.data.sendType,
      remarks: this.data.remark
    }
    const res = await fetch.getAddOrder(data)
    if (res.code === 0) {
      this.setData({
        payPrice: res.data.list[0].payment_money,
        order_id: res.data.list[0].id,
        order_sn: res.data.list[0].order_sn,
        paytype:e.target.dataset.type
      })
      this.setData({
        showPassword: true,
      })
    }
  },
  //头部地址
  async getUserAddress() {
    const {
      code,
      data
    } = await fetch.getUserAddress()
    if (code === 0) {
      let arr = data
      arr && arr.map((item, index) => {
        if (item.sort == 1) {
          this.setData({
            address: arr[index]
          })
        }
      })
    }
  },
  //选择物流配送或是送货上门
  changeSendtype(e) {
    this.setData({
      sendType: e.currentTarget.dataset.idx
    })
  },
  //添加地址
  goAddNewAddress() {
    wx.navigateTo({
      url: '../Address/GetAddress/getAddress',
    })
  },

  // 跳转收货地址
  receivingAddress() {
    wx.navigateTo({
      url: '../Address/GetAddress/getAddress?good=1',
    })
  },
  //共几件
  piece() {
    const {
      commodityList
    } = this.data
    let piece = 0
    commodityList.map(item => {
      piece += item.selectNum
    })
    this.setData({
      piece: piece
    })
  },
  // 加
  increasement(e) {
    const idx = e.currentTarget.dataset.idx
    const {
      commodityList
    } = this.data
    commodityList.map((item, index) => {
      if (index === idx) {
        item.selectNum++
      }
    })
    this.setData({
      commodityList: commodityList,
    })
    this.piece()
    this.total()
  },
  // 减
  decrease(e) {
    const idx = e.currentTarget.dataset.idx
    const {
      commodityList
    } = this.data
    commodityList.map((item, index) => {
      if (index === idx && item.selectNum > 1) {
        item.selectNum = item.selectNum - 1
      }
    })
    this.setData({
      commodityList: commodityList
    })
    this.total()
    this.piece()
  },
  // 支付方式
  payModeWX() {
    this.setData({
      payModeWX: this.data.payModeWX = true,
      payModeQB: this.data.payModeQB = false,
    })
  },
  payModeQB() {
    this.setData({
      payModeWX: this.data.payModeWX = false,
      payModeQB: this.data.payModeQB = true,
    })
  },
  // 合计
  total() {
    const {
      commodityList
    } = this.data
    let money = 0
    let roommoney = 0
    if (commodityList.length == 0) {
      return
    }
    let amount = this.data.amount
    commodityList.map((item, index) => {
      if (item.is_fare == 1) {
        amount.postal = 0
      }
      money += item.selectNum * item.sku.price
      roommoney += item.selectNum * item.sku.room_coupons
    })
    amount.room = roommoney
    this.setData({
      total: money,
      amount: amount
    })
  },
  onLoad: function (options) {
    if (wx.getStorageSync('commodityList')) {
      this.setData({
        commodityList: wx.getStorageSync('commodityList')
      })
    }
    if (options.address && options.address !== 'undefined') {
      let address = options.address
      address = JSON.parse(address)
      this.setData({
        address
      })
    }
    this.getUserInfo()
    this.total()
    this.piece()
  },
  onShow: function () {
    if (!this.data.address) {
      this.getUserAddress()
    }
  }
})