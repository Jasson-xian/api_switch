<template>
	<div class="wrap">
		<div class="title">
			<h3>集中管理</h3>
		</div>
		<div class="table-wrap">
			<table>
				<thead>
					<tr>
						<th style="width:380px;text-align: right;padding-right: 10px">内容</th>
                        <th style="width:640px;padding-left:75px">信息</th>
                        <th style="width:180px;text-align:center ">操作</th>
					</tr>
				</thead>
				<tbody @keyup.enter='savedata()'>
					<tr>
                        <td>服务器IP/域名:</td>
                        <td>
                        	<input type="text" @focus="empty('.ip')" v-model=address class="ip compile" @blur="testVal('.ip','realm_ip',false)" >
                            <span class="mi"> *必填</span>
                        </td>
                        <td rowspan="4" style="background-color: #fff;text-align: center;vertical-align: middle;border-bottom: 1px solid #69b6ff">							
							<button class="button button--aylen" @click="savedata()" style="padding: 2px 6px;background: #feae00;color: #fff;line-height:20px;width:60px;border-radius: 5px; ">确&nbsp&nbsp定</button>
						</td>
					</tr>
					<tr>
					    <td>端口:</td>
                        <td>
                        	<input type="text"   v-model=port class="port compile" @blur="testVal('.port','prot',false)"  @focus="empty('.port')">
                        	<span class="mi"> *必填</span>
                        </td>
					</tr>
					<tr>					
						<td>密钥:</td>
                        <td>
                        	<input type="password" @blur="leave('.password')" @focus="empty('.password')" v-model=secret  class="password compile">
                            <span class="mi"> *必填</span>
                        </td>
					</tr>
                    <tr>					
						<td>状态:</td>
						<td style="padding-left: 75px">{{this.status}}</td>
					</tr>
				</tbody>
			</table>
			<success></success>
			<fail></fail>
		</div>
	</div>
</template>
<script>
 import systemService from 'services/systemService'
 import success from './tags/success'
 import fail from './tags/fail'
 import formatTest from 'libs/formatTest'
 export default {
	  data() {
            return {
              oper:'get_remote',
			  address:'',
			  port:'',
			  secret:'',
			  status:'',
			  isok:true,
			  portStatus:true,
			  ipStatus:true,  
            }
        },
        created: function () {
			let setdata={
					oper:this.oper
				}
           this.getData(setdata);
        },
		 methods: {
			 saveSysInfo:function(){
				 $("input").css("background-color","#fff")
			 },
			  testVal: function(ele, reg,empty) {
				var test = new formatTest(ele, reg, empty)
				switch (ele) {
					case '.port':
						this.portStatus=test.testFormat()
						break;
					case '.ip':
						this.ipStatus=test.testFormat()
						break;
					default:
						break;
				}	
				$(ele).css("outline",'none')		
			},
			isEmpty:function(ele) {
				var val = $(ele).val()
				if(!val) {
					this.testStatus=false
					$(ele).css("border",'1px solid #b63039')
					$(ele).addClass("animated shake")
					$(ele).parent().find('.mi').css('color', '#b63039')
					setTimeout(function() {
						$(ele).removeClass('animated shake')
					}, 200)
				}else{
					$(ele).parent().find('.mi').css('color', '#d2d2d2')
						$(ele).css('border', '1px solid #e8e8e8')
				}
				$(ele).css("outline",'none')	
			},
			empty:function(ele){
				var test = new formatTest(ele)
				test.notEmpty()
				$(ele).css("outline",'1px solid #96ccff')
				$(ele).parent().find('.mi').css('color', '#d2d2d2')
			},
			leave(ele){
				if($(ele).val()==''){
					this.isEmpty(ele)
				}
			},
			 getData(setdata){
				// systemService.getSysPolice(setdata)
                //     .then((recvdata) => {
                //         recvdata = jQuery.parseJSON(recvdata);
                //         if (recvdata.success) {
				// 			if(setdata.oper!='set_remote'){
								this.address='www.veda.net';
								this.port='8080';
								this.secret='121213';
								this.status=1
								if(status==1){
									this.status='已链接'
								}else{
									this.status='未链接'
								}
					// 		}
					// 		if(setdata.oper=='set_remote'){
					// 			$("#success").modal('show')
					// 		}	 
                    //     }else{
					// 		 if(setdata.oper=='set_remote'){
					// 			 $("#fail").modal('show')
					// 		}
					// 	}
                    // })
			 },
			 savedata(){
				 this.oper='set_remote'
				 let setdata={
					oper:this.oper,
					address:this.address,
					port:this.port,
					secret:this.secret
				}
				if(this.portStatus&&this.ipStatus&&$(".password").val()){
					this. getData(setdata)
				}else{
					this.isEmpty(".password")
					this.testVal('.port','prot',false)
					this.testVal('.ip','realm_ip',false)
				}	
			 }
		 },
		 components:{
			 success,
			 fail
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
    input{
        border: 1px solid #e6e6e6;
        border-radius:5px;
        height: 20px;
        width: 174px; 
        margin-left:75px;
		padding: 3px 10px;
		background:#fff;
    }
    /*th,td{
        box-sizing: border-box;
        padding: 20px;
    }*/
	thead {
		background: #69b6ff;
		color: #ffffff;
	}
    thead tr th {
        text-align: left;
        padding-left: 15px;
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
    td:first-child{
        text-align: right;
        padding-right: 10px;
        border-left: 1px solid #69b6ff;
    }
    tr:last-child td {
        border-bottom: 1px solid #69b6ff;
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
	.mi {
		color: #d2d2d2;
		margin-left: 10px;
	}
</style>