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
window.onload = function() {
  waterfall("main", 'box');
  window.onscroll = function() {
    if (checkScrollSlide) {
      createBox();
      waterfall("main", "box");
    }
  }
}

function createBox() {
  var oParent = document.getElementById("main");
  for (var i = 0; i < dataInt.data.length; i++) {
    var oBox = document.createElement("div");
    oBox.setAttribute("class", "box");
    var oPic = document.createElement("div");
    oPic.setAttribute("class", "pic");
    var oImg = document.createElement("img");
    oImg.setAttribute("src", "images/" + dataInt.data[i].src);
    oPic.appendChild(oImg);
    oBox.appendChild(oPic);
    oParent.appendChild(oBox);
  }
}

function waterfall(parent, box) {
  oParent = document.getElementById(parent);
  var oBox = getByClass(oParent, "box");
  var oBox_w = oBox[0].offsetWidth;
  var cols = Math.floor(document.documentElement.clientWidth / oBox_w);
  oParent.style.cssText = "width:" + cols * oBox_w + "px;margin:0 auto";
  var hAttr = [];
  for (var i = 0; i < oBox.length; i++) {
    if (i < cols) {
      hAttr.push(oBox[i].offsetHeight);
    } else {
      var minH = Math.min.apply(null, hAttr);
      var index = getIndex(hAttr, minH);
      oBox[i].style.position = "absolute";
      oBox[i].style.top = minH + "px";
      //oBox[i].style.left = oBox_w * index + "px";
      oBox[i].style.left = oBox[index].offsetLeft + "px";
      hAttr[index] += oBox[i].offsetHeight;
    }
  }
}


function getByClass(parent, cls) {
  var lists = parent.getElementsByTagName('*');
  var result = [];

  for (var i = 0; i < lists.length; i++) {
    var _list = lists[i];
    if (_list.className == cls) {
      result.push(_list);
    }
  }
  return result;
}

function getIndex(arr, val) {
  for (var i in arr) {
    if (arr[i] == val) {
      return i;
    }
  }
}

function checkScrollSlide() {
  var oParent = document.getElementById("main");
  var oBoxs = getByClass(oParent, "box");
  var lastBoxH = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length - 1].offsetHeight / 2);
  var _top = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
  var clientHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
  return (lastBoxH < _top + clientHeight) ? true : false;
}
