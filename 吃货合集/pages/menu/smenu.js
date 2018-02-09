//获取app变量
var app = getApp()
Page({
  data: {
    smenu: [],
    firstIndex: '',
    secondIndex:'',
    globalStatusMenuData: []
  },
  onShow: function (options) {
    var that = this;
    wx.getStorage({
      key: 'menuData',
      success: function (res) {
        console.log(res);
        that.setData({
          firstIndex: res.data.firstIndex,
          smenu: app.globalData.menudata[res.data.firstIndex].children,
          globalStatusMenuData: res.data.globalStatusMenuData
        });
      },
    })
  },
  navThird: function (e) {
    var that = this;
    var secondIndex = e.currentTarget.dataset.idx;
    wx.setStorage({
      key: 'menuData',
      data: {
        firstIndex: that.data.firstIndex,
        secondIndex: secondIndex,
        globalStatusMenuData: that.data.globalStatusMenuData
      },
    });
    wx.navigateTo({
      url: 'tmenu',
    })
  },
  listenCheckboxChange: function (e) {
    // 父级节点选中时，子集节点全选，相反，父级节点反选时，子集节点也要反选
    var that = this;
    var arr = e.detail.value;
    // console.log(that.data.globalStatusMenuData[that.data.firstIndex].children);
    // console.log(that.data.firstIndex);

    var len = that.data.globalStatusMenuData[that.data.firstIndex].children.length;
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
      for (var itemIdx in that.data.globalStatusMenuData[that.data.firstIndex].children) {
        if (idx == itemIdx) {
          that.data.globalStatusMenuData[that.data.firstIndex].children[idx].status = true;
          that.data.globalStatusMenuData[that.data.firstIndex].status = true;
        }
      }
    }
    for (var idx of tmpArr) {
      for (var itemIdx in that.data.globalStatusMenuData[that.data.firstIndex].children) {
        if (idx == itemIdx) {
          that.data.globalStatusMenuData[that.data.firstIndex].children[idx].status = false;
        }
      }
    }
    that.setData({
      globalStatusMenuData: that.data.globalStatusMenuData
    })
    console.log(that.data.gmenu);
    wx.setStorage({
      key: 'menuData',
      data: {
        globalStatusMenuData: that.data.globalStatusMenuData,
        firstIndex: that.data.firstIndex
      }
    });
    console.log(that.data.globalStatusMenuData);
  },
  navMain: function (e) {
    wx.switchTab({
      url: '/pages/covermap/covermap',
    })
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