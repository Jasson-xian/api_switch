<template>
	<div class="wrap">
		<div class="title">
			<h3>网络配置</h3>
		</div>
        <wiptable></wiptable>
        <nowiptable></nowiptable>
		<leastone></leastone>
        <mustone></mustone>
        <success></success>
        <fail></fail>
	</div>
</template>
<script>
    import netservice from 'services/netService'

    import wiptable from './wipconf/wiptable.vue'
    import nowiptable from './wipconf/nowiptable.vue'
    import leastone from './tags/leastone.vue'
	import mustone from './tags/mustone.vue'
    import success from './tags/success.vue'
    import fail from './tags/fail.vue'

    import PageData from 'libs/PageData'

	export default {
		components: {
			wiptable,
            nowiptable,
			leastone,
            mustone,
            success,
            fail
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