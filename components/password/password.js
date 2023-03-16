const api = require('../../utils/reques').default
Component({
  properties: {
    payPrice: String,
    info:{},
    type:1,
    popupType:0,
    top:0,
    show:false
  },
  
  data: {
    buy_number:1,
    takeNotes:{},
    statusBar: wx.getMenuButtonBoundingClientRect(),
    codeList: [],
    bottom: wx.getStorageSync('bottom'),
    keyboardList: [{
      name: '1'
    }, {
      name: '2'
    }, {
      name: '3'
    }, {
      name: '4'
    }, {
      name: '5'
    }, {
      name: '6'
    }, {
      name: '7'
    }, {
      name: '8'
    }, {
      name: '9'
    }, {
      name: ''
    }, {
      name: '0'
    }, {
      name: 'del'
    }, ],
    inputFocus0: false,
    inputFocus1: false,
    inputFocus2: false,
    inputFocus3: false,
    inputFocus4: false,
    inputFocus5: false,
  },
  methods: {
    async readyDealOrder(){
      const {code,data} = await api.readyDealOrder({deal_round_id:this.properties.info.deal_info.id})
      if(code===0){
        this.setData({takeNotes:data})
      }
    },
    closePay() {
      this.triggerEvent('closePay')
    },
    delOne() {
      if (this.data.codeList.length > 0) {
        let arr = this.data.codeList.splice(0, this.data.codeList.length - 1)
        this.setData({
          codeList: arr
        })
      }
    },
    addOne(e) {
      if (e.currentTarget.dataset.num != '') {
        let arr = this.data.codeList
        if(arr.length===6) return
        arr.push(e.currentTarget.dataset.num)
        this.setData({
          codeList: arr
        })
      }
      if(this.properties.popupType===1) return
      if (this.data.codeList.length == 6) {
        this.triggerEvent('payOrderNext', this.data.codeList.join(''))
      }
    },
    setCode(e) {
      if (!e.detail.value) {
        return
      }
      let inputlist = e.detail.value.split('')
      if (inputlist.length == 1) {
        let arr = this.data.codeList
        arr[e.currentTarget.dataset.num] = e.detail.value
        this.setData({
          codeList: arr
        })
        if (e.currentTarget.dataset.num == 0) {
          this.setData({
            inputFocus0: false,
            inputFocus1: true,
            inputFocus2: false,
            inputFocus3: false,
            inputFocus4: false,
            inputFocus5: false
          })
        } else if (e.currentTarget.dataset.num == 1) {
          this.setData({
            inputFocus0: false,
            inputFocus1: false,
            inputFocus2: true,
            inputFocus3: false,
            inputFocus4: false,
            inputFocus5: false
          })
        } else if (e.currentTarget.dataset.num == 2) {
          this.setData({
            inputFocus0: false,
            inputFocus1: false,
            inputFocus2: false,
            inputFocus3: true,
            inputFocus4: false,
            inputFocus5: false
          })
        } else if (e.currentTarget.dataset.num == 3) {
          this.setData({
            inputFocus0: false,
            inputFocus1: false,
            inputFocus2: false,
            inputFocus3: false,
            inputFocus4: true,
            inputFocus5: false
          })
        } else if (e.currentTarget.dataset.num == 4) {
          this.setData({
            inputFocus0: false,
            inputFocus1: false,
            inputFocus2: false,
            inputFocus3: false,
            inputFocus4: false,
            inputFocus5: true
          })
        } else if (e.currentTarget.dataset.num == 5) {
          this.setData({
            inputFocus0: false,
            inputFocus1: false,
            inputFocus2: false,
            inputFocus3: false,
            inputFocus4: false,
            inputFocus5: false
          })
        }
      }
      if (this.data.codeList.length == 6) {
        this.triggerEvent('payOrderNext', this.data.codeList.join(''))
      }
    },
    onSubmit(){
      this.triggerEvent('payOrderNext', {paw:this.data.codeList.join('').slice(0,6),buy_number:this.data.buy_number})
    },
    onChange(event) {
      const num = (this.properties.info.deal_info.max_number-this.data.takeNotes.buy_sum_number)
      this.setData({
        buy_number:event.detail>num?num:event.detail
      })
    },
  },
  lifetimes: {
    attached: function() {
      if(this.properties.popupType===1){
        this.readyDealOrder()
      }
    }
  },
})