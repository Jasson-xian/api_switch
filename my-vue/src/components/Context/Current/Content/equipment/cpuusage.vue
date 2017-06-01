<template>
    <div class="wrap col-xs-6 col-md-6 col-lg-6">
        <div class="bgcolor">
            <loadSpan v-show='!show'></loadSpan>
            <div class="head">
                <h3>CPU使用率</h3><span>单位：%</span></div>
            <transition name='fade'>
            <div id="cuppic" v-show='show'>
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
    beforeDestroy: function() {
        clearInterval(this.intervalid)
    },
    watch:{
        picData:function(){
            if(this.num==0){
                this.loadSpline(this.picData)
                this.num++
                this.intervalid = setInterval(() => {
                    let chart = $("#cuppic").highcharts()
                    let x = this.picData.pop().time*1000?this.picData.pop().time*1000:0
                    let y = this.picData.pop().cpu*100?this.picData.pop().cpu*100:0
                    chart.series[0].addPoint([x,y],true,true)              
                },1000)
            }
        }
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
            Highcharts.chart('cuppic',{
                chart: {
                    type: 'spline',
                    plotBackgroundColor: '#3898fe',
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
                    tickPixelInterval:120,//刻度线的像素间隔
                    tickWidth: 0,
                    // tickInterval:5,
                    // tickAmount:3,
                    // tickLength:20,
                    gridLineColor: '#60adfe',
                    gridLineWidth: 1,
                    gridLineDashStyle: 'Dash',
                    crosshair:{
							dashStyle:'dash',
                            color:'lightgray'
						}
                },
               
                yAxis: {
                    title: {
                        text: null
                    },
                    gridLineColor: '#60adfe',
                    gridLineWidth: 1,
                    lineColor: '#FFFFFF',
                    tickInterval: 20,
                    max:100, // 定义Y轴 最大值  
	                min:0, // 定义最小值  
	                minPadding: 0.2,   
	                maxPadding: 0.2, 
                    crosshair:{
							dashStyle:'dash',
                            color:'lightgray'
						},
                    labels: {
                        formatter: function() {
                            return this.value+'%';
                        }
                    } 
                },
                tooltip: {
                	formatter: function () {
		                return '<b></b>'
		                +Highcharts.dateFormat('%H:%M:%S', this.x) + '<br/>CPU:'
		                +Highcharts.numberFormat(this.y,1)+'%';
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
							color: '#69b6ff'
						}
				},
                format:{y:'%H:%M:%S'},
                series: [{
                    lineWidth: 2,
                    shadow: true,
                    color: "#feffff",
                    marker: {
                        fillColor: '#31c609',
                        radius: 0,
                        states:{
                            hover:{
                                enabled:true,
                                fillColor: '#31c609',
                                radius:5,
                            }
                        }
                    },
                    data: (function () {
                        // generate an array of random data
                        let data = [];
                            for(let j=0;j<picData.length;j++){
                                 let obj={
                                    x: picData[j].time*1000,
                                    y: picData[j].cpu*100?picData[j].cpu*100:0
                                }
                               data.push(obj);
                            }
                        return data;
                    } ())
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
    .wrap{
        padding: 30px 0 0 30px;
    }
    .bgcolor{
        background: #ffffff;
        width:100%;
        height: 368px;
        display: inline-block;
        position: relative;
    }
    .head{
        height: 30px;
        background: #67b7ff;
        color: #ffffff;
        line-height: 30px;
        padding:  0 45px 0 25px;
    }
    h3{
        font-size: 16px;
        display: inline-block;
    }
    .head span{
        float: right;
        color: #ffffff; 
        font-size: 12px;      
    }
    #cuppic{
        width: 520px;
        height: 280px;
        position: absolute;
        top:25px;
        bottom: 0;
        left: 0;
        right: 20px;
        margin: auto;
    }
</style>
