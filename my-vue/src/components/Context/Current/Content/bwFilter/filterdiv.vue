<template>
	<ul class="filter">
		<li>
			<img src="../../../../img/search.png" />
		</li>
		<li>
			<label>
				<span @click="labelType('ip')" :class="labtype=='ip'?'':'gray'"> IP </span>
				<span>|</span>
				<span  @click="labelType('mac')" :class="labtype=='mac'?'':'gray'"> MAC </span>：
			</label>
			<ipinput v-if="labtype=='ip'" :empty = "true"></ipinput>
			<macinput v-else-if="labtype=='mac'" :empty = "true"></macinput>
		</li>
		<li>
			<timeRang></timeRang>
		</li>
		<li>
			<button @click='search()' class="sreach button button--aylen ">开始查找</button>
		</li>
	</ul>
</template>
<script>
	import timeRang from 'components/libs/timeRang'
	import formatTest from 'libs/formatTest'
    import ipinput from 'components/libs/ipinput'
	import macinput from 'components/libs/macinput'
	export default {
		components: {
			timeRang,
			ipinput,
			macinput			
		},
		data(){
               return{
				   labtype:'ip'
			   }
			},
		methods: {	
			labelType(type){
               this.labtype = type
			},
			search: function() {			
				this.$emit('setdata')
				this.$emit('getData')
			},
			testVal: function(ele, reg) {
				var test = new formatTest(ele, reg, true)
				return test.testFormat()
			},
			isEmpty: function(ele) {
				var test = new formatTest(ele)
				test.isEmpty()
			}
		}
	}
</script>
<style scoped>
	.filter {
		height: 60px;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #ececec;
		margin-bottom: 20px;
	}
	
	.button {
		background: #ffae00;
		color: #ffffff;
		width: 80px;
		height: 25px;
		border-radius: 5px;
		margin-left: 150px;
	}
	
	li {
		display: inline-block;
	}
	
	label {
		width: 90px;
		text-align: right;
	}
	
	input {
		/*width: 180px;*/
		height: 25px;
		border-radius: 5px;
		padding: 0 10px;
		border: 1px solid #e8e8e8;
	}
	.gray{
		color: #B7B7B7;
	}
	span{
		cursor: pointer;
	}

</style>