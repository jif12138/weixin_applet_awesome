var app = getApp()
Page({
  data: {
    orders: [],
    userOpenId: "",
    hasOrder: false
  },

  //页面加载
  onLoad: function() {
    var that = this;
    that.data.userOpenId = app.globalData.openID
    console.log('用户的openid: ', that.data.userOpenId)
    if (that.data.userOpenId == " ") {
      wx.showModal({
        title: '请登录后重试！'
      })
      that.setData({
        hasOrder: true,
      })
    }
    wx.request({
      url: 'https://ujnwh.jf12138.top/index/pay/GetOrderDetail',
      method: "post",
      data: {
        user_openId: that.data.userOpenId,
      },
      success: function(orderlist) { //request 成功执行返回值
        if (orderlist.statusCode != 200) {
          wx.showModal({
              title: '订单请求失败！'
            }),
            console.log('订单请求失败,状态码为：', orderlist.statusCode)
        } else { //请求成功，得到商品列表
          var orderReverse = orderlist.data.reverse();
          console.log('订单请求request返回结果：', orderReverse)
          // wx.setStorageSync('orders', orderReverse)
          // var orders1 = wx.getStorageSync('orders')
          // console.log(orderReverse)
          that.setData({
            orders: orderReverse,
            hasOrder: true
          });

        }

      },

      fail: function(err) {
        wx.showModal({
            title: '订单请求发送失败！'
          }),
          console.log('订单请求发送失败,状态码为：', err.statusCode)
      }
    })

  },
  onShow: function() {},

  //查看订单详情
  showDetial: function(event) {
    var that = this;
    console.log("订单详情函数 showedatial 已经被调用 :", event)

    var orderSelect = event.currentTarget.dataset.i
    wx.setStorageSync('oneorder', that.data.orders[orderSelect]);
    wx.navigateTo({
      url: '/page/detail/detail',
    })
    // console.log("选中的订单信息 :", that.data.orders[event.data-i])
  },

  //下拉加载订单列表
  onPullDownRefresh: function() {
    // wx.startPullDownRefresh({
    //   success:function(ee){
    //   console.log("下拉刷新结果：",ee)
    //   }
    // })
    var that = this

    that.data.userOpenId = app.globalData.openID
    console.log('测试是否得到openid: ', that.data.userOpenId)
    if (that.data.userOpenId == " ") {
      wx.showModal({
        title: '请登录后重试！'
      })
      that.setData({
        hasOrder: false,
      })
    }
    wx.request({
      url: 'https://ujnwh.jf12138.top/index/pay/GetOrderDetail',
      method: "post",
      data: {
        user_openId: that.data.userOpenId,
      },
      success: function(orderlist) { //request 成功执行返回值
        if (orderlist.statusCode != 200) {
          wx.showModal({
              title: '订单请求失败！'
            }),
            console.log('订单请求失败', orderlist.statusCode)
        } else { //请求成功，得到商品列表
          console.log('订单请求request返回结果：', orderlist.data)

          wx.setStorageSync('orders', orderlist.data)
          var orders1 = wx.getStorageSync('orders')
          console.log(orders1)
          that.setData({
            orders: orders1,
            hasOrder: true
          });
        }
      }
    })
    wx.stopPullDownRefresh() //停止下拉刷新 
  }
});



// orders:
// [
// {
//   userOpenId: "客户1",
//   id: 111111,
//   time: '2018 - 05 - 16 04: 24:08',
//   totalmoney: 155,
//   state: "已完成",        //状态： "已完成""未完成"
//   goods: [
//     { id: 0, name: "珍珠奶茶", num: 2, price: 17 },
//     { id: 1, name: "香芋奶茶", num: 1, price: 21 },
//     { id: 2, name: "草莓奶茶", num: 5, price: 20 }
//   ],
// },
// {
//   userOpenId: "客户1",
//   id: 222222,
//   time: '2018 - 05 - 16 04: 24:08',
//   totalmoney: 168,
//   state: "已完成",
//   goods: [
//     { id: 0, name: "雀巢咖啡", num: 3, price: 16 },
//     { id: 1, name: "蓝山咖啡", num: 5, price: 24 }
//   ],
// }
// ]



// // $$$$$$$$$$$$$$$$$$$$$$$$$$$下拉刷新  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// onPullDownRefresh: function () {
//   // 动态设置导航条标题  
//   wx.setNavigationBarTitle({
//     title: ''
//   });
//   wx.showNavigationBarLoading(); //在标题栏中显示加载图标  

//   let url = app.globalConfig.pre_api + "/api/user/getUserInfo.php";//根据实际情况定义请求的路径  
//   let user_id = app.globalData.user_id;                            //请求的参数  
//   let flag = true;
//   let that = this;
//   // 验证参数合法性  
//   flag = app.isParameterdValidate(user_id, '该用户不存在');
//   if (flag == false) { return; }
//   // 发送请求  
//   wx.request({
//     url: url,
//     data: {
//       user_id: user_id,
//     },
//     method: 'POST',

//     //请求成功的函数处理  
//     success: function (res) {
//       app.globalData.balance = res.data.data.balance;   //对数据进行更新  
//       that.setData({
//         balance: app.globalData.balance,
//       });
//     },
//     fail: function (res) {                             //请求失败的处理  
//       console.log(res.data.msg);
//     },
//     complete: function () {
//       wx.hideNavigationBarLoading();                   //完成停止加载  
//       // 动态设置导航条标题  
//       wx.setNavigationBarTitle({
//         title: '我的'
//       });
//       wx.stopPullDownRefresh();                       //停止下拉刷新  
//     }
//   })
// }