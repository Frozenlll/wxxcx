//获取app变量
var app = getApp()
Page({
  data: {
    smenu:[],
    firstIndex:''
  },
  onLoad:function(options){
    var that = this;
    wx.getStorage({
      key: 'menuData',
      success: function(res) {
        console.log(res);
        that.setData({
          firstIndex: res.data.firstIndex,
          smenu: app.globalData.menudata[res.data.firstIndex].children
        });
      },
    })
  },
  navThird: function (e) {
    var that = this;
    var secondIndex = e.currentTarget.dataset.idx;
    wx.setStorage({
      key: 'menuData',
      data: {
        firstIndex: that.data.firstIndex,
        secondIndex: secondIndex
      },
    });
    wx.navigateTo({
      url: 'tmenu',
    })
  }
})