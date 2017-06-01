<template>
	<div class="bg">
		<!--加载数据-->
		<loadSpan v-show= '!show'></loadSpan>		
		<table>
			<thead>
				<tr>
					<th style="width: 60px;">序号</th>
					<th style="width: 80px;">等级</th>
					<th style="width: 250px;">事件类型</th>
					<th style="width: 600px;">事件内容</th>
					<th style="width: 180px;">时间</th>
				</tr>
			</thead>
			<transition name="fade"  mode="out-in">
		    <tbody v-show = 'show'>		
				<tr v-for='(item ,index) in data'>
					<template v-if="index < tableData.length">
						<td>{{(index+1)+25*(nowpage-1)}}</td>
						<td>{{item.level_desc}}</td>
						<td>{{item.descr}}</td>
						<td class="content" v-bind:title="item.content">{{item.content}}</td>
						<td>{{item.timestamp}}</td>
					</template>
					<template v-else>
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
		nowpage:{
			type: Number,
			required: true
		},
		show:{
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
	}
}
</script>
<style scoped>
    .bg{
    	height: 650px;
    	position: relative;
    }
	td,
	th {
		text-align: center;
		height: 25px;
	}
	
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