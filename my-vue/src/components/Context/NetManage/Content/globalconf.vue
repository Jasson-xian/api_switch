<template>
	<div class="wrap">
		<div class="title">
			<h3>全局配置</h3>
		</div>
		<div class="table-wrap">
			<table>
				<thead>
					<tr>
						<th style="width: 1200px;" colspan="4">设置
							<ul class="titile-butn">
								<li @mouseenter="actived('sure')" @mouseleave="unactived()" v-on:click.stop="setglbal()" >
									<img v-if="type=='sure'" src="./../../../img/b_sure.png">
									<img v-else src="./../../../img/sure.png">
									<span :class="[type=='sure'?'actived':'unactived']">确定</span>
								</li>
							</ul>
                        </th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td >PPPOE开关：</td>
                        <td >
                        	 <div class="on_off_but">							
								<button @click.stop = "swichStatus('PPOEs',1)" :class="[PPOEs?'active':'']" class="on_but">启用</button>
								<button @click.stop = "swichStatus('PPOEs',0)" :class="[PPOEs?'':'active']" class="off_but">禁用</button>
							</div>
                        </td>			
						<td ></td>
                        <td ></td>			
					</tr>
					<tr>
						<td >DHCP开关：</td>
                        <td >
                        	 <div class="on_off_but">							
								<button @click.stop = "swichStatus('DHCPs',1)" :class="[DHCPs?'active':'']" class="on_but">启用</button>
								<button @click.stop = "swichStatus('DHCPs',0)" :class="[DHCPs?'':'active']" class="off_but">禁用</button>
							</div>
                        </td>			
						<td ></td>
                        <td ></td>				
					</tr>
					<tr>
						<td >首选DNS服务器：</td>
                        <td >
							<!--<input v-model="DNS" type="text" @focus="noEmpty('.DNS')"
							@blur="testVal('.DNS', 'ip')"  class="DNS num-input long-input" placeholder="如：114.114.114.114"></input>-->
							<ipinput class="DNS" :empty=false></ipinput>
							<span class="mi">* 必填</span>
						</td>							
						<td ></td>
                        <td ></td>			
					</tr>
					<tr>
						<td >备选DNS服务器：</td>
                        <td >
							<!--<input v-model="DNS2" type="text" @focus="noEmpty('.DNS2')"
							@blur="testVal('.DNS2', 'ip')" class="DNS2 num-input long-input" placeholder="如：1.1.1.1"></input>-->
							<ipinput class="DNS2" :empty=false></ipinput>
							<span class="mi">* 必填</span>
						</td>						
						<td ></td>
                        <td ></td>			
					</tr>
                    <tr>					
						<td >DHCP地址租期：</td>
                        <td colspan="2">
							<input v-model="days" type="number" min="0" max="999" step="1" class="days NUM num-input short-input" @focus="noEmpty('.days')"></input><span>日</span>
							<input v-model="hours" type="number" min="0" step="1" max="23" class="hours NUM num-input short-input" @focus="noEmpty('.hours')" ></input><span>时</span>
							<input v-model="minus" type="number" min="1" step="1" max="59" @focus="noEmpty('.minus')" class="minus NUM num-input short-input"></input><span>分</span>
							<span class="mi">* 0 或 空 表示不设置DHCP租期时间</span>
						</td>			
                        <td ></td>		
					</tr>
					<tr>					
						<td >主机信息表有效时间：</td>
                        <td >
							<input v-model="rtime" type="number" min="1" step="1" max="99999999" @blur="testVal('.rtime', 'int')" @focus="noEmpty('.rtime')"  class="rtime num-input">(s)</input>
							<span class="mi">* 必填</span>
						</td>			
						<td ></td>
                        <td ></td>		
					</tr>
					<tr>
						<td >真实IP访问开关：</td>
						<td >
							<div class="on_off_but">							
								<button @click.stop = "swichStatus('rips',1)" :class="[rips?'active':'']" class="on_but">启用</button>
								<button @click.stop = "swichStatus('rips',0)" :class="[rips?'':'active']" class="off_but">禁用</button>
							</div>
                        </td>
						<td ></td>
                        <td ></td>							
					</tr>
                    <tr>					
						<td >主机自动封堵开关：</td>
						<td >
							<div class="on_off_but">							
								<button @click.stop = "swichStatus('hoststops',1)" :class="[hoststops?'active':'']" class="on_but">启用</button>
								<button @click.stop = "swichStatus('hoststops',0)" :class="[hoststops?'':'active']" class="off_but">禁用</button>
							</div>
                        </td>
                        </td>
						<td ></td>
                        <td ></td>	
					</tr>
                    <tr>					
						<td >虚拟IP变换间隔：</td>
						<td >
                            <input v-model="vipchg" type="number" min="1" step="1" max="9999" @focus="noEmpty('.vipchg')"
							@blur="testVal('.vipchg', 'int')" class="vipchg num-input">(m)</input>
							<span class="mi">* 必填</span>
						</td>
						<td ></td>
                        <td ></td>	
					</tr>
                    <tr>					
						<td >虚拟域名变换间隔：</td>
						<td >
                             <input v-model="vdomianchg" type="number" min="1" step="1"  @focus="noEmpty('.vdomianchg')"
							 @blur="testVal('.vdomianchg', 'int')"  class="vdomianchg num-input">(m)</input>
							 <span class="mi">* 必填</span>
						</td>
						<td ></td>
                        <td ></td>	
					</tr>
                    <tr>					
						<td >虚拟网络变换间隔：</td>
						<td >
                             <input v-model="vnetchg" type="number" min="1" step="1"  @focus="noEmpty('.vnetchg')"
							 @blur="testVal('.vnetchg', 'int')" class="vnetchg num-input">(m)</input>
							 <span class="mi">* 必填</span>
						</td>
						<td ></td>
                        <td ></td>	
					</tr>
					<tr>					
						<td >管理IP/掩码：</td>
						<td >
                             <!--<input v-model="manageIP" type="text" placeholder="如：192.168.2.1/24" @focus="noEmpty('.manageIP')"
							 @blur="testmanageIP('.manageIP')" class="manageIP num-input long-input"
							 @keyup.enter="setglbal()"></input>-->
							 <mgipinput class="manageIP" :empty=false></mgipinput>
							 <span class="mi">* 必填</span>
						</td>
						<td ></td>
                        <td ></td>	
					</tr>
				</tbody>
			</table>
		</div>
		<gconfirm :newhref="newhref" v-on:doThing="openNewaddr()"></gconfirm>
		<success></success>
        <fail></fail>
	</div>
</template>
<script>
	import netservice from 'services/netService'
	import success from './tags/success.vue'
	import gconfirm from './tags/gconfirm.vue'
    import fail from './tags/fail.vue'
	import formatTest from 'libs/formatTest'
	import ipinput from 'components/libs/ipinput'
	import mgipinput from 'components/libs/mgipinput'

	export default {
		components: {
            success,
            fail,
			gconfirm,
			ipinput,
			mgipinput
		},
        mounted() {
			this.getglbal();    			
        },
        data(){
            return {
				PPOEs:"",
				DHCPs:"",
				DNS:"",
				DNS2:"",
				rtime:"",
				days:"",
				hours:"",
				minus:"",
                exterips:"",
                rips:"",
                hoststops:"",
                vipchg:"",
                vdomianchg:"",
                vnetchg:"",
				manageIP:"",
				type:"",
				constIP:"",
				newhref:""
            }
        },
		watch: {
			days: function () {
				if(this.days > 999)
				this.days = 999
			},
			hours: function () {
				if(this.hours > 23){
					this.days = Number(this.days) + 1;
					this.hours = 0
				}
			},
			minus: function () {
				if(this.minus > 59){
					this.hours = Number(this.hours) + 1;
					this.minus = 0
				}
			},
			rtime: function () {
				if(this.rtime > 99999999){
					this.rtime = 99999999
				}
			},
			vipchg: function () {
				if(this.vipchg > 999999){
					this.vipchg = 999999
				}
			},
			vdomianchg: function () {
				if(this.vdomianchg > 999999){
					this.vdomianchg = 999999
				}
			},
			vnetchg: function () {
				if(this.vnetchg > 999999){
					this.vnetchg = 999999
				}
			},

		},
        methods: {
        	swichStatus(butn_type,on_off){  
        		switch (butn_type){
        			case 'PPOEs':
        			    this.PPOEs = on_off
        				break;
        			case 'DHCPs':
	        			this.DHCPs = on_off
	        			break
        			case 'exterips':
        			    this.exterips = on_off
        			    break
        			case 'rips':
        			    this.rips = on_off
        			    break
        			case 'hoststops':
        			    this.hoststops = on_off
        			    break
        			default:
        				break;
        		}
        	},
			arrip(el,value){
				let arrip=value.split('.')
               $(el+' input').eq(0).val(arrip[0])
               $(el+' input').eq(1).val(arrip[1])
               $(el+' input').eq(2).val(arrip[2])
               $(el+' input').eq(3).val(arrip[3])
			},
			arrmgip(el,value){
				let arrip=value.split('.')
               $(el+' input').eq(0).val(arrip[0])
               $(el+' input').eq(1).val(arrip[1])
               $(el+' input').eq(2).val(arrip[2])
			   let mgarrip=arrip[3].split('/')
               $(el+' input').eq(3).val(mgarrip[0])
			   $(el+' input').eq(4).val(mgarrip[1])
			},
			getglbal(){
				// netservice.getGlobal()
				// .then((recvdata) => {
				// 	recvdata = jQuery.parseJSON(recvdata);
				// 	if(recvdata.success) {
					let recvdata = {"success":true,"data":{"config":{"pppoe_switch":"0","dhcp_switch":"0","dhcp_time":"0","rtime":"25000","dnsABCD":"202.102.224.68","dnsABCD2":"202.102.227.68","rip_access":"0","wip_response":"1","host_status_switch":"1","mgr_address":"192.168.2.1\/24","ai":"60","dt":"1","alter_name":"60","alter_virtual_host":"60","host_status_scan":"3"},"result":""}}
						this.PPOEs = recvdata.data.config.pppoe_switch == "1" ? true : false;
						this.DHCPs = recvdata.data.config.dhcp_switch  == "1" ? true : false;
						// this.DNS = recvdata.data.config.dnsABCD;
						this.arrip('.DNS',recvdata.data.config.dnsABCD)
						// this.DNS2 = recvdata.data.config.dnsABCD2;
						this.arrip('.DNS2',recvdata.data.config.dnsABCD2)
						this.rips = recvdata.data.config.rip_access == "1" ? true : false;
						this.exterips = recvdata.data.config.wip_response == "1" ? true : false;
						this.hoststops = recvdata.data.config.host_status_switch == "1" ? true : false;
						this.rtime = recvdata.data.config.rtime
						this.vipchg = recvdata.data.config.ai;
						this.vdomianchg = recvdata.data.config.alter_name;
						this.vnetchg = recvdata.data.config.alter_virtual_host;
						// this.manageIP = recvdata.data.config.mgr_address;
						this.arrmgip('.manageIP',recvdata.data.config.mgr_address)
						this.constIP = recvdata.data.config.mgr_address;
						var stamp = recvdata.data.config.dhcp_time;
						this.days = parseInt(stamp/( 24 * 60 * 60));
						var remain = stamp % ( 24 * 60 * 60);
						this.hours = parseInt(remain/( 60 * 60 ));
						remain = remain%( 60 * 60 );
						this.minus = parseInt(remain/60);
				// 	}
				// })
       		},
			ipVal(ele){
				let ipVal =  ($(ele+' .ip_a').val()?$(ele+' .ip_a').val():"")+
								($(ele+' .ip_b').val()?'.'+$(ele+' .ip_b').val():"")+
								($(ele+' .ip_c').val()?'.'+$(ele+' .ip_c').val():"")+
								($(ele+' .ip_d').val()?'.'+$(ele+' .ip_d').val():"")
				return ipVal
			},
			mgipVal(ele){
                let ipVal =  ($(ele+' .ip_a').val()?$(ele+' .ip_a').val():"")+
				             ($(ele+' .ip_b').val()?'.'+$(ele+' .ip_b').val():"")+
							 ($(ele+' .ip_c').val()?'.'+$(ele+' .ip_c').val():"")+
							 ($(ele+' .ip_d').val()?'.'+$(ele+' .ip_d').val():"")+
							 ($(ele+' .ip_e').val()?'/'+$(ele+' .ip_e').val():"")
			    return ipVal
			},
			testMacIp(ele,type){				
				if(type=='ip'){
                    let ip_a_test = this.testVal(ele+' .ip_a', 'ip_piece')
				    let ip_b_test = this.testVal(ele+' .ip_b', 'ip_piece')
					let ip_c_test = this.testVal(ele+' .ip_c', 'ip_piece')
					let ip_d_test = this.testVal(ele+' .ip_d', 'ip_piece')
					if(ip_a_test&&ip_b_test&&ip_c_test&&ip_d_test){
						$(ele+' input').css('border','none')
                        return true
					}else{
						return false
					}	
				}
			},
			setglbal(){
				let DNS=this.ipVal('.DNS')
				let DNS2=this.ipVal('.DNS2')
				if(this.testMacIp('.DNS','ip')&&this.testMacIp( '.DNS2','ip')&&this.testVal('.rtime', 'int')&&this.testVal('.vipchg', 'int')&&this.testVal('.vdomianchg', 'int')&&this.testVal('.vnetchg', 'int')&&this.testmanageIP('.manageIP'))
				{
					this.noshock(".NUM")
					var dhcp_time = this.days * ( 24 * 60 * 60) + this.hours * ( 60 * 60 ) + this.minus * 60 ;
					var gconfig = {
						pppoe_switch:this.PPOEs ? 1 : 0,
						dhcp_switch:this.DHCPs ? 1 : 0,
						dnsABCD:DNS,
						dnsABCD2:DNS2,
						rip_access:this.rips ? 1 : 0,
						wip_response:this.exterips ? 1 : 0,
						host_status_switch:this.hoststops ? 1 : 0,
						ai:this.vipchg,
						rtime:this.rtime,
						alter_name:this.vdomianchg,
						alter_virtual_host:this.vnetchg,
						mgr_address:this.mgipVal('.manageIP'),
						dhcp_time:dhcp_time
					}
					let constIP = this.constIP.split("/")[0]
					let manageIP = this.mgipVal('.manageIP').split("/")[0]
					if(constIP != manageIP){
						this.newhref = location.protocol+"//"+manageIP+"/"
						$("#gconfirm").modal('show')
					}else{
						this.dosetGlobal(gconfig)
					}
					
				}else{
					this.shock(".NUM")
					$(".NUM").popover('show');
					setTimeout(function() {
						$(".NUM").popover('destroy')
					}, 1000)
				}
			},
			openNewaddr(){
				window.open(this.newhref);
				var dhcp_time = this.days * ( 24 * 60 * 60) + this.hours * ( 60 * 60 ) + this.minus * 60 ;
					var gconfig = {
						pppoe_switch:this.PPOEs ? 1 : 0,
						dhcp_switch:this.DHCPs ? 1 : 0,
						dnsABCD:this.ipVal('.DNS'),
						dnsABCD2:this.ipVal('.DNS2'),
						rip_access:this.rips ? 1 : 0,
						wip_response:this.exterips ? 1 : 0,
						host_status_switch:this.hoststops ? 1 : 0,
						ai:this.vipchg,
						rtime:this.rtime,
						alter_name:this.vdomianchg,
						alter_virtual_host:this.vnetchg,
						mgr_address:this.mgipVal('.manageIP'),
						dhcp_time:dhcp_time
					}
				this.dosetGlobal(gconfig)
			},
			dosetGlobal(gconfig){
				netservice.setGlobal(gconfig)
				.then((recvdata) => {
					recvdata = jQuery.parseJSON(recvdata);
					if(recvdata.success) {
						$('#success').modal('show')
						setTimeout(function(){
							$('#success').modal('hide')
						},800)
					}else{
						$('#fail').modal('show')
						setTimeout(function(){
							$('#fail').modal('hide')
						},800)
					}
					this.getglbal(); 
				})
			},
			testmanageIP(ele){
				var ipRangReg = /^(!*(2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)(\/(3[0-2]|2[0-9]|1[0-9]|[1-9]))*(\-(!*(2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?))*(\/(3[0-2]|2[0-9]|1[0-9]|[1-9]))*$/
				var val = this.mgipVal(ele)
				if (val!=''){//去除前后空格
					val = val.replace(/(^\s*)|(\s*$)/g, "")			
				}else{
					$(ele).parent().find('.mi').css('color', '#b63039')
				}
				if( ipRangReg.test(val) ) {
					var ipArr = val.split("/")
					if(ipArr[0] || ipArr[1])
						if( ipArr[0].split(".")[3] != 0 && ipArr[1]<= 32 ){
							$(ele).parent().find('.mi').css('color', '#d2d2d2')
							$(ele+' input').css('border', 'none')
							return true
						}else{
							$(ele+' input').css('border', '1px solid #b63039')
							$(ele+' input').addClass('animated shake')
							setTimeout(function() {
								$(ele+' input').removeClass('animated shake')
							}, 200)
							return false
						}
				}else{
					$(ele+' input').css('border', '1px solid #b63039')
					$(ele+' input').addClass('animated shake')
					setTimeout(function() {
						$(ele+' input').removeClass('animated shake')
					}, 200)
					return false
				}
			},
			
			testVal(ele, reg) {
				var val = $(ele).val()
				var test = new formatTest(ele, reg, false)
				return test.testFormat()
			},
			testValnull(ele, reg) {
				var val = $(ele).val()
				var test = new formatTest(ele, reg, true)
				return test.testFormat()
			},
			isEmpty(ele) {
                var test = new formatTest(ele)
			    test.isEmpty()
			},
			noEmpty(ele){
				var test = new formatTest(ele)
			    test.notEmpty()
			},
			shock(ele){
                $(ele).parent().find('.mi').css('color', '#b63039')
				$(ele).css('border', '1px solid #b63039')
				$(ele).addClass('animated shake')
				setTimeout(function() {
					$(ele).removeClass('animated shake')
				}, 200)
            },
            noshock(ele){
                $(ele).css('border', '1px solid #e8e8e8')
            },
			actived(type){
				this.type = type
			},
			unactived(){
				this.type = ""
			}
        }
		
	}
    
</script>
<style scoped>
	.wrap {
		margin: 30px 0 0 30px;
		padding-bottom: 20px;
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
		margin: 30px;
	}
	thead {
		background: #69b6ff;
		color: #ffffff;
	}
    thead tr th {
        text-align: left;
        padding-left: 15px;
        height: 30px;
        position:relative;
	}
	th {
		color: #ffffff;
	}
    tbody tr {
        height: 55px;
    }
    tr:nth-child(4),
	tr:nth-child(6),
	tr:nth-child(12) {
        border-bottom: 1px solid #c9e4ff;
    }
	tr:nth-child(5) span {
        vertical-align: middle;
    }
    tbody tr td:nth-child(1) {
        text-align: right;
        border-left: 1px solid #c9e4ff;
		width: 280px;
    }
    tbody tr td:nth-child(2) {
        padding-left: 42px;
		width: 350px;
    }
	tbody tr td:nth-child(3) {
        text-align: left;
    }
    tbody tr td:last-child {
        border-right: 1px solid #c9e4ff;
    }
    tr:last-child {
        border-bottom: 1px solid #c9e4ff;
    }
	thead tr th:last-child {
        border-right: 1px solid #69b6ff;
    }
    .thead-btn {
		width: 70px;
		height: 20px;
		color: #FFFFFF;
		border-radius: 4px;
		background: #f5b72e;
        position:absolute; 
        right:20px;
	}
    .num-input{
        height: 25px;
        width: 100px;
        border: 1px solid #e6e6e6;
        border-radius: 5px;
        margin-right: 5px;
        padding: 3px;
    }
	.long-input{
		width: 130px;
	}
	.short-input{
		width: 50px;
	}
	label{
		margin-bottom: 0px;
	}
	.mi {
		color: #d2d2d2;
		margin-left: 10px;
	}
	.titile-butn {
		position: absolute;
		top: 6px;
		right: 10px;
	}
	
	.titile-butn li {
		display: inline-block;
		margin-right: 15px;
		cursor: pointer;		
	}
	
	.titile-butn li span {
		vertical-align: middle;
	}
	.actived{
		color:#1e5ac9;
	}
	.unactived{
		color:#FFFFFF;
	}
	/*启用禁用*/
	.active {
		background: #00A0E9;
		color: #FFFFFF;
	}
	.on_off_but{
		display: inline-block;
		position: relative;
        margin:0 25px 0 5px;
        border: 1px solid #E6E6E6;
        background: #FFFFFF;
        border-radius: 5px;
        box-shadow: 0 0 5px 0  #E6E6E6;
	}
	button{
		background: #FFFFFF;
	}
	.off_but{
		padding: 1px 5px 2px;
		font-size: 12px;
		border-radius: 0 5px 5px 0;
		margin-left: -5px;
	}
	.on_but{
		padding: 1px 5px 2px;
		font-size: 12px;
		border-radius: 5px 0 0 5px;
	}
	.on_off_notice{
		color: #d2d2d2;
		position: absolute;
		top: 0;
		left:70px;
		width: 140px;
		display: inline-block;
	}
</style>