function Qcharts(){

  var me = this;

  me.default_options = {
    backgroundColor:"black",
    //color:["#ABC","#0BC","#B0C","#BC0"],
    "u.textStyle.color":"white",
    "u.legend.color":"#EEE",
    "u.xAxis.color":"white",
    "u.yAxis.color":"white",
    "u.title.color":"white",
  }

  me.el = function(id){
    me.showDom = document.getElementById(id);
    if(null != me.showDom) {
      me.rObj = echarts.init(me.showDom);
      return me.rObj;
    }
  }

  me.show = function(options){
    if(null != me.rObj) {
      me.rObj.setOption(options); 
    }
  }

  me.wrapper = function(id,options){
    me.el(id);
    for(var key in me.default_options){
      if(key.indexOf("u.") == -1 && null == options[key]) {
        options[key]  = me.default_options[key];
      }
    }
    console.log(options);
    me.show(options);
  }

  me.nameTypeData = function(data,type){
    var rData = []
    for(var i = 0 , l = data.length ; i < l ; i++){
      var item = {"name":data[i].name,type:type,data:data[i].realdata}
      rData.push(item) ;
    } 
    return rData;
  }

  me.getYdataName = function(data){
    var rData = []
    for(var i = 0 , l = data.length ; i < l ; i++){
      rData.push(data[i].name);
    } 
    return rData;
  }

  me.createTitle = function(text,titleColor){
    return  {
      text:text,
      left:'center',
      textStyle:{
        color:titleColor 
      }
    };
  }

}


Qcharts.bindMethod = function(name,fn){
  Qcharts.prototype[name] = fn;
}

//showOptions ["textStyle.color","legend.color","xAxis.color","yAxis.color","title.color","backgroundColor"]
Qcharts.bindMethod("createLineBar",function(id,data,showOptions,type){

  if(null == showOptions){
    showOptions = {} 
  }

  type = type || "line";

  var textColor = showOptions["textStyle.color"] || this.default_options["u.textStyle.color"];
  var legendColor = showOptions["legend.color"] || this.default_options["u.legend.color"];
  var xAxisColor = showOptions["xAxis.color"] || this.default_options["u.xAxis.color"];
  var yAxisColor = showOptions["yAxis.color"] || this.default_options["u.yAxis.color"];
  var titleColor = showOptions["title.color"] || this.default_options["u.title.color"];
  var backgroundColor = showOptions["backgroundColor"] || null;

  var options = {
   backgroundColor:backgroundColor,
    textStyle:{
      color:textColor
    },
    title:this.createTitle(data.title,titleColor),
    legend:{
      data:this.getYdataName(data.ydata),
      left:'left',
      textStyle:{
        color:legendColor
      }
    },
    xAxis:{
      data:data.showx,
      axisLine:{
        lineStyle:{
          color:xAxisColor
        }
      }
    },
    yAxis:{
      axisLine:{
        lineStyle:{
          color:yAxisColor
        } 
      } 
    },
    tooltip:{
       trigger: 'axis',
       axisPointer : {            // 坐标轴指示器，坐标轴触发有效
           type : 'shadow',        // 默认为直线line，可选为：'line|shadow;
       }
    },
    // 只有这个地方用到了type
    series:this.nameTypeData(data.ydata,type)
  };

  this.wrapper(id,options);
});


Qcharts.bindMethod("createLine",function(id,data,showOptions){
  this.createLineBar(id,data,showOptions,"line");
});

Qcharts.bindMethod("createBar",function(id,data,showOptions){
  this.createLineBar(id,data,showOptions,"bar");
});

Qcharts.bindMethod("createScatter",function(id,data,showOptions){
  this.createLineBar(id,data,showOptions,"scatter");
});

Qcharts.bindMethod("createPie",function(id,data,showOptions,type){

  showOptions = showOptions || {};
  var titleColor = showOptions["title.color"] || this.default_options["u.title.color"];

   var options = {
     title:this.createTitle(data.title,titleColor),
     legend: {
       data:this.getYdataName(data.ydata),
       left: 'left',
       orient: 'vertical'
     },
     tooltip: {
       trigger: 'item',
       formatter: "{a} <br/>{b}: {c} ({d}%)"
     },
     series: [
     {
         label: {
           normal: {
             show: false,
             position: 'center'
           },
           emphasis: {
             show: true,
             textStyle: {
               fontSize: '30',
               fontWeight: 'bold'
             }
           }
         },
         avoidLabelOverlap: false,
         name: data.name,
         type: 'pie', 
         data: data.ydata,
         center: ['50%', '50%'],
         radius: ['50%', '80%'],
       } 
     ]
   };

   this.wrapper(id,options);

});

Qcharts.bindMethod("createDash",function(id,data){

  data = data || {};

  var min = data.min || 0;
  var max = data.max || 200;
  var value = data.value || 20;
  var valueName = data.valueName || "Value";

  var options = {
    tooltip : {
      //"{a} <br/>{b} : {c}%"
      formatter: function(params){
        var dashName = params.seriesName;
        var valueName = params.data.name;
        var value = params.data.value;
        return  valueName + ":" + value ;
      }
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {}
      }
    },
    series: [
    {
      name: "Dash",
      type: 'gauge',
      detail: {
        formatter:function(value){
          return Math.floor(value / max * 100 ) + "%";
        }
      },
      data: [
        {value: value , name: valueName}
      ],
      min:min,
      max:max
    }
    ]
  };
  this.wrapper(id,options);
});

