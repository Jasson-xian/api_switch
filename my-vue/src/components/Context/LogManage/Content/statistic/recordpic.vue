<template>
	<div class="wrap">
		<loadSpan v-show= '!show'></loadSpan>
		<transition name="fade"  mode="out-in">
		    <div class="pic-wrap" v-show = 'show'>
				<div id="recodeline">
				</div>
				<div class="legend">
					<p class="button button--aylen" @click="hide(0)"><span class="blocks redblock "></span>&nbsp;&nbsp;port</p>
					<p class="button button--aylen" @click="hide(1)"><span class="blocks blackblock"></span>&nbsp;&nbsp;sum</p>
					<p class="button button--aylen" @click="hide(2)"><span class="blocks greenblock"></span>&nbsp;&nbsp;icmp</p>
				</div>					
			</div>
		</transition>
	</div>
</template>
<script>
	import loadSpan from 'components/libs/loadSpan'		
	export default {
		components:{
	        loadSpan
        },
		props: {
			recordData: {
				type: Array,
				required: true
			},
			show:{
				type:Boolean,
				required:true
			}
		},
		watch: {
			xaxis: function() {
				this.loadLine()	
			}
		},
		computed: {
			xaxis: function() {
				var x_temp = []
				for(var i = 0; i < this.recordData.length; i++) {
					x_temp[i] = this.recordData[i].x
				}
				return x_temp
			},
			yaxis: function() {
				var y_temp = {
					'port': [],
					'sum': [],
					'icmp': []
				}
				for(var i = 0; i < this.recordData.length; i++) {
					y_temp.port[i] = Number(this.recordData[i].port)
					y_temp.sum[i] = Number(this.recordData[i].sum)
					y_temp.icmp[i] = Number(this.recordData[i].icmp)
				}
				return y_temp
			}
		},
		data(){
            return{
				picchart:null
			}
		},
		methods: {	
			hide(Index){
				this.picchart.series[Index].setVisible()
			},		
			loadLine() {
				Highcharts.setOptions({
					colors: ['#c33a36', '#2f4554', '#2b7934'],
					credits: {
						enabled: false // 禁用版权信息
					},
					exporting: {
						enabled: false
					},
					legend: {
						enabled: false
					}
				});
			this.picchart = Highcharts.chart('recodeline', {
                    chart:{
                    	zoomType:'x'
                    },
					title: {
						text: null,
					},
					xAxis: {
						tickPixelInterval: 150,
						gridLineWidth: 1,
						gridLineDashStyle: 'Dash',
						tickInterval: 3,
						categories:this.xaxis
					},
					yAxis: {
						title: {
							text: null
						},
						gridLineWidth: 1,
						allowDecimals:false
					},
					plotOptions: {
						line: {
							dataLabels: {
								enabled: true,
							}
						},
						series: {
							marker: {
								radius: 3,
								symbol: 'circle'
							}
						}
					},
					tooltip: {
						valueSuffix: '个'
					},
					legend: {
						layout: 'vertical',
						align: 'right',
						verticalAlign: 'top',
					},
					series: [{
						name: 'port',
						data:this.yaxis.port
					}, {
						name: 'sum',
						data:this.yaxis.sum
					}, {
						name: 'icmp',
						data:this.yaxis.icmp
					}],
					lang: {
						noData: "暂无数据",
						loading:'载入中..',
						resetZoom:'Reset Zoom'
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
		position: relative;
		height: 320px;
	}
	.pic-wrap {
		width: 100%;
		height: 300 px;
		border: 1px solid #69b6ff;
		padding: 5px 15px 0px;
		box-sizing: border-box;
	}
	
	#recodeline {
		width: 1050px;
		height: 300px;
		box-sizing: border-box;
		display: inline-block;
	}
	
	.legend {
		display: inline-block;
		width: 55px;
		vertical-align: top;
		margin-top: 20px;
	}
	.legend p{
		height: 20px;
		line-height: 18px;
		padding-left: 5px;
		margin-bottom: 10px;
		border-radius: 3px;
		cursor: pointer;
	}
	.blocks {
		display: inline-block;
		width: 10px;
		height: 10px;
		vertical-align: middle;
	}
	
	.redblock {
		background: #c33a36;
	}
	
	.blackblock {
		background: #2f4554;
	}
	
	.greenblock {
		background: #2b7934;
	}
</style>