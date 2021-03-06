/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var city_input = document.getElementById('aqi-city-input');
var value_input = document.getElementById('aqi-value-input');
var warn_info = document.getElementById('warn-info');
var table = document.getElementById('aqi-table');
var add_btn = document.getElementById('add-btn');
/* 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  city = city_input.value.trim();
  value = value_input.value.trim();
  var bl = testData(city, value)
  if (bl) {
    aqiData[city] = value;
    city_input.innerHTML = "";
    value_input.innerHTML = "";
  }
}
//数据测试模块
function testData(city, value) {
  warn_info.innerHTML = "";
  var isName = /^[\u4e00-\u9fa5a-zA-Z]+$/;
  var isValue = /^[0-9]+$/;
  if (isName.test(city)) {
    if (isValue.test(value)) {
      return true;
    } else {
      warn_info.innerHTML = "您输入空气质量指数有误!";
      return false;
    }
  } else {
    warn_info.innerHTML = "您输入的城市名称有误，请重新输入！";
    return false;
  }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  //清除上一次表格
  table.innerHTML = "";
  //创建表头
  var table_thead = document.createElement('thead');
  table_thead.innerHTML = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
  //创建表主体
  var table_tbody = document.createElement("tbody");
  for (var city in aqiData) {
    var tr_data = document.createElement('tr');
    var td_data1 = document.createElement('td');
    var td_data2 = document.createElement('td');
    var td_data3 = document.createElement('td');
    td_data1.innerHTML = city;
    tr_data.appendChild(td_data1);
    td_data2.innerHTML = aqiData[city];
    tr_data.appendChild(td_data2);
    td_data3.innerHTML = "<button class='delete-btn'>删除</button>";
    tr_data.appendChild(td_data3);
    table_tbody.appendChild(tr_data);
    console.log(tr_data);
  }
  //组合表头和表主体部分
  if (city) {
    table.appendChild(table_thead);
    table.appendChild(table_tbody);
  }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
  if (e.target.nodeName === "BUTTON") {}
  var oCity = e.target.parentNode.parentNode.firstChild.innerHTML;
  delete aqiData[oCity];
  renderAqiList();
}

function init() {
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var add_btn = document.querySelector("#add-btn");
  add_btn.addEventListener("click", addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  //事件代理
  table.addEventListener("click", delBtnHandle);
}

init();
