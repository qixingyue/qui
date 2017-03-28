;(function() {
    "use strict";

    function dateFormat(date, fmt) {
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
        };
        if (/(y+)/.test(fmt)){
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }

    var startDate = new Date("2013/11/12"),
        endDate = new Date("2013/12/22"),
        offset = endDate - startDate;

    $("#date_range").rangepicker({
        startValue: dateFormat(startDate, "yyyy/MM/dd"),
        endValue: dateFormat(endDate, "yyyy/MM/dd"),
        translateSelectLabel: function(currentPosition, totalPosition) {
            var timeOffset = offset * ( currentPosition / totalPosition);
            var date = new Date(+startDate + parseInt(timeOffset));
            return dateFormat(date, "yyyy/MM/dd");
        }
    });

    window.hello = $("#double_date_range").rangepicker({
        type: "double",
        startValue: dateFormat(startDate, "yyyy-MM-dd"),
        endValue: dateFormat(endDate, "yyyy-MM-dd"),
        translateSelectLabel: function(currentPosition, totalPosition) {
            var timeOffset = offset * ( currentPosition / totalPosition);
            var date = new Date(+startDate + parseInt(timeOffset));
            return dateFormat(date, "yyyy/MM/dd");
        }
    });

    $("#number_range").rangepicker({
        startValue: 0,
        endValue: 100,
        translateSelectLabel: function(currentPosition, totalPosition) {
            return parseInt(100 * (currentPosition / totalPosition));
        }
    });

    $("#double_number_range").rangepicker({
        type: "double",
        startValue: 0,
        endValue: 100,
        translateSelectLabel: function(currentPosition, totalPosition) {
            return parseInt(100 * (currentPosition / totalPosition));
        }
    });

    var week = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"];
    $("#week_range").rangepicker({
        type: "double",
        startValue: week[0],
        endValue: week[6],
        translateSelectLabel: function(currentPosition, totalPosition) {
            var index = parseInt(6 * (currentPosition / totalPosition));
            return week[index];
        }
    });

    var month = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    $("#month_range").rangepicker({
        type: "double",
        startValue: month[0],
        endValue: month[11],
        translateSelectLabel: function(currentPosition, totalPosition) {
            var index = parseInt(11 * (currentPosition / totalPosition));
            return month[index];
        }
    });

}());
