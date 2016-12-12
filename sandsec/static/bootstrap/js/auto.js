$(function () {
  $("[data-toggle='popover']").popover();
  $("[data-toggle='tooltip']").tooltip();
  $("button[link]").click(function(){
    window.location.href = $(this).attr("link");
  });
});
