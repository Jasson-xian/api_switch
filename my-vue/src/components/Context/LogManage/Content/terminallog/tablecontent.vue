<template>
	<div class="bg">
		<loadSpan v-show= '!show'></loadSpan>		
		<table>
			<thead>
				<tr>
					<th style="width: 60px;">序号</th>
					<th style="width: 120px;">物理线路</th>
					<th>MAC地址</th>
					<th>备注</th>
					<th>真实IP</th>
					<th>外网IP</th>
					<th>上线时间</th>
					<th v-if="type=='host_status'">下线时间</th>
					<th v-else style="width: 100px;">详情</th>
				</tr>
			</thead>
			<transition name="fade"  mode="out-in">
			<tbody v-show = 'show'>				
				<tr v-for='(item ,index) in data'>
					<template v-if="index <tableData.length">
						<td>{{(index+1)+25*(nowpage-1)}}</td>
						<td>{{item.groupid==0?'外部主机': '线路'+item.groupid}}</td>
						<td class="macIP">{{item.mac ? item.mac : '-'}}</td>
						<td class="note">{{item.description ? item.description : '-'}}</td>
						<td>{{item.rip ? item.rip : '-'}}</td>
						<td>{{item.wip ? item.wip : '-'}}</td>
						<td>{{item.online_time ? item.online_time : '-'}}</td>
						<td v-if="type=='host_status'">{{item.offline_time}}</td>
						<td v-else class="detail" @mouseenter="showIt(index,item)" @mouseleave="hide(index)">
							<p style="vertical-align:top;box-sizing: border-box;padding-bottom:5px">......</p>
							<div class="detail_warp">
								<div :class="index>20?'last_detail':'detal_tabel'">
									<div class='owner'>
										<span>MAC：{{item.mac ? item.mac : '-'}}</span>
										<span>备注：{{item.description ? item.description : '-'}}</span>
									</div>
									<div v-show='!detailshow' style="position: relative;height: 100px;background:#fff;z-index: 20;width: 456px;">
										<loadSpan ></loadSpan>
									</div>
									<table v-show='detailshow'>
										<thead>
											<tr>
												<th style="width: 60px;">序号</th>
												<th>虚拟IP</th>
												<th>变换时间</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(val,i) in detailDatas">
												<td>{{i+1}}</td>
												<td>{{val.vip ? val.vip : '-'}}</td>
												<td>{{val.time ?val.time : '-'}}</td>
											</tr>
										</tbody>																		
									</table>
								</div>	
								<img  src="../../../../img/toright.png" />
							</div>
							
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
					</template>
				</tr>
			</tbody>
			</transition>
		</table>
	</div>
</template>
<script>
	import loadSpan from 'components/libs/loadSpan'
	import logManageService from 'services/logManageService'
	export default {
		components:{
		    loadSpan
	    },
		props: {
			tableData: {
				type: Array,
				required: true
			},
			type: {
				type: String,
				required: true
			},
			nowpage: {
				type: Number,
				required: true
			},
			show:{
				type:Boolean,
				required: true
			}
		},

		computed: {
			data: function() {
				let tableData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
				for(let i = 0; i < this.tableData.length; i++) {
					tableData[i] = this.tableData[i]
				}
				return tableData
			}
		},
		data(){
			return{
				detailDatas:[],
				detailshow:false,
				moveTime:''
			}
		},
		methods: {
			showIt(index,item) {
				clearTimeout(this.moveTime)
				this.moveTime = setTimeout(()=>{				
					this.recvDetailDate(item)
					$('.detail_warp').eq(index).fadeIn(200)					
				},200)	
							
			},
			recvDetailDate(item){
				item.type='host_detail'
				this.detailshow = false
				logManageService.getTerminalLog(item)
				.then((recvdata)=>{
					recvdata = JSON.parse(recvdata)
					if(recvdata.success){
						this.detailshow = true
						this.detailDatas=recvdata.data.detail
					}
				})
			},
			hide(index) {					
				clearTimeout(this.moveTime)
				$('.detail_warp').eq(index).fadeOut(200)
			}
		}
	}
</script>
<style scoped>
	.bg {
	    height: 644px;
	    position: relative;
	}	
	th {
		width: 300px;
		text-align: center;
		height: 25px;
		color: #ffffff;
	}
	
	td {
		border-left: 1px solid #c9e4ff;
		text-align: center;
		height: 25px;
	}
	
	tr td:first-child {
		border-left: none;
	}
	
	thead {
		background: #69b6ff;
	}
	
	tbody>tr:nth-child(2n+1) {
		background: #e1f0ff;
	}
	
	tbody {
		background: #f7fbff;
	}
	
	button {
		width: 60px;
		height: 20px;
		border-radius: 5px;
		background: #69b6ff;
		color: #ffffff;
	}
	.note {
      max-width: 60px;
	  white-space: nowrap;
	  overflow: hidden;
	  text-overflow: ellipsis;
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
	
	.detail {
		cursor: pointer;
		position: relative;
		z-index: 3;
	}
	.detail_warp{
		display: none;
	}
	.last_detail{
		position: absolute;
		right: 60px;
		bottom:-20px;
		width: 460px;
		border: 2px solid #69b6ff;
	}
	.detal_tabel {
		position: absolute;
		right: 60px;
		top: 50%;
		width: 460px;
		transform: translate(0,-50%);
		border: 2px solid #69b6ff;
	}
	.detail table{
		
		border-top: none;
	}
	.detail img {
		position: absolute;
		top:2px;
		left: -2px;
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

</style>