// page/vip/wallet/wallet.js
var app = getApp();
Page({

  /**
   * 页面的初始数
   */
  data: {
    timestamp: 0,
    nonceStr: '',
    userInfo: {},
    userMoney: 0,
    openID: " ",
    inputMoney: false,
    focus: false, //输入充值金额时输入框是否获得焦点
    inputValue: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var timestamp1 = Date.parse(new Date());
    timestamp1 = timestamp1 / 1000;
    console.log("当前时间戳为：" + timestamp1);

    var nonceStr1 = Math.random().toString(36).substr(2, 15);
    console.log("随机数：", nonceStr1);
    console.log("全局变量userInfo", app.globalData.userInfo);
    console.log("全局变量userMoney", app.globalData.userMoney);

    that.setData({
      userInfo: app.globalData.userInfo,
      userMoney: app.globalData.userMoney,
      openID: app.globalData.openID,
      timestamp: timestamp1,
      nonceStr: nonceStr1,
    })
    //Math.random()输出0到1(包括0，不包含1)的随机数。
    // toString(16)将随机数转换为16进制的字符串。
    // substring(2)截取字符串，因为随机数大于等于0小于1，前两位是“0.”，substring(2)从第三位开始截取到最后。
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  // 生成随机数
  createNonceStr: function() {
    console.log("用户信息", userInfo);
    console.log("积分充值页面积分值", userInfo.money);
    return Math.random().toString(36).substr(2, 15)
  },


  // 调用微信支付接口。使用人民币购买积分
  // buyPoints: function() {
  //   var that = this;
  //   console.log("调用微信支付接口。使用人民币购买积分")
  //   wx.requestPayment({
  //     'timeStamp': that.data.timestamp,
  //     //时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间
  //     'nonceStr': that.data.nonceStr,
  //     //随机字符串，长度为32个字符以下
  //     'package': '',
  //     //统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*
  //     'signType': 'MD5',
  //     //签名算法，暂支持 MD5
  //     'paySign': '',
  //     //签名,具体签名方案参见小程序支付接口文档;
  //     'success': function(res) {
  //       console.log("微信支付返回 成功")
  //     },
  //     'fail': function(res) {
  //       console.log("微信支付返回 失败")
  //     }
  //   })
  // }

  buyPoints: function() {
    
    var that = this
    console.log("调用微信支付接口。使用人民币购买 ", that.data.inputValue," 积分")
    // wx.getStorage({
    // key: 'openid',
    // success: function(res) {
    wx.request({
      //这里是后台的处理方法，url是自定义的，直接换成你自己的后台处理方法即可，Wx_Pay这个方法在下面写的有
      url: 'https://ujnwh.jf12138.top/index/pay/BuyMoney',
      data: {
        openid: that.data.openID, //用户的openid
        total_fee: that.data.inputValue, //支付金额
        //details: that.data.goodsList[0].goods_name,//支付商品的名称
      },
      mathod: 'GET',
      success: function(result) {
        console.log("微信支付后端初步返回数据：resulr=", result)
        if (result.data) {
          //out_trade_no=res.data['out_trade_no'];
          wx.requestPayment({
            timeStamp: result.data['timeStamp'],
            nonceStr: result.data['nonceStr'],
            package: result.data['package'],
            signType: 'MD5',
            paySign: result.data['paySign'],
            success: function(successret) {
              console.log('支付成功');
              //获取支付用户的信息
              // wx.getStorage({
              // key: 'userInfo',
              // success: function(getuser) {
              //加入订单表做记录
              // wx.request({
              //   url: 'https://ujnwh.jf12138.top/index/pay/BuyMoneySuccess',
              //   data: {
              //     uname: getuser.data.nickName,
              //     goods: that.data.goodsList[0].goods_name,
              //     price: that.data.totalPrice,
              //     openid: that.data.openID,
              //   },
              //   success: function(lastreturn) {
              //     console.log(lastreturn.data);
              //     console.log("存取成功");
              //   }
              // })
              // },
              // })
            },
            'fail': function(fail) {
              console.log("支付失败,后端返回的数据：fail=", fail);
            }
          })
        }
      }
    })
    // },
    // })
  },
  //显示隐藏  输入充值金额
  showInputMoney: function(e) {
    this.setData({
      inputMoney: !this.data.inputMoney,
      focus: true,
    });
  },
  //获取用户输入的金额
  bindKeyInput: function(e) {
    console.log("获取用户输入的金额", e)
    this.setData({
      inputValue: parseInt(e.detail.value),
    })
    console.log("获取用户输入的金额", this.data.inputValue)
  },
})