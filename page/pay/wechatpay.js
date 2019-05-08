// page/pay/wechatpay.js
var app = getApp();
Page({
  data: {
    imageUrl: "/imgs/index/bottom.jpg",
    goods: [],
    sendOrder: [
      // {
      //   "commodities_id": "22",
      //   "commodities_num": 1,
      // }, 

    ],
    userInfo: {},
    cart: {
      count: 0,
      total: 0,
      discount: 0,
      list: []
    },
    paytype:['现金','积分'],
    paytypeIndex: 0,
  },
  onLoad: function(options) { // 页面初始化 options为页面跳转所带来的参数
    var onegood = {};
    this.setData({
      cart: app.globalData.cart,
      userInfo: app.globalData.userInfo,
      userMoney: app.globalData.userMoney,
      // goods: app.globalData.goods //"已从全局变量获取商品列表", this.data.goods,
    })
    console.log("已从全局变量获取购物车", this.data.cart)
    console.log("已从全局变量获取用户信息", this.data.userInfo)
    
    for (var j = 0; j < this.data.cart.list.length; j++) {
      if (this.data.cart.list[j].goodID != null) {
        onegood = {
          "commodities_id": this.data.cart.list[j].goodID,
          "commodities_num": this.data.cart.list[j].goodNumber
        }
        this.data.sendOrder.push(onegood);
      }
    }

    this.setData({
      sendOrder: this.data.sendOrder,
    })
    console.log('待发送的订单：', this.data.sendOrder)
  },
  onReady: function() { // 页面渲染完成

  },
  onShow: function() { // 页面显示

  },
  onHide: function() { // 页面隐藏
  },
  onUnload: function() { // 页面关闭
  },

  //选择支付方式
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      paytypeIndex: e.detail.value
    })
  },

  pay: function() {
    var that = this;
    var userOpenId = app.globalData.openID
    if (userOpenId == '') {
      wx.showModal({
        title: '请登录后重试！',
        content: '这是一个模态弹窗',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.switchTab({
              url: '../vip/vip'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      console.log('缺少openid: ', userOpenId)
    } else {
      console.log('全局变量，用户的openid: ', userOpenId)
      wx.request({
        url: 'https://ujnwh.jf12138.top/index/pay/pay',
        // method: 'post',
        data: {
          user_openId: userOpenId,
          payMessage_json: that.data.sendOrder,
          payType: that.data.paytypeIndex, //积分支付1，微信支付2
          remark: "", //支付备注
        },
        success: function(e) {
          console.log('订单发送结果：', e)
          console.log('我的openID:', userOpenId, )
          if (e.data == 1) { //订单发送成功
            setTimeout(function() {
              wx.switchTab({
                url: '../index/index'
              })
            }, 3000)
            wx.showToast({
              title: ' 订单发送成功！',
              icon: 'success',
              duration: 2000
            })
            // wx.showModal({ title: '订单发送成功！' });
          } else if (e.data == 0) { //积分不足
            wx.showToast({
              title: ' 积分不足或者未登录0！',
              icon: 'none',
              duration: 2000
            })
            // wx.showModal({ title: '积分不足！' });
          } else { //其他错误
            wx.showToast({
              title: '未知错误！请联系管理员!',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  }
})