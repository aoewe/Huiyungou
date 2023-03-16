import api from './api'
// const des = require("./code");
const request = (url, method, data) => {
  return new Promise((resolve, reject) => {
    const info = wx.getStorageSync('USERINFO')
    const ios = 'ios'
    wx.request({
      url,
      method,
      // data:des.encode(data),
      data:data,
      header: {
        uid: info.id,
        token: info.token,
        equiment:ios
      },
      success: res => {
        if (res.data.code === 700) {
          wx.navigateTo({
            url: '/pages/Login/login',
          })
          wx.removeStorageSync('USERINFO')
          wx.removeStorageSync('type')
          reject()
        }
        if (res.data.code === 0) {
          resolve(res.data)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          resolve(res.data)
        }
      },
      fail: error => {
        // reject('系统错误')
      }
    })
  })
}
const login = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.login, 'post', data))
  })
}
const register = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.register, 'post', data))
  })
}
const sendcode = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.sendcode, 'post', data))
  })
}
const resetUserPassword = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.resetUserPassword, 'post', data))
  })
}
const getUserInfo = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getUserInfo, 'post', data))
  })
}
const getUserCapital = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getUserCapital, 'post', data))
  })
}

// 意见反馈
const setUserOpinion = (data) => {
  return new Promise((resolve, reject) => {
    resolve(request(api.setUserOpinion, 'post', data));
  });
};

//获取首页产品
const getHomeProduct = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.gethomeproduct, 'post', data));
  });
};
//首页推广
const extension = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.extension, 'post', data));
  });
};

//获取产品列表
const getProductList = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getProductList, 'post', data));
  });
};

//获取产品详情
const getProductdetail = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getProductdetail, 'post', data));
  });
};
//获取产品规格
const getSKU = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getsku, 'post', data));
  });
};

//创建订单
const getAddOrder = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getaddorder, 'post', data))
  })
}
//支付订单
const getPayOrder = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.payWinOrder, 'post', data))
  })
}

//获取订单列表
const getOrderList = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getOrderList, 'post', data))
  })
}
//设置默认地址
const setDefaultAddress = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.setdefaultaddress, 'post', data));
  });
};
//获取地址
const getUserAddress = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getUserAddress, 'post', data));
  });
};
//编辑收货地址
const editUserAddress = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.editUserAddress, 'post', data));
  });
};
//删除地址
const delUserAddress = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.deluseraddress, 'post', data));
  });
};
// 图片上传
const uploadImg = (img) => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      filePath: img,
      name: 'file[]',
      header: {
        token: wx.getStorageSync('token'),
        uid: wx.getStorageSync('userId')
      },
      url: apiurl + api.uploadImg,
      formData: {
        path_name: 'appImg/fallback'
      },
      success(res) {
        res.data = JSON.parse(res.data)
        let img = res.data.data.url[0]
        resolve(img)
      }
    })
  });
};
// 获取区域
const getRegion = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getRegion, 'post', data));
  });
};
// 产品评论
const getWineComments = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getWineComments, 'post', data));
  });
};
// 消息简述(附最新消息内容)
const getNewsBrief = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getNewsBrief, 'post', data));
  });
};
// 消息列表
const getNewsByTos = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getNewsByTos, 'post', data));
  });
};
// 已读所有消息
const readAll = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.readAll, 'post', data));
  });
};
// 银行卡列表
const getBankCardList = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getBankCardList, 'post', data));
  });
};
// 查看物流状态
const getExpressInfo = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getExpressInfo, 'post', data));
  });
};
// 延迟收货
const delayOrder = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.delayOrder, 'post', data));
  });
};
// 流水
const getStreamList = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getStreamList, 'post', data));
  });
};
// 修改用户头像
const editHeadImg = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.editHeadImg, 'post', data));
  });
};
// 积分转让or积分兑换拼券积分
const transferIntegral = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.transferIntegral, 'post', data));
  });
};
// 修改用户信息
const editUser = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.editUser, 'post', data));
  });
};
// 编辑or新增银行卡
const editBackCard = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.editBackCard, 'post', data));
  });
};
// 用户提现
const withdrawal = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.withdrawal, 'post', data));
  });
};
// 提现信息预备
const readyWithdrawal = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.readyWithdrawal, 'post', data));
  });
};
const getDealInfo = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getDealInfo, 'post', data));
  });
};
const getAutoOrderOne = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getAutoOrderOne, 'post', data));
  });
};
const getAutoOrderTwo = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getAutoOrderTwo, 'post', data));
  });
};
const transferExhibits = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.transferExhibits, 'post', data));
  });
};
const index = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.index, 'post', data));
  });
};
const buyAutoOrder = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.buyAutoOrder, 'post', data));
  });
};
const getExhibitsStream = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getExhibitsStream, 'post', data));
  });
};
const checkRealName = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.checkRealName, 'post', data));
  });
};
const changeIntegral = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.changeIntegral, 'post', data));
  });
};
const getFansList = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getFansList, 'post', data));
  });
};
const getArticleInfo = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getArticleInfo, 'post', data));
  });
};
const getArticleList = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getArticleList, 'post', data));
  });
};
const getWinOrderInfo = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getWinOrderInfo, 'post', data));
  });
};
const confirmOrder = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.confirmOrder, 'post', data));
  });
};
const getShareImg = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getShareImg, 'post', data));
  });
};
const checkRecommend = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.checkRecommend, 'post', data));
  });
};
const getRewardIntegral = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getRewardIntegral, 'post', data));
  });
};
const readyDealOrder = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.readyDealOrder, 'post', data));
  });
};
const buyDealOrder = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.buyDealOrder, 'post', data));
  });
};


export default {
  checkRecommend,
  buyDealOrder,
  confirmOrder,
  getShareImg,
  readyDealOrder,
  getFansList,
  getWinOrderInfo,
  getArticleInfo,
  buyAutoOrder,
  changeIntegral,
  checkRealName,
  getExhibitsStream,
  getDealInfo,
  getAutoOrderOne,
  getAutoOrderTwo,
  transferExhibits,
  login,
  register,
  sendcode,
  getUserInfo,
  getOrderList,
  getUserCapital,
  uploadImg,
  readyWithdrawal,
  withdrawal,
  resetUserPassword,
  editBackCard,
  editUser,
  editHeadImg,
  getStreamList,
  delayOrder,
  getExpressInfo,
  getBankCardList,
  readAll,
  getNewsByTos,
  getNewsBrief,
  getWineComments,
  getRegion,
  delUserAddress,
  getArticleList,
  editUserAddress,
  getUserAddress,
  setDefaultAddress,
  getPayOrder,
  index,
  getAddOrder,
  getSKU,
  getProductdetail,
  getProductList,
  transferIntegral,
  extension,
  getHomeProduct,
  setUserOpinion,
  getRewardIntegral
}