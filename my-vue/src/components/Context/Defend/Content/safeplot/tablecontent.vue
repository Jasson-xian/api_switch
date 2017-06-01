<template>
	<div class="bg">
		<loadSpan v-show= "!show"></loadSpan>	
		<table>
			<thead>
				<tr>
					<th style="width: 60px;"><input type="checkbox" id="checkAll" @change='checkAll()'/></th>
					<th>规则号</th>
					<th>协议类型</th>
					<th >源IP</th>
					<th>目的IP</th>
					<th>源端口</th>
					<th>目的端口</th>
				</tr>
			</thead>
			<transition name="fade"  mode="out-in">
			<tbody v-show = "show">						
				<tr v-for='(item ,index) in data' @dblclick.stop="toModData(index)">
					<template v-if="index<tableData.length">
						<td @dblclick.stop=''>
							<input :id='index' @change.stop='check()' class="isCheck" type="checkbox" /> 
						</td>
						<td class="idNum">
							<label :for="index">{{item.id?item.id:'-'}}</label>
						</td>
						<td class="protocalNum">
							<label :for="index">{{item.protocol_id?item.protocol_id:'-'}}</label>	
						</td>
						<td class="srcIPNum">
							<label :for="index">{{item.src?item.src:'-'}}</label>
						</td>
						<td class="dstIPNum">
							<label :for="index">{{item.dst?item.dst:'-'}}</label>
						</td>
						<td class="dportsNum">
							<label :for="index">{{item.dports?item.dports.join(','):'-'}}</label>
						</td>
						<td class="sportsNum">
							<label :for="index">{{item.sports?item.sports.join(','):'-'}}</label>
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
					</template>
				</tr>
			</tbody>
			</transition>
		</table>
	</div>
</template>
<script>
	import ProtocolData from 'libs/ProtocolData'
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
			show:{
				type:Boolean,
				required: true
			}
		},
		computed: {
			data: function() {

				let tableData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
				for(let i = 0; i < this.tableData.length; i++) {
					tableData[i] = this.tableData[i]
					tableData[i]["protocol_id"] = ProtocolData.value(this.tableData[i]["protocol_id"])
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
		height: 750px;
	}
	td,
	th {
		text-align: center;
		height: 25px;
	}
	
	tr th:nth-child(n+2),
	tr td:nth-child(n+2) {
		width: 200px;
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
	
	.block {
		background: #fac064;
	}
	
	.unblock {
		background: #68bf72;
	}
	
	input[type=checkbox] {
		cursor: pointer;
	}
	
	label {
		font-weight: 500;
		width: 100%;
		margin-bottom: 0;
	}
	/*----鼠标划过变色-------*/	
	tbody tr:hover {
		background: rgba(129,194,255,0.5);
	}

</style>