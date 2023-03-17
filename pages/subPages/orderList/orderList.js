const api = require("../../../utils/reques").default
const app = getApp()
Page({
  data: {
    active: 0,
    type: wx.getStorageSync('type'),
    tabs: [{
      name: 0,
      title: '全部'
    }, {
      name: 1,
      title: '待付款'
    }, {
      name: 2,
      title: '待发货'
    }, {
      name: 3,
      title: '待收货'
    }, {
      name: 4,
      title: '已完成'
    }],
    order_status: '',
    list: [],
    page: 1,
    size: 10,
    total: 0,
    loading: true
  },
  confirmOrder(e) {
    const that= this
    const id = e.target.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定该商品已收到？',
      success:async res=> {
        if (res.confirm) {
          const {code} = await api.confirmOrder({ id })
          if(code===0){
            wx.showToast({
              title: '收货成功',
              icon:'none'
            })
            that.setData({
              order_status:2,
              list:[],
              page:1
            })
            that.getOrderList()
          }
        }
      }
    })
    
  },
  // 查看物流
  toLogistics(e) {
    wx.navigateTo({
      url: '../logistics/logistics?id=' + e.currentTarget.dataset.id,
    })
  },
  // 发表评论
  toComment(e) {
    let info = e.currentTarget.dataset.item
    info = JSON.stringify(info)
    wx.navigateTo({
      url: '../comment/comment?info=' + info + '&product_type=0',
    })
  },
  onChange(e) {
    this.setData({
      page: 1,
      loading: true,
      order_status: '',
      list: [],
    })
    switch (e.detail.index) {
      case 1:
        wx.setNavigationBarTitle({
          title: '待付款',
        })
        this.setData({
          order_status: 0
        })
        break;
      case 2:
        wx.setNavigationBarTitle({
          title: '待发货',
        })
        this.setData({
          order_status: 1
        })
        break;
      case 3:
        wx.setNavigationBarTitle({
          title: '待收货',
        })
        this.setData({
          order_status: 2
        })
        break;
      case 4:
        wx.setNavigationBarTitle({
          title: '已完成',
        })
        this.setData({
          order_status: 3
        })
        break;
      default:
        wx.setNavigationBarTitle({
          title: '全部订单',
        })
        break;
    }
    this.getOrderList()
  },
  // 订单二次支付
  toTowPay(e) {
    let {
      order_invalid_time,
      payment_money,
      district_money,
      order_sn,
      id,
      create_time,
      detail
    } = e.currentTarget.dataset.item
    let good_name = detail[0].good_name
    let data = {
      order_invalid_time,
      payment_money,
      district_money,
      order_sn,
      id,
      create_time,
      good_name
    }
    data = JSON.stringify(data)
    wx.navigateTo({
      url: '../twoPayment/twoPayment?info=' + data,
    })
  },
  async getOrderList() {
    const {
      order_status
    } = this.data
    const params = {
      order_status,
      size: this.data.size,
      page: this.data.page
    }
    const {
      code,
      data
    } = await api.getOrderList(params)
    if (code === 0) {
      this.data.list.push(...data.list)
      this.setData({
        list: this.data.list,
        page: ++this.data.page,
        total: data.total,
        loading: false
      })
    }
  },
  onLoad(options) {
    let active = parseInt(options.active)
    this.setData({
      active
    })
    if (!active) {
      this.getOrderList()
    }
  },
  onShow() {
    if (this.data.type != wx.getStorageSync('type')) {
      this.setData({
        type: wx.getStorageSync('type')
      })
    }
  },
  onReachBottom() {
    if (this.data.total === this.data.list.length) return
    this.setData({
      loading: true
    })
    this.getOrderList()
  }
})