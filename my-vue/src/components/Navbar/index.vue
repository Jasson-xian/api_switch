<template>
	<section>
		<div class="wrap">
			<div id="logo-user">
				<div class="logo-wrapper" style="display: flex; align-items: center;">
					<img class="logo" src="../img/logo.png" style="width:45px;margin-right: 15px;vertical-align:bottom;margin-top:10px" />
					<div style="line-height:18px;margin-top:20px ">
						<div style="display: flex;justify-content: space-between;align-items: baseline;">
							<span style="font-size:30px;font-weight:bold;color:#66b8f7;">幻境</span>
							<span style="font-size:10px;font-weight:bold;color:#fff;">内网动态防御系统</span>
						</div>
						<span style="transform:scale(0.875);font-size:10px;color: #fff;line-height:16px">Intrant Dynamic Defense System</span>
					</div>
				</div>
			</div>
			<div id="menu-wrap">
				<div class="row">
					<div class="navbar-collapse collapse " style="padding: 0">
						<ul id="menu-top" class="nav navbar-nav navbar-left">
							<li>
								<a :class="{'menu-top-active': $route.path ==='/home'||$route.path ==='/'}" @click.prevent="jumpTo('/home')">首页</a>
								<div :class="{line:$route.path ==='/home'||$route.path ==='/'}"></div>
							</li>
							<li>
								<a :class="{'menu-top-active': $route.path.split('/')[1] === 'current'}" @click.prevent="jumpTo('/current')">实时监控</a>
								<div :class="{line:$route.path.split('/')[1] ==='current'}"></div>
							</li>
							<li>
								<a :class="{'menu-top-active': $route.path.split('/')[1] === 'system'}" @click.prevent="jumpTo('/system')">系统配置</a>
								<div :class="{line:$route.path.split('/')[1] ==='system'}"></div>
							</li>
							<li>
								<a :class="{'menu-top-active': $route.path.split('/')[1] === 'netManage'}" @click.prevent="jumpTo('/netManage')">网络管理</a>
								<div :class="{line:$route.path.split('/')[1] ==='netManage'}"></div>
							</li>
							<li>
								<a :class="{'menu-top-active': $route.path === '/defend'}" @click.prevent="jumpTo('/defend')">内网防火墙</a>
								<div :class="{line:$route.path.split('/')[1] ==='defend'}"></div>
							</li>
							<li >
								<a :class="{'menu-top-active': $route.path.split('/')[1] === 'logManage'}" @click.prevent="jumpTo('/logManage')">日志管理</a>
								<div :class="{line:$route.path.split('/')[1] ==='logManage'}"></div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<userhander></userhander>
		</div>

	</section>
</template>
<script>

import userhander from './userhander/userhander'
import userService from 'services/userService'
export default {			
	methods: {
		jumpTo: function(page) {
			this.$router.push(page)
		}
	},
	components: {
		userhander
	}
}	
</script>
<style scoped>
	.wrap {
		display: flex;
		width: 100%;
		max-width: 1500px;
		min-width: 1250px;
		height: 70px;
		justify-content: space-around;
		margin: auto;
	}
	#logo-user,
	#menu-wrap,
	#user-handle {
		display: inline-block;
		vertical-align: bottom;		
		line-height: 68px;		
	}
	#logo-user{
		height: 70px;
	}
	#menu-wrap{
		width: 50%;
	}
	#user-handle{
		width: 20%;
	}
	#menu-top{
		width: 100%;
		display: flex;
		justify-content: space-between
	}
	#menu-top>li{
		width: 16.6%;
		margin-left: 1px;
	}
	.user-handle {
		float: right;
	}
	
	#menu-top,
	section {
		background: #262627;
	}
	
	#menu-top a {
		padding: 0;
		display: inline-block;
		width: 100%;
		height: 70px;
		line-height:68px;
		text-align: center;
		color: #fff;
		font-size: 16px;
		padding: 0 10px;
		cursor: pointer;
		position: relative;
	}
	
	#menu-top a:hover {
		background-color: #333333;
	}
	
	.line {
		width: 100%;
		display: inline-block;
		height: 8px;
		background: #67b7ff;
		position: absolute;
		bottom: 0;
		animation: line .5s;
		left:0;
	}
	
	@-moz-keyframes line {
		from {
			transform: scaleX(0);
		}
		to {
			transform: scaleX(1);
		}
	}
	
	@-ms-keyframes line {
		from {
			transform: scaleX(0);
		}
		to {
			transform: scaleX(1);
		}
	}
	
	@-webkit-keyframes line {
		from {
			transform: scaleX(0);
		}
		to {
			transform: scaleX(1);
		}
	}
	
	@keyframes line {
		from {
			transform: scaleX(0);
		}
		to {
			transform: scaleX(1);
		}
	}
	
	.menu-top-active {
		background-color: #333333;
		/*border-bottom: 8px solid #1cacd9;*/
	}
	
	.menu-section {
		background-color: #3D3D3D;
	}
	
	.navbar-toggle {
		background-color: #1cacd9;
	}
	
	.navbar-toggle .icon-bar {
		background-color: #fff;
	}
</style>