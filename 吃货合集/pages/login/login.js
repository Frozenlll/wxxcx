Page({
  data: {
    phone: '',
    password: ''
  },

  // 获取输入账号  
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取输入密码  
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录  
  login: function () {
    //获取用户信息,先登陆
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://test.com/onLogin',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });

    // wx.redirectTo({
    //   url: '/pages/covermap/covermap',
    // });
    var that = this;

    if (this.data.phone.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      wx.request({
        url: 'https://zhonglestudio.cn/gismgr/webctrl/login/', //仅为示例，并非真实的接口地址
        data: {
          userName: that.data.phone,
          userPwd: that.data.password,
          ignoreImgCode: 'true'
        },
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.msg) {
            wx.showModal({
              title: '提示',
              content: '登录失败：' + res.data.msg,
              showCancel: false,
              success: function (res) {

              }
            });
          } else {

            wx.switchTab({
              url: '/pages/covermap/covermap',
            })
          }
        }
      })
    }

  }
})  