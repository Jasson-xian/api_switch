<template>
	<div class="bg">
		<loadSpan v-show= "!show"></loadSpan>			
		<table>
			<thead>
				<tr>
					<th style="width: 60px;"><input type="checkbox" id="checkAll" @change='checkAll()' /></th>
					<th style="width: 60px;">序号</th>
					<th style="display: none;">Id</th>
					<th>虚拟端口</th>
					<th>蜜罐主机IP</th>
					<th>蜜罐主机端口</th>
				</tr>
			</thead>
			<transition name="fade"  mode="out-in">
			<tbody v-show = "show">				
				<tr v-for='(item ,index) in data'>
					<template v-if="index<tableData.length">
						<td @dblclick.stop=''>
							<input class="isCheck" type="checkbox" :id='index' @change.stop='check()' />
						</td>
						<td>
							<label :for="index">{{(index+1)+29*(nowpage-1)}}</label>
						</td>
						<td class="idNum" style="display: none;">{{item.id?item.id:'-'}}</td>
						<td class="vportNum">
							<label :for="index">{{item.seport?item.seport:'-'}}</label>
						</td>
						<td class="rIPNum">
							<label :for="index">{{item.hpABCD?item.hpABCD:'-'}}</label>
						</td>
						<td class="rportNum">
							<label :for="index">{{item.tport?item.tport:'-'}}</label>
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
			show:{
				type:Boolean,
				required: true
			}
		},
		data() {
			return {}
		},
		computed: {
			data: function() {
				let tableData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
				for(let i = 0; i < this.tableData.length; i++) {
					tableData[i] = this.tableData[i]
				}
				return tableData
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
		height: 750px;
	}
	td,
	th {
		text-align: center;
		height: 25px;
	}
	
	th {
		width: 400px;
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
		height: 20px;
		border-radius: 5px;
		background: #69b6ff;
		color: #ffffff;
	}
	
	label {
		font-weight: 500;
		width: 100%;
		margin-bottom: 0;
	}
	/*----鼠标划过变色-------*/
	
	tbody tr:hover {
		background: rgba(129, 194, 255, 0.5);
	}
</style>