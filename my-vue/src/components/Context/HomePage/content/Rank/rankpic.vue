<template>
	<div id="rank-warp">
		<div id="rankline">
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			activeTable: {
				type: Array,
				required: true
			}
		},
		computed: {
			tx: function () {
				var tx_temp = [null, null, null, null, null]
				for (var i = 0; i <this.activeTable.length; i++) {
					tx_temp[i] = this.activeTable[i]['tx']
				}
				return tx_temp
			},
			rx: function () {
				var rx_temp = [null, null, null, null, null]
				for (var i = 0; i <this.activeTable.length; i++) {
					rx_temp[i] = this.activeTable[i]['rx']
				}
				return rx_temp
			}
		},
		watch: {
			tx: function () {
				let chart = $("#rankline").highcharts()
				chart.series[0].setData(this.tx)
				var dataLabelNode = $(".highcharts-data-labels").find("g");//获取数据节点
					for(var i = 0; i<dataLabelNode.length; i++){
							dataLabelNode[i].style.visibility = "visible";
							dataLabelNode[i].style.opacity = 1;
					}
			},
			rx: function () {
				let chart = $("#rankline").highcharts()
				chart.series[1].setData(this.rx)
				var dataLabelNode = $(".highcharts-data-labels").find("g");//获取数据节点
					for(var i = 0; i<dataLabelNode.length; i++){
							dataLabelNode[i].style.visibility = "visible";
							dataLabelNode[i].style.opacity = 1;
					}
			},

		},
		methods: {
			loadPie() {
				Highcharts.setOptions({
					colors: ['#6b9ef3', '#80c269'],
					credits: {
						enabled: false // 禁用版权信息
					},
					exporting: {
						enabled: false
					},
					legend: {
						enabled: false
					}
				})
				Highcharts.chart('rankline', {
					chart: {
						type: 'bar'
					},
					title: {
						text: null
					},
					tooltip: {
						enabled: true,
						formatter: function () {
							return '<b>名次：' + this.x + '</b><br/>' + index(this.point.colorIndex) + covertFlow(this.y, 2);

							function index(index) {
								if (index == 1) {
									return "<b>下行:</b>"
								} else {
									return "<b>上行:</b>"
								}
							}

							function covertFlow(bps, index) {
								let flow = ''
								if (bps < 1024) {
									flow = Math.ceil(bps) + 'Bps'
								}
								if (bps >= 1024 && bps < 1024 * 1024) {
									flow = bps / 1024
									flow = flow.toFixed(index) + 'KBps'
								}
								if (bps >= 1024 * 1024 && bps < 1024 * 1024 * 1024) {
									flow = bps / 1024 / 1024
									flow = flow.toFixed(index) + 'MBps'
								}
								if (bps >= 1024 * 1024 * 1024) {
									flow = bps / 1024 / 1024 / 1024
									flow = flow.toFixed(index) + 'GBps'
								}
								return flow
							}
						}
					},
					xAxis: {
						categories: [1, 2, 3, 4, 5],
						tickPixelInterval: 1,
						lineWidth: 1,
						gridLineWidth: 1
					},
					yAxis: {
						title: {
							text: null
						},
						min:0,
						minRange: 1,
						lineWidth: 1,
						pointPadding:0.01,
						tickPixelInterval: 200,
						labels: {
							formatter: function () {
								function covertFlow(bps) {
									let flow = ''
									if (bps < 1024) {
										flow = Math.ceil(bps) + 'Bps'
									}
									if (bps >= 1024 && bps < 1024 * 1024) {
										flow = bps / 1024
										flow = flow.toFixed(0) + 'KBps'
									}
									if (bps >= 1024 * 1024 && bps < 1024 * 1024 * 1024) {
										flow = bps / 1024 / 1024
										flow = flow.toFixed(0) + 'MBps'
									}
									if (bps >= 1024 * 1024 * 1024) {
										flow = bps / 1024 / 1024 / 1024
										flow = flow.toFixed(0) + 'GBps'
									}
									return flow
								}
								return covertFlow(this.value);
							}
						}
					},
					plotOptions: {
						column: {
							pointPadding:1,
							pointMargin: 0,
							borderWidth: 0
						},
						series: {
							groupPadding:0.2,
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
					lang: {
						noData: "暂无数据"
					},
					noData: {
							style: {
								fontSize: '15px',
								color: '#69b6ff'
							}
					},
					series: [{
						name: '上行',
						data: this.tx
					}, {
						name: '下行',
						data: this.rx
					}]
				})
			}
		},
		mounted() {
			this.loadPie()
		}
	}
</script>
<style scoped>
	#rank-warp{
		display: inline-block;
		width: 280px;
		height: 290px;	
		margin: 0px 0 0 -15px;
	}
	#rankline {
		height: 100%;	
	}
	g{
		visibility: visible;
		opacity: 1
	}
	tspan{
		visibility: visible;
		opacity: 1
	}
</style>