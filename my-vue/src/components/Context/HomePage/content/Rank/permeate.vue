<template>
	<div>
		<button class="attack-detial button button--aylen"  @click="goDetail">详&nbsp;情</button>
		<table class="content">
			<thead>
				<tr>
					<th style="width: 35px;">序号</th>
					<th style="width: 105px;">攻击源</th>
					<th style="width: 42px;">备注</th>
					<th style="width: 102px;">攻击类型</th>
					<th style="width: 47px;">次数</th>
					<th style="width: 70px;">物理线路</th>
					<th style="width: 138px;">时间</th>
					<th style="width: 65px;">封堵状态</th>
					<th style="width: 65px;">操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for='(item, index) in attackDate' @dblclick="changeStatus(item.mac,!item.block)">
					<template v-if="item.mac">
						<td>{{index+1}}</td>
						<td><p>{{item.mac}}</p></td>
						<td data-toggle="tooltip" data-placement="bottom" :title='item.desc'><p>{{item.desc ? item.desc : '-'}}</p></td>
						<td data-toggle="tooltip" data-placement="bottom" :title='item.type'><p>{{item.type}}</p></td>
						<td data-toggle="tooltip" data-placement="bottom" :title='item.count'><p>{{item.count}}</p></td>
						<td>
							<span v-if='item.phy_port==0'>外部主机</span>
							<span v-else>线路{{item.phy_port}}</span>
						</td>
						<td>{{item.end_time ? item.end_time : '-'}}</td>
						<td>{{item.block ? '已封堵' : '未封堵'}}</td>
						<td>
							<button class="button button--aylen" v-bind:class="[item.block ? 'unblock' : 'block']" @click="changeStatus(item.mac,!item.block)">
							{{item.block ? '解&nbsp&nbsp封' : '封&nbsp&nbsp堵'}}
							</button>
						</td>
					</template>
				</tr>
			</tbody>
		</table>
		<blockModal :oper='oper' :result='result' :msg='msg' v-on:getSetData='getSetData'></blockModal>
	</div>

</template>
<script>
	import indexService from 'services/indexService'
	import blockModal from 'components/Context/LogManage/Content/permeatelog/blockModal'
	import attackType from 'libs/attackType'
	export default {
		props: {
			attackTable: {
				type: Array,
				required: true
			}
		},
		data(){
			return{
				oper:'',
				result:'',
				msg:'',
				mac:''
			}
		},
		computed:{
			attackDate:function(){
				let attackDate=this.attackTable.map((item)=>{
					var type=''
					var mac=''
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
								mac=item.mac;
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
				return attackDate
			}
		},
		methods: {
			changeStatus: function(mac, block) {
				if(block){
					this.oper='block'
				}else{
					this.oper='unblock'
				}
				this.mac=mac
				this.result=''
				$("#bolckmodal").modal('show')
			},
			goDetail() {
				this.$router.push('/logManage/log')
			},
			getSetData(){
				indexService.setBlock(this.mac, this.oper)
					.then((recvdata) => {
						recvdata = JSON.parse(recvdata)
						if(recvdata.success == true) {
							this.result='ok'
						}else{
							this.result=recvdata.level
							this.msg=recvdata.errorMessage
						}
					})
			}
		},
		components:{
			blockModal
		}
	}
</script>
<style scoped>
	.attack-detial {
		width: 50px;
		height: 18px;
		line-height: 10px;
		background: #65ccf0;
		border-radius: 3px;
		color: #FFFFFF;
		margin-left: 581px;
	}
	/*渗透攻击*/
	
	.content {
		display: inline-block;
		height: 240px;
		margin-top: 10px;
	}		
	thead {
		background: #88abdb;
	}
	.tablehead>p span{
		display: inline-block;
		background: #88abdb;
		line-height:24px;
		color: #fff;
		text-align: center;
		margin-top: 10px
	}
	th {
		color: #FFFFFF;
	}
	
	th,
	tr {
		text-align: center;
		line-height: 24px;
	}
	
	tbody tr:nth-child(2n+1) td {
		background: #ecf1f8;
	}
	tbody tr:hover{
		cursor:pointer;
	}
	td {
		text-align: center;
		border-left: 1px solid #FFFFFF;
	}
	td:nth-child(5)>p{
		width:47px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	td:nth-child(3)>p{
		width:40px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	td:nth-child(4)>p{
		width:102px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	td:nth-child(2)>p{
		width:105px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	tr td:first-child {
		border: none;
	}
	
	td .button {
		width: 50px;
		height: 18px;
		line-height: 10px;
		color: #FFFFFF;
		border-radius: 5px;
	}
	
	.block {
		background: #fac064;
	}
	
	.unblock {
		background: #68bf72;
	}
</style>