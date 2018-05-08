// pages/movie/movie-detail/movie-detail.js
var app = getApp();
var utils = require("../../util/utils.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieid = options.movieid;
    var detailMovieUrl = app.gloalUrl.doubanUrl +"/v2/movie/subject/"+movieid;
    utils.http(detailMovieUrl,this.callback)
  },
  callback:function(data){
    console.log(data)
    /**
     * 电影图片 movieimg
     * 制片地区，国家 country
     * 电影名称；title
     * 想看人数 wish_count
     * 短评数量 commentCount
     * 年代 year
     * 电影类型 generes
     * 评星 stars
     * 评分 score
     * 导演 director
     * 主演 casts
     * 主演信息 castsInfo
     * 简介 summary
     * 
     */
    if(!data){
      return ;
    }
   // 处理导演数据
   var director = {
     avatars:"",
     name:""
   }
   if(data.directors[0] != null){
     if (data.directors[0].avatars != null){
       director.avatars = data.directors[0].avatars
     }
     director.name = data.directors[0].name;
   }
    var temp = {
      movieimg : data.images.large,
      country : data.countries[0],
      title : data.title,
      wish_count: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes:data. genres,
      stars: utils.convertStars(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: utils.covertCasts(data.casts),
      castsInfo: utils.covertActor(data.casts),
      summary : data.summary
    }
    console.log(temp);
    this.setData({
      movie:temp
    })
  }

})