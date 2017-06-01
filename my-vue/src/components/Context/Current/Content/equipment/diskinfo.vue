<template>
    <div class="wrap col-xs-6 col-md-6 col-lg-6">
        <div class="bgcolor">
            <loadSpan v-show='!show'></loadSpan>
            <div class="head">
                <h3>磁盘信息</h3>
            </div>
            <transition name='fade'>
            <div class="content" v-show='show'>
                <div>
                    <span class="quare bulesquare"></span><span>可用: {{diskPie.available + diskPie.unit}}</span>
                    <span class="quare redsquare"></span><span>已使用： {{diskPie.used + diskPie.unit}}</span>
                </div>
                <div id="diskpic">
                </div>
                <p>总容量：{{diskPie.total + diskPie.unit}}</p>
            </div>
            </transition>
        </div>
    </div>
</template>
<script>
import loadSpan from 'components/libs/loadSpan'
export default {
    props: {
        disk: {
            type: Object,
            default: {
                total: 0,
                used: 0
            },
            required: true
        },
        show:{
            type:Boolean,
            required:true
        }
    },
    mounted: function () {
        this.loadPie()
    },
    computed: {
        diskPie: function() {
            return this.convertByte(this.disk)
        }
    },
    watch: {
        disk: function() {
            let chart = $("#diskpic").highcharts()
            chart.series[0].setData([['已用',Number(this.diskPie.used)],['可用',Number(this.diskPie.available)]])
        }
    },
    methods: {
        convertByte(disk) {
            let result = {total:0,available:0,used:0,unit:'M'}
            if(disk.total > 1024 * 1024) {
                result.available = ((disk.total - disk.used) / 1024 / 1024).toFixed(2)-0
                result.used = (disk.used / 1024 / 1024).toFixed(2)-0
                result.total = (result.available+result.used).toFixed(2)          
                result.unit = 'G'
            }else {
                result.available = ((disk.total - disk.used) / 1024).toFixed(1)-0
                result.used = (disk.used / 1024).toFixed(1)-0
                result.total = (result.available+result.used).toFixed(1)
            }
            return result
        },
        loadPie() {
            Highcharts.setOptions({
                colors: ['#fba825', '#41a7fd'],
                credits: {
                    enabled: false // 禁用版权信息
                },
                exporting: {
                    enabled: false
                }
            })
            Highcharts.chart('diskpic',{
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45
                    },
                    backgroundColor: '#eeeeee'
                },
                tooltip: {
                	headerFormat: '<small>{point.key}</small>',
                    pointFormat: ':<b>{point.percentage:.1f}%</b>'
                },
                title: {
                    text: null
                },
                plotOptions: {
                    pie: {
                        cursor: 'pointer',
                        innerSize: 140,
                        depth: 30,
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        }
                    }
                },
                xAxis: {
                    gridLineColor: '#d3e8f0',
                    gridLineWidth: 2
                },
                yAxis: {
                    gridLineColor: '#d3e8f0',
                    gridLineWidth: 2,
                    tickInterval: 20,
                },
                series: [{
                    name: 'Delivered amount',
                    data: [
                        ['已用', 5],
                        ['可用', 5]
                    ]
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
    .content{
        padding: 10px 30px;
    }
    .quare{
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 10px;
    }
    .bulesquare{      
        background: #67b7ff;     
    }
    .redsquare{
        margin-left:50px; 
        background: #f39800;  
    }
    .wrap{
        padding: 30px 0 0 30px;
    }
    p{
        text-align: center;
        height: 40px;
        line-height: 40px;
    }
    .bgcolor{
        background: #ffffff;
        width:100%;
        height: 368px;
        /*margin: 20px 0 0 20px;*/
        display: inline-block;
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
    #diskpic{
        width: 500px;
        height: 250px;
        margin-top: 10px;
   }
</style>