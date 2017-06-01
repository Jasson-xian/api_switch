<template>
	<div class="rank">
		<div id="headbutn">
			<button :class="{active:actived==1}" class="button button--aylen" @click='toactive(1)'>日统计</button>
			<span class="broder"></span>
			<button :class="{active:actived==4}" class="button button--aylen" @click='toactive(4)'>月统计</button>
		</div>
		<div class="wrap">
			<div class="title">
				<select v-if='actived==1'  v-model="selected"  v-on:change="getData(selected)">
					<option v-bind:value="1" >本日可疑探测包排行</option>
					<option v-bind:value="2">本日可疑主机存活探测包排行</option>
					<option v-bind:value="3">本日可疑主机服务探测包排行</option>
				</select>
				<select v-else  v-model="selected"  v-on:change="getData(selected)">
					<option v-bind:value="4">本月可疑探测包排行</option>
					<option v-bind:value="5">本月可疑主机存活探测包排行</option>
					<option v-bind:value="6">本月可疑主机服务探测包排行</option>
				</select>
			</div>
			<rankpic :show = 'show' :rankData="rankData"></rankpic>
		</div>
	</div>
</template>
<script>
	import rankpic from './rankpic.vue'

	import logManageService from 'services/logManageService'
	export default {
		components: {
			rankpic
		},
		data() {
			return {
				selected:1,
				actived: 1,
				rankData: [],
				show:false
			}
		},
		created() {
			this.getData(1)
		},
		methods: {
			toactive: function(n) {
				this.actived = n
				this.selected =n
				this.getData(n)
			},
			getData: function(type) {
				// logManageService.getStatistic(type)
				// 	.then((recvdata) => {
				// 		recvdata = JSON.parse(recvdata)
				// 		if(recvdata.success) {	
							this.show = true
							this.rankData = []

					// 	}
					// })
			}
		}
	}
</script>
<style scoped>
	.rank{
		border-bottom: 1px dashed #E0E0E0;
	}
	#headbutn {
		font-size: 14px;
		margin: 10px 0;
	}
	
	.button {
		padding: 0 10px;
		height: 22px;
		border-radius: 5px;
		background: #e5e5e5;
		font-size: 12px;
	}
	
	.broder {
		border-left: 1px solid #c4c4c4;
		margin: 0 12px 0 8px;
	}
	
	.active {
		background: #ffae00;
		color: #FFFFFF;
	}
	.wrap {
	    margin-bottom: 40px;
		height: 300px;
	}
		
	.title {
		background: #69b6ff;
		height: 30px;
		line-height: 30px;
		padding-left: 15px;
	}
	
	select {
		border: none;
		background: #69b6ff;
		color: #FFFFFF;
		padding: 3px;
	}
	
	option {
		color: #FFFFFF;
	}
</style>