<template>
	<div class="wrap">
		<div class="title">
			<h3>网络配置</h3>
		</div>
		<div class="table-wrap">
			<table>
				<thead>
					<tr>
						<th style="width: 600px;" >虚假响应配置</th>
                        <th style="width: 600px;">
                            <ul class="butn">
                                <li @mouseenter="actived('delete')" @mouseleave="unactived()" v-on:click='reset()'>
                                    <img v-if="type=='delete'" src="./../../../img/b_dele.png" />
                                    <img v-else src="./../../../img/delete.png" />
                                    <span :class="[type=='delete'?'actived':'unactived']">重置</span>
                                </li>
                                <li @mouseenter="actived('save')" @mouseleave="unactived()" v-on:click='setVhost()'>
                                    <img v-if="type=='save'" width="13px" src="../../../img/b_save.png" />
                                    <img v-else width="13px" src="../../../img/save.png" />
                                    <span :class="[type=='save'?'actived':'unactived']">保存</span>
                                </li>
                            </ul>
                        </th>
					</tr>
				</thead>
				<tbody>
					<tr>
                        <td style="width: 600px;">
                            Linux主机比例：<input type="number"  class="linuxpp"  @blur="chkLinuxpp()" v-model="linuxpp" max="100" min="0" step="1" @focus="ppEmpty()">(%)</input>
                            <span class="mi">* 必填</span>    
                        </td>
                        <td style="width: 600px;">
                            端口：<input class="long-input linuxport" type="text" data-toggle="popover" data-placement="top"
                            @blur="chkLinuxport" v-model="linuxport" @focus="isEmpty('.linuxport')"></input>
                            <span class="mi">* 必填</span>
                        </td>
					</tr>
                    <tr>
                        <td style="width: 600px;">
                            Windows主机比例：<input type="number"  class="windowspp"
                            @blur="chkWindowspp()" v-model="windowspp" max="100" min="0" step="1" @focus="ppEmpty()">(%)</input>
                            <span class="mi">* 必填</span>
                        </td>
                        <td style="width: 600px;">
                            端口：<input class="long-input windowsport" type="text" data-toggle="popover" data-placement="top"
                            @blur="chkWindowsport" v-model="windowsport" @focus="isEmpty('.windowsport')"></input>
                            <span class="mi">* 必填</span>
                        </td>
					</tr>
                    <tr>
                        <td style="width: 600px;">
                            Server主机比例：<input type="number" class="serverpp"
                            @blur="chkServerpp()" v-model="serverpp" step="1" @focus="ppEmpty()">(%)</input>
                            <span class="mi">* 必填</span>
                        </td>
                        <td style="width: 600px;">
                            端口：<input class="long-input serverport" type="text" data-toggle="popover" data-placement="top"
                            @blur="chkServerport" v-model="serverport" max="100" min="0" @focus="isEmpty('.serverport')"></input>
                            <span class="mi">* 必填</span>
                        </td>
					</tr>
                    <tr>
                        <td style="width: 600px;">
                            端口响应概率：<input type="number" class="portrespp" data-toggle="popover" data-placement="top"
                            @blur="chkPortpp()" v-model="portrespp" max="100" min="0" step="1" @focus="noEmpty('.portrespp')">(%)</input>
                            <span class="mi">* 必填</span>                            
                        </td>
                        <td style="width: 600px;"></td>
					</tr>
                    <tr>
                        <td style="padding-left: 235px;" colspan="2" >
                            响应mac标识：<input class="long-input portmacmark" data-toggle="popover" data-placement="top"
                            @blur="chkMac" type="text" v-model="portmacmark" @focus="noEmpty('.portmacmark')"
                            @keyup.enter="setVhost()"></input>
                            <span class="mi">* 必填</span>
                        </td>
					</tr>
				</tbody>
			</table>
            <p style="color:#69b6ff ;">注：多个端口或响应mac标识用“，”隔开。百分比默认保留小数点后两位。</p>
		</div>
        <errormsg :error='error'></errormsg>
        <success></success>
        <fail></fail>
	</div>
</template>
<script>
    import netservice from 'services/netService'
    import formatTest from 'libs/formatTest'
    import errormsg from './vresconf/errormsg.vue'
    import success from './tags/success.vue'
    import fail from './tags/fail.vue'

	export default {
        
        components: {
            errormsg,
            success,
            fail
        },

        mounted() {
           this.getVhost();
        },
        
        data(){
            return {
                linuxpp:"",
                linuxport:"",
                windowspp:"",
                windowsport:"",
                serverpp:"",
                serverport:"",
                portrespp:"",
                portmacmark:"",
                error:"",
                type:""
            }
        },

        methods: {
            setVhost(){
                if( this.checkPer() && this.checkPort() && this.checkEachport() ){
                    var vhost = {
                        type:"vhost",
                        linux_num:this.linuxpp,
                        linux_port:this.linuxport,
                        windows_num:this.windowspp,
                        windows_port:this.windowsport,
                        server_num:this.serverpp,
                        server_port:this.serverport,
                        virtual_port_percent:this.portrespp,
                        virtual_mac:this.portmacmark,
                    }
                    netservice.setVhost(vhost)
                    .then((recvdata) => {
                        recvdata = jQuery.parseJSON(recvdata);
                        if(recvdata.success && recvdata.data.result == "ok") {
                            this.getVhost()
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
            checkPer(){
                var regNum = /0$|(^[1-9]\d*$)/;

                if( !regNum.test(this.linuxpp) ){
                    this.shock(".linuxpp")
                    this.popoverShow('.linuxpp', 'Linux主机比例输入有误')
                    return false;
                }else{
                    this.noshock(".linuxpp")
                } 
                if( !regNum.test(this.windowspp) ){
                    this.shock(".windowspp")
                    this.popoverShow('.windowspp', 'Windows主机比例输入有误')
                    return false;
                }else{
                    this.noshock(".windowspp")
                }  
                if( !regNum.test(this.serverpp) ){
                    this.shock(".serverpp")
                    this.popoverShow('.serverpp', 'Server主机比例输入有误')
                    return false;
                }else{
                    this.noshock(".serverpp")
                }  
                if((parseFloat(this.linuxpp)+parseFloat(this.windowspp)+parseFloat(this.serverpp)) > 100 ){
                    this.shock(".linuxpp")
                    this.shock(".windowspp")
                    this.shock(".serverpp")
                    this.popoverShow('.serverpp', 'Linux主机、Windows主机与Server主机比例大于100')
                    return false;
                }else{
                    this.noshock(".linuxpp")
                    this.noshock(".windowspp")
                    this.noshock(".serverpp")
                }
                if( !regNum.test(this.portrespp) ){
                    this.shock(".portrespp")
                    this.popoverShow('.portrespp', '端口响应比例输入有误')
                    return false;
                }else{
                    this.noshock(".portrespp")
                }  
                if( this.portrespp > 100 ){
                    this.shock(".portrespp")
                    this.popoverShow('.portrespp', '端口响应概率大于100')
                    return false;
                }else{
                    this.noshock(".portrespp")
                } 
                return true;
            },
            checkPort(){
                var regMarkinput = /^[0-9a-zA-Z,]+$/;
                var regPortinput = /^[0-9,]+$/;

                this.portmacmark = this.portmacmark.replace(/，/g,",")
                this.linuxport = this.linuxport.replace(/，/g,",")
                this.windowsport = this.windowsport.replace(/，/g,",")
                this.serverport = this.serverport.replace(/，/g,",")
            
                if( !regMarkinput.test(this.portmacmark)){
                    this.shock(".portmacmark")
                    return false;
                }else{
                    this.noshock(".portmacmark")
                }  
                if( !regPortinput.test(this.linuxport)){
                    this.shock(".linuxport")
                    return false;
                }else{
                    this.noshock(".linuxport")
                }  
                if( !regPortinput.test(this.windowsport)){
                    this.shock(".windowsport")
                    return false;
                }else{
                    this.noshock(".windowsport")
                }  
                if( !regPortinput.test(this.serverport)){
                    this.shock(".serverport")
                    return false;
                }else{
                    this.noshock(".serverport")
                } 
                return true;
            },
            checkEachport(){
                var regPort = /^((([1-9]\d{0,3})|([1-5]\d{4})|(6[0-4]\d{3})|(65[0-4]\d{2})|(655[0-2]\d)|(6553[0-5])),){0,19}(([1-9]\d{0,3})|([1-5]\d{4})|(6[0-4]\d{3})|(65[0-4]\d{2})|(655[0-2]\d)|(6553[0-5]))$/;
                var regMac = /^(([0-9A-Fa-f]{6}),){0,9}([0-9A-Fa-f]{6})$/;

                var mac = this.portmacmark.split(",")
                var linux = this.linuxport.split(",")
                var windows = this.windowsport.split(",")
                var server = this.serverport.split(",")

                if( linux.length > 15 ){
                    this.shock(".linuxport")
                    this.popoverShow('.linuxport', '端口最多15个')
                    return false;
                }else{
                    this.noshock(".linuxport")
                }
                for( let i=0 ; i < linux.length ; i++ ){
                    if( !regPort.test(linux[i]) ){
                        this.shock(".linuxport")
                        this.popoverShow('.linuxport', "第" + (i+1) +"个端口格式有误")
                        return false;
                    }else{
                        this.noshock(".linuxport")
                    }
                }
                
                if( windows.length > 15 ){
                    this.shock(".windowsport")
                    this.popoverShow('.windowsport', '端口最多15个')
                    return false;
                }else{
                    this.noshock(".windowsport")
                }
                for( let i=0 ; i < windows.length ; i++ ){
                    if( !regPort.test(windows[i]) ){
                        this.shock(".windowsport")
                        this.popoverShow('.windowsport', "第" + (i+1) +"个端口格式有误")
                        return false;
                    }else{
                        this.noshock(".windowsport")
                    }
                }
                
                if( server.length > 15 ){
                    this.shock(".serverport")
                    this.popoverShow('.serverport', '端口最多15个')
                    return false;
                }else{
                    this.noshock(".serverport")
                }
                for( let i=0 ; i < server.length ; i++ ){
                    if( !regPort.test(server[i]) ){
                        this.shock(".serverport")
                        this.popoverShow('.serverport', "第" + (i+1) +"个端口格式有误")
                        return false;
                    }else{
                        this.noshock(".serverport")
                    }
                }

                if( mac.length > 10 ){
                    this.shock(".portmacmark")
                    this.popoverShow('.serverport', '响应mac标识最多10个')
                    $("#errorfail").modal('show');
                    return false;
                }else{
                    this.noshock(".portmacmark")
                } 
                for( let i=0 ; i < mac.length ; i++ ){
                    if( !regMac.test(mac[i]) ){
                        this.shock(".portmacmark")
                        this.popoverShow('.portmacmark', "第" + (i+1) +"个端口格式有误")
                        return false;
                    }else{
                        this.noshock(".portmacmark")
                    }
                }
                return true;
            },
            getVhost(){
				// netservice.getAllnet()
				// .then((recvdata) => {
                    let recvdata = {"success":true,"data":{"config":{"rip":[{"ABCD":"172.16.0.0","MASK":"255.255.0.0","vlanid":"0","groupid":"1","hash_code":"c7ed"},{"ABCD":"172.16.0.0","MASK":"255.255.0.0","vlanid":"0","groupid":"2","hash_code":"e5ae"},{"ABCD":"172.16.0.0","MASK":"255.255.0.0","vlanid":"0","groupid":"3","hash_code":"36f"}],"vip":[{"ABCD":"10.0.0.0","MASK":"255.255.0.0","vlanid":"0","groupid":"1","hash_code":"8247"},{"ABCD":"10.0.0.0","MASK":"255.255.0.0","vlanid":"0","groupid":"2","hash_code":"1c48"},{"ABCD":"10.0.0.0","MASK":"255.255.0.0","vlanid":"0","groupid":"3","hash_code":"b649"}],"wip":[{"ABCD":"10.168.10.0","MASK":"255.255.255.0","vlanid":"0","gateway":"10.168.10.1","groupid":"1","hash_code":"b39d"},{"ABCD":"10.168.10.0","MASK":"255.255.255.0","vlanid":"0","gateway":"10.168.10.1","groupid":"2","hash_code":"acbc"},{"ABCD":"10.168.10.0","MASK":"255.255.255.0","vlanid":"0","groupid":"3","gateway":"10.168.10.1","hash_code":"d6db"}],"vnet":[{"ABCD":"10.168.20.1","MASK":"255.255.255.0","vlanid":"1","groupid":"1","hash_code":"4e6e"},{"ABCD":"192.168.2.94","MASK":"255.255.255.0","vlanid":"0","groupid":"1","hash_code":"7ad6"}],"norip":[],"novip":[],"nowip":[],"novnet":[],"vhost":{"virtual_port_percent":"60.00","windows_num":"20.00","linux_num":"45.00","server_num":"35.00","linux_port":{"port":["22","23","139","5800","4899","5631","5632"]},"server_port":{"port":["80","21","23","25","3389","8080","110","143","1433","443"]},"windows_port":{"port":["135","445","3389","5800","4899","5631","5632"]},"virtual_mac":{"vmac":["0021cc","000c29","8c89a5","001b21","009c02"],"port":[]}}},"result":""}}
					// recvdata = jQuery.parseJSON(recvdata);
					this.linuxpp = recvdata.data.config.vhost.linux_num
                    this.windowspp = recvdata.data.config.vhost.windows_num
                    this.serverpp = recvdata.data.config.vhost.server_num
                    this.portrespp = recvdata.data.config.vhost.virtual_port_percent
                    this.linuxport = this.arr2string(recvdata.data.config.vhost.linux_port.port)
                    this.windowsport = this.arr2string(recvdata.data.config.vhost.windows_port.port)
                    this.serverport = this.arr2string(recvdata.data.config.vhost.server_port.port)
                    this.portmacmark = this.arr2string(recvdata.data.config.vhost.virtual_mac.vmac)
				// })
       		},
            chkLinuxpp(){
                var regNum = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
                if( !regNum.test(this.linuxpp) ){
                    this.shock(".linuxpp")
                    return false;
                }else{
                    this.noshock(".linuxpp")
                } 
            },
            chkWindowspp(){
                var regNum = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
                if( !regNum.test(this.windowspp) ){
                    this.shock(".windowspp")
                    return false;
                }else{
                    this.noshock(".windowspp")
                }  
            },
            chkServerpp(){
                var regNum = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
                if( !regNum.test(this.serverpp) ){
                    this.shock(".serverpp")
                    return false;
                }else{
                    this.noshock(".serverpp")
                    if((parseFloat(this.linuxpp)+parseFloat(this.windowspp)+parseFloat(this.serverpp)) > 100 ){
                        this.shock(".linuxpp")
                        this.shock(".windowspp")
                        this.shock(".serverpp")
                        this.popoverShow('.serverpp', 'Linux主机、Windows主机与Server主机比例大于100')
                        return false;
                    }else{
                        this.noshock(".linuxpp")
                        this.noshock(".windowspp")
                        this.noshock(".serverpp")
                    }
                }    
                
            },
            chkPortpp(){
                var regNum = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
                if( !regNum.test(this.portrespp) ){
                    this.shock(".portrespp")
                    this.popoverShow('.portrespp', '端口响应比例输入有误')
                    return false;
                }else{
                    this.noshock(".portrespp")
                }  
                if( this.portrespp > 100 ){
                    this.shock(".portrespp")
                    this.popoverShow('.portrespp', '端口响应概率大于100')
                    return false;
                }else{
                    this.noshock(".portrespp")
                } 
            },
            chkLinuxport(){
                this.linuxport = this.linuxport.replace(/，/g,",")
                var regPortinput = /^[0-9,]+$/;
                var regPort = /^((([1-9]\d{0,3})|([1-5]\d{4})|(6[0-4]\d{3})|(65[0-4]\d{2})|(655[0-2]\d)|(6553[0-5])),){0,19}(([1-9]\d{0,3})|([1-5]\d{4})|(6[0-4]\d{3})|(65[0-4]\d{2})|(655[0-2]\d)|(6553[0-5]))$/;
                if( !regPortinput.test(this.linuxport)){
                    this.shock(".linuxport")
                    return false;
                }else{
                    this.noshock(".linuxport")
                    var linux = this.linuxport.split(",")
                    if( linux.length > 15 ){
                        this.shock(".linuxport")
                        this.popoverShow('.linuxport', '端口最多15个')
                        return false;
                    }else{
                        this.noshock(".linuxport")
                    }
                    for( let i=0 ; i < linux.length ; i++ ){
                        if( !regPort.test(linux[i]) ){
                            this.shock(".linuxport")
                            this.popoverShow('.linuxport', "第" + (i+1) +"个端口格式有误")
                            return false;
                        }else{
                            this.noshock(".linuxport")
                        }
                    }
                }  
            },
            chkWindowsport(){
                this.windowsport = this.windowsport.replace(/，/g,",")
                var regPortinput = /^[0-9,]+$/;
                var regPort = /^((([1-9]\d{0,3})|([1-5]\d{4})|(6[0-4]\d{3})|(65[0-4]\d{2})|(655[0-2]\d)|(6553[0-5])),){0,19}(([1-9]\d{0,3})|([1-5]\d{4})|(6[0-4]\d{3})|(65[0-4]\d{2})|(655[0-2]\d)|(6553[0-5]))$/;
                if( !regPortinput.test(this.windowsport)){
                    this.shock(".windowsport")
                    return false;
                }else{
                    this.noshock(".windowsport")
                    var windows = this.windowsport.split(",")
                    if( windows.length > 15 ){
                        this.shock(".windowsport")
                        this.popoverShow('.windowsport', '端口最多15个')
                        return false;
                    }else{
                        this.noshock(".windowsport")
                    }
                    for( let i=0 ; i < windows.length ; i++ ){
                        if( !regPort.test(windows[i]) ){
                            this.shock(".windowsport")
                            this.popoverShow('.windowsport', "第" + (i+1) +"个端口格式有误")
                            return false;
                        }else{
                            this.noshock(".windowsport")
                        }
                    }
                }  
            },
            chkServerport(){
                this.windowsport = this.windowsport.replace(/，/g,",")
                var regPortinput = /^[0-9,]+$/;
                var regPort = /^((([1-9]\d{0,3})|([1-5]\d{4})|(6[0-4]\d{3})|(65[0-4]\d{2})|(655[0-2]\d)|(6553[0-5])),){0,19}(([1-9]\d{0,3})|([1-5]\d{4})|(6[0-4]\d{3})|(65[0-4]\d{2})|(655[0-2]\d)|(6553[0-5]))$/;
                if( !regPortinput.test(this.serverport)){
                    this.shock(".serverport")
                    return false;
                }else{
                    this.noshock(".serverport")
                    var server = this.serverport.split(",")
                    if( server.length > 15 ){
                        this.shock(".serverport")
                        this.popoverShow('.serverport', '端口最多15个')
                        return false;
                    }else{
                        this.noshock(".serverport")
                    }
                    for( let i=0 ; i < server.length ; i++ ){
                        if( !regPort.test(server[i]) ){
                            this.shock(".serverport")
                            this.popoverShow('.serverport', "第" + (i+1) +"个端口格式有误")
                            return false;
                        }else{
                            this.noshock(".serverport")
                        }
                    }
                } 
            },
            chkMac(){
                this.portmacmark = this.portmacmark.replace(/，/g,",")
                var regMarkinput = /^[0-9a-zA-Z,]+$/;
                var regMac = /^(([0-9A-Fa-f]{6}),){0,9}([0-9A-Fa-f]{6})$/;
                if( !regMarkinput.test(this.portmacmark)){
                    this.shock(".portmacmark")
                    return false;
                }else{
                    this.noshock(".portmacmark")
                    var mac = this.portmacmark.split(",")
                    if( mac.length > 10 ){
                        this.shock(".portmacmark")
                        this.popoverShow('.serverport', '响应mac标识最多10个')
                        $("#errorfail").modal('show');
                        return false;
                    }else{
                        this.noshock(".portmacmark")
                    } 
                    for( let i=0 ; i < mac.length ; i++ ){
                        if( !regMac.test(mac[i]) ){
                            this.shock(".portmacmark")
                            this.popoverShow('.portmacmark', "第" + (i+1) +"个端口格式有误")
                            return false;
                        }else{
                            this.noshock(".portmacmark")
                        }
                    }
                }  
            },
            reset(){
                this.linuxpp="",
                this.linuxport="",
                this.windowspp="",
                this.windowsport="",
                this.serverpp="",
                this.serverport="",
                this.portrespp="",
                this.portmacmark=""
            },
            arr2string(a){
                var s = a.join(",")
                return s;
            },
            testVal(ele, reg) {
				var val = $(ele).val()
				var test = new formatTest(ele, reg, false)
				return test.testFormat()
			},
            isEmpty(ele) {
                var test = new formatTest(ele)
			    test.isEmpty()
			},
            noEmpty(ele) {
                var test = new formatTest(ele)
			    test.notEmpty()
			},
            ppEmpty(){
                $(".windowspp").parent().find('.mi').css('color', '#d2d2d2')
		        $(".windowspp").css('border', '1px solid #e8e8e8')
                $(".linuxpp").parent().find('.mi').css('color', '#d2d2d2')
		        $(".linuxpp").css('border', '1px solid #e8e8e8')
                $(".serverpp").parent().find('.mi').css('color', '#d2d2d2')
		        $(".serverpp").css('border', '1px solid #e8e8e8')
            },
            shock(ele){
                if($(ele).val()==''){
                    $(ele).parent().find('.mi').css('color', '#b63039')
                }
				$(ele).css('border', '1px solid #b63039')
				$(ele).addClass('animated shake')
				setTimeout(function() {
					$(ele).removeClass('animated shake')
				}, 200)
            },
            noshock(ele){
                $(ele).css('border', '1px solid #e8e8e8')
            },
            popoverShow(ele, content) {
				$(ele).attr("data-content", content).popover('show')
				setTimeout(function() {
					$(ele).popover('destroy')
				}, 1000)
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
    .butn {
		display: inline-block;
		float: right;
	}
	.butn li{
		display: inline-block;
		margin: 0px 25px 0px 0px;
		cursor: pointer;		
	}
	.butn span{
		vertical-align: middle;
	}
	.butn img {
		margin: 0 5px;
        width: 12px;
	}
	.table-wrap{
		margin: 20px;
	}
	thead {
		background: #69b6ff;
		color: #ffffff;
	}
    tbody tr {
		height: 60px;
	}
	thead tr th {
        height: 30px;
        text-align: left;
        padding-left: 15px;
		color: #ffffff;
        position: relative;
	}
    tbody tr td {
        border-left: 1px solid #c9e4ff;
        border-bottom: 1px solid #c9e4ff;
    }
    tbody tr td:nth-child(1){
        text-align: right;
        padding-right: 45px;
    }
    tbody tr td:last-child{
        text-align: left;
        padding-left: 55px;
    }
    tbody tr:last-child td:nth-child(1){
        padding-right: 63px;
    }
    tbody tr:nth-child(4),
    tbody tr:nth-child(5) {
        background: #e1f0ff;
    }
    tbody tr:nth-child(4) td {
        padding-top: 15px;
    }
    tbody tr td:last-child{
        border-right: 1px solid #c9e4ff;
    }
    thead tr th{
        border-right: 1px solid #69b6ff;
    }
    input{
        height: 25px;
        width: 130px;
        border: 1px solid #e6e6e6;
        border-radius: 5px;
        margin-right: 8px;
        padding: 3px;
    }
    .long-input{
        width: 300px;
        background: #ffffff;
    }
    p {
		color: #fb5656;
		margin-top: 20px;
	}
    .mi {
		color: #d2d2d2;
		margin-left: 10px;
	}
    .actived{
		color:#1e5ac9;
	}
	.unactived{
		color:#FFFFFF;
	}
</style>