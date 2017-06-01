<template>
<div class="wrap">
	 <div class="ey">
        <span class="ey1"></span><span class="span1"><b>上行</b></span>
        <span class="ey2"></span><span class="span2"><b>下行</b></span>
     </div>       
        <div id="portpic"></div>
</div>
	
</template>
<script>
export default {
	props: {
		eths: {
			type: Array,
			required: true
		},
		length:{
			type:Number,
			required: true
		}
	},
	computed: {
		tx: function() {
			let temp_tx=[]
			if(this.eths.length > 0) {
				for(let i = 0; i < this.eths.length; i ++) {
					temp_tx.push(Math.ceil(this.eths[i].out_bps))
				}
			}
			
			return temp_tx
		},
		rx: function() {
			let temp_rx=[]
			if(this.eths.length > 0) {
				for(let i = 0; i < this.eths.length; i++) {
					temp_rx.push(Math.ceil(this.eths[i].in_bps))
				}
			}
			return temp_rx
		},
		xaxis: function() {
			let categories=[]
			if(this.eths.length > 0) {
				for(let i = 0; i < this.eths.length; i ++) {
					categories.push(this.eths[i].name)
				}
			}
			return categories
		}
	},
	watch: {
		tx: function() {
			let chart = $("#portpic").highcharts()
			chart.series[0].setData(this.tx)
			var dataLabelNode = $(".highcharts-data-labels").find("g");//获取数据节点
					for(var i = 0; i<dataLabelNode.length; i++){
							dataLabelNode[i].style.visibility = "visible";
							dataLabelNode[i].style.opacity = 1;
					}
		},
		rx: function() {
			let chart = $("#portpic").highcharts()
			chart.series[1].setData(this.rx)
			var dataLabelNode = $(".highcharts-data-labels").find("g");//获取数据节点
					for(var i = 0; i<dataLabelNode.length; i++){
							dataLabelNode[i].style.visibility = "visible";
							dataLabelNode[i].style.opacity = 1;
					}
		},
		xaxis: function() {
			let chart = $("#portpic").highcharts()
			chart.xAxis[0].setCategories(this.xaxis)
		},
		length:function(){
			let chart = $("#portpic").highcharts()
			let	height=this.length*62
			$("#portpic").height(height+'px')
			chart.reflow();
		}
		
	},
	mounted: function() {
		this.loadBar()
	},
	data:function(){
		return{
			status:true
		}
	},
	methods: {
		loadBar() {
			Highcharts.setOptions({
				colors: ['#6b9ef3', '#80c269'],
				credits: {
					enabled: false // 禁用版权信息
				},
				exporting: {
					enabled: false
				},
				legend: {
					// verticalAlign: 'top',
					// symbolRadius: 0,
					enabled: false
				}

			})
			Highcharts.chart('portpic', {
				chart: {
					type: 'bar'
				},
				title: {
					text: null
				},
				xAxis: {
					title: {
							text: '',
							style:{
								color:'#69b6ff',
								fontSize:15
							}
						},
					categories: [
						
					],
					tickPixelInterval:120,//刻度线的像素间隔
					gridLineWidth: 1

				},
				yAxis: {
					title: {
							text: null
						},
					tickPixelInterval:120,
					gridLineWidth: 1,
					labels: {
						// step:1,
                    formatter: function() {
							function covertFlow(bps){
								let flow = ''
								if(bps < 1024) {
									flow = Math.ceil(bps) + 'Bps'
								}
								if(bps >= 1024 && bps < 1024*1024) {
									flow = bps/1024
									flow = flow.toFixed(0) + 'KBps'
								}
								if(bps >= 1024*1024 && bps < 1024*1024*1024) {
									flow = bps/1024/1024
									flow = flow.toFixed(0) + 'MBps'
								}
								if(bps >= 1024*1024*1024) {
									flow = bps/1024/1024/1024
									flow = flow.toFixed(0) + 'GBps'
								}
								return flow
							}
							return covertFlow(this.value);
                        }
                    },
					min:'0',
					minRange:1 
				},
				plotOptions: {
					column: {
						pointPadding: 0,
						pointMargin:0,
						borderWidth: 0
					},
					series: {
						dataLabels: {
							enabled: true,
							style: {
								color: '#666666',
								fontWeight: '500'
							},
							formatter:function(){
								function covertFlow(bps) {
									let flow = ''
									if (bps < 1024) {
										flow = Math.ceil(bps) + 'Bps'
									}
									if (bps >= 1024 && bps < 1024 * 1024) {
										flow = bps / 1024
										flow = flow.toFixed(2) + 'KBps'
									}
									if (bps >= 1024 * 1024 && bps < 1024 * 1024 * 1024) {
										flow = bps / 1024 / 1024
										flow = flow.toFixed(2) + 'MBps'
									}
									if (bps >= 1024 * 1024 * 1024) {
										flow = bps / 1024 / 1024 / 1024
										flow = flow.toFixed(2) + 'GBps'
									}
									return flow
								}
								return covertFlow(this.y)
							}	
						}
					}
				},
				tooltip: {
					enabled:true,
					formatter: function () {
		                return '<b>接口：'+this.x+'</b><br/>'+index(this.point.colorIndex)+covertFlow(this.y,2);
						function index(index){
							if(index==1){
								return "<b>下行:</b>"
							}else{
								return "<b>上行:</b>"
							}
						}
						function covertFlow(bps,index){
								let flow = ''
								if(bps < 1024) {
									flow = Math.ceil(bps) + 'Bps'
								}
								if(bps >= 1024 && bps < 1024*1024) {
									flow = bps/1024
									flow = flow.toFixed(index) + 'KBps'
								}
								if(bps >= 1024*1024 && bps < 1024*1024*1024) {
									flow = bps/1024/1024
									flow = flow.toFixed(index) + 'MBps'
								}
								if(bps >= 1024*1024*1024) {
									flow = bps/1024/1024/1024
									flow = flow.toFixed(index) + 'GBps'
								}
								return flow
							}
                    }
				},
				series: [{
					name: '上行',
					data: []
				}, {
					name: '下行',
					data: []
				}],
				lang: {
						noData: "暂无数据"
					},
				noData: {
						style: {
							fontSize: '15px',
							color: '#69b6ff'
						}
				}
			})		
		}
	}
}
</script>
<style scoped>
	.wrap{
		display: inline-block;
	}
	#portpic{
	    vertical-align: top;
	    display: inline-block;
		width: 460px; 
	    padding: 0 30px 0 0;
		margin-left: 20px;
		height: 100%;
	}
	.ey{
	    width: 200px;
	    margin-bottom: 15px;
	    margin-left: 200px;
		vertical-align:middle;
		display: flex;
		align-items: center;   
	}
	.ey1,
	.ey2{
	    width: 12px;
	    height: 12px;
	    display: inline-block;  
	}
	.ey1{
	    background: rgb(107, 158, 243);
	    margin-right: 5px;
	}
	.ey2{
	  background: rgb(128, 194, 105);
	    margin-left: 15px;
		margin-right: 5px;
	}
	.span1,
	.span2{
	    display: inline-block;
	    font-size: 12px;
	}
</style>