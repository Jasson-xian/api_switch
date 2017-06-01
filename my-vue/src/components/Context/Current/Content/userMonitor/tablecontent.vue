<template>
	<div class="table-wrap">
		<!--加载数据-->
		<loadSpan v-show= '!show'></loadSpan>	
		<table>
			<thead>
				<tr>
					<th style="width: 50px;">序号</th>
					<th>物理线路</th>
					<th>IP地址</th>
					<th>MAC地址</th>
					<th>备注名</th>
					<th>总流速</th>
					<th>上行流速</th>
					<th>下行流速</th>
					<th>并发连接数</th>
				</tr>
			</thead>
			<transition name="fade"  mode="out-in">
		    <tbody v-show = "show">		
				<tr v-for='(item,index) in data'>
					<template v-if="index<tableData.length">
						<td>{{(index+1)+22*(nowpage-1)}}</td>
						<td>{{item.groupid?'线路'+item.groupid:'-'}}</td>
						<td>{{item.ip?item.ip:'-'}}</td>
						<td>{{item.mac?item.mac:'-'}}</td>
						<td class="note">{{item.desc?item.desc:'-'}}</td>
						<td>{{convertFlow(item.rx+item.tx)}}</td>
						<td>{{convertFlow(item.tx)}}</td>
						<td>{{convertFlow(item.rx)}}</td>
						<td>{{item.con}}</td>
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
					</template>
				</tr>
			</tbody>
			</transition>
		</table>	
	</div>
</template>
<script>
import loadSpan from 'components/libs/loadSpan'	
export default {
	components:{
		loadSpan
	},
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
		}
	}
}
</script>
<style scoped>
	.table-wrap {
		height:693px;
		position: relative;
	}
	
	th {
		text-align: center;
		width: 150px;
	}
	
	td {
		border-left: 1px solid #ffffff;
		text-align: center;
	}
	
	thead {
		background: #69b6ff;
	}
	
	tr {
		height: 30px;
		vertical-align: middle;
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
	.note{
		max-width: 120px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>