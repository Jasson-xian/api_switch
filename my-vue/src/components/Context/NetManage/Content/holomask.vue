<template>
	<div class="wrap">
		<div class="title">
			<h3>全息伪装</h3>
			<ul class="butn">
				<li  @click = "reset()"  @mouseenter="actived('add')" @mouseleave="unactived()" data-toggle="modal" data-target="#addmask">
                    <img v-if="type=='add'" src="../../../img/bule_add.png" />
                    <img v-else src="../../../img/add.png" />
                    <span :class="[type=='add'?'actived':'unactived']">添加</span>
                </li>
				<li @mouseenter="actived('delete')" @mouseleave="unactived()" v-on:click='rmmaskMsg()' class="deletetag" data-placement="bottom">
                    <img v-if="type=='delete'" src="../../../img/bule_delet.png" />
                    <img v-else src="../../../img/delete.png" />
                    <span :class="[type=='delete'?'actived':'unactived']">删除</span>
                </li>
				<li @mouseenter="actived('modpic')" @mouseleave="unactived()" v-on:click='altmaskMsg()' class="edittag" data-placement="bottom">
                    <img v-if="type=='modpic'" src="../../../img/bule_mod.png" />
                    <img v-else src="../../../img/modpic.png" />
                    <span :class="[type=='modpic'?'actived':'unactived']">编辑</span>
                </li>
                <addmask v-on:getData="afterAdd()" :roadNum="roadNum" :rip_server="rip_server"></addmask>
                <altmask v-on:getData="getMask()" :roadNum="roadNum" :rip_server="rip_server"></altmask>
                <makesure v-on:rm="rmMask()" :result = 'result' :name ='name' :errorMsg ='errorMsg'></makesure>
			</ul>
		</div>
		<div class="table-wrap">
            <!--加载数据-->
		    <loadSpan v-show= '!show'></loadSpan>
			<table>
				<thead>
                    <tr>
						<th style="width: 40px;">
                            <input class="checkall" @click="checkAll()" type="checkbox">
                            </th>
                        <th style="width: 60px;">序号</th>
						<th >策略名</th>
						<th >源节点</th>
						<th >全息节点</th>
						<th >VLAN ID</th>
                        <th >物理线路</th>
					</tr>
				</thead>
				<transition name="fade" mode="out-in">
                    <tbody v-if = 'show'>
                        <tr class="change" v-for="(mask, index) in data" @click="oneclk( index )" @dblclick="dbclk( mask,index )">
                            <template v-if="mask.id">
                                <td style="width: 40px;">
                                    <input class="check" @click.stop="eachChk()" type="checkbox" :id="index">
                                    </td>
                                <td style="width: 60px;">{{ index + 1 }}</td>
                                <td style="display: none">{{ mask.id }}</td>
                                <td >{{ mask.name }}</td>
                                <td >{{ mask.rip }}</td>
                                <td class="tdvip" style="line-height: 20px;">
                                    <div v-for="(vip, index) in mask.vip">{{ vip }}</div>
                                </td>
                                <td >{{ mask.vlanid ? mask.vlanid : "-" }}</td>
                                <td >{{ mask.groupid ?'线路'+ mask.groupid : "-" }}</td>           
                            </template>
                            <template v-else>
                                <td style="width: 40px;"></td>
                                <td style="width: 60px;"></td>
                                <td ></td>
                                <td ></td>
                                <td ></td>
                                <td ></td>
                                <td ></td>
                            </template>
                        </tr>
                    </tbody>
				</transition>
			</table> 
		</div>
        <pages v-if='show' v-on:getPageData="getPageData()" :totalpage='totalpage' :nowpage='nowpage'></pages>
        <leastone></leastone>
		<mustone></mustone>
	</div>
</template>
<script>
	import netservice from 'services/netService'
    import defendService from 'services/defendService'
	import systemService from 'services/systemService'    
    import loadSpan from 'components/libs/loadSpan'
    import addmask from './holomask/addmask.vue'
    import altmask from './holomask/altmask.vue'
	import makesure from './tags/topmakesure.vue'
    import pages from './tags/toppages.vue'
    import mustone from './tags/mustone.vue'
    import leastone from './tags/leastone.vue'

	import PageData from 'libs/PageData'
	export default {
		components: {
			addmask,
            altmask,
			pages,
            makesure,
			mustone,
            leastone,
            loadSpan
		},
		mounted() {
            this.getMask()
            this.getRip()
            this.getRoad()
        },
		data() {
			return {
				name:'全息伪装',
                isdb:"",
				totalpage:0,
                masks:[],
                roadNum:[],
                rip_server:[],
                allTableData:[],
                nowpage:1,
                tableData:[],
                type:"",
                show:false,
                result:'',
                errorMsg:''
			}
		},
		computed: {
             data(){
                var tableData = this.tableData
                for(let i = 0 ; i < tableData.length ; i++){
                    tableData[i].vip = tableData[i].vip.split(",")
                }
                let data = [
                    {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
                ]
                for(let i = 0; i < tableData.length; i++) {
                    data[i] = tableData[i]
                }
                return data
            }
        },
        methods: {
        	reset(){
				this.result = ''
				this.errorMsg = ''
				$('.modal input').val('').css('border', '1px solid #e8e8e8')
                $('.modal .rip input').val('').css('border', 'none')
                $('.modal .altrip input').val('').css('border', 'none')
				$('.modal textarea').val('').css('border', '1px solid #e8e8e8')
				$('.mi').css('color', '#d2d2d2')
				$('.notice').hide()
			},
            getMask(){
				// netservice.getMask()
                // .then((recvdata) => {
				// 	recvdata = jQuery.parseJSON(recvdata);
				// 	if(recvdata.success) {
                        this.show=true
                        this.allTableData = []
                        this.getPageData(this.nowpage)
                        this.totalpage = new PageData([], 20).totalpage
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
            afterAdd(){
                netservice.getMask()
                .then((recvdata) => {
					recvdata = jQuery.parseJSON(recvdata);
					if(recvdata.success) {
                        this.allTableData = recvdata.data.config
                        this.totalpage = new PageData(recvdata.data.config, 20).totalpage
                        this.nowpage = this.totalpage
                        this.getPageData(this.nowpage)
                    }
				})
            },
            getRip(){
                let ipconf = {
                    oper:"",
                    abcd:"",
                    mac:""
                };
                // netservice.bindIp(ipconf)
                // .then((recvdata) => {
					// recvdata = jQuery.parseJSON(recvdata);
					// if(recvdata.success) {
                        var ripArr = new Array()
                    //     recvdata.data.config.forEach(function(v,i,a){
                    //      ripArr.push(v.ABCD)
                    //     }
                    // )
                    this.rip_server = ripArr
				// })
            },
			getRoad() {
				// systemService.getRoadNum()
				// .then((recvdata) => {
				// 	recvdata = JSON.parse(recvdata)
				// 	if(recvdata.success == true) {
						this.roadNum = []
				// 	}
				// })
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
            dbclk(mask,index){ 
            	this.reset()
                if(JSON.stringify(mask) != "{}"){
                    this.isdb=true;
                    $('.check').prop('checked', false)
					$('#' + index).prop('checked', true)
					this.eachChk()
                    this.altMask(mask)  
                }     
            },
            altmaskMsg(){
            	this.reset()
                let hash_arr = new Array();
                $(".check").each(function(i,e){
                    if($(e).prop("checked")){
                        hash_arr.push($(e).parent().parent().find('td')['1'].innerHTML);
                    };
                });
                if( hash_arr.length == 0 ){
                    this.popoverShow('.edittag', "请选择编辑内容")
                }else if( hash_arr.length > 1 ){
                    this.popoverShow('.edittag', "每次修改一个")
                }else if( hash_arr.length = 1 ){
                    if(this.data)
                    var index = hash_arr[0] - 1
                    this.altMask(this.data[index])
                }
            },
            altMask(mask){
                var vip_content = ''
				mask.vip.forEach(function(v,i,a){
					vip_content += v+"\n"
				})
                $('.modal .altid').html(mask.id)
                $('.modal .altname').val(mask.name)
                // $(".modal .altrip").val(mask.rip)
                this.arrip('.altrip',mask.rip)
                $('.modal .altvip').val(vip_content)
                $(".modal .altvlanid").val(mask.vlanid)
                $(".modal .altroad").val(mask.groupid)
				$("#altmask").modal('show')
            },
             arrip(el,value){
				let arrip=value.split('.')
               $(el+' input').eq(0).val(arrip[0])
               $(el+' input').eq(1).val(arrip[1])
               $(el+' input').eq(2).val(arrip[2])
               $(el+' input').eq(3).val(arrip[3])
			},
			rmmaskMsg(){
				this.reset()
                let hash_arr = new Array();
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
            rmMask(){
                var hash_arr = new Array();
                $(".check").each(function(i,e){
                    if($(e).prop("checked")){
                        hash_arr.push($(e).parent().parent().find('td')['2'].innerHTML);
                    };            
                });
                if(hash_arr.length != 0){
                    var mask = {
                        oper:"del",
                        ids:this.arr2string(hash_arr)
                    };
                    this.rmove(mask)
                }
            },
            rmove(mask){
            	this.result = 'reqing'
                netservice.setMask(mask)
                .then((recvdata) => {
                    recvdata = jQuery.parseJSON(recvdata);
                    if(recvdata.success && recvdata.data.result == "ok") {
                        $(".check").prop("checked", false)
                        $(".checkall").prop("checked", false)
                        this.getMask()
                        this.result = 'ok'
                    }else{
                       this.result = 'error'
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
		padding-bottom: 30px;
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
    label{
        width: 100%;
        font-weight: 500;
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
    table{
        width: 1135px;
    }
	.table-wrap{
        padding: 20px 20px 0 20px;
        max-height: 705px;
        min-height: 630px;
        overflow-y: auto;
        overflow-x: hidden;
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
    tbody tr:nth-child(odd){
		background: #e1f0ff;
	}
    tbody tr:nth-child(even){
        background: #f7fbff;
	}
    tbody tr:last-child td {
        border-bottom: 1px solid #c9e4ff;
    }
    input[type=checkbox] {
        margin-top: 0;
        width: 12px;
        height: 12px;
    }
    .delete-btn {
		width: 60px;
		height: 20px;
		color: #FFFFFF;
		border-radius: 5px;
		background: #69b6ff;
        margin: 0 10px;
	}
    .alter-btn {
		width: 60px;
		height: 20px;
		color: #FFFFFF;
		border-radius: 5px;
		background: #f5b72e;
        margin: 0 10px;
	}
    .tdvip{
        color: #000000;
        max-width: 200px;
        padding: 5px 40px;
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