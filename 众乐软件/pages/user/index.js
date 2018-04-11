var app = getApp()
Page( {
  data: {
    userInfo: {},
    userListInfo: [ /*{
      icon: '../../images/key.png',
      text: '密码管理',
    }, {
        icon: '../../images/iconfont-card.png',
        text: '我的代金券',
        isunread: false,
        unreadNum: 2
      }, {
        icon: '../../images/message.png',
        text: '我的消息',
        isunread: true,
        unreadNum: 1,
        url: '../../pages/contact/index'
      },*/ {
        icon: '../../images/iconfont-kefu.png',
        text: '联系我们',
        url:'../../pages/contact/index'
      }, {
        icon: '../../images/iconfont-help.png',
        text: '常见问题',
        url: '../../pages/faq/index'
      }, {
        icon: '../../images/loginout.png',
        text: '退出账号',
        url: '../../pages/login/login'
      }]
  },

  onLoad: function() {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo ) {
      //更新数据
      that.setData( {
        userInfo: userInfo
      })
    })
  }
})