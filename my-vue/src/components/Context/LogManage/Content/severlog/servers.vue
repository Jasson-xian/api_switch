<template>		
	<ul >
		<li class="serve" v-for='(item,index) in recvData' @keydown.enter="modify(index,item)">	
			<div class="server-wrap">
				<loadSpan v-show= "result=='reqing'&&Index==index"></loadSpan>	
				<div class="title">
					<div class="operID" style="display: none;">{{item.id}}</div>
					<h4>日志服务器{{index+1}}</h4>			
					<ul class="titile-butn">
					    <li v-on:click.stop="modify(index,item)">
					    	<img  src="../../../../img/sure.png">															
							<span>确定</span>
						</li>
						<li v-on:click.stop="dele(index)">
							<img src="../../../../img/delete.png"/>
							<span >删除</span>
						</li>
					</ul>
				</div>
				<transition name="fade"  mode="out-in">
				<div class="content" v-show= "result!='reqing'||Index!=index">
					<ul class="sever-btn" >
					<!--启用禁用 -->
						<li>
							<label class="labels">服务器开关:</label>						    
						    <div class="on_off_but">							
								<button @click.stop = "swichStatus(index,item,1)" :class="[item.switch>0?'active':'']" class="on_but">启用</button>
								<button @click.stop = "swichStatus(index,item,0)" :class="[item.switch>0?'':'active']" class="off_but">禁用</button>
							</div>
						</li>						
						<!--input-->
						<li>
							<label class="labels">服务器地址：</label>
							<div class="input_wrap severIPNum">
								<input  maxlength="3" v-model = "item.abcd.split('.')[0]"  @focus = "isEmpty($event)" @keyup="upnext($event)" 
								@keydown="nextInput($event)" @blur = "testFormat($event,'ip_piece',index)" class="ip_input ip_a" type="text"> . 
								<input  maxlength="3" v-model = "item.abcd.split('.')[1]" @focus = "isEmpty($event)" @keyup="upnext($event)" 
								@keydown="nextInput($event)" @blur = "testFormat($event,'ip_piece',index)" class="ip_input ip_b" type="text"> . 
								<input  maxlength="3" v-model = "item.abcd.split('.')[2]" @focus = "isEmpty($event)" @keyup="upnext($event)"
								 @keydown="nextInput($event)" @blur = "testFormat($event,'ip_piece',index)" class="ip_input ip_c" type="text"> .
								<input  maxlength="3" v-model = "item.abcd.split('.')[3]" @focus = "isEmpty($event)" @keyup="upnext($event)"
								 @keydown="nextInput($event)" @blur = "testFormat($event,'ip_piece',index)" class="ip_input ip_d" type="text">
							</div>	
							<span v-show="item.abcd=='127.0.0.1'">&nbsp;(本机)</span>
							<span class="mi">* 必填</span>				
						</li>								
				        <li>
				        	<label class="labels">服务器端口：</label>
							<input type="text" class="severPortNum" @blur="testVal('.severPortNum','prot',false,index)"  @focus="isEmpty($event)" v-model = 'item.port'/>
							<span class="mi">* 必填</span>		
				        </li>											
					</ul>
					<div class="logtype">
						<ul class="logLabel">
							<li>
								<label class="labels">日志类型：</label>									
								<span class="line"></span>									
								<input style="margin-left: 10px;" type="checkbox" class="allsele" @click='checkedall(index)' />
								<label  style=" font-weight: 500; margin-left: 3px;">全选</label>
								<span class="mi">（* 不能少于一种）</span>	
							</li>													
						</ul>
						<ul class="logs">
							<li>
								<input type="checkbox" :checked="item.types.indexOf(1)>=0?true:false" value="1" class="check"  @change="isSelect(index)"/>
								<label >渗透日志</label>
							</li>
							<li>
								<input type="checkbox" :checked="item.types.indexOf(4)>=0?true:false" value="4" class="check"  @change="isSelect(index)"/>
								<label >主机下线日志</label>
							</li>
							<li>
								<input type="checkbox" :checked="item.types.indexOf(5)>=0?true:false" value="5" class="check"   @change="isSelect(index)"/>
								<label>封堵日志</label>
							</li>
							<li>
								<input type="checkbox" :checked="item.types.indexOf(6)>=0?true:false" value="6" class="check"  @change="isSelect(index)"/>								
								<label >解封日志</label>
							</li>							
							<br/>							
							<li>
								<input type="checkbox" :checked="item.types.indexOf(8)>=0?true:false" value="8" class="check"  @change="isSelect(index)"/>
								<label >命令日志</label>
							</li>
							<li>
								<input type="checkbox" :checked="item.types.indexOf(7)>=0?true:false" value="7" class="check"  @change="isSelect(index)"/>								
								<label >主机变换日志</label>
							</li>								
							<li>
								<input type="checkbox" :checked="item.types.indexOf(9)>=0?true:false" value="9" class="check"  @change="isSelect(index)"/>					
								<label >事件日志</label>
							</li>
						</ul>						
					</div>
				</div>						
			    </transition>
			</div>
	    </li>
	</ul>
</template>
<script type="text/javascript">
    import ipinput from 'components/libs/ipinput'
	import formatTest from 'libs/formatTest'
    import loadSpan from 'components/libs/loadSpan'		
	export default {
		components:{
		    loadSpan,
			ipinput
	    },
		props: {
			recvData: {
				type: Array,
				required: true
			},
			result:{
				type: String,
				required: true
			}
		},
		data(){
			return{
				switch:'',
				Index:''
			}
		},
		mounted() {
			for(let i=0;i<this.recvData.length;i++){
				this.isSelect(i)
			}			
		},
		watch:{	
			recvData:function(){
				for(let i=0;i<this.recvData.length;i++){
					var _this = this
				  setTimeout(function(){
				  	_this.isSelect(i)
				  },50) 
			    }	
			}					
		},
		methods: {
			dele(index) {
				this.Index= index
                this.$emit('deleSet',index)
                $('#deleModal').modal('show')       
			},
			modify(index,Item) {	
				var ipTest = this.testIp('.severIPNum',index) 				
				var protTest = this.testVal('.severPortNum', 'prot',false,index)					
				var typeSelect = this.isSelect(index)
			    let ipval = this.ipVal(".severIPNum",index)
				console.log(ipval)
				let portval = $('.severPortNum').eq(index).val().trim()
				if(ipTest & protTest & typeSelect) {
					this.Index= index
					var sentdata = {
						oper:'edit',
						id : Item.id,
						switch :Item.switch,
					    severIP :ipval,
					    severProt: portval,
					    types :this.getTypes(index)
					}
					this.$emit('getData',sentdata)
					$('.input_wrap input').css('border', 'none')
				}
			},
			ipVal(ele,index){
				let ipVal =  ($(ele).eq(index).find('.ip_a').val()?$(ele).eq(index).find('.ip_a').val():"")+
				             ($(ele).eq(index).find('.ip_b').val()?'.'+$(ele).eq(index).find('.ip_b').val():"")+
							 ($(ele).eq(index).find('.ip_c').val()?'.'+$(ele).eq(index).find('.ip_c').val():"")+
							 ($(ele).eq(index).find('.ip_d').val()?'.'+$(ele).eq(index).find('.ip_d').val():"")
			    return ipVal
			},
			testIp(ele,index){
                   let ip_a_test = this.testIp_peice(ele,'.ip_a',index)
				   let ip_b_test = this.testIp_peice(ele,'.ip_b',index)
				   let ip_c_test = this.testIp_peice(ele,'.ip_c',index)
				   let ip_d_test = this.testIp_peice(ele,'.ip_d',index)
				   if(ip_a_test&&ip_b_test&&ip_c_test&&ip_d_test){
						return true
				   }else{
						return false
				   }
			},
			testIp_peice(ele,piece,index){
				let IPReg_piece = /^(2[0-4]\d|25[0-5]|[01]?\d\d?)$/
				var ele = $(ele).eq(index).find(piece)
				let val = ele.val()
				if(IPReg_piece.test(val)){
					ele.parent().find('.mi').css('color', '#d2d2d2')
					ele.css('border', '1px solid #e8e8e8')
                    return true
				}else{
                    ele.css('border', '1px solid #b63039')
					ele.addClass('animated shake')
					
					setTimeout(function() {
						ele.removeClass('animated shake')
					}, 200)
				}
			},
			getTypes(index) {
				var addArr = []
				$('.logs').eq(index).find('.check').each(function(index, e) {
					if($(e).prop("checked")) {
						addArr.push($(e).val())
					}
				})
				var addtype = addArr.join(",")
				return addtype
			},
			swichStatus(Index,Item,on_off){	
				this.Index = Index
				if(Item.switch!=on_off){
					var sentdata={
						oper:'edit',
						id:Item.id,
						switch:on_off,
						severIP:Item.abcd,
						severProt:Item.port,
						types:Item.types
					}					
					this.$emit('getData',sentdata)
				}
			},
			 testFormat(event,reg, empty) {
				let ele = event.currentTarget
				var test = new formatTest(ele,reg, empty)
				let result =  test.testFormat();
				if(result){
					$(ele).css("border",'none')
				}
				return result
			},
			nextInput(event){          
				if(event.keyCode==110||event.keyCode==190){
				event.preventDefault()
				$(event.currentTarget).next().focus()    
				}   
			},
			upnext(event){
				if($(event.currentTarget).val().length>=3){
				$(event.currentTarget).next().focus()    
				}   
			},
			testVal: function(ele, reg, empty,index) {
				var ele = $(ele).eq(index)
				var test = new formatTest(ele, reg ,empty)
				return test.testFormat()
			},
			isEmpty: function(ele) {
				var ele = event.srcElement
				var test = new formatTest(ele)
				test.notEmpty()		
				$('.notice').hide()
			},
			checkedall(modIndex){
				if($('.allsele').eq(modIndex).prop('checked')){					
					$(".logs").eq(modIndex).find('.check').prop('checked',true);
				}else{
					$(".logs").eq(modIndex).find('.check').prop('checked',false);
				}
				this.isSelect(modIndex)
			},
			isSelect(modIndex) {
				var addArr = []
				$('.logs').eq(modIndex).find('.check').each(function(index, e) {
					let check = $(e).prop("checked")
					if(check) {
						addArr.push($(e).val())
					}
				})
				if(addArr.length<=0) {
		            $('.logLabel').eq(modIndex).find(' .mi').css('color', '#b63039')
		            $('.allsele').eq(modIndex).prop('checked',false)
		            return false
				}else if(addArr.length >=7){				
					$('.logLabel').eq(modIndex).find('.mi').css('color', '#d2d2d2')
					$('.allsele').eq(modIndex).prop('checked',true)
					return true
				} else {
		             $('.logLabel').eq(modIndex).find('.mi').css('color', '#d2d2d2')		
		             $('.allsele').eq(modIndex).prop('checked',false)
		             return true
				}
			}
	    }
	}
</script>
<style scoped>
	.server-wrap{
		border: 1px solid #E0E0E0;
		height:270px;
		position: relative;
	}
    .serve{
    	margin-top: 25px;
    }	
		/*头部*/
	.title {
		background: #69B6FF;
		height: 25px;
		position: relative;
	}
	
	h4 {
		color: #FFFFFF;
		line-height: 25px;
		margin-left: 10px;
	}
	
	.titile-butn {
		position: absolute;
		top: 3px;
		right: 10px;
	}
	
	.titile-butn li {
		display: inline-block;
		margin-right: 15px;
		cursor: pointer;	
		padding: 0px 5px 2px;
		border-radius: 5px;	
	}
	.titile-butn li span{
		color: #FFFFFF;
	}
	.titile-butn li:hover{
		background: #4ba1f2;
		
	}
	.span_active {
		color: #1e5ac9;
	}
	.span_unactive {
		color: #FFFFFF;
	}

	/*内部*/
	
	.sever-btn {
		height: 70px;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #E0E0E0;
	}
	.sever-btn li:first-child{
		margin-right:30px;
	}
	.sever-btn li{
		display: inline-block;
	}
	.spanInput {
		width:120px;
		display: inline-block;
		color: #69b6ff;
		font-weight:600;
	}
	.labels{
		width: 85px;
		text-align: right;
	}
	input[type=text] {
		width: 180px;
		height: 25px;
		border-radius: 3px;
		padding: 0 10px;
		border: 1px solid #E0E0E0;
	}
	.input_wrap  input{
		width: 36px;
		height: 100%;
		text-align: center;
		padding: 0;
	    color: #555;
        border: none; 
	}
	.input_wrap{
        display: inline-block;	
		width: 180px;
		height: 25px;
		border: 1px solid  #e8e8e8;
		border-radius: 5px;
		box-sizing: border-box;
        color: #999;
	}
	.mi {
		color: #d2d2d2;
		margin-left: 10px;
	}	
	.line {
		border-left: 1px solid #E0E0E0;
		height: 15px;
		vertical-align: middle;
	}
		/*启用禁用*/
	.active {
		background: #00A0E9;
		color: #FFFFFF;
	}
	.on_off_but{
		display: inline-block;
		position: relative;
        margin:0 25px 0 5px;
        border: 1px solid #E6E6E6;
        border-radius: 5px;
        box-shadow: 0 0 5px 0  #E6E6E6;
        line-height: 18px;
	}
	button{
		background: #FFFFFF;
	}
	.off_but{
		padding: 1px 5px 2px;
		font-size: 12px;
		border-radius: 0 5px 5px 0;
		margin-left: -5px;
	}
	.on_but{
		padding: 1px 5px 2px;
		font-size: 12px;
		border-radius: 5px 0 0 5px;
	}
	.on_off_notice{
		color: #d2d2d2;
		position: absolute;
		top: 0;
		left:70px;
		width: 140px;
		display: inline-block;
	}
		/*日志类型*/
	.logtype {
		margin-top: 40px;
	}
	.logLabel span{
		display: inline-block;
	}
	.logs {
		display: flex;
		vertical-align: top;
		margin-left: 100px;
		margin-top: 15px;
		width: 600px;
		flex-wrap: wrap
	}
	.logs label {
		margin-left: 3px;
		display: inline-block;
		font-weight: 500;	
	}
	.logs li {
		display: inline-block;
		border: 1px solid #E2E2E2;
		border-radius: 5px;
		padding: 4px 10px 0px;
		margin: 0 40px 20px 0;
	}

	img ,span{
	     vertical-align: middle;
	}

</style>