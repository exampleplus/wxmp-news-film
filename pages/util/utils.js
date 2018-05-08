//处理星星
//[10,20,30,40,50]代表一颗星，两颗星，....
//[1,1,1,0,0]1代表高亮，2代表灰色
function convertStars(stars){
  //num代表拆分的数字
  var num = stars.substring(0,1);
  var starArr=[];
  for(var i=0;i<5;i++){
    if(i<num){
      starArr.push(1)
    }else{
      starArr.push(0)
    }
  }
  return starArr;
}
//公共的网络请求
 function http (url, callback) { //callback是一回调函数，处理不同分类电影
  wx.request({
    url: url,
    method:"GET",
    header: {
      'content-type': 'application/xml' // 默认值
    },
    success: function (res) {
      callback(res.data)
    }
  })
}
//演员名字 使用”/“分割开

function covertCasts(casts){
  var castsJoin = "";
  var castsJoinFinal = ""
  for(var dic in casts){
    castsJoin = castsJoin + casts[dic].name + " / ";
   
  }
  castsJoinFinal =  castsJoin = castsJoin.substring(0,castsJoin.length-3);
  return castsJoin;
}


//处理演员信息  头像加名字
function covertActor(casts){
  //声明一个数组 存放演员名字和头像

  var castaArray = [];
  for(var j in casts){
    var cast = {
      img: casts[j].avatars ? casts[j].avatars.large:"",
      name:casts[j].name
    }
    castaArray.push(cast)
  } 

  console.log(castaArray)

  return castaArray;

}
module.exports = {
  convertStars:convertStars,
  http: http,
  covertCasts: covertCasts,
  covertActor: covertActor
}