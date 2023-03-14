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


      submit() {
      
        const params = {
          name:this.data.name,
          id_card:this.data.id_card,
          bank_card: this.data.bank_card,
          bank_name: this.data.bank_name
        }
        const res = api.editBackCard(params)
        if (res.code === 0) {
          wx.showToast({
            title: '添加成功',
            icon: 'none'
          })
          wx.redirectTo({
            url: '../Banklist/banklist',
          })
        }
      }
      })