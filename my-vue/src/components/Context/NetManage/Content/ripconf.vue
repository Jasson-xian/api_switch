<template>
	<div class="wrap">
		<div class="title">
			<h3>网络配置</h3>
		</div>
        <riptable></riptable>
        <noriptable></noriptable>
	</div>
</template>
<script>
    import netservice from 'services/netService'
    import riptable from './ripconf/riptable.vue'
    import noriptable from './ripconf/noriptable.vue'
    import PageData from 'libs/PageData'

	export default {
		components: {
            riptable,
            noriptable
		}
	}
    
</script>
<style scoped>
	.wrap {
		margin: 30px 0 0 30px;
		padding-bottom: 10px;
		background: #FFFFFF;
	}
	.title {
		background: #333333;
		color: #ffffff;
		height: 30px;
		padding-left: 20px;
	}
	h3 {
		line-height: 30px;
	}
</style>