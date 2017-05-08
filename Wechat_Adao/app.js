//app.js
App({
  globalData: {
    url: {
      host: "https://h.nimingban.com",
      thumb_img_url: "http://img6.nimingban.com/thumb/",//缩略图
      full_img_url: "http://img6.nimingban.com/image/",//原图

      show_forum_url: "/Api/showf?appid=wechatapp",//获得板块内串
      get_ForumList_url: "/Api/getForumList?appid=wechatapp",//获得板块列表
      thread_url: "/Api/thread?appid=wechatapp",//获得串回复列表
      get_thread_url: "/Api/ref?appid=wechatapp",//获得串内容
      get_feed_url: "/Api/feed?appid=wechatapp",//获取所有订阅
      add_feed_url: "/Api/addFeed?appid=wechatapp",//将串添加到订阅列表
      del_feed_url: "/Api/delFeed?appid=wechatapp",//删除某个订阅的串

      new_thread_url: "/Home/Forum/doPostThread.html?appid=wechatapp",//发送新串
      new_reply_url: "/Home/Forum/doReplyThread.html?appid=wechatapp",//发送新回复

      top_image_url: "https://mfweb.top/adao/getpicture.php",//首页大图
      get_cookie_url: "https://ufo404.cn/getCookie.php",//小程序不支持获取Cookie 暂时从服务器端拿
      get_openid_url: "https://mfweb.top/adao/getopenid.php"//获取用户openid
    },
    userinfo: {//用户标识  用来保存收藏
      user_openid: null,
    },
    sysinfo: {
      sys_height: 0,//屏幕大小
      sys_width: 0
    }
  },

  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  }
 
})