<template>
	<div @keydown.enter = 'search()'>
		<div  class="filter">
			<img src="../../../../img/search.png" />
			<label class="levellabel">事件等级：</label>
			<select class="level" v-model='level' v-on:change='changeLevel()' style="width:70px;"> 
				<option value="">全部</option>
				<option value="normal">普通</option>
				<option value="warning">警告</option>
				<option value="severe">严重</option>
			</select>
			<label class="eventlabel">事件类型：</label>
			<select class="type event" v-on:change="search()">
				<template v-if="level==''">
					<option value="">全部</option>	
					<!--普通-->
					<option value="eth_up">网口接入</option>
					<option value="eth_down">网口断开</option>
					<option value="login_ok">登录成功</option>
					<option value="logout">用户注销</option>
					<option value="sys_init">系统初始化</option>
					<option value="sys_start">系统启动</option>
					<option value="con">中心连接</option>				
					<!--警告-->
					<option value="login_fail">登录失败</option>
					<option value="discon">中心断开</option>
					<!--严重-->
					<option value="login_exceed">登录超限</option>
				</template>
				<template v-else-if="level=='normal'">
					<option value="">全部</option>
					<option value="eth_up">网口接入</option>
					<option value="eth_down">网口断开</option>
					<option value="login_ok">登录成功</option>
					<option value="logout">用户注销</option>
					<option value="sys_init">系统初始化</option>
					<option value="sys_start">系统启动</option>
					<option value="con">中心连接</option>				
				</template>
				<template v-else-if="level=='warning'">
					<option value="">全部</option>
					<option value="login_fail">登录失败</option>
					<option value="discon">中心断开</option>
				</template>
				<template v-else-if="level=='severe'">
					<option value="">全部</option>
					<option value="login_exceed">登录超限</option>
				</template>
			</select>
			<timeRang></timeRang>
			<button class="button button--aylen" v-on:click='search()'>开始查找</button>
		</div>
		<div id="dtBox"></div>
	</div>
</template>
<script>
	import timeRang from 'components/libs/timeRang'
	export default {
		components: {
			timeRang
		},
		data() {
			return {
				level:'',
			}
		},
		methods: {
			changeLevel: function() {
				this.search()
			},
			search: function() {	
				this.$emit('setData')	
				this.$emit('getData')
			}
		}
	}
</script>
<style scoped>
	.filter {
		height: 60px;
		line-height: 60px;
		margin-bottom: 20px;
		border-bottom: 1px dashed #ececec;
	}
	
	input {
		width: 180px;
		background: #e8e8e8;
		height: 25px;
		border-radius: 5px;
		padding-left: 35px;
	}
	
	.macIP {
		padding: 0 10px;
	}
	
	.levellabel {
		margin-left: 5px;
	}
	
	.eventlabel {
		margin-left: 30px;
	}
	
	select {
		padding:0px 5px;
		display: inline-block;
		border-radius: 5px;
		height: 25px;
	}
	
	
	.type {
		width: 150px;
	}
	
	.button {
		background: #ffae00;
		color: #ffffff;
		width: 80px;
		height: 25px;
		border-radius: 5px;
		margin-left: 40px;
	}
</style>