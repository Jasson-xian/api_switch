<template>
	<div class="bg">	
		<div>
			<h3>网络实况</h3>
			<img src="../../../img/sweep.png" />
			<div class="text">
				共<span class="num">{{net_state.host}}</span>台真实主机在线，
				 <span  class="num">{{net_state.conns}}</span>个并发连接 。<br/>设备已开启保护
				<template v-if="time.d">
					<span>{{time.d}}</span>天{{!time.h ? '。' : ''}}
				</template>
				<template v-if="time.h">
					<span>{{time.h}}</span>小时{{!time.m ? '。' : ''}}
				</template>
				<template v-if="time.m">
					<span>{{time.m}}</span>分{{!time.s ? '。' : ''}}
				</template>
				<template v-if="time.s">
					<span>{{time.s}}</span>秒。
				</template>
			</div>
		</div>
		<safedomain :virtual="virtual" :show="show" ></safedomain>
	</div>
</template>
<script>
import safedomain from './Rank/safedomain.vue'

export default {
	props:{
		net_state:{
			type:Object,
			required:true
		},
		show:{
			type:Boolean,
			required:true
		}
	},
	data() {
		return {
			num:0,
			time: {},
			virtual: {}
		}
	},
	components: {
		safedomain
	},
	watch:{
		net_state:function(val){
			this.time=this.formatTime(val.uptime)
			this.virtual=val.virtual?val.virtual:{}
		}	
	},
	methods: {
		formatTime(date) {
			let now = (new Date()).getTime()
			let time = Math.ceil((now - Date.parse(date))/1000)
			if(time < 60) {
				return {s:time}
			}
			if(time >= 60 && time < 3600) {
				return {m:Math.floor(time/60),s:time % 60}
			}
			if(time >= 3600 && time < 24*3600) {
				return {h:Math.floor(time/3600),m:Math.floor(time%3600/60)}
			}
			if(time >= 24*3600) {
				return {d:Math.floor(time/24/3600),h:Math.floor(time%86400/3600)}
			}
		}
	}
}
</script>
<style scoped>
	.bg {
		background: #FFFFFF;
		margin-top: 20px;
		padding: 5px 20px;
		height: 237px;
		position: relative
	}

	h3 {
		line-height: 30px;	
		font-size: 14px;
		margin-left: 8px;	
	}
	img{
		margin-left: 20px;
		width:40px;
	}
	.text{
		display: inline-block;
		margin-left: 10px;
		line-height: 22px;
		vertical-align: bottom;
	}
	.text span {
		color: #448fec;
		margin: 5px;
	}
	
	.num {
		font-size: 24px;
		font-weight: 600;
	}
	
	
</style>