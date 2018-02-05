//index.js
//获取应用实例
// var app = getApp()
// Page({
  // data: {
  //   j: 1,//帧动画初始图片
  //   isSpeaking: true,//是否正在说话
  //   voices: [],//音频数组
  //   recodePath:'',
  //   show:false
  // },
  // onLoad: function () {
  // },
  //手指按下
function touchdown() {
    console.log("手指按下了...")
    console.log("new date : " + new Date)
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
  }
  //手指抬起
function  touchup() {
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
        _this.setData({
          voices: voices
          // recodePath: tempFilePath
        })
        // wx.hideToast();
      },
      fail: function (res) {
        wx.hideLoading();
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
  //点击播放录音
  function gotoPlay(e) {
    var filePath = e.currentTarget.dataset.key;
    //点击开始播放
    wx.showToast({
      title: '开始播放',
      icon: 'success',
      duration: 1000
    })
    wx.playVoice({
      filePath: filePath,
      success: function () {
        wx.showToast({
          title: '播放结束',
          icon: 'success',
          duration: 1000
        })
      }
    })
  }
// })
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
/*
function init(that, barHeight, keys, isShowKey, isShowHis, callBack) {
  var recData = {};
  var view = {
    j: 1,//帧动画初始图片
    isSpeaking: true,//是否正在说话
    voices: [],//音频数组
    recodePath: '',
    show: false
  }

  wx.getSystemInfo({
    success: function (res) {
      var wHeight = res.windowHeight;
      view.seachHeight = wHeight - barHeight;
      recData.view = view;
      that.setData({
        recSearchData: recData
      });
    }
  })

  if (typeof (callBack) == "function") {
    callBack();
  }

  getHisKeys(that);
}
module.exports = {
  init: init,
  speaking: speaking,
  gotoPlay: gotoPlay,
  touchup: touchup,
  touchdown: touchdown
}*/