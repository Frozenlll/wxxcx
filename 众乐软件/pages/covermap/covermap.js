var app = getApp()
Page({
  data: {
    mapScale: '12',
    longitude: 121.26621,
    latitude: 31.37482,
    typeID: 0,
    isLoading: true,
    loadOver: false,
    districtList: [],
    searchtext: '🔍请输入关键字',
    markers: [],
    rgcData: {},
    randomkey:'',
    token:'',
    controls: [{
      　　id: 1,
          iconPath: '../../images/jianhao.png',
      　　position: {
        　　left: 300,
        　　top: 400,
        　　width: 40,
        　　height: 40
      　　},
      　　clickable: true
    　　},
    　　{
      　　id: 2,
          iconPath: '../../images/jiahao.png',
      　　position: {
            left: 300,
            top: 360,
        　　width: 40,
        　　height: 40
      　　},
          clickable: true
    }],
    _key: '',
    _cacheKey: '',
    _currentLevel: '',
    _nextLevel: ''
  },
  onShow: function (options) {
    var that = this;
    //加载缓存搜索数据，可以删除
    wx.getStorage({
      key: 'searchText',
      success: function (res) {
        console.log(res.data.value);
        that.setData({
          searchtext: res.data.value
        })
      },
    });
    var flag = wx.getStorageSync('menu_flag');
    if("menu" == flag){
      // console.log(app.globalData.globalMarker);
      that.setData({
        markers: app.globalData.globalMarker,
        longitude: app.globalData.globalMarker[0].longitude,
        latitude: app.globalData.globalMarker[0].latitude
      })
      wx.removeStorageSync("menu_flag");
    }else{
      that.showLoading("show");
      //加载缓存中登陆信息
      wx.getStorage({
        key: 'logininfo',
        success: function (res) {
          // console.log(res.data);
          that.loadMarker(res.data.randomkey, res.data.token);
          that.loadMenu(res.data.randomkey, res.data.token);
          that.setData({
            randomkey: res.data.randomkey,
            token: res.data.token
          })
        },
      });
    }
  },
  navSearch: function (e) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  navMenu: function (e) {
    wx.setStorageSync("route_flag", "covermap")
    wx.navigateTo({
      url: '/pages/menu/fmenu',
    })
  },
  markertap: function (e) {
    var that = this;
    that.showLoading("show");
    // console.log(e.markerId);
    var markId = e.markerId;
    console.log(markId);
    var array = markId.split('_');
    var level ;
    var key;
    var cacheKey;
    var currentLevel;
    var nextLevel;
    level = array[0];
    key = array[1];
    cacheKey = array[2];
    var ids = "";
    currentLevel = array[3];
    if (array.length == 5){
      nextLevel = array[4];
    }else{
      ids = array[5];
    }
    
    if (nextLevel){
      that.showNextLevel(level, key, cacheKey, currentLevel, nextLevel)
    }else{
      wx.setStorage({
        key: 'detailInfo',
        data: {
          ids: ids
        }
      });
      wx.navigateTo({
        url: '/pages/templist/list',
      })
    }
  },
  regionchange: function (e) {

  },
  /**
   * 加载地图点，根据用户角色加载marker
   */
  loadMarker: function (randomkey, token){
    var that = this;
    wx.request({
      url: 'https://zhonglestudio.cn/gismgr/mini/getMapInfoByuserRole', //
      data: {
        randomkey: randomkey,
        token: token
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        // wx.hideLoading();
        that.showLoading("hide");
        // console.log(res.data)
        if (0 == res.data.code ){
          that.setData({
            markers: res.data.data,
            longitude: res.data.data[0].longitude,
            latitude: res.data.data[0].latitude
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '获取数据失败' + res.data.msg,
            showCancel: false,
            success: function (res) {
              
            }
          });
        }
        
      }
    })
  },
  /**
   * 根据角色获取菜单信息
   */
  loadMenu: function (randomkey, token){
    wx.request({
      url: 'https://zhonglestudio.cn/gismgr/mini/getMenuByUserRole', //
      data: {
        randomkey: randomkey,
        token: token
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res)
        // app.setData({
        //   menudata: res.data.data
        // });
        app.globalData.menudata = res.data.data;
      }
    })
  },
  showNextLevel: function (level, key, cacheKey, currentLevel, nextLevel){
    var that = this;
    that.setData({
        _key: key,
        _cacheKey: cacheKey,
        _currentLevel: currentLevel,
        _nextLevel: nextLevel
    });
    wx.request({
      url: 'https://zhonglestudio.cn/gismgr/mini/getNextMapInfoByKey', //
      data: {
        randomkey: that.data.randomkey,
        token: that.data.token,
        cacheKey: cacheKey,
        key: key,
        currentLevel: level
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        that.showLoading("hide");
        // console.log(res.data)
        if (0 == res.data.code) {
          that.setData({
            markers: res.data.data,
            mapScale: parseInt(that.data.mapScale)+1,
            longitude: res.data.data[0].longitude,
            latitude: res.data.data[0].latitude
          })

        } else {
          wx.showModal({
            title: '提示',
            content: '获取数据失败' + res.data.msg,
            showCancel: false,
            success: function (res) {

            }
          });
        }
      }
    })
  },
  turnback:function(){
    var that = this;
    var clevel = parseInt(that.data._currentLevel);
    console.log(clevel);
    that.showLoading("show");
    if (clevel > 1){
      that.showPreLevel();
    }else{
      console.log(app.globalData.globalMarker.length);
      if (app.globalData.globalMarker.length == 0){
        that.loadMarker(that.data.randomkey, that.data.token);
      }else{
        that.setData({
          markers: app.globalData.globalMarker,
          longitude: app.globalData.globalMarker[0].longitude,
          latitude: app.globalData.globalMarker[0].latitude
        })
      }
    }
  },
  showPreLevel:function(){
    var that = this;
    var key = that.data._key;
    var cacheKey = that.data._cacheKey;
    // _currentLevel: currentLevel,
    // _nextLevel: nextLevel
    wx.request({
      url: 'https://zhonglestudio.cn/gismgr/mini/getPreMapInfoByKey', //
      data: {
        randomkey: that.data.randomkey,
        token: that.data.token,
        cacheKey: that.data._cacheKey,
        key: that.data._key,
        currentLevel: that.data._currentLevel
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        that.setData({
          _currentLevel: parseInt(that.data._currentLevel) - 1
        });
        that.showLoading("hide");
        // console.log(res.data)
        if (0 == res.data.code) {
          that.setData({
            markers: res.data.data,
            mapScale: parseInt(that.data.mapScale) - 1,
            longitude: res.data.data[0].longitude,
            latitude: res.data.data[0].latitude
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '获取数据失败' + res.data.msg,
            showCancel: false,
            success: function (res) {
            }
          });
        }
      }
    })
  },
  showLoading:function(showType){
    if ("hide" == showType){
      wx.hideLoading();
    }else{
      wx.showLoading(
        {
          title: "数据加载中",
          mask: "true"
        }
      );
    }
  },
  controltap:function(e){//5-18
    var that = this;
    var curScale = parseInt(that.data.mapScale);
    console.log(curScale);
    if (1 == e.controlId){//减号
      if (curScale > 5){
        that.turnback();
        that.setData({
          mapScale: curScale - 1,
        })
      }
    } else if (2 == e.controlId){//加号
      if (curScale < 18) {
        that.setData({
          mapScale: curScale + 1,
        })
      }
    }
  }

})