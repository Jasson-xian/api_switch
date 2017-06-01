<template>
	<div class="bg">
		<loadSpan v-show='!show'></loadSpan>
		<div>
			<h3>事件日志</h3>
			<button class="button button--aylen" @click="goDetail">详&nbsp;情</button>
		</div>
		<transition name='fade'>
		<table class="logcontent" v-show="show">
			<tbody>
				<tr v-for='(item,index) in event_log'>
					<td>{{item.timestamp.substr(0,item.timestamp.lastIndexOf(':'))}}</td>
					<td>
						<p>{{item.content}}</p>
					</td>
				</tr>
			</tbody>
		</table>
		</transition>
		
	</div>
</template>
<script>
	import loadSpan from 'components/libs/loadSpan'
	export default {
		props: {
			event_log: {
				type: Array,
				required: true
			},
			show:{
				type:Boolean,
				required:true
			}
		},
		components:{
			loadSpan
		},
		methods: {
			goDetail() {
				this.$router.push('/logManage/eventlog')
			}
		}
	}
</script>
<style scoped>
	.bg {
		background: #FFFFFF;
		margin-top: 20px;
		padding: 5px 20px;
		height: 260px;
		position: relative;
	}
	
	h3 {
		height: 30px;
		line-height: 30px;
		display: inline-block;
		font-size: 14px;
	}
	
	.button {
		box-sizing: border-box;
		width: 50px;
		height: 18px;
		line-height: 18px;
		background: #65ccf0;
		border-radius: 3px;
		color: #FFFFFF;
		float: right;
		margin-top: 5px;
		padding-bottom:1px;
	}
	td {
		width: 360px;
		text-align: center;
	}
	td:nth-child(2)>p{
	    max-width: 340px;
	    white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    text-align: left;
	    padding:0 5px;
	}
	tbody tr {
		height: 24px;
	}
	
	tbody tr:last-child {
		border-bottom: none;
	}
	
	tbody tr:nth-child(2n) {
		background: #fff;
	}
	
	tbody tr:nth-child(2n+1) {
		background: #ecf1f8;
	}
</style>