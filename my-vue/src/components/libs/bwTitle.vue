<template>
	<div class="title">
		<h3>{{name}}</h3>
		<ul class="butn">	
			<li v-on:click='toAddData()'  @mouseenter="actived('add')" @mouseleave="unactived()" data-toggle="modal" data-target=".addModal-modal-lg">
				<img v-if="type=='add'"   src="../img/bule_add.png"/>
				<img v-else src="../img/add.png" />
				<span :class = "[type=='add'?'active':'unactive']">添加</span>
			</li>		
			<li class="delebutn" @click='toDeleData()'  @mouseenter="actived('dele')" @mouseleave="unactived()" data-placement="bottom">
				<img v-if="type=='dele'"  src="../img/bule_delet.png"/>
				<img v-else  src="../img/delete.png"/>
				<span :class = "[type=='dele'?'active':'unactive']">删除</span>
			</li>			
		</ul>
	</div>
</template>
<script>
export default {
	props:{
		tableData: {
			type: Array,
			required: true
		},
		name:{
			type: String,
			required: true
		}
	},
	data() {
		return {
			type:''
		}
	},
	methods: {
		actived(type){
			this.type = type
		},
		unactived(){
			this.type = ''
		},
		toAddData(){
			this.$emit('addData')
		},
		toDeleData(){
			this.$emit('deleData')
		}	
	}
}
</script>
<style scoped>
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
	
	.butn li {
		display: inline-block;
		margin: 5px 25px 0px 0px;
		cursor: pointer;
	}
	
	.butn span {
		vertical-align: middle;
	}
	
	.butn img {
		margin: 0 5px;
	}
	.active {
		color: #69b6ff;
	}
	.unactive{
		color: #FFFFFF;
	}
</style>