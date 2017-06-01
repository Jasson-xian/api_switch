<template>
	<div class="bg">
		<!--加载数据-->
		<loadSpan v-show= '!show'></loadSpan>	
		<table>
			<thead>
				<tr>
					<th style="width: 60px;"><input type="checkbox" id="checkAll" @change='checkAll()' /></th>
					<th style="width: 60px;">序号</th>
					<th>{{dataname}}</th>				
					<th>进入时间</th>
					<th>进入原因</th>
					<th>备注名</th>
				</tr>
			</thead>
			<transition name="fade"  mode="out-in">
			<tbody v-if = 'show'>
				<tr v-for='(item ,index) in data'>
					<template v-if="index<tableData.length">
						<td @dblclick.stop=''>
							<input class="isCheck" type="checkbox" :id='index' @change.stop='check()' />
						</td>
						<td>
							<label :for="index">{{(index+1)+onepage*(nowpage-1)}}</label>
						</td>
						<td class="macNum">
							<label :for="index">{{item.mac?item.mac:'-'}}</label>
						</td>
						
						<td>
							<label :for="index">{{item.time?item.time:'-'}}</label>
						</td>
						<td class="reasonNum">
							<label :for="index">{{item.note?item.note:'-'}}</label>
						</td>
						<td class="noteNum">
							<label :for="index">{{item.desc?item.desc:'-'}}</label>
						</td>
					</template>
					<template v-else>
						<td>&nbsp</td>
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
</template>
<script>
import loadSpan from 'components/libs/loadSpan'	
export default {
	components:{
		loadSpan
	},
	props: {
		tableData: {
			type: Array,
			required: true
		},
		nowpage: {
			type: Number,
			required: true
		},
		onepage:{
			type: Number,
			required: true
		},
		show:{
			required: true
		},
		name:{
			type: String,
			required: true
		}
	},
	computed: {
		data: function() {
			let tableData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
			for(let i = 0; i < this.tableData.length; i++) {
				tableData[i] = this.tableData[i]
			}
			return tableData
		},
		dataname:function(){
				if(this.name.indexOf('白')>=0){
					return '白名单'
				}else{
					return '黑名单'
				}
			}
	},
	methods: {
		checkAll() {
			if($('#checkAll').prop('checked')) {
				$('input[type=checkbox]').prop('checked', true)
			} else {
				$('input[type=checkbox]').prop('checked', false)
			}
		},
		check() {
			var checkall = true
			$('.isCheck').each(function(index, ele) {
				checkall = $(ele).prop("checked")
				if(!checkall) {
					return false
				}
			})
			if(checkall) {
				$('#checkAll').prop('checked', true)
			} else {
				$('#checkAll').prop('checked', false)
			}
		}
	}
}
</script>
<style scoped>
	.bg{
		position: relative;
	}
	td,
	th {
		text-align: center;
		height: 25px;
	}
	
	th {
		width: 300px;
	}
	
	td {
		border-left: 1px solid #c9e4ff;
	}
	
	label {
		font-weight: 500;
		width: 100%;
		margin-bottom: 0;
	}
	
	tr td:first-child {
		border-left: none;
	}
	
	thead {
		background: #69b6ff;
	}
	
	tbody tr:nth-child(2n+1) {
		background: #e1f0ff;
	}
	
	tr {
		cursor: pointer;
	}
	
	th {
		color: #ffffff;
	}
	
	tbody {
		background: #f7fbff;
	}
	
	td>button {
		width: 60px;
		height: 18px;
		border-radius: 5px;
		background: #69b6ff;
		color: #ffffff;
		margin: 0 5px;
	}
	
	.noteNum {
		max-width: 60px;
	}
	
	.reasonNum {
		max-width: 280px;
	}
	
	.reasonNum,
	.noteNum {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	/*----鼠标划过变色-------*/
	
	tbody tr:hover {
		background: rgba(129, 194, 255, 0.5);
	}

	loadSpan{
		position: fixed;
		top: 800px;
	}
</style>