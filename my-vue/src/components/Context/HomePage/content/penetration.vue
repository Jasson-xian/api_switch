<template>
	<div class="bg-color">
		<loadSpan v-show='!show'></loadSpan>
		<div id="headbutn">
			<button :class="{active:actived==1}" class="button button--aylen"  @click='toactive(1)'>渗透攻击</button>
			<span class="broder"></span>
			<button :class="{active:actived==2}" class="button button--aylen"  @click='toactive(2)'>前五活跃终端</button>
		</div>	
		<transition name='fade'>
			<div v-if = 'show'>		
				<div v-if='actived==1'>
					<permeate :attackTable="attackTable"></permeate>
				</div>
				<div v-else>
					<div class="rank-header">
						<img src="../../../img/bulesquare.png" /><span style="padding: 0 5px;">上行</span>
						<img src="../../../img/greensquare.png" /><span style="padding: 0 5px;">下行</span>
					</div>
					
					<rankpic :activeTable="activeTable" class='rankpic'></rankpic>
					<ranktable :activeTable="activeTable" class='ranktable'></ranktable>
				</div>
					
			</div>	
		</transition>	
	</div>
</template>
<script>
import rankpic from './Rank/rankpic.vue'
import ranktable from './Rank/ranktable.vue'
import permeate from './Rank/permeate.vue'
import indexService from 'services/indexService'
import loadSpan from 'components/libs/loadSpan'
export default {
	props:{
		attack_info:{
			type:Object,
			required:true
		},
		show:{
			type:Boolean,
			required:true
		}
	},
	computed:{
		attackTable:function(val){
			return this.attack_info.attack
		},
		activeTable:function(val){
			return this.attack_info.active_mac
		}
	},
	data() {
		return {
			actived: 1,
			attack: true
		}
	},
	methods: {
		toactive: function(n) {
			this.actived = n
		}	
	},
	components: {
		rankpic,
		ranktable,
		permeate,
		loadSpan
	}
}
</script>
<style scoped>
	.bg-color {
		background: #ffffff;
		height: 327px;
		margin-top: 20px;
		position: relative;
		padding: 10px 28px;
	}
	
	#headbutn {
		font-size: 12px;
		position: absolute;
		top: 10px;
	}
	
	.button {
		padding: 0 7px;
		height: 18px;
		line-height: 18px;
		border-radius:3px;
		background: #e5e5e5;		
		font-size: 12px;
		vertical-align: middle;
		padding-bottom:1px;
		box-sizing: border-box;
	}
	
	.broder {
		border-left: 1px solid #c4c4c4;
		height: 16px;
		margin: 0 5px;
		display: inline-block;
		vertical-align: middle;
	}
	
	.active {
		background: #8c97cb;
		color: #FFFFFF;
	}
	/*前十排名*/
	
	.rank-header {
		/*text-align: right;*/
		height: 24px;
		width: 100%;
		padding-left: 180px;
	}
	
	
	
	.rankpic,
	.ranktable {
		display: inline-block;
		vertical-align: top;
	}
</style>