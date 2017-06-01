<template>
	<div class="wrap">
		<div class="title">
			<h3>主机日志</h3>
		</div>
		<div class="content">
			<filterdiv  v-on:getData="getData" v-on:setData = 'setData' :type='sentdata.type'></filterdiv>
			<div>
				<div id="headbutn">
					<button :class="{active:sentdata.type=='hostvary_status'}" class="button button--aylen" @click="toactive('hostvary_status')">IP动态变换</button>
					<span class="broder"></span>
					<button :class="{active:sentdata.type=='host_status'}" class="button button--aylen" @click="toactive('host_status')">主机上下线</button>
				</div>
				<tablecontent :show = 'show' :tableData="tableData" :nowpage = 'nowpage' :type='sentdata.type'></tablecontent>
				<severPages v-on:getPageData="getPageData" :totalpage='totalpage' :nowpage = 'nowpage'></severPages>
			</div>
		</div>
		<div id="dtBox"></div>
	</div>
</template>
<script>
	import tablecontent from './terminallog/tablecontent.vue'
	import filterdiv from './terminallog/filterdiv.vue'
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
				nowpage:1,
			    sentdata:{
                    type: 'hostvary_status',
                    page:1
				},
				show:false
			}
		},
		mounted() {										
			this.getData(this.sentdata)			
		},
		methods: {
			toactive(type) {
				this.nowpage = 1
				this.sentdata ={}			
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
				// logManageService.getTerminalLog(sentdata)
				// .then((recvdata) => {
				// 	recvdata = JSON.parse(recvdata)
				// 	if(recvdata.success) {
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
			},			
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