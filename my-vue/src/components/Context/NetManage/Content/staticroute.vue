<template>
	<div class="wrap">
		<div class="title">
			<h3>静态路由配置</h3>
			<ul class="butn">
				<li @mouseenter="actived('add')" @mouseleave="unactived()" data-toggle="modal" data-target="#addstaticroute">
                    <img v-if="type=='add'" src="../../../img/bule_add.png" />
                    <img v-else src="../../../img/add.png" />
                    <span :class="[type=='add'?'actived':'unactived']">添加</span>
                    </li>
				<li @mouseenter="actived('delete')" @mouseleave="unactived()" v-on:click='rmrouteMsg()' class="deletetag" data-placement="bottom">
                    <img v-if="type=='delete'" src="../../../img/bule_delet.png" />
                    <img v-else src="../../../img/delete.png" />
                    <span :class="[type=='delete'?'actived':'unactived']">删除</span>
                </li>
				<li @mouseenter="actived('modpic')" @mouseleave="unactived()" v-on:click='altrouteMsg()' class="edittag" data-placement="bottom">
                    <img v-if="type=='modpic'" src="../../../img/bule_mod.png" />
                    <img v-else src="../../../img/modpic.png" />
                    <span :class="[type=='modpic'?'actived':'unactived']">编辑</span>
                </li>
				<addstaticroute v-on:getData="afterAdd()" ></addstaticroute>
				<altstaticroute v-on:getData="getRoute()"></altstaticroute>
                <makesure v-on:rm="rmRoute()" :result = 'result' :name ='name' :errorMsg ='errorMsg'></makesure>
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
						<th style="width: 525px">目的网段</th>
						<th style="">网关地址</th>
					</tr>
				</thead>
				<transition name="fade" mode="out-in">
                    <tbody v-if = 'show'>
                        <tr class="change" v-for="(route, index) in data" @click="oneclk( index )" @dblclick="dbclk( route ,index)">
                            <template v-if="route.id">
                                <td style="width: 40px;">
                                    <input class="check" @click.stop="eachChk()" type="checkbox" :id="index">
                                    </td>
                                <td style="width: 60px;">{{ index + 1 }}</td>
                                <td style="display: none;">{{ route.id }}</td>
                                <td style="">{{ route.net_segment }}</td>
                                <td style="">{{ route.gateway }}</td>
                            </template>
                            <template v-else>
                                <td style="width: 40px;"></td>
                                <td style="width: 60px;"></td>
                                <td style=""></td>
                                <td style=""></td>
                            </template>
                        </tr>
                    </tbody>
                </transition>
			</table>
			<pages v-if='show' v-on:getPageData="getPageData" :totalpage='totalpage' :nowpage='nowpage'></pages>
		</div>
        <mustone></mustone>
	</div>
</template>
<script>
	import netservice from 'services/netService'
    import loadSpan from 'components/libs/loadSpan'
    import addstaticroute from './staticroute/addstaticroute.vue'
	import altstaticroute from './staticroute/altstaticroute.vue'
	import makesure from './tags/topmakesure.vue'
    import pages from './tags/toppages.vue'
    import mustone from './tags/mustone.vue'
	import leastone from './tags/leastone.vue'

	import PageData from 'libs/PageData'
	export default {
		components: {
			addstaticroute,
			altstaticroute,
			pages,
            makesure,
			mustone,
			leastone,
            loadSpan
		},
		mounted() {
            this.getRoute()
        },
		data() {
			return {
				name:'静态路由',
				totalpage:0,
				routes:[],
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
				this.result = ''
				this.errorMsg = ''
				$('.modal input').val('').css('border', '1px solid #e8e8e8')
				$('.modal .abcd input').val('').css('border', 'none')
                $('.modal .gateway input').val('').css('border', 'none')
                $('.modal .altabcd input').val('').css('border', 'none')
                $('.modal .altgateway input').val('').css('border', 'none')
                $('.modal textarea').val('').css('border', '1px solid #e8e8e8')
				$('.mi').css('color', '#d2d2d2')
				$('.notice').hide()
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
            dbclk(route,index){ 
            	this.reset()
                if(JSON.stringify(route) != "{}"){
                    this.isdb=true
                    $('.check').prop('checked', false)
					$('#' + index).prop('checked', true)
					this.eachChk()
                    this.altRoute(route)
                }
            },
			altrouteMsg(){
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
                    this.altRoute(this.data[index])
                }
            },
            arrip(el,value){
				let arrip=value.split('.')
               $(el+' input').eq(0).val(arrip[0])
               $(el+' input').eq(1).val(arrip[1])
               $(el+' input').eq(2).val(arrip[2])
               $(el+' input').eq(3).val(arrip[3])
			},
			arrmgip(el,value){
				let arrip=value.split('.')
               $(el+' input').eq(0).val(arrip[0])
               $(el+' input').eq(1).val(arrip[1])
               $(el+' input').eq(2).val(arrip[2])
			   let mgarrip=arrip[3].split('/')
               $(el+' input').eq(3).val(mgarrip[0])
			   $(el+' input').eq(4).val(mgarrip[1])
			},
			altRoute(route){
                $('.modal .id').html(route.id)
                this.arrmgip('.altabcd',route.net_segment)
                this.arrip('.altgateway',route.gateway)
                $('#altstaticroute').modal('show')
            },
			rmrouteMsg(){
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
			rmRoute(){
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
                netservice.bindRoute(conf)
                .then((recvdata) => {
                    recvdata = jQuery.parseJSON(recvdata);
                    if(recvdata.success && recvdata.data.result == "ok") {
                    	this.result = 'ok'
						$("input[type=checkbox]").prop("checked", false)
						this.getRoute()
                    }else{
                       this.result=='error'
                       this.errorMsg = recvdata.errorMessage
                    }
                })
            },
			getRoute(){
                let ipconf = {
                    oper:"look"
                };
                // netservice.bindRoute(ipconf)
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
                let ipconf = {
                    oper:"look"
                };
                netservice.bindRoute(ipconf)
                .then((recvdata) => {
					recvdata = jQuery.parseJSON(recvdata);
					if(recvdata.success) {
                        this.allTableData = recvdata.data.config
                        this.totalpage = new PageData(recvdata.data.config,20).totalpage
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
		width: 1150px;
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
	thead tr th {
        text-align: center;
		color: #ffffff;
	}
    thead tr th:last-child {
        border-right: 1px solid #69b6ff;
	}
    tbody tr td:last-child {
        border-right: 1px solid #c9e4ff;
    }
    tbody tr:last-child td {
        border-bottom: 1px solid #c9e4ff;
    }
    tbody tr td {
        text-align: center;
        border-left: 1px solid #c9e4ff;
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