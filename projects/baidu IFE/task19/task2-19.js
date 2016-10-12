(function(){
	var text_data = document.querySelector('#text-data');
	var input_btn = document.querySelector('#input-btn');
	var sortlist_btn = document.querySelector('#sortlist-btn');
	var warning_info = document.querySelector('#warning');
	var drawing = document.querySelector('#drawing');
	var data_list = [];
	var rendered = document.querySelector('#rendered');
	function dataTest(){
		warning_info.innerHTML="";
		var data_2 = text_data.value.trim();
		var isNumber = /^[0-9]+$/;
		if (isNumber.test(data_2)) {
			if (data_2>10&&data_2<100) {
				data_list.push(data_2);
				text_data.value = "";
				console.log(data_list);
			} else{
				warning_info.innerHTML = "输入数据超出范围，请输入10-100范围内的数字";
			}
		}else{
			warning_info.innerHTML = "输入数据有误，请输入数字";
		}
	}

	function sortList(){
		data_list = data_list.sort(compare);
		function compare(val1,val2){
			return val1-val2;
		}
		console.log(data_list);
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
	function init(){
		input_btn.addEventListener("click",dataTest);
		sortlist_btn.addEventListener("click",sortList);
		rendered.addEventListener("click",renderDrawing);
	}

	init();
})()