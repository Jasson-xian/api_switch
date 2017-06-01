<template>
	<div class="bg-color">
		<div id="headline">
			<div>
				<span class="status">网络状况</span><span v-bind:class="[issafe?'green':'red']">{{status}}</span>
			</div>
			<div>
				<span>威胁累计发生次数<span class="num">{{attack_count.total?attack_count.total:0}}</span>次</span>
				<button @click="goDetail" class="button button--aylen"  data-toggle="modal" data-target="#myModal">查&nbsp;看</button>
			</div>
		</div>
		<div class="animation">
			<img v-if='issafe' class="animationbg" src="../../../img/animationbg.png" />
			<img v-else class="animationbg" src="../../../img/redbg.png" />
			<div class="dots"  v-if='issafe'>
				<img  class="dot" v-for='item in 7' src="../../../img/dot1.gif" />
			</div>
			<div class="dots" v-else>
				<img  class="dot" v-for='item in 7' src="../../../img/reddot.gif" />
			</div>
			<img v-if='issafe' class="swipe" src="../../../img/swipe.png" />
			<img v-else class="swipe" src="../../../img/redswipe.png" />
		</div>	
	</div>
</template>
<script>
export default {
	props:{
		attack_count:{
			type:Object,
			required:true
		}
	},
	data() {
		return {
			issafe: true
		}
	},
	methods: {
		goDetail () {
			this.$router.push('/logManage/log')
		}
	},
	watch:{
		attack_count:function(val){
			this.issafe = val.is_save
		}
	},
	computed: {
		status: function() {			
			if(this.issafe) {
				return '安全'
			} else {
				return '危险'
			}
		}
	},
}
</script>
<style scoped>
	.bg-color {
		background: #ffffff;
		height: 237px;
		margin-top: 20px;
	}
	
	#headline {
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		padding: 5px 28px;
	}
	
	#headline div {
		display: inline-block;
	}
	
	.status {
		margin-right: 10px;
	}
	
	.green {
		color: #32c149;
	}
	
	.red {
		color: #a22d2d;
	}
	
	#headline div:last-child {
		float: right;
	}
	
	.num {
		color: #e7000e;
		margin-left: 15px;
	}
	
	.button {
		width: 50px;
		height: 18px;
		line-height: 18px;
		background: #65ccf0;
		border-radius: 3px;
		color: #FFFFFF;
		margin-left: 15px;
		padding-bottom:1px;
		font-size: 13px;
		box-sizing: border-box;
	}
	
	.animation {
		margin-top: 5px;
		width: 100%;
		height: 202px;
		position: relative;
	}
	
	.animationbg {
		width: 100%;
		position: absolute;
		top: 0;
	}
	
	.swipe {
		animation: swiping 2.5s linear infinite;
	}
	
	@keyframes swiping {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(635px);
		}
	}
	
	@-moz-keyframes swiping {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(635px);
		}
	}
	
	@-ms-keyframes swiping {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(635px);
		}
	}
	
	@-webkit-keyframes swiping {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(635px);
		}
	}
	/*dots*/
	
	.dots {
		position: absolute;
		top: 0;
	}
	
	.dot {
		position: absolute;
	}
	
	.dot:nth-child(1) {
		width: 15px;
		top: 77px;
		left: 135px;
	}
	
	.dot:nth-child(2) {
		top: 100px;
		left: 208px;
	}
	
	.dot:nth-child(3) {
		width: 20px;
		top: 118px;
		left: 270px;
	}
	
	.dot:nth-child(4) {
		top: 63px;
		left: 340px;
	}
	
	.dot:nth-child(5) {
		top: 132px;
		left: 400px;
	}
	
	.dot:nth-child(6) {
		width: 15px;
		top: 90px;
		left: 491px;
	}
	
	.dot:nth-child(7) {
		width: 18px;
		top: 118px;
		left: 545px;
	}
</style>