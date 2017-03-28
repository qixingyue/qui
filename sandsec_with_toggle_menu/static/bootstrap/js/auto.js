$(function () {
  $("[data-toggle='popover']").popover();
  $("[data-toggle='tooltip']").tooltip();
  $("button[link]").click(function(){
    window.location.href = $(this).attr("link");
  });

});

function toggleSideMenu (){

  var open = function(){
    $("div.sidebar").animate({ "width":"0px" }); 
    $("div.main").animate({ "padding-left":"20px" });
  }

  var close = function(){
    $("div.sidebar").animate({ "width":"200px" });
    $("div.main").animate({ "padding-left":"220px" });
  }

  if(toggleSideMenu.toggle){
    close(); 
  }else{
    open(); 
  }

  toggleSideMenu.toggle = ! toggleSideMenu.toggle;
}

toggleSideMenu.toggle = false;

