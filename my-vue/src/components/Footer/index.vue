<template>
<footer class="navbar-fixed-bottom">
    <p> 北京卫达科技有限公司 <span>Copyright © 2015-{{year}}</span></p> 
</footer>
</template>
<script>	
export default{
    data() {
        return {
            year:''
        }
    },
    mounted:function(){
        this.year = new Date().getFullYear()   
    }
 }
</script>
<style>
footer {
	font-size: 12px;
	background-color: #d2d2d2;
	text-align: center;
	height: 40px;
	line-height: 40px;	
}
p{
  color: #666666;	
}
footer span{
	margin-left: 10px;
	color: #666666;
}
</style>