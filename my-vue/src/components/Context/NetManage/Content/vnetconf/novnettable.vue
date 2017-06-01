<template>
    <div class="table-wrap norip-table" style="min-height: 300px;position: relative;">
        <!--加载数据-->
		<loadSpan v-show= '!show'></loadSpan>	
        <table>
            <thead>
                <tr>
                    <th style="width: 1200px;" colspan="4">虚拟网络保留网段配置</th>
                    <th colspan="2">
                        <ul class="butn">
                            <li @mouseenter="actived('add')" @mouseleave="unactived()" v-on:click='altnovnetMsg(0)'>
                                <img v-if="type=='add'" src="../../../../img/b_add.png" />
                                <img v-else src="../../../../img/add.png" />
                                <span :class="[type=='add'?'actived':'unactived']">添加</span>
                            </li>
                            <li @mouseenter="actived('delete')" @mouseleave="unactived()" v-on:click='rmnovnetMsg()' class="deletenotag" data-placement="bottom">
                                <img v-if="type=='delete'" src="../../../../img/b_dele.png" />
                                <img v-else src="../../../../img/delete.png" />
                                <span :class="[type=='delete'?'actived':'unactived']">删除</span>
                            </li> 
                            <li @mouseenter="actived('modpic')" @mouseleave="unactived()" v-on:click='altnovnetMsg(1)' class="noedittag" data-placement="bottom">
                                <img v-if="type=='modpic'" src="../../../../img/b_mod.png"/>
                                <img v-else src="../../../../img/modpic.png" />
                                <span :class="[type=='modpic'?'actived':'unactived']">编辑</span>
                            </li>                       
                            <addnovnet v-on:getData="setNovnet()" :result = 'result' :oper='oper' :errorMsg ='errorMsg' ></addnovnet>
                            <botmakesure v-on:rm="rmNovnet()" :result = 'result' :name ='name' :errorMsg ='errorMsg'></botmakesure>
                        </ul>
                    </th>
                </tr>
                <tr>
                    <th style="width: 40px;">
                        <input v-model="checkall" @click="checkAll()" type="checkbox">
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
                    <tr class="change" v-for="(novnet, index) in data" @click="oneclk( index )" @dblclick="dbclk( novnet ,index)">
                        <template v-if="novnet.hash_code">
                            <td style="width: 40px;">
                                <input class="checkno"  @click.stop="eachChk()"  type="checkbox" :id=" index +'no' ">
                            </td>
                            <td style="width: 60px;">{{ index + 1+(nowpage-1)*8 }}</td>
                            <td style="display:none;">{{ novnet.hash_code }}</td>
                            <td style="width: 275px;">{{ novnet.ABCD }}</td>
                            <td style="width: 275px;">{{ novnet.MASK }}</td>
                            <td style="width: 275px;">{{ novnet.vlanid }}</td>
                            <td style="width: 275px;">线路{{ novnet.groupid }}</td>
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
        <botpages v-if='show' v-on:getPageData="getPageData" :totalpage='totalpage' :nowpage='nowpage'></botpages>
    </div>
</template>
<script>
    import netservice from 'services/netService'
    import loadSpan from 'components/libs/loadSpan'
    import addnovnet from '../vnetconf/addnovnet.vue'
    import botpages from '../tags/botpages.vue'
    import botmakesure from '../tags/botmakesure.vue'

    import PageData from 'libs/PageData'

	export default {
		components: {
            addnovnet,
            botpages,
            botmakesure,
            loadSpan,
		},
        mounted() {
           this.getNovnet()
        },
        data(){
            return {
            	name:'虚拟网络保留网段配置',
                checkall:false,
                novnets:[],
                totalpage:0,
                allTableData:[],
                nowpage:1,
                tableData:[],
                type:"",
                show:false,
                result:'',
                errorMsg:'',
                oper:'保留'
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
				this.errorMsg = ''
				$('.modal input').val('').css('border', '1px solid #e8e8e8')
				$('.modal .noabcd input').val('').css('border', 'none')
                $('.modal .nomask input').val('').css('border', 'none')
                $('.modal textarea').val('').css('border', '1px solid #e8e8e8')
				$('.mi').css('color', '#d2d2d2')
                $('.nohash_code').html('')
				$('.nonotice').hide()
			},
            oneclk(index){  
                this.isdb=false;  
                window.setTimeout(cc, 0)
                var _this = this
                function cc(){
                    if(_this.isdb!=false)return;
                    var flag = $("#"+index+"no").prop("checked")
                    if(flag){
                        $("#"+index+"no").prop("checked",false)
                    }else{
                        $("#"+index+"no").prop("checked",true)
                    }
                    _this.eachChk()
                }  
            },
            dbclk(novnet,index){ 
            	this.reset()
                if(JSON.stringify(novnet) != "{}"){
                    this.isdb=true
                    $('.checkno').prop('checked', false)
					$('#'+index+'no').prop('checked', true)
					this.eachChk()
                    this.altnovnetMsg(1)
                }
            },
            ipVal(ele){
				let ipVal =  ($(ele+' .ip_a').val()?$(ele+' .ip_a').val():"")+
								($(ele+' .ip_b').val()?'.'+$(ele+' .ip_b').val():"")+
								($(ele+' .ip_c').val()?'.'+$(ele+' .ip_c').val():"")+
								($(ele+' .ip_d').val()?'.'+$(ele+' .ip_d').val():"")
				return ipVal
			},
            setNovnet(){
                var nonetconfig = {
						type:this.result+"_novnet",
                        abcd:this.ipVal('.noabcd'),
						mask:this.ipVal('.nomask'),
						vlanid:$('.novlanid').val(),
						groupid:$('.noroute').val(),
                        hash_code:$('.nohash_code').html(),
					}
					this.result = "loading"
					netservice.setAllnet(nonetconfig)
					.then((recvdata) => {
						recvdata = jQuery.parseJSON(recvdata);
						if(recvdata.success && recvdata.data.result == "ok") {
							this.result = "success"
                            this.getNovnet()
							setTimeout(function () {
								$('#addnovnet').modal('hide');
							}, 1000);
						}else if(recvdata.level == "error" && !recvdata.success) {
							this.result = ""
							this.errorMsg = recvdata.errorMessage
                            $('.nonotice').show()
						}
					})
            },
            rmnovnetMsg(){
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
            altnovnetMsg(val){
                this.reset()
                if(!val){
                   this.oper='添加'
                   this.result='add'
                   $('#addnovnet').modal('show')
                }else{
                   this.oper='修改'
                   this.result='edit'
                   let hash_arr = new Array();
                    $(".checkno").each(function(i,e){
                        if($(e).prop("checked")){
                            hash_arr.push($(e).parent().next().html());
                        };
                    });
                    if( hash_arr.length == 0 ){
                        this.popoverShow('.noedittag', "请选择编辑内容")
                    }else if( hash_arr.length > 1 ){
                        this.popoverShow('.noedittag', "每次修改一个")
                    }else if( hash_arr.length = 1 ){
                        if(this.data)
                        var index = hash_arr[0] - 1 - (this.nowpage-1)*8
                        this.altnet(this.data[index])
                        $('#addnovnet').modal('show')
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
                this.arrip('.noabcd',data.ABCD)
                this.arrip('.nomask',data.MASK)
                $('.modal .nohash_code').html(data.hash_code)
                // $('.modal .noabcd').val(data.ABCD)
                $(".modal .noroute").val(data.groupid)
                // $(".modal .nomask").val(data.MASK)
                $(".modal .novlanid").val(data.vlanid)
            },
            rmNovnet(){
                var hash_arr = new Array();
                $(".checkno").each(function(i,e){
                    if($(e).prop("checked")){
                        hash_arr.push($(e).parent().parent().find('td')['2'].innerHTML);
                    };            
                });
                if(hash_arr.length != 0){
                    var novnet = {
                        type:"del_novnet",
                        hash_code:this.arr2string(hash_arr)
                    }                
                    this.rmove(novnet)
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
                        this.getNovnet()                    
                    }else{
                       this.result=='error'
                       this.errorMsg = recvdata.errorMessage
                    }
                })
            },
            getNovnet(){
                // netservice.getAllnet()
                // .then((recvdata) => {
				// 	recvdata = jQuery.parseJSON(recvdata);
				// 	if(recvdata.success) {
                        this.show=true
                        this.allTableData = []
                        this.getPageData(this.nowpage)
                        this.totalpage = new PageData([], 8).totalpage            
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
            afterAdd(){
                netservice.getAllnet()
                .then((recvdata) => {
					recvdata = jQuery.parseJSON(recvdata);
					if(recvdata.success) {
                        this.allTableData = recvdata.data.config.novnet
                        this.totalpage = new PageData(recvdata.data.config.novnet, 8).totalpage
                        this.nowpage = this.totalpage
                        this.getPageData(this.nowpage)
                    }
				})
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
    .norip-table{
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