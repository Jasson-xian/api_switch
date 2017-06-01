<template>
	<ul class="filter" @keydown.enter='search()'>
		<li>
			<img src="../../../../img/search.png" />
			<select class="seleport" v-on:change="search()">
				<option value="">全部</option>
				<option v-bind:value="item" v-for='item in roadNum'>线路{{item}}</option>
			</select>
		</li>
		<li>
			<label>MAC地址：</label>
			<macinput :empty = "true" class="macIP-input"></macinput>
		</li>
		<li>
			<timeRang></timeRang>
		</li>
		<li>
			<button class="button button--aylen"  @click='search()'>开始查找</button>
		</li>
	</ul>
</template>
<script>
	import timeRang from 'components/libs/timeRang'
	import macinput from 'components/libs/macinput'	
	import formatTest from 'libs/formatTest'

	import systemService from 'services/systemService'
	
	export default {
		props: {
			type:{
				type: String,
				required: true
			}
		},
		components: {
			timeRang,
			macinput
		},
		data(){
			return{
				roadNum: []
			}
		},
		mounted() {
			this.getRoad()
		},
		methods: {			
			search: function() {			
				var sentdata = {
					type:this.type,
				}
				var macVal =this.macVal('.macIP-input') 
				var portVal = $('.seleport option:selected').val()
				var starttime = $('.starttime').val()
				var endtime = $('.endtime').val()
				if(macVal){
					sentdata.mac = macVal.trim()	
				}
				if(portVal){
					sentdata.groupid = portVal
				}
				if(starttime){
					sentdata.starttime = starttime
				}
				if(endtime){
					sentdata.endtime =endtime
				} 
				sentdata.page =1
				this.$emit('setData')
				this.$emit('getData',sentdata)				
			},
			getRoad() {
				systemService.getRoadNum()
					.then((recvdata) => {
						recvdata = JSON.parse(recvdata)
						if(recvdata.success == true) {
							this.roadNum = recvdata.data
						}
					})
			},
			macVal(ele){
               let macVal = ($(ele+' .mac_a').val()?$(ele+' .mac_a').val():"")+
				            ($(ele+' .mac_b').val()?':'+$(ele+' .mac_b').val():"")+
							($(ele+' .mac_c').val()?':'+$(ele+' .mac_c').val():"")+
							($(ele+' .mac_d').val()?':'+$(ele+' .mac_d').val():"")+
							($(ele+' .mac_e').val()?':'+$(ele+' .mac_e').val():"")+
							($(ele+' .mac_f').val()?':'+$(ele+' .mac_f').val():"")
			   return macVal
			}
		}
	}
</script>
<style scoped>
	.filter {
		height: 60px;
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		border-bottom: 1px dashed #ececec;	
	}
	li{
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
		border: 1px solid  #e8e8e8;
		height: 25px;
		border-radius: 5px;
		padding: 0 10px;
	}
	
	.button {
		background: #ffae00;
		color: #ffffff;
		width: 80px;
		height: 25px;
		border-radius: 5px;
		margin-left: 80px;
	}
</style>