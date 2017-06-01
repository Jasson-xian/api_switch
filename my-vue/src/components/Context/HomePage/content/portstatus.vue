<template>
	<div class="bg">
		<loadSpan v-show='!show'></loadSpan>
		<div>
			<h3>物理接口状态</h3>
			<button @click="goDetail" class="button button--aylen" >详&nbsp;情</button>
		</div>
		<transition name='fade'>
		<div v-show='show'>
		<div class="tablehead">
			<ul>
				<li style="width: 117px;">接口名称</li>
				<li style="width: 66px;">状态</li>
				<li style="width: 133px;">MAC地址</li>
				<li style="width: 99px;">上行流速</li>
				<li style="width: 102px;">下行流速</li>
				<li style="width: 114px;">总流速</li>
			</ul>
		</div>
		<table class="tablebody" >
			<tbody>
				<tr v-for='item in eths'>
					<template v-if="item.name">
						<td style="width: 117px;">{{item.name}}</td>
						<td style="width: 66px;">
							<img v-if="item.up" src="../../../img/portlight.png" />
							<img v-else src="../../../img/portgray.png" />
						</td>
						<td style="width: 133px;">{{item.macaddr}}</td>
						<td style="width: 99px;"><p>{{convertFlow(item.out_bps)}}</p></td>
						<td style="width: 102px;"><p>{{convertFlow(item.in_bps)}}</p></td>
						<td style="width: 114px;"><p>{{convertFlow(item.out_bps + item.in_bps)}}</p></td>
					</template>
				</tr>
			</tbody>
		</table>
		</div>
		</transition>
	</div>
</template>
<script>
import loadSpan from 'components/libs/loadSpan'
export default {
	components:{
		loadSpan
	},
	props:{
		eths:{
			type:Array,
			required:true
		},
		show:{
			type:Boolean,
			required:true
		}
	},
	methods: {
		goDetail() {
			this.$router.push('/current/port')
		},
		convertFlow(bps) {
			let flow = ''
			if(bps < 1024) {
				flow = Math.ceil(bps) + ' Bps'
			}
			if(bps >= 1024 && bps < 1024*1024) {
				flow = bps/1024
				flow = flow.toFixed(2) + ' KBps'
			}
			if(bps >= 1024*1024 && bps < 1024*1024*1024) {
				flow = bps/1024/1024
				flow = flow.toFixed(2) + ' MBps'
			}
			if(bps >= 1024*1024*1024) {
				flow = bps/1024/1024/1024
				flow = flow.toFixed(2) + ' GBps'
			}
			return flow
		}
	}
}
</script>
<style scoped>
	.bg {
		background: #FFFFFF;
		margin-top: 20px;
		background: #ffffff;
		height:260px;
		padding: 5px 28px;
		position: relative;
	}
	
	h3 {
		line-height: 30px;
		font-size: 14px;
		display: inline-block;
	}
	
	.button {
		width: 50px;
		height: 18px;
		line-height: 18px;
		background: #65ccf0;
		border-radius: 3px;
		color: #FFFFFF;
		float: right;
		margin-top: 5px;
		padding-bottom:1px;
		box-sizing: border-box;
	}
	tr{
		cursor: pointer;
	}
	.tablehead>ul li{
		float: left;
		background: #6c6c6c;
		line-height: 30px;
		color: #fff;
		margin: 0;
		padding: 0;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	th {
		/*display: inline-block;*/
		color: #FFFFFF;
		line-height: 30px;
		text-align: center;
	}
	
	td {
		text-align: center;
		line-height:24px;
	}
	
	tbody tr:nth-child(2n+1) td {
		background: #eeeeee;
	}
	
	tbody td {
		border-left: 1px solid #e5e5e5;
	}
	
	tbody td:first-child {
		border: none;
	}
	
	table {
		display: inline-block;
		width: 100%;
	}
	.tablebody{
		height: 170px;
		overflow-y: auto;
	}
	/*滚动条样式*/
	td:nth-child(4)>p{
		width:98px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align:center;
	}
	td:nth-child(5)>p{
		width:101px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align:center;
	}
	td:nth-child(6)>p{
		width:113px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align:center;
	}
	::-webkit-scrollbar {
		width: 8px;
		height: 100px;
	}
	/* 滚动槽 */
	
	::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		border-radius: 10px;
	}
	/* 滚动条滑块 */
	
	::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.1);
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
	}
	
	::-webkit-scrollbar-thumb:window-inactive {
		height: 30px;
		background: rgba(138, 136, 136, 0.4);
	}
</style>