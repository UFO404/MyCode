//index.js
//获取应用实例
var api = require('../../API/API.js')
var WxParse = require('../../wxParse/wxParse.js');
var appInstance = getApp()
var that = this;
var page_id = 1;   //当前页数
var Forum_id = 4; //当前板块id
var bl_loading = true;

Page({
  data: {
    open: false,
    mark: 0,
    newmark: 0,
    istoright: true,
    isloading: false,

    forumlist: [],
    sforum: []
  },
  //事件处理函数
  bindViewTap: function (e) {
    page_id = 1;
    this.data.sforum.splice(0, that.data.sforum.length);
    this.setData({
      sforum: []
    }),
      Forum_id = e.currentTarget.dataset.id,
      load_sforum(Forum_id, page_id)
    wx.setNavigationBarTitle({ title: e.currentTarget.dataset.fname });
    this.setData({
      open: false
      
    });
  },

  load_thread: function (e) {
    if (e.target.id != "") return;
    that.setData({
      isloading: true
    })
    wx.navigateTo({
      url: '../main_thread/main_thread?id=' + e.currentTarget.dataset.id,
    })
     that.setData({
      isloading: false
    })

  },

  bind_pic_tap: function (e)//单击图片
  {

    var pr_imgs = [appInstance.globalData.url.full_img_url + this.data.sforum[e['currentTarget'].id].img];
    wx.previewImage({
      current: appInstance.globalData.url.thumb_img_url + this.data.sforum[e['currentTarget'].id].img,
      urls: pr_imgs
    })
  },
  bind_pic_load: function (e)//图片加载完成
  {
    // var temp_width = 0;
    // var temp_height = 0;
    // var temp_ratio = 0.0;
    // temp_width = appInstance.globalData.sysinfo.sys_width/2;//要缩放到的图片宽度
    // temp_ratio = temp_width/e.detail.width;//计算缩放比例
    // temp_height = e.detail.height*temp_ratio;//计算缩放后的高度
    this.data.sforum[e.target.id].img_height = parseInt(100);
    this.data.sforum[e.target.id].img_width = parseInt(100);
    this.data.sforum[e.target.id].img_load_success = true;
    this.setData({ sforum: this.data.sforum });
  },
  onLoad: function () {
    that = this
    load_ForumList();
    load_sforum(Forum_id, page_id)
  },

  onPullDownRefresh: function () {
    if (bl_loading == false) return;
    bl_loading == false;
    page_id = 1;
    this.data.sforum.splice(0, that.data.sforum.length);
    this.setData({
      sforum: []
    }),
      load_sforum(Forum_id, page_id);
    wx.stopPullDownRefresh();
    bl_loading == true;
  },

  onReachBottom: function ()//上拉加载更多
  {
    if (bl_loading == false) return;
    bl_loading == false;
    var that = this;
    load_sforum(Forum_id, page_id);
    bl_loading == true;
  },


  //页面右滑
  tap_ch: function (e) {
    if (this.data.open) {
      this.setData({
        open: false
      });
    } else {
      this.setData({
        open: true
      });
    }
  },
  tap_start: function (e) {
    // touchstart事件
    this.data.mark = this.data.newmark = e.touches[0].pageX;
  },
  tap_drag: function (e) {
    // touchmove事件

    /*
     * 手指从左向右移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    // this.data.newmark = e.touches[0].pageX;
    // if (this.data.mark < this.data.newmark) {
    //   if (this.data.newmark - this.data.mark > 35) {
    //     this.istoright = true;
    //   }
    // }
    /*
     * 手指从右向左移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    if (this.data.mark > this.data.newmark) {
      this.istoright = false;

    }
    this.data.mark = this.data.newmark;

  },
  tap_end: function (e) {
    // touchend事件
    this.data.mark = 0;
    this.data.newmark = 0;
    if (this.istoright) {
      this.setData({
        open: true
      });
    } else {
      this.setData({
        open: false
      });
    }
  }
  //页面右滑结束

})

//获取板块列表
function load_ForumList() {

  //调用应用实例的方法获取全局数据
  api.getForumList(function (res) {
    that.setData({
      forumlist: res.data
    })
  }
  )
}
//获取板块内串
function load_sforum(Forum_id1, page_id1) {
  //调用应用实例的方法获取全局数据
  api.showf(Forum_id1, page_id1, function (res) {
    var sforum = that.data.sforum;
    if (res.data.length > 0) {
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].img != "") {
          res.data[i].img = res.data[i].img + res.data[i].ext;
          res.data[i].thumburl = res.data[i].ext == ".gif" ? appInstance.globalData.url.full_img_url : appInstance.globalData.url.thumb_img_url;
        }
        res.data[i].html = WxParse.wxParse('item', 'html', res.data[i].content, that, null);
        // res.data[i].img_height = 0;
        // res.data[i].img_width = 0;
        res.data[i].img_load_success = false;
        sforum.push(res.data[i]);
      }
      that.setData({ sforum: sforum });
      page_id++;
    }
  }
  )
}
