const fetch = require("../../../utils/reques").default;
const app = getApp()
Page({
  data: {
    bottom: wx.getStorageSync('bottom'),
    type:wx.getStorageSync('type'),
    jiaonang: wx.getMenuButtonBoundingClientRect(),
    showSpecifications: false,
    point: 0, //导航锚点
    id: '', //当前产品id
    isParameter: false,
    comments: [], //评论
    detailData: {}, //产品数据
    skuList: [], //规格列表
    skuData: null, //选中规格后的数据
    keys: [], //去重后的规格
    selValue: [], //选中规格的标亮项
    swiperNum: null, //轮播数字
    selectNum: 1, //选中数量
    address: '', //配送默认地址
    city: ''
  },
  goDetails(){
    wx.pageScrollTo({
      scrollTop: 640
    })
  },
  goTop(){
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  // 商品收藏
  handelLike(e) {
    let data = {
      product_id: e.currentTarget.dataset.id,
      type: 2
    }
    fetch.setCollection(data).then(res => {
      if (res.data.code === 0) {
        wx.showToast({
          title: '收藏成功'
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  },
  // 图片放大
  preview(e) {
    wx.previewImage({
      urls: e.currentTarget.dataset.imgarr,
      current: e.currentTarget.dataset.img
    })
  },
  
  // 导航栏显示/隐藏
  showNav(scrollTop, maxTop) {
    let opacity = 0
    let point = this.data.point
    if (scrollTop > maxTop) opacity = 1
    if (scrollTop < 620) {
      point = 0
    } else {
      point = 1
    }
    this.setData({
      point,
      opacity,
      scrollTop: scrollTop
    })
  },
  handelBack() {
    wx.navigateBack()
  },
  swiperChange(e) {
    if(e.detail.current!==0){
      let videoCtx = wx.createVideoContext('video')
      videoCtx.pause() 
    }
    this.setData({
      swiperNum: e.detail.current + 1
    })
  },
  //修改选中数量
  changeNum(value) {
    this.setData({
      selectNum: value.detail
    })
  },
  //提交订单
  toOrder() {
    wx.removeStorageSync('commodityList')
    let obj = this.data.detailData
    obj.sku = this.data.skuData
    obj.selectNum = this.data.selectNum
    let commodityList = []
    commodityList.push(obj)
    wx.setStorageSync('commodityList', commodityList)
    this.setData({
      showSpecifications: false
    })
    let address = this.data.address
    address = JSON.stringify(address)
    wx.navigateTo({
      url: '../placeOrder/placeOrder?address=' + address,
    })
  },
  handelClose() {
    this.setData({
      showSpecifications: false
    });
  },
  //显示隐藏参数
  onClose() {
    this.setData({
      isParameter: false
    })
  },
  showParameter() {
    this.setData({
      isParameter: true
    })
  },
  //展开选择规格
  goPlaceOrder() {
    this.setData({
      showSpecifications: true
    })
  },
  //获取产品详情
  async loadDetail() {
    const {code,data} = await fetch.getProductdetail({
        id: this.data.id})
      if (code === 0) {
        console.log(data);
        this.setData({
          detailData: data
        })
      }
  },
  //获取评论
  async loadComments() {
    const {code,data} = await fetch.getWineComments(
      {
        id: this.data.id,
        page: 1,
        size: 3
      })
      if (code === 0) {
        this.setData({
          comments: data
        })
      }
  },
  //获取产品规格
  async getSpecs() {
    const {code,data} = await fetch.getSKU(
      {
        id: this.data.id
      })
      if (code === 0) {
        let selValue = this.data.selValue
        data[0].attr.forEach(i => {
          selValue.push(i.value)
        })
        this.setData({
          skuList: data,
          // 默认选中第一个
          skuData: data[0],
          selValue
        })
        this.getSkuList(data)
      }
  },
  // 规格数据
  getSkuList(data) {
    let currentSkuList = data.map(item => item.attr);
    this.transMatrix(currentSkuList)
  },
  // 规格去重用于页面展示
  transMatrix(currentSkuList) {
    let obj = {};
    currentSkuList.forEach(i => {
      i.forEach(item => {
        if (!obj[item['name']]) {
          obj[item['name']] = {
            title: item['name'],
            value_list: {
              [item['value']]: {
                value: item['value']
              }
            }
          }
        } else if (!obj[item['name']].value_list[item['value']]) {
          obj[item['name']].value_list[item['value']] = {
            value: item['value']
          }
        }
      })
    })
    let arr = []
    for (let k in obj) {
      let i = {
        name: obj[k].title,
        list: obj[k].value_list
      }
      arr.push(i)
    }
    this.setData({
      keys: arr
    })
  },
  // 获取点击类型和值拼接成字符串
  changeItem(e) {
    let selValue = this.data.selValue
    let value = e.currentTarget.dataset.value
    let trindex = e.currentTarget.dataset.trindex
    selValue.splice(trindex, 1, value)
    this.setData({
      selValue
    })
    selValue = selValue.toString() + ','
    this.selectAttr(selValue)
  },
  // 通过字符串和每一项attr对比
  selectAttr(str1) {
    this.data.skuList.map(i => {
      let str2 = ''
      i.attr.map(j => {
        str2 += j.value + ','
      })
      if (str1 == str2) {
        this.setData({
          skuData: i
        })
        return
      }
    })
  },
  // 查看更多评论
  handelMoreComments() {
    wx.navigateTo({
      url: '/hotelPages/pages/commentAll/commentAll?id=' + this.data.id + '&type=1',
    })
  },
  // 默认配送地址
  async getUserAddress() {
   const {code,data} = await fetch.getUserAddress({
      size: 1
    })
    if(code===0){
      this.setData({
        address: data[0]
      }) 
    }
    (!data.length && wx.getStorageSync('type')!=1) && this.getCity()
  },
  toSelAddress() {
    wx.navigateTo({
      url: '../../subPages/address/address?good=1',
    })
  },
  onCloseAction() {
    this.setData({
      showSpecifications: false
    })
  },
  // 获取当前城市信息
  getCity() {
    let that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        wx.setStorageSync('latitude', res.latitude)
        wx.setStorageSync('longitude', res.longitude)
        var qqmapsdk = new QQMapWX({
          key: app.globalData.key
        });

        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success(res) {
            that.setData({
              city: res.result.address_component.province + '  ' + res.result.address_component.city
            })
          },
          fail: function (info) {
            console.log(info)
          }
        })
      }
    })
  },

  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getSpecs()
    this.loadDetail()
    // this.loadComments()
    if (wx.getStorageSync('USERINFO').token) {
      this.getUserAddress()
    }
  },
  onShow(){
    if(this.data.type!=wx.getStorageSync('type')){
      this.setData({
        type:wx.getStorageSync('type')
      })
    }
  },
  onReady: function () {
    if (!wx.getStorageSync('USERINFO').token) {
      this.getCity()
    }
    wx.getSystemInfo({
      success: (result) => {
        this.setData({windowHeight:result.windowHeight})
      },
    })
  },

  // 监听页面滚动
  onPageScroll: function (e) {
    let scrollTop = e.scrollTop
    this.showNav(scrollTop, 280)
  }
})