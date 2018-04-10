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
    var flag = wx.getStorageSync('route_flag');
    if ("covermap" == flag){//从地图页面跳转过来 清除之前缓存
      wx.removeStorageSync("menuData");
      wx.removeStorageSync("route_flag");
      that.setData({
        globalStatusMenuData: app.globalData.menudata,
        gmenu: app.globalData.menudata
      });
    }else{
      // 取值全局变量
      var sysInfo = app.globalData.sysInfo;
      wx.getStorage({
        key: 'menuData',
        success: function (res) {
          if (res.data.globalStatusMenuData && res.data.globalStatusMenuData.length != 0){
            that.setData({
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
    }
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
    /*
    for (var idx of arr) {
      for (var itemIdx in that.data.gmenu){
        if (idx == itemIdx){
          that.data.gmenu[idx].status = true;
        }else{
          that.data.gmenu[idx].status = false;
        }
      }
    }
    */
    var len = that.data.globalStatusMenuData.length;
    var tmpArr = [];
    for (var i = 0; i < len; i++) {
      tmpArr.push(i);
    }
    for (var idx of arr) {
      for (var i = 0; i < len; i++) {
        if (idx == i) {
          app.removeByValue(tmpArr, i);//删除相同元素，剩下不同元素
        }
      }
    }

    for (var idx of arr) {
      for (var itemIdx in that.data.globalStatusMenuData) {
        if (idx == itemIdx) {
          that.data.globalStatusMenuData[idx].status = true;
          app.generateChild(that.data.globalStatusMenuData[idx], true);
        }
      }
    }
    for (var idx of tmpArr) {
      for (var itemIdx in that.data.globalStatusMenuData) {
        if (idx == itemIdx) {
          that.data.globalStatusMenuData[idx].status = false;
          app.generateChild(that.data.globalStatusMenuData[idx],false);
        }
      }
    }

    that.setData({
      globalStatusMenuData: that.data.globalStatusMenuData,
      gmenu: that.data.globalStatusMenuData
    });
  },
  navMain:function(e){
    // wx.switchTab({
    //   url: '/pages/covermap/covermap',
    // })
    var that = this;
    app.getMapInfoByMenuDetail(that.data.globalStatusMenuData);
  }/*,
  generateChild:function(obj,flag){
    var that = this;
    if (obj.children){
      for (var idx in obj.children){
        obj.children[idx].status = flag;
        if (obj.children[idx].children){
          that.generateChild(obj.children[idx],flag);
        }
      }
    }
  }*/
})
/*
function removeByValue(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
}*/