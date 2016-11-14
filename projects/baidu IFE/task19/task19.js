/*
task19.js
author: ffc
*/

/*封装document.getElementById方法*/
function getDOM(id) {
  return document.getElementById(id);
}
/*取得dom*/
var text_data = getDOM("text-data");
var left_in = getDOM("left-in");
var right_in = getDOM("right-in");
var left_out = getDOM("left-out");
var right_out = getDOM("right-out");
var sortlist_btn = getDOM("sortlist-btn");
var create_data = getDOM("create-data");
var layout = getDOM("layout");
var sort_wrap = getDOM("sort-wrap");

var isrunning = false;
var data = [];

/*输入数据校验*/
function checkdata(_data) {
  var isNumber = /^[0-9]+$/;
  console.log(_data);
  if (!isNumber.test(_data)) {
    alert("输入数据有误，请输入数字");
    return false;
  }
  if (_data < 10 || _data > 100) {
    alert("输入数据超出范围，请输入10-100范围内的数字");
    return false;
  }
  if (_data.length >= 60) {
    alert("输入数据个数不能超过60个");
    return false;
  }
  return true;
}


/*生成随机数数组，长度60*/
function createData(_data) {
  if (_data.length != 0) {
    data = [];
  }
  for (var i = 0; i < 60; i++) {
    data.push(Math.floor(Math.random() * 90) + 10);
  }
}

/*冒泡排序*/
function bubbleSort() {
  var delay = 20;
  if (sort_wrap.length == 0) {
    renderChart(data);
  }
  if (layout.length == 0) {
    renderdata(data);
  }
  var datas = layout.querySelectorAll("div");
  var eles = sort_wrap.querySelectorAll("div");
  var len = eles.length,
    i = len - 1,
    j = 0;
  var timer = setInterval(function() {
      if (i <= 0) {
        clearInterval(timer);
      }
      if (j == i) {
        i--;
        j = 0;
      }
      if (eles[j].offsetHeight > eles[j + 1].offsetHeight) {
        swap(eles[j], eles[j + 1]);
        swapData(datas[j], datas[j + 1]);
      }
      j++;
    }, delay);
}

function swap(el1, el2) {
  var temp1 = el1.offsetHeight;
  var temp2 = el2.offsetHeight;
  el1.style.height = temp2 + "px";
  el1.style.backgroundColor = bgColor(temp2);
  el2.style.height = temp1 + "px";
  el2.style.backgroundColor = bgColor(temp1);
}

function swapData(el1, el2) {
  var temp1 = parseInt(el1.innerHTML);
  var temp2 = parseInt(el2.innerHTML);
  el1.innerHTML = temp2;
  el1.style.backgroundColor = bgColor(temp2);
  el2.innerHTML = temp1;
  el2.style.backgroundColor = bgColor(temp1);
}
/*冒泡排序结束*/

/*渲染图表*/
function renderChart(_data) {
  sort_wrap.innerHTML = "";
  var w = 10;
  for (var i = 0; i < _data.length; i++) {
    var oDiv = document.createElement("div");
    oDiv.style.width = w + "px";
    oDiv.style.height = _data[i] + "px";
    oDiv.style.background = bgColor(_data[i]);
    sort_wrap.appendChild(oDiv);
  }
}
/*背景色*/
function bgColor(h) {
  if (h >= 10 && h < 25) {
    return "#3A8FB7";
  } else if (h >= 25 && h < 40) {
    return "#86C166";
  } else if (h >= 40 && h < 55) {
    return "#FAD689";
  } else if (h >= 55 && h < 70) {
    return "#ED784A";
  } else if (h >= 70 && h < 85) {
    return "#D75455";
  } else if (h >= 85 && h <= 100) {
    return "#3C2F41";
  } else {
    return "#080808";
  }
}

/*数组可视化*/
function renderdata(_data) {
  layout.innerHTML = "";
  for (var i = 0; i < _data.length; i++) {
    var oDiv = document.createElement("div");
    oDiv.innerText = _data[i];
    oDiv.style.backgroundColor = bgColor(_data[i]);
    layout.appendChild(oDiv);
  }
}


/*渲染数组及*/
function render(_data) {
  renderChart(_data);
  renderdata(_data);
}

function init() {
  left_in.addEventListener("click", function() {
    var _data = text_data.value.trim();
    if (checkdata(_data)) {
      data.unshift(_data);
      text_data.value = "";
      render(data);
    }
  }, false);
  left_out.addEventListener("click", function() {
    data.shift();
    render(data);
  }, false);
  right_in.addEventListener("click", function() {
    var _data = text_data.value.trim();
    if (checkdata(_data)) {
      data.push(_data);
      text_data.value = "";
      render(data);
    }
  }, false);
  right_out.addEventListener("click", function() {
    data.pop();
    render(data);
  }, false);
  sortlist_btn.addEventListener("click", function() {
    if (data.length == 0) {
      alert("数组是空的");
    } else if (isrunning) {
      alert("冒泡排序已启动");
      return;
    } else {
      isrunning = true;
      bubbleSort();
    }
  }, false);
  create_data.addEventListener("click", function() {
    createData(data);
    render(data);
  }, false);
}

init();
