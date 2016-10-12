(function(){
var input =document.querySelector('#text-input');
var left_in = document.querySelector('#left-in');
var right_in = document.querySelector('#right-in');
var left_out = document.querySelector('#left-out');
var right_out = document.querySelector('#right-out');
var isNumber = /^[0-9]+$/;
var data = [];
var oLayout = document.querySelector('#layout');
var warning = document.querySelector('#warning');
//if(){
	left_in.onclick = function(){
		var input2 = input.value.trim();
		if (isNumber.test(input2)) {
			data.unshift(input2);
			renderdata();
			input.value = "";
		}else{
			warning.innerText = "您输入的不是数字，请输入数字";
		}
		//console.log(data);
	}
	left_out.onclick = function(){
		data.shift();
		renderdata();
		//console.log(data);
	}
	right_in.onclick = function(){
		var input2 = input.value.trim();
		if (isNumber.test(input2)) {
			data.push(input2);
			renderdata();
			input.value = "";
		}else{
			warning.innerText = "您输入的不是数字，请输入数字";
		}
		//console.log(data);
	}
	right_out.onclick = function(){
		data.pop();
		renderdata();
		//console.log(data);
	}
//}
function renderdata(){
	var i;
	oLayout.innerHTML = "";
	warning.innerText = "";
	for(i=0;i<data.length;i++){
		 var item = document.createElement('span');
		 item.innerText = data[i];
		 oLayout.appendChild(item);
	}
}
})()