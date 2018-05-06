// pages/movie/movie-more/movie-more.js
var app = getApp();
var utils = require("../../util/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryName:"",
    movies:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.categoryName)
    var categoryName = options.categoryName
    this.setData({
      categoryName: categoryName
    })
    var publicUrl = app.gloalUrl.doubanUrl;
    var allUrl = '';
    switch (options.categoryName){
      case "正在热映":
         allUrl = publicUrl + "/v2/movie/in_theaters"
      break;
      case "即将上映":
         allUrl = publicUrl + "/v2/movie/coming_soon"
      break;
      case "Top250" :
         allUrl = publicUrl + "/v2/movie/top250"
      break;
    }
    //进行网络请求
    utils.http(allUrl,this.callback);
  },
//处理数据
  callback: function (res) {
    //处理数据
    // console.log(res)
    var movies = [];

    for (var idx in res.subjects) {
      var subject = res.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "..."
      }
      var temp = {
        title: title,
        coverageUrl: subject.images.large,//图标
        average: subject.rating.average,//评分
        star: utils.convertStars(subject.rating.stars),
        movieid: subject.id//id
      }
      movies.push(temp);
    }
    this.setData({
      movies:movies
    })
  },
  //设置导航条
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.categoryName
      })
  }
  
})