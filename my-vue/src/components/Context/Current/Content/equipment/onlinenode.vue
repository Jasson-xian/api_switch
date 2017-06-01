<template>
	<div class="wrap col-xs-6 col-md-6 col-lg-6">
		<div class="bgcolor">
			<loadSpan v-show='!show'></loadSpan>
			<div class="head">
				<h3>在线节点数</h3><span>单位：个</span></div>
			<transition name='fade'>
			<div id="nodepic" v-show='show'>
			</div>
			</transition>
		</div>
	</div>
</template>
<script>
import loadSpan from 'components/libs/loadSpan'
	export default {
		props: {
			picData: {
				type: Array,
				required: true
			},
			show:{
				type:Boolean,
				required:true
			}
		},
		data: function() {
			return {
				intervalid: null,
				num:0
			}
		},
		watch:{
			 picData:function(){
				if(this.num==0){
					this.loadSpline(this.picData)
					this.num++
					this.intervalid = setInterval(() => {
						let chart = $("#nodepic").highcharts()
						let x = this.picData.pop().time*1000?this.picData.pop().time*1000:0
						let y = this.picData.pop().node-0?this.picData.pop().node-0:0
						chart.series[0].addPoint([x,y],true,true)              
					},1000)
				}
			}
		},
		beforeDestroy: function() {
			clearInterval(this.intervalid)
		},
		methods: {
			loadSpline(picData) {
				Highcharts.setOptions({
					global: {
						useUTC: false
					},
					colors: ['#31c609', '#41a7fd'],
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
				$('#nodepic').highcharts({
					chart: {
						type: 'line',
						plotBackgroundColor: '#383838',
						animation: Highcharts.svg, // don't animate in old IE
						marginRight: 10
					},
					title: {
						text: null,
					},
					xAxis: {
						type: 'datetime',
						dateTimeLabelFormats: {
							millisecond: '%H:%M:%S'
						},
						tickPixelInterval: 120,
						tickWidth: 0,
						gridLineColor: '#2d6a83',
						gridLineWidth: 1,
						crosshair:{
							dashStyle:'dash',
                            color:'lightgray'
						}
					},
					yAxis: {
						title: {
							text: null
						},
						tickInterval: 10,
						gridLineColor: '#2d6a83',
						gridLineWidth: 1,
						lineColor: '#FFFFFF',
						minorTickInterval: 0.1,
						gridLineDashStyle: 'Dash',
						tickInterval: 100,
						min: 0, // 定义最小值  
						minPadding: 0.2,
						maxPadding: 0.2,
						crosshair:{
							dashStyle:'dash',
                            color:'lightgray'
						},
                    	labels: {
                        	formatter: function() {
                           	 	return this.value+'<span style="color:#aaa">(个)</span>';
                        	}
                    	} 
					},
					tooltip: {
						formatter: function () {
	                        return '<b></b>'
			                +Highcharts.dateFormat('%H:%M:%S', this.x) + '<br/>节点：'
			                +Highcharts.numberFormat(this.y, 0)+'个';
                       }
					},
					legend: {
						enabled: false
					},
					exporting: {
						enabled: false
					},
					lang: {
						noData: "暂无数据"
					},
					noData: {
							style: {
								fontSize: '15px',
								color: '#d2d2d2'
							}
					},
					series: [{
						lineWidth: 2,
						shadow: true,
						color: "#2ca0e3",
						marker: {
							fillColor: '#2ca0e3',
							radius: 0,
							states:{
								hover:{
									enabled:true,
									fillColor: '#2ca0e3',
									radius:5,
								}
							}
						},
						data: (function() {
							// generate an array of random data
							var data = [];
                            for(let j=0;j<picData.length;j++){
								let obj={
									x: picData[j].time*1000,
									y: picData[j].node-0 ? picData[j].node-0:0
								}
								data.push(obj);
                            }
							return data;
						}())
					}]
				})
			}
		},
		components:{
			loadSpan
		}
	}
</script>
<style scoped>
	.wrap {
		padding: 30px 0 0 30px;
	}
	
	.bgcolor {
		background: #ffffff;
		width: 100%;
		height: 368px;
		display: inline-block;
		position: relative;
	}
	
	.head {
		height: 30px;
		background: #67b7ff;
		color: #ffffff;
		line-height: 30px;
		padding: 0 45px 0 25px;
	}
	
	h3 {
		font-size: 16px;
		display: inline-block;
	}
	
	.head span {
		float: right;
		color: #ffffff;
		font-size: 12px;
	}
	
	#nodepic {
		width: 520px;
		height: 280px;
		position: absolute;
		top: 25px;
		bottom: 0;
		left: 0;
		right: 20px;
		margin: auto;
	}
</style>