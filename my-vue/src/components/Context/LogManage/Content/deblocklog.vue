<template>
	<div class="wrap">
		<div class="title">
			<h3>封堵&解封</h3>
		</div>
		<div class="content">
			<filterdiv v-on:getData="getData" v-on:setData='setData' :type='sentdata.type'></filterdiv>
			<div>
				<div id="headbutn">
					<button :class="{active:sentdata.type=='block'}" class="button button--aylen" @click="toactive('block')">封堵日志</button>
					<span class="broder"></span>
					<button :class="{active:sentdata.type=='unblock'}" class="button button--aylen" @click="toactive('unblock')">解封日志</button>
				</div>
				<tablecontent  :show='show' :type='sentdata.type' :tableData="tableData" :nowpage='nowpage'></tablecontent>
				<severPages v-on:getPageData="getPageData" :totalpage='totalpage' :nowpage = 'nowpage'></severPages>
			</div>
		</div>
		<div id="dtBox"></div>
	</div>
</template>
<script>
	import filterdiv from './deblocklog/filterdiv.vue'
	import tablecontent from './deblocklog/tablecontent.vue'
	import severPages from 'components/libs/severPages.vue'

	import logManageService from 'services/logManageService'
	export default {
		components: {
			tablecontent,
			filterdiv,
			severPages
		},
		data() {
			return {
				tableData: [],
				totalpage: 1,
				nowpage: 1,
				sentdata:{
					type: 'block',
					page:1
				},
				show:false
			}
		},
		mounted() {
			this.getData(this.sentdata)
		},
		methods: {
			toactive: function(type) {
				this.nowpage = 1
				this.sentdata={}				
				this.sentdata.type = type,
				this.sentdata.page = this.nowpage
				this.getData(this.sentdata)
			},
			setData(){
				this.show=false
			},
			getData(sentdata) {			
				this.sentdata = sentdata
				this.nowpage = sentdata.page
				// logManageService.getUnblockLog(sentdata)
				// 	.then((recvdata) => {
				// 		recvdata = JSON.parse(recvdata)
				// 		if(recvdata.success == true) {
							this.show=true
							this.tableData = []
							this.totalpage = 2
					// 	}
					// })
			},
			getPageData(currentpage) {
				this.nowpage = currentpage
				this.sentdata.page = this.nowpage
				this.getData(this.sentdata)
			}
		}
	}
</script>
<style scoped>
	.wrap {
		margin: 30px 0 0 30px;
		background: #ffffff;
		padding-bottom: 10px;
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
	
	.content {
		padding: 0 20px;
		height: 790px;
	}
	
	#headbutn {
		font-size: 14px;
		margin: 15px 0;
	}
	
	.button {
		padding: 0 10px;
		height: 22px;
		border-radius: 5px;
		background: #e5e5e5;
		font-size: 12px;
	}
	
	.broder {
		border-left: 1px solid #c4c4c4;
		margin: 0 12px 0 8px;
	}
	
	.active {
		background: #ffae00;
		color: #FFFFFF;
	}
</style>