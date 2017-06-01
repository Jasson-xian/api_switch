<template>
	<div class="wrap">
		<div class="title">
			<h3>时间/日期</h3>
		</div>
		<div class="table-wrap">
			<table>
				<thead>
					<tr>
						<th style="width: 380px;">内容</th>
						<th style="width: 640px;">时间和日期</th>
						<th style="width: 175px;">操作</th>
					</tr>
				</thead>
			
				<tbody>
					<tr>
						<td style="width: 380px;">当前时间：</td>
						<td style="width: 640px;">{{ nowtime }}</td>
						<td style="width: 175px;" rowspan="2">
							<button @click="syncTime()" class="butn button button--aylen">立即同步</button>
							</td>
					</tr>
					<tr>
						<td style="width: 380px;">系统时区：</td>
						<td style="width: 175px;">
							<select class="time-zone">
								<option>(GMT+08:00) 北京,重庆,香港特别行政区,乌鲁木齐</option>
							</select>
						</td>
					</tr>
					<tr>					
						<td style="width: 380px;">系统日期：</td>
						<td style="width: 640px;">
							<div id="systime">{{ systime }}</div>
							<div class="tdchild">
								 <span class="tag">调整：</span>
								 <input id="altertime" class="time" type="text" data-field="datetime" readonly />
							</div>
						</td>
						<td style="width: 175px;" rowspan="2" @click="setsystem()" ><button class="butn button button--aylen">确认</button></td>
					</tr>
					<tr>					
						<td style="width: 380px;">SNTP：</td>
						<td style="width: 640px;">
							<span><input class="checkbox" v-model="check" type="checkbox" />自动与SNTP服务同步</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
        <div id="dtBox"></div>
		<success></success>
        <fail></fail>
	</div>
</template>
<script>
	import systemService from 'services/systemService'
	import success from './tags/success.vue'
    import fail from './tags/fail.vue'
	export default {
		components: {
			success,
			fail
		},
		created() {
			this.getData()
			this.intervalid = setInterval(() => this.getData(),1000)
		},
		mounted(){
			$("#dtBox").DateTimePicker({
                dateTimeFormat: "yyyy-MM-dd HH:mm:ss",
                dateFormat: "yyyy-MM-dd",
                timeFormat: "HH:mm:ss",
                maxDateTime:this.nowtime
            });
		},
        data(){
            return {
                nowtime:"Loading...",
                systime:"Loading...",
                check:false
            }
        },
		beforeDestroy() {
			clearInterval(this.intervalid)
		},
        methods: {
			syncTime(){
				$("#altertime").val(this.nowTime(1))
				this.setsystem()
			},
			getData(){
				this.nowTime(0)
				this.getsystime()
			},			
            nowTime(pree) {//pree 为一秒误差值
				var date = new Date();
				var now = "";
				var Month = (date.getMonth() + 1) < 10 ? "0"+(date.getMonth() + 1) : (date.getMonth() + 1) 
				var Days = date.getDate() < 10 ? "0"+date.getDate() : date.getDate() 
				var Hours = date.getHours() < 10 ? "0"+date.getHours() : date.getHours() 
				var Minutes = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes() 
				var Seconds = (date.getSeconds() + pree) < 10 ? "0"+(date.getSeconds() + pree) : (date.getSeconds() + pree)
				now = date.getFullYear() + "-" + Month + "-" + Days + " " + Hours + ":" + Minutes + ":" + Seconds;
				this.nowtime = now
				return now
            },
			getsystime(){
				systemService.getTime()
				.then((recvdata) => {
					recvdata = jQuery.parseJSON(recvdata)
					if(recvdata.success) {
						this.systime =recvdata.data.time
					}
				})
       		},
			setsystem(){
				if($("#altertime").val() == ""){
					return false
				}else{
					systemService.setTime($("#altertime").val())
					.then((recvdata) => {
						recvdata = jQuery.parseJSON(recvdata)
						if(recvdata.success) {
							$('#success').modal('show')
						}else{
							$('#fail').modal('show')
						}
					})
				}
			}
		}		
	}   
</script>
<style scoped>
	.wrap {
		margin: 30px 0 0 30px;
		padding-bottom: 10px;
		background: #FFFFFF;
	}
	
	.title {
		background: #333333;
		color: #ffffff;
		height: 30px;
		padding-left: 20px;
	}
	
	h3 {
		line-height: 30px;
	}
	.table-wrap{
		margin: 20px;
	}
	thead {
		background: #69b6ff;
		color: #ffffff;
	}
    thead tr th:last-child {
        text-align: center;
		border-right: 1px solid #69b6ff;
	}
	thead tr th:nth-child(2) {
        padding-left: 75px;
	}
	thead tr {
		height: 30px;
	}
	tbody tr {
		height: 35px;
	}
	tr:last-child td {
		border-bottom: 1px solid #69b6ff;
	}
	tbody tr td:last-child {
		border-right: 1px solid #69b6ff;
	}
	tbody tr:nth-child(1) td:last-child,
	tbody tr:nth-child(3) td:last-child {
			background: #FFFFFF
	}
	th,
	td {
		text-align: center;
	}
    th:nth-child(1){
        text-align: right;
        padding-right: 35px;
    }
	td:nth-child(1){
		text-align: right;
        padding:0 25px;
        border-right: 1px solid #b2daff;
	}
	th:nth-child(2),
	td:nth-child(2){
		text-align: left;
        padding-left: 73px;
		border-right: 1px solid #69b6ff;
	}	
    tr:nth-child(1) td:last-child{
		border-bottom:none;
	}	
    tr:nth-child(3) td:last-child{
		border-bottom:1px solid #69b6ff;
	}	
	th {
		color: #ffffff;
	}
    tr td:nth-child(1) {
        border-left: 1px solid #69b6ff;
    }
	.butn {
		width: 60px;
		height: 20px;
		color: #FFFFFF;
		border-radius: 5px;
		background: #f5b72e;
	}
	tbody tr:nth-child(odd){
		background: #d2e9ff;
	}
    tbody tr:nth-child(even){
		background-color: #f0f8ff;
	}
	#systime{
		display: inline-block;
		vertical-align: middle;
		width: 120px;
	}
	#altertime{
		margin-left: 20px;
	}
    .time-zone{
        border: 1px solid #e6e6e6;
        border-radius:5px;
        height: 25px;
		background: #ffffff;
    }
    .time {
		background-color: #FFFFFF;
		background-image: url(../../../img/rili.png);
		background-repeat: no-repeat;
		background-size: contain;
		border: 1px #e8e8e8;
        border-radius: 5px;
        text-align: center;
        height: 25px;
        width: 190px;
		padding-left: 20px;
	}
    .checkbox{
        display: inline-block;
        margin-top: -2px;
        margin-right: 10px;
		height: 12px;
		width: 12px;
    }
	.tdchild{
		display: inline-block;
		border-left: 1px solid #b2daff;
		margin-left: 80px;
	}
	.tag{
		padding-left: 30px;
		vertical-align: middle;
	}
</style>