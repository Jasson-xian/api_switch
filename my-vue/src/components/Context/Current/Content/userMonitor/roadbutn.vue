<template>
	<div class="buts">
		<button class="allBtn button button--aylen" v-on:click="alldetail(0)" :class="[road==0?'active':'nuactive']">全部</button>
		<span class="line"></span>
		<img v-show='roadNum>=17' class="leftbut" src="../../../../img/left.png" v-on:click='moveLeft()'>
		<div class="spanbut-wrap">
			<div class="spanbut">
				<button class="roadButn button button--aylen" v-for='item in roadNum' :class="[road==item?'active':'nuactive']" v-on:click='roaddetail(item)'>线路{{item}}</button>
			</div>
		</div>
		<img v-show='roadNum>=17' src="../../../../img/right.png" v-on:click='moveRight()' />
	</div>
</template>
<script>
	import systemService from 'services/systemService'
	export default {
		data() {
			return {
				Num: 0,
				roadNum: [],
				road:0
			}
		},
		created() {
			this.getRoad()
		},
		methods: {
			getRoad() {
				systemService.getRoadNum()
					.then((recvdata) => {
						recvdata = JSON.parse(recvdata)
						if(recvdata.success) {
							this.roadNum = recvdata.data
						}
					})
			},
			alldetail: function(road) {			
				this.road = road				
				this.$emit('setData')
				this.$emit('getData', road)
			},
			roaddetail: function(road) {
				this.road = road
				this.$emit('setData')
				this.$emit('getData', road)
				if(road >= 10) {
					this.moveRight()
				} else {
					this.moveLeft()
				}
			},
			moveLeft: function() {
				if(this.road >= 17) {
					this.Num--;
					if(this.Num <= 0) {
						this.Num = 0;
					}
					$(".spanbut").animate({
						'left': this.Num * (-64)
					}, 500)
				}
			},
			moveRight: function() {
				if(this.road >= 17) {
					this.Num++;
					if(this.Num >= 8) {
						this.Num = 8;
					}
					$(".spanbut").animate({
						'left': this.Num * (-64)
					}, 500)
				}
			}
		}
	}
</script>
<style scoped>
	.buts {
		height: 50px;
		line-height: 50px;
	}
	
	.spanbut-wrap {
		display: inline-block;
		width: 1044px;
		height: 50px;
		overflow: hidden;
		vertical-align: top;
		position: relative;
	}
	
	.spanbut {
		position: absolute;
		left: 0;
	}
	
	.button {
		width: 55px;
		height: 20px;
		border-radius: 5px;
		background: #69b6ff;
		color: #ffffff;
		margin: 0 5px;
	}
	.button:hover{
	    color: #ffffff;
     }
	.allBtn {
		margin-left: 0;
		height: 20px;
	}

	.nuactive {
		background: #e1f0ff;
		color: #122B40;
	}
	
	.active{
		background: '#69b6ff';
		color: '#ffffff' ;
	}
	
	img {
		cursor: pointer;
	}
	
	.line {
		height: 20px;
		border-left: 1px solid #E2E2E2;
		margin: 0 5px;
	}
</style>