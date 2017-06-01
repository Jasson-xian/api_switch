<template>
	<div class="wrap" @keyup.enter="setPpass()" >
		<div class="title">
			<h3>协议透传配置</h3>
		</div>
		<div class="table-wrap">
			<table>
				<thead>
					<tr>
						<th style="width: 1200px;" colspan="5">选择协议
							<ul class="titile-butn">
								<li @mouseenter="actived('sure')" @mouseleave="unactived()"v-on:click.stop="setPpass()" >
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
						<td class="name cu" rowspan="2" >STP：</td>
                        <td class="option" rowspan="2">
                        	 <div class="on_off_but">							
								<button @click.stop = "swichStatus('STPs',1)" :class="[STPs?'active':'']" class="on_but">启用</button>
								<button @click.stop = "swichStatus('STPs',0)" :class="[STPs?'':'active']" class="off_but">禁用</button>
							</div>
                        </td>			
						<td class="name">
							对端IP：							
						</td>
                        <td class="option">
							<div class="input_wrap">
								<input v-model="ip_a" maxlength="3" @focus = "notEmpty('.ip_a')" @keyup="upnext($event)" @keydown="nextInput($event,ip_a)" @blur = "testIP('.ip_a',ip_a)" class="ip_input ip_a" type="text"> . 
								<input v-model="ip_b" maxlength="3" @focus = "notEmpty('.ip_b')" @keyup="upnext($event)" @keydown="nextInput($event,ip_b)" @blur = "testIP('.ip_b',ip_b)" class="ip_input ip_b" type="text"> . 
								<input v-model="ip_c" maxlength="3" @focus = "notEmpty('.ip_c')" @keyup="upnext($event)" @keydown="nextInput($event,ip_c)" @blur = "testIP('.ip_c',ip_c)" class="ip_input ip_c" type="text"> .
								<input v-model="ip_d" maxlength="3" @focus = "notEmpty('.ip_d')" @keyup="upnext($event)" @keydown="nextInput($event,ip_d)" @blur = "testIP('.ip_d',ip_d)" class="ip_input ip_d" type="text">
							</div>			
						</td>
						<td rowspan="2">
							<p  style="text-align: center; color:#69b6ff;">注：STP为禁用状态时，同步开关失效。</p>
						</td>			
					</tr>
					<tr>							
						<td class="name">
							同步开关：							
						</td>
                        <td class="option">
							<div class="on_off_but">							
								<button @click.stop = "swichStatus('Sametep',1)" :disabled ="STPs?false:true"  :class="[Sametep?(STPs?'active':'gray'):(STPs?'':'gray_font')]" class="on_but"> &nbsp;启用&nbsp; </button>
								<button @click.stop = "swichStatus('Sametep',0)" :disabled ="STPs?false:true" :class="[Sametep?'':(STPs?'active':'gray')]" class="off_but"> &nbsp;禁用&nbsp; </button>
							</div>
						</td>						
					</tr>
					<tr>
						<td class="name cu">Communication_Redundancy：</td>
                        <td class="option" colspan="4">
                        	 <div class="on_off_but">							
								<button @click.stop = "swichStatus('CRs',1)" :class="[CRs?'active':'']" class="on_but"> 启用 </button>
								<button @click.stop = "swichStatus('CRs',0)" :class="[CRs?'':'active']" class="off_but"> 禁用 </button>
							</div>
                        </td>		
					</tr>
				</tbody>
			</table>
		</div>
		<success></success>
        <fail></fail>
	</div>
</template>
<script>
	import netservice from 'services/netService'
	import formatTest from 'libs/formatTest'

	import success from './tags/success.vue'
    import fail from './tags/fail.vue'
	export default {
		components: {
			success,
            fail			
		},
        mounted() {
			this.getPpass()
        },
        data(){
            return {
                STPs:"",
                CRs:"",
				Sametep:'',
				type:"",
				ip_a:'',
				ip_b:'',
				ip_c:'',
				ip_d:''
            }
        },
        methods: {
        	swichStatus(butn_type,on_off){       		
        		if(butn_type=='STPs'){
        			this.STPs = on_off
        		}else if(butn_type=='CRs'){
        			this.CRs = on_off
        		}else if(butn_type=="Sametep"){
                    this.Sametep = on_off
				}
        	},
			getPpass(){
                // netservice.getProtocolpass()
                // .then((recvdata) => {
				// 	recvdata = jQuery.parseJSON(recvdata);
				// 	if(recvdata.success) {
					let recvdata = {"success":true,"data":{"config":{"stp_switch":"1","cr_switch":"0","host_status_syn_switch":"1","host_status_syn_ip":"192.168.2.1"},"result":""}}
                        this.STPs = recvdata.data.config.stp_switch == "1" ? true : false
						this.CRs = recvdata.data.config.cr_switch == "1" ? true : false
						this.Sametep = recvdata.data.config.host_status_syn_switch == "1"? true : false
						let syn_ip = recvdata.data.config.host_status_syn_ip
						if(syn_ip){
							this.ip_a =  syn_ip.split(".")[0]
							this.ip_b =  syn_ip.split(".")[1]
							this.ip_c =  syn_ip.split(".")[2]
							this.ip_d =  syn_ip.split(".")[3]
						}					
                //     }
				// })
            },
			setPpass(){			
				if(this.testIP('.ip_a',this.ip_a)&&this.testIP('.ip_b',this.ip_b)&&this.testIP('.ip_c',this.ip_c)&&this.testIP('.ip_d',this.ip_d)){	
					let conf={
						stp_switch:this.STPs ? "1" : "0",
						cr_switch:this.CRs ? "1" : "0",
						host_status_syn_switch:this.Sametep ? "1" : "0",
						host_status_syn_ip:this.ip_a+"."+this.ip_b+"."+this.ip_c+"."+this.ip_d	

					}
					netservice.setProtocolpass(conf)
					.then((recvdata) => {
						recvdata = jQuery.parseJSON(recvdata);
						if(recvdata.success) {
							this.getPpass()
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
					})
				}			
            },
			 testIP(ele,val){		
				var IPReg = /^(2[0-4]\d|25[0-5]|[01]?\d\d?)$/
				if(IPReg.test(val)){
					$(ele).css('border', 'none')
					return true
				}else{
					$(ele).css('border', '1px solid #b63039')
					$(ele).addClass('animated shake')
					setTimeout(function() {
						$(ele).removeClass('animated shake')
					}, 200)
					return false
				}            
			},
			 nextInput(event,val){          
				if(event.keyCode==110||event.keyCode==190){
					event.preventDefault()
				$(event.currentTarget).next().focus()    
				}   
			},
			 upnext(event){
				if($(event.currentTarget).val().length>=3){
				$(event.currentTarget).next().focus()    
				}   
			},
			notEmpty: function(ele) {
                var test = new formatTest(ele)
			    test.notEmpty()
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
        position:relative;
	}
	th {
		color: #ffffff;
	}
    tbody tr {
        height: 55px;
    }
    .name{
        text-align: right;
        border-left: 1px solid #c9e4ff;
		font-weight: 600;
		border-right: none;
    }
	.ip_input{
		width: 36px;
		height: 100%;
		text-align: center;
		padding: 0;
	    color: #555; 
	}
	.input_wrap{
        display: inline-block;	
		width: 180px;
		height: 24px;
		border: 1px solid  #e8e8e8;
		border-radius: 5px;
		box-sizing: border-box;
		color: #999;
	}
	.option{
		padding-left: 20px;
	}
    tbody tr td{
        border-right: 1px solid #c9e4ff;     
    }
    tr {
        border-bottom: 1px solid #c9e4ff;
    }
	.cu{
		border-right: 1px solid #69b6ff;
	}
    .thead-btn {
		width: 70px;
		height: 20px;
		color: #FFFFFF;
		border-radius: 5px;
		background: #f5b72e;
        position:absolute; 
        right:20px;
		padding-bottom: 1px;
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
	.gray{
		background: #999999;
		color: #ffffff;
		text-decoration: line-through;
	}
	.gray_font{
		color:  #999999;
		text-decoration: line-through;
	}
</style>