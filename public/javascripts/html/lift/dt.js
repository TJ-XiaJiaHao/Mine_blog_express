var ele_num=5;    		/*电梯总数*/
var floor_num=20;   	/*楼层总数*/
var move_Time=1000; 	/*电梯运行时间*/
var wait_Time=2000;		/*开门等待时间*/
function createEle(v_id,v_state,v_now_floor,v_next_floor,v_wait,v_door){
	var ele=new Object;
	ele.id=v_id;
	ele.state=v_state
	ele.now_floor=v_now_floor;
	ele.next_floor=v_next_floor;
	ele.next_floor_state="stop";
	ele.wait=v_wait;	//关门倒计时
	ele.door=v_door;	//门的状态close/open
	ele.help=false;		//记录电梯是否维修
	ele.in=false;		//记录电梯内是否有人
	ele.inner_quene=new Array("false","false","false","false","false","false","false","false","false","false","false","false","false","false","false","false","false","false","false","false");
	ele.up_quene=new Array("false","false","false","false","false","false","false","false","false","false","false","false","false","false","false","false","false","false","false","false");
	ele.down_quene=new Array("false","false","false","false","false","false","false","false","false","false","false","false","false","false","false","false","false","false","false","false");

	ele.count_up=function(begin,end){   
		var cnt=0;
		for(i=begin;i<end;i++){
			if(this.up_quene[i]=="true"){
				cnt++;
			}
		}
		return cnt;
	}
	
	ele.count_dwn=function(begin,end){     
		var cnt=0;
		for(i=begin;i<end;i++){
			if(this.down_quene[i]=="true"){
				cnt++;
			}
		}
		return cnt;
	}
	
	ele.count_inner=function(begin,end){   
		var cnt=0;
		for(i=begin;i<end;i++){
			if(this.inner_quene[i]=="true"){
				cnt++;
			}
		}
		return cnt;
	}
	
	
	//计算该电梯到floor楼层的时间		参数说明：目标楼层floor和楼层意向floor_state
	ele.calculate=function(floor,floor_state){   
		var time=100;
		if(this.state=="stop"){	
			time=floor>this.now_floor?(floor-this.now_floor):(this.now_floor-floor);
			return time;
		}
		var stop_num=0;			//记录中途停留次数
		var between_num=0;		//记录中途楼层差
		if(this.state=="up"){
			if(floor>=this.now_floor){
				if(floor_state=="up"&&this.next_floor_state=="up"){
					stop_num=this.count_up(this.now_floor-1,floor)+this.count_inner(this.now_floor,floor); 			 //计算中途停留的数量
					between_num=floor-this.now_floor;
				}
				else if(floor_state=="up"&&this.next_floor_state=="down"){
					stop_num=this.count_dwn(0,20)+this.count_inner(0,20)+this.count_up(0,floor); 					 //计算中途停留的数量
					between_num=20*2-this.now_floor+floor; //若需要折返，则计算运行到底的情况
				}
				else if(floor_state=="down"&&this.next_floor_state=="up"){
					stop_num=this.count_up(this.now_floor-1,20)+this.count_dwn(floor,20)+this.count_inner(this.now_floor,20);
					between_num=20*2-floor-this.now_floor;
				}
				else if(floor_state=="down"&&this.next_floor_state=="down"){
					stop_num=this.count_dwn(floor,20)+this.count_inner(this.now_floor-1,20);
					between_num=floor-this.now_floor;
				}
			}
			else if(floor<this.now_floor){
				if(floor_state=="up"){
					stop_num=this.count_up(this.now_floor-1,20)+this.count_dwn(0,20)+this.count_up(0,floor)+this.count_inner(0,20);
					between_num=20*2-this.now_floor+floor;
				}
				else if(floor_state=="down"){
					stop_num=this.count_up(this.now_floor-1,20)+this.count_dwn(floor,20)+this.count_inner(floor,20);
					between_num=20*2-floor-this.now_floor;
				}
			}
		}
		else if(this.state=="down"){
			if(floor>this.now_floor){
				if(floor_state=="up"){
					stop_num=this.count_dwn(0,this.now_floor)+this.count_inner(0,floor)+this.count_up(0,floor);  //计算中途停留的数量
					between_num=floor+this.now_floor;
				}
				else if(floor_state=="down"){
					stop_num=this.count_dwn(0,this.now_floor)+this.count_inner(0,20)+this.count_up(0,20)+this.count_dwn(floor,20);
					between_num=20*2-floor+this.now_floor;
				}
			}
			else if(floor<=this.now_floor){
				if(floor_state=="up"&&this.next_floor_state=="up"){
					stop_num=this.count_up(0,floor)+this.count_inner(0,this.now_floor);
					between_num=this.now_floor-floor;
				}
				else if(floor_state=="up"&&this.next_floor_state=="down"){
					stop_num=this.count_up(0,floor)+this.count_inner(0,this.now_floor)+this.count_dwn(0,this.now_floor);
					between_num=this.now_floor+floor;
				}
				else if(floor_state=="down"&&this.next_floor_state=="up"){
					stop_num=this.count_up(0,20)+this.count_inner(0,20)+this.count_dwn(floor,20);
					between_num=20*2-floor+this.now_floor;
				}
				else if(floor_state=="down"&&this.next_floor_state=="down"){
					stop_num=this.count_dwn(floor-1,this.now_floor-1)+this.count_inner(floor-1,this.now_floor);
					between_num=this.now_floor-floor;
				}
			}
		}
		time=stop_num*2+between_num; 
		return time;
	}
	
	
	//将请求加入对应的就绪队列			参数说明：电梯ID，目标楼层，楼层意向
	ele.insert=function(dt_n,floor_n,floor_state){  
		if(floor_state=="up"){
			this.up_quene[(floor_n-1)]="true";
		}
		else if(floor_state=="down"){
			this.down_quene[floor_n-1]="true";
		}
		else if(floor_state=="inner"){
			this.inner_quene[floor_n-1]="true";
		}
		//如果最优电梯为空闲，则修改其状态
		if(this.state=="stop"){
			//如果该楼层有电梯，则直接开门即可
			if(floor_n==this.now_floor){
				this.state="up";
				arrive($("#btn li:nth-of-type("+this.now_floor+") #up")); 											//楼层按钮灭灯
				arrive($("#btn li:nth-of-type("+this.now_floor+") #down")); 										//楼层按钮灭灯
				arrive_inner($("#inner_btn ul li:nth-of-type("+this.now_floor+")")); 								//内部按钮灭灯
				$("#container li:nth-of-type("+this.id+") #ele #info #con li:nth-of-type(5)").text(wait_Time/1000);	//电梯显示等待
				$("#container li:nth-of-type("+this.id+") #ele #info #con li:nth-of-type(6)").text("open");			//门显示打开
				$("#container li:nth-of-type("+this.id+") #ele #info #con li:nth-of-type(6)").css("color","red");
				$("#container li:nth-of-type("+this.id+") #ele #door #con_floor").text("floor:"+this.now_floor);
				$("#container li:nth-of-type("+this.id+") #ele #door #con_wait").text("wait:2s");
				open(this.id);				//开门动画
				var eq=this.now_floor-1;
				setTimeout(this.count_down,1000,this.id,eq,this.state,this);/*关门倒计时*/
				return;
			}
			this.next_floor=floor_n;
			this.state=floor_n>this.now_floor?"up":"down";
			this.next_floor_state=floor_state=="inner"?this.state:floor_state;
			$("#container li:nth-of-type("+this.id+") #ele #info #con li:nth-of-type(2)").text(this.state);
			$("#container li:nth-of-type("+this.id+") #ele #info #con li:nth-of-type(2)").css("color","red");
			$("#container li:nth-of-type("+dt_n+") #ele #info #con li:nth-of-type(4)").text(this.next_floor);
			setTimeout(this.move,move_Time,dt_n-1,this);/*电梯移动*/
		}
		//如果电梯在上行，在中间则抢占，不然加入就绪队列
		else if(this.state=="up"&&this.next_floor_state=="up"&&(floor_state=="up"||floor_state=="inner")){
			if(floor_n>=this.now_floor&&floor_n<this.next_floor){
				this.next_floor=floor_n;
				$("#container li:nth-of-type("+dt_n+") #ele #info #con li:nth-of-type(4)").text(this.next_floor);
			}
		}
		else if(this.state=="up"&&this.next_floor_state=="down"&&(floor_state=="down"||floor_state=="inner")){
			if(floor_n>=this.next_floor){
				this.next_floor=floor_n;
				$("#container li:nth-of-type("+dt_n+") #ele #info #con li:nth-of-type(4)").text(this.next_floor);
			}
		}
		//如果电梯在下行，在中间则抢占，不然加入就绪队列
		else if(this.state=="down"&&this.next_floor_state=="down"&&(floor_state=="down"||floor_state=="inner")){
			if(floor_n<=this.now_floor&&floor_n>this.next_floor){
				this.next_floor=floor_n;
				$("#container li:nth-of-type("+dt_n+") #ele #info #con li:nth-of-type(4)").text(this.next_floor);
			}
		}
		else if(this.state=="down"&&this.next_floor_state=="up"&&(floor_state=="up"||floor_state=="inner")){
			if(floor_n<this.next_floor){
				this.next_floor=floor_n;
				$("#container li:nth-of-type("+dt_n+") #ele #info #con li:nth-of-type(4)").text(this.next_floor);
			}
		}
	}
	
	
	//电梯运行函数						参数说明：电梯ID，电梯对象（用于传递）
	ele.move=function(d,ob){ 
		if(ob.help==true){
			setTimeout(ob.move,move_Time,d,ob);
			return;		
		}
		//如果电梯还没到达目标楼层，则继续前进
		if(ob.now_floor!=ob.next_floor){
			$("#container li:nth-of-type("+(d+1)+") #ele #led li:nth-of-type("+ob.now_floor+")").css("background","white");
			ob.now_floor+=ob.state=="up"?1:-1;
			$("#container li:nth-of-type("+(d+1)+") #ele #info #con li:nth-of-type(3)").text(ob.now_floor);
			$("#container li:nth-of-type("+(d+1)+") #ele #led li:nth-of-type("+ob.now_floor+")").css("background","#7FFF00");
			setTimeout(ob.move,move_Time,d,ob);
		}
		//电梯到达目标楼层，按钮灯灭
		else{
			ob.in=true;   //允许按电梯内部按钮
			ob.state=ob.next_floor_state;
			$("#container li:nth-of-type("+ob.id+") #ele #info #con li:nth-of-type(2)").text(ob.state);
			$("#container li:nth-of-type("+ob.id+") #ele #info #con li:nth-of-type(2)").css("color","red");
			$("#container li:nth-of-type("+(d+1)+") #ele #info #con li:nth-of-type(5)").text(wait_Time/1000);	//电梯等待
			$("#container li:nth-of-type("+(d+1)+") #ele #info #con li:nth-of-type(6)").text("open");			//门打开
			$("#container li:nth-of-type("+(d+1)+") #ele #info #con li:nth-of-type(6)").css("color","red");
			$("#container li:nth-of-type("+(d+1)+") #ele #door #con_floor").text("floor:"+ob.now_floor);
			$("#container li:nth-of-type("+(d+1)+") #ele #door #con_wait").text("wait:2s");
			open(ob.id);
			var eq=ob.now_floor-1;
			setTimeout(ob.count_down,1000,d+1,eq,ob.state,ob);
		}
		
	}
	
	
	//关门倒计时						参数说明：电梯ID，所在楼层，电梯到达时的状态，电梯对象
	ele.count_down=function(n,eq,before_state,ob){  
		ob.in=true;
		if(ob.help==true){
			setTimeout(ob.count_down,1000,n,eq,before_state,ob);
			return;		
		}
		var value=$("#container li:nth-of-type("+n+") #ele #info #con li:nth-of-type(5)").text();
		value--;
		$("#container li:nth-of-type("+n+") #ele #info #con li:nth-of-type(5)").text(value);
		$("#container li:nth-of-type("+n+") #ele #door #con_wait").text("wait:"+value+"s");
		if(value!="0"){
			setTimeout(ob.count_down,1000,n,eq,before_state,ob);
		}
		else{
			arrive($("#btn li:nth-of-type("+ob.now_floor+") #"+before_state)); //楼层按钮灭灯
			ob.inner_quene[eq]="false";
			if(before_state=="up"){
				ob.up_quene[eq]="false";
			}  
			if(before_state=="down"){
				ob.down_quene[eq]="false";
			}
			arrive_inner($("#inner_btn ul li:nth-of-type("+ob.now_floor+")"));									//内部按钮灭灯
			$("#container li:nth-of-type("+n+") #ele #info #con li:nth-of-type(6)").text("close");
			$("#container li:nth-of-type("+n+") #ele #info #con li:nth-of-type(6)").css("color","black");
			close(ob.id);
			setTimeout(ob.find_next,0,ob.id-1,ob); //寻找下一个目标楼层
		}
	}
	
	
	//寻找下一个目标楼层				参数说明：电梯ID，电梯对象
	ele.find_next=function(dt_num,ob){   
		if(ob.state=="up"){
			/*路线中的同方向优先*/
			for(i=ob.now_floor;i<20;i++){
				if(ob.inner_quene[i]=="true"||ob.up_quene[i]=="true"){
					ob.next_floor=i+1;
					ob.next_floor_state="up";
					$("#container li:nth-of-type("+(dt_num+1)+") #ele #info #con li:nth-of-type(4)").text(ob.next_floor);
					setTimeout(ob.move,move_Time,dt_num,ob);
					return;
				}
			}
			/*路线中的反方向其次*/
			for(i=19;i>(ob.now_floor-1);i--){
				if(ob.down_quene[i]=="true"){
					ob.next_floor=i+1;
					ob.next_floor_state="down";
					$("#container li:nth-of-type("+(dt_num+1)+") #ele #info #con li:nth-of-type(4)").text(ob.next_floor);
					setTimeout(ob.move,move_Time,dt_num,ob);
					return;
				}
			}
			/*消除该层所有状态*/
			if(ob.inner_quene[ob.now_floor-1]=="true"){
				ob.inner_quene[ob.now_floor-1]="false";
				arrive_inner($("#inner_btn ul li:nth-of-type("+ob.now_floor+")")); //内部按钮灭灯
			}
			if(ob.up_quene[ob.now_floor-1]=="true"){
				ob.up_quene[ob.now_floor-1]="false";
				arrive($("#btn li:nth-of-type("+ob.now_floor+") #up")); //楼层按钮灭灯
			}
			if(ob.down_quene[ob.now_floor-1]=="true"){
				ob.down_quene[ob.now_floor-1]="false";
				arrive($("#btn li:nth-of-type("+ob.now_floor+") #down")); //楼层按钮灭灯
			}
			ob.state="down";
			$("#container li:nth-of-type("+ob.id+") #ele #info #con li:nth-of-type(2)").text(ob.state);//门打开
			$("#container li:nth-of-type("+ob.id+") #ele #info #con li:nth-of-type(2)").css("color","red");
			/*折返后的同方向再其次*/
			for(j=(ob.now_floor-2);j>=0;j--){
				if(ob.down_quene[j]=="true"||ob.inner_quene[j]=="true"){
					ob.next_floor=j+1;
					ob.next_floor_state="down";
					$("#container li:nth-of-type("+(dt_num+1)+") #ele #info #con li:nth-of-type(4)").text(ob.next_floor);
					setTimeout(ob.move,move_Time,dt_num,ob);
					return;
				}
			}
			/*折返后的反方向优先级最低*/
			for(j=0;j<ob.now_floor;j++){
				if(ob.up_quene[j]=="true"){
					ob.next_floor=j+1;
					ob.next_floor_state="up";
					$("#container li:nth-of-type("+(dt_num+1)+") #ele #info #con li:nth-of-type(4)").text(ob.next_floor);
					setTimeout(ob.move,move_Time,dt_num,ob);
					return;
				}
			}
			ob.state="stop";
			ob.next_floor_state="stop";
			$("#container li:nth-of-type("+ob.id+") #ele #info #con li:nth-of-type(2)").text(ob.state);//门打开
			$("#container li:nth-of-type("+ob.id+") #ele #info #con li:nth-of-type(2)").css("color","black");
			return;
		}
		else if(ob.state=="down"){
			for(j=(ob.now_floor-2);j>=0;j--){
				if(ob.down_quene[j]=="true"||ob.inner_quene[j]=="true"){
					ob.next_floor=j+1;
					ob.next_floor_state="down";
					$("#container li:nth-of-type("+(dt_num+1)+") #ele #info #con li:nth-of-type(4)").text(ob.next_floor);
					setTimeout(ob.move,move_Time,dt_num,ob);
					return;
				}
			}
			for(j=0;j<ob.now_floor-1;j++){
				if(ob.up_quene[j]=="true"){
					ob.next_floor=j+1;
					ob.next_floor_state="up";
					$("#container li:nth-of-type("+(dt_num+1)+") #ele #info #con li:nth-of-type(4)").text(ob.next_floor);
					setTimeout(ob.move,move_Time,dt_num,ob);
					return;
				}
			}
			/*消除该层所有状态*/
			if(ob.inner_quene[ob.now_floor-1]=="true"){
				ob.inner_quene[ob.now_floor-1]="false";
				arrive_inner($("#inner_btn ul li:nth-of-type("+ob.now_floor+")")); //内部按钮灭灯
			}
			if(ob.up_quene[ob.now_floor-1]=="true"){
				ob.up_quene[ob.now_floor-1]="false";
				arrive($("#btn li:nth-of-type("+ob.now_floor+") #up")); //楼层按钮灭灯
			}
			if(ob.down_quene[ob.now_floor-1]=="true"){
				ob.down_quene[ob.now_floor-1]="false";
				arrive($("#btn li:nth-of-type("+ob.now_floor+") #down")); //楼层按钮灭灯
			}
			ob.state="up";
			$("#container li:nth-of-type("+ob.id+") #ele #info #con li:nth-of-type(2)").text(ob.state);//门打开
			$("#container li:nth-of-type("+ob.id+") #ele #info #con li:nth-of-type(2)").css("color","red");
			for(i=ob.now_floor-1;i<20;i++){
				if(ob.inner_quene[i]=="true"||ob.up_quene[i]=="true"){
					ob.next_floor=i+1;
					ob.next_floor_state="up";
					$("#container li:nth-of-type("+(dt_num+1)+") #ele #info #con li:nth-of-type(4)").text(ob.next_floor);
					setTimeout(ob.move,move_Time,dt_num,ob);
					return;
				}
			}
			for(i=19;i>ob.now_floor-1;i--){
				if(ob.down_quene[i]=="true"){
					ob.next_floor=i+1;
					ob.next_floor_state="down";
					$("#container li:nth-of-type("+(dt_num+1)+") #ele #info #con li:nth-of-type(4)").text(ob.next_floor);
					setTimeout(ob.move,move_Time,dt_num,ob);
					return;
				}
			}
			ob.state="stop";
			ob.next_floor_state="stop";
			$("#container li:nth-of-type("+ob.id+") #ele #info #con li:nth-of-type(2)").text(ob.state);//门打开
			$("#container li:nth-of-type("+ob.id+") #ele #info #con li:nth-of-type(2)").css("color","black");
			return;
		}
	}
	
	
	//开门按钮的效果					
	ele.click_open=function(){ 
		if(this.now_floor==this.next_floor){
			this.insert(this.id,this.now_floor,"inner");/*做开门动画*/
			$("#container li:nth-of-type("+this.id+") #ele #info #con li:nth-of-type(5)").text("2");
			$("#container li:nth-of-type("+this.id+") #ele #door #con_wait").text("wait:2s");
		}
	}
	
	
	//关门按钮的效果
	ele.click_close=function(){
		if($("#container li:nth-of-type("+this.id+") #ele #info #con li:nth-of-type(6)").text()=="open"){
			$("#container li:nth-of-type("+this.id+") #ele #info #con li:nth-of-type(5)").text("1");
			$("#container li:nth-of-type("+this.id+") #ele #door #con_wait").text("wait:1s");
		}
	}
	
	return ele;
}


/*防止重复点击，记录该按钮是否已经点击*/
var click_padding_up=new Array(false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false);
var click_padding_down=new Array(false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false);
/*楼层按钮点击特效*/
function click_down(id){   
	/*如果该层楼有电梯打开，则不允许按*/
	for(i=0;i<ele_num&&ele[i].help==false;i++){  
		var tmp1=$("#container li:nth-of-type("+(i+1)+") #ele #info #con li:nth-of-type(3)").text();
		var tmp2=id.parent().index()+1;
		if(tmp1==tmp2&&$("#container li:nth-of-type("+(i+1)+") #ele #info #con li:nth-of-type(6)").text()=="open"){
			return false;
		}
	}
	if(id.index()==1){
		if(click_padding_up[id.parent().index()]){//如果该按钮已经点击，则结束，否则标示该按钮已经点击
			return false;
		}
		click_padding_up[id.parent().index()]=true;
	}
	if(id.index()==2){
		if(click_padding_down[id.parent().index()]){
			return false;
		}
		click_padding_down[id.parent().index()]=true;
	}
	id.css("background","rgba(0,0,0,0.2)");
	id.css("color","red");
	id.mouseleave(function(){
		$(this).css("background","rgba(0,0,0,0.2)");
	});
	return true;
}


//消除按钮点击特效
function arrive_inner(id){
	id.css("background","white");
	id.css("color","black");
	id.mouseleave(function(){
		$(this).css("background","white");
	});
}
function arrive(id){	
	if(id.index()==1){
		click_padding_up[id.parent().index()]=false;//允许该楼层的上行键被点击
	}
	if(id.index()==2){
		click_padding_down[id.parent().index()]=false;//允许该楼层的下行键被点击
	}
	id.css("background","white");
	id.css("color","black");
	id.mouseleave(function(){
		$(this).css("background","white");
	});
}


//开关门特效
function open(i){
	$("#container li:nth-of-type("+i+") #ele #door #left_door").animate({left:'-98px'},500);
	$("#container li:nth-of-type("+i+") #ele #door #right_door").animate({right:'-98px'},500);
}
function close(i){
	$("#container li:nth-of-type("+i+") #ele #door #left_door").animate({left:'0px'},500);
	$("#container li:nth-of-type("+i+") #ele #door #right_door").animate({right:'0px'},500);
}