<template>
    <div class="table-wrap nowip-table" style="min-height: 300px;position: relative;">
        <!--加载数据-->
		<loadSpan v-show= '!show'></loadSpan>	
        <table>
            <thead>
                <tr>
                    <th style="width: 1200px;" colspan="5">外网IP保留网段配置</th>
                    <th colspan="2">
                        <ul class="butn">
                            <li  @click='addData()' @mouseenter="actived('add')" @mouseleave="unactived()"  data-toggle="modal" data-target="#addnowip">
                                <img v-if="type=='add'" src="../../../../img/b_add.png" />
                                <img v-else src="../../../../img/add.png" />
                                <span :class="[type=='add'?'actived':'unactived']">添加</span>
                            </li>
                            <li @mouseenter="actived('delete')" @mouseleave="unactived()" v-on:click='rmnowipMsg()' class="deletenotag" data-placement="bottom">
                                <img v-if="type=='delete'" src="../../../../img/b_dele.png" />
                                <img v-else src="../../../../img/delete.png" />
                                <span :class="[type=='delete'?'actived':'unactived']">删除</span>
                            </li>
                            <li class='modbutn_no' @click='modData()' @mouseenter="actived('mod')" @mouseleave="unactived()" data-placement="bottom">
								<img v-if="type=='mod'" src="../../../../img/b_mod.png"/>
								<img v-else src="../../../../img/modpic.png"/>
								<span :class = "[type=='mod'?'actived':'unactived']">编辑</span>
							</li>
                            <addnowip v-on:getAddModData="getAddModData" :oper ='oper' :result = 'result' :errorMsg ='errorMsg'></addnowip>
                            <botmakesure v-on:rm="rmNowip()" :result = 'result' :name ='name' :errorMsg ='errorMsg'></botmakesure>
                        </ul>
                    </th>
                </tr>
                <tr>
                    <th style="width: 40px;">
                        <input v-model="checkall" v-on:click="checkAll()" type="checkbox">
                        </th>
                    <th style="width: 60px;">序号</th>
                    <th style="width: 220px;">网段</th>
                    <th style="width: 220px;">掩码</th>
                    <th style="width: 220px;">网关地址</th>
                    <th style="width: 220px;">VLAN ID</th>
                    <th style="width: 220px;">物理线路</th>
                </tr>
            </thead>
            <transition name="fade"  mode="out-in">
                <tbody v-if='show'>
                    <tr class="change"  v-for="(nowip, index) in data" @dblclick.stop = "modData(index)">
                        <template v-if="nowip.hash_code">
                            <td style="width: 40px;">
                                <input class="checkno"  @change.stop="eachChk()"  type="checkbox" :id=" index +'no' ">
                            </td>
                            <td style="width: 60px;"><label :for=" index +'no' ">{{ (index + 1)+8*(nowpage-1)}}</label></td>
                            <td style="display:none;">{{ nowip.hash_code }}</td>
                            <td style="width: 220px;"><label :for=" index +'no' ">{{ nowip.ABCD }}</label></td>
                            <td style="width: 220px;"><label :for=" index +'no' ">{{ nowip.MASK }}</label></td>
                            <td style="width: 220px;"><label :for=" index +'no' ">{{ nowip.gateway }}</label></td>
                            <td style="width: 220px;"><label :for=" index +'no' ">{{ nowip.vlanid }}</label></td>
                            <td style="width: 220px;"><label :for=" index +'no' ">线路{{ nowip.groupid }}</label></td>
                        </template>
                        <template v-else>
                            <td style="width: 40px;"></td>
                            <td style="width: 60px;"></td>
                            <td style="width: 220px;"></td>
                            <td style="width: 220px;"></td>
                            <td style="width: 220px;"></td>
                            <td style="width: 220px;"></td>
                            <td style="width: 220px;"></td>
                        </template>
                    </tr>
                </tbody>
            </transition>
        </table>
        <botpages v-if='show' v-on:getPageData="getPageData" :totalpage='totalpage' :nowpage='nowpage'></botpages>
    </div>
</template>
<script>
    import netservice from 'services/netService'
    import loadSpan from 'components/libs/loadSpan'	
    import addnowip from '../wipconf/addnowip.vue'
    import botpages from '../tags/botpages.vue'
    import botmakesure from '../tags/botmakesure.vue'

    import PageData from 'libs/PageData'

	export default {
		components: {
            addnowip,
            botpages,
            botmakesure,
            loadSpan
		},
        mounted() {
           this.getNowip()
        },
        data(){
            return {
            	name:"外网IP保留网段配置",
                checkall:false,
                nowips:[],
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
        		this.oper = ''
				this.result = ''
				this.errorMsg = ''
				$('.modal input').val('').css('border', '1px solid #e8e8e8')
				$('.modal .noabcd input').val('').css('border', 'none')
                $('.modal .nomask input').val('').css('border', 'none')
                 $('.modal .nogateway input').val('').css('border', 'none')
                $('.modal textarea').val('').css('border', '1px solid #e8e8e8')
				$('.mi').css('color', '#d2d2d2')
				$('.nonotice').hide()
			},
			addData(){
				this.reset()
				this.oper = "add"
			},
			getAddModData(wipconfig){
				this.result = "loading"
				netservice.setWip(wipconfig)
				.then((recvdata) => {
					recvdata = jQuery.parseJSON(recvdata);
					if(recvdata.success&& recvdata.data.result == "ok") {
						this.result = "ok"
						 this.getNowip()
					} else{
						this.result = "error"
						this.errorMsg = String(recvdata.errorMessage) 
					}
				})
			},
            rmnowipMsg(){
            	this.reset()
                var hash_arr = new Array();
                $(".checkno").each(function(i,e){
                    if($(e).prop("checked")){
                        hash_arr.push($(e).parent().parent().find('td')['2'].innerHTML);
                    };            
                });
                if(hash_arr.length == 0){
                    this.popoverShow('.deletenotag', "请选择删除内容")
                }else{
                    $('#botmakesure').modal('show')
                }
            },
            rmNowip(){
                var hash_arr = new Array();
                $(".checkno").each(function(i,e){
                    if($(e).prop("checked")){
                        hash_arr.push($(e).parent().parent().find('td')['2'].innerHTML);
                    };            
                });
                if(hash_arr.length != 0){
                    var nowip = {
                        type:"del_nowip",
                        hash_code:this.arr2string(hash_arr)
                    }
                    this.rmove(nowip)
                }
                
            },
            rmove(conf){
            	this.result = 'reqing'
                netservice.rmAllnet(conf)
                .then((recvdata) => {
                    recvdata = jQuery.parseJSON(recvdata);
                    if(recvdata.success && recvdata.data.result == "ok") {
                    	this.result = 'ok'
                        $(".checkno").prop("checked", false)
                        this.checkall = false
                        this.getNowip()                       
                    }else{
                        this.result=='error'
                        this.errorMsg = recvdata.errorMessage
                    }
                })
            },
            modData(Index){
            	this.reset()
            	this.oper = "edit"				
				if(Index >= 0) { //双击修改
					if(Index<this.tableData.length){					
						$('.checkno').prop('checked', false)
						$('#' + Index+"no").prop('checked', true)
						this.eachChk()					
						this.modShow(Index)	
				   }					
				} else { //input勾选修改
					this.modWhich()
				}
            },
            modWhich() {
				//获取要被修改的是哪一个	
				var checkNum = 0
				var modNum
				$('.checkno').each(function(index, ele) {
					if($(ele).prop("checked")) {
						checkNum++
						modNum = index
					}
				})
				
				if(checkNum > 1) {
					this.popoverShow('.modbutn_no', "每次编辑一个")
				} else if(checkNum == 1) {
					this.modShow(modNum)
				} else {
					this.popoverShow('.modbutn_no', "请选择编辑内容")
				}
			},
            arrip(el,value){
				let arrip=value.split('.')
               $(el+' input').eq(0).val(arrip[0])
               $(el+' input').eq(1).val(arrip[1])
               $(el+' input').eq(2).val(arrip[2])
               $(el+' input').eq(3).val(arrip[3])
			},
			modShow(which) {
				//获取修改的内容
				$('#addnowip').modal('show')
				var moddata = this.tableData[which]	
                setTimeout(() => {				
                    this.arrip('.noabcd',moddata.ABCD)
                    this.arrip('.nomask',moddata.MASK)
                    this.arrip('.nogateway',moddata.gateway)
                    $('.novlanid').val(moddata.vlanid)
                    // $(".nogateway").val(moddata.gateway)
                    $('.noroute').val(moddata.groupid)
                    $('.hash_code_no').html(moddata.hash_code)
				}, 10)
			},
            getNowip(){
                // netservice.getAllnet()
                // .then((recvdata) => {
				// 	recvdata = jQuery.parseJSON(recvdata);
				// 	if(recvdata.success) {
                        this.show=true
                        this.allTableData = []
                        this.totalpage = new PageData([], 8).totalpage 
                        if(this.oper=="add"){
                        	this.nowpage = this.totalpage
                        }
                        this.getPageData(this.nowpage)
				// 	}
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
            eachChk(){
                var chk;
                $(".checkno").each(function(i,e){
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
                    $(".checkno").prop("checked", true)
                }else{
                    $(".checkno").prop("checked", false)
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
    label {
		font-weight: 500;
		width: 100%;
		margin-bottom: 0;
	}
    .nowip-table{
        margin-top: 40px;
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