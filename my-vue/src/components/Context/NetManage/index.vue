<template>
		<div  class="container current-wrap">
	    <div class="row">
	      <leftnavbar class="navBar  col-sm-2 col-md-2 col-lg-2"  :screen_with = "screen_with" :class="[screen_with != 'big'?'samll_width':'']" @comeOut="comeOut" @goIn="goIn"></leftnavbar>
	      <div class="view col-sm-10 col-md-10 col-lg-10" :class="[screen_with == 'small'?'small_content':screen_with == 'mid'?'mid_content':'']">
	        <router-view></router-view>
	      </div>
	    </div>
	  </div>
</template>
<script>		
  import leftnavbar from './leftnavbar.vue'
  export default {
    components: {
      leftnavbar
    },
     data(){
    	return{
    		screen_with:''
    	}
    },
    created() {
      this.getScreenWidth()
      var _this = this
      $(window).resize(function(){
      	  _this.getScreenWidth()
      })
    },
    methods: {
    	getScreenWidth() {
      	let  screen_with = $(window).width()
      	if(screen_with>1470){
      		this.screen_with = 'big'
      	}else if(screen_with<=1470&&screen_with>1280){
      		this.screen_with = 'mid'
      	}else{
      		this.screen_with = 'small'     	
      	}
      },
			comeOut(){
			  $('.samll_width').addClass('out').removeClass('in')
			},
			goIn(){
				$('.samll_width').addClass('in').removeClass("out")
			}
		}
  }
</script>
<style scoped>
.container{
	height: 100%;
}
.un_accredit{
	width: 1240px;
}
.row{
	height: 100%;
}
.current-wrap{
  min-width: 1500px;
}
.view,.navBar{
   display: inline-block;
   vertical-align: top;
}
.view{
	margin-bottom: 60px;
}
.samll_width{
	position: absolute;
	z-index: 10;
	left: -220px;
	transition: 0.5s;
}
.small_content{
	margin-left: -250px;
}
.mid_content{
	margin-left: -200px;
} 
.in{
	left:-220px;
}
.out{
	left:-40px;
}
</style>
