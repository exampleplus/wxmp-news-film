// pages/movie/movie-more/movie-more.js
var app = getApp();
var utils = require("../../util/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryName:"",
    movies:[],
    totalCount:0,
    totalMovies:[],
    isEmpty:true
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
    this.setData({
      allUrl:allUrl
    })
    //进行网络请求
    utils.http(allUrl,this.callback);
    wx.showNavigationBarLoading();
  },


  //上拉加载
  onReachBottom: function (e) {
    //上来刷新的url需要变化1：start：0，2：start：20 3：start：40，count：20
    var nextUrl = this.data.allUrl + "?start=" + this.data.totalCount + "&count=20";
    utils.http(nextUrl, this.callback);
    wx.showNavigationBarLoading();
  },

  //下来刷新
  onPullDownRefresh: function () {
    var refreshUrl = this.data.allUrl;
    utils.http(refreshUrl, this.callback);
    this.data.totalMovies = [];
    this.data.isEmpty = true;
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
    var totalMovies = [];
    // concat合并数组 是不是第一次进入，是:不需要累加 ；非第一次进入：累加
    if (!this.data.isEmpty) {
      //非第一次进入   累加
      totalMovies = this.data.movies.concat(movies)
    }else{
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    })
    this.data.totalCount += 20 ;
    wx.hideNavigationBarLoading();
  },
  //设置导航条
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.categoryName
      })
  },
  //跳转到详情页

  goMovieDetailTap: function (e) {
    var movieid = e.currentTarget.dataset.movieid
    wx.navigateTo({
      url: "../movie-detail/movie-detail?movieid=" + movieid
    })
  }

})