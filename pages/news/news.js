// pages/news/news.js

//引入数据  使用require
var newsData = require("../data/newsdata.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    useData:""
  },
  onLoad: function (options) {
    // this.setData()可以重绘view视图，这时useData就可以在视图中直接使用
     this.setData({
       useData: newsData.initData
     })
  },
  goNewsDetail:function(event){
    var newsid = event.currentTarget.dataset.newsid;
      wx.navigateTo({
        url: 'news-detail/news-detail?newsid='+newsid
      })
  }
})