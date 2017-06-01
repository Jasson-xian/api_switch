<template>
	<ul class="filter"  @keydown.enter='search()'>
		<li>
			<img src="../../../../img/search.png" />
		</li>
		<li>
			<label>MAC地址：</label>
			<macinput :empty = "true" class="macIP-input"></macinput>
		</li>
		<li>
			<timeRang></timeRang>
		</li>
		<li>
			<button class="button button--aylen" @click='search()'>开始查找</button>
		</li>		
	</ul>
</template>
<script>
	import timeRang from 'components/libs/timeRang'
	import macinput from 'components/libs/macinput'	
	import formatTest from 'libs/formatTest'

	export default {
		props:{
			type:{
				type:String,
				required: true
			}
		},
		components: {
			timeRang,
			macinput
		},
		methods: {
			search: function() {				
				var sentdata = {
					type: this.type,						
				}
				var macVal = this.macVal('.macIP-input')
				var portVal = $('.seleport option:selected').val()
				var starttime = $('.starttime').val()
				var endtime = $('.endtime').val()
				if(macVal){
					sentdata.macIP = macVal.trim()	
				}
				if(portVal){
					sentdata.port = portVal
				}
				if(starttime){
					sentdata.starttime = starttime
				}
				if(endtime){
					sentdata.endtime =endtime
				} 
				sentdata.page = 1
				this.$emit('setData',sentdata)
				this.$emit('getData',sentdata)
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
		border-bottom: 1px dashed #ececec;		
	}
	li{
		display: inline-block;
	}
	select {
		width: 60px;
		border-radius: 5px;
		margin-left: 10px;
		padding: 2px 5px;
		vertical-align: middle;
	}
	
	.button {
		background: #ffae00;
		color: #ffffff;
		width: 80px;
		height: 25px;
		border-radius: 5px;
		margin-left: 80px;
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
</style>