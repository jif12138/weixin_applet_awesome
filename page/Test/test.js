// page/Test/test.js
Page({
  data: {
    html: ''
  },
  getweixinTap: function () {
    var self=this;
    wx.request({
      url:'https://blog.heweixue.top',
      data:{
      },
      header:{
        'Content-Type':'application/json'
      },
      success:function (res){
        console.log(res);
        self.setData({
          html:res.data
        })
      }
    })
  },
  onLoad: function (options) {

  },
  onReady: function () {
  },
  onShow: function () {

  },
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})












// wx.setStorageSync('openid', data.openid)
// var openid = wx.getStorageSync('openid')