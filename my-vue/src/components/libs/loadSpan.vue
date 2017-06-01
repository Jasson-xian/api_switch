<template>
	<div class="loading">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
	</div>
</template>
<style scoped>
	.loading{
		width: 150px;
		height: 10px;
		margin: 0 auto;
		position: absolute;
		top:0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}
    .loading span{
		display: inline-block;
		width: 10px;
		height: 100%;
		margin-right: 5px;
		background: #69b6ff;
		-webkit-transform-origin: right bottom;
		-webkit-animation: load 1s ease infinite;
	}
	.loading span:last-child{
		margin-right: 0px; 
	}
	@keyframes load{
		0%{
			opacity: 1;
		}
		100%{
			opacity: 0;
			-webkit-transform: rotate(90deg);
		}
	}
	@-webkit-keyframes load{
		0%{
			opacity: 1;
		}
		100%{
			opacity: 0;
			-webkit-transform: rotate(90deg);
		}
	}
	@-mos-keyframes load{
		0%{
			opacity: 1;
		}
		100%{
			opacity: 0;
			-webkit-transform: rotate(90deg);
		}
	}
	@-moz-keyframes name{
		0%{
			opacity: 1;
		}
		100%{
			opacity: 0;
			-webkit-transform: rotate(90deg);
		}
	}
	.loading span:nth-child(1){
		-webkit-animation-delay:0s;
	}
	.loading span:nth-child(2){
		-webkit-animation-delay:0.13s;
	}
	.loading span:nth-child(3){
		-webkit-animation-delay:0.26s;
	}
	.loading span:nth-child(4){
		-webkit-animation-delay:0.39s;
	}
	.loading span:nth-child(5){
		-webkit-animation-delay:0.52s;
	}
</style>