var server = require('./utils/server');
App({
  onLaunch: function() {
    
  },

  onShow: function() {},
  onHide: function() {},

  rd_session: null,

  //全局变量 globalData.userInfo
  // var test= app.globalData.test
  // var test = getApp().globalData.test;
  // console.log('app全局变量赋值后的结果', test)
  globalData: {
    userInfo: {},//用户信息
    userMoney: 0,//用户积分
    openID: " ",//用户openID
    goods:[],//商品信息。不同种类多的商品要求追加，不能覆盖
    cart: {//购物车
      count: 0,
      total: 0,
      discount: 0,
      list: []
    },
  }
})