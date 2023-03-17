import QRCode from '../../../utils/weapp.qrcode.js'
const fetch = require("../../../utils/reques").default;
Page({
  data: {
    info: {},
    id:'',
    show: false,
    isHidden: true,
    qrcodePath: ''
  },
  onShareAppMessage: function () {
    return {
      title: '邀请好友',
      path: '../Invite/invite'
    }
  },
  //分享
  // genPoster() {
  //   const that = this
  //   wx.showLoading({
  //     title: '加载中...',
  //   })
  //   that.setData({
  //     isHidden: false
  //   })
  //   const query = wx.createSelectorQuery()
  //   query.select('#canvas'+that.data.id)
  //     .fields({
  //       node: true,
  //       size: true
  //     })
  //     .exec((res) => {
  //       const {
  //         uuid,
  //         avatar,
  //         username
  //       } = that.data.info
  //       const canvas = res[0].node
  //       const ctx = canvas.getContext('2d')
  //       const window = wx.getSystemInfoSync()
  //       const {
  //         screenHeight,
  //         screenWidth
  //       } = window
  //       canvas.width = screenWidth
  //       canvas.height = screenHeight
  //       ctx.fillStyle = '#B7312A'
  //       ctx.fillRect(0, 0, screenWidth, screenHeight)
  //       ctx.fillStyle = '#fcfcfc'
  //       ctx.fillRect(screenWidth * 0.2 / 2, screenHeight * 0.1 / 2, screenWidth * 0.8, screenHeight * 0.9)
  //       ctx.fillStyle = '#fff'
  //       ctx.fillRect(screenWidth * 0.08 / 2, 80, screenWidth * 0.92, screenHeight * 0.2)
  //       // 用户信息
  //       ctx.font = "500 16px Arial";
  //       ctx.fillStyle = '#333333';
  //       ctx.fillText(username, screenWidth * 0.25, screenHeight * 0.18)
  //       ctx.font = "500 15px Arial";
  //       ctx.fillStyle = '#666666';
  //       ctx.fillText(uuid, screenWidth * 0.25, screenHeight * 0.21)
  //       ctx.font = "700 16px Arial";
  //       ctx.fillStyle = '#333333';
  //       ctx.fillText('邀请你加入', screenWidth * 0.25, screenHeight * 0.24)
  //       ctx.font = "600 17px Arial";
  //       ctx.fillText('扫码注册/下载', screenWidth * 0.35, screenHeight * 0.8)
  //       // 头像
  //       let avatarpic = canvas.createImage()
  //       avatarpic.src = avatar
  //       let [x, y, w, h] = [screenWidth * 0.06, screenHeight * 0.162, screenWidth * 0.18, screenWidth * 0.18];
  //       avatarpic.onload = (scaleBy = 2) => {
  //         ctx.save();
  //         ctx.beginPath();
  //         ctx.lineWidth = 2;
  //         ctx.strokeStyle = '#fff';
  //         ctx.arc(x + w / 2, y + h / 2, w / 2, 0, Math.PI * 2, false);
  //         ctx.clip();
  //         ctx.drawImage(avatarpic, x, y, w, h);
  //         ctx.stroke();
  //       }
  //       // 二维码
  //       wx.getImageInfo({
  //         src: that.data.qrcodePath,
  //         success: res => {
  //           const img = canvas.createImage();
  //           img.src = res.path;
  //           img.onload = () => {
  //             ctx.drawImage(img, screenWidth * 0.45 / 2, screenHeight * 0.38, screenWidth * 0.55, screenWidth * 0.55);
  //             wx.canvasToTempFilePath({
  //               canvas: canvas,
  //               x: 0,
  //               y: 0,
  //               width: screenWidth,
  //               height: screenHeight,
  //               success: function (res) {
  //                 wx.hideLoading()
  //                 wx.showShareImageMenu({
  //                   path: res.tempFilePath,
  //                   complete: res => {
  //                     that.setData({
  //                       isHidden: true
  //                     })
  //                   }
  //                 })
  //               },
  //               fail: function (res) {
  //                 wx.hideLoading()
  //               }
  //             })
  //           }
  //         }
  //       })
  //     })
  // },

  qrCode() {
    const {
      uuid
    } = wx.getStorageSync('USERINFO')
    const params = `http://tshui.taoqiy.com/register?id=${uuid}`;
    const imgData = QRCode.drawImg(params, {
      typeNumber: 4, // 密度
      errorCorrectLevel: 'L', // 纠错等级
      size: 800, // 白色边框
    })
    this.setData({
      qrcodePath: imgData
    })
  },

  switch() {
    this.setData({
      isHidden: !this.data.isHidden
    })
  },

  onLoad(options) {
    this.qrCode()
    this.setData({
      info: wx.getStorageSync('USERINFO')
    })
    console.log(this.data.info);
  },
  onShow(){
    const id = new Date().getTime().toString().slice(7)
    this.setData({id})
  }
})