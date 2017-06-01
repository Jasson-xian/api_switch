<template>
	<div class="filter" @keydown.enter = 'toSearch()'>
		<img src="../../../../img/search.png" />
		<ul style="display: inline-block;">
			<li>
				<label>MAC地址：</label>
				<macinput :empty = "true" class="mac"></macinput>
			</li>
			<li>
				<label>IP地址：</label>
				<ipinput :empty = "true" class="IP"></ipinput>
			</li>
			<li>
				<label>管理员：</label>
				<input type="text" placeholder="admin" class="user">
			</li>
			<br />
			<li>
				<label>命令内容：</label>
				<input type="text" placeholder="开机" class="content">
			</li>
			<li>
				<timeRang></timeRang>
			</li>
			<li>
				<button class="button button--aylen" v-on:click='toSearch()'>开始查找</button>
			</li>
			<li></li>
			<div id="dtBox"></div>
		</ul>
	</div>
</template>
<script>
	import timeRang from 'components/libs/timeRang'
	import ipinput from 'components/libs/ipinput'
	import macinput from 'components/libs/macinput'
	import formatTest from 'libs/formatTest'

	export default {
		components: {
			timeRang,
			ipinput,
			macinput
		},
		methods: {			
			toSearch: function() {				
				this.$emit('setData')
				this.$emit('getData')				
			}
		}
	}
</script>
<style scoped>
	.filter {
		padding-top: 15px;
		background: #ffffff;
		margin-bottom: 20px;
		border-bottom: 1px dashed #ececec;
	}
	
	img {
		vertical-align: top;
		margin-left: 30px;
	}
	
	li {
		display: inline-block;
	}
	
	label {
		width: 90px;
		text-align: right;
		margin-bottom: 20px;
	}
	
	input {
		width: 180px;
		border:1px solid #e8e8e8;
		height: 25px;
		border-radius: 3px;
		padding: 0 10px;
	}
	
	select {
		width: 60px;
		height: 25px;
		border-radius: 5px;
	}
	
	.button {
		background: #ffae00;
		color: #ffffff;
		width: 80px;
		height: 25px;
		border-radius: 5px;
		margin-left:180px;
	}
</style>