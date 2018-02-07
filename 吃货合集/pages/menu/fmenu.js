//获取app变量
var app = getApp()
Page({
  data: {
    gmenu:[],
    firstIndex:'',
    globalStatusMenuData:[]
  },
  onLoad:function(){
    
  },
  onShow: function () {
    var that = this;
    // 取值全局变量
    var sysInfo = app.globalData.sysInfo;
    wx.getStorage({
      key: 'menuData',
      success: function (res) {
        console.log(res);
        if (res.data.globalStatusMenuData && res.data.globalStatusMenuData.length != 0){
          that.setData({
            // firstIndex: res.data.firstIndex,
            // smenu: app.globalData.menudata[res.data.firstIndex].children,
            globalStatusMenuData: res.data.globalStatusMenuData
          });
        }
      },
    });
    var tmpmenu = [];
    if (that.data.globalStatusMenuData.length != 0){
      tmpmenu = that.data.globalStatusMenuData;
    }else{
      tmpmenu = app.globalData.menudata;
    }
    that.setData({
      gmenu: app.globalData.menudata,
      // globalStatusMenuData: app.globalData.menudata
      globalStatusMenuData:tmpmenu
    })
  },
  navSecond: function (e) {
    var that = this;
    var idx= e.currentTarget.dataset.idx;

    that.setData({
      firstIndex: idx
    });
    wx.setStorage({
      key: 'menuData',
      data: {
        firstIndex: idx,
        secondIndex:'',
        globalStatusMenuData: that.data.globalStatusMenuData
      }
    });
    wx.navigateTo({
      url: 'smenu',
    })
  },
  listenCheckboxChange:function(e){
    var that = this;
    var arr = e.detail.value;
    // console.log(arr);
    for (var idx of arr) {
      for (var itemIdx in that.data.gmenu){
        if (idx == itemIdx){
          that.data.gmenu[idx].status = true;
        }else{
          that.data.gmenu[idx].status = false;
        }
      }
    }
    // console.log(that.data.gmenu);

    that.setData({
      globalStatusMenuData: that.data.gmenu,
      gmenu: that.data.gmenu
    });
    // wx.setStorage({
    //   key: 'menuData',
    //   data: {
    //     firstIndex: that.firstIndex,
    //     globalStatusMenuData: that.data.gmenu,
    //     secondIndex:''
    //   }
    // });
  }
})