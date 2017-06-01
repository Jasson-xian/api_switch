<template>
	<div class="wrap">
		<tabletitle :name='name' :tableData='tableData' v-on:deleData='deleData' v-on:addData='addData' v-on:modData='modData'></tabletitle>
		<div class="content">
			<filterdiv v-on:getData='getData'></filterdiv>
			<!--添加-->
			<ul class="add" @keydown.enter='addData()'>
				<li>
					<label>添加主机备注</label>
					<span class="line"></span>
				</li>
				<li>
					<label>MAC地址：</label>
					<macinput :empty = "false" class="addMacIP"></macinput>
					<span class="mi">* 必填</span>
				</li>
				<li>
					<label>备注：</label>
					<input class="addNote" type="text" placeholder="默认" @focus="isEmpty('.addNote')" @blur="testVal('.addNote','allpass')"  >
					<span class="mi">* 必填</span>
				</li>

				<li>
					<button class="button button--aylen" @click='addData()'>添&nbsp;&nbsp;加</button>
				</li>
				<li>
					<span class="notice">*{{errorMsg}}</span>
				</li>
			</ul>
			<!--表格-->
			<tablecontent :tableData='tableData' :nowpage='nowpage' :show='show' v-on:modData="modData"></tablecontent>
			<!--分页-->
			<severPages v-on:getPageData="getPageData" :totalpage='totalpage' :nowpage = 'nowpage'></severPages>
		</div>
		<!--弹框-->
		<modModal v-on:getData='getData' :result='result' :errorMsg='errorMsg'></modModal>
		<delemodal v-on:setDelData='setDelData' :result='result' :oper='oper' :name='name' :errorMsg='errorMsg'></delemodal>
	</div>
</template>
<script>
	import macinput from 'components/libs/macinput'
	import tabletitle from './selfset/tabletitle'
	import filterdiv from './selfset/filterdiv'
	import modModal from './selfset/modModal'
	import tablecontent from './selfset/tablecontent'
	import delemodal from './selfset/delemodal'
	import severPages from 'components/libs/severPages'

	import defendService from 'services/defendService'
	import PageData from 'libs/PageData'
	import formatTest from 'libs/formatTest'
	export default {
		components: {
			macinput,
			tabletitle,
			filterdiv,
			tablecontent,
			modModal,
			delemodal,
			severPages
		},
		data() {
			return {
				name: '主机备注',
				allTableData: [],
				tableData: [],
				nowpage: 1,
				totalpage: 0, //总页数
				oper: '', //操作类型，add，del
				result: '',
				deleIds: '', //要删除的id
				errorMsg: '',
				show:false
			}
		},
		mounted() {
			this.getData('')
		},
		methods: {
			getData(sentdata) {				
				this.result = 'reqing'
				// defendService.getSelfset(sentdata)
				// 	.then((recvdata) => {
				// 		recvdata = JSON.parse(recvdata)
				// 		if(recvdata.success) {
							this.show = true
							this.result = 'ok'
							this.allTableData = []
							this.totalpage = new PageData([], 25).totalpage
							if(this.oper=='add'){//添加跳到最新一页
								this.nowpage = this.totalpage
							}
							this.getPageData(this.nowpage ) //分页
					// 	} else {
					// 		this.result = 'error'
					// 		this.errorMsg = String(recvdata.errorMessage)
					// 		if(this.oper == 'add'){
					// 			$('.add .notice').show().addClass('animated shake')
					// 			setTimeout(function() {
					// 				$('.add .notice').removeClass('animated shake')					
					// 			}, 1000)
					// 		}
					// 	}
					// })
			},
			getPageData(currentpage) {
				this.nowpage = currentpage
				var allData = this.allTableData
				this.tableData = new PageData(allData, 25).data(this.nowpage)
				if(this.tableData==''&&this.nowpage>1){//当前页为空
					this.nowpage--
					this.tableData = new PageData(allData, 25).data(this.nowpage)
				}
			},
			addData() {
				this.result = ''
				this.oper = 'add'
				let macVal = this.macVal('.addMacIP')
				var testmac = this.testmac('.addMacIP')				
				var testDesc = this.testVal('.addNote', 'allpass')									
				if(testmac&&testDesc) {
					var sentdata = {
						oper: 'add',
						macs: macVal,
						desc: $('.addNote').val()
					}
					this.getData(sentdata)
					this.reset()
				}
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
			testmac(ele){
					let mac_a_test = this.testVal(ele+' .mac_a', 'mac_piece')
				    let mac_b_test = this.testVal(ele+' .mac_b', 'mac_piece')
					let mac_c_test = this.testVal(ele+' .mac_c', 'mac_piece')
					let mac_d_test = this.testVal(ele+' .mac_d', 'mac_piece')
					let mac_e_test = this.testVal(ele+' .mac_e', 'mac_piece')
					let mac_f_test = this.testVal(ele+' .mac_f', 'mac_piece')
					if(mac_a_test&&mac_b_test&&mac_c_test&&mac_d_test&&mac_e_test&&mac_f_test){
                        return true
					}else{
						return false
					}
			},
			testVal: function(ele, reg) {
				var test = new formatTest(ele, reg, false)
				return test.testFormat()
			},
			isEmpty: function(ele) {
				var test = new formatTest(ele)
				test.notEmpty()
				$('.add .notice').hide()
			},
			setDelData() {
				var sentdata = {
					oper: 'del',
					macs: this.deleIds
				}
				this.getData(sentdata)
			},
			deleData() {
				this.result = ''
				this.oper = 'del'
				var delArr = []
				var deledata = this.tableData
				$('.isCheck').each(function(index, e) {	
					if($(e).prop("checked")) {							
						delArr.push(deledata[index].mac)
					}
				})
				if(delArr.length) {
					this.deleIds = delArr.join(",")
					$('.deleModal-modal-lg').modal('show')
				} else {
					//没有选择删除内容
					this.popoverShow('.delebutn', "请选择要删除的内容")
				}

			},
			modData(Index) {
				this.oper = 'edit'
				this.reset()
				if(Index >= 0) { //双击修改
					this.modShow(Index)
				} else { //input勾选修改
					this.modWhich()
				}
			},
			modWhich() {
				//获取要被修改的是哪一个	
				var checkNum = 0
				var modNum
				$('.isCheck').each(function(index, ele) {
					if($(ele).prop("checked")) {
						checkNum++
						modNum = index
					}
				})
				if(checkNum > 1) {
					this.popoverShow('.modbutn', "每次修改一个")
				} else if(checkNum == 1) {
					this.modShow(modNum)
				} else {
					this.popoverShow('.modbutn', "请选择要编辑的内容")
				}
			},
			modShow(which) {
				//获取修改的内容
				$('.addModal-modal-lg').modal('show')
				//获取修改的内容
				var moddata = this.tableData[which]
				setTimeout(function() {
					$('.macIP .mac_a').val(moddata.mac.split(":")[0])
					$('.macIP .mac_b').val(moddata.mac.split(":")[1])
					$('.macIP .mac_c').val(moddata.mac.split(":")[2])
					$('.macIP .mac_d').val(moddata.mac.split(":")[3])
					$('.macIP .mac_e').val(moddata.mac.split(":")[4])
					$('.macIP .mac_f').val(moddata.mac.split(":")[5])					
					$('.note').val( moddata.description)
				}, 10)
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
			reset(){
				this.result = ''
				this.errorMsg = ''
				$('.add input').val('')
				$('.modal input').val('')
				$('.modal textarea').val('')
				$('.mi').css('color', '#d2d2d2')
				$('.modal input').css('border', '1px solid #e8e8e8')
				$('.input_wrap input').css('border', 'none')
				$('.notice').hide()
			}
		}
	}
</script>
<style scoped>
	.wrap {
		margin: 30px 0 0 30px;
		background: #ffffff;
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
	
	.line {
		height: 12px;
		border-left: 1px solid #e0e0e0;
		margin: 0 8px;
		display: inline-block;
	}
	
	.add {
		margin: 20px 0 15px;
	}
	
	label {
		width: 80px;
		text-align: right;
		vertical-align: middle;
		margin: 0;
	}
	
	label:first-child {
		margin-left: 0;
	}
	
	input {
		width: 180px;
		height: 25px;
		border: 1px solid #e6e6e6;
		border-radius:3px;
		padding: 0 5px;
		vertical-align: middle;
	}
	
	.button {
		width: 60px;
		height: 20px;
		color: #FFFFFF;
		border-radius: 5px;
		background: #f5b72e;
		vertical-align: middle;
		margin-left: 30px;
	}
	
	.content {
		margin-top: 20px;
		padding: 0 20px;
		height: 795px;
	}
	
	li {
		display: inline-block;
	}
	
	.mi {
		color: #d2d2d2;
		margin-left: 10px;
	}
	
	.notice {
		color: #b63039;
		display: none;
		width: 350px;
		text-align: left;		
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>