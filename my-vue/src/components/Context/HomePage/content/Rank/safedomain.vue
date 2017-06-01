<template>
	<div style="position: relative">
		<loadSpan style="margin-top: 60px" v-show='!show'></loadSpan>
		<h3>全息伪装</h3><span class="line"></span>
		<transition name="fade">
		<ul class="domain" v-show='show'>
			<li v-for='(item,index) in virtual'>
				<img v-if='item!=null' src="../../../../img/greendot.png" />
				<img v-else src="../../../../img/reddot.png" />
				<span class="name">安全域&nbsp;{{index>=10?index:'0'+index}}:</span>
				<span class="num">{{'-------'.concat(item!=null ? item.count :0).slice(-7)}}</span>
			</li>
		</ul>
		</transition>
	</div>
</template>
<script>
import loadSpan from 'components/libs/loadSpan'
export default {
	props: {
		virtual:[Array, Object],
		show:{
			type:Boolean,
			required:true
		}
	},
	components:{
		loadSpan	
	}
}
</script>
<style scoped>
	.domain {
		height: 105px;
		overflow-y: auto;
		width: 100%;
	}	
	.domain li {
		display: inline-block;
		line-height: 22px;
		margin-left: 25px;
	}
	.domain li:nth-child(3n+1) {
       margin-left: 10px;
	}
	
	span {
		display: inline-block;
	}
	h3 {
		line-height: 30px;
		display: inline-block;
		margin-left: 10px;
	}
	.line {
		display: inline-block;
		width: 350px;
		border: 1px solid #e5e5e5;
		vertical-align: middle;
		margin-left: 20px;
	}
	.name {
		margin-left: 2px;
	}	
	.num {
		width:50px;
		text-align: right;
	}
	/*滚动条样式*/
	
	::-webkit-scrollbar {
		width: 8px;
		height: 100px;
	}
	/* 滚动槽 */
	
	::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		border-radius: 10px;
	}
	/* 滚动条滑块 */
	
	::-webkit-scrollbar-thumb {	
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.1);
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
	}
	
	::-webkit-scrollbar-thumb:window-inactive {
		height: 30px;
		background: rgba(138, 136, 136, 0.4);
	}
</style>