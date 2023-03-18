// app.js
App({
  onLaunch() {
    this.checkVersion()
  },
  checkVersion() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            updateManager.applyUpdate();
          });
          updateManager.onUpdateFailed(function () {
            wx.showModal({
              title: '已经有新版本喽~',
              confirmColor: '#2A9F93',
              cancelColor: '#666',
              content: '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开哦~'
            });
          });
        }
      });
    } else {
      wx.showModal({
        title: '溫馨提示',
        confirmColor: '#2A9F93',
        cancelColor: '#666',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      });
    }
  },
  globalData: {
    userInfo: null
  }
})