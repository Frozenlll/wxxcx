//获取app变量
var app = getApp()
Page({
  data: {
    tmenu: [],
    secondIndex:''
  },
  onLoad: function (options) {
    // var that = this;
    // var smenuIndex = options.secondIndex;
    // console.log(app.globalData.menudata[smenuIndex]);
    // that.setData({
    //   smenu: app.globalData.menudata[smenuIndex].children
    // })
    var that = this;
    wx.getStorage({
      key: 'menuData',
      success: function (res) {
        that.setData({
          secondIndex: res.data.secondIndex,
          tmenu: app.globalData.menudata[res.data.firstIndex].children[res.data.secondIndex].children
        });
      },
    })
  }
})