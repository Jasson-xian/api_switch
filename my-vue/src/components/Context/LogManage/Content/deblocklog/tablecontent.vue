<template>
	<div class="bg">
		<loadSpan v-show= '!show'></loadSpan>	
		<table v-if="type=='unblock'">
			<thead>
				<tr>
					<th style="width: 60px;">序号</th>
					<th>MAC地址</th>
					<th>备注</th>
					<th>管理员</th>
					<th>时间</th>
				</tr>
			</thead>
			<transition name="fade"  mode="out-in">
	        <tbody v-show = 'show'>			
				<tr v-for='(item ,index) in data'>
					<template v-if="index <tableData.length">
						<td>{{(index+1)+25*(nowpage-1)}}</td>
						<td class="macIP">{{item.mac?item.mac:'-'}}</td>
						<td class="note">{{item.desc?item.desc:'-'}}</td>
						<td>{{item.user?item.user:'-'}}</td>
						<td>{{item.time?item.time:'-'}}</td>
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
		<table v-else>
			<thead>
				<tr>
					<th style="width: 120px;">序号</th>
					<th style="width: 250px;">物理线路</th>
					<th>封堵类型</th>
					<th style="width: 300px;">MAC地址</th>
					<th>备注</th>
					<th>真实IP</th>
					<th>外网IP</th>
					<th>上线时间</th>
					<th>封堵时间</th>
				</tr>
			</thead>
			<transition name="fade"  mode="out-in">
			<tbody v-show = 'show'>			
				<tr v-for='(item ,index) in data'>
					<template v-if="index <tableData.length">
						<td>{{(index+1)+25*(nowpage-1)}}</td>
						<td>{{item.groupid>0?'线路'+item.groupid:item.groupid==null?'-':'主机线路'}}</td>
						<td>{{item.user?item.user=='sys'?'自动封堵':item.user+'手动封堵':'-'}}</td>
						<td class="macIP">{{item.mac?item.mac:'-'}}</td>
						<td class="note">{{item.desc?item.desc:'-'}}</td>
						<td>{{item.rip?item.rip:'-'}}</td>
						<td>{{item.wip?item.wip:'-'}}</td>
						<td>{{item.online_time?item.online_time:'-'}}</td>
						<td>{{item.time?item.time:'-'}}</td>
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
			type: {
				type: String,
				required: true
			},
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
			data: function () {
				let tableData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
				for (let i = 0; i < this.tableData.length; i++) {
					tableData[i] = this.tableData[i]
				}
				return tableData

			}
		},
	}
</script>
<style scoped>	
	.bg{
		height: 645px;
		position: relative;
	}
	th {
		text-align: center;
		height: 25px;
		color: #ffffff;
		width: 300px;
	}
		
	td {
		border-left: 1px solid #c9e4ff;
		height: 25px;
		text-align: center;
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
	
	tbody {
		background: #f7fbff;
	}
	
	td>button {
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

</style>