const apiurl = `https://app.taishih.com`
const api = {
  login: `${apiurl}/app/user/login`, // 登录
  register: `${apiurl}/app/User/register`, // 注册
  sendcode: `${apiurl}/app/user/sendcode`, // 发送验证码
  resetUserPassword: `${apiurl}/app/user/resetUserPassword`, // 重置密码
  getUserInfo: `${apiurl}/app/user/getUserInfo`, //获取用户信息
  index: `${apiurl}/app/User/index`, //首页
  getUserCapital: `${apiurl}/app/user/getUserCapital`, //用户信息钱包
  getOrderList: `${apiurl}/app/order/getOrderList`, //获取订单列表
  gethomeproduct: `${apiurl}/app/homePage/product`, //首页产品
  extension: `${apiurl}/app/homePage/extension`, //首页推广
  getProductList: `${apiurl}/app/product/getproductlist`, //产品列表
  transferIntegral: `${apiurl}/app/Capital/transferIntegral`, //转让
  getProductdetail: `${apiurl}/app/product/getProductdetail`, //产品详情
  readyDealOrder: `${apiurl}/app/Deal/readyDealOrder`, //拼券专区订单预备接口
  getsku: `${apiurl}/app/product/getSKU`, //产品规格
  getWineComments: `${apiurl}/app/product/getComments`, //获取相关评论
  getaddorder: `${apiurl}/app/order/addOrder`, //创建订单
  editUserAddress: `${apiurl}/app/user/editUserAddress`, //编辑收货地址
  setdefaultaddress: `${apiurl}/app/user/setDefaultAddress`, //设置默认地址
  getUserAddress: `${apiurl}/app/user/getUserAddress`, //获取地址
  deluseraddress: `${apiurl}/app/user/delUserAddress`, //删除地址
  buyDealOrder: `${apiurl}/app/Deal/buyDealOrder`, //仓单购买
  getUserCapital: `${apiurl}/app/user/getUserCapital`, //用户资产
  payWinOrder: `${apiurl}/app/order/payOrder`, //商品订单支付
  editUser: `${apiurl}/app/user/editUser`, //编辑个人信息
  uploadImg: `${apiurl}/app/upload/uploadImg`, //图片上传
  getRegion: `${apiurl}/app/common/getRegion`, //获取区域
  setUserOpinion: `${apiurl}/app/user/setUserOpinion`, //意见反馈
  getWinOrderInfo: `${apiurl}/app/order/getOrderInfo`, //获取订单详情
  getNewsBrief: `${apiurl}/app/news/getNewsBrief`, //消息简述
  editHeadImg: `${apiurl}/app/User/editHeadImg`, //修改用户头像
  getNewsByTos: `${apiurl}/app/news/getNewsByTos`, //消息列表
  readAll: `${apiurl}/app/news/readAll`, //已读所有消息
  getBankCardList: `${apiurl}/app/user/getBankCardList`, //银行卡列表
  editBackCard: `${apiurl}/app/user/editBackCard`, //编辑or新增银行卡
  getExpressInfo: `${apiurl}/app/order/getExpressInfo`, //查看物流状态
  delayOrder: `${apiurl}/app/order/delayOrder`, //延迟收货
  getStreamList: `${apiurl}/app/capital/getStreamList`, //钱包流水
  withdrawal: `${apiurl}/app/user/withdrawal`, //用户提现
  readyWithdrawal: `${apiurl}/app/user/readyWithdrawal`, //提现信息预备
  getRewardIntegral: `${apiurl}/app/Capital/getRewardIntegral`, //获取奖励明细
  getDealInfo: `${apiurl}/app/Deal/getDealInfo`, //预展
  getAutoOrderOne: `${apiurl}/app/Deal/getAutoOrderOne`, //预展中心（运营中心/旗下挂单）
  getAutoOrderTwo: `${apiurl}/app/Deal/getAutoOrderTwo`, //预展中心（收购大厅）
  transferExhibits: `${apiurl}/app/Deal/transferExhibits`, //预转展品
  buyAutoOrder: `${apiurl}/app/Deal/buyAutoOrder`, //一键收购
  getExhibitsStream: `${apiurl}/app/Capital/getExhibitsStream`, //展品流水
  checkRealName: `${apiurl}/app/User/checkRealName`, //实名认证
  changeIntegral: `${apiurl}/app/Capital/changeIntegral`, //积分转化
  getFansList: `${apiurl}/app/User/getFansList`, //粉丝列表
  getArticleList: `${apiurl}/app/user/getArticleList`, //文章列表
  confirmOrder: `${apiurl}/app/order/confirmOrder`, //收货
  getArticleInfo: `${apiurl}/app/user/getArticleInfo`, //文章详情
  getShareImg: `${apiurl}/app/common/getShareImg`, //生成二维码
  checkRecommend: `${apiurl}/app/Deal/checkRecommend`, //是否为直推
  transferExhibits1: `${apiurl}/app/Deal/transferExhibits1`, //直推配票
}

module.exports = api