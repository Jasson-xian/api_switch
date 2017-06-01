<template>
	<div class="wrap"  @mouseover="comeOut()" @mouseout="goIn()">
		<ul class="leftbar">
			<li>
				<a :class="{'menu-active': $route.path ==='/logManage'||$route.path ==='/logManage/log'}" @click.prevent="jumpTo('/logManage/log')">渗透日志</a>
			</li>
			<li>
				<a :class="{'menu-active': $route.path ==='/logManage/statistic'}" @click.prevent="jumpTo('/logManage/statistic')">渗透统计</a>
			</li>
			<li>
				<a :class="{'menu-active': $route.path ==='/logManage/terminallog'}" @click.prevent="jumpTo('/logManage/terminallog')">主机日志</a>
			</li>
			<li>
				<a :class="{'menu-active': $route.path ==='/logManage/deblocklog'}" @click.prevent="jumpTo('/logManage/deblocklog')">封堵&解封</a>
			</li>
			<li>
				<a :class="{'menu-active': $route.path ==='/logManage/orderlog'}" @click.prevent="jumpTo('/logManage/orderlog')">操作日志</a>
			</li>
			<li>
				<a :class="{'menu-active': $route.path ==='/logManage/eventlog'}" @click.prevent="jumpTo('/logManage/eventlog')">事件日志</a>
			</li>		
			<li>
				<a :class="{'menu-active': $route.path ==='/logManage/serverlog'}" @click.prevent="jumpTo('/logManage/serverlog')">日志服务器</a>
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
	.showallbtn {
		margin-left: 20px;
		vertical-align: middle;
	}
	
	.childbut {
		display: none;
		background: #2b2b2b;
	}
	
	.childbut li a {
		padding-left: 20px;
		text-align: center;
		height: 50px;
		line-height: 50px;
	}
	
	.showbtn {
		animation: show .5s forwards;
	}
	
	.hidebtn {
		animation: hide .5s forwards;
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
	@keyframes show {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(90deg);
		}
	}
	
	@keyframes hide {
		from {
			transform: rotate(90deg);
		}
		to {
			transform: rotate(0deg);
		}
	}
</style>