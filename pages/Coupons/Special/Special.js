const api = require('../../../utils/reques').default

Page({

  data: {
    DealInfo: '',
  },

  onLoad(options) {

  },

  onShow() {
    this.getDeal()
  },

  async getDeal() {
    const res = await api.getDealInfo()
    if (res.code === 0) {
      let datas = res.data
      console.log('获取拼券专区仓位', datas);

      for (let i = 0; i < res.data.length; i++) {
        let a = res.data[i]
        let begin = a.deal_info.begin_time
        let end = a.deal_info.end_time
        let begins = new Date(begin * 1000);
        let ends = new Date(end * 1000);
        let options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        };
        datas[i].deal_info.begin_time = begins.toLocaleString('zh-CN', options);
        datas[i].deal_info.end_time = ends.toLocaleString('zh-CN', options);
      }
      this.setData({
        DealInfo: datas
      })

    }
  }
})