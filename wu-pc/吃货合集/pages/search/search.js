//index.js
//获取应用实例
var WxSearch = require('../../wxSearch/wxSearch.js')
var app = getApp()
Page({
  data: {
    j: 1,//帧动画初始图片
    isSpeaking: true,//是否正在说话
    voices: [],//音频数组
    recodePath:'',
    recShow:false,
    inputvalue:''
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that,55,['weappdev','小程序','wxParse','wxSearch','wxNotification']);
    WxSearch.initMindKeys(['weappdev.com','微信小程序开发','微信开发','微信小程序']);
  },
  wxSearchFn: function(e){
    var that = this
    WxSearch.wxSearchAddHisKey(that);
  },
  wxSearchInput: function(e){
    var that = this
    WxSearch.wxSearchInput(e,that);
  },
  wxSerchFocus: function(e){
    var that = this
    WxSearch.wxSearchFocus(e,that);
  },
  wxSearchBlur: function(e){
    var that = this
    // WxSearch.wxSearchBlur(e,that);
  },
  wxSearchKeyTap:function(e){
    var that = this
    // WxSearch.wxSearchKeyTap(e,that);
    this.setData({
      inputvalue: e.target.dataset.key
    });
  },
  wxSearchDeleteKey: function(e){
    var that = this
    WxSearch.wxSearchDeleteKey(e,that);
  },
  wxSearchDeleteAll: function(e){
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function(e){
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  },
  navRadio:function(e){
    this.setData({recShow:true});
  },
  touchdown:function() {
    var _this = this;
    speaking.call(this);
    this.setData({
      isSpeaking: true
    })
    //开始录音
    wx.startRecord({
      success: function (res) {
        //临时路径,下次进入小程序时无法正常使用
        var tempFilePath = res.tempFilePath
        console.log("tempFilePath: " + tempFilePath)

        /*
        wx.showToast({
          title: '录音完成',
          icon: 'success',
          duration: 1000
        });
        wx.hideToast();
        */

        _this.setData({
          // voices: voices,
          recodePath: tempFilePath
        })
      },
      fail: function (res) {
        //录音失败
        wx.showModal({
          title: '提示',
          content: '录音的姿势不对!',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              return
            }
          }
        })
      }
    })
  },
  //手指抬起
touchup:function(e) {
    wx.showLoading({
      title: "识别中...",
      mask: true
    })
    var _this = this;
    wx.stopRecord();
    _this.setData({
      isSpeaking: false,
    })
    clearInterval(this.timer);
    setTimeout(function () {
      var urls = "https://zhonglestudio.cn/gismgr/uploadwxradio/uploadFile";
      console.log(_this.data.recodePath);
      wx.uploadFile({
        url: urls,
        filePath: _this.data.recodePath,
        name: 'file',
        header: {
          'content-type': 'multipart/form-data'
        },
        success: function (res) {
          wx.hideLoading();
          _this.setData({ recShow:false})
          var str = res.data;
          console.log('______________' + str);
          var data = JSON.parse(str);
          var voices = [];
          var voice;
          if (data.i_type == 'success') {
            // s.setData({ editData: cEditData });
            voice = { filePath: '', result: data.i_msg, size: 1213 };
          } else {
            voice = { filePath: '', result: data.i_msg, size: 1213 };
          }
          voices.push(voice);
          // var tempwxSearchData = _this.data.wxSearchData;
          // tempwxSearchData.value = data.i_msg;
          _this.setData({
            voices: voices,
            // wxSearchData: tempwxSearchData
            // recodePath: tempFilePath
            inputvalue: data.i_msg
          })
          // _this.data.wxSearchData
          // wx.hideToast();
        },
        fail: function (res) {
          wx.hideLoading();
          _this.setData({ recShow: false })
          console.log(res);
          wx.showModal({
            title: '提示',
            content: "网络请求失败，请确保网络是否正常",
            showCancel: false,
            success: function (res) {

            }
          });
          // wx.hideToast();
        }
      });
    }, 1000)
  }


})
//麦克风帧动画
function speaking() {
  var _this = this;
  //话筒帧动画
  var i = 1;
  this.timer = setInterval(function () {
    i++;
    i = i % 5;
    _this.setData({
      j: i
    })
  }, 200);
}