(function(){
	var c = document.querySelector('#communication');
	var c_d = document.querySelector('#communication-details');
	var c_d_width = c_d.offsetWidth + 'px';
	function asideAnimate(item1,item2,width){
		if (item1.style.right == 0 || item1.style.right == '0px') {
			item1.style.right = width;
			item2.style.visibility ='visible';
		}else if (item1.style.right == width) {
			item2.style.visibility ='hidden';
			item1.style.right = '0';
		}
	}
	c.addEventListener('click',function(){
		asideAnimate(c,c_d,c_d_width);
	})
})()
//(function(){
//	var c = $('#communication');
//	var c_d = $('#communication-details');
//	function asideAnimate(item1,item2){
//		if  {}
//	}
//})