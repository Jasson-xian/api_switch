<template>
	<div class="wrap">
		<div class="title">
			<h3>用户监控 / {{road<=0?'全部':'线路'+road}}</h3>
		</div>
		<div class="content">
			<roadbutn v-on:setData='setData' v-on:getData='getData'></roadbutn>
			<tablecontent :tableData='tableData' :show= 'show' :nowpage='nowpage'></tablecontent>
			<severPages v-on:getPageData="getPageData" :totalpage='totalpage' :nowpage='nowpage'></severPages>
		</div>
	</div>
</template>
<script>
	import roadbutn from './userMonitor/roadbutn.vue'
	import tablecontent from './userMonitor/tablecontent.vue'
	import severPages from 'components/libs/severPages'

	import realTimeService from 'services/realTimeService'
	import PageData from 'libs/PageData'
	export default {
		components: {
			roadbutn,
			tablecontent,
			severPages
		},
		data() {
			return {
				allTableData: [],
				tableData: [],
				totalpage: 0,
				nowpage: 1,
				road: [],
				intervalid: null,
				show:false
			}
		},
		created() {
			this.getData(0)
		},
		methods: {
			setData(){
				this.show= false
				this.nowpage=1
			},
			getData(roadNum) {
				this.road = roadNum
				let sentdata = roadNum
				// realTimeService.getRoadMessage(sentdata)
				// 	.then((recvdata) => {
				// 		recvdata = JSON.parse(recvdata)
				// 		if(recvdata.success) {
					let recvdata = {data:[]}
							this.show = true
							this.allTableData = recvdata.data
							this.getPageData(this.nowpage) //分页
							this.totalpage = new PageData(recvdata.data, 22).totalpage
						// }
						if(this.clearTimeout){
						    return 
						}
						clearTimeout(this.intervalid)
						this.intervalid = setTimeout(() => this.getData(this.road), 1000)
				// 	},()=>{
				// 		if(this.clearTimeout){
				// 		    return 
				// 		}
				// 		clearTimeout(this.intervalid)
				//         this.intervalid = setTimeout(() => this.getData(this.road), 1000)
			    // })
			},
			getPageData(currentpage) {
				this.nowpage = currentpage
				var allData = this.allTableData
				this.tableData = new PageData(allData, 22).data(this.nowpage)
			}
		},
		beforeDestroy() {
			clearTimeout(this.intervalid)
		},
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
	}
	
	.content {
		padding: 0 20px;
	}
</style>