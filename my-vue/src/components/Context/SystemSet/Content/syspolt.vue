<template>
    <div class="wrap">
        <div class="title" v-if="change">
            <h3>系统策略</h3>
        </div>
        <div class="title" v-else>
            <h3>系统策略 > 修改策略</h3>
        </div>
        <div class="table-wrap" v-show="change" v-on:syschenge="asideLeft.show = false">
            <table class="ftable">
                <thead>
                    <tr style="width:1196px;">
                        <th colspan="3">网管参数</th>
                        <th style="text-align: right">
                            <ul class="titile-butn">
								<li @mouseenter="actived('sure')" @mouseleave="unactived()" v-on:click.stop="saveSysInfo()" >
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
                        <td style="width: 190px;">WebUI超时(分)</td>
                        <td style="width: 406px;"><input type="number" v-model=web_ui  min="1" max="1440" step="1" @keyup.enter='saveSysInfo()' @focus="empty('.web_ui')"  @blur="wordslength('.web_ui',0,1441)" class="compile web_ui"><span class="mi">(1-1440)</span></td>
                        <td style="width: 190px;">管理员超出登录次数惩罚时间</td>
                        <td style="width: 406px;"><input type="number" min="1" @keyup.enter='saveSysInfo()' v-model=punish @blur="wordslength('.minute',0,10000)"  class="compile minute"><span class="mi">分钟</span></td>
                    </tr>
                    <tr>
                        <td style="width: 190px;">管理员最大登录次数</td>
                        <td style="width: 406px;"><input type="number" min="3" max="100" step="1" @keyup.enter='saveSysInfo()' @focus="empty('.max_times')" @blur="wordslength('.max_times',2,101)" v-model=max_times  class="compile max_times"><span class="mi">(3-100)</span></td>
                        <td style="width: 190px;"></td>
                        <td style="width: 406px;"></td>
                    </tr>
                </tbody>
            </table>
            <div class="title1">
                <h3>网管策略</h3>
                <ul class="butn">
                    <li @mouseenter="actived('add')" @mouseleave="unactived()" data-toggle="modal" @click='clear()' data-target=".addModal-modal-lg">
                        <img v-if="type=='add'" src="../../../img/b_add.png" />
                        <img v-else src="../../../img/add.png" />                        
                        <span :class="[type=='add'?'actived':'unactived']">添加</span>
                    </li>
                    <li @mouseenter="actived('delete')" @mouseleave="unactived()" @click="deletebtn()">
                        <img v-if="type=='delete'" src="../../../img/b_dele.png" />
                        <img v-else src="../../../img/delete.png" />
                        <span :class="[type=='delete'?'actived':'unactived']" class="delebutn" data-container="body" data-placement="bottom" data-content="请先选中移除内容">移除</span>
                    </li>
                    <li @mouseenter="actived('modpic')" @mouseleave="unactived()" @click='syschenge()'>
                        <img v-if="type=='modpic'" src="../../../img/b_mod.png" />
                        <img v-else src="../../../img/modpic.png" />
                        <span :class="[type=='modpic'?'actived':'unactived']" class="delebutn" data-container="body" data-placement="bottom">编辑</span>
                    </li>
                    <addsysmanage v-on:addData="addData"  :result='result' :errorMsg='errorMsg'></addsysmanage>
                </ul>
            </div>
            <div style="max-height:550px;overflow-y: auto;position: relative">
                <loadSpan v-show='!show'></loadSpan>
                <div style="height: 190px;width: 100%">
                <table class="stable" @selectstart="selectstart()" style="border-bottom:1px solid  #69b6ff;min-height: 182px;">
                    <thead>
                        <tr>
                            <th style="width: 27px;">
                            <input class="checkall"  v-on:click="seletno()" type="checkbox">
                            </th>
                            <th style="width:60px;">序号</th>
                            <th style="width:324px;">规则名称</th>
                            <th style="width:402px;">允许网管设备的IP</th>
                            <th style="width: 339px;">描述</th>
                        </tr>
                    </thead>
                    <transition name='fade'>
                    <tbody style="height: 100px;overflow-y: auto" v-show='show'>
                        <tr v-for='(item,index) in data' @dblclick.stop='dblclick(index)'>
                            <template v-if="index<allTableData.length"  >
                                <td @dblclick.stop=''>
                                    <input :id='index' class="checkno" @change.stop='check()' type="checkbox">
                                </td>
                                <td class='id' style="display: none">
                                    {{item.id}}
                                </td>
                                <td >
                                    <label :for="index" class="idNum">{{(index+1)+5*(nowpage-1)}}</label>	
                                </td>
                                <td >
                                    <label :for="index" class="name">{{item.name}}</label>	
                                </td>
                                <td >
                                    <label :for="index" class="ip">{{item.ip}}</label>	
                                </td>
                                <td>
                                <label :for="index" class="description">{{item.note ? item.note : '-'}}</label>
                                </td>
                            </template>
                            <template v-else>
                                <td>&nbsp</td>
                                <td>&nbsp</td>
                                <td>&nbsp</td>
                                <td>&nbsp</td>
                                <td>&nbsp</td>
                            </template>    
                        </tr>
                    </tbody>
                    </transition>
                </table>
                </div>
            </div>
            <severPages v-on:getPageData="getPageData" :totalpage='totalpage' :nowpage ="nowpage" style="background: #fff"></severPages>
        </div>
        <changeSyspolt  v-show="!change" :change="change" :changeArr='changeArr' v-on:message="message" v-on:save='save'></changeSyspolt>
        <success></success>
        <fail></fail>
        <bwDelemodal v-on:getSetData='getSetData' :result='result' :oper='oper' :name='delName' :errorMsg='errorMsg'></bwDelemodal>
    </div>
</template>
<script>
    import systemService from 'services/systemService'
    import changeSyspolt from './changeSyspolt/changeSyspolt'
    import addsysmanage from './changeSyspolt/addsysmanage'
    import success from './tags/success'
    import fail from './tags/fail'
    import formatTest from 'libs/formatTest'
    import bwDelemodal from 'components/libs/bwDelemodal'
    import severPages from 'components/libs/severPages'
    import loadSpan from 'components/libs/loadSpan'
    import userService from 'services/userService'
    export default {
        data() {
            return {
                change: true,
                checkall:false,
                changeArr: [],
                tableData: [],
                web_ui: '',
                punish: '',
                max_times: '',
                oper: '',
                dataTable: [],
                id: '',
                note: '',
                ids:'',
                status:true,
                result:'',
                name:"",
                delName:'网管策略',
                errorMsg:'',
                totalpage:0,
                nowpage:1,
                allTableData:[],
                type:"",
                show:false
            }
        },
        created: function () {
            this.web_ui = 10
            this.punish = 10
            this.max_times = 10
            this.checkall=false
            this.show=true
            this.allTableData = []
            this.totalpage = 0
            // this.getData('get_ns')
            // this.getData('get_nm')
        },
         computed: {
            data: function() {
				let tableData = [{}, {}, {}, {}, {}]
				for(let i = 0; i < this.allTableData.length; i++) {
					tableData[i] = this.allTableData[i]
				}
				return tableData
			}
        },
        methods: {
            selectstart(){
                return false;
            },
            getPageData(currentpage) {
                $('.checkall').prop('checked', false)
                $('.checkno').prop('checked', false)
                this.checkall=false;
				this.nowpage = currentpage
                this.getData('get_ns')
			},
            clear(){
                $(".modal .mi").css('color', '#575757')
				$(".addname , .addIp ,.adddescrip").css('border', '1px solid rgb(210, 210, 210)')
                $('input').val('')
                $('.modal .addmip input').css('border','none')
                $('.addmip').css("border",'1px solid #d2d2d2')
                this.result=''
                this.errorMsg=''
            },
            dblclick(index){
                $('.checkno').prop('checked', false)
				$('#' + index).prop('checked', true)
                this.check()
                this.syschenge()
            },
            check(){
                var checkall = true
				$('.checkno').each(function(index, ele) {
					checkall = $(ele).prop("checked")
					if(!checkall) {
                        this.checkall=false
						return false
					}
				})
				if(checkall) {
					$('.checkall').prop('checked', true)
                    this.checkall=true
				} else {
					$('.checkall').prop('checked', false)
                    this.checkall=false
				}
            },
             wordslength:function(ele,v1,v2){
                if($(ele).val()<v2&&$(ele).val()>v1){
						if(ele=='.web_ui'){
                            this.status=true;
                        }
						$(ele).css("border",'1px solid #d2d2d2')
						$(ele).parent().find('.mi').css("color",'#575757')	
					}else{
                        if(ele=='.web_ui'){
                            this.status=false;
                        }
						$(ele).css("border",'1px solid #b63039')
						$(ele).addClass("animated shake")
						setTimeout(function() {
							$(ele).removeClass('animated shake')
						}, 200)
						$(ele).parent().find('.mi').css("color",'#b63039')
					}
                     $(ele).css("outline",'none')
            },
            testVal: function(ele, reg) {
			    var val = $(ele).val()
				// var test = new formatTest(ele, reg, false)
                switch (reg) {
                    case 'web_ui':
                        
                        break;
                
                    default:
                        break;
                }
				return test.testFormat()			
			},
			isEmpty:function(ele) {
				var val = $(ele).val()
				if(!val) {
					$(ele).css("border",'1px solid #b63039')
					$(ele).addClass("animated shake")
					$(ele).parent().find('.mi').css('color', '#b63039')
					setTimeout(function() {
						$(ele).removeClass('animated shake')
					}, 200)
				}else{
					if(ele!='.addIp'){
						$(ele).parent().find('.mi').css('color', '#575757')
						$(ele).css('border', '1px solid #e8e8e8')
					}
				}
			},
           empty:function(ele){
				var test = new formatTest(ele)
				test.notEmpty()
                $(ele).css("outline",'1px solid #96ccff')
                $(ele).parent().find('.mi').css('color', '#575757')
			},
            getLogInfo(type){
                userService.getLoginInfo()
					.then((recvdata)=>{
						recvdata = JSON.parse(recvdata)
						if(recvdata.success){
                            if(type=='access'){
                                this.$store.commit('EDIT_Access', recvdata.data.access)
                            }else{
                                this.$store.commit('EDIT_Time', recvdata.data.web_ui)
                            }							                          
						}
					})
            },
            getData(type) {
                this.result='reqing'
                var setdata = {}
                setdata.oper = type
                this.oper=type
                switch (type) {
                    case 'get_nm':
                        break;
                    case 'get_ns': 
                        this.show=false
                        setdata.page=this.nowpage
                        break;
                    case 'set_nm':
                        setdata.web_ui = this.web_ui
                        setdata.punish = this.punish
                        setdata.max_times = this.max_times
                        break;
                    case 'update_ns':
                            setdata.id = this.id,
                            setdata.name = this.name,
                            setdata.ip = this.ip,
                            setdata.note = this.note
                        break;
                    case 'add_ns':
                            setdata.name = this.name,
                            setdata.ip = this.ip,
                            setdata.note = this.note
                        break;
                    case 'del_ns':
                            setdata.ids = this.ids
                        break;        
                    default:
                        break;
                    
                }
                systemService.getSysPolice(setdata)
                    .then((recvdata) => {
                        recvdata = jQuery.parseJSON(recvdata);
                        if (recvdata.success) {
                            this.result='ok'
                            switch (type) {
                                case 'get_nm':
                                    this.web_ui = recvdata.data.web_ui
                                    this.punish = recvdata.data.punish
                                    this.max_times = recvdata.data.max_times
                                    break;
                                case 'get_ns':
                                    $('.checkno').prop('checked', false)
                                    $('.checkall').prop('checked', false)
                                    this.checkall=false
                                    this.show=true
                                    this.allTableData = recvdata.data.nss
                                    this.totalpage = recvdata.data.pages
                                    break;
                                case 'set_nm':
                                    this.getLogInfo('time')
                                    break;
                                case 'update_ns':
                                    this.getLogInfo('access')
                                    this.getData('get_ns')
                                    break;
                                 case 'del_ns':
                                    this.getLogInfo('access')
                                    let reset1 = { oper: 'get_ns',page:this.nowpage }
                                    systemService.getSysPolice(reset1)
                                        .then((recvdata) => {
                                            recvdata = jQuery.parseJSON(recvdata)
                                            if (recvdata.success) {
                                                if(recvdata.data.nss.length==0){
                                                    this.nowpage--
                                                    if(this.nowpage==0){
                                                        this.nowpage=1
                                                    }
                                                    this.getData('get_ns')
                                                }else{
                                                    this.allTableData = recvdata.data.nss
                                                    this.totalpage = recvdata.data.pages
                                                }
                                                this.checkall=false;
                                            }
                                        })
                                    break;    
                                case 'add_ns':
                                    this.nowpage=1;
                                    this.getLogInfo('access')
                                    this.getData('get_ns')
                                    break;

                                default:
                                    break;
                            }
                            if(type!='get_nm'&&type!='get_ns'&&type!='add_ns'&&type!='del_ns'){
                                 $("#success").modal('show') 
                            }
                        }else{
                            this.result='error'
                           if(type!='get_nm'&&type!='get_ns'&&type!='add_ns'&&type!='del_ns'){
                                 $("#fail").modal('show') 
                            }
                        }
                        
                    })
            },
            saveSysInfo: function () {
                if (this.status&& this.max_times <= 100&&this.punish>0) {
                        this.getData("set_nm")
                }else{
                    this.wordslength('.web_ui',0,1441)
                    this.wordslength('.max_times',2,101)
                    this.wordslength('.minute',0,10000)
                }
            },
            syschenge: function () {
                var delArr = []
                $('.checkno').each(function (index, e) {
                    if ($(e).prop("checked")) {
                        delArr.push(index)
                    }
                })
                if (delArr.length == 1) {
                    this.changeArr = [$(".ip").eq(delArr[0]).html(), $(".description").eq(delArr[0]).html()];
                    this.name = $('.name').eq(delArr[0]).html();
                    this.id = $('.id').eq(delArr[0]).html().trim();
                    this.change = !this.change;
                } else {
                    this.operateF(1,delArr.length);
                }

            },
            seletno: function () {
                if (this.checkall) {
                    $(".checkno").prop("checked", false)
                    this.checkall = false
                } else {
                    $(".checkno").prop("checked", true)
                    this.checkall = true
                }
            },
            message: function (msg) {
                if (msg) {
                    this.change = true;
                }
            },
            addData: function (addData) {
                this.name = addData.name
                this.ip = addData.ip
                this.note = addData.note
                this.getData("add_ns")
            },
            save: function (msg) {
                if (msg) {
                    this.change = true
                    this.ip = msg.ip
                    this.note = msg.description
                    this.getData("update_ns")
                }
            },
            operateF: function (index,length) {
                $('.delebutn').eq(index).attr('data-toggle', 'popover')
                if(length>1){
                   $('.delebutn').eq(index).attr('data-content',"每次只能编辑一个")
                }else{
                    if(index==1){
                         $('.delebutn').eq(index).attr('data-content',"请选择要编辑的内容")
                    }
                }
                $('.delebutn').eq(index).popover('show')
                setTimeout(function () {
                    $('.delebutn').eq(index).popover('destroy')
                }, 1500)
            },
            deletebtn(){
                var delArr = []
                $('.checkno').each(function (index, e) {
                    if ($(e).prop("checked")) {
                        delArr.push($(e).parent().next().text().trim())
                    }
                })
                if(delArr.length){
                    this.ids=this.arrstring(delArr)
                    this.result=''
                    $('.deleModal-modal-lg').modal('show')  
                }else{
                    this.operateF(0)
                }
            },
            getSetData(){
                this.getData("del_ns")
                this.check()
            },
            arrstring:function(a){
                var s = a.join(",")
                return s;
            },
            actived(type){
				this.type = type
			},
			unactived(){
				this.type = ""
			}
        },
        components: {
            changeSyspolt,
            addsysmanage,
            success,
            fail,
            bwDelemodal,
            severPages,
            loadSpan
        }
    }

</script>
<style scoped>
    #active{
        color:#1e5ac9  
    }
    #unactive{
        color: #fff
    }
    label {
		font-weight: 500;
		width: 100%;
		margin-bottom: 0;
	}
    *{
        -moz-user-select:none;
        -webkit-user-select:none;
        user-select:none;
        border: none;
    }
	.wrap {
		margin: 30px 0 0 30px;
		padding-bottom: 10px;
		background: #FFFFFF;
        -moz-user-select:none;
        -user-select:none;
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
    .button{
         padding: 0 6px;
         background: #feae00;
         color: #fff;
         width:60px;
         border-radius: 5px;
         margin-right: 20px;
         height: 20px;
    }
	.ftable thead {
		background: #69b6ff;
		color: #ffffff;
	}
    .ftable thead tr th {
        text-align: left;
        padding-left: 20px;
        height: 30px;
	}
   .ftable td:nth-child(odd) {
		text-align: center;
	}
   .ftable  td:nth-child(even) {
		text-align: left;
        padding-left: 20px;
	}
	.ftable tr {
		height: 40px;
	}
    .ftable thead tr{
        height: 30px; 
    }
	.ftable th {
		color: #ffffff;
		border-right: 1px solid #69b6ff;
	}
    .ftable td {
        border-left: 1px solid #bddfff;
    }
    .ftable td >span{
        display: inline-block;
        height: 20px;
        box-sizing: border-box;
        /*padding-bottom:3px; */
        line-height: 20px;
    }
    .ftable tr:last-child td {
        border-bottom: 1px solid #69b6ff;
    }
   .ftable  tr td:last-child {
        border-right: 1px solid #69b6ff;
    }
	.ftable tbody tr:nth-child(odd){
        background: #f0f8ff;
		
	}
    .ftable tbody tr:nth-child(even){
		background: #d2e9ff;
	}
   .ftable  tbody tr input{
       height: 20px;
        border: 1px solid #e6e6e6;
        border-radius:5px;
        width: 174px; 
        margin-right: 10px;
        padding-left: 10px;
        vertical-align: bottom
        /*padding:3px;*/
    }
    /*.ftable .mi{
		color: #575757;
	}*/
    input[type="number"]{
        -moz-appearance: textfield;
    }
    .title1 {
		background: #69b6ff;
		color: #ffffff;
		height: 30px;
		padding-left: 20px;
        margin-top: 50px;
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
	}
    /*.stable{
        height: 18px;
    }*/
    .stable thead{
        background-color: #f0f8ff;
    }
    .stable  tr{
        height: 30px;
    } 
    .stable td,.stable th{
        text-align: center;
    }
    .stable tbody tr:nth-child(odd){
        background:#d2e9ff;
		
	}
    .stable tbody tr:nth-child(even){
        background:#f0f8ff;
		
	}
     .stable th {
       border-right: 1px solid #bddfff;
       border-left: 1px solid #bddfff;
    }
     .stable td {
        border-left: 1px solid #bddfff;
        border-right: 1px solid #bddfff;
    }
    .stable tr:last-child td {
        border-bottom: 1px solid #69b6ff;
    }
   .stable  tr td:last-child,.stable  tr th:last-child {
        border-right: 1px solid #69b6ff;
    }
    .stable  tr td:first-child,.stable  tr th:first-child {
        border-left: 1px solid #69b6ff;
    }
    .stable input{
        width: 12px;
        height: 12px;
        /*border: 1px solid #7d7d7d;*/
        vertical-align: middle;
    }
    .stable tbody tr:nth-child(even){
		background: #f0f8ff;
	}
    .stable tbody tr:hover td{
        background:#9bd3ff;
    }
    .stable td:nth-child(4)>label{
        width:322px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
    }
    .stable td:nth-child(5)>label{
        width:400px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
    }
    .stable td:nth-child(6)>label{
        width:335px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
    }
    .titile-butn {
		position: relative;
		right: 10px;
	}
	.stable label{
        border: none
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
</style>