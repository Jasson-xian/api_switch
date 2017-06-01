<template>
    <div class="table-wrap">
        <table>
            <thead>
                <tr>
                    <th style="width: 190px;padding-left:20px" >规则名称</th>
                    <th style="width: 1010px;text-align: right" colspan="3"><button class="button button--aylen" @click="syschange()">返回</button><button class="button button--aylen" @click='savechange()'>确认</button></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="width: 190px;">允许设备的IP：</td>
                    <td style="width: 1010px;">
                        <!--<input type="text" @focus="empty('.changeIp')" v-model=ip @keyup.enter='savechange()' @blur="testVal('.changeIp','ip',false)" @keyup="isEmpty('.changeIp')" class="changeIp">-->
                        <ipinput class="changeIp" :empty=false></ipinput>
                        <span class="mi">*必填</span>
                    </td>
                </tr>
                <tr>
                    <td style="width: 190px;height: 90px;text-align: left;vertical-align: top;padding-top: 15px">描述</td>
                    <td style="width: 1010px; height: 90px">
                    <textarea name="" @focus="empty('.descriptionText')" class="descriptionText " v-model=description ></textarea>
                    <span class="mi">*必填 ( 文字描述不超过100字 )</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    import formatTest from 'libs/formatTest'
    import ipinput from 'components/libs/ipinput'
    export default {
        components:{
			ipinput
		},
        props: {
            change: {
                type: Boolean,
                twoWay: true
            },
            changeArr: {
                type: Array,
                require: true
            }
        },
        watch:{
           changeArr:function(){
               let arrip=this.changeArr[0].split('.')
               $('.changeIp input').eq(0).val(arrip[0])
               $('.changeIp input').eq(1).val(arrip[1])
               $('.changeIp input').eq(2).val(arrip[2])
               $('.changeIp input').eq(3).val(arrip[3])
                this.description = this.changeArr[1];
            }
        },
        data() {
            return {
                ip: '',
                description: '',
                status:true,
                length:true
            }
        },
        methods: {
            empty:function(ele){
				var test = new formatTest(ele)
				test.notEmpty()
                $(ele).css("outline",'1px solid #96ccff')
			},
            testVal: function(ele, reg) {
			    var val = $(ele).val()
				var test = new formatTest(ele, reg, false)
				this.status=test.testFormat()	
                $(ele).css("outline",'none')		
			},
			isEmpty:function(ele) {
				var val = $(ele).val()
				if(val) {
					$(ele).parent().find('.mi').css('color', '#d2d2d2')
					$(ele).css('border', '1px solid #e8e8e8')
				}
			},
            syschange: function () {
                let msg = !this.change
                this.$emit("message", msg)
            },
            savechange:function(){
                this.wordslength('.descriptionText',0,100)
                // this.testVal('.changeIp','ip',false)
                 let changeIp=this.ipVal('.changeIp')
                 if(this.testMacIp('.changeIp','ip')&&this.length){
                    let msg={
                        change:!this.change,
                        ip:changeIp,
                        description:this.description
                    }
                    this.$emit("save", msg)
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
            wordslength:function(ele,v1,v2){
               if(this.description.length<v2&&this.description.length>v1){
						this.length=true;
						$(ele).css("border",'1px solid #d2d2d2')
						$(ele).parent().find('.mi').css("color",'#d2d2d2')	
					}else{
						this.length=false;
						$(ele).css("border",'1px solid #b63039')
						$(ele).addClass("animated shake")
						setTimeout(function() {
							$(ele).removeClass('animated shake')
						}, 200)
						$(ele).parent().find('.mi').css("color",'#b63039')
					}
            }
        }

    }

</script>
<style scoped>
    .changeIp{
        margin-right: 10px;
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
		margin: 20px;
	}
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
    input{
        border: 1px solid #e6e6e6;
        border-radius:5px;
        height: 20px;
        width: 174px; 
        margin-right:10px;
        padding-left: 10px;
        vertical-align: bottom;
        background-color: #fff;
    }
    .button{
        padding: 0 6px 2px;
        background: #feae00;
        color: #fff;
        line-height:20px;
        width:60px;
        border-radius: 5px;
        margin-right: 30px;		
    }
	th {
		color: #ffffff;
		border-right: 1px solid #69b6ff;
	}
    td {
        padding-left: 20px;
        border-right: 1px solid #b2daff;
    }
    tr td:first-child{
         border-left: 1px solid #69b6ff;
    }
    tr:last-child td {
        border-bottom: 1px solid #69b6ff;
    }
    tr td:last-child {
        border-right: 1px solid #69b6ff;
    }
	tbody tr:nth-child(odd){
		background: #e1f0ff;
	}
    tbody tr:nth-child(even){
		background:#fff;
	}
    .mi{
		/*margin-left: 5px;/*/
        line-height: 20px;
		color: #d2d2d2;
	}
    .descriptionText{
        border: 1px solid #e6e6e6;
        border-radius: 5px;
        width: 460px;
        height: 70px;
        resize: none;
        box-sizing: border-box;
        padding: 5px;
        margin-right:5px; 
    }
</style>