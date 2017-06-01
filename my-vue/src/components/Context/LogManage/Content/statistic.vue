<template>
	<div class="content-wrap">
		<div class="title">
			<h3>渗透统计</h3>
		</div>
		<div class="content">
			<rank></rank>
			<record></record>
		</div>
	</div>
</template>
<script>
	import rank from './statistic/rank.vue'
	import record from './statistic/record.vue'
	export default {
		components: {
			rank,
			record
		}
	}
</script>
<style scoped>
	.content-wrap {
		margin: 30px 0 0 30px;
		background: #ffffff;
		padding-bottom: 20px;
	}
	
	.title {
		background: #333333;
		color: #ffffff;
		height: 30px;
		padding-left: 20px;
	}
	
	h3 {
		line-height: 30px;
		display: inline-block;
	}
	
	.content {
		padding: 0 20px;
	}
</style>