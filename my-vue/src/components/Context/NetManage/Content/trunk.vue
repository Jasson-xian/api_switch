<template>
	<div class="wrap">
		<div class="title">
			<h3>终端透传配置</h3>
			<ul class="butn">
                <li @click='alttrunkMsg(0)' @mouseenter="actived('add')" @mouseleave="unactived()" >
                    <img v-if="type=='add'" src="../../../img/bule_add.png" />
                    <img v-else src="../../../img/add.png" />
                    <span :class="[type=='add'?'actived':'unactived']">添加</span>
                </li>
				<li @mouseenter="actived('delete')" @mouseleave="unactived()" v-on:click='rmtrunkMsg()' class="deletetag" data-placement="bottom">
                    <img v-if="type=='delete'" src="../../../img/bule_delet.png" />
                    <img v-else src="../../../img/delete.png" />
                    <span :class="[type=='delete'?'actived':'unactived']">删除</span>
                </li>
                <li @mouseenter="actived('modpic')" @mouseleave="unactived()" v-on:click='alttrunkMsg(1)' class="edittag" data-placement="bottom">
                    <img v-if="type=='modpic'" src="../../../img/bule_mod.png" />
                    <img v-else src="../../../img/modpic.png" />
                    <span :class="[type=='modpic'?'actived':'unactived']">编辑</span>
                </li>
				<addtrunk v-on:getData="setTrunk()" :oper='oper' :result='result' errorMsg='errorMsg' ></addtrunk>
                <makesure v-on:rm="rmTrunk()" :result = 'result' :name ='name' :errorMsg ='errorMsg'></makesure>
			</ul>
		</div>
		<div class="table-wrap" style="min-height: 630px;position: relative;">
            <!--加载数据-->
		    <loadSpan v-show= '!show'></loadSpan>
			<table>
				<thead>
                    <tr>
						<th style="width: 40px;">
                            <input class="checkall" @click="checkAll()" type="checkbox">
                            </th>
                        <th style="width: 60px;">序号</th>
						<th style="width: 525px;">MAC地址</th>
						<th >IP地址</th>
					</tr>
				</thead>
				<transition name="fade" mode="out-in">
                    <tbody v-if = 'show'>
                        <tr class="change" v-for="(trunk, index) in data"  @dblclick="dbclk( trunk ,index)">
                            <template v-if="trunk.id">
                                <td style="width: 40px;">
                                    <input class="check" @click.stop="eachChk()" type="checkbox" :id="index">
                                </td>
                                <td style="width: 60px;"><label :for="index">{{ index + 1+(nowpage-1)*20 }}</label></td>
                                <td style="display: none">{{ trunk.id }}</td>
                                <td ><label :for="index">{{ trunk.mac }}</label></td>
                                <td ><label :for="index">{{ trunk.ABCD }}</label></td>
                            </template>
                            <template v-else>
                                <td style="width: 40px;"></td>
                                <td style="width: 60px;"></td>
                                <td ></td>
                                <td ></td>
                            </template>
                        </tr>
                    </tbody>
                </transition>
			</table>
			<pages v-if='show' v-on:getPageData="getPageData()" :totalpage='totalpage' :nowpage='nowpage'></pages>
            <p v-if='show' style="color:#69b6ff ;">注：配置为透传终端主机，系统不做任何策略处理，直接透传。</p>
		</div>
        <leastone></leastone>
		<mustone></mustone>
	</div>
</template>
<script>
	import netservice from 'services/netService'
    import loadSpan from 'components/libs/loadSpan'
    import addtrunk from './trunk/addtrunk.vue'
	import makesure from './tags/topmakesure.vue'
    import pages from './tags/toppages.vue'
    import mustone from './tags/mustone.vue'
    import leastone from './tags/leastone.vue'

	import PageData from 'libs/PageData'
	export default {
		components: {	
			addtrunk,
			pages,
            makesure,
            leastone,
			mustone,
            loadSpan          
		},
		mounted() {
            this.getTrunk()
        },
		data() {
			return {
				name:'终端传递',
				totalpage:0,
                trunk:{},
                trunks:[],
                allTableData:[],
                nowpage:1,
                tableData:[],
                type:"",
                show:false,
                result:'',
                errorMsg:'',
                oper:''
			}
		},
		computed: {
             data: function() {
                let data = [
                    {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
                ]
                for(let i = 0; i < this.tableData.length; i++) {
                    data[i] = this.tableData[i]
                }
                return data
            }
        },
        methods: {
        	reset(){
				// this.result = ''
				this.errorMsg = ''
				$('.modal input').val('').css('border', '1px solid #e8e8e8')
                $('.modal .mac input').val('').css('border', 'none')
                $('.modal .abcd input').val('').css('border', 'none')
				$('.modal textarea').val('').css('border', '1px solid #e8e8e8')
                $('.id').html('')
				$('.mi').css('color', '#d2d2d2')
				$('.notice').hide()
                $('.altnotice').hide()
			},
            oneclk(index){  
                this.isdb=false;  
                window.setTimeout(cc, 500)
                var _this = this
                function cc(){
                    if(_this.isdb!=false)return;
                    var flag = $("#"+index).prop("checked")
                    if(flag){
                        $("#"+index).prop("checked",false)
                    }else{
                        $("#"+index).prop("checked",true)
                    }
                    _this.eachChk()
                }  
            },
             dbclk(trunk,index){ 
            	this.reset()
                if(JSON.stringify(trunk) != "{}"){
                    this.isdb=true
                    $('.check').prop('checked', false)
					$('#' + index).prop('checked', true)
					this.eachChk()
                    this.alttrunkMsg(1)
                }
            },
			rmtrunkMsg(){
				this.reset()
                let hash_arr = new Array();
                $(".check").each(function(i,e){
                    if($(e).prop("checked")){
                        hash_arr.push($(e).parent().parent().find('td')['1'].innerHTML);
                    };
                });
                if(hash_arr.length == 0){
                    this.popoverShow('.deletetag', "请选择删除内容")
                }else{
                    $('#topmakesure').modal('show')
                }
            },
            alttrunkMsg(val){
				this.reset()
                if(!val){
                   this.oper='添加'
                   this.result='add'
                   $('#addtrunk').modal('show')
                }else{
                   this.oper='修改'
                   this.result='edit'
                   let hash_arr = new Array();
                    $(".check").each(function(i,e){
                        if($(e).prop("checked")){
                            hash_arr.push($(e).parent().next().find('label').html());
                        };
                    });
                    if( hash_arr.length == 0 ){
                        this.popoverShow('.edittag', "请选择编辑内容")
                    }else if( hash_arr.length > 1 ){
                        this.popoverShow('.edittag', "每次修改一个")
                    }else if( hash_arr.length = 1 ){
                        if(this.data)
                        var index = hash_arr[0] - 1- (this.nowpage-1)*20
                        this.altTrunk(this.data[index])
                        $('#addtrunk').modal('show')
                    }
                }
            },
            arrip(el,value){
				let arrip=value.split('.')
               $(el+' input').eq(0).val(arrip[0])
               $(el+' input').eq(1).val(arrip[1])
               $(el+' input').eq(2).val(arrip[2])
               $(el+' input').eq(3).val(arrip[3])
			},
            arrmac(el,value){
				let arrip=value.split(':')
                console.log(arrip)
               $(el+' input').eq(0).val(arrip[0])
               $(el+' input').eq(1).val(arrip[1])
               $(el+' input').eq(2).val(arrip[2])
               $(el+' input').eq(3).val(arrip[3])
               $(el+' input').eq(4).val(arrip[4])
               $(el+' input').eq(5).val(arrip[5])
			},
            altTrunk(trunk){
                $('.modal .id').html(trunk.id)
                // $('.modal .abcd').val(trunk.ABCD)
                this.arrip('.abcd',trunk.ABCD)
                this.arrmac('.mac',trunk.mac)
                // $(".modal .mac").val(trunk.mac)
            },
            rmTrunk(){
                let hash_arr = new Array();
                $(".check").each(function(i,e){
                    if($(e).prop("checked")){
                        hash_arr.push($(e).parent().parent().find('td')['2'].innerHTML);
                    };            
                });
                if(hash_arr.length != 0){
                    let ipconf = {
                        oper:"del",
                        ids:this.arr2string(hash_arr)
                    };
                    this.rmove(ipconf)
                }
            },
            rmove(conf){
            	this.result = 'reqing'
                netservice.doTrunk(conf)
                .then((recvdata) => {
                    recvdata = jQuery.parseJSON(recvdata);
                    if(recvdata.success && recvdata.data.result == "ok") {
                    	this.result = 'ok'
                        $("input[type=checkbox]").prop("checked", false)
                        this.getTrunk()
                    }else{
                        this.result=='error'
                        this.errorMsg = recvdata.errorMessage
                        $('.notice').show()
                    }
                })
            },
			getTrunk(){
                let ipconf = {
                    oper:"look"
                };
                // netservice.doTrunk(ipconf)
                // .then((recvdata) => {
				// 	recvdata = jQuery.parseJSON(recvdata);
				// 	if(recvdata.success) {
                        this.show=true
                        this.allTableData = []
                        this.getPageData(this.nowpage)
                        this.totalpage = new PageData([], 20).totalpage
                        $('.check').prop('checked', false)
                        this.eachChk()
                //     }
				// })
            },
            getPageData(currentpage) {
				this.nowpage = currentpage
				var allData =  this.allTableData
				this.tableData = new PageData(allData, 20).data(this.nowpage)
				if(this.tableData=='' && this.nowpage>1){//当前页为空
					this.nowpage--
					this.tableData = new PageData(allData, 20).data(this.nowpage)
				}
			},
            ipVal(ele){
                let ipVal =  ($(ele+' .ip_a').val()?$(ele+' .ip_a').val():"")+
				             ($(ele+' .ip_b').val()?'.'+$(ele+' .ip_b').val():"")+
							 ($(ele+' .ip_c').val()?'.'+$(ele+' .ip_c').val():"")+
							 ($(ele+' .ip_d').val()?'.'+$(ele+' .ip_d').val():"")
			    return ipVal
			},
			macVal(ele){
               let macVal = ($(ele+' .mac_a').val()?$(ele+' .mac_a').val():"")+
				            ($(ele+' .mac_b').val()?':'+$(ele+' .mac_b').val():"")+
							($(ele+' .mac_c').val()?':'+$(ele+' .mac_c').val():"")+
							($(ele+' .mac_d').val()?':'+$(ele+' .mac_d').val():"")+
							($(ele+' .mac_e').val()?':'+$(ele+' .mac_e').val():"")+
							($(ele+' .mac_f').val()?':'+$(ele+' .mac_f').val():"")
			   return macVal
			},
            setTrunk(){
                let conf = {
						oper:this.result,
						id:$('.id').html(),
                        abcd:this.ipVal('.abcd'),
						mac:this.macVal('.mac')
					};
					this.result = "loading"
					netservice.doTrunk(conf)
					.then((recvdata) => {
						recvdata = jQuery.parseJSON(recvdata);
						if(recvdata.success && recvdata.data.result == "ok") {
							this.result = "success"
                            this.getTrunk()
							setTimeout(function () {
								$('#addtrunk').modal('hide');
							}, 1000);
						}else if(recvdata.level == "error" && !recvdata.success) {
							this.result = ""
							this.errorMsg = recvdata.errorMessage
						}
					})
            },
            eachChk(){
                var chk;
                $(".check").each(function(i,e){
                    chk = $(e).prop("checked")
                    if(!chk){
                        return false
                    }
                })
                if(chk){
                    $(".checkall").prop("checked", true)
                }else{
                    $(".checkall").prop("checked", false)
                }
            },
            checkAll() {
                if($(".checkall").prop("checked")){
                    $(".check").prop("checked", true)
                }else{
                    $(".check").prop("checked", false)
                }
			},
            arr2string(a){
                var s = a.join(",")
                return s;
            },
			actived(type){
				this.type = type
			},
			unactived(){
				this.type = ""
			},
            popoverShow(ele, content) {
				$(ele).attr({
					'data-toggle': 'popover',
					'data-content': content
				})
				$(ele).popover('show')
				setTimeout(function() {
					$(ele).popover('destroy')
				}, 1000)
			},
		}
	}
</script>
<style scoped>
	.wrap {
		margin: 30px 0 0 30px;
		background: #ffffff;
		padding-bottom: 10px;
	}
	.title {
		background: #333333;
		color: #ffffff;
		height: 30px;
		padding-left: 20px;
	}
	h3 {
		line-height: 30px;
		display: inline-block;
	}
	.butn {
		display: inline-block;
		float: right;
	}
	.butn li{
		display: inline-block;
		margin: 5px 25px 0px 0px;
		cursor: pointer;		
	}
	.butn span{
		vertical-align: middle;
	}
	.butn img {
		margin: 0 5px;
        width: 12px;
        height: 12px;
	}
	.table-wrap{
		margin: 20px 20px 13px 20px;
	}
    table{
        width: 1150px;
    }
	thead {
		background: #69b6ff;
		color: #ffffff;
	}
    label{
        font-weight: 500;
         line-height: 30px;
        margin-bottom: 0;
    }
	tr {
		height: 30px;
	}
    tr.change:hover{
        background-color:rgba(129,194,255,0.5);
        cursor:pointer;
    }
	thead tr th {
        text-align: center;
		color: #ffffff;
	}
    thead tr th:last-child {
        border-right: 1px solid #69b6ff;
	}
    tbody tr td {
        text-align: center;
        border-left: 1px solid #c9e4ff;
    }
    tbody tr td:last-child {
        border-right: 1px solid #c9e4ff;
    }
    tbody tr:last-child td {
        border-bottom: 1px solid #c9e4ff;
    }
    tbody tr:nth-child(odd){
		background: #e1f0ff;
	}
    tbody tr:nth-child(even){
        background: #f7fbff;
	}
    input[type=checkbox] {
        margin-top: 0;
        width: 12px;
        height: 12px;
    }
    p {
		color: #fb5656;
		margin-top: 10px;
	}
    .actived{
		color:#69b6ff;
	}
	.unactived{
		color:#FFFFFF;
	}
    .fade-enter-active, .fade-leave-active {
       transition: opacity .5s ease;
    }
	.fade-enter, .fade-leave-active {
	  opacity: 0
	}
</style>