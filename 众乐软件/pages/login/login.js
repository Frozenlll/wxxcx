//获取app变量
var app = getApp()
Page({
  data: {
    phone: '',
    password: '',
    remember:true,

  },
  onShow: function (options) {
    var that = this;
    app.globalData.token = "";
    app.globalData.randomkey = "";
    wx.getStorage({
      key: 'pwdInfo',
      success: function (res) {
        console.log(res);
        that.setData({
          // searchtext: res.data.value
          remember: res.data.remember,
          phone: res.data.userName,
          password: res.data.userPwd,
          remember: res.data.remember
        })
      },
    });
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
    // wx.login({
    //   success: function (res) {
    //     if (res.code) {
    //       wxcode = res.code;
    //       console.log("wxcode=" + wxcode);
    //     } else {
    //       console.log('获取用户登录态失败！' + res.errMsg)
    //     }
    //   }
    // });
    if (wxcode){
      // randomkey = wxcode;
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
          wx.removeStorageSync("menu_flag");
          wx.removeStorage({
            key: 'searchText',
            success: function(res) {},
          })
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
            // if (that.data.remember){
              var name = "";
              var pwd = "";
              if (true == that.data.remember){
                name = that.data.phone;
                pwd = that.data.password;
              }
              wx.setStorage({
                key: 'pwdInfo',
                data: {
                  userName: name,
                  userPwd: pwd,
                  remember: that.data.remember
                }
              });
            // }
            app.globalData.token = res.data.data.token;
            app.globalData.randomkey = randomkey;
            //跳转
            wx.switchTab({
              url: '/pages/covermap/covermap',
            })
          }
        }
      })
    }

  },
  listenCheckboxChange:function(e){
    var that = this;
    if (e.detail.value[0] && "1" == e.detail.value[0]){//选中
      that.setData({
        remember:true
      })
    }else{
      that.setData({
        remember: false
      })
    }
  }
})  

function randomString(len) {
  　len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijoOLl9gqVvUuI1kmnprstwxyz2345678';
  　　var maxPos = $chars.length;
  　　var pwd = '';
  　　for (var i = 0; i < len; i++) {
    　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  　　}
  　　return pwd;
}