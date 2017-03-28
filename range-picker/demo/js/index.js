;(function() {

    var dateFormat = function (d,fmt) { //author: meizz 
      var o = {
        "M+": d.getMonth() + 1, //月份 
        "d+": d.getDate(), //日 
        "h+": d.getHours(), //小时 
        "m+": d.getMinutes(), //分 
        "s+": d.getSeconds(), //秒 
        "q+": Math.floor((d.getMonth() + 3) / 3), //季度 
        "S": d.getMilliseconds() //毫秒 
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
  
    window.date_range = function(start,end,id){
    
      //var startDate = new Date("2017-03-19 00:00:00"),
          //endDate = new Date("2017-03-22 00:00:00"),
          //offset = endDate - startDate;

     var startDate = new Date(start),
          endDate = new Date(end),
          offset = endDate - startDate;

      $(id).rangepicker({
          type: "double",
          startValue: dateFormat(startDate, "yyyy-MM-dd"),
          endValue: dateFormat(endDate, "yyyy-MM-dd"),
          translateSelectLabel: function(currentPosition, totalPosition) {
              var timeOffset = offset * ( currentPosition / totalPosition);
              var date = new Date(+startDate + parseInt(timeOffset));
              return dateFormat(date,"MM-dd hh:mm");
          }
      });
    
    }

}());
