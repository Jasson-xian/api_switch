<template>

	<div class="container content-wrapper" >
		<div  class="home-wrap" :class="[screen_with == 'small'?'small_content':screen_with == 'mid'?'mid_content':'']">
			<div class="row">
				<div class='col-lg-7 col-md-7 col-sm-7 '>
					<networkstatus :attack_count='attack_count'></networkstatus>
					<penetration :attack_info='attack_info' :show='show'></penetration>
					<portstatus :eths='eths' :show='show'></portstatus>
				</div>
				<div class='right col-lg-5 col-md-5 col-sm-5'>
					<networklive :net_state='net_state' :show='show'></networklive>
					<systemstatus :sys_state='sys_state' :show='show'></systemstatus>
					<eventlog :event_log ='event_log' :show='show'></eventlog>
				</div>
			</div>
		</div>
	</div>

</template>
<script>	
import indexService from 'services/indexService'
import networkstatus from './content/networkstatus.vue'
import penetration from './content/penetration.vue'
import portstatus from './content/portstatus.vue'
import networklive from './content/networklive.vue'
import systemstatus from './content/systemstatus.vue'
import eventlog from './content/eventlog.vue'
export default {
	created() {
		this.getScreenWidth()
		this.loadData()
		var _this = this
	      $(window).resize(function(){
	      	  _this.getScreenWidth()
	      })
	},
	data(){
		return{
			totalData:{},
			intervalid:null,
			event_log:[],
			eths:[],
			net_state:{},
			attack_info:{},
			sys_state:{},
			attack_count:{},
			show:false,
			clearTimeout:false
		}
	},
	methods:{
		getScreenWidth() {
      	let  screen_with = $(window).width()
      	if(screen_with>1470){
      		this.screen_with = 'big'
      	}else if(screen_with<=1470&&screen_with>1280){
      		this.screen_with = 'mid'
      	}else{
      		this.screen_with = 'small'     	
      	}
      },
		loadData:function(){
			// indexService.getState()
			// .then((recvdata) => {
			// 	recvdata = JSON.parse(recvdata)
			// 	if(recvdata.success == true) {
				let recvdata = {"success":true,"data":{"attack_count":{"total":72564,"is_save":true},"attack_info":{"attack":[{"mac":"2c:53:4a:03:07:6c","count":"3","type":"1","phy_port":"1","response_port":"-1","response_ip":"-1","end_time":"2017-05-24 15:59:54","block":false,"desc":""},{"mac":"da:a3:78:72:f3:77","count":"88","type":"2","phy_port":"1","response_port":"-1","response_ip":"-1","end_time":"2017-05-23 09:38:41","block":false,"desc":""},{"mac":"2c:57:31:16:fb:b2","count":"4752","type":"1","phy_port":"2","response_port":"-1","response_ip":"-1","end_time":"2017-05-18 11:23:59","block":false,"desc":""},{"mac":"90:c7:d8:8c:bc:b0","count":"118","type":"1","phy_port":"2","response_port":"-1","response_ip":"-1","end_time":"2017-05-17 18:08:44","block":false,"desc":""}],"active_mac":[{"mac":"e4:f8:9c:36:5a:d8","rx":5018,"tx":1372,"con":129,"desc":""},{"mac":"74:df:bf:54:94:4d","rx":230,"tx":337,"con":41,"desc":""},{"mac":"74:df:bf:53:c0:d5","rx":126,"tx":262,"con":127,"desc":""},{"mac":"da:a3:78:72:f3:77","rx":102,"tx":266,"con":38,"desc":""},{"mac":"dc:53:60:33:3f:d8","rx":156,"tx":180,"con":199,"desc":""}]},"eths":[{"name":"MGT1","macaddr":"68:ed:a4:08:c3:ce","up":true,"ipaddr":"192.168.2.1\/24","ipv6addr":"fe80::6aed:a4ff:fe08:c3ce\/64","inbytes":9833608,"in_bps":1223,"inpkts":78587,"in_err":"0","in_drop":"0","in_frame":"0","outbytes":7011898,"out_bps":3710,"outpkts":7192,"out_err":"0","out_drop":"0","out_frame":"0"},{"name":"MGT2","macaddr":"68:ed:a4:08:c3:cf","up":false,"inbytes":0,"in_bps":0,"inpkts":0,"in_err":"0","in_drop":"0","in_frame":"0","outbytes":0,"out_bps":0,"outpkts":0,"out_err":"0","out_drop":"0","out_frame":"0"},{"name":"LAN1","macaddr":"68:ed:a4:08:c3:ca","up":true,"ipaddr":"","ipv6addr":"fe80::6aed:a4ff:fe08:c3ca\/64","inbytes":152070610,"in_bps":4969,"inpkts":1175287,"in_err":"0","in_drop":"0","in_frame":"0","outbytes":1133120712,"out_bps":2667,"outpkts":1112902,"out_err":"0","out_drop":"0","out_frame":"0"},{"name":"WAN1","macaddr":"68:ed:a4:08:c3:cb","up":true,"ipaddr":"","ipv6addr":"fe80::6aed:a4ff:fe08:c3cb\/64","inbytes":1137575408,"in_bps":2873,"inpkts":1162150,"in_err":"0","in_drop":"0","in_frame":"0","outbytes":140685918,"out_bps":5476,"outpkts":1101715,"out_err":"0","out_drop":"0","out_frame":"0"},{"name":"LAN2","macaddr":"68:ed:a4:08:c3:cc","up":false,"inbytes":0,"in_bps":0,"inpkts":0,"in_err":"0","in_drop":"0","in_frame":"0","outbytes":0,"out_bps":0,"outpkts":0,"out_err":"0","out_drop":"0","out_frame":"0"},{"name":"WAN2","macaddr":"68:ed:a4:08:c3:cd","up":false,"inbytes":0,"in_bps":0,"inpkts":0,"in_err":"0","in_drop":"0","in_frame":"0","outbytes":0,"out_bps":0,"outpkts":0,"out_err":"0","out_drop":"0","out_frame":"0"},{"name":"LAN3","macaddr":"00:90:0b:52:e2:b4","up":false,"inbytes":0,"in_bps":0,"inpkts":0,"in_err":"0","in_drop":"0","in_frame":"0","outbytes":0,"out_bps":0,"outpkts":0,"out_err":"0","out_drop":"0","out_frame":"0"},{"name":"WAN3","macaddr":"00:90:0b:52:e2:b5","up":false,"inbytes":0,"in_bps":0,"inpkts":0,"in_err":"0","in_drop":"0","in_frame":"0","outbytes":0,"out_bps":0,"outpkts":0,"out_err":"0","out_drop":"0","out_frame":"0"},{"name":"LAN4","macaddr":"00:90:0b:52:e2:b6","up":false,"inbytes":0,"in_bps":0,"inpkts":0,"in_err":"0","in_drop":"0","in_frame":"0","outbytes":0,"out_bps":0,"outpkts":0,"out_err":"0","out_drop":"0","out_frame":"0"},{"name":"WAN4","macaddr":"00:90:0b:52:e2:b7","up":false,"inbytes":0,"in_bps":0,"inpkts":0,"in_err":"0","in_drop":"0","in_frame":"0","outbytes":0,"out_bps":0,"outpkts":0,"out_err":"0","out_drop":"0","out_frame":"0"}],"net_state":{"host":15,"conns":814,"uptime":"2017-05-02 17:05:15","virtual":{"1":{"count":669},"2":null,"3":null,"4":null}},"sys_state":{"cpu":"0.162","memory":"0.479","disk":{"total":58476700,"used":1099672},"version":"2.0","time":"2017-06-01 09:11:00","online_node":684,"start":"2017-05-31 21:02:36"},"event_log":[{"id":"388","type":"login_ok","descr":"\u767b\u5f55\u6210\u529f","content":"\u7ba1\u7406\u5458\u767b\u5f55\u6210\u529f\uff0c\u7528\u6237\u540d\uff1aadmin\uff0cIP\u5730\u5740\uff1a192.168.2.123","valid":"1","timestamp":"2017-06-01 08:59:33"},{"id":"387","type":"login_ok","descr":"\u767b\u5f55\u6210\u529f","content":"\u7ba1\u7406\u5458\u767b\u5f55\u6210\u529f\uff0c\u7528\u6237\u540d\uff1aadmin\uff0cIP\u5730\u5740\uff1a192.168.2.93","valid":"1","timestamp":"2017-06-01 08:41:41"},{"id":"386","type":"login_ok","descr":"\u767b\u5f55\u6210\u529f","content":"\u7ba1\u7406\u5458\u767b\u5f55\u6210\u529f\uff0c\u7528\u6237\u540d\uff1aadmin\uff0cIP\u5730\u5740\uff1a192.168.2.45","valid":"1","timestamp":"2017-05-31 21:03:25"},{"id":"385","type":"sys_start","descr":"\u7cfb\u7edf\u542f\u52a8","content":"\u8bbe\u5907\u5f00\u673a","valid":"1","timestamp":"2017-05-31 21:02:36"},{"id":"384","type":"eth_up","descr":"\u7f51\u53e3\u63a5\u5165","content":"LAN1\u63a5\u5165","valid":"1","timestamp":"2017-05-31 20:55:02"},{"id":"383","type":"login_ok","descr":"\u767b\u5f55\u6210\u529f","content":"\u7ba1\u7406\u5458\u767b\u5f55\u6210\u529f\uff0c\u7528\u6237\u540d\uff1aadmin\uff0cIP\u5730\u5740\uff1a192.168.2.45","valid":"1","timestamp":"2017-05-31 20:45:28"},{"id":"382","type":"login_ok","descr":"\u767b\u5f55\u6210\u529f","content":"\u7ba1\u7406\u5458\u767b\u5f55\u6210\u529f\uff0c\u7528\u6237\u540d\uff1aadmin\uff0cIP\u5730\u5740\uff1a192.168.2.45","valid":"1","timestamp":"2017-05-31 19:35:23"},{"id":"381","type":"logout","descr":"\u7528\u6237\u6ce8\u9500","content":"\u7528\u6237\u6ce8\u9500\u767b\u5f55\uff0c\u7528\u6237\u540d\uff1aadmin\uff0cIP\u5730\u5740\uff1a192.168.2.93","valid":"1","timestamp":"2017-05-31 18:12:41"}]}}
					this.show=true
					this.totalData=recvdata.data
					this.event_log=recvdata.data.event_log
					this.eths=recvdata.data.eths
					this.net_state=recvdata.data.net_state
					this.attack_info=recvdata.data.attack_info
					this.sys_state=recvdata.data.sys_state
					this.attack_count=recvdata.data.attack_count
				// }
				if(this.clearTimeout){
			        return 
			    }
				clearTimeout(this.intervalid)
				this.intervalid = setTimeout(() => this.loadData(), 1000)
			// },()=>{
			// 	if(this.clearTimeout){
			//         return 
			//     }
			// 	clearTimeout(this.intervalid)
			// 	this.intervalid = setTimeout(() => this.loadData(), 1000)
			// })
		}
	},
	components: {
		networkstatus,
		penetration,
		portstatus,
		networklive,
		systemstatus,
		eventlog
	},
	beforeDestroy() {
		this.clearTimeout = true
	    clearTimeout(this.intervalid)
	}
}
</script>
<style scoped>
.home-wrap {
	min-width: 1200px;
	padding-bottom: 18px;
	margin-bottom: 40px;
	
}
.container{
	height: 100%;
}
.un_accredit{
	width: 1240px;
}
.right{
	padding-left: 0;
}
.small_content{
	margin-left: -30px;
}
.mid_content{
	margin-left: -20px;
}
/*动画*/	
	.fade-enter-active, .fade-leave-active {
       transition: opacity .5s ease;
    }
	.fade-enter, .fade-leave-active {
	  opacity: 0
	}
</style>