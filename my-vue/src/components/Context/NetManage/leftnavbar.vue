<template>
	<div class="wrap" @mouseover="comeOut()" @mouseout="goIn()">
		<ul class="leftbar page-sidebar">
			<li>
				<a :class="{'menu-active': $route.path ==='/netManage/globalconf'||$route.path ==='/netManage'}" @click.prevent="jumpTo('/netManage/globalconf')">全局配置</a>
			</li>
			<li @click.prevent='showbutns()'>
				<a @click.prevent="jumpTo('/netManage/ripconf')">
					网络配置
					<img class="showallbtn" src="../../img/showallbtn.png">
				</a>
				<ul class="childbut">
					<li>
						<a :class="{'menu-active': $route.path === '/netManage/ripconf'}" @click.prevent.stop="jumpTo('/netManage/ripconf')">真实IP配置</a>
					</li>
					<li>
						<a :class="{'menu-active': $route.path === '/netManage/vipconf'}" @click.prevent.stop="jumpTo('/netManage/vipconf')">虚拟IP配置</a>
					</li>
					<li>
						<a :class="{'menu-active': $route.path === '/netManage/wipconf'}" @click.prevent.stop="jumpTo('/netManage/wipconf')">外网IP配置</a>
					</li>
					<li>
						<a :class="{'menu-active': $route.path === '/netManage/vnetconf'}" @click.prevent.stop="jumpTo('/netManage/vnetconf')">虚拟网络配置</a>
					</li>	
					<li>
						<a :class="{'menu-active': $route.path === '/netManage/vresconf'}" @click.prevent.stop="jumpTo('/netManage/vresconf')">虚假响应配置</a>
					</li>
				</ul>
			</li>
			<li>
				<a :class="{'menu-active': $route.path ==='/netManage/staticaddr'}" @click.prevent="jumpTo('/netManage/staticaddr')">静态地址</a>
			</li>
			<li>
				<a :class="{'menu-active': $route.path ==='/netManage/staticroute'}" @click.prevent="jumpTo('/netManage/staticroute')">静态路由</a>
			</li>
			<li>
				<a :class="{'menu-active': $route.path ==='/netManage/trunk'}" @click.prevent="jumpTo('/netManage/trunk')">终端透传</a>
			</li>
			<li>
				<a :class="{'menu-active': $route.path ==='/netManage/agreement'}" @click.prevent="jumpTo('/netManage/agreement')">协议透传</a>
			</li>
			<li>
				<a :class="{'menu-active': $route.path ==='/netManage/holomask'}" @click.prevent="jumpTo('/netManage/holomask')">全息伪装</a>
			</li>
			<li>
				<a :class="{'menu-active': $route.path ==='/netManage/trapnode'}" @click.prevent="jumpTo('/netManage/trapnode')">端口虚开</a>
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
		data() {
			return {
				isshow: false
			}
		},
		methods: {
			jumpTo: function (page) {
				this.$router.push(page)
			},
			showbutns: function () {
				var nowTime = new Date().getTime();
				var clickTime = $(this).attr("ctime");
				if( clickTime != 'undefined' && (nowTime - clickTime < 500)){
					return false;
				}else{
					$(this).attr("ctime",nowTime);
					this.isshow = !this.isshow
					$('.childbut').slideToggle(500);
					if (this.isshow) {
						$('.showallbtn').addClass("showbtn").removeClass("hidebtn")
					} else {
						$('.showallbtn').addClass("hidebtn").removeClass("showbtn")
					}
				}       
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
		box-sizing: border-box;
		padding-left: 75px;
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
		padding-left: 95px;
		text-align: left;
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