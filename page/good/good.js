var app = getApp();
Page({
  data: {
    filterId: 1,
    goods: [],
    cart: {
      count: 0,
      total: 0,
      discount: 0,
      list: []
    },
  },


  onLoad: function(option) {
    var that = this;
    var goods2=[];
    if (option.title == "coffee") {
      wx.setNavigationBarTitle({
        title: "咖啡"
      });
    } else if (option.title == "tea") {
      wx.setNavigationBarTitle({
        title: "奶茶"
      });
    } else {
      wx.setNavigationBarTitle({
        title: "商品信息"
      });
    };

    this.setData({
      cart: app.globalData.cart,
      // goods: app.globalData.goods
    })
    console.log("已从全局变量获取购物车", this.data.cart)
    //向服务器请求商品列表
    wx.request({
      url: 'https://ujnwh.jf12138.top/index/commodities/getCategory',
      data: {
        category: option.title, //商品类别 coffee or  tea  or  others
      },
      success: function(goodlist) { //request 成功执行返回值
        if (goodlist.statusCode != 200) {
          wx.showModal({
              title: '商品清单请求失败！'
            }),
            console.log('商品清单请求失败')
        } else { //请求成功，得到商品列表
          // console.log('商品清单请求成功,商品清单request返回状态header：', goodlist.header)
          console.log('商品清单request返回结果：', goodlist.data);        
          that.setData({
            goods: goodlist.data,
          });
        }
      }
    })
   //将商品列表存入全局变量
    // if (goods2[0].commodities_id == this.data.goods[0].commodities_id) { //返回的商品信息第一个商品和全局变量中存储的商品信息相同。默认是同一类别的商品。覆盖即可
    //   console.log("商品列表类型相同，覆盖");
    //   that.setData({
    //     goods: goods2,
    //   });
    // } else { //返回的商品信息第一个商品和全局变量中存储的商品信息--不同--。默认是   两类  的商品。追加即可 
    //   console.log("商品列表类型 不同，追加");
    //   for (var j = 0; j < goods2.length; j++) {
    //     that.data.goods[j + that.data.goods.length] = goods2[j]
    //   }
    //   that.setData({
    //     goods: that.data.goods,
    //   });
    // }
    // app.globalData.goods = that.data.goods;
    // console.log("已将商品信息存入全局变量", app.globalData.goods)
        // wx.setStorageSync('goods', goodlist.data)
        //var goods1 = wx.getStorageSync('goods')
        // console.log('将商品数组存储到本地后读取结果：',goods1)
  },
  onHide: function() {
    app.globalData.cart = this.data.cart;
    console.log("good页面隐藏。已将购物车存入全局变量", app.globalData.cart)
  },
  onUnload: function() {
    app.globalData.cart = this.data.cart;
    console.log("good页面销毁。已将购物车存入全局变量", app.globalData.cart)
  },
  //计算
  tapAddCart: function(e) {
    console.log("添加商品 传参数e=", e)
    this.addCart(e.target.dataset.id);
  },
  tapReduceCart: function(e) {
    console.log("减少商品 传参数e=", e)
    this.reduceCart(e.target.dataset.id);
  },
  // 增加商品
  addCart: function(id) { //id是传过来的参数。是商品在页面展示时的序号，从0开始。应该改为商品ID。//已经改为商品ID
    var flag = 0; //0表示该商品未被选中过
    var list1 = this.data.cart.list; //获取购物车数组
    var listLength = list1.length;
    console.log("输出list数组", list1, "list数组长度", list1.length); //输出list数组
    for (var x = 0; x < listLength; x++) {
      if (list1[x].goodID == id.toString()) { //已经选过该商品
        list1[x].goodNumber++;
        console.log(id, "号商品已经被加入购物车，数量加1")
        flag = 1; //选中过置1
        break;
      }
    }
    if (flag == 0) { //未被选中过
      console.log(id, "号商品未曾被加入购物车,新建对象加入数组")
      var goodPrice1 = 0;
      var goodName1 = "";
      for (var i = 0; i < this.data.goods.length; i++) {
        if (id.toString() == this.data.goods[i].commodities_id) {
          goodPrice1 = this.data.goods[i].commodities_unit_price;
          goodName1 = this.data.goods[i].commodities_name;
        }
      }
      var addgood1 = { //新建json对象
        "goodName": goodName1,
        "goodID": id.toString(),
        "goodNumber": 1,
        "goodPrice": goodPrice1
      }
      list1.push(addgood1);
    }
    this.data.cart.list = list1;
    this.setData({
      cart: this.data.cart
    });
    this.countCart();
  },
  // 减少商品
  reduceCart: function(id) { //id是被减商品的商品ID
    var list1 = this.data.cart.list; //获取购物车数组
    var listLength = list1.length;
    console.log("输出参数 id ", id, "||", id.toString());
    console.log("输出list数组", list1, "list数组长度", list1.length); //输出list数组
    for (var x = 0; x < listLength; x++) {
      console.log("迭代下标 x ", x, );
      if (list1[x].goodID == id.toString()) { //选中该商品
        if (list1[x].goodNumber > 1) { //该商品数量大于1，直接减1
          list1[x].goodNumber--;
          console.log(id, "该商品数量大于1，直接减1")

        } else { //该商品数量 小于等于1，删除该项
          console.log("商品数量小于1，表项已删除")
          //delete list1[x];
          for (var x2 = x; x2 < listLength - 1; x2++) {
            list1[x2] = list1[x2 + 1];
          }
          delete list1[listLength - 1]
        }
        break;
      }
    }
    console.log("输出减少后的list数组", list1, "list数组长度", list1.length); //输出list数组
    this.data.cart.list = list1;
    this.setData({
      cart: this.data.cart
    });
    this.countCart();
  },
  // 计算订单总金额
  countCart: function() {
    var count = 0; //商品总数
    var total = 0; //总价
    var goodId1, goodNum1, goodPrice1;
    var list1 = this.data.cart.list; //获取购物车数组
    var listLength = list1.length;

    console.log("输出list数组", list1, "list数组长度", list1.length); //输出list数组
    if (listLength != 0) {
      for (var x = 0; x < listLength; x++) {
        //获取商品数目
        goodId1 = list1[x].goodID;
        goodNum1 = list1[x].goodNumber;
        // 获取商品价格
        goodPrice1 = list1[x].goodPrice;
        //计算商品总价
        total += goodNum1 * goodPrice1;
        count += goodNum1; //商品数量加1
      }
    } else {
      total = 0;
      count = 0;
    }
    console.log("重新计算总价")
    this.data.cart.list = list1;
    this.data.cart.count = count;
    this.data.cart.total = total;
    this.setData({
      cart: this.data.cart
    });
  },
  // 清空购物车
  cleanCart: function() {
    for (var i = 0; i < this.data.cart.list.length; i++) {
      delete this.data.cart.list[i];
    }
    this.setData({
      cart: this.data.cart
    });
    this.countCart();
  },
  
  //显示隐藏购物车
  showCartDetail: function() {
    this.setData({
      showCartDetail: !this.data.showCartDetail
    });
  },
  hideCartDetail: function() {
    this.setData({
      showCartDetail: false
    });
  },

  //显示隐藏商品详情弹窗
  showGoodsDetail: function(e) {
    this.setData({
      showGoodsDetail: !this.data.showGoodsDetail,
      id: e.target.dataset.id,

    });
    console.log(e.target.dataset.id)
  },
  hideGoodsDetail: function() {
    this.setData({
      showGoodsDetail: false
    });
  },


  pay: function() {
    wx.navigateTo({
      url: '../pay/wechatpay'
    })
  },
});