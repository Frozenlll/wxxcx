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
    var randomkey = randomString(32);
    var wxcode = "";
    //获取用户信息,先登陆
    wx.login({
      success: function (res) {
        if (res.code) {
          wxcode = res.code;
          console.log("wxcode=" + wxcode);
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    if (wxcode){
      randomkey = wxcode;
    }
    wx.setStorage({
      key: "appid",
      data: randomkey
    })
    var that = this;
    if (this.data.phone.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      wx.request({
        url: 'https://zhonglestudio.cn/gismgr/mini/login', 
        data: {
          userName: that.data.phone,
          userPwd: that.data.password,
          randomkey: randomkey
          // code: wxcode
        },
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.msg && "success" != res.data.msg) {
            wx.showModal({
              title: '提示',
              content: '登录失败：' + res.data.msg,
              showCancel: false,
              success: function (res) {
                console.log(res);
              }
            });
          } else {
            //存储token
            wx.setStorage({
              key: 'logininfo',
              data: {
                token: res.data.data.token,
                realName: res.data.data.real_name,
                randomkey: randomkey
              }
            });
            //跳转
            wx.switchTab({
              url: '/pages/covermap/covermap',
            })
          }
        }
      })
    }

  }
})  

function randomString(len) {
  　len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabc)({}!@#$%^&*defhijoOLl9gqVvUuI1kmnprstwxyz2345678';
  　　var maxPos = $chars.length;
  　　var pwd = '';
  　　for (var i = 0; i < len; i++) {
    　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  　　}
  　　return pwd;
}