App({
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  generateChild: function (obj, flag) {
    var that = this;
    if (obj.children) {
      for (var idx in obj.children) {
        obj.children[idx].status = flag;
        if (obj.children[idx].children) {
          that.generateChild(obj.children[idx], flag);
        }
      }
    }
  },
  removeByValue :function (arr, val) {
      for(var i = 0; i<arr.length; i++) {
        if (arr[i] == val) {
          arr.splice(i, 1);
          break;
        }
      }
  },
  globalData: {
    hasLogin: false,
    firstIndex:'',
    secondIndex:'',
    token:'',
    randomkey:'',
    menudata: [],
    globalMarker:[]
  },
  getMapInfoByMenuDetail: function (data, randomkey,token){
    var that = this;
    var jsonparam = JSON.stringify(data);
    wx.request({
      url: 'https://zhonglestudio.cn/gismgr/mini/getMapInfoByMenuInfo', //
      data: {
        randomkey: that.globalData.randomkey,
        token: that.globalData.token,
        jsonIds: jsonparam
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data);
        that.globalData.globalMarker = res.data.data;
        wx.setStorageSync("menu_flag", "menu")
        wx.switchTab({
          url: '/pages/covermap/covermap',
        })
      }
    })
  }
})
