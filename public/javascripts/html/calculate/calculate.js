var dot=false;
var begin=false;
var count=0;
function click_1(id){
	id.style.backgroundColor="gray";
}
function click_2(id){
	if(!begin){
		document.getElementById("in").innerHTML="";
		begin=true;
	}
	id.style.backgroundColor="white";
	var tmp=String(document.getElementById("in").innerHTML);
	if(tmp[tmp.length-1]==')')document.getElementById("in").innerHTML+="*";
	document.getElementById("in").innerHTML+=id.innerHTML;
}
function click_oper(id){
	id.style.backgroundColor="white";
	if(!begin){
		alert("输入不合法");
		document.getElementById("in").innerHTML="";
		return;
	}
	var tmp=String(document.getElementById("in").innerHTML);
	if(tmp[tmp.length-1]=='/'||tmp[tmp.length-1]=='+'||tmp[tmp.length-1]=='-'||tmp[tmp.length-1]=='*'||tmp[tmp.length-1]=='.'){
		document.getElementById("in").innerHTML=tmp.substring(0,tmp.length-1);
	}
	else if(tmp[tmp.length-1]=='('){
		alert("输入不合法");
		return;
	}
	document.getElementById("in").innerHTML+=id.innerHTML;
}
function click_dot(id){
	id.style.backgroundColor="white";
	if(!begin){
		document.getElementById("in").innerHTML="";
		begin=true;
	}
	var tmp=document.getElementById("in").innerHTML;
	if(tmp==""||tmp[tmp.length-1]=='+'||tmp[tmp.length-1]=='-'||tmp[tmp.length-1]=='*'||tmp[tmp.length-1]=='/'||tmp[tmp.length-1]==')'||tmp[tmp.length-1]=='('){
		document.getElementById("in").innerHTML+="0.";								
		return;
	}
	for(var i=0;i<tmp.length;i++){
		if(tmp[i]=='.')dot=true;
		if(tmp[i]=='+'||tmp[i]=='-'||tmp[i]=='*'||tmp[i]=='/')dot=false;
	}
	if(dot)alert("输入不合法");
	else document.getElementById("in").innerHTML+=".";
}
function click_count(id){
	id.style.backgroundColor="white";
	var tmp=String(document.getElementById("in").innerHTML);
	if(id.innerHTML==")"){
		if(count==0){
			alert("输入不合法");
			return;
		}
		else if(tmp[tmp.length-1]=='+'||tmp[tmp.length-1]=='-'||tmp[tmp.length-1]=='*'||tmp[tmp.length-1]=='/'||tmp[tmp.length-1]=='.'){
			document.getElementById("in").innerHTML=tmp.substring(0,tmp.length-1);
			document.getElementById("in").innerHTML+=")";
			count--;
			return;
		}
		else if(tmp[tmp.length-1]=='('){
			document.getElementById("in").innerHTML=tmp.substring(0,tmp.length-1);
			count--;
			return;
		}
		else{
			document.getElementById("in").innerHTML+=")";
			count--;
			return;
		}
	}	
	if(id.innerHTML=='('){
		if(tmp[tmp.length-1]=='='){
			document.getElementById("in").innerHTML="";
			count=0;
		}
		count++;
		if(tmp==""||tmp.length==4||!begin||tmp[tmp.length-1]=='+'||tmp[tmp.length-1]=='-'||tmp[tmp.length-1]=='*'||tmp[tmp.length-1]=='/'||tmp[tmp.length-1]=='('){
			document.getElementById("in").innerHTML+="(";
			begin=true;
		}
		else if(tmp[tmp.length-1]=='.'){
			document.getElementById("in").innerHTML=tmp.substring(0,tmp.length-1);
			document.getElementById("in").innerHTML+="*(";
		}
		else{
			document.getElementById("in").innerHTML+="*(";
		}
	}
}
function back(id){
	id.style.backgroundColor="white";
	if(!begin){
		document.getElementById("in").innerHTML="";
		return;
	}
	var tmp=document.getElementById("in").innerHTML;
	if(tmp[tmp.length-1]==')')count++;
	else if(tmp[tmp.length-1]=='(')count--;
	document.getElementById("in").innerHTML=tmp.substring(0,tmp.length-1);
}
function clr(id){
	count=0;
	begin=false;
	id.style.backgroundColor="white";
	document.getElementById("in").innerHTML="";
}
function equal(id){
	begin=false;
	id.style.backgroundColor="white";
	var tmp=String(document.getElementById("in").innerHTML);
	if(tmp[tmp.length-1]=='/'||tmp[tmp.length-1]=='+'||tmp[tmp.length-1]=='-'||tmp[tmp.length-1]=='*'||tmp[tmp.length-1]=='.'){
		document.getElementById("in").innerHTML=tmp.substring(0,tmp.length-1);
	}
	document.getElementById("in").innerHTML+=id.innerHTML;
	document.getElementById("out").innerHTML="Ans";
}