<template>
	<ul class="filter"  @keydown.enter='search()'>
		<li>
			<img src="../../../../img/search.png" />
		</li>
		<li>
			<label>
				<span @click="labelType('ip')" :class="labtype=='ip'?'':'gray'"> IP </span>
				<span>|</span>
				<span  @click="labelType('mac')" :class="labtype=='mac'?'':'gray'"> MAC </span>：
			</label>
			<ipinput :empty = "true" v-if="labtype=='ip'" class="ip_input"></ipinput>
			<macinput :empty = "true" v-else-if="labtype=='mac'" class="mac_input"></macinput>
		</li>
		<li>
			<timeRang></timeRang>
		</li>
		<li>
			<button class='button button--aylen' @click='search()'>开始查找</button>
		</li>
	</ul>
</template>
<script>
	import timeRang from 'components/libs/timeRang'
	import ipinput from 'components/libs/ipinput'
	import macinput from 'components/libs/macinput'

	import formatTest from 'libs/formatTest'
	import systemService from 'services/systemService'
	
	export default {
		components: {
			timeRang,
			ipinput,
			macinput
		},
		data(){
			return{
				roadNum: [],
				labtype:'ip'
			}
		},
		mounted() {
			this.getRoad()
		},
		methods: {
			labelType(type){
               this.labtype = type
			},
			search: function() {
				this.$emit('setData')
				this.$emit('getData')		
			},
			testVal: function(ele, reg) {
				var test = new formatTest(ele, reg, true)
				return test.testFormat()
			},
			isEmpty: function(ele) {
                var test = new formatTest(ele)
			    test.isEmpty()
			},
			getRoad() {
				systemService.getRoadNum()
					.then((recvdata) => {
						recvdata = JSON.parse(recvdata)
						if(recvdata.success == true) {
							this.roadNum = recvdata.data
						}
					})
			}
		}
	}
</script>
<style scoped>
	.filter {
		height: 60px;
		display: flex;
		align-items: center;
		margin-bottom: 20px;
		border-bottom: 1px solid #ececec;	
	}
	
	li {
		display: inline-block;
	}
	
	img {
		margin-right: 10px;
	}
	
	select {
		width: 80px;
		height: 24px;
		border-radius: 5px;
		vertical-align: middle;
		padding-left: 5px;
	}
	
	label {
		width: 90px;
		text-align: right;
	}
	
	input {
		width: 180px;
		height: 25px;
		border-radius: 5px;
		padding: 0 10px;
		border: 1px solid #e8e8e8;
	}
	
	.button {
		background: #ffae00;
		color: #ffffff;
		width: 80px;
		height: 25px;
		border-radius: 5px;
		margin-left: 130px;
	}
	.gray{
		color: #B7B7B7;
	}
	span{
		cursor: pointer;
	}
</style>