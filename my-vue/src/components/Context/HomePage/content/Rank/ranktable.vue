<template>
	<table>
		<thead>
			<tr>
				<th style="width: 105px;">MAC地址</th>
				<th style="width:40px;">备注</th>
				<th style="width:80px;">上行流速</th>
				<th style="width:80px;">下行流速</th>
				<th @click="goDetail" style="width:50px;"><button class="rank-detial button button--aylen" >详&nbsp;情</button></th>
			</tr>
		</thead>
		<tbody>
			<tr v-for='item in items'>
				<td style="color: #3eb551;width: 105px; ">
					{{item.mac}}
				</td>
				<td style="color:#c0c0c0;width:40px;">
					<p>{{item.desc ? item.desc : '-'}}</p>
				</td>
				<td style="width:80px;">
					<p>{{convertFlow(item.tx)}}</p>
				</td>
				<td style="width:80px;">
					<p>{{convertFlow(item.rx)}}</p>
				</td>
				<td></td>
			</tr>
		</tbody>

	</table>
</template>
<script>
	export default {
		props: {
			activeTable: {
				type: Array,
				required: true
			}
		},
		computed: {
			items: function() {
				var item = { mac: "-", desc: "-", tx: "-", rx: "-" }
				var items = [item, item, item, item, item]
				for(var i = 0; i < this.activeTable.length; i++) {
					items[i] = this.activeTable[i]
				}
				return items
			}
		},
		methods: {
			convertFlow(bps) {
				let flow = ''
				if(bps < 1024) {
					flow = Math.ceil(bps) + ' Bps'
				}
				if(bps >= 1024 && bps < 1024 * 1024) {
					flow = bps / 1024
					flow = flow.toFixed(2) + ' KBps'
				}
				if(bps >= 1024 * 1024 && bps < 1024 * 1024 * 1024) {
					flow = bps / 1024 / 1024
					flow = flow.toFixed(2) + ' MBps'
				}
				if(bps >= 1024 * 1024 * 1024) {
					flow = bps / 1024 / 1024 / 1024
					flow = flow.toFixed(2) + ' GBps'
				}
				return flow
			},
			goDetail() {
			  this.$router.push('/current/userMonitor')
		    }
		}	
	}
</script>
<style scoped>
	.rank-detial {
		width: 50px;
		height: 18px;
		line-height: 10px;
		background: #65ccf0;
		border-radius: 3px;
		color: #FFFFFF;
	}
	table{
		width: 350px;
		margin-top: -40px;
		margin-left: 10px;
		text-align: center;
	}
	tr {
		height: 24px;
	}
	th{
		text-align: center;
		height: 50px;
	}
	tbody tr{
		line-height:48px;
		font-size: 12px;
	}
	.thead {
		/*background: #6c6c6c;*/
	}
	.thead td{
		color: #fff;
		background: #6c6c6c;
	}
	tbody tr:nth-child(2n+1) {
		background: #EEEEEE;
	}
	td>p{
		width:78px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	td:nth-child(2)>p{
		width:40px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	td:nth-child(3)>p,td:nth-child(4)>p{
		/*text-align: left;*/
		width:78px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>