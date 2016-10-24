(function() {
  var input = document.querySelector('#text-input');
  var left_in = document.querySelector('#left-in');
  var right_in = document.querySelector('#right-in');
  var left_out = document.querySelector('#left-out');
  var right_out = document.querySelector('#right-out');
  var isNumber = /^[0-9]+$/;
  var data = [];
  var oLayout = document.querySelector('#layout');
  var warning = document.querySelector('#warning');
  left_in.onclick = function() {
    var input2 = input.value.trim();
    if (isNumber.test(input2)) {
      data.unshift(input2);
      renderdata();
      input.value = "";
    } else {
      warning.innerText = "您输入的不是数字，请输入数字";
    }
  }
  left_out.onclick = function() {
    data.shift();
    renderdata();
  }
  right_in.onclick = function() {
    var input2 = input.value.trim();
    if (isNumber.test(input2)) {
      data.push(input2);
      renderdata();
      input.value = "";
    } else {
      warning.innerText = "您输入的不是数字，请输入数字";
    }
  }
  right_out.onclick = function() {
      data.pop();
      renderdata();
  }
  oLayout.addEventListener("click", function(e) {
    var index = e.target.getAttribute("data-index");
    data.splice(index,1);
    renderdata();
  })

  function renderdata() {
    oLayout.innerHTML = "";
    warning.innerText = "";
    for (var i = 0; i < data.length; i++) {
      var item = document.createElement('span');
      item.innerText = data[i];
      item.setAttribute("data-index",i);
      oLayout.appendChild(item);
    }
  }
  renderdata();
})()
