<template>
    <div>
        <canvas id="space"></canvas>
        <div class="page-wrapper">
            <div class="header">
                <div class="header-wrapper">
                    <div class="logo-wrapper">
                        <img class="logo" src="../img/logo.png" />
                        <div>
                            <div>
                                <span style="font-size:32px;font-weight:bold;color:#66b8f7;margin-right:15px;">幻境</span>
                                <span style="font-size: 13px;font-weight:bold;color:#333;">内网动态防御系统</span>
                            </div>
                            <span style="font-size: 11px;color: #333;">Intrant Dynamic Defense System</span>
                        </div>
                    </div>
                    <div style="display: flex;align-items: center;font-size: 14px">
                        <img style="margin-right: 20px" src="../img/switch.png" />
                        <span style="margin-right: 26px;color: #69b6ff;font-weight: bold">中文</span>
                        <span>English</span>
                    </div>
                </div>
            </div>
            <div style="display:flex;justify-content:space-around;">
                <div class="mouse" style="width:850px;height:550px;position: relative;transition: all 0.5s ease-out;margin-left:90px;" v-on:mouseenter = 'mouseIn()' v-on:mouseleave = 'mouseOut()'>
                    <div class="main">
                        <img src="../img/zhuti.png" />
                    </div>
                    <div class="lightcircle">
                        <img src="../img/guanghuan.png" />
                    </div>
                    <div class="ellipse">
                        <img src="../img/ellipse.png" />
                    </div>
                    <div class="light">
                        <img src="../img/light.png">
                    </div>
                    <div class="circle010110">
                        <img src="../img/010110.png" alt="">
                    </div>
                    <div class="circle10100">
                        <img src="../img/10100circle.png" alt="">
                    </div>
                    <div class="circle010">
                        <img src="../img/010circle.png" alt="">
                    </div>
                    <div class="circle0100">
                        <img src="../img/010copy.png" alt="">
                    </div>
                    <div class="circle101000">
                        <img src="../img/10100.png" alt="">
                    </div>
                    <div class="circle0101100">
                        <img src="../img/010110copy.png" alt="">
                    </div>
                    <div class="circle0101">
                        <img src="../img/circle0101.png" alt="">
                    </div>
                </div>
                <div style="position: relative;z-index: 100;margin-right: 50px;">
                    <div style="margin-bottom:25px;color:#fff;text-align:center;width:331px;font-size:32px;font-weight:bold;">用户登录</div>
                    <div class="login-form">
                        <div>
                        	<label style="font-size: 14px;margin-bottom:14px;">账户名</label>
                        	<span v-if ="punish_time" style="color: red;margin-left:20px">{{time_warning}}</span>
                        	<span v-else style="color: red;margin-left:20px">{{warning}}</span>                      	
                        </div>
                            <input class="username login-input" v-model="username" type="text"  @blur="testVal('.username','allpass')" @focus="isEmpty('.username')"/>
                        <div>
                        	<label style="font-size: 14px;margin-bottom:14px;">密&nbsp;&nbsp;&nbsp;码</label>
                        </div>
                            <input class="password login-input" v-model="password" type="password" @keyup.enter='goLogin'  @blur="testVal('.password','allpass')" @focus="isEmpty('.password')"/>
                        <div style="margin-bottom:39px;font-size:12px;">
                            <input type="checkbox" disabled="disabled"/>
                            <span style="margin-left:10px;margin-right:30px;color:#c2c2c2">使用Dkey登录</span>
                            <span style="color:#007cef;cursor:pointer;">安装activex控件</span>
                        </div>
                        <div v-if="punish_time" class="punish-button">
                             <span class="span">惩罚剩余时间：{{punish_time}}s</span>
                        </div>
                        <div  v-else class="sim-button"  @click="goLogin">
                            <span class="span">登 &nbsp;&nbsp;录</span>
                            <span class="line line-top"></span>
                            <span class="line line-right"></span>
                            <span class="line line-bottom"></span>
                            <span class="line line-left"></span>
                        </div>
                        
                    </div>
                    
                    <p v-if = "accredit!='valid'" class="accredit_notice">{{showtype}}，请联系供应商获取授权文件！</p>
                    <div v-else>
                        <p v-if = "accreditShow" class="accredit_notice">系统将于{{misstime}}授权过期，请及时更新授权文件！</p>
                    </div>
                </div>
            </div>
            <div class="footer">
                <div>
                    <span>北京卫达科技有限公司版权所有</span>
                    <span>Copyright © 2015-{{year}}</span>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import userService from 'services/userService'
import formatTest from 'libs/formatTest'
export default {
    data() {
        return {
            username: '',
            password: '',
            warning:'',
            punish_time:null,
            time_warning:null,
            year:''
        }
    },
    computed:{
        accredit:function(){
            return this.$store.state.cert.status
        },
        misstime:function(){
            console.log(this.$store.state.cert.endtime)
            return this.getLocalTime(this.$store.state.cert.end_time)
        },
        accreditShow:function(){
            return this.$store.state.cert.alive_time<604800
        },
        showtype:function(){
            var type=''
            switch (this.$store.state.cert.status) {
                case 'expired':
                    type='系统授权文件过期'
                    break;
                case 'missing':
                    type='系统授权文件缺失'
                    break;
                case 'device_not_match':
                    type='系统授权文件和设备不匹配'
                    break;
                case 'malform':
                    type='系统授权文件内容格式错误'
                    break;
                case 'type_error':
                    type='系统授权文件类型错误'
                    break;
                case 'unknown':
                    type='系统授权文件状态未知'
                    break;
                case 'uninit':
                    type='系统未授权'
                    break;
                default:
                    break;
            }
            return type
        }
    },
    mounted:function(){
        this.year = new Date().getFullYear()
        $('.login-input').eq(0).focus()
        this.bgload()       
    },
    watch:{
    	punish_time:function(){
    		if(this.punish_time>0){
    		   clearInterval(this.intervalid)
    		   this.intervalid = setInterval(() => this.punish_time--, 1000)
    		}else{
    		   clearInterval(this.intervalid)
    		}
    	}
    },
    methods: {
        getLocalTime(nS) {     
            return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
        },
    	testVal: function(ele, reg) {
			var val = $(ele).val()
			var test = new formatTest(ele, reg, false)
			return test.testFormat()
		},
		isEmpty: function(ele) {
			var test = new formatTest(ele)
			test.notEmpty()
			$('.notice').hide()
		},
        bgload(){
            window.requestAnimFrame = (function() {
                return window.requestAnimationFrame
            })();
            var canvas = document.getElementById("space");
            var c = canvas.getContext("2d");
            var numStars = 1900;
            var radius = '0.' + Math.floor(Math.random() * 9) + 1;
            var focalLength = canvas.width * 2;
            var warp = 0;
            var centerX, centerY;
            var stars = [],
                star;
            var i;
            var animate = true;
            initializeStars();

            function executeFrame() {
                if (animate)
                    requestAnimFrame(executeFrame);
                moveStars();
                drawStars();
            }

            function initializeStars() {
                centerX = canvas.width / 2;
                centerY = canvas.height / 2;
                stars = [];
                for (i = 0; i < numStars; i++) {
                    star = {
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        z: Math.random() * canvas.width,
                        o: '0.' + Math.floor(Math.random() * 99) + 1
                    };
                    stars.push(star);
                }
            }

            function moveStars() {
                for (i = 0; i < numStars; i++) {
                    star = stars[i];
                    star.z--;
                    if (star.z <= 0) {
                        star.z = canvas.width;
                    }
                }
            }

            function drawStars() {
                var pixelX, pixelY, pixelRadius;
                // Resize to the screen
                if (canvas.width != window.innerWidth || canvas.width != window.innerWidth) {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                    initializeStars();
                }
                if (warp == 0) {
                    c.fillStyle = "rgba(0,10,20,1)";
                    c.fillRect(0, 0, canvas.width, canvas.height);
                }
                c.fillStyle = "rgba(209, 255, 255, " + radius + ")";
                for (i = 0; i < numStars; i++) {
                    star = stars[i];
                    pixelX = (star.x - centerX) * (focalLength / star.z);
                    pixelX += centerX;
                    pixelY = (star.y - centerY) * (focalLength / star.z);
                    pixelY += centerY;
                    pixelRadius = 1 * (focalLength / star.z);
                    c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
                    c.fillStyle = "rgba(209, 255, 255, " + star.o + ")";
                    //c.fill();
                }
            }
            executeFrame();
        },
        goLogin() {
        	var testName = this.testVal('.username', 'allpass')
        	var testPassword = this.testVal('.password', 'allpass')
        	if(testName&&testPassword){
        		userService.login(this.username,this.password)
	            .then((recvdata) => {
	                recvdata = JSON.parse(recvdata)                
	                if(recvdata.success) {
                        this.$store.commit('EDIT_NOTE', recvdata.data)
	                }else{
	                	this.warning = recvdata.errorMessage.error_msg
	                	this.punish_time =recvdata.errorMessage.overplus_time               
	                    this.time_warning = recvdata.errorMessage.error_tag                 
	                }
	            })
        	}
            
        },
        mouseIn(e){
            $(".mouse").on("mousemove",function(e){
                if(e.offsetX-840<0){
                    $(".lightcircle").css("top",-e.offsetY*0.01+100+"px");
                    $(".ellipse").css("top",-e.offsetY*0.01-300+"px");
                    $(".main").css("top",-e.offsetY*0.01+"px");
                    $(".circle0101").css("bottom",e.offsetY*0.02+310+"px");              
                    $(".circle0101100").css("bottom",e.offsetY*0.02+260+"px");                   
                    $(".circle101000").css("bottom",e.offsetY*0.02+220+"px");
                    $(".circle0100").css("top",-e.offsetY*0.02+"px");
                    $(".circle010").css("bottom",e.offsetY*0.02+200+"px");
                     $(".circle10100").css("top",-e.offsetY*0.02+30+"px");
                    $(".circle010110").css("top",-e.offsetY*0.02-55+"px");
                    $(".light").css("top",-e.offsetY*0.02-40+"px");
                };  
            })
        },
        mouseOut(){
            document.onmousemove = null;
        }
    }
}
</script>
<style scoped>
.accredit_notice{
    width: 331px;
    margin-top: 24px;
    font-size: 13px;
	color: #e05034;
}
.accredit_notice>span{
    font-size: 13px;
	color: #e05034;
}
#space{
    width: 100%;
    min-height:800px;
    position: absolute;
    z-index: 1
}

body,html{
    height: 100%;
}
body>div{
    width: 100%
}
.page-wrapper {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
     width: 100%;
    /*background-color: #333;*/
    min-height: 800px;
    min-width:1100px;
    overflow:hidden;
    position: absolute;
    z-index: 2
}
.header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 85px;
    background-color: #fff;
}
.header-wrapper {
    display: flex;
    justify-content: space-between;
    width: 65%;
}
.logo {
    margin-right: 20px;
}
.login-form {
    width: 331px;
    height: 358px;
    background-color: #f5f5f5;
    padding-top: 45px;
    padding-left: 44px;
}
.logo-wrapper {
    display: flex;
    align-items: center;
}
.block>ul>li{
    /*background: white;*/
    position: absolute;
    z-index: 20;
    border-radius:50% 
    /*transition: all 0.5s ease-out;*/
}
.dot{
    position: absolute;
    border-radius:50%; 
}
.footer {
    height: 104px;
    background-color: #fff;
    display: flex;
    font-size: 14px;
    align-items: center;
    justify-content: center;
}
.login-input {
    margin-bottom: 20px;
    padding-left: 10px;
    width: 242px;
    height: 36px;
    border: 2px solid #ededed;
    border-radius: 5px;
    background-color: #fff;
}
.loginBtn{
    width:242px;
    height:36px;
    background-color:#67b7ff;
    font-size:14px;
    color:#fff;
    font-weight:bold;
}
.loginBtn:hover{
     background-color:#4A9FD7;
}
.main{
    position:relative;
    top: 0;left: 50px;
    transform-style: preserve-3d;
    animation: move 1.5s forwards;
    -moz-transition:all 0.3s ease-out;
    -webkit-transition:all 0.3s ease-out;
    -o-transition:all 0.3s ease-out;
    transition: all 0.3s ease-out;
}
.lightcircle{
    position: absolute;
    top:100px;
    left: -10px ;
    z-index:10;
    transform-style: preserve-3d;
    animation: move 1.5s forwards;
    transition: all 0.2s ease-out;
    -moz-transition:all 0.2s ease-out;
    -webkit-transition:all 0.2s ease-out;
    -o-transition:all 0.2s ease-out;
}
.ellipse{
    position:absolute;
    left:-380px;
    top:-300px;
    transform-style: preserve-3d;
    animation: move 2s forwards;
    transition: all 0.15s ease;
    -moz-transition:all 0.15 ease-out;
    -webkit-transition:all 0.15 ease-out;
    -o-transition:all 0.15 ease-out;
    
}
.light{
    position: absolute;
    z-index:8;
    top: -40px;
    left: -10px;
    animation: showOpecity 1.5s forwards;
    transition: all 0.5s ease-out;
    -moz-transition:all 0.5s ease-out;
    -webkit-transition:all 0.5s ease-out;
    -o-transition:all 0.5s ease-out;
}
.circle010110{
    position: absolute;
    z-index:10;
    top: -55px;
    left:120px;
    animation: move 0.7s forwards;
    transition: all 0.2s ease-out;
    -moz-transition:all 0.2s ease-out;
    -webkit-transition:all 0.2s ease-out;
    -o-transition:all 0.2s ease-out;
}
.circle10100{
    position: absolute;
    z-index:11;
    top:30px;
    left:50px;
    animation: move 0.5s forwards;
    transition: all 0.4s ease-out;
    -moz-transition:all 0.4s ease-out;
    -webkit-transition:all 0.4s ease-out;
    -o-transition:all 0.4s ease-out;
}
.circle010{
    position: absolute;
    z-index:20;
    bottom:200px;
    right:190px;
    animation: move 0.6s forwards;
    transition: all 0.5s ease-out;
    -moz-transition:all 0.5s ease-out;
    -webkit-transition:all 0.5s ease-out;
    -o-transition:all 0.5s ease-out;
}
.circle0100{
    position: absolute;
    z-index:11;
    top:0px;
    right:350px;
    animation: move 0.8s forwards;
    transition: all 0.4s ease-out;
    -moz-transition:all 0.4s ease-out;
    -webkit-transition:all 0.4s ease-out;
    -o-transition:all 0.4s ease-out;
}
.circle101000{
    position: absolute;
    z-index:11;
    bottom:220px;
    left:60px;
    animation: move 0.4s forwards;
    transition: all 0.4s ease-out;
    -moz-transition:all 0.4s ease-out;
    -webkit-transition:all 0.4s ease-out;
    -o-transition:all 0.4s ease-out;
}
.circle0101100{
    position: absolute;
    z-index:11;
    bottom:260px;
    left:-10px;
    animation: move 0.7s forwards;
    transition: all 0.3s ease-out;
    -moz-transition:all 0.3s ease-out;
    -webkit-transition:all 0.3s ease-out;
    -o-transition:all 0.3s ease-out;
}
.circle0101{
    position: absolute;
    z-index:11;
    bottom:310px;
    left:40px;
    animation: move 0.8s forwards;
    transition: all 0.5s ease-out;
    -moz-transition:all 0.5s ease-out;
    -webkit-transition:all 0.5s ease-out;
    -o-transition:all 0.5s ease-out;
}
@keyframes showOpecity {
    0% {
        opacity:0
    }
    100%{
        opacity:1
    }
}
@keyframes move {
    0% {
       transform: translate(0px,100px);
        opacity:0
    }
    100%{
         transform: translate(0px,0px);
        opacity:1
    }
}
.punish-button{
    height:36px;
	text-align: center;
	width:242px;
	cursor: pointer;
    background: #c5c3c3;
    font-size:14px;
    display:block;
}
.punish-button span{
	color:#fff;
    font-weight:bold;
    line-height: 36px;
    margin-bottom: 9px;
}
.sim-button{
	height:36px;
	text-align: center;
	width:242px;
	cursor: pointer;
    background: rgba(0, 124, 239,0.8);
    font-size:14px;
    display:block;
    -webkit-box-sizing:border-box;
    -o-box-sizing:border-box;
    -moz-box-sizing:border-box;
    font-weight:bold;
    text-decoration:none;
    text-transform:uppercase;
    font-family:Arial;
    -moz-transition:ease 0.4s;
    -o-transition:ease 0.4s;
    -webkit-transition:ease 0.4s;
    transition:ease 0.4s;
    position:relative;
}
.sim-button> .span{
    color:#fff;
    font-weight:bold;
    line-height: 36px;
    margin-bottom: 9px;
}
.sim-button:hover{
	border:2px solid rgb(0, 124, 239);
}
.sim-button .line{
	position:absolute;
    background:rgba(0, 124, 239,0.8); 
    -moz-transition:ease 0.4s;
    -o-transition:ease 0.4s;
    -webkit-transition:ease 0.4s;
    transition:ease 0.4s;
    z-index: 100;
    height: 1px;
}
.sim-button:hover .line{
	background:rgba(0, 124, 239,0.8);
}
.sim-button .line-top{
	width:0px;
    height:2px;
    left:-110%;
    top:-2px;
}
.sim-button:hover .line-top{
	width:100%;
    left:-2px;
}
.sim-button .line-right{
	width:2px;
    height:0px;
    right:-2px;
    top:-110%;
}
.sim-button:hover .line-right{
	height:100%;
    top:-2px;
}
.sim-button .line-bottom{
	width:2px;
    height:0px;
    left:-2px;
    bottom:-110%;
}
.sim-button:hover .line-bottom{
	height:100%;
    bottom:-2px;
}
.sim-button .line-left{
	width:0px;
    height:2px;
    right:-110%;
    bottom:-2px;
}
.sim-button:hover .line-left{
	width:100%;
    right:-2px;
}
</style>