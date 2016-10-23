$(document).ready(function() {
  waterfall();
  var dataInt = {
    "data": [
      { "src": "P_00.jpg" },
      { "src": "P_01.jpg" },
      { "src": "P_02.jpg" },
      { "src": "P_03.jpg" },
      { "src": "P_04.jpg" },
      { "src": "P_05.jpg" },
      { "src": "P_06.jpg" },
      { "src": "P_07.jpg" },
      { "src": "P_08.jpg" },
      { "src": "P_09.jpg" },
      { "src": "P_010.jpg" },
      { "src": "P_011.jpg" },
      { "src": "P_012.jpg" },
      { "src": "P_013.jpg" },
      { "src": "P_014.jpg" },
      { "src": "P_015.jpg" },
      { "src": "P_016.jpg" },
      { "src": "P_017.jpg" },
      { "src": "P_018.jpg" },
      { "src": "P_019.jpg" }
    ]
  };
  $(window).scroll(function() {
    if (checkScrollSlide) {
      $.each(dataInt.data,function(key,value){
      	var oBox = $("<div>").addClass("box").appendTo($("#main"));
      	var oPic = $("<div>").addClass("pic").appendTo(oBox);
      	$("<img>").attr("src","images/" + $(value).attr("src")).appendTo(oPic);
      })
    }
    waterfall();
  })
});

function waterfall() {
  var oBoxs = $("#main>div");
  var w = oBoxs.eq(0).outerWidth();
  var cols = Math.floor($(window).width() / w);
  $('#main').width(cols * w).css("margin", "0 auto");
  var heightArr = [];
  oBoxs.each(function(index, value) {
    var h = oBoxs.eq(index).outerHeight();
    if (index < cols) {
      heightArr[index] = h;
    } else {
      var minH = Math.min.apply(null, heightArr);
      var minIndex = $.inArray(minH, heightArr);
      $(value).css({
        "position": "absolute",
        "top": minH + "px",
        "left": minIndex * w + "px"
      });
      heightArr[minIndex] += oBoxs.eq(index).outerHeight();
    }
  })
}

function checkScrollSlide() {
  var lastBox = $("#main>div").last();
  var lastBoxDis = lastBox.offset().top + Math.floor(lastBox.outerHeight() / 2);
  var scrollTop = $(window).scrollTop();
  var window_h = $(window).height();
  return (lastBoxDis < scrollTop + window_h) ? true : false;
}
