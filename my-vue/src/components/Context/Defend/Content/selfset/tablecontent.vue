<template>
	<div class="bg">
		<loadSpan v-show= "!show"></loadSpan>			
		<table>
			<thead>
				<tr>
					<th style="width: 60px;"><input type="checkbox" id="checkAll" @change='checkAll()'/></th>
					<th style="width: 60px;">序号</th>
					<th style="width: 550px;">MAC地址</th>
					<th style="width: 600px;">备注名</th>
				</tr>
			</thead>
			<transition name="fade"  mode="out-in">
			<tbody v-show = "show">						
				<tr v-for='(item ,index) in data' @dblclick.stop="toModData(index)">
					<template v-if="index<tableData.length">
						<td><input :id='index' @change.stop='check()' class="isCheck" type="checkbox" /> </td>
						<td>
							<label :for="index">{{(index+1)+25*(nowpage-1)}}</label>
						</td>
						<td class="macNum">
							<label :for="index">{{item.mac?item.mac:'-'}}</label>
						</td>
						<td class="noteNum">
							<label :for="index">{{item.description?item.description:'-'}}</label>
						</td>				
					</template>
					<template v-else>
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
			nowpage:{
				type: Number,
				required: true
			},
			show:{
				type:Boolean,
				required: true
			}
		},
		computed: {
			data: function() {
				let tableData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},{}]
				for(let i = 0; i < this.tableData.length; i++) {
					tableData[i] = this.tableData[i]
				}
				return tableData
			}
		},
		methods: {
			checkAll() {
				if($('#checkAll').prop('checked')) {
					$('table input[type=checkbox]').prop('checked', true)
				} else {
					$('table input[type=checkbox]').prop('checked', false)
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
			},
			toModData(Index) {
				if(Index<this.tableData.length){
					this.$emit('modData', Index)
					$('.isCheck').prop('checked', false)
					$('#' + Index).prop('checked', true)
					this.check()
				}			
			}
		}
	}
</script>
<style scoped>
	.bg{
		position: relative;
		height: 645px;
	}
	td,
	th {
		text-align: center;
		height: 25px;
	}	
	td {
		border-left: 1px solid #c9e4ff;
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
	}
	
	input[type=checkbox] {
		cursor: pointer;
		width: 12px;
		height: 12px;
	}
	label {
		font-weight: 500;
		width: 100%;
		margin-bottom: 0;
	}
	.noteNum{
		max-width: 890px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	/*----鼠标划过变色-------*/	
	tbody tr:hover {
		background: rgba(129,194,255,0.5);
	}
</style>
