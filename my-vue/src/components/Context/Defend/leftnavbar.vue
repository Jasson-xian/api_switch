<template>
	<div class="wrap" @mouseover="comeOut()" @mouseout="goIn()">
		<ul class="leftbar page-sidebar">		
			<li>
				<a :class="{'menu-active': $route.path ==='/defend/safeplot'||$route.path ==='/defend'}" @click.prevent="jumpTo('/defend/safeplot')">安全策略</a>
			</li>
			<li>
				<a :class="{'menu-active': $route.path ==='/defend/blacklist'}" @click.prevent="jumpTo('/defend/blacklist')">黑名单</a>
			</li>
			<li>
				<a :class="{'menu-active': $route.path ==='/defend/hostcomputer'}" @click.prevent="jumpTo('/defend/hostcomputer')">蜜罐主机</a>
			</li>
			<li @click.prevent='showbutns()'>
				<a @click.prevent="jumpTo('/defend/selfset')">
					主机管理
					<img class="showallbtn" src="../../img/showallbtn.png">
				</a>
				<ul class="childbut">
					<li>
						<a :class="{'menu-active':$route.path === '/defend/selfset'}" @click.prevent.stop="jumpTo('/defend/selfset')">主机备注</a>
					</li>
					<li>
						<a :class="{'menu-active': $route.path === '/defend/whitelist'}" @click.prevent.stop="jumpTo('/defend/whitelist')">主机白名单</a>
					</li>
				</ul>
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
				jumpTo: function(page) {
					this.$router.push(page)
				},
				showbutns: function() {
					var nowTime = new Date().getTime();
					var clickTime = $(this).attr("ctime");
					if( clickTime != 'undefined' && (nowTime - clickTime < 300)){
						return false;
					}else{
						$(this).attr("ctime",nowTime);
						this.isshow = !this.isshow
						$('.childbut').slideToggle(300);
						if(this.isshow) {
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
		min-height: 910px;
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
		padding-left: 78px;
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
		padding-left: 100px;
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