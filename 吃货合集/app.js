App({
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    firstIndex:'',
    secondIndex:'',
    menudata: [
      {
        checked: true,
        children: [
          {
            checked: true,
            children: [
              {
                checked: true,
                children: null,
                id: "1658",
                leaf: true,
                menuName: "田腾腾",
                parent_id: "00151624118949000012005056c00001"
              },
              {
                checked: true,
                children: null,
                id: "1657",
                leaf: true,
                menuName: "赵苏鸣",
                parent_id: "00151624118949000012005056c00001"
              }
            ],
            id: "00151624118949000012005056c00001",
            leaf: false,
            menuName: "检查人员",
            parent_id: "00151624118947800000005056c00001"
          },
          {
            checked: true,
            children: [
              {
                checked: true,
                children: null,
                id: "1666",
                leaf: true,
                menuName: "杨浦区",
                parent_id: "00151624118948500004005056c00001"
              },
              {
                checked: true,
                children: null,
                id: "1665",
                leaf: true,
                menuName: "浦东新区",
                parent_id: "00151624118948500004005056c00001"
              }
            ],
            id: "00151624118948500004005056c00001",
            leaf: false,
            menuName: "区域",
            parent_id: "00151624118947800000005056c00001"
          }
        ],
        id: "00151624118947800000005056c00001",
        leaf: false,
        menuName: "2017年10月上海城管小区问题清单",
        parent_id: null
      }
    ]
  }
})
