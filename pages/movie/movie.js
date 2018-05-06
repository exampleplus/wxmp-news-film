// pages/movie/movie.js
var app = getApp();
var utils = require("../util/utils.js");
Page({
  data: {
    //初始化每个分类电影的数据
    inTheaters:[],
    comingSoon:[],
    Top:[],
    movies:[]
  },
  onLoad: function (options) {
    var inTheaters = app.gloalUrl.doubanUrl + "/v2/movie/in_theaters?start=0&count=3";//正在热映,从第0条开始获取，获取3条
    var comingSoon = app.gloalUrl.doubanUrl +"/v2/movie/coming_soon?start=0&count=3";//即将上映
    var Top = app.gloalUrl.doubanUrl +"/v2/movie/top250?start=0&count=3";//top250
    this.http(inTheaters, this.callback,"inTheaters","正在热映");
    this.http(comingSoon, this.callback,"comingSoon","即将上映");
    this.http(Top, this.callback,"Top","Top250");
  },
  //将获取数据的封装为一个方法
  http: function (url, callback, category, categoryName){  //传入一个参数代表电影的分类,count代表每一类先获取几条数据,callback是一回调函数，处理不同分类电影
    wx.request({
      url:url,
      header: {
        'content-type': 'application/xml' // 默认值
      },
      success: function (res) {
        callback(res.data, category,categoryName)
      }
    })
  },
  //回调函数
  callback: function (res, category, categoryName){
      //处理数据
     // console.log(res)
      var movies=[];
      
      for (var idx in res.subjects){
        var subject = res.subjects[idx];
        var title = subject.title;
        if(title.length>=6){
          title = title.substring(0,6)+"..."
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
      //console.log(movies)
      //问题：类型不同,需要传不同的参数进来
      var readyData={};
      readyData[category] = {
        categoryName: categoryName,
        movies : movies
      };
      console.log(readyData)
      this.setData(readyData);//
  },
  //跳转到更多页面
  movieMoreTap:function(e){
    //console.log(e)
    var categoryName = e.currentTarget.dataset.category;

      wx.navigateTo({
        url: 'movie-more/movie-more?categoryName=' + categoryName
      })
  }

})