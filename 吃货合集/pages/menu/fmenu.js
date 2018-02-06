//获取app变量
var app = getApp()
Page({
  data: {
    gmenu:[]
  },
  onLoad: function () {
    var that = this;
    // 取值全局变量
    var sysInfo = app.globalData.sysInfo;
    that.setData({
      gmenu: app.globalData.menudata
    })
  },
  navSecond: function (e) {
    var idx= e.currentTarget.dataset.idx;
    console.log("____________AAA____" + idx);
    wx.setStorage({
      key: 'menuData',
      data: {
        firstIndex: idx,
        secondIndex:''
      },
    });
    wx.navigateTo({
      url: 'smenu',
    })
  },
  listenCheckboxChange:function(e){
    console.log(e.detail.value);
  }
})