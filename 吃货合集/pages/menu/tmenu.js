//获取app变量
var app = getApp()
Page({
  data: {
    tmenu: [],
    firstIndex: '',
    secondIndex: '',
    globalStatusMenuData: []
  },
  onShow: function (options) {
    var that = this;
    wx.getStorage({
      key: 'menuData',
      success: function (res) {
        console.log(res.data.globalStatusMenuData);
        that.setData({
          secondIndex: res.data.secondIndex,
          tmenu: app.globalData.menudata[res.data.firstIndex].children[res.data.secondIndex].children,
          firstIndex: res.data.firstIndex,
          globalStatusMenuData: res.data.globalStatusMenuData
        });
      },
    })
  },
  listenCheckboxChange: function (e) {
    var that = this;
    var arr = e.detail.value;
    console.log(that.data.globalStatusMenuData[that.data.firstIndex].children[that.data.secondIndex].children);
    // console.log(that.data.firstIndex);

    var len = that.data.globalStatusMenuData[that.data.firstIndex].children[that.data.secondIndex].children.length;
    var tmpArr = [];
    for (var i = 0; i < len; i++) {
      tmpArr.push(i);
    }
    for (var idx of arr) {
      for (var i = 0; i < len; i++) {
        // tmpArr.push(i);
        if (idx == i) {
          removeByValue(tmpArr, i);//删除相同元素，剩下不同元素
        }
      }
    }
    for (var idx of arr) {
      for (var itemIdx in that.data.globalStatusMenuData[that.data.firstIndex].children[that.data.secondIndex].children) {
        if (idx == itemIdx) {
          that.data.globalStatusMenuData[that.data.firstIndex].children[that.data.secondIndex].children[idx].status = true;
          that.data.globalStatusMenuData[that.data.firstIndex].children[that.data.secondIndex].status = true;
          that.data.globalStatusMenuData[that.data.firstIndex].status = true;
        }
      }
    }
    for (var idx of tmpArr) {
      for (var itemIdx in that.data.globalStatusMenuData[that.data.firstIndex].children[that.data.secondIndex].children) {
        if (idx == itemIdx) {
          that.data.globalStatusMenuData[that.data.firstIndex].children[that.data.secondIndex].children[idx].status = false;
        }
      }
    }
    // console.log(that.data.gmenu);
    wx.setStorage({
      key: 'menuData',
      data: {
        firstIndex: that.data.firstIndex,
        secondIndex: that.data.secondIndex,
        globalStatusMenuData: that.data.globalStatusMenuData
      }
    });
    console.log(that.data.globalStatusMenuData);
  }
})

function removeByValue(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
}