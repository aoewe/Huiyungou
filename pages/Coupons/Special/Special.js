const api = require('../../../utils/reques').default
Page({
  data: {
    list: [],
    showPassword: false,
    deal_round_id: '',
    timer:null,
    loading: true,
    deal_id: '',
    index: 0,
    info: {}
  },

  onShow() {
    this.getDeal()
  },
  async buyDealOrder(e) {
    const {deal_round_id,deal_id,timer} = this.data
    if(timer) return
    this.setData({timer:true})
    const params = {deal_round_id,deal_id, surplus_password: e.paw, buy_number: e.buy_number}
    const {code} = await api.buyDealOrder(params)
    if (code === 0) {
      wx.showToast({
        title: '购买成功',
        icon: 'none'
      })
      this.setData({
        showPassword: false,timer:null
      })
    }else{
      this.setData({timer:null})
    }
  },
  closePay() {
    this.setData({
      showPassword: false
    })
  },
  payOrderNext(e) {
    if (e.detail.paw.length !== 6) return wx.showToast({
      title: '请输入完整的密码',
      icon: 'none'
    })
    if (!e.detail.buy_number) return wx.showToast({
      title: '请输入购买数量',
      icon: 'none'
    })
    this.buyDealOrder(e.detail)
  },
  goPay(e) {
    const {
      index
    } = e.currentTarget.dataset
    const {
      list
    } = this.data
    this.setData({
      showPassword: true,
      info: list[index],
      deal_id: list[index].id,
      deal_round_id: list[index].deal_info.id
    })
  },
  countDownFun(time) {
    time = time * 1000
    let timestamp = new Date().getTime()
    let times = time - timestamp
    let playTime,
      day = 0,
      hour = 0,
      minute = 0,
      second = 0; //时间默认值
    if (times > 0) {
      second = Math.floor(times / 1000); //未来时间距离现在的秒数
      day = Math.floor(second / 86400); //整数部分代表的是天；一天有24*60*60=86400秒 ；
      second = second % 86400; //余数代表剩下的秒数；
      hour = Math.floor(second / 3600); //整数部分代表小时；
      second %= 3600; //余数代表 剩下的秒数；
      minute = Math.floor(second / 60);
      second %= 60;
    }
    if (hour <= 9) hour = '0' + hour;
    if (minute <= 9) minute = '0' + minute;
    if (second <= 9) second = '0' + second;
    if (day > 0) {
      playTime = `${day}天 ${hour}:${minute}:${second}`;
    }
    if (day <= 0 && hour > 0) {
      playTime = `${hour}:${minute}:${second}`;
    }
    if (day <= 0 && hour <= 0) {
      playTime = `${minute}:${second}`;
    }
    return {
      day,
      hour,
      minute,
      second
    }
  },
  async getDeal() {
    const {
      code,
      data
    } = await api.getDealInfo()
    if (code === 0) {
      setInterval(() => {
        data.forEach((item, index) => {
          const {
            day,
            hour,
            minute,
            second
          } = this.countDownFun(item.deal_info.begin_time)
          item.day = day
          item.hour = hour
          item.minute = minute
          item.second = second
        });
        this.setData({
          list: data,
          loading:false
        })
      }, 1000)
    }
  }
})