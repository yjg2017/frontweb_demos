/*****************************************************************************************
		计算方式采用每次点击的数值累加存入_string中，每次计算拿出数组中最后两位来根据相应操作符计算
		******************************************************************************************/

		//记录点击的类型名称
		var _type;
		//存放点击的数值或操作符
		var _string=new Array();
		/******************界面输入函数********************
		*@param obj 界面点击的值
		**************************************************/
		function typeofinput(obj){
			input = document.getElementById("textResult");//获取text对象
			if(input.name=="type"){
				input.value=" ";
				input.name=" ";
			}
			if(obj!="." && input.value[0]==0 && input.value[1]!="."){
				input.value=obj;
			}else if(obj=="." && input.value.indexOf('.')>-1){
				input.value=input.value;
			}else if(input.value=="Infinity" || input.value=="NaN"){
				input.value="";
				input.value+=obj;
			}else{
				input.value+=obj;
			}
		}
		
		/**************操作符及计算结果函数****************
		@param type 加、减、乘、除等计算结果功能
		**************************************************/
		function operator(type) {
			switch(type){
				case "plus"://加法
					if(checknum(input.value)!=0){
						_string.push(input.value);
						_type="plus";
						input.value="+";
						input.name="type";
					}
					break;
				case "minus"://减法
					if(checknum(input.value)!=0){
						_string.push(input.value);
						_type="minus";
						input.value="-";
						input.name="type";
					}
					break;
				case "multiply"://乘法
					if(checknum(input.value)!=0){
						_string.push(input.value);
						_type="multiply";
						input.value="*";
						input.name="type";
					}
					break;
				case "divide"://除法
					if(checknum(input.value)!=0){
						_string.push(input.value);
						_type="divide";
						input.value="÷";
						input.name="type";
					}
					break;
				case "clear"://清除
					_string.length=0;
					input.value=0;
					break;
				case "opposite"://取反
					input.value=-input.value;
					break;
				case "backspace"://退格
					input.value=document.getElementById("textResult").value.slice(0,-1);
					if(input.value==""){
						input.value=0;
					}
					break;
				case "result"://计算结果

					if(checknum(input.value)!=0){
						_string.push(input.value);
						//以下计算方式是取getResult函数中返回的数组值计算并返回界面显示结果值
						if(_type=="plus"){
							input.value=parseFloat(((parseFloat(getResult(_string)[0]))+parseFloat(getResult(_string)[1])).toFixed(8));
							input.name="type";
						}else if(_type=="minus"){
							input.value=parseFloat(((parseFloat(getResult(_string)[0]))-parseFloat(getResult(_string)[1])).toFixed(8));
							input.name="type";
						}else if(_type=="divide"){
							if(getResult(_string)[1]==0){
								input.value="除数不能为0";
								input.name="type";
							}else{
								input.value=parseFloat(((parseFloat(getResult(_string)[0]))/parseFloat(getResult(_string)[1])).toFixed(8));;
							}
						}else if(_type=="multiply"){
							input.value=parseFloat(((parseFloat(getResult(_string)[0]))*parseFloat(getResult(_string)[1])).toFixed(8));
							input.name="type";
						}
					}
					break;
			}
		}
		/**************获取要计算的值*********************
		@param value 数组 取最后两位要计算的值存入返回值中
		@return 要计算的数值(数组)
		**************************************************/
		function getResult(value){
			var result = new Array();
			if(value.length%2==0){
				result.push(value[value.length-2]);//存入数组倒数第二个数据
				result.push(value[value.length-1]);//存入数组最后一个数据
				return result;
			}else{
				result.push(value[value.length-1]);
				result.push(value[value.length-2]);
				return result;
			}
		}
		/**************检查输入的是值还是操作符***********
		@param inputValue 界面点击的值
		@return 如果是操作符直接返回0，默认返回原有的数值
		**************************************************/
		function checknum(inputValue){
			if(inputValue=="+" || inputValue=="-" || inputValue=="*" || inputValue=="÷"){
				return 0;
			}
		}