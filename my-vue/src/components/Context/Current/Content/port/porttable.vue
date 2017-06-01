<template>
	<div class="port-table">
		<div class="thead">
				<tr>
					<th>接口名称</th>
					<th style='width:50px'>状态</th>
					<th>总流量</th>
					<th>包个数</th>
					<th>错误</th>
					<th>丢弃</th>
					<th>帧/冲突</th>
				</tr>
		</div>
		<table>
			<tbody>
				<ul>
					<li v-for='item in eths'>
						<tr>
							<td rowspan='2'>{{item.name?item.name:'-'}}</td>
							<td rowspan='2' style='width:50px;'>
								<img v-if='item.status' src="../../../../img/portlight.png">
								<img v-else src="../../../../img/portgray.png" />
							</td>
							<td>{{item.outbytes?item.outbytes:0}}</td>
							<td>{{item.outpkts?item.outpkts:0}}</td>
							<td>{{item.out_err?item.out_err:0}}</td>
							<td>{{item.out_drop?item.out_drop:0}}</td>
							<td>{{item.out_frame?item.out_frame:0}}</td>
						</tr>
						<tr>
							<td>{{item.inbytes?item.inbytes:0}}</td>
							<td>{{item.inpkts?item.inpkts:0}}</td>
							<td>{{item.in_err?item.in_err:0}}</td>
							<td>{{item.in_drop?item.in_drop:0}}</td>
							<td>{{item.in_frame?item.in_frame:0}}</td>
						</tr>
					</li>
				</ul>
			</tbody>
		</table>
	</div>
</template>
<script>
export default {
	props: {
		eths: {
			type: Array,
			required: true
		}
	}
}
</script>
<style scoped>
	.port-table {
		display: inline-block;
		vertical-align: top;
		margin: 40px 20px 20px 10px;
		background: #ffffff;
	}
	
	th,
	td {
		text-align: center;
		width: 90px;
	}
	
	td {
		border: 1px solid #dadde0;
	}
	
	li tr:nth-child(2) td:nth-child(n),
	li tr:nth-child(1) td:nth-child(-n+2) {
		border-bottom: none;
	}
	ul li:last-child {
		border-bottom: 1px solid #dadde0;
	}
	.thead {
		background: #69b6ff;
	}
	
	tr {
		height: 30px;
		vertical-align: middle;
	}
	
	th {
		color: #ffffff;
	}
	
	tbody {
		background: #f7fbff;
		
	}
	ul{
		box-sizing: border-box; 
	}
	ul li:nth-child(2n+1) {
		background: #e1f0ff;
	}
</style>