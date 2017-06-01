<template>
	<div class="record" @keydown.enter='toGetData(actived)'>
		<div id="headbutn">
			<button :class="{active:actived==10}" class="button button--aylen" @click='toactive(10)'>日统计</button>
			<span class="broder"></span>
			<button :class="{active:actived==20}" class="button button--aylen" @click='toactive(20)'>月统计</button>
		</div>
		<div class="wrap">
			<div class="title">
				<h3>{{actived==10?'日':'月'}}可疑探测包记录</h3>
				<div class="search">
					<div class="input_wrap mac_input">
						<input maxlength="2" @focus = "notEmpty($event)" @keyup="nextInput($event)" @blur = "testFormat($event,'mac_piece')" class="mac_input mac_a" type="text"> : 
						<input maxlength="2" @focus = "notEmpty($event)" @keyup="nextInput($event)" @blur = "testFormat($event,'mac_piece')" class="mac_input mac_b" type="text"> : 
						<input maxlength="2" @focus = "notEmpty($event)" @keyup="nextInput($event)" @blur = "testFormat($event,'mac_piece')" class="mac_input mac_c" type="text"> :
						<input maxlength="2" @focus = "notEmpty($event)" @keyup="nextInput($event)" @blur = "testFormat($event,'mac_piece')" class="mac_input mac_d" type="text"> :
						<input maxlength="2" @focus = "notEmpty($event)" @keyup="nextInput($event)" @blur = "testFormat($event,'mac_piece')" class="mac_input mac_e" type="text"> :
						<input maxlength="3" @focus = "notEmpty($event)" @keyup="nextInput($event)" @blur = "testFormat($event,'mac_piece')" class="mac_input mac_f" type="text">
					</div>		
					<span @click='toGetData(actived)' class="butn button button--aylen" >搜索</span>

				</div>
			</div>
			<recordpic v-if='actived==10' :recordData="recordData" :show ='show'></recordpic>
			<recordpicmon v-else :recordDataMon="recordDataMon" :show ='show'></recordpicmon>
		</div>
	</div>
</template>
<script>
	import recordpic from './recordpic'
	import recordpicmon from './recordpicmon'	
	import formatTest from 'libs/formatTest'	

	import logManageService from 'services/logManageService'
	export default {
		components: {
			recordpic,
			recordpicmon
		},
		data() {
			return {
				actived: 10,
				recordData: [],
				recordDataMon: [],
				show:false
			}
		},
		created() {
			this.getData(10)
		},
		methods: {
			toactive: function(n) {
				this.actived = n
				this.getData(n)
			},
			getData: function(type, macIP) {				
				// logManageService.getStatistic(type, macIP)
				// 	.then((recvdata) => {
				// 		recvdata = JSON.parse(recvdata);
				// 		if(recvdata.success == true) {
							this.show=true
							switch(type) {
								case 10:
									this.recordData =[]
								case 20:
									this.recordDataMon = [];
								default:
									break;
							}

					// 	}
					// })
			},
			toGetData(type) {							
				var macIP = this.macVal(".mac_input")
				this.getData(type, macIP)				
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
				if($(event.currentTarget).val().length>1){
				event.preventDefault()
				$(event.currentTarget).next().focus()    
				}   
			},
			notEmpty: function(event) {
				let ele = event.currentTarget
				var test = new formatTest(ele)
				test.notEmpty()
			},
			macVal(ele){
               let macVal = ($(ele+' .mac_a').val()?$(ele+' .mac_a').val():"")+
				            ($(ele+' .mac_b').val()?':'+$(ele+' .mac_b').val():"")+
							($(ele+' .mac_c').val()?':'+$(ele+' .mac_c').val():"")+
							($(ele+' .mac_d').val()?':'+$(ele+' .mac_d').val():"")+
							($(ele+' .mac_e').val()?':'+$(ele+' .mac_e').val():"")+
							($(ele+' .mac_f').val()?':'+$(ele+' .mac_f').val():"")
			   return macVal
			},
			isEmpty: function(ele) {
				var test = new formatTest(ele)
				test.notEmpty()
			}
		}
	}
</script>
<style scoped>
	#headbutn {
		font-size: 14px;
		margin: 10px 0;
	}
	
	.button {
		padding: 0 10px;
		height: 22px;
		border-radius: 5px;
		background: #e5e5e5;
		font-size: 12px;
	}
	
	.broder {
		border-left: 1px solid #c4c4c4;
		margin: 0 12px 0 8px;
	}
	
	.active {
		background: #ffae00;
		color: #FFFFFF;
	}
	
	.title {
		background: #69b6ff;
		padding-left: 15px;
	}
	
	h3 {
		height: 30px;
		line-height: 30px;
		color: #FFFFFF;
		display: inline-block;
	}
	
	.search {
		float: right;
		margin-top: 6px;
	}
	
	.search .butn {
		color: #FFFFFF;
		width: 50px;
		text-align: center;
		cursor: pointer;
		background: #ffae00;
		border-radius: 5px;
		display: inline-block;
		height: 20px;
		line-height: 20px;
		margin: 0 20px 0 10px;
	}
	input{
		width: 20px;
		height: 100%;
		text-align: center;
	}
	.input_wrap{
        display: inline-block;	
		width: 180px;
		height: 20px;
		border-radius: 3px;
		background: #5498d8;
		color: #FFFFFF;
	}
	input:focus{
		outline: none;
	}
</style>