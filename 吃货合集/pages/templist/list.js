var app = getApp()
Page({
  data: {
    hidden: true,
    itemList: [],
    randomkey:'',
    token:''
  },
  onShow: function (options) {
    var that = this;
    that.showLoading("show");
    //加载缓存中登陆信息
    wx.getStorage({
      key: 'logininfo',
      success: function (res) {
        // console.log(res.data);
        that.setData({
          randomkey: res.data.randomkey,
          token: res.data.token
        })
      },
    });
    wx.getStorage({
      key: 'detailInfo',
      success: function (res) {
        // res.data.ids
        that.loadDetailInfo(res.data.ids);
      },
    });
  },
  loadDetailInfo:function(ids){
    var that = this;
    wx.request({
      url: 'https://zhonglestudio.cn/gismgr/mini/getCoordinateInfo', //
      data: {
        randomkey: that.data.randomkey,
        token: that.data.token,
        ids: ids
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data);
        that.showLoading("hide");
        // console.log(res.data)
        if (0 == res.data.code) {
          that.setData({
            itemList: res.data.data
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
  previewImg: function (e) {
    var that = this
    var tsrc = "https://zhonglestudio.cn/gismgr/app/getImgBydetailId?id=";
    var srcArray = new Array()
    var tdata = that.data.itemList;
    if (tdata){
      for (var i = 0; i < tdata.length;i++){
        srcArray.push(tsrc + tdata[i].id);
      }
    }
    var src = e.currentTarget.dataset.src;//获取src
    var datasrc = e.currentTarget.dataset.data-src;//获取data-src
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: srcArray // 需要预览的图片http链接列表
    })
  },
   showLoading: function (showType) {
    if ("hide" == showType) {
      wx.hideLoading();
    } else {
      wx.showLoading(
        {
          title: "数据加载中",
          mask: "true"
        }
      );
    }
  },
})