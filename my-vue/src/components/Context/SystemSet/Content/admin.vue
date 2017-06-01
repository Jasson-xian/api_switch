<template>
	<div class="wrap">
		<div class="title">
			<h3>系统管理员</h3>
			<ul class="butn">
				<li @mouseenter="actived('download')" @mouseleave="unactived()">
					<img v-if="type=='download'" src="../../../img/bule_down.png">
					<img v-else src="../../../img/download.png">
					<span :class="[type=='download'?'actived':'unactived']">下载Dkey驱动</span>
				</li>
				<li @mouseenter="actived('password')" @mouseleave="unactived()" data-toggle="modal" data-target=".pswdModal-modal-lg" >
					<img v-if="type=='password'" src="../../../img/bule_plot.png" />
					<img v-else src="../../../img/password.png" />
					<span :class="[type=='password'?'actived':'unactived']">密码策略</span>
				</li>
				<pwdtactics></pwdtactics>
				<li @mouseenter="actived('add')" @mouseleave="unactived()" data-toggle="modal" data-target="#addrole" >
					<img v-if="type=='add'" src="../../../img/bule_add.png" />
					<img v-else src="../../../img/add.png" />
					<span :class="[type=='add'?'actived':'unactived']">新增</span>
				</li>
			</ul>
		</div>
		<addnetmanage v-on:getData="getUser()"></addnetmanage>
		<div class="table-wrap" style="min-height:500px;position: relative;">
			<div style="width: 1150px;text-align: center;position:absolute;font-size:20px;top:200px;color: #69b6ff" v-if='status'>
					{{errorMSG}}
				</div>
			<!--加载数据-->
		    <loadSpan v-show= '!show'></loadSpan>
			<table>
				<thead>
					<tr>
						<th style="width: 100px;">序号</th>
						<th>用户名</th>
						<th>角色</th>
						<th>真实姓名</th>
						<th>公司部门</th>
						<th>邮箱地址</th>
						<th>认证方式</th>
						<th>操作</th>
					</tr>
				</thead>
				<transition name="fade" mode="out-in" v-if='!status'>
				<!--<div v-if='!status'>-->
					<tbody v-if = 'show'>
						<tr v-for='(user , index) in data'>
						<template v-if="index <users.length">
							<td >{{index+1}}</td>
							<td style="display:none;">{{user.u_id}}</td>
							<td>{{user.user_id}}</td>
							<td v-if="user.user_group == '1'">超级管理员</td>
							<td v-else-if="user.user_group == '2'">管理员</td>
							<td v-else-if="user.user_group == '3'">审计员</td>
							<td>{{user.real_name ? user.real_name : "-"}}</td>
							<td>{{user.department ? user.department : "-"}}</td>
							<td>{{user.email ? user.email : "-"}}</td>
							<td v-if="user.user_group == '1'">DKey登陆</td>
							<td v-else>口令认证</td>
							<td style="text-align: left;">
								<button @click="deleteMsg( user.u_id )" class="dele">删除</button>
								<button v-if="user.user_group != '1'" @click='alterRole( user )' class="alter">修改</button>
								<button data-toggle="modal" data-target="#myModal" v-if="user.user_group == '1'" class="write">	写入key</button>
							</td>
							</template>
						<template v-else>
							<td>&nbsp</td>
							<td>&nbsp</td>
							<td>&nbsp</td>
							<td>&nbsp</td>
							<td>&nbsp</td>
							<td>&nbsp</td>
							<td>&nbsp</td>
							<td>&nbsp</td>
						</template>
						</tr>
					</tbody>
				<!--</div>-->
				</transition>
			</table>
		</div>
		<p>注释：仅能在IE浏览器上进行DKEY写入操作。</p>
		<confirm v-on:doThing="deleteUser()" :types="types" :errorMsg='errorMSG' :result='result'></confirm>
		<alterrole v-on:getData="getUser()" :user="user"></alterrole>
		<success></success>
        <fail></fail>
	</div>
</template>
<script>
	import userservice from 'services/userService'
	import loadSpan from 'components/libs/loadSpan'
    import addnetmanage from './admin/addNetmanage.vue'
    import pwdtactics from './admin/pwdTactics.vue'
	import alterrole from './admin/alterRole.vue'
	import confirm from './update/confirm.vue'
	import success from './tags/success.vue'
    import fail from './tags/fail.vue'
	export default {
		components: {
			addnetmanage,
			pwdtactics,
			alterrole,
			confirm,
			success,
			fail,
            loadSpan
		},
		data() {
			return {
				users:[],
				user:{},
				uid:"",
				types:"",
				type:"",
                show:false,
				status:false,
				errorMSG:'',
				result:''
			}
		},
		mounted(){
			this.getUser()
		},
		computed: {
			data: function () {
				let tableData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
				for (let i = 0; i < this.users.length; i++) {
					tableData[i] = this.users[i]
				}
				return tableData

			}
		},
		methods: {
			getUser(){
                userservice.getUser()
                .then((recvdata) => {
					recvdata = jQuery.parseJSON(recvdata);
					if(recvdata.success) {
						this.show=true
						this.status=false;
                        this.users = recvdata.data
                    }else{
						this.show=true
						this.status=true;
						this.errorMSG=recvdata.errorMessage
					}
				})
            },
            
			alterRole(user){
				this.user = user
				$("#alterrole").modal('show')
			},
			deleteMsg(id){
				this.uid = ""
				this.uid = id
				this.types = "delete"
				this.result=''
				this.errorMSG=''
				$("#confirm").modal('show')
			},
			deleteUser(){
				this.result='reqing'
				userservice.deleteUser(this.uid)
                .then((recvdata) => {
					recvdata = jQuery.parseJSON(recvdata);
					if(recvdata.success) {
						this.getUser()
                        this.result='ok'
						this.uid = ""
					}else{
						this.result='error'
						this.errorMSG=recvdata.errorMessage
					}
				})
			},
			actived(type){
				this.type = type
			},
			unactived(){
				this.type = ""
			}
		}
	}
</script>
<style scoped>
	.wrap {
		margin: 30px 0 0 30px;
		padding-bottom: 20px;
		background: #FFFFFF;
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
	table {
		table-layout:fixed;
	}
	.table-wrap {
		margin: 20px 20px 10px 20px;
		background: #f7fbff;
	}
	
	thead {
		background: #69b6ff;
		color: #ffffff;
	}
	thead tr th:first-child,
	tbody tr td:first-child{
		border-left: 1px solid #69b6ff;
	}
	thead tr th:last-child,
	tbody tr td:last-child{
		border-right: 1px solid #69b6ff;
	}
	tbody tr:last-child td{
		border-bottom: 1px solid #69b6ff;
	}
	tbody tr td {
		border-left: 1px solid #b2daff;
		/*border-bottom: 1px solid #69b6ff;*/
		word-break:keep-all;/* 不换行 */
		white-space:nowrap;/* 不换行 */
		overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
		text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
	}
	
	td:first-child,
	th:first-child {
		border-left: none;
	}
	
	td:last-child{
		padding-left: 30px;
	}
	tr {
		height: 30px;
	}

	th{
		color: #ffffff;
		width: 300px;
	}
	th,
	td {
		text-align: center;
	}
	button {
		width: 80px;
		height: 18px;
		color: #FFFFFF;
		border-radius: 15px;
		background: #feae00;
		margin: 0 5px;
	}
	.alter{
		width: 50px;
		margin-left: 18px;
	}
	.dele {
		width: 50px;
		background: #448aca;
	}
	.write{
		width: 70px;
		margin-left: 18px;
	}
	tbody tr:nth-child(odd) {
		background: #e1f0ff;
	}
	
	p {
		color: #5793ce;
		margin-left: 20px;
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