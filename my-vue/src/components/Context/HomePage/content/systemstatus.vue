<template>
	<div class="bg">
		<loadSpan v-show='!show'></loadSpan>
		<div>
			<h3>系统状态</h3>
			<button @click="goDetail" class="button button--aylen" >详&nbsp;情</button>
		</div>
		<transition name='fade'>
		<div v-show='show'>
		<div>
			<div class="cpu">
				<canvas id="cpu" width="150" height="82">您的浏览器不支持canvas元素,请下载新的浏览器</canvas>
				<p>cpu利用率</p>
			</div>
			<div class="memory">
				<canvas id="memory" width="150" height="82">您的浏览器不支持canvas元素,请下载新的浏览器</canvas>
				<p>内存利用率</p>
			</div>
		</div>
		<div>
			<table>
				<tr>
					<td>
						<span>硬件平台：</span>{{acrt.model ? acrt.model : '-'}}</span>
					</td>
					<td>
						<span>系统版本：</span><span>{{sys_state.version ? sys_state.version : '-'}}</span>
					</td>
				</tr>
				<tr>
					<td>
						<span>在线节点：</span><span>{{sys_state.online_node ? sys_state.online_node : '-'}}</span>
					</td>
					<td>
						<span>运行时间：</span><span>{{formatTime(sys_state.start) ? formatTime(sys_state.start) : '-'}}</span>
					</td>
				</tr>
				<tr>
					<td>
						<span>序列号：</span><span>{{acrt.device_id ? acrt.device_id : '-'}}</span>
					</td>
					<td>
						<span>系统时间：</span><span>{{nowtime ? nowtime : '-'}}</span>
					</td>
				</tr>
			</table>
		</div>	
		</div>
		</transition>
	
	</div>
</template>
<script>
import loadSpan from 'components/libs/loadSpan'
export default {
	components:{
		loadSpan
	},
	data(){
		return{
			nodenum:'',
			runtime:'115小时20分钟',
			serialNum:'',
			nowtime: '23:59:59',
			sys_version: '0.0',
			hw_ver: '0',
			intervalid: null,
			timeId: null
		}
	},
	computed:{
		acrt:function(){
			return this.$store.state.cert
		}
	},
	props:{
		sys_state:{
			type:Object,
			required:true
		},
		show:{
			type:Boolean,
			required:true
		}
	},
	methods: {
		formatTime(date) {
			let now = (new Date()).getTime()
			let time = Math.ceil((now - Date.parse(date))/1000)
			if(time < 60) {
				return time + '秒'
			}
			if(time >= 60 && time < 3600) {
				return Math.floor(time/60) + '分' + (time % 60) + '秒'
			}
			if(time >= 3600 && time < 24*3600) {
				return Math.floor(time/3600) + '小时' + Math.floor(time%3600/60) + '分'
			}
			if(time >= 24*3600) {
				return Math.floor(time/24/3600) + '天' + Math.floor(time%86400/3600) + '小时'
			}
		},
		drawMeter(el,val,stroke) {
			let deg = 11*Math.PI/9/100
			let ctx = el.getContext('2d')
			ctx.clearRect(0,0,el.width,el.height)
			ctx.save()
			ctx.font = "normal normal 900 50px 宋体,微软雅黑"
			ctx.fillStyle = stroke
			if(val < 10) {
				ctx.fillText(val,63,80)
			}else if( val < 100) {
				ctx.fillText(val,50,80)
			}else {
				ctx.fillText(val,37,80)
			}
			ctx.restore()

			ctx.save()
			ctx.beginPath()
			ctx.lineWidth = 10
			ctx.strokeStyle = stroke
			ctx.arc(75,75,70,8/9*Math.PI,8/9*Math.PI + val*deg)
			ctx.stroke()
			ctx.restore()
		},
		goDetail() {
			this.$router.push('/current')
		}
	},
	watch: {
		sys_state:function(val){
			let cpuEl = document.getElementById("cpu")
			this.drawMeter(cpuEl,Math.ceil(val.cpu * 100),"#6a9cf8")
			let memEl = document.getElementById("memory")
			this.drawMeter(memEl,Math.ceil(val.memory*100),"#56ba89")
			this.nowtime=val.time.split(' ')[1]
		}
	}
}
</script>
<style scoped>
	.bg {
		background: #FFFFFF;
		height: 327px;
		padding: 5px 28px;
		margin-top: 20px;
	}
	
	h3 {
		height: 30px;
		line-height: 30px;
		display: inline-block;
		font-size: 14px;
	}
	
	.button {
		width: 50px;
		height: 18px;
		line-height: 18px;
		background: #65ccf0;
		border-radius: 3px;
		color: #FFFFFF;
		float: right;
		margin-top: 10px;
		padding-bottom:1px;
		box-sizing: border-box;
	}
	
	.cpu,
	.memory {
		display: inline-block;
		width: 150px;
		height: 100px;
		background: url(../../../img/dial.png) no-repeat;
		background-size: contain;
		margin-left: 20px;
		margin-top: 30px;
	}
	
	.memory {
		margin-left: 90px;
	}
	/*基本信息*/
	p {
		text-align: center;
		margin: 30px 0;
		
	}
	table{
		border: 1px solid #eeeeee;
		line-height: 20px;	
		display: inline-block;
	    padding: 10px;	
	    margin-top: 30px;
	}
	td{
		width: 300px;	
	}
	td span:nth-child(1){
		display: inline-block;
		width: 70px;
		color: #a9a9a9;
	}
</style>