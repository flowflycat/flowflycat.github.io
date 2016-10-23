$(window).scroll(function() {
  var scrollTop = $(document).scrollTop(); //滚动条发生滚动时，要获取相应的值。
  var menu = $("#menu");
  var currentLink = menu.find(".current");
  var content = $("#content");
  var items = content.find(".item");
  var currentId = "";
  items.each(function() {
      var item = $(this);
      var itemTop = item.offset().top;
      if (scrollTop > itemTop - 100) {
        currentId = "#" + item.attr("id");
      }
    })
  if (currentId && currentId != currentLink.attr("href")) {
    currentLink.removeClass("current");
    menu.find("[href=" + currentId + "]").addClass("current");
  }
})
