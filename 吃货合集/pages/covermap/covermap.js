var app = getApp()
Page({
  data: {
    mapScale: '12',
    point: {
      longitude: 121.26621,
      latitude: 31.37482
    },
    markers: {},
    typeID: 0,
    isLoading: true,
    loadOver: false,
    districtList: [],
    searchtext: '🔍请输入关键字',
    markers: [{
      iconPath: '../../img/marker_red.png',
      iconTapPath: '../../img/marker_red.png',
      id: 0,
      label: '31.37482',
      latitude: '31.37482',
      longitude: '121.26621',
      callout: {
        content: "上海市",
        fontSize: "20",
        color: "#fff",
        display: "ALWAYS",
        borderRadius: '5%',
        bgColor: '#23aef4'
      }
    }, {
      iconPath: '../../img/marker_red.png',
      iconTapPath: '../../img/marker_red.png',
      id: 1,
      callout: {
        content: "嘉定区",
        fontSize: "20",
        color: "#fff",
        display: "ALWAYS",
        borderRadius: '5%',
        bgColor: '#23aef4'
      },
      latitude: '31.38',
      longitude: '121.27'
    }],
    rgcData: {}
  },
  onShow: function (options) {
    wx.showLoading(
      {
        title:"数据加载中",
        mask:"true"
      }
    );
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
    //加载缓存中登陆信息
    wx.getStorage({
      key: 'logininfo',
      success: function (res) {
        console.log(res.data);
        that.loadMarker(res.data.randomkey, res.data.token);
      },
    });
    
  },
  navSearch: function (e) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  navMenu: function (e) {
    wx.navigateTo({
      url: '/pages/menu/fmenu',
    })
  },
  markertap: function (e) {
    wx.navigateTo({
      url: '/pages/templist/list',
    })
  },
  regionchange: function (e) {

  },
  /**
   * 加载地图点，根据用户角色获取全部点
   */
  loadMarker: function (randomKey, token){
    wx.request({
      url: 'https://zhonglestudio.cn/gismgr/mini/getMapInfoByuserRole', //
      data: {
        randomKey: randomKey,
        token: token
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res)
      }
    })
  },
  /**
   * 根据角色获取菜单信息
   */
  loadMenu:function(){
    wx.request({
      url: 'https://zhonglestudio.cn/gismgr/mini/getMenuByUserRole', //
      data: {
        randomKey: randomKey,
        token: token
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res)
      }
    })
  }

})