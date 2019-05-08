// page/vip/vip.js
var app = getApp();
// var server = require('../../utils/server');
Page({
  data: {
    userInfo: {},
    userMoney: 0,
    hasUserInfo: false,
    code: ""
  },
  onLoad: function() {
    var that = this;
    wx.login({
      success: function(res) {
        if (res.code) {
          console.log('获取用户登录态成功！', res),
            that.setData({
              code: res.code
            })
        } else {
          console.log('获取用户登录态失败！', res.errMsg)
        }
      }
    });
    wx.getSetting({
      success: (res) => {
        console.log("获取用户设置", res)
        /*
         * res.authSetting = {
         *   "scope.userInfo": true,
         *   "scope.userLocation": true
         * }
         */
      }
    });
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},

  // -------------------按钮点击获取用户信息，相当于wx.getUserInfo()-------------
  getUserInfo: function(e) {
    var that = this;
    console.log('点击登录按钮后，获得的用户信息e：', e)

    //请求openid
    wx.request({
      url: 'https://ujnwh.jf12138.top/index/login/login',
      method: 'POST',
      data: {
        code: that.data.code,
        rawData: e.detail.rawData,
        signature: e.detail.signature,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      },
      success: function(res) {
        console.log(' 后端 网络请求成功返回值res：', res)
        //向后端发起请求，只为获得 用户积分
        that.setData({
          userInfo: e.detail.userInfo, //用户信息，之前获得
          userMoney: res.data.user_money, //
          hasUserInfo: true
        })
        //将 用户信息 用户积分 openID 存入全局变量
        app.globalData.userInfo = e.detail.userInfo;
        app.globalData.userMoney = res.data.user_money;
        app.globalData.openID = res.data.user_openId;

        // wx.setStorageSync('userInfo', e.detail.userInfo)
        // wx.setStorageSync('detail', e.detail)
        // wx.setStorageSync('openid', res.data.user_openId)
      }
    })

  },
  //------------------------------------下拉刷新--------------------------------
  onPullDownRefresh: function() {
   // var e = wx.getStorageSync('detail');
    var that = this;
    
     
    // if (this.data.hasUserInfo) {
          //如果已经登录，必有用户信息，所以发起网络请求
          console.log('刷新 微信积分 的openid：', app.globalData.openID)
          wx.request({
            url: 'https://ujnwh.jf12138.top/index/user/GetMoney',
            method: 'POST',
            data: {
              // user_openId: app.globalData.openID
              user_openId:"oCzVN5YpQXIwZStYdxQcZlwU9MIw"
            },
            success: function(res) {
              console.log('刷新 后端 网络请求成功返回值res：', res)
              that.setData({
                userMoney: res.data,
              })
              // app.globalData.userInfo = e.detail.userInfo;
              // wx.setStorageSync('userInfo', e.detail.userInfo)
            }
          })
        // } else {
        //   console.log('登录失败！' + res.errMsg)
        // }
       
    
    wx.stopPullDownRefresh() //停止下拉刷新 
  }
})







// wx.checkSession({
//   success: function () {
//     console.log('session 未过期，并且在本生命周期一直有效')
//   },
//   fail:function(){
//     console.log('session 过期，重新登陆')
//     wx.login({
//       success: function (res) {
//         if (res.code) {
//           console.log('重新获取用户登录态成功！', res),
//             that.setData({
//               code: res.code
//             })
//         } else {
//           console.log('重新获取用户登录态失败！', res.errMsg)
//         }
//       }
//     });
//   }
// })