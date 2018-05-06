// pages/news/news-detail/news-detail.js
var newsData = require("../../data/newsdata.js");
Page({
  data: {
  },
  onLoad: function (options) {

     //console.log(newsData.initData[options.newsid]);//索引值（第几条数据的内容）
    //newsData.initData[options.newsid]  这条数据本身就是一个对象而非一个数组，所以在setData()时，不需要加{}，直接把数据放在(内)
    this.setData(newsData.initData[options.newsid])
    this.setData({
      newsid:options.newsid
    })


      // 收藏
    // var newsCollect = {
    //  存储格式 0,1,2代表第几条数据
    //   0:true,第一条数据
    //   1:false,
    //   2:true
    // }


    //第一次进入的时候判断是否存在本地数据以及是否收藏
    var newsCollect = wx.getStorageSync("newsCollect");
    //如果newsCollect存在，代表以前收藏过或者以前取消收藏
    if(newsCollect){
        var newCollect = newsCollect[options.newsid];
        this.setData({
          collected:newCollect
        })
    }else{
      //第一次进入根本不存在数据，
      var newsCollect = {};
      //把当前唯一id扔到newsCollect对象中，然后默认false
      newsCollect[options.newsid] = false;
      //扔到本地存储中去
      wx.setStorageSync("newsCollect", newsCollect)
    }
  },
  collectTap:function(event){
    //console.log(this.data.newsid);
     var newsCollect = wx.getStorageSync("newsCollect");//所有数据的集合
     var newCollect = newsCollect[this.data.newsid];//一条数据
    //点击的时候，如果收藏则取消，如果未收藏则收藏
     newCollect = !newCollect;
     //更新到本地存储数据中
     newsCollect[this.data.newsid] = newCollect;
     wx.setStorageSync("newsCollect", newsCollect);
     //更新视图
     this.setData({
       collected:newCollect
     });
     wx.showToast({
       title: newCollect?"收藏成功":"取消收藏",
       icon: 'success',
       duration: 1000
     })
  },
  //分享
  onShareAppMessage: function (res) {
    return {
      title: newsData.initData[this.data.newsid].title,
      path: '/pages/news/news-detail/news-detail',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  //播放音乐
 
  playermusic:function(e){
     //播放音乐前先判断是否在播放
     var that = this;
     wx.getBackgroundAudioPlayerState({
       success: function (res) {
         console.log(res)
         var status = res.status
        if(status != 1){
          console.log(1)
            //没有在播放
            wx.playBackgroundAudio({
              dataUrl: newsData.initData[that.data.newsid].music.url,
              title: newsData.initData[that.data.newsid].music.title,
              coverImgUrl: newsData.initData[that.data.newsid].music.coverImg
            })
          }else{
            console.log(2)
            wx.pauseBackgroundAudio();
          }
       }
     })
  }
})