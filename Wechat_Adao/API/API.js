var appInstance = getApp();

//获取饼干
function getCookie(cb) {
    wx.request({
      url: appInstance.globalData.url.get_cookie_url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
         typeof cb == "function" && cb(res)
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
}
//获取板块列表
function getForumList(cb) {
    wx.request({
      url: appInstance.globalData.url.host + appInstance.globalData.url.get_ForumList_url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
         typeof cb == "function" && cb(res)
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
}


//获取板块串
function showf (id,page,cb) {
    wx.request({
      url: appInstance.globalData.url.host + appInstance.globalData.url.show_forum_url,
      data: {
        id:id,
        page:page

      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        typeof cb == "function" && cb(res)
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
}

//获取串内容
function thread (id,page,cb) {
    wx.request({
      url: appInstance.globalData.url.host + appInstance.globalData.url.thread_url,
      data: {
        id:id,
        page:page
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
         typeof cb == "function" && cb(res)
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
}

//发表新串

//查询订阅
function feed(cb) {
    wx.request({
      url: appInstance.globalData.url.get_cookie_url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
         typeof cb == "function" && cb(res)
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
}



//增加订阅
function addFeed(cb) {
    wx.request({
      url: appInstance.globalData.url.get_cookie_url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
         typeof cb == "function" && cb(res)
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
}

//删除订阅
function delFeed(cb) {
    wx.request({
      url: appInstance.globalData.url.get_cookie_url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
         typeof cb == "function" && cb(res)
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
}

module.exports = {
  getCookie:getCookie,
  getForumList:getForumList,
  showf: showf,
  thread:thread
}
