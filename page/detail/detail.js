// page/detail/detail.js
Page({
  data: {
    oneorder:
    {
      id: 0,
      user: "客户1",
      num: 111111,
      time: '2018 - 05 - 16 04: 24:08',
      totalmoney: 544,
      state: "已完成",//状态
      goods: [
        { id: 0, name: "传值失败", num: 2, price: 17 },
        { id: 1, name: "传值失败", num: 1, price: 21 },
        { id: 2, name: "传值失败", num: 5, price: 20 }
      ],
    }

  },
  onLoad: function (options) {
    var that = this;
    that.setData({
       oneorder: wx.getStorageSync('oneorder')
    });
   
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})




// orders:[  
//   {    user: "客户1",    num: 111111,    time: '2018 - 05 - 16 04: 24:08',    totalmoney: 46,    
//     goods: [      {        id: 0,        name: "珍珠奶茶",        num: 2,        price: 17        
//             },
//             {        id: 1,        name: "香芋奶茶",        num: 1,        price: 21      }
//           ],
//   },
//   {    user: "客户2",    num: 222222,    time: '2018 - 05 - 16 04: 24:08',    totalmoney: 46,
//     goods: [      {        id: 0,        name: "雀巢咖啡",        num: 3,        price: 16
//       },      {        id: 1,        name: "蓝山咖啡",        num: 5,        price: 24      }
//     ],
//   }
// ]