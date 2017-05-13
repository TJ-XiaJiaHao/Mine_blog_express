$(document).ready(function(){
	var _x,_y,x,y,				//鼠标位置,旋转角度
		xoffset,yoffset,		//鼠标偏差
		roX = -20,roY = 0, 		//旋转角度
		timer;					//定时器
		
	var myPlatform = document.getElementById("platform");
	var imgItems = myPlatform.getElementsByTagName("img");
	
	//初始化所有图片的旋转角度
	var Deg = 360 / imgItems.length;
	for(var i = 0;i < imgItems.length; i++){
		imgItems[i].style.transform = 'rotateY(' + Deg * i + 'deg) translateZ(350px) rotateX(-5deg)';
		
		//禁止用户触发拖动事件
		imgItems[i].ondragstart = function(){
			return false;
		}
		imgItems[i].onmouseover = function(){
			this.style['transform'] = this.style['-webkit-transform'] += 'scale(1.2)';
			clearInterval(timer);
		}
		imgItems[i].onmouseout = function(){
			this.style['transform'] = this.style['-webkit-transform'].replace('scale(1.2)','');
			console.log(this.style['transform']);
			autoplay();
		}
	}
	
	//拖拽效果
	document.onmousedown = function(e){
		e = e || window.event;	//兼容，IE把鼠标事件放在了window.event中
		
		//获取鼠标位置
		_x = e.clientX;
		_y = e.clientY;
		
		this.onmousemove = function(e){
			window.getSelection ? 						//兼容，清除文本选中
				window.getSelection().removeAllRanges()://获取选中的内容并清除，如文本选中等
				document.selection.empty();				//IE中使用：后面的，用于清除页面选中属性
			e = e || window.event;
			x = e.clientX;
			y = e.clientY;
			
			//计算鼠标偏移值
			xoffset = x - _x;
			yoffset = y - _y;
			
			//旋转platform
			roY += xoffset * 0.2; 	//沿Y轴旋转的角度
			roX -= yoffset * 0.2;	//沿X轴旋转的角度
			myPlatform.style.transform=" rotateX(" + roX + "deg) rotateY(" + roY + "deg)";
			
			//重新获取鼠标位置
			_x = e.clientX;
			_y = e.clientY;
		}
		
		this.onmouseup = function(){
			this.onmousemove = null;
		}
	}
	
	//自动播放
	function autoplay(){
		clearInterval(timer);
		timer = window.setInterval(function(){
			roY += 0.3 ;
			myPlatform.style.transform = " rotateX(" + roX + "deg) rotateY(" + roY + "deg)";
		},30);
	}
	autoplay();
}); 