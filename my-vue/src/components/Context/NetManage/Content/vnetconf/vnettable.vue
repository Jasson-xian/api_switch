<template>
    <div class="table-wrap" style="min-height: 300px;position: relative;">
        <!--加载数据-->
		<loadSpan v-show= '!show'></loadSpan>	
        <table>
            <thead>
                <tr>
                    <th style="width: 1200px;" colspan="4">虚拟网络网段配置</th>
                    <th colspan="2">
                        <ul class="butn">
                            <li @mouseenter="actived('add')" @mouseleave="unactived()" v-on:click='altvnetMsg(0)' >
                                <img v-if="type=='add'" src="../../../../img/b_add.png" />
                                <img v-else src="../../../../img/add.png" />
                                <span :class="[type=='add'?'actived':'unactived']">添加</span>
                            </li>
                            <li @mouseenter="actived('delete')" @mouseleave="unactived()" v-on:click='rmvnetMsg()' class="deletetag" data-placement="bottom">
                                <img v-if="type=='delete'" src="../../../../img/b_dele.png" />
                                <img v-else src="../../../../img/delete.png" />
                                <span :class="[type=='delete'?'actived':'unactived']">删除</span>
                            </li>
                            <li @mouseenter="actived('modpic')" @mouseleave="unactived()" v-on:click='altvnetMsg(1)' class="edittag" data-placement="bottom">
                                <img v-if="type=='modpic'" src="../../../../img/b_mod.png"/>
                                <img v-else src="../../../../img/modpic.png" />
                                <span :class="[type=='modpic'?'actived':'unactived']">编辑</span>
                            </li>
                            <addvnet v-on:getData="setVnet()"  :result = 'result' :oper ='oper' :errorMsg ='errorMsg'></addvnet>
                            <topmakesure v-on:rm="rmVnet()" :result = 'result' :name ='name' :errorMsg ='errorMsg'></topmakesure>
                        </ul>
                    </th>
                </tr> 
                <tr>
                    <th style="width: 40px;">
                        <input v-model="checkall" @change="checkAll()" type="checkbox">
                        </th>
                    <th style="width: 60px;">序号</th>
                    <th style="width: 275px;">网段</th>
                    <th style="width: 275px;">掩码</th>
                    <th style="width: 275px;">VLAN ID</th>
                    <th style="width: 275px;">物理线路</th>
                </tr>
            </thead>
            <transition name="fade" mode="out-in">
                <tbody v-if = 'show'>
                    <tr class="change" v-for="(vnet, index) in data" @click="oneclk( index )" @dblclick="dbclk( vnet ,index)">
                        <template v-if="vnet.hash_code">
                            <td style="width: 40px;">
                                <input class="check" @click.stop="eachChk()" type="checkbox" :id="index">
                                </td>
                            <td style="width: 60px;">{{ index + 1+(nowpage-1)*8 }}</td>
                            <td style="display:none;">{{ vnet.hash_code }}</td>
                            <td style="width: 275px;">{{ vnet.ABCD }}</td>
                            <td style="width: 275px;">{{ vnet.MASK }}</td>
                            <td style="width: 275px;">{{ vnet.vlanid }}</td>
                            <td style="width: 275px;">线路{{ vnet.groupid }}</td>
                        </template>   
                        <template v-else>
                            <td style="width: 40px;"></td>
                            <td style="width: 60px;"></td>
                            <td style="width: 275px;"></td>
                            <td style="width: 275px;"></td>
                            <td style="width: 275px;"></td>
                            <td style="width: 275px;"></td>
                        </template>  
                    </tr>
                </tbody>
            </transition>
        </table>
        <toppages v-if='show' v-on:getPageData="getPageData" :totalpage='totalpage' :nowpage='nowpage'></toppages>
    </div>
</template>
<script>
    import netservice from 'services/netService'
    import loadSpan from 'components/libs/loadSpan'
    import addvnet from '../vnetconf/addvnet.vue'
    import toppages from '../tags/toppages.vue'
    import topmakesure from '../tags/topmakesure.vue'
    import PageData from 'libs/PageData'

    export default {
		components: {
            addvnet,
            toppages,
            topmakesure,
            loadSpan
		},
        
        mounted() {
            this.getVnet()
        },

        data(){
            return {
            	name:"虚拟网络配置",
                checkall:false,
                vnets:[],
                totalpage:0,
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
                    {},{},{},{},{},{},{},{}
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
				$('.modal .abcd input').val('').css('border', 'none')
                $('.modal .mask input').val('').css('border', 'none')
                $('.modal textarea').val('').css('border', '1px solid #e8e8e8')
				$('.mi').css('color', '#d2d2d2')
				$('.notice').hide()
                $('.hash_code').html('')
			},
            oneclk(index){  
                this.isdb=false;  
                window.setTimeout(cc, 0)
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
            dbclk(vnet,index){ 
            	this.reset()
                if(JSON.stringify(vnet) != "{}"){
                    this.isdb=true
                    $('.check').prop('checked', false)
					$('#' + index).prop('checked', true)
					this.eachChk()
                    this.altvnetMsg(1)
                }
            },
            ipVal(ele){
				let ipVal =  ($(ele+' .ip_a').val()?$(ele+' .ip_a').val():"")+
								($(ele+' .ip_b').val()?'.'+$(ele+' .ip_b').val():"")+
								($(ele+' .ip_c').val()?'.'+$(ele+' .ip_c').val():"")+
								($(ele+' .ip_d').val()?'.'+$(ele+' .ip_d').val():"")
				return ipVal
			},
            setVnet(){
                 var netconfig = {
						type:this.result+"_vnet",
                        abcd:this.ipVal('.abcd'),
						mask:this.ipVal('.mask'),
						vlanid:$('.vlanid').val(),
						groupid:$('.route').val(),
                        hash_code:$('.hash_code').html(),
					}
					this.result = "loading"
					netservice.setAllnet(netconfig)
					.then((recvdata) => {
						recvdata = jQuery.parseJSON(recvdata);
						if(recvdata.success && recvdata.data.result == "ok") {
							this.result = "success"
                            this.getVnet()
							setTimeout(function () {
								$('#addvnet').modal('hide');
							}, 1000);
						}else if(recvdata.level == "error" && !recvdata.success) {
							this.result = ""
							this.errorMsg = recvdata.errorMessage
                            $('.notice').show()
						}
					})
            },
             altvnetMsg(val){
                this.reset()
                if(!val){
                   this.oper='添加'
                   this.result='add'
                   $('#addvnet').modal('show')
                }else{
                   this.oper='修改'
                   this.result='edit'
                   let hash_arr = new Array();
                    $(".check").each(function(i,e){
                        if($(e).prop("checked")){
                            hash_arr.push($(e).parent().next().html());
                        };
                    });
                    if( hash_arr.length == 0 ){
                        this.popoverShow('.edittag', "请选择编辑内容")
                    }else if( hash_arr.length > 1 ){
                        this.popoverShow('.edittag', "每次修改一个")
                    }else if( hash_arr.length = 1 ){
                        if(this.data)
                        var index = hash_arr[0] - 1 - (this.nowpage-1)*8
                        this.altnet(this.data[index])
                        $('#addvnet').modal('show')
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
            altnet(data){
                this.arrip('.abcd',data.ABCD)
                this.arrip('.mask',data.MASK)
                $('.modal .hash_code').html(data.hash_code)
                // $('.modal .abcd').val(data.ABCD)
                $(".modal .route").val(data.groupid)
                // $(".modal .mask").val(data.MASK)
                $(".modal .vlanid").val(data.vlanid)
            },
            rmvnetMsg(){
            	this.reset()
                var hash_arr = new Array();
                $(".check").each(function(i,e){
                    if($(e).prop("checked")){
                        hash_arr.push($(e).parent().parent().find('td')['2'].innerHTML);
                    };            
                });
                if(hash_arr.length == 0){
                   this.popoverShow('.deletetag', "请选择删除内容")
                }else{
                    $('#topmakesure').modal('show')
                }
            },
            rmVnet(){
                var hash_arr = new Array();
                $(".check").each(function(i,e){
                    if($(e).prop("checked")){
                        hash_arr.push($(e).parent().parent().find('td')['2'].innerHTML);
                    };            
                });
                if(hash_arr.length != 0){
                    var vnet = {
                        type:"del_vnet",
                        hash_code:this.arr2string(hash_arr)
                    };
                this.rmove(vnet)
                }
            },
            rmove(conf){
            	this.result = 'reqing'
                netservice.rmAllnet(conf)
                .then((recvdata) => {
                    recvdata = jQuery.parseJSON(recvdata);
                    if(recvdata.success && recvdata.data.result == "ok") {
                    	this.result = 'ok'
                        $(".check").prop("checked", false)
                        this.checkall = false
                        this.getVnet()
                    }else{
                        this.result=='error'
                        this.errorMsg = recvdata.errorMessage
                    }
                })
            },
            getVnet(){
                // netservice.getAllnet()
                // .then((recvdata) => {
				// 	recvdata = jQuery.parseJSON(recvdata);
				// 	if(recvdata.success) {
                        this.show=true
                        this.allTableData = []
                        this.getPageData(this.nowpage)
                        this.totalpage = new PageData([], 8).totalpage
                //     }
				// })
            },
            getPageData(currentpage) {
				this.nowpage = currentpage
				var allData =  this.allTableData
				this.tableData = new PageData(allData, 8).data(this.nowpage)
				if(this.tableData=='' && this.nowpage>1){//当前页为空
					this.nowpage--
					this.tableData = new PageData(allData, 8).data(this.nowpage)
				}
			},
            afterAdd(){
                netservice.getAllnet()
                .then((recvdata) => {
					recvdata = jQuery.parseJSON(recvdata);
					if(recvdata.success) {
                        this.allTableData = recvdata.data.config.vnet
                        this.totalpage = new PageData(recvdata.data.config.vnet, 8).totalpage
                        this.nowpage = this.totalpage
                        this.getPageData(this.nowpage)
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
                    this.checkall = true
                }else{
                    this.checkall = false
                }
            },
            checkAll() {
                if(this.checkall){
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
	}
	.table-wrap{
		margin: 20px;
	}
	thead {
		background: #69b6ff;
		color: #ffffff;
	}
	tr {
		height: 30px;
	}
    tr.change:hover{
        background-color:rgba(129,194,255,0.5);
        cursor:pointer;
    }
	thead tr:nth-child(1) th {
        text-align: left;
        padding-left: 15px;
		color: #ffffff;
        position: relative;
	}
    thead tr:nth-child(2) th {
        color: #2c558d;
		background: #b4daff;
        text-align: center;
	}
    tbody tr td {
        text-align: center;
        border-left: 1px solid #c9e4ff;
    }
    tbody tr:last-child td {
        border-bottom: 1px solid #c9e4ff;
    }
    thead tr:nth-child(1) th:last-child{
        border-right: 1px solid #69b6ff;
    }
    thead tr:nth-child(2) th:last-child{
        border-right: 1px solid #b4daff;
    }
    tbody tr td:last-child {
        border-right: 1px solid #c9e4ff;
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
    .actived{
		color:#1e5ac9;
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