<template>
	<div class="table-wrap">
		<!--加载数据-->
		<loadSpan v-show= '!show'></loadSpan>	
		<table>
			<thead>
				<tr>
					<th style="width: 60px;">序号</th>
					<th style="width: 150px;">MAC地址</th>
					<th style="width: 100px;">备注名</th>
					<th style="width: 150px;">真实IP</th>
					<th style="width: 150px;">虚拟IP</th>
					<th style="width: 150px;">外网IP</th>
					<th style="width: 150px;">虚拟域名</th>
					<th style="width: 100px;">物理线路</th>
					<th style="width: 60px;">VLAN</th>
					<th style="width: 200px;">上线时间</th>
					<th style="width: 80px;">操作</th>
				</tr>
			</thead>
			<transition name="fade"  mode="out-in">
			    <tbody v-show = 'show'>			
				    <tr v-for='(item ,index) in data' v-on:dblclick="setBlock(index)">			
						<template v-if="index<tableData.length&&testMac(item.mac)"  >
							<td>{{(index+1)+22*(nowpage-1)}}</td>
							<td class="macIPNum">{{item.mac?item.mac:'-'}}</td>
							<td class="noteNum">{{item.desc?item.desc:'-'}}</td>
							<td>{{item.rip?item.rip:'-'}}</td>
							<td>{{item.vip?item.vip:'-'}}</td>
							<td>{{item.wip?item.wip:'-'}}</td>
							<td>{{item.vname?item.vname:'-'}}</td>
							<td>{{item.groupid?'线路'+item.groupid:'-'}}</td>
							<td>{{item.vlanid?item.vlanid:'-'}}</td>
							<td>{{item.time?item.time:'-'}}</td>
							<td @click.stop="setBlock(index)">
								<button class="blockButn  button button--aylen" :class="{unblock:item.is_drop=='unblock'}">
									{{item.is_drop=='unblock'?'封堵':'解封'}}
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
							<td>&nbsp</td>
						</template>                   
				    </tr>				 
			    </tbody>
			</transition>
		</table>
		<blockModal  :result='result' v-on:getSetData='getSetData' :oper='oper'  :msg='msg'></blockModal>
	</div>
</template>
<script>
	import blockModal from 'components/Context/LogManage/Content/permeatelog/blockModal'
	import bwDelemodal from 'components/libs/bwDelemodal'
    import loadSpan from 'components/libs/loadSpan'
	
	import indexService from 'services/indexService'
	export default {
		props: {
			tableData: {
				type: Array,
				required: true
			},
			nowpage: {
				type: Number,
				required: true
			},
			show:{
				required: true
			}
		},
		components: {
			blockModal,
		    loadSpan			
		},
		data() {
			return {
				oper:'',
				result:'',
				Index:'',
				msg:''
			}
		},
		computed: {
			data: function() {
				let tableData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
				for(let i = 0; i < this.tableData.length; i++) {
					tableData[i] = this.tableData[i]
				}
				return tableData
			}
		},
		methods: {
			testMac(val){
				var MacReg = /^[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}$/
				return MacReg.test(val)
			},
			setBlock(index) {
				if(index<this.tableData.length){
					$('#bolckmodal').modal('show')
					if(this.tableData[index].is_drop=='unblock'){
						this.oper='block'
					}else{
						this.oper='unblock'
					}			
				    this.Index = index
				    this.result=''
				}				
			},
			getSetData() {
				this.result='reqing'
				var index = this.Index
				var	mac = $('.macIPNum').eq(index).html()
				var	oper= this.oper
				indexService.setBlock(mac,oper)
					.then((recvdata) => {
						recvdata = JSON.parse(recvdata)
						if(recvdata.success == true) {
							this.$emit('getData')
							this.result='ok'
						}else{
							this.result=recvdata.level
							this.msg=recvdata.errorMessage
						}
					})
			}
		},
	}
</script>
<style scoped>
	.table-wrap {
		padding: 5px 15px 0;
		position: relative;
		height: 580px;
	}
	
	th {
		text-align: center;
		color: #ffffff;
	}
	
	thead {
		background: #69b6ff;
	}
	
	tr {
		height: 25px;
		vertical-align: middle;
		cursor: pointer;
	}
	
	tbody tr:nth-child(2n+1) {
		background: #e1f0ff;
	}
	
	td {
		border-left: 1px solid #c9e4ff;
		text-align: center;
	}
	
	td:first-child {
		border-left: none
	}
	
	tbody {
		background: #f7fbff;
	}
	
	.blockButn {
		width: 50px;
		height: 18px;
		border-radius: 5px;
		color: #ffffff;
		background: #ffae00;
	}
	
	.unblock {
		background: #9fd0ff;
	}
	.noteNum{
		max-width: 100px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	/*----鼠标划过变色-------*/	
	tbody tr:hover {
		background: rgba(129,194,255,0.5);
	}

</style>