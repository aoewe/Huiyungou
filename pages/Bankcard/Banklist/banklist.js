const api = require('../../../utils/reques').default

Page({
  data: {
  list:[],
  },

  onLoad(options) {
    
  },

  onShow() {
    this.getBankCardList()
  },

  async getBankCardList() {
    const params = {
      page:1,
      size:20,
    }
    const res = await api.getBankCardList(params)
    if (res.code === 0) {
      const {
        list
      } = res.data
      const datas = list 
      for (let i = 0; i < list.length; i++) {
        let a = list[i]
        let b = a.bank_card.substr(12, 4)
        datas[i].bank_card = b
        
        this.setData({
          list:datas
        })
      }
    }
  }
})