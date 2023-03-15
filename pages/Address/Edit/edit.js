const fetch = require("../../../utils/reques").default
const chooseLocation = requirePlugin('chooseLocation');
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min')
const app = getApp()
Page({
  data: {
    params: {
      id: '',
      city:'',
      province: '', //省code
      // lat: '', //维度
      // lng: '', //经度
      district: '', //区code
      address: '', //详细地址
      sort: '', //是否为默认地址，默认0不是
      title: '', //地址名称
      name: '', //收件人姓名
      mobile: '', //收件人电话
      door_num: '', //门牌号
    },
    poi: {
      lat: '',
      lng: ''
    },
    markers: {
      id: 0,
      latitude: '',
      longitude: '',
      iconPath: '/static/imgs/amdw.png',
      width: 20,
      height: 30,
    },
  },
  async submit() {
    let data = this.data.params
    if (!data.district) {
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none'
      })
      return
    }
    if (!data.name) {
      wx.showToast({
        title: '收货人不能为空',
        icon: 'none'
      })
      return
    }
    if (!data.mobile) {
      wx.showToast({
        title: '收货人手机号不能为空',
        icon: 'none'
      })
      return
    }
    if (!/^((\(\d{2,3}\))|(\d{3}\-))?1(3|5|8|9)\d{9}$/.test(data.mobile)) {
      wx.showToast({
        title: '手机格式错误',
        icon: 'none'
      })
      return
    }
    const {
      code
    } = await fetch.editUserAddress(data)
    if (code === 0) {
      var pages = getCurrentPages()
      var previousPage = pages[pages.length - 2]
      previousPage.getUserAddress()
      wx.navigateBack()
    } else {
      wx.showToast({
        title: data.msg,
        icon: 'none'
      })
    }
  },
  changeName(e) {
    this.setData({
      ['params.name']: e.detail.value
    })
  },
  changeMobile(e) {
    this.setData({
      ['params.mobile']: e.detail.value
    })
  },
  changeDoornum(e) {
    this.setData({
      ['params.door_num']: e.detail.value
    })
  },
  // 是否默认地址
  checked(e) {
    this.setData({
      ['params.sort']: 1 ? 0 : 1
    })
    if (e.detail == true) {
      this.setData({
        ['params.sort']: 1
      })
    } else {
      this.setData({
        sort: 0
      })
    }
  },
  // 地图选点
  topMao() {
    const referer = 'stzs';
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + 'BNRBZ-L4VEJ-Y4UFT-FYO2A-CUNBO-COBEO' + '&referer=' + referer
    })
  },
  // 获取省,区code
  getCode(district) {
    let that = this
    var qqmapsdk = new QQMapWX({
      key: 'BNRBZ-L4VEJ-Y4UFT-FYO2A-CUNBO-COBEO'
    })
    qqmapsdk.search({
      keyword: district,
      success(res) {
        var code = res.data[0].ad_info.adcode
        code = code.toString()
        var cityCode = code.substr(0, code.length - 2) + '00'
        that.setData({
          ['params.province']: cityCode,
          ['params.district']: code
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  onLoad: function (options) {
    let that = this
    let params = {}
    options.params && (params = JSON.parse(options.params))
    wx.getLocation({
      altitude: 'altitude',
      success: res => {
        that.setData({
          params,
          ['markers.latitude']: res.latitude,
          ['markers.longitude']: res.longitude,
          ['poi.lat']: res.latitude,
          ['poi.lng']: res.longitude
        })
      }
    })
  },
  onShow: function () {
    const location = chooseLocation.getLocation()
    if (location) {
      this.setData({
        ['params.district']: location.district,
        ['params.city']: location.city,
        ['params.address']: location.address,
        ['params.title']: location.name,
        ['markers.latitude']: location.latitude,
        ['markers.longitude']: location.longitude,
        ['poi.lat']: location.latitude,
        ['poi.lng']: location.longitude
      })
      this.getCode(location.address)
    }
  },
  onUnload() {
    chooseLocation.setLocation(null);
  }
})