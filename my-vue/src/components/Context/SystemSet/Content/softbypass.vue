<template>
	<div class="wrap">
		<div class="title">
			<h3>当前bypass线路</h3>
			<ul class="butn">
				<li class="seleAll" data-placement="bottom"  @mouseenter="actived('selectall')" @mouseleave="unactived()" v-on:click='seleAll()' v-if='show'>
					<img v-if="type=='selectall'" src="../../../img/b_selectall.png" />
					<img v-else src="../../../img/selectall.png">
					<span :class="[type=='selectall'?'actived':'unactived']">全选</span>
				</li>
				<li @mouseenter="actived('cancel')" @mouseleave="unactived()" v-on:click='cancelAll()' v-else>
					<img v-if="type=='cancel'" src="../../../img/b_cancel.png" />
					<img v-else src="../../../img/cancel.png" />
					<span :class="[type=='cancel'?'actived':'unactived']">取消全选</span>
				</li>
				<li @mouseenter="actived('add')" @mouseleave="unactived()" data-toggle="modal" data-target="#roadmodal">
					<img v-if="type=='add'" src="../../../img/bule_add.png" />
					<img v-else src="../../../img/add.png" />
					<span :class="[type=='add'?'actived':'unactived']">新增</span>
				</li>
				<li @mouseenter="actived('del')" @mouseleave="unactived()" v-on:click='rmMsg()' class="deletetag" data-placement="bottom">
					<img v-if="type=='del'" src="../../../img/bule_delet.png" />
					<img v-else src="../../../img/delete.png" />
					<span :class="[type=='del'?'actived':'unactived']">删除</span>
				</li>				
				<addroad :routes='allroutes' v-on:getData="getBypass()"></addroad>
			</ul>
		</div>
		<div class="content">
			<ul class="roadul" v-if="items.length > 0 ">
				<transition-group name="list">
					<li v-for='(item ,index) in items'  v-bind:key="item">
						<p class="roads">线路{{item}}</p>
						<span class="isbypass">bypass</span><br />
						<input type="checkbox"><span class="dele" @click="rmOne(item)">删除</span>
					</li>
				</transition-group>
			</ul>
			<p v-else>暂未设置线路bypass，请添加。</p>
		</div>
		<makesure v-on:rm="rmMore()" :result = 'result' :name ='name' :errorMsg ='errorMsg'></makesure>
		<mustone></mustone>
	</div>
</template>
<script>
	import systemService from 'services/systemService'

	import makesure from './tags/makesure.vue'
    import mustone from './tags/mustone.vue'
    import addroad from './softbypass/addRoad.vue'
	
	export default {
		components: {
			addroad,
			makesure,
			mustone,
		},
		data() {
			return {
				name:'bypass线路',
				items:[],
                show: true,
				allroutes:[],
				type:"",
				result:'',
                errorMsg:''
			}
		},
		mounted() {
			this.getBypass()
			this.getGroups()
		},
        methods: {
        	reset(){
				this.result = ''
				this.errorMsg = ''
				$('.modal input').val('').css('border', '1px solid #e8e8e8')
				$('.modal textarea').val('').css('border', '1px solid #e8e8e8')
				$('.mi').css('color', '#d2d2d2')
				$('.notice').hide()
			},
			getBypass(){
				let bypass={
					oper:"look",
					group:[]
				}
				// systemService.doBypass(bypass)
				// .then((recvdata) => {
				// 	recvdata = jQuery.parseJSON(recvdata);
				// 	if(recvdata.success){
						this.items = []
					// }
				// })
			},
			getGroups(){
				// systemService.getRoadNum()
				// .then((recvdata) => {
				// 	recvdata = jQuery.parseJSON(recvdata);
				// 	if(recvdata.success){
						this.allroutes = []
				// 	}
				// })
			},
			rmOne(index){
				var del={
					oper:"del",
					group:index
				}
				this.remove(del)
			},
			rmMsg() {
				this.reset()
				var hash_arr = new Array();
                $(":checkbox").each(function(i,e){
                    if($(e).prop("checked")){
						var Str = $(e).parent().find("p")['0'].innerHTML
						var Char = Str.substr(Str.length-1,1)
                        hash_arr.push(Char);
                    };            
                });
                if(hash_arr.length == 0){
                    this.popoverShow('.deletetag', "请选择删除内容")
                }else{
                    $('#makesure').modal('show')
                }
            },
			rmMore(){
				var hash_arr = new Array();
                $(":checkbox").each(function(i,e){
                    if($(e).prop("checked")){
						var Str = $(e).parent().find("p")['0'].innerHTML
						var Char = Str.substr(Str.length-1,1)
                        hash_arr.push(Char);
                    };            
                });
				var delmore = {
                    oper:"del",
                    group:this.arr2string(hash_arr)
               };
                this.remove(delmore)
			},
			seleAll() {
				var hash_arr = new Array();
                $(":checkbox").each(function(i,e){
                    if(e){
						var Str = $(e).parent().find("p")['0'].innerHTML
						var Char = Str.substr(Str.length-1,1)
                        hash_arr.push(Char);
					}   
                });
				
                if(hash_arr.length != 0){
					$(":checkbox").prop("checked", true)
					this.show = false
				}else{
					this. popoverShow('.seleAll', '没可选内容')
				}
			},
			cancelAll() {
				$(":checkbox").prop("checked", false)
				this.show = true
			},
			remove(bypass){
				this.result = 'reqing'
				systemService.doBypass(bypass)
				.then((recvdata) => {
					recvdata = jQuery.parseJSON(recvdata);
					if(recvdata.success) {
						 this.result = 'ok'
						$(":checkbox").prop("checked", false)
						this.show = true	
						this.getBypass()				
                    }else{
                        this.result = 'error'
                        this.errorMsg = recvdata.errorMessage
                    }	
				})
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
		height: 600px;
		max-height: 600px;
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
	}
	
	.content {
		padding: 0 20px;
	}
	
	.content ul li {
		display: inline-block;
		width: 94px;
		height: 120px;
		border: 1px solid #90c9ff;
		border-radius: 10px;
		text-align: center;
		padding: 10px;
		margin: 20px 0 0 20px;
        box-sizing: border-box;
        cursor: pointer;
	}
	.content ul li:hover{
		box-shadow: 0px 0px 10px 0 #bfddfc;
	}
	.content ul li:nth-child(10n+1){
		margin-left: 10px;
	}
	.roads {
		color: #69b6ff;
		font-size: 20px;
		font-weight: 600;
		text-align: center;
		height: 30px;
		line-height: 30px;
	}
	.isbypass{
		display: inline-block;
		height: 40px;
		line-height: 40px;
		font-size: 16px;
		text-align: center;
		color: #bbbaba;
		border-bottom: 1px solid #eeeeee; 
	}
	.dele{
	   vertical-align: middle;
	   height: 35px;
	   line-height: 35px;
	   margin-left:5px;
	}
	.dele:hover{
		color: #69b6ff
	}
	p {
		text-align: center;
		line-height: 500px;
		font-size: 16px;
		color: #69b6ff;
	}
	input[type="checkbox"]{
		width: 12px;
		height: 12px;
	}
	.actived{
		color:#69b6ff;
	}
	.unactived{
		color:#FFFFFF;
	}
	/*动画*/
	.list-enter-active, .list-leave-active {
	  transition: all .5s;
	}
	.list-enter, .list-leave-active {
	  opacity: 0;
	  transform: translateY(30px);
	}
</style>