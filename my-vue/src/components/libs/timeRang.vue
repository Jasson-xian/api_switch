<template>
	<div>
		<label>时间范围：</label>
		<input class="time starttime startDateTime1" type="text" data-field="datetime" data-startend="start" data-startendelem=".endDateTime1 " readonly placeholder="2017-03-3 11:40">
		<span class="line"></span>
		<input class="time endtime endDateTime1" type="text" data-field="datetime" data-startend="end" data-startendelem=".startDateTime1" readonly placeholder="2017-03-3 15:40">
	</div>
</template>
<script>
	export default {
		mounted() {
			$("#dtBox").DateTimePicker({
				dateTimeFormat: "yyyy-MM-dd HH:mm",
			});
		},
		methods: {
			nowTime: function(preNum) {
				var date = new Date();
				var now = "";
				var Month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)
				var Days = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
				var Hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
				var Minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
				var Seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
				now = date.getFullYear()-preNum + "-" + Month + "-" + Days + " " + Hours + ":" + Minutes + ":" + Seconds;
				return now;
			}
		}
	}
</script>
<style scoped>
	div {
		display: inline-block;
	}
	
	label {
		width: 90px;
		text-align: right;
	}
	
	input {
		width: 180px;
		background: #e8e8e8;
		height: 25px;
		border-radius: 5px;
		padding-left: 35px;
		box-sizing: border-box;
	}
	
	.time {
		background-color: #FFFFFF;
		background-image: url(../img/rili.png);
		background-repeat: no-repeat;
		background-size: contain;
		border: 1px solid #e8e8e8;
	}
	
	.line {
		width: 10px;
		display: inline-block;
		border-bottom: 1px solid #E0E0E0;
		margin: 0 5px;
		vertical-align: middle;
	}
</style>