<template>
	<div class="wrap">
		<loadSpan v-show= '!show'></loadSpan>	
		<transition name="fade"  mode="out-in">
	    <div class="pic-wrap" v-show = 'show'>
		    <div id="rankline">
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
			rankData: {
				type: Array,
				required: true
			},
			show:{
				type:Boolean,
				required:true
			}
		},
		computed: {
			xaxis: function() {
				var x_temp = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
				for(var i = 0; i < this.rankData.length; i++) {
					x_temp[i] = this.rankData[i].desc ?"( "+this.rankData[i].desc+" )  "+this.rankData[i].x: this.rankData[i].x
				}

				return x_temp
			},
			yaxis: function() {
				var y_temp = []
				for(var i = 0; i < this.rankData.length; i++) {
					y_temp[i] = Number(this.rankData[i].y)
				}
				return y_temp
			}
		},
		watch: {
			rankData: function() {
                this.loadPie()
			}		
		},
		methods: {			
			loadPie() {
			    
				Highcharts.setOptions({
					colors: ['#eb6877'],
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
					yAxis: {
						title: {
							text: null
						},
						lineWidth: 1,
						allowDecimals:false,
					},
					xAxis: {
						max: 9, // 定义Y轴 最大值  
						min: 0, // 定义最小值  
						categories: this.xaxis,
						tickInterval: 1						
					},
					tooltip: {
						valueSuffix: '个'
					},
					plotOptions: {
						column: {
							pointPadding: 0,
							pointMargin: 0,
							borderWidth: 0
						}
					},
					series: [{
						name: '包',
						data: this.yaxis
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
		},
		mounted() {
			this.loadPie()
		}
	}
</script>
<style scoped>
	.wrap{
		position: relative;
	}
	.pic-wrap {
		width: 100%;
		height: 280px;
		border: 1px solid #69b6ff;
		padding: 5px 15px 0px;
		box-sizing: border-box;
	}
	
	#rankline {
		width: 1100px;
		height: 270px;
		box-sizing: border-box;
	}
</style>