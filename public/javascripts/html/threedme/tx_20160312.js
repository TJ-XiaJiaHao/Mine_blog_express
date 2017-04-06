window.onload=function(){
	var list=document.getElementById("list");
	var iw=20;
	var css=document.getElementById("css");
	var len=list.clientWidth/iw;
	var btn=document.getElementById("btn").children;
	var i=0;
	var oli;
	var iN=0;
	var iz=0;
	for(i=0;i<len;i++){
		i>len/2?iz--:iz++;
		list.innerHTML+='<li><a htref=""></a><a htref=""></a><a htref=""></a><a htref=""></a></li>';
		css.innerHTML+="#list li:nth-of-type("+(i+1)+") a{background-position:-"+i*iw+"px 0}";
		css.innerHTML+="#list li:nth-of-type("+(i+1)+"){z-index:"+iz+"}";
		/*document.getElementById("list").getElementsByTagName("li")[i].style.backgroundPosition="-"+i*iw+"px 0";*/
	}
	oli=list.children;
	for(i=0;i<btn.length;i++){
		btn[i].index=i;
		btn[i].onclick=function(){
			btn[iN].className='';
			iN=this.index;
			for(i=0;i<oli.length;i++){
				oli[i].style.transition="all " + (i*50+500) + "ms";
				oli[i].style.transform="rotateX(-"+(iN*90)+"deg)";
			}
			btn[iN].className='fir';
		}
	}
	
}