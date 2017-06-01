<template>
	<div class="wrap" @mouseover="comeOut()" @mouseout="goIn()">
		<ul class="leftbar">
			<li>
				<a :class="{'menu-active': $route.path ==='/current'||$route.path ==='/current/equipment'}" @click.prevent="jumpTo('/current/equipment')">设备资源</a>
			</li>
			<li>
				<a :class="{'menu-active': $route.path ==='/current/port'}" @click.prevent="jumpTo('/current/port')">物理接口</a>
			</li>
			<li>
				<a :class="{'menu-active': $route.path ==='/current/userMonitor'}" @click.prevent="jumpTo('/current/userMonitor')">用户监控</a>
			</li>
			<li>
				<a :class="{'menu-active': $route.path ==='/current/onlineNode'}" @click.prevent="jumpTo('/current/onlineNode')">在线节点</a>
			</li>
			<li>
				<a :class="{'menu-active': $route.path ==='/current/whiteList'}" @click.prevent="jumpTo('/current/whiteList')">当前白名单</a>
			</li>
			<li>
				<a :class="{'menu-active': $route.path ==='/current/blacklist'}" @click.prevent="jumpTo('/current/blacklist')">当前黑名单</a>
			</li>
		</ul>
		<div class="toright" v-show = "this.screen_with!='big'">
			<img src="../../img/to_right.png"/>
		</div>
	</div>	
</template>
<script>
export default {
	props:{
		screen_with:{
			type:String,
			required: true
		}
	},
	methods: {
		jumpTo: function(page) {
			this.$router.push(page)
		},
		comeOut(){
			if(this.screen_with!='big'){
				this.$emit('comeOut')
			}			
	    },
	    goIn(){
	    	if(this.screen_with!='big')
		        this.$emit('goIn')
	    }
    }
}
</script>
<style scoped>
	.wrap{
		position: relative;
		height: 100%;
	}
	.leftbar {
		width: 220px;
		height: 100%;
		min-height: 890px;
		background: #343434;
		padding: 0;
		display: inline-block;
		vertical-align: middle;
	}
	
	.leftbar li a {
		display: inline-block;
		height: 60px;
		line-height: 60px;
		width: 100%;
		color: #ffffff;
		text-decoration: none;
		font-size: 14px;
		text-align: left;
		padding-left: 74px;
		box-sizing: border-box;
		vertical-align: middle;
	}
	
	.leftbar li:hover {
		background: #414141;
	}
	
	.leftbar .menu-active {
		background: #69b6ff;
	}
	.toright{
		background: #69b6ff;
		display: inline-block;
		vertical-align: middle;
		z-index: 10;
		position: absolute;
		top:40%;
		height: 80px;
		line-height: 80px;
		right: 0;
		transform: translateY(-50%);
		border-radius: 0 5px 5px 0;
	}
</style>