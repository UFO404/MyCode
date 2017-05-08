var api = require('../../API/API.js')
var WxParse = require('../../wxParse/wxParse.js');
var appInstance = getApp();
var page_id = 1;     //页数
var that;
var thread_id;       //串的ID
var Surplus_page_id = 0; //剩下没啦的页数
var bl_loading =false;

Page({
  data: {
    thread: [],
    light_thread: [],
    open: false,
    satat: ""//当前状态
  },
  //事件处理
  bind_pic_tap: function (e)//单击图片
  {

    var pr_imgs = [appInstance.globalData.url.full_img_url + this.data.thread[e['currentTarget'].id].img];
    wx.previewImage({
      current: appInstance.globalData.url.thumb_img_url + this.data.thread[e['currentTarget'].id].img,
      urls: pr_imgs
    })
  },
  bind_pic_load: function (e)//图片加载完成
  {
    // var temp_width = 0;
    // var temp_height = 0;
    // vaQA1r temp_ratio = 0.0;
    // temp_width = appInstance.globalData.sysinfo.sys_width/2;//要缩放到的图片宽度
    // temp_ratio = temp_width/e.detail.width;//计算缩放比例
    // temp_height = e.detail.height*temp_ratio;//计算缩放后的高度
    this.data.thread[e.target.id].img_height = parseInt(100);
    this.data.thread[e.target.id].img_width = parseInt(100);
    this.data.thread[e.target.id].img_load_success = true;
    this.setData({ thread: this.data.thread });
  },
  //获取高亮串
  get_thread: function (e) {
    var light_thread = that.data.light_thread;
    this.data.light_thread.splice(0, that.data.light_thread.length);
    that.setData({
      light_thread: []
    })
    var th_id = e.currentTarget.dataset.id;
    wx.request({
      url: appInstance.globalData.url.host + appInstance.globalData.url.get_thread_url + "&id=" + th_id,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        // if (res.data.length > 0) {
        // for (let i = 0; i < res.data.length; i++) {
        if (res.data.img != "") {
          res.data.img = res.data.img + res.data.ext;
          res.data.thumburl = res.data.ext == ".gif" ? appInstance.globalData.url.full_img_url : appInstance.globalData.url.thumb_img_url;
        }
        let temp_html = GetQuote(res.data.content);
        res.data.content = temp_html.html;//正则高亮所有引用串号
        res.data.all_kid = temp_html.all_kid;
        res.data.html = WxParse.wxParse('item', 'html', res.data.content, that, null);
        // res.data.replys[i].img_height = 0;
        // res.data.replys[i].img_width = 0;
        res.data.img_load_success = false;
        light_thread.push(res.data);
        // }
        // }
        that.setData({
          light_thread: light_thread,
          open: true
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })

  },
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
  onLoad: function (e) {
    // 生命周期函数--监听页面加载
    that = this;
    thread_id = e.id;
    wx.setNavigationBarTitle({ title: 'NO.' + thread_id });
    page_id = 1;
    load_data(thread_id, page_id);
  },

  onPullDownRefresh: function () {
    if(bl_loading==true)return;
    bl_loading==true;
    page_id = 1;
    this.data.thread.splice(0, that.data.thread.length);
    this.setData({
      thread: []
    }),
      load_data(thread_id, page_id);
    wx.stopPullDownRefresh();
    bl_loading==false;
  },

  onReachBottom: function ()//上拉加载更多
  {
   if(bl_loading==true)return;
    bl_loading==true;
    var that = this;
    load_data(thread_id, page_id);
    bl_loading==false;
  },

})


function load_data(id, page) {
  that.setData({
    satat: "正在加载..."
  })
  api.thread(id, page, function (res) {
    var thread = that.data.thread;

    if (page_id == 1) {
      if (res.data.img != "") {
        res.data.img = res.data.img + res.data.ext;
        res.data.thumburl = res.data.ext == ".gif" ? appInstance.globalData.url.full_img_url : appInstance.globalData.url.thumb_img_url;
      }
      res.data.html = WxParse.wxParse('item', 'html', res.data.content, that, null);
      // res.data.img_height = 0;
      // res.data.img_width = 0;
      res.data.img_load_success = false;
      thread.push(res.data);
    }
    else {
      if (res.data.replys.length == 0) {
        that.setData({
          satat: "已是最后一页,上拉刷新..."
        })
        return;
      }

    }
    if (res.data.replys.length > 0) {
      for (let i = 0; i < res.data.replys.length; i++) {
        if (res.data.replys[i].img != "") {
          res.data.replys[i].img = res.data.replys[i].img + res.data.replys[i].ext;
          res.data.replys[i].thumburl = res.data.replys[i].ext == ".gif" ? appInstance.globalData.url.full_img_url : appInstance.globalData.url.thumb_img_url;
        }
        let temp_html = GetQuote(res.data.replys[i].content);
        res.data.replys[i].content = temp_html.html;//正则高亮所有引用串号
        res.data.replys[i].all_kid = temp_html.all_kid;
        res.data.replys[i].html = WxParse.wxParse('item', 'html', res.data.replys[i].content, that, null);
        // res.data.replys[i].img_height = 0;
        // res.data.replys[i].img_width = 0;
        res.data.replys[i].img_load_success = false;
        thread.push(res.data.replys[i]);
      }
    }

    that.setData({ thread: thread });

    if (res.data.replys.length = 19) {
      page_id++;
      that.setData({
          satat: "上拉加载更多..."
        })
    }



  }

  )

}

//引用串高亮
function GetQuote(kid) {
  var te = /((&gt;){2}|(>){2})(No\.){0,3}\d{1,11}/g;//正则表达式匹配出所有引用串号，支持>>No.123123和>>123123 两种引用格式
  //var te_addr = /h.nimingban.com\/t\/\d{1,11}/g;
  var te2 = /\d{1,11}/g;
  var out_data = { html: null, all_kid: [], all_kid_int: [] };
  var all_find = kid.match(te);
  if (all_find != null && all_find != false && all_find.length > 0) {
    out_data.html = kid.replace(te, '<view class="be_br"></view>');
    for (let i = 0; i < all_find.length; i++) {
      let temp_find = all_find[i].match(te2);
      // let temp_find = all_find[i].split(";")
      // let temp_find = all_find[i].replace(/&gt;/g, '>')
      if (temp_find != null && temp_find != false && temp_find.length > 0) {
        out_data.all_kid.push(temp_find);
      }
    }
  }
  else {
    out_data.html = kid;
  }
  //console.log(out_data);
  return out_data;
}