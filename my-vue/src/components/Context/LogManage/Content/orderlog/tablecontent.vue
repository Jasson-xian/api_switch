<template>
	<div class="table-wrap">
		<!-- 加载数据 -->
		<loadSpan v-show= '!show'></loadSpan>
		<table>
			<thead>
				<tr>
					<th style="width: 50px;">序号</th>
					<th style="width: 80px;">管理员</th>
					<th style="width: 150px;">MAC地址</th>
					<th style="width: 120px;">IP地址</th>
					<th style="width: 550px;">命令内容</th>
					<!-- <th style="width: 80px;">执行结果</th> -->
					<th style="width: 200px;">时间</th>
				</tr>
			</thead>
			<transition name="fade"  mode="out-in">
		    <tbody v-show = 'show'>			
				<tr v-for='(item ,index) in datas'>
					<template v-if="index < tableData.length">
						<td>{{(index+1)+25*(nowpage-1)}}</td>
						<td>{{item.user?item.user:'-'}}</td>
						<td>{{item.mac?item.mac:'-'}}</td>
						<td>{{item.ip?item.ip:'-'}}</td>
						<td class="content" v-bind:title="item.content">
							{{item.content?item.content:'-'}}
						</td>
						<!-- <td>{{item.result>0?'成功':'失败'}}</td> -->
						<td>{{item.time}}</td>
					</template>
					<template v-else>
						<td>&nbsp</td>
						<td>&nbsp</td>
						<td>&nbsp</td>
						<td>&nbsp</td>
						<td>&nbsp</td>
						<td>&nbsp</td>
						<!-- <td>&nbsp</td> -->
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
		nowpage:{
			type: Number,
			required: true
		},
		show:{
			required: true
		}
	},
	computed: {
		datas: function() {
			let tableData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},{}]
			for(let i = 0; i < this.tableData.length; i++) {
				tableData[i] = this.tableData[i]
			}
			return tableData
		}
	}
}
</script>
<style scoped>
	.table-wrap {
		margin-top: 20px;
		margin: 20px 25px 0;
    	height: 645px;
    	position: relative;
	}
	
	th {
		text-align: center;
	}
	
	td {
		text-align: center;
		border-left: 1px solid #c9e4ff;
	}
	
	td:first-child {
		border-left: none
	}
	
	thead {
		background: #69b6ff;
	}
	
	tr {
		height: 25px;
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
	
	td>button {
		width: 100px;
		height: 20px;
		border-radius: 5px;
		background: #69b6ff;
		color: #ffffff;
	}
	
	.content {
		padding: 0 15px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: left;
		cursor: pointer;
		max-width: 180px;
	}
	tbody tr:hover{
		background: rgba(129,194,255,0.5);
	}
		/*----鼠标划过变色-------*/	
	tbody tr:hover {
		background: rgba(129,194,255,0.5);
	}
</style>