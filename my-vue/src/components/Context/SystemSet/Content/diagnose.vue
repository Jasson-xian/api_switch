<template>
	<div>
		<ping v-if='flag' v-on:traceRoutePage='traceRoutePage' 	:pingResult='pingResult' v-on:diagnose='diagnose'></ping>
		<traceRoute v-else v-on:pinkPage='pinkPage'  v-on:diagnose='diagnose' :traResult='traResult'></traceRoute>
		<reboot :status='status' :result = "result"></reboot>
		<fail :errorMessage='errorMessage'></fail>
	</div>
</template>
<script>
	 import systemService from 'services/systemService'
	 import ping from './changeSyspolt/ping'
     import traceRoute from './changeSyspolt/traceRoute'
	 import fail from './changeSyspolt/fail'
	 import reboot from './smallcomponent/reboot'
	 export default{
		 data(){
			 return{
				 flag:true,
				 pingResult:[],
				 traResult:[],
				 status:false,
				 result:'',
				 interval:'',
				 errorMessage:''
			 }
		 },
		 methods:{
			 pinkPage(msg){
				 this.flag=msg
				 this.traResult=[]
				 this.pingResult=[]
				 $(".rotate").hide()
				 clearInterval(this.interval)
			 },
			 traceRoutePage(msg){
				 this.flag=msg
				 this.traResult=[]
				 this.pingResult=[]
				 $(".rotate").hide()
				clearInterval(this.interval)
			 },
			 currentGet(setdata){
				 systemService.getNetDiagnose(setdata)
					.then((waitrecvdata) => {
						waitrecvdata = JSON.parse(waitrecvdata)
						if(waitrecvdata.success){
							if(setdata.oper=='waitping'){
								this.pingResult=waitrecvdata.data
								$('#pinkScroll').scrollTop( $('#pinkScroll')[0].scrollHeight );
								this.traResult=[]
							}else{
								this.traResult=waitrecvdata.data
								$('#tracerouteScroll').scrollTop( $('#tracerouteScroll')[0].scrollHeight )
								this.pingResult=[]
							}
							clearTimeout(this.interval)
							this.interval = setTimeout(() => this.currentGet(setdata), 1000)
						}else{
							$(".rotate").hide()
							clearInterval(this.interval)
						}
					},()=>{
					clearTimeout(this.interval)
					this.interval = setTimeout(() => this.currentGet(setdata), 1000)
				})
			 },
			 diagnose(msg){
					this.result=''
					var setdata={}
					if(msg.type=='ping'){
						setdata.oper=msg.type
						setdata.ip=msg.ip
						setdata.length=msg.length
						setdata.times=msg.times
					}else{
						setdata.oper=msg.type
						setdata.min_ttl=msg.min_ttl
						setdata.max_ttl=msg.max_ttl
						setdata.ip=msg.ip
					}
					systemService.getNetDiagnose(setdata)
						.then((recvdata) => {
							recvdata = JSON.parse(recvdata)
							if(recvdata.success) {
								$(".rotate").show()
								if(msg.type=='ping'){
									setdata.oper='waitping'
									this.currentGet(setdata)
								}else{
									setdata.oper='waittraceroute'
									this.currentGet(setdata)
								}
							}else{
								this.errorMessage=recvdata.errorMessage
								$("#fail").modal("show")
							}
						},()=>{
							$("#reboot").modal("show")
							this.result = "timeOut"
						})
				}	
		 },
		  components: {
            ping,
            traceRoute,
			reboot,
			fail
        },
		beforeDestroy(){
			$(".rotate").hide()
			clearInterval(this.interval)
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
		margin: 15px 20px 20px 20px;
	}
    .table-wrap p{
        margin:15px 0;
    }
    .button{
        background-color: #feae00;
        width: 80px;
        margin-right: 18px;
        border-radius: 3px;
        height: 20px;
        color: #fff;
    }
    input{
        border: 1px solid #e6e6e6;
        border-radius:5px;
        height: 20px;
        width: 174px; 
        margin-right: 10px;
    }
	thead {
		background: #69b6ff;
		color: #ffffff;
	}
    thead tr th {
        text-align: left;
        padding-left: 15px;
	}
    td:nth-child(odd) {
		text-align: center;
	}
    td:nth-child(even) {
		text-align: left;
        padding-left: 20px;
	}
	tr {
		height: 30px;
	}
    tbody tr{
        height: 40px;
    }
	th {
		color: #ffffff;
		border-right: 1px solid #69b6ff;
	}
    td {
        border-right: 1px solid #b2daff;
    }
    tr:last-child td {
        border-bottom: 1px solid #69b6ff;
    }
    tr td:first-child {
        border-left: 1px solid #69b6ff;
    }
    tr td:last-child {
        border-right: 1px solid #69b6ff;
    }
	tbody tr:nth-child(odd){
		background: #f0f8ff;
	}
    tbody tr:nth-child(even){
		
        background: #d2e9ff;
	}
</style>