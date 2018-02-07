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
    searchtext:'🔍请输入关键字',
    markers: [{
      iconPath: '../../img/marker_red.png',
      iconTapPath: '../../img/marker_red.png',
      id: 0,
      label: '31.37482',
      latitude: '31.37482',
      longitude: '121.26621',
      callout:{
        content:"<a>123123</a>",
        color:"blue",
        display:"ALWAYS"
      }
    }, {
      iconPath: '../../img/marker_red.png',
      iconTapPath: '../../img/marker_red.png',
      id: 1,
      label: {
        content: '123'
      },
      latitude: '31.38',
      longitude: '121.27'
    }],
    rgcData: {}
  },
  onShow:function(options){
    var that = this;
    // console.log(options);
    wx.getStorage({
      key: 'searchText',
      success: function(res) {
        console.log(res.data.value);
        that.setData({
          searchtext: res.data.value
        })
      },
    })
  },
  navSearch:function(e){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  navMenu:function(e){
    wx.navigateTo({
      url: '/pages/menu/fmenu',
    })
  },
  markertap:function(e){
    wx.navigateTo({
      url: '/pages/list/list',
    })
  },
  regionchange:function(e){
    
  }
})