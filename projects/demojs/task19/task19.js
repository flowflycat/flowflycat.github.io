var text_data = document.querySelector('#text-data');
var input_btn = document.querySelector('#input-btn');
var sortlist_btn = document.querySelector('#sortlist-btn');
var warning_info = document.querySelector('#warning');
var data = [],tempData = [];
var rendered = document.querySelector('#rendered');
var sort_wrap = document.querySelector('#sort-wrap');
//测试 生成随机数数组，长度60
(function dataCreate() {
  for (var i = 0; i < 60; i++) {
    data.push(Math.floor(Math.random() * 100));
  }
  return data;
})();
console.log(data.length);
//输入数据校验
function dataTest() {
  warning_info.innerHTML = "";
  var data_2 = parseInt(text_data.value.trim());
  var isNumber = /^[0-9]+$/;
  if (isNumber.test(data_2)) {
    if (data_2 > 10 && data_2 < 100) {
      if (data.length < 60) {
        data.push(data_2);
        text_data.value = "";
        console.log(data);
      } else {
        alert("输入数据个数不能超过60个");
      }
    } else {
      warning_info.innerHTML = "输入数据超出范围，请输入10-100范围内的数字";
    }
  } else {
    warning_info.innerHTML = "输入数据有误，请输入数字";
  }
}

/*
  var drawing = document.querySelector('#drawing');
  function sortList() {
  data = data.sort(compare);
  function compare(val1, val2) {
    return val1 - val2;
  }
  //渲染
  renderWrap();
  }

  function renderDrawing(){
  var i,x1=0,x2=10,y1=100,y2;
  for (i=0;i<data_list.length;i++) {
    y2 = -parseInt(data_list[i]);
    rendering(x1,y1,x2,y2);
    x1+=15;
  }
  }
  function rendering(x,y,width,height){
  if (drawing.getContext) {
    var context = drawing.getContext('2d');
    context.fillStyle = "#f00";
    context.fillRect(x,y,width,height);
  }
  }
*/
//冒泡排序算法
function bubbleSort() {
  for (var i = 0, len = data.length - 1; i < len; i++) {
    for (var j = 0; j < len - i; j++) {
      if (data[j] > data[j + 1]) {
        var temp = data[j];
        data[j] = data[j + 1];
        data[j + 1] = temp;
      }
    }
  }
}

function renderSort(){
  for (var i = 0; i < data.length; i++) {
    if (data[i] == tempData[i]) {
      data
    }
  }
}

function renderDiv(w, h, bgcolor) {
  var oDiv = document.createElement("div");
  oDiv.style.width = w + "px";
  oDiv.style.height = data[i] + "px";
  oDiv.style.background = bgcolor;
  sort_wrap.appendChild(oDiv);
}

function init() {
  input_btn.addEventListener("click", dataTest);
  sortlist_btn.addEventListener("click", bubbleSort);
  //rendered.addEventListener("click", renderDrawing);

  bubbleSort();
}

init();
