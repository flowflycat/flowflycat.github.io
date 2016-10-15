// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

//生成的原始数据
var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
  }

//获得元素
var cityselect = document.getElementById("city-select");
var chart_wrap = document.getElementsByClassName("aqi-chart-wrap")[0];
var timeform = document.getElementById("form-gra-time");

/**
 * 渲染图表
 */

function renderChart(data) {
  //清空图表
  chart_wrap.innerHTML = "";
  //定义6种初始颜色
  var colors = ["green", "blue", "red", "purple", "black"];
  //定义柱形图宽度
  var w;
  if (pageState.nowGraTime == "day") {
    w = 10;
  } else if (pageState.nowGraTime == "week") {
    w = 30;
  } else if (pageState.nowGraTime == "month") {
    w = 90;
  }
  //生成图表
  for (var key in data) {
    drawChart(w, data[key],key);
  }
  //图表生成函数
  function drawChart(w, value,key) {
    var oDiv = document.createElement("div");
    var color;
    oDiv.style.width = w + "px";
    oDiv.style.height = value + "px";
    oDiv.setAttribute("title",key);
    if (value <= 100) {
      color = colors[0];
    } else if (value > 100 && value <= 200) {
      color = colors[1];
    } else if (value > 200 && value <= 300) {
      color = colors[2];
    } else if (value > 300 && value <= 400) {
      color = colors[3];
    } else if (value > 400 && value <= 500) {
      color = colors[4];
    }
    oDiv.style.background = color;
    chart_wrap.appendChild(oDiv);
  }
/*
  * 本部分为canvas渲染图表尝试，待完成
  var canvas = document.getElementById("chart-canvas");
  var context = canvas.getContext("2d");
  function drawChart(x1, y1, d, value) {
    context.fillRect(x1, y1, x1 + d, y1 - value);
    if (value <= 100) {
      color = colors[0];
    } else if (value > 100 && value <= 200) {
      color = colors[1];
    } else if(value > 200 && value <= 300) {
        color = colors[2];
    } else if(value > 300 && value <= 400) {
        color = colors[3];
    } else if(value > 400 && value <= 500) {
        color = colors[4];
    } 
    context.fillStyle = color;
  }
  */
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  var time = timeform.querySelector('input:checked').value;
  if (time != pageState.nowGraTime) {
    pageState.nowGraTime = time;
  }
  // 设置对应数据
  chartData = initAqiChartData();
  // 调用图表渲染函数
  renderChart(chartData);
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var cityindex = cityselect.selectedIndex;
  if (cityindex != pageState.nowSelectCity) {
    pageState.nowSelectCity = cityindex;
  }
  // 设置对应数据
  var chartData = initAqiChartData();
  // 调用图表渲染函数
  renderChart(chartData);
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  timeform.addEventListener("click", graTimeChange);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  for (var key in aqiSourceData) {
    var op = document.createElement("option");
    op.innerHTML = key;
    cityselect.appendChild(op);
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  cityselect.addEventListener("change", citySelectChange);
  citySelectChange();
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var cityData;
  switch (pageState.nowSelectCity) {
    case 0:
      cityData = aqiSourceData["北京"];
      break;
    case 1:
      cityData = aqiSourceData["上海"];
      break;
    case 2:
      cityData = aqiSourceData["广州"];
      break;
    case 3:
      cityData = aqiSourceData["深圳"];
      break;
    case 4:
      cityData = aqiSourceData["成都"];
      break;
    case 5:
      cityData = aqiSourceData["西安"];
      break;
    case 6:
      cityData = aqiSourceData["福州"];
      break;
    case 7:
      cityData = aqiSourceData["厦门"];
      break;
    case 8:
      cityData = aqiSourceData["沈阳"];
      break;
  }
  if (pageState.nowGraTime == "day") {
    chartData = cityData;
  } else if (pageState.nowGraTime == "week") {
    var j=1,weekData = {};
    for (var key in cityData) {
      var dat = new Date(key);
      var sum = 0,
          i=0;
      if (dat.getDay() !=0) {
        sum+= cityData[key];
        i++;
      } else {
        sum+= cityData[key];
        i++;
        weekData["第"+j+"周"] = sum/i;
        i=0
        j++
      }
    }
    chartData = weekData;
    console.log(chartData);
  } else if (pageState.nowGraTime == "month"){
    var dat = new Date("2016-01-01"),
        monthData = {},
        i=0,j=0,k=0,
        month1 = 0,
        month2 = 0,
        month3 = 0;
    for (var key in cityData){
      var dat = new Date(key);
      if (dat.getMonth() == 0) {
        month1 += cityData[key];
        i++;
      } else if (dat.getMonth() == 1) {
        month2 += cityData[key];
        j++;
      } else if (dat.getMonth() == 2) {
        month3 += cityData[key];
        k++
      }
    }
    monthData["一月"] = month1/i;
    monthData["二月"] = month2/j;
    monthData["三月"] = month3/k;
    chartData = monthData;
    console.log(chartData);
  }
  return chartData;
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();
