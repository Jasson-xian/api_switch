<template>
	<div class="wrap">
		<div class="title">
			<h3>系统信息</h3>
		</div>
		<div class="table-wrap">
			<table>
				<thead>
					<tr>
						<th colspan="4">内容</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td style="width: 100px;">硬件平台：</td>
						<td style="width: 500px;">{{acrt.model ? acrt.model : '-'}}</td>
						<td style="width: 100px;">系统版本：</td>
						<td style="width: 500px;">{{ sysVerison }}</td>
					</tr>
					<tr>
						<td style="width: 100px;">在线节点：</td>
						<td style="width: 500px;">{{ onlineNode }}</td>
						<td style="width: 100px;">运行时间：</td>
						<td style="width: 500px;">{{ runTime }}</td>
					</tr>
					<tr>					
						<td style="width: 100px;">序 列 号：</td>
						<td style="width: 500px;">{{acrt.device_id ? acrt.device_id : '-'}}</td>
						<td style="width: 100px;">系统时间：</td>
						<td style="width: 500px;">{{ systime }}</td>
					</tr>
				</tbody>
			</table>
		</div>
        <div id="dtBox"></div>
	</div>
</template>
<script>
	import systemService from 'services/systemService'
	export default {
		created() {
			this.getsysinfo()
			this.intervalid = setInterval(() => this.getsysinfo(),1000)
		},
        mounted() {
			this.getsysinfo()
        },
        data(){
            return {
                hardware:"",
                sysVerison:"",
                onlineNode:0,
                runTime:"",
                serialNumber:"",
                systime:""
            }
        },
		computed:{
			acrt:function(){
				return this.$store.state.cert
			}
		},
		beforeDestroy() {
			clearInterval(this.intervalid)
		},
        methods: {
			getsysinfo(){
				// systemService.getSysinfo()
				// .then((recvdata) => {
				// 	recvdata = jQuery.parseJSON(recvdata)
				// 	if(recvdata.success){
					let recvdata = {"success":true,"data":{"cpu":"0.051","memory":"0.486","disk":{"total":58476700,"used":1099692},"version":"2.0","time":"2017-06-01 09:55:10","online_node":"2811","start":"2017-05-31 21:02:36"}}
						this.sysVerison = recvdata.data.version
						this.systime = recvdata.data.time
						this.onlineNode = recvdata.data.online_node
						this.serialNumber = recvdata.data.serial
						recvdata.data.serial == "" ? this.serialNumber = "暂未获取" : this.serialNumber = recvdata.data.serial
						recvdata.data.hw_ver == null ? this.hardware = "-" : this.hardware = recvdata.data.hw_ver
						this.hardware == "SOHO" ? this.hardware = "幻境SOHO" : this.hardware = "幻境"+this.hardware+"系"
						this.runTime = this.runningTime(recvdata.data.start)
					// }
				// })
			},
            runningTime(starttime) {
				var start  = (new Date(starttime)).valueOf()
				var now = (new Date()).valueOf()
                if( start <= now ){
					var running = now - start
					return this.timestamp2time(running)
				}
            },
			timestamp2time(stamp) {
				if(stamp < 3600000){
					var hours = parseInt(stamp/(1000 * 60 * 60))
					var remain = stamp%(1000 * 60 * 60)
					var minutes = parseInt(remain/(1000 * 60 ))
					remain = remain%(1000 * 60 )
					var secounds = parseInt(remain/1000)
					return minutes+"分钟"+secounds+"秒"
				}
				var hours = parseInt(stamp/(1000 * 60 * 60))
				var remain = stamp%(1000 * 60 * 60)
				var minutes = parseInt(remain/(1000 * 60 ))
				remain = remain%(1000 * 60 )
				var secounds = parseInt(remain/1000)
				return hours+"小时"+minutes+"分钟"+secounds+"秒"
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
    thead tr th {
        text-align: left;
        padding-left: 15px;
		height: 30px;
	}
    td:nth-child(odd) {
		text-align: center;
	}
    td:nth-child(even) {
		text-align: left;
        padding-left: 20px;
	}
	tbody tr {
		height: 35px;
	}
	th {
		color: #ffffff;
		border-right: 1px solid #69b6ff;
	}
    
	thead tr th:first-child,
	tbody tr td:first-child{
		border-left: 1px solid #69b6ff;
	}
	thead tr th:last-child,
	tbody tr td:last-child{
		border-right: 1px solid #69b6ff;
	}
	tbody tr td {
        border-left: 1px solid #b2daff;
    }
    tr:last-child td {
        border-bottom: 1px solid #69b6ff;
    }
    tr td:last-child {
        border-right: 1px solid #69b6ff;
    }
	tbody tr:nth-child(odd){
		background: #d2e9ff;
	}
    tbody tr:nth-child(even){
		background: #f0f8ff;
	}
</style>