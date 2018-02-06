var app = getApp();
var bmap = require('../../libs/bmap-wx.min.js');
var wxMarkerData = [];
Page({
  data: {
    typeID: 0,
    isLoading: true,
    loadOver: false,
    districtList: [],
    sortingList: [{ key: 1, value: "智能排序" }, {
      key: 2, value: "价格最低"
    }, {
      key: 3, value: "价格最高"
    }, {
      key: 4, value: "服务最好"
    }, {
      key: 5, value: "环境最好"
    }, {
      key: 6, value: "预约最快"
    }],
    filterList: [{ key: 1, value: "周日营业", selected: false }, {
      key: 2, value: "官方假期营业（香港）", selected: false
    }, {
      key: 3, value: "可为儿童接种疫苗", selected: false
    }, {
      key: 4, value: "网上付款", selected: false
    }, {
      key: 5, value: "到诊所现场付款", selected: false
    }],
    districtChioceIcon: "/images/icon-go-black.png",
    sortingChioceIcon: "/images/icon-go-black.png",
    chioceDistrict: false,
    chioceSorting: false,
    chioceFilter: false,
    activeDistrictParentIndex: -1,
    activeDistrictChildrenIndex: -1,
    activeDistrictName: "区域位置",
    scrollTop: 0,
    scrollIntoView: 0,
    activeSortingIndex: -1,
    activeSortingName: "综合排序",
    markers: [{
      iconPath: '../../img/marker_red.png',
      iconTapPath: '../../img/marker_red.png',
      id: 0,
      label:'31.37482',
      latitude: '31.37482',
      longitude: '121.26621'
    }, {
      iconPath: '../../img/marker_red.png',
      iconTapPath: '../../img/marker_red.png',
      id: 1,
      label:{
        content:'123'
      },
      latitude: '31.38',
      longitude: '121.27'
    }],
    latitude: '',
    longitude: '',
    rgcData: {},
    scale:14
  },
  onLoad: function (options) {
    /*var that = this;
    that.latitude =31.37482,
    that.longitude =121.26621,
    that.markers=[
      {
        iconPath: '../../img/marker_red.png',
        iconTapPath: '../../img/marker_red.png',
        id:0,
        latitude: 31.37482,
        longitude: 121.26621
      }
    ];
/*
    //var that = this;
    var BMap = new bmap.BMapWX({
      ak: 'plEzfOG4jm58EGxEsHw4kCPoG3UjOcNv'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      console.log(wxMarkerData);
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }
    BMap.regeocoding({
      fail: fail,
      success: success,
      iconPath: '../../img/marker_red.png',
      iconTapPath: '../../img/marker_red.png'
    });
*/
  },
  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    //that.showSearchInfo(wxMarkerData, id);
    that.setData({
      scale:16
    });
  },
  onPullDownRefresh: function () {
    this.setData({
      productList: [],
      pageIndex: 1,
      loadOver: false,
      isLoading: true
    })
    //this.getProductList();
    wx.stopPullDownRefresh()
  },
  onReachBottom: function () {
    if (!this.data.loadOver) {
      this.setData({
        pageIndex: this.data.pageIndex + 1,
        isLoading: true,
        loadOver: false
      })
      //this.getProductList();
    }
  },
  //条件选择
  choiceItem: function (e) {
    switch (e.currentTarget.dataset.item) {
      case "1":
        if (this.data.chioceDistrict) {
          this.setData({
            districtChioceIcon: "/images/icon-go-black.png",
            sortingChioceIcon: "/images/icon-go-black.png",
            chioceDistrict: false,
            chioceSorting: false,
            chioceFilter: false,
          });
        }
        else {
          this.setData({
            districtChioceIcon: "/images/icon-down-black.png",
            sortingChioceIcon: "/images/icon-go-black.png",
            chioceDistrict: true,
            chioceSorting: false,
            chioceFilter: false,
          });
        }
        break;
      case "2":
        if (this.data.chioceSorting) {
          this.setData({
            districtChioceIcon: "/images/icon-go-black.png",
            sortingChioceIcon: "/images/icon-go-black.png",
            chioceDistrict: false,
            chioceSorting: false,
            chioceFilter: false,
          });
        }
        else {
          this.setData({
            districtChioceIcon: "/images/icon-go-black.png",
            sortingChioceIcon: "/images/icon-down-black.png",
            chioceDistrict: false,
            chioceSorting: true,
            chioceFilter: false,
          });
        }
        break;
      case "3":
        if (this.data.chioceFilter) {
          this.setData({
            districtChioceIcon: "/images/icon-go-black.png",
            sortingChioceIcon: "/images/icon-go-black.png",
            chioceDistrict: false,
            chioceSorting: false,
            chioceFilter: false,
          });
        }
        else {
          this.setData({
            districtChioceIcon: "/images/icon-go-black.png",
            sortingChioceIcon: "/images/icon-go-black.png",
            chioceDistrict: false,
            chioceSorting: false,
            chioceFilter: true,
          });
        }
        break;
    }
  },
  hideAllChioce: function () {
    this.setData({
      districtChioceIcon: "/images/icon-go-black.png",
      sortingChioceIcon: "/images/icon-go-black.png",
      chioceDistrict: false,
      chioceSorting: false,
      chioceFilter: false,
    });
  },
  //区域位置
  /*getDistrictList: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl,
      data: {
        message: "20005",
        location_id: that.data.locationID,
        token: md5.hex_md5(app.globalData.token),
        device_source: app.globalData.deviceSource
      },
      success: function (resRequest) {
        if (resRequest.data.error_code == 0) {
          that.setData({
            districtList: resRequest.data.district_list
          })
        }
      }
    })
  },*/
  selectDistrictParent: function (e) {
    this.setData({
      activeDistrictParentIndex: e.currentTarget.dataset.index,
      activeDistrictName: this.data.districtList[e.currentTarget.dataset.index].district_name,
      activeDistrictChildrenIndex: 0,
      scrollTop: 0,
      scrollIntoView: 0
    })
  },
  selectDistrictChildren: function (e) {
    var index = e.currentTarget.dataset.index;
    var parentIndex = this.data.activeDistrictParentIndex == -1 ? 0 : this.data.activeDistrictParentIndex;
    if (index == 0) {
      this.setData({
        activeDistrictName: this.data.districtList[parentIndex].district_name
      })
    } else {
      this.setData({
        activeDistrictName: this.data.districtList[parentIndex].district_children_list[index].district_name
      })
    }
    this.setData({
      districtChioceIcon: "/images/icon-go-black.png",
      chioceDistrict: false,
      activeDistrictChildrenIndex: index,
      productList: [],
      pageIndex: 1,
      loadOver: false,
      isLoading: true
    })
    //this.getProductList();
  },
  //综合排序
  selectSorting: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      sortingChioceIcon: "/images/icon-go-black.png",
      chioceSorting: false,
      activeSortingIndex: index,
      activeSortingName: this.data.sortingList[index].value,
      productList: [],
      pageIndex: 1,
      loadOver: false,
      isLoading: true
    })
    //this.getProductList();
  },
  //筛选
  selectFilter: function (e) {
    var index = e.currentTarget.dataset.index;
    var _filterList = this.data.filterList;
    _filterList[index].selected = !_filterList[index].selected;
    this.setData({
      filterList: _filterList
    })
  },
  resetFilter: function () {
    var _filterList = this.data.filterList;
    _filterList.forEach(function (e) {
      e.selected = false;
    })
    this.setData({
      filterList: _filterList
    })
  },
  filterButtonClick: function () {
    this.setData({
      chioceFilter: false,
      productList: [],
      pageIndex: 1,
      loadOver: false,
      isLoading: true
    })
    //this.getProductList();
  },
  onShareAppMessage: function () {

  }
})
