<template>
	<div class="wrap">
		<div class="title">
			<h3>
                诊断工具 
            </h3>
		</div>
		<div class="table-wrap">
            <p>
                <span style="width: 100px;border-right:1px solid #69b6ff;padding: 0 15px ">
                    <button class="button button--aylen" style="background-color: #feae00;color: #fff">Ping</button>
                </span>
                <span @click='traceRoutePage'>
                    <button class="button button--aylen" style="background-color: #e0e0e0;margin-left: 12px">TraceRoute</button>
                </span>
            </p>
			<table>
				<thead>
					<tr>
						<th style="width: 1200px;" colspan="4">
                            <span style="color: #fff;margin-left: 5px">Ping</span>
                            <span style="float:right;padding: 0 15px " @click='diagnose()'>
                                <button class="button button--aylen" style="background-color: #feae00;color: #fff;padding: 0 10px">
                                    <img src="../../../../img/diagnose.png" style="margin-right: 5px;margin-bottom:3px;width: 13px" alt="">开始诊断
                                </button>
                            </span>
                        </th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td style="width: 100px; text-align: left;padding-left: 23px;">IP</td>
						<td style="width: 500px;">
                            <ipinput class="pinkip" @keyup.enter="diagnose()" :empty=false></ipinput>
                            <span class="mi">*必填</span>
                        </td>
						<td style="width: 100px;"></td>
						<td style="width: 500px;"></td>
					</tr>
					<tr>
                        <td style="width: 100px;">Ping次数</td>
                        <td style="width: 500px;"><input type="number" min="1"  max='255' step="1" @focus="empty('.pinktimes')" @keyup.enter="diagnose()" @blur='wordslength(".pinktimes",0,101)' class="pinktimes" v-model=times> <span class="mi">(1-100)</span></td>
						<td style="width: 100px;">报文长度</td>
                        <td style="width: 500px;"><input type="number" min="64"  max='8000' step="1"  @focus="empty('.pinklength')" @keyup.enter="diagnose()" @blur='wordslength(".pinklength",63,8001)' class="pinklength" v-model=length> <span class="mi">(64-8000字节)</span></td>
					</tr>
					<tr>					
						<td style="text-align: left;vertical-align: top;line-height:25px;padding-left:23px" colspan="4">
                           测试结果:  
                            <ul id='pinkScroll' style="height:100%;overflow-y:auto;max-height: 500px;min-height: 300px;padding:0 10px 20px;width: 100%;box-sizing: border-box">
                                <li v-for='item in pingResult'>{{item}}
                                </li>
                                <li>
                                    <div class="rotate">|</div>
                                </li>
                            </ul>
                        </td>
						
					</tr>
				</tbody>
			</table>
		</div>
        <div id="dtBox"></div>
	</div>
</template>
<script>
import ipinput from 'components/libs/ipinput'
import formatTest from 'libs/formatTest'
export default{
    components:{
        ipinput
    },
    props: {
        pingResult:{
            type: Array,
            require: true
        }
    },
    data(){
        return{
            flag:false,
            ip:'',
            times:'5',
            length:'64',
            textlength:true,
            pinktimes:true
        }
    },
    methods:{
        traceRoutePage(){
            let status=false
            this.$emit("traceRoutePage",status)
        },
        testip(val,el){
				let flag=/^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/.test(val)
				if(!flag){
                     $(el).parent().find('.mi').css('color', '#b63039')
					 $(el+' input').css('border', '1px solid #b63039')
					$(el+' input').addClass('animated shake')
					setTimeout(function() {
						$(el+' input').removeClass('animated shake')
					}, 200)
					return false
				}else{
					$(el).parent().find('.mi').css('color', '#d2d2d2')
					$(el+' input').css('border', 'none')
					return true
				}
		},
        diagnose(){
             this.wordslength(".pinktimes",0,101)
             this.wordslength(".pinklength",63,8001)
             let pinkip=this.ipVal('.pinkip')
            if(this.testMacIp('.pinkip','ip')&&this.pinktimes&&this.textlength){
                let type={}
                type.status=true
                type.type='ping'
                type.ip=pinkip
                type.times=this.times
                type.length=this.length
                this.$emit("diagnose",type)  
            }else{
                this.isEmpty('.pinktimes')
                this.isEmpty('.pinklength')
                
            }
        },
        ipVal(ele){
                let ipVal =  ($(ele+' .ip_a').val()?$(ele+' .ip_a').val():"")+
				             ($(ele+' .ip_b').val()?'.'+$(ele+' .ip_b').val():"")+
							 ($(ele+' .ip_c').val()?'.'+$(ele+' .ip_c').val():"")+
							 ($(ele+' .ip_d').val()?'.'+$(ele+' .ip_d').val():"")
			    return ipVal
		},
       testVal: function(ele, reg) {
            var test = new formatTest(ele, reg, false)
            return test.testFormat()
        },
        testMacIp(ele,type){				
            if(type=='ip'){
                let ip_a_test = this.testVal(ele+' .ip_a', 'ip_piece')
                let ip_b_test = this.testVal(ele+' .ip_b', 'ip_piece')
                let ip_c_test = this.testVal(ele+' .ip_c', 'ip_piece')
                let ip_d_test = this.testVal(ele+' .ip_d', 'ip_piece')
                if(ip_a_test&&ip_b_test&&ip_c_test&&ip_d_test){
                    return true
                }else{
                    return false
                }	
            }
        },
		isEmpty:function(ele) {
			var val = $(ele).val()
			if(!val) {
				$(ele).css("border",'1px solid #b63039')
				$(ele).addClass("animated shake")
                $(ele).parent().find('.mi').css('color', '#b63039')
                $(ele).css("outline",'none')
				setTimeout(function() {
					$(ele).removeClass('animated shake')
				}, 200)
			}
		},
        empty:function(ele){
				$(ele).parent().find('.mi').css('color', '#575757')
		        $(ele).css('border', '')
                $(ele).css('outline', '1px solid #96ccff')
			},
        wordslength:function(ele,v1,v2){
                    if($(ele).val()<v2&&$(ele).val()>v1){
						if(ele=='.pinklength'){
                            this.textlength=true;
                        }else{
                            this.pinktimes=true;
                        }
						$(ele).css("border-color",'#d2d2d2')
					}else{
					    if(ele=='.pinklength'){
                            this.textlength=false;
                        }else{
                            this.pinktimes=false;
                        }
						$(ele).css("border",'1px solid #b63039')
                        $(ele).addClass("animated shake")
                        $(ele).parent().find('.mi').css('color', '#b63039')
                        setTimeout(function() {
                            $(ele).removeClass('animated shake')
                        }, 200)
					}
                     $(ele).css("outline",'none')
			}
    }
}
</script>
<style scoped>
    .pinkip{
        margin-right: 10px;
    }
    .rotate{
    	width: 18px;
    	display: none;
        animation: rot 1s infinite;
    }
    @keyframes rot {
        0% {
           opacity: 0
        }
        100%{
            opacity: 1
        }
    }
    @-webkit-keyframes  rot {
        0% {
           opacity: 0
        }
        100%{
            opacity: 1
        }
    }
    @-moz-keyframes rot{
   		 0% {
           opacity: 0
        }
        100%{
            opacity: 1
        }
   }
   @-ms-keyframes rot{
   		 0% {
           opacity: 0
        }
        100%{
            opacity: 1
        }
   }
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
    button{
        /*background-color:gray;*/
        /*width: 80px;*/
        /*margin-right: 18px;*/
        border-radius: 3px;
        height: 20px;
        padding:0 20px;
        background: #fff 
    }
    input{
        padding:3px; 
        border: 1px solid #e6e6e6;
        border-radius:5px;
        height: 25px;
        width: 180px; 
        margin-right: 10px;
        padding-left: 10px;
        background: #FFFFFF;
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
    .mi{
    	color: #575757;
		line-height: 20px;
        vertical-align: middle;
	}
</style>