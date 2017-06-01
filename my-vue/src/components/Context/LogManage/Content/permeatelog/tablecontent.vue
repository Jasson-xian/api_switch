<template>
	<div class="bg">	
		<!--加载数据-->
		<loadSpan v-show= '!show'></loadSpan>		
		<table>
			<thead>
				<tr>
					<th style="width: 60px;">序号</th>
					<th style="width: 200px;">物理线路</th>
					<th style="width: 200px;">攻击源</th>
					<th style="width: 200px;">备注名</th>
					<th style="width: 130px;">攻击类型</th>
					<th style="width: 200px;">次数</th>					
					<th style="width: 200px;">时间</th>
					<th style="width: 200px;">封堵状态</th>
					<th style="width: 70px;">历史渗透</th>
					<th style="width: 80px;">操&nbsp&nbsp作</th>
				</tr>
			</thead>			
			<transition name="fade"  mode="out-in">
		    <tbody v-show = "show" class="tbody">		
				<tr v-for='(item ,index) in datas' @dblclick.stop="changeStatus(item.mac,!item.block)">
					<template v-if="index <tableData.length">
						<td> {{(index+1)+25*(nowpage-1)}}</td>
						<td>
							<span v-if='item.phy_port==0'>外部主机</span>
							<span v-else>线路{{item.phy_port}}</span>
						</td>
						<td class="macIP"> {{item.mac ? item.mac : '-'}}</td>
						<td class="note">{{item.desc ? item.desc : '-'}}</td>
						<td><p>{{item.type}}</p></td>
						<td> {{item.count ? item.count : '-'}}</td>					
						<td> {{item.end_time ? item.end_time : '-'}}</td>
						<td> {{item.block ? '已封堵' : '未封堵'}}</td>
						<td class="detail" @mouseenter="showIt(index,item.mac)" @mouseleave="hide(index)">
							<span style="width: 50px;display: inline-block;">....</span>
							<div class="detail_warp">
								<div :class="index>20?'last_detail':'detal_tabel'">
									<div class='owner'>
										<span>攻击源：{{item.mac ? item.mac : '-'}}</span>
										<span>备注：{{item.desc ? item.desc : '-'}}</span>
									</div>
									<ul>
										<li style="width: 30px;">序号</li>
										<li style="width: 140px;">攻击类型</li>
										<li style="width: 64px;">物理线路</li>
										<li style="width: 68px;">次数</li>
										<li style="width: 131px;">渗透目标</li>
										<li style="width: 131px;">协议/端口</li>
										<li style="width: 128px;">时间</li>
									</ul>
									<div class="detailDiv">
										<div>
											<loadSpan v-show='!detailshow'></loadSpan>
										</div>				
										<table v-show='detailshow'>
											<tbody style="width: 557px;">
												<tr v-for='(data,i) in detailDatas'>
													<template v-if='i<detailDate.length'>
														<td style="width:41px;">{{i+1}}</td>
														<td style="width: 128px;"><p>{{data.type}}</p></td>
														<td style="width: 70px;"> 
															<span v-if='data.phy_port==0'>外部主机</span>
															<span v-else>线路{{data.phy_port}}</span>
															<!--{{data.phy_port?'线路'+data.phy_port:'-'}}-->
															</td>
														<td style="width: 70px;" data-toggle="tooltip" data-placement="bottom" :title='data.count'>{{data.count?data.count:'-'}}</td>
														<td style="width: 128px;">{{data.response_ip}}</td>
														<td style="width: 128px;"><p>{{data.response_port}}</p></td>
														<td style="width: 128px;">{{data.end_time}}</td>
													</template>
													<template v-else>
													<td style="width:41px;"></td>
													<td style="width: 128px;"></td>
													<td style="width: 70px;"></td>
													<td style="width: 70px;"></td>
													<td style="width: 128px;"></td>
													<td style="width: 128px;"></td>
													<td style="width: 128px;"></td>
													</template>
												</tr>
											</tbody>
										</table>
									</div>
								</div>	
								<img  src="../../../../img/toright.png" />
							</div>
						</td>
						<td>
							<button v-bind:class="[item.block ? 'unblock' : 'block']" class="button button--aylen"   @click="changeStatus(item.mac,!item.block)">
								{{item.block ? '解&nbsp&nbsp封' : '封&nbsp&nbsp堵'}}
							</button>
						</td>
					</template>
					<template v-else>
						<td>&nbsp</td>
						<td>&nbsp</td>
						<td>&nbsp</td>
						<td>&nbsp</td>
						<td>&nbsp</td>
						<td>&nbsp</td>
						<td>&nbsp</td>
						<td>&nbsp</td>
						<td>&nbsp</td>
						<td>&nbsp</td>
					</template>
				</tr>
			</tbody>
			</transition>
		</table>
		<blockModal :oper='oper' :result='result' :msg='msg' v-on:getSetData='getSetData'></blockModal>
	</div>
</template>
<script>
import indexService from 'services/indexService'
import logManageService from 'services/logManageService'
import blockModal from './blockModal'
import loadSpan from 'components/libs/loadSpan'
import attackType from 'libs/attackType'
export default {
	components:{
		blockModal,
		loadSpan
	},
	props: {
		tableData: {
			type:Array,
			required: true
		},
		nowpage:{
			type: Number,
			required: true
		},
		show:{
			required: true
		}
	},
	data(){
		return{
			msg:'',
			result:'',
			oper:'',
			mac:'',
			moveTime:'',
			detailDate:[],
			detailshow:false	
		}
	},
	methods:{
		showIt(index,macIP) {
			clearTimeout(this.moveTime)	
			this.moveTime = setTimeout(()=>{
				this.recvDetailDate(macIP,index)
				$('.detail_warp').eq(index).fadeIn(200)					
			},200)				
		},
		recvDetailDate(data,index){
			let sentdata={};
			sentdata.macip=data;
			logManageService.getPermeateLog(sentdata)
			.then((recvdata)=>{
				recvdata = JSON.parse(recvdata)
				if(recvdata.success){
					this.detailshow=true;
					this.detailDate=recvdata.data.logs.map((item)=>{
						var type='';
						var response_ip='';
						var response_port
						var arrlength=item.response_port.split(',')
						if(arrlength.length>10){
							let arr=[]
							for(let i=0;i<10;i++){
								arr.push(arrlength[i])
							}
							response_port=arr.join(',')
						}else{
							response_port=item.response_port
						}
						switch (item.type-0) {
							case 1:
								type='哨兵节点存活探测';
								response_ip='All';
								response_port='ICMP'
								break;
							case 2:
								type='哨兵节点服务探测';
								response_ip='All';	
								response_port='....';							
								break;
							case 5:
								type='全息节点存活探测';
								response_ip=item.response_ip;
								response_port='ICMP';
								break;
							case 6:
								type='全息节点服务探测';
								response_ip=item.response_ip;
								response_port='....';								
								break;
							case 7:
								var arr = response_port.split(',')
								var str=''
								for (let i=0;i<arr.length;i++){
									if(i==arr.length-1){
										str+=attackType.value(arr[i])
									}else{
										str+=attackType.value(arr[i])+','
									}
								}
								type=str
								response_ip=item.response_ip;
								break;
							default:
								break;
						}
						// var strport=''
						// var arrport = item.response_port.split(',')
						// for (let i=0;i<arrport.length;i++){
						// 	if(i==arrport.length-1){
						// 		strport+=attackType.valuetype(arrport[i])
						// 	}else{
						// 		strport+=attackType.valuetype(arrport[i])+','
						// 	}
						// }
						// var response_port=strport
						var obj={
							response_ip:response_ip,
							type:type,
							response_port:response_port,
							end_time:item.end_time,
							phy_port:item.phy_port,
							count:item.count
						}
						return obj
					})	
				}
			})
		},
		hide(index) {					
			clearTimeout(this.moveTime)
			$('.detail_warp').eq(index).fadeOut(200)
			setTimeout(()=>{
				this.detailshow=false;
			},200)
		},
		changeStatus:function (mac,block) {
			if(block){
				this.oper='block'
			}else{
				this.oper='unblock'
			}
			this.mac=mac
			this.result=''
			if(this.mac){
				$("#bolckmodal").modal('show')
			}
			
		},
		getSetData(){
			this.result='reqing'
			indexService.setBlock(this.mac,this.oper)
			.then((recvdata) => {
				recvdata = JSON.parse(recvdata)
				if(recvdata.success == true) {
				    this.$emit('getData')
					this.result='ok'	
				}else{
					this.result='error'
					this.msg = recvdata.errorMessage
				}
			})
		},
		timechange(str){
			var date=str;
			date = new Date(Date.parse(date.replace(/-/g, "/")));
			date = date.getTime();
			return date
		}		
	},
	computed: {
		typeTableDates:function(){
			let typeTableDates=this.tableData.map((item)=>{
					var type=''
					switch (item.type-0) {
						case 1:
							type='哨兵节点存活探测';
							break;
						case 2:
							type='哨兵节点服务探测';
							break;
						case 5:
							type='全息节点存活探测';
							break;
						case 6:
							type='全息节点服务探测';
							break;
						case 7:
							var arr = item.response_port.split(',')
							var str=''
							for (let i=0;i<arr.length;i++){
								if(i==arr.length-1){
									str+=attackType.value(arr[i])
								}else{
									str+=attackType.value(arr[i])+','
								}
							}
							type=str
							break;
						default:
							break;
					}
					var obj={
						mac:item.mac,
						type:type,
						desc:item.desc,
						count:item.count,
						phy_port:item.phy_port,
						end_time:item.end_time,
						block:item.block
					}
					return obj
				})
				return typeTableDates
		},
		datas: function() {
			let datas = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
			for(let i = 0; i < this.typeTableDates.length; i++) {
				datas[i] = this.typeTableDates[i]
			}
			return datas
		},
		detailDatas: function() {
			let detailDatas = [{},{},{},{},{},{},{},{}]
			for(let i=0;i<this.detailDate.length;i++){
				for(let j=0;j<this.detailDate.length-i-1;j++){
					let time1=this.timechange(this.detailDate[j].end_time)
					let time2=this.timechange(this.detailDate[j+1].end_time)
					if(time1<time2){
						let temp =this.detailDate[j]
						this.detailDate[j]=this.detailDate[j+1]
						this.detailDate[j+1]=temp
					}
				}
			}
			for(let i = 0; i < this.detailDate.length; i++) {
				detailDatas[i] = this.detailDate[i]
			}
			return detailDatas
		}
	}
}
</script>

<style scoped>	
	.bg {
	    height: 644px;
	    position: relative;
	}
	td,
	th {
		text-align: center;
		height: 25px;
	}
	
	/*tr th:nth-child(n+2),
	tr td:nth-child(n+2) {
		width: 200px;
	}*/
	
	td {
		border-left: 1px solid #c9e4ff;
	}
	
	tr td:first-child {
		border-left: none;
	}
	
	thead {
		background: #69b6ff;
	}
	
	tbody tr:nth-child(2n+1) {
		background: #e1f0ff;
	}
	
	th {
		color: #ffffff;
	}
	
	tbody {
		background: #f7fbff;
	}
	
	td>button {
		width: 60px;
		height: 20px;
		border-radius: 5px;
		background: #69b6ff;
		color: #ffffff;
		line-height: 20px;
	}
	
	.block {
		background: #fac064;
	}
	
	.unblock {
		background: #68bf72;
	}
	.note {
      max-width: 60px;
	  white-space: nowrap;
	  overflow: hidden;
	  text-overflow: ellipsis;
    }
	/*----鼠标划过变色-------*/	
	tbody tr:hover {
		cursor: pointer;
		background: rgba(129,194,255,0.5);
	}
	.owner {
		background: #69b6ff;
		height: 30px;
		line-height: 30px;
		text-align: left;
	}
	
	.owner span {
		color: #FFFFFF;
		width: 180px;
		display: inline-block;
		margin-left: 10px;
	}
	.detail_warp{
		background: #f7fbff;
		display: none;
	}
	.detail_warp table tbody tr td p{
		margin: 0;
		padding: 0;
		color:#000;
		width: 130px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: center;
	}
	.tbody  tr td p{
		color:#000;
		width: 130px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: center;
		display: inline-block;
	}
	.detail_warp ul{
		background: #e1f0ff;
		/*border-left:2px solid #68b6ff; 
		border-right:2px solid #68b6ff; */
		overflow: hidden;
	}
	.detail_warp ul li{
		float: left;
		line-height: 25px;
	}
	.detail_warp ul li:last-child{
		border-right:none; 
	}
	.detailDiv{
		max-height:255px;
		min-height:200px;
		overflow-y: auto;
		
		border-top:none;
		background: #f7fbff;
		position: relative;
	}
	.detal_tabel{
		position: absolute;
		right: 55px;
		top: 50%;
		width: 697px;
		transform: translate(0,-50%);
		border: 2px solid #69b6ff;
		background: #f7fbff;
	}
	.last_detail{
		position: absolute;
		right: 55px;
		bottom:-40px;
		width: 697px;
		border: 2px solid #69b6ff;
		background: #f7fbff;
	}
	.detail {
		cursor: pointer;
		position: relative;
		z-index: 3;
	}
	.detail img {
		position: absolute;
		top:5px;
		left:2px;
	}
				
	.detail tr td {
		background: #f7fbff;
	}
	
	.detail thead {
		background: #e1f0ff;
	}
	
	.detail td,
	.detail th {
		border-left: 1px dashed #68b6ff;
		color: #282828;
	}
	
	.detail td:first-child,
	.detail th:first-child {
		border-left: none;
	}
	
	.detail tr {
		border-bottom: 1px dashed #68b6ff;
	}
	
	.detail tr:last-child {
		border-bottom: none;
	}
	::-webkit-scrollbar {
		width: 8px;
		height: 100px;
	}
	/* 滚动槽 */
	
	::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px #4198ea;
		border-radius: 10px;
	}
	/* 滚动条滑块 */
	
	::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background: #71ace4;
		-webkit-box-shadow: inset 0 0 6px rgba(83,163,293,0.9);
	}
	
	::-webkit-scrollbar-thumb:window-inactive {
		height: 30px;
		background: #71ace4;
	}
</style>