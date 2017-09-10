//初始化绑定键盘点击
window.onload=function(){
	//获得所有被点击的对象span
	var fnNums=document.getElementsByTagName('span');
	//遍历为每个span对象添加点击事件
	for(var s=0;s<fnNums.length;s++){
		if(fnNums[s].id=='num'){//点击的是数字则调用数字点击函数
			if(fnNums[s].addEventListener){//适配chrom,FF,opera事件
				fnNums[s].addEventListener('click',typetoinput,false);
			}else if(fnNums[s].attachEvent){//适配IE事件
				fnNums[s].attachEvent('onclick',typetoinput);
			}else {
				fnNums[s].onclick=typetoinput;//DOM0级事件
			}
		}else{//否则调用操作符点击函数
			if(fnNums[s].addEventListener){//适配chrom,FF,opera事件
				fnNums[s].addEventListener('click',operator,false);
			}else if(fnNums[s].attachEvent){//适配IE事件
				fnNums[s].attachEvent('onclick',operator);
			}else {
				fnNums[s].onclick=operator;//DOM0级事件
			}
		}
	}
}
//存放要计算的数值
var _str=[];
//操作符类型
var _type;

//数字点击事件
function typetoinput(){

	//获得结果显示框
	var inputbox = document.getElementById("input-box");
	
	if(inputbox.name=="type"){//每点击一次操作符清空一下显示框
		inputbox.value=" ";
		inputbox.name=" ";
	}
	if(this.innerHTML !="." && inputbox.value[0]==0 && inputbox.value[1]!="."){
		inputbox.value=this.innerHTML ;
	}else if(this.innerHTML =="." && inputbox.value.indexOf('.')>-1){
		inputbox.value=inputbox.value;
	}else if(inputbox.value=="Infinity" || inputbox.value=="NaN"){
		inputbox.value="";
		inputbox.value+=this.innerHTML ;
	}else{
		inputbox.value+=this.innerHTML ;
	}

}
//操作符事件函数
function operator(){
	//获得结果显示框
	var inputbox = document.getElementById("input-box");
	
	switch(this.id){
		case "backspace"://退格
			inputbox.value=inputbox.value.slice(0,-1);
			if(inputbox.value==""){
				inputbox.value=0;
			}
			break;
		case "clear"://清屏，直接采用重新加载页面
			location.replace(location)
	
			break;
		case "opposite"://取反
			if(checknum(inputbox.value)!=0){
				inputbox.value=-inputbox.value;
			}
			break;
		case "plus"://相加
			if(checknum(inputbox.value)!=0){
				_str.push(inputbox.value);
				_type="plus";
				inputbox.value="+";
				inputbox.name="type";
			}
			
			break;
		case "minus"://相减
			if(checknum(inputbox.value)!=0){
				_str.push(inputbox.value);
				_type="minus";
				inputbox.value="-";
				inputbox.name="type";
			}
		case "multiply"://乘法
				if(checknum(inputbox.value)!=0){
					_str.push(inputbox.value);
					_type="multiply";
					inputbox.value="*";
					inputbox.name="type";inputbox
				}
				break;
		case "divide"://除法
			if(checknum(inputbox.value)!=0){
				_str.push(inputbox.value);
				_type="divide";
				inputbox.value="÷";
				inputbox.name="type";
			}
			break;
		case "percent"://百分数
			if(checknum(inputbox.value)!=0){
				inputbox.value=inputbox.value/100;
			}
			break;
		case "pow"://乘方
			if(checknum(inputbox.value)!=0){
				inputbox.value=Math.pow(inputbox.value,2);
			}
			break;
		case "sqrt"://平方根
			if(checknum(inputbox.value)!=0){
				inputbox.value=Math.sqrt(inputbox.value);
			}
			break;
		case "sin"://正玄值
			if(inputbox.value!=0){
				inputbox.value=parseFloat(Math.sin(inputbox.value).toFixed(8));
				inputbox.name="type";
			}
			break;	
		case "cos"://余弦值
			if(inputbox.value!=0){
				inputbox.value=parseFloat(Math.cos(inputbox.value).toFixed(8));
				inputbox.name="type";
			}
			break;	
		case "result"://=号结果计算
			if(checknum(inputbox.value)!=0){
				_str.push(inputbox.value);
				var res=calcResult(_str);
				if(_type=="plus"){
					inputbox.value=parseFloat(res[0])+parseFloat(res[1]);
					inputbox.name="type";
				}else if(_type=="minus"){
					inputbox.value=parseFloat(res[0])-parseFloat(res[1]);
					inputbox.name="type";
				}else if(_type=="multiply"){
					inputbox.value=parseFloat((parseFloat(res[0])*parseFloat(res[1])).toFixed(8));
					inputbox.name="type";
				}else if(_type=="divide"){
					if(res[1]==0){
						inputbox.value="除数不能为0";
					}else{
						inputbox.value=parseFloat(res[0])/parseFloat(res[1]);
					}
					
					inputbox.name="type";
				}
			}
			break;
	}

}
//返回要计算的两个数值(数组形式返回)
function calcResult(objVal){
	var returnVal=new Array();
	if(objVal.length%2==0){
		returnVal.push(objVal[objVal.length-2]);
		returnVal.push(objVal[objVal.length-1]);
	}else{
		returnVal.push(objVal[objVal.length-1]);
		returnVal.push(objVal[objVal.length-2]);
	}
	
	return returnVal;
}
function checknum(inputval){
	if(inputval=="+" || inputval=="-" || inputval=="×" || inputval=="÷" || inputval=="sqrt" || inputval=="sin" || inputval=="cos"){
		return 0;
	}
}