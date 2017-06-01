<template>
	<div class="wrap">
		<div class="title">
			<h3>
                诊断工具 
            </h3>
		</div>
		<div class="table-wrap">
            <p>
                <span  style="width: 100px;border-right:1px solid #69b6ff;padding: 0 15px " @click='pinkPage()'>
                    <button class="button button--aylen" style="background-color: #e0e0e0;">Ping</button>
                </span>
                <span>
                    <button class="button button--aylen" style="background-color: #feae00;color: #fff;margin-left: 12px">TraceRoute</button>
                </span>
            </p>
			<table>
				<thead>
					<tr>
						<th style="width: 1200px;" colspan="4">
                            <span style="color: #fff;margin-left: 10px">TraceRoute</span>
                            <span style="float:right;padding: 0 15px " @click='diagnose()'>
                                <button class="button button--aylen" style=" background-color: #feae00;color: #fff;padding: 0 10px;line-height: 20px">
                                    <img src="../../../../img/diagnose.png" style="margin-right: 5px;margin-bottom:3px;width: 13px;vertical-align: middle"  alt="">开始诊断</button>
                            </span>
                        </th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td style="width: 100px; text-align: left;padding-left: 25px">IP</td>
						<td style="width: 500px;">
                            <ipinput class="tr_ip" :empty=false></ipinput>
                            <span class="mi">*必填</span>
                        </td>
						<td style="width: 100px;"></td>
                        <td style="width: 500px;"></td>
					</tr>
					<tr>
                        <td style="width: 100px; text-align: left;padding-left: 25px">最小TTL</td>
                        <td style="width: 500px;">
                            <input type="number" @focus="empty('.tr_min_ttl')" v-model=min_ttl min="1"  max='255' step="1" @keyup.enter="diagnose()" @blur="wordslength('.tr_min_ttl',0,256)" class="tr_min_ttl">
                            <span class="mi">(1-255)</span></td>
						<td style="width: 100px;">最大TTL</td>
						<td style="width: 500px;"><input type="number" min="64"  max='8000' step="1"  @focus="empty('.tr_max_ttl')" v-model=max_ttl  @keyup.enter="diagnose()" @blur="wordslength('.tr_max_ttl',0,256)" class="tr_max_ttl">
						<span class="mi">(1-255)</span></td>
					</tr>
					<tr>					
						<td style="text-align: left;vertical-align: top;line-height:25px;padding-left: 23px;" colspan="4">
                            测试结果:
                            <ul id='tracerouteScroll' style="height:100%;overflow-y:auto;max-height: 500px;min-height: 300px;padding:0 10px 20px;width: 100%;box-sizing: border-box">
                                <li v-for='item in traResult'>{{item}}</li>
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
import formatTest from 'libs/formatTest'
import ipinput from 'components/libs/ipinput'
export default{
    components:{
        ipinput
    },
    props:{
        traResult:{
             type: Array,
            require: true
        }
    },
    data(){
        return{
            min_ttl:'',
            max_ttl:'',
            ip:'',
            status:false,
            minlength:false,
            maxlength:false
        }
    },
    methods:{
        pinkPage(){
            let status=true
            this.$emit("pinkPage",status)
        },
        diagnose(){
            this.wordslength('.tr_min_ttl',0,256)
            this.wordslength('.tr_max_ttl',0,256)
            let tr_ip=this.ipVal('.tr_ip')
            
           if(this.testMacIp('.tr_ip','ip')&&this.minlength&&this.maxlength){
                let type={}
                type.status=true
                type.type='traceroute'
                type.ip=tr_ip
                type.min_ttl=this.min_ttl
                type.max_ttl=this.max_ttl
                this.$emit("diagnose",type)
          }else{
              this.isEmpty('.tr_min_ttl')
              this.isEmpty('.tr_max_ttl')
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
						if(ele=='.tr_min_ttl'){
                            this.minlength=true;
                        }else{
                            this.maxlength=true
                        }
						$(ele).css("border-color",'#d2d2d2')
					}else{
					   if(ele=='.tr_min_ttl'){
                            this.minlength=false;
                        }else{
                            this.maxlength=false
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
    .rotate{
    	width: 18px;
    	display: none;
        animation: rot 1s infinite;
    }
    .tr_ip{
        margin-right: 10px;
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
     button{
        border-radius: 3px;
        height: 20px;
        padding:0 20px;
        background: #fff 
    }
	.table-wrap{
		margin: 15px 20px 20px 20px;
	}
    .table-wrap p{
        margin:15px 0;
    }
    input{
        border: 1px solid #e6e6e6;
        border-radius:5px;
        height: 25px;
        width: 180px; 
        margin-right: 10px;
        padding: 3px;
        padding-left: 10px;
        background: #FFFFFF;
        /*vertical-align: bottom*/
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
        line-height: 20px;
        vertical-align: middle;
        color: #575757;
    }
</style>