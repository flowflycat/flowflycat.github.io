window.onload = function() {
  /*鼠标滑过标签页，内容更换*/
  var oUl = document.querySelectorAll(".f-tag-ul")[0];
  var oLists = oUl.querySelectorAll("li");
  var oDetail = document.querySelectorAll(".table-detail")[0];
  var oItems = oDetail.querySelectorAll("table");

  for (var i = 0; i < oLists.length; i++) {
    oLists[i].index = i;
    oLists[i].onmouseover = function() {
      for (var i = 0; i < oLists.length; i++) {
        oLists[i].className = "";
      }
      this.className = "selected";
      for (var j = 0; j < oItems.length; j++) {
        oItems[j].className = "hide";
      }
      oItems[this.index].className = "";
    }
  }

  /*计算汽车品牌产业排行榜的搜索指数长度并显示*/
  var oDivs = document.querySelectorAll(".u-exponential-bar");

  for (var i = 0; i < oDivs.length; i++) {
    var oP = oDivs[i].getElementsByTagName("p")[0];
    var oParent = oDivs[i].parentNode;
    var oSpan = oParent.getElementsByTagName("span")[0];
    oP.style.width = (parseInt(oSpan.innerHTML) / 50000000) * oDivs[0].offsetWidth + "px";
    oP.style.height = "4px";
    oP.style.background = colorRandom();
  }
}
  /*产生随机色值*/
function colorRandom() {
  var a = "#";
  for (var i = 0; i < 3; i++) {
    a += Math.floor(Math.random() * 256).toString(16);
  }
  return a;
}
