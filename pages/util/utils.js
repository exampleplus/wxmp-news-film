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
module.exports = {
  convertStars:convertStars,
  http: http
}