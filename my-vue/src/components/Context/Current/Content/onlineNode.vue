<template>
	<div class="wrap">
		<div  @keydown.enter='toSearch()'>
			<div class="title">
				<h3>筛选条件</h3>
			</div>
			<ul class="filter">
				<li>
					<label>真实IP：</label>
					<ipinput class="realIp" :empty = "true"></ipinput>
				</li>
				<li>
					<label>外网IP：</label>
					<ipinput class="outIp" :empty = "true"></ipinput>
				</li>
				<li>
					<timeRang></timeRang>
					<div id="dtBox"></div>
				</li>
				<li>
					<label>虚拟IP：</label>
					<ipinput class="virIp" :empty = "true"></ipinput>
				</li>
				<li>
					<label>MAC地址：</label>
					<macinput class="macIp" :empty = "true"></macinput>
				</li>
				<li>
					<label>虚拟域名：</label>
					<input class="virName" type="text" @blur="testFormat('.virName','virName',true)" @focus="isEmpty('.virName')" placeholder="c19b.veda" >
				</li>
				<li>
					<button class="sreach button button--aylen" v-on:click='toSearch()'>开始查找</button>
				</li>
			</ul>
		</div>
		<div class="bg">
			<div class="spanbtn">
				<button :class="[valid?'active':'unactive']" class="button button--aylen"  @click="toactive('pass')">合格节点</button>
				<span class="line"></span>
				<button  :class="[!valid?'active':'unactive']" class="button button--aylen" @click="toactive('unpass')">未通过审核节点</button>
			</div>
			<tablecontent :show='show' v-on:getData = 'getData' :tableData = 'tableData' :nowpage ="nowpage"></tablecontent>
			<severPages v-on:getPageData="getPageData" :totalpage='totalpage' :nowpage ="nowpage"></severPages>			
		</div>
	</div>
</template>
<script>
	import ipinput from 'components/libs/ipinput'
	import macinput from 'components/libs/macinput'
	import timeRang from 'components/libs/timeRang'	
	import tablecontent from './onlineNode/tablecontent'
	import severPages from 'components/libs/severPages'

	import PageData from 'libs/PageData'	
	import formatTest from 'libs/formatTest'	
	import realTimeService from 'services/realTimeService'	
	export default {
		components: {
			tablecontent,
			severPages,
			timeRang,
			ipinput,
			macinput
		},
		data(){
			return{
				allTableData:[],
				tableData:[],
				totalpage:0,
				nowpage:1,
				valid:true,
				sentdata:{},
				show:false,
				intervalid:null,
				clearTimeout:false
			}
		},
		created() {			
			this.setdata()
			this.getData()
		},
		methods: {
			toactive: function(isPass) {
				this.sentdata = {}
				this.nowpage=1
				if(isPass=='pass'){
				  this.valid = true	
				  this.sentdata.node_valid = true
				}else{
				  this.valid = false
				  this.sentdata.node_valid = false
				}
				this.getData()				
			},
			testFormat(ele,reg, empty) {
				var test = new formatTest(ele,reg, empty)
				return test.testFormat();
			},
			isEmpty: function(ele) {
                var test = new formatTest(ele)
			    test.isEmpty()
			},
			toSearch: function() {
				this.setdata()
				this.getData()		
			},
			ipVal(ele){
                let ipVal =  ($(ele+' .ip_a').val()?$(ele+' .ip_a').val():"")+
				             ($(ele+' .ip_b').val()?'.'+$(ele+' .ip_b').val():"")+
							 ($(ele+' .ip_c').val()?'.'+$(ele+' .ip_c').val():"")+
							 ($(ele+' .ip_d').val()?'.'+$(ele+' .ip_d').val():"")
			    return ipVal
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
			setdata(){
				this.sentdata ={
					node_valid:this.valid
				}
				var ripVal = this.ipVal('.realIp')
				var vipVal = this.ipVal('.virIp') 
				var wipVal = this.ipVal('.outIp') 
				var macVal = this.macVal('.macIp')
				var vnameVal = $('.virName').val()
				var starttime = $('.starttime').val()
				var endtime = $('.endtime').val()
				if(ripVal){
					this.sentdata.rip = ripVal
				}
				if(vipVal){
					this.sentdata.vip = vipVal.trim()
				}
				if(wipVal){
					this.sentdata.wip = wipVal.trim()
				}
				if(macVal){
					this.sentdata.mac = macVal.trim()
				}
				if(vnameVal){
					this.sentdata.vname = vnameVal.trim()
				}
				if(starttime){
					this.sentdata.starttime = starttime
				}
				if(endtime){
					this.sentdata.endtime = endtime
				}
				this.nowpage = 1
				this.show = false
			},
			getData() {				
                var sentData = this.sentdata
				// realTimeService.getOnlineNode(sentData)
				// .then((recvdata) => {
				// 	recvdata = JSON.parse(recvdata)
				// 	if(recvdata.success) {
					let recvdata = {data:[]}
						this.show=true
						this.allTableData = recvdata.data
						this.getPageData(this.nowpage) //分页
						this.totalpage = new PageData(recvdata.data, 22).totalpage
					// }
					if(this.clearTimeout){
			        	return 
			        }
					clearTimeout(this.intervalid)
					this.intervalid = setTimeout(() => this.getData(), 1000)
				// },()=>{
				// 	if(this.clearTimeout){
			    //        return 
			    //     }
				// 	clearTimeout(this.intervalid)
				//     this.intervalid = setTimeout(() => this.getData(), 1000)
			    // })
			},			
			getPageData(currentpage) {
				this.nowpage = currentpage
				var allData = this.allTableData
				this.tableData = new PageData(allData, 22).data(this.nowpage)
			}
		},
		beforeDestroy() {
			this.clearTimeout = true
		    clearTimeout(this.intervalid)
		}
		
	}
</script>
<style scoped>
	.wrap {
		margin: 30px 0 0 30px;
		padding-bottom: 10px;
	}
	
	
	.bg {
		background: #ffffff;
		height: 675px;
	}
	
	.spanbtn {
		height: 50px;
		margin: 15px 0 0 20px;
		line-height: 50px;
	}
	.active {
		background: #69b6ff;
		color: #ffffff;
	}
	.unactive{
		background: #e8e8e8;
	}
	.line {
		height: 20px;
		border-left: 1px solid #E2E2E2;
		margin: 0 10px 0 5px;
	}
   .button{
   	    width: 100px;
		height: 20px;
		display: inline-block;
		border-radius: 5px;
		
   }
   /*筛选条件*/
   	.filter {
		padding-top: 15px;
		background: #ffffff;
		margin-bottom: 20px;
	}
	
	.title {
		background: #333333;
		color: #ffffff;
		height: 30px;
		padding-left: 20px;
	}
	
	h3 {
		line-height: 30px;
		display: inline-block;
	}
	
	li {
		display: inline-block;
	}
	
	label {
		width: 90px;
		text-align: right;
		margin-bottom: 20px;
	}
	
	.filter>div label:first-child {
		margin-left: 0;
	}
	
	input {
		width: 180px;
		border: 1px solid #e8e8e8;
		height: 25px;
		border-radius: 3px;
		padding: 0 10px;
	}
	
	.active {
		background: #69b6ff;
	}
	
	.sreach {
		background: #ffae00;
		color: #ffffff;
		width: 80px;
		height: 25px;
		border-radius: 5px;
		margin-left: 143px;
	}
	.sim-button{
		margin-top: 0;
	}
</style>