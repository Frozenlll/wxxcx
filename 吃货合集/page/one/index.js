var cityData = require('../../utils/city.js');
var bmap = require('../../libs/bmap-wx.min.js');
var wxMarkerData = [];

// page/one/index.js
Page({
  data:{
    content: [],
    nv: [],
    px: [],
    qyopen:false,
    qyshow:false,
    nzopen:false,
    pxopen:false,
    nzshow:false,
    pxshow:false,
    isfull:false,
    cityleft: cityData.getCity(),
    citycenter: {},
    cityright: {},
    select1: '',
    select2:'',
    shownavindex:'',
    markers: [],
    latitude: '',
    longitude: '',
    rgcData: {}
  },
  onLoad: function(){
    this.setData({
      nv:['衣服','裤子','内衣','服饰','衣服','裤子','内衣','服饰','衣服','裤子','内衣','服饰'],
      px:['默认排序','离我最近','价格最低','价格最高']
    });
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: 'plEzfOG4jm58EGxEsHw4kCPoG3UjOcNv'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
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
  },
  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
  },
  showSearchInfo: function (data, i) {
    var that = this;
    that.setData({
      rgcData: {
        address: '地址：' + data[i].address + '\n',
        desc: '描述：' + data[i].desc + '\n',
        business: '商圈：' + data[i].business
      }
    });
  },
  listqy: function(e){
    if(this.data.qyopen){
      this.setData({
        qyopen:false,
        nzopen:false,
        pxopen:false,
        nzshow:true,
        pxshow:true,
        qyshow:false,
        isfull:false,
        shownavindex: 0
      })
    }else{
      this.setData({
        qyopen:true,
        pxopen:false,
        nzopen:false,
        nzshow:true,
        pxshow:true,
        qyshow:false,
        isfull:true,
        shownavindex:e.currentTarget.dataset.nav
      })
    }
    
  },
  list: function(e){
    if(this.data.nzopen){
      this.setData({
        nzopen:false,
        pxopen:false,
        qyopen:false,
        nzshow:false,
        pxshow:true,
        qyshow:true,
        isfull:false,
        shownavindex: 0
      })
    }else{
      this.setData({
        content:this.data.nv,
        nzopen:true,
        pxopen:false,
        qyopen:false,
        nzshow:false,
        pxshow:true,
        qyshow:true,
        isfull:true,
        shownavindex:e.currentTarget.dataset.nav
      })
    }
  },
  listpx: function(e){
    if(this.data.pxopen){
      this.setData({
        nzopen:false,
        pxopen:false,
        qyopen:false,
        nzshow: true,
        pxshow:false,
        qyshow:true,
        isfull:false,
        shownavindex: 0
      })
    }else{
      this.setData({
        content:this.data.px,
        nzopen:false,
        pxopen:true,
        qyopen:false,
        nzshow: true,
        pxshow:false,
        qyshow:true,
        isfull:true,
        shownavindex:e.currentTarget.dataset.nav
      })
    }
    console.log(e.target)
  },
  selectleft: function(e){

    this.setData({
      cityright:{},
      citycenter:this.data.cityleft[e.currentTarget.dataset.city],
      select1: e.target.dataset.city,
      select2:''
    });
  },
  selectcenter: function(e){
    
    this.setData({
      cityright:this.data.citycenter[e.currentTarget.dataset.city],
      select2: e.target.dataset.city
    });
  },
  hidebg: function(e){

    this.setData({
      qyopen:false,
      nzopen:false,
      pxopen:false,
      nzshow:true,
      pxshow:true,
      qyshow:true,
      isfull:false,
      shownavindex: 0
    })
  }
})