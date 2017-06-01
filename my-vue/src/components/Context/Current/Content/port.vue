<template>
  <div class="wrap">
    <loadSpan v-show='!show'></loadSpan> 
    <ul class="titleNar" >
          <li>接</li>
          <li>口</li>
          <li>名</li>
          <li>称</li>
    </ul>     
    <div class="title">
      <h3>物理接口数据</h3>
    </div>
    <transition name='fade'>
    <div class="body"  v-show='show'>   
      <div >
        <portpic :eths="eths" :length='length'></portpic>
        <porttable :eths="eths"></porttable>
      </div>    
    </div>
    </transition> 
  </div>
</template>
<script>
import portpic from './port/portpic.vue'
import porttable from './port/porttable.vue'
import realTimeService from 'services/realTimeService'
import loadSpan from 'components/libs/loadSpan'
export default {
  data: function() {
    return {
      eths: [],
      intervalid: null,
      length:0,
      show:false,
      clearTimeout:false
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      // realTimeService.getEthsState()
      // .then((recvdata) => {
      //   recvdata = JSON.parse(recvdata)
        // if(recvdata.success == true) {
          let recvdata = {"success":true,"data":[{"name":"MGT1","macaddr":"68:ed:a4:08:c3:ce","up":true,"ipaddr":"192.168.2.1\/24","ipv6addr":"fe80::6aed:a4ff:fe08:c3ce\/64","inbytes":12503213,"in_bps":0,"inpkts":97202,"in_err":"0","in_drop":"0","in_frame":"0","outbytes":26044900,"out_bps":0,"outpkts":23571,"out_err":"0","out_drop":"0","out_frame":"0"},{"name":"MGT2","macaddr":"68:ed:a4:08:c3:cf","up":false,"inbytes":0,"in_bps":0,"inpkts":0,"in_err":"0","in_drop":"0","in_frame":"0","outbytes":0,"out_bps":0,"outpkts":0,"out_err":"0","out_drop":"0","out_frame":"0"},{"name":"LAN1","macaddr":"68:ed:a4:08:c3:ca","up":true,"ipaddr":"","ipv6addr":"fe80::6aed:a4ff:fe08:c3ca\/64","inbytes":321243204,"in_bps":3411,"inpkts":1690163,"in_err":"0","in_drop":"0","in_frame":"0","outbytes":1766381685,"out_bps":2050,"outpkts":1737470,"out_err":"0","out_drop":"0","out_frame":"0"},{"name":"WAN1","macaddr":"68:ed:a4:08:c3:cb","up":true,"ipaddr":"","ipv6addr":"fe80::6aed:a4ff:fe08:c3cb\/64","inbytes":1771307423,"in_bps":2088,"inpkts":1792271,"in_err":"0","in_drop":"0","in_frame":"0","outbytes":309274836,"out_bps":3475,"outpkts":1614182,"out_err":"0","out_drop":"0","out_frame":"0"},{"name":"LAN2","macaddr":"68:ed:a4:08:c3:cc","up":false,"inbytes":0,"in_bps":0,"inpkts":0,"in_err":"0","in_drop":"0","in_frame":"0","outbytes":0,"out_bps":0,"outpkts":0,"out_err":"0","out_drop":"0","out_frame":"0"},{"name":"WAN2","macaddr":"68:ed:a4:08:c3:cd","up":false,"inbytes":0,"in_bps":0,"inpkts":0,"in_err":"0","in_drop":"0","in_frame":"0","outbytes":0,"out_bps":0,"outpkts":0,"out_err":"0","out_drop":"0","out_frame":"0"},{"name":"LAN3","macaddr":"00:90:0b:52:e2:b4","up":false,"inbytes":0,"in_bps":0,"inpkts":0,"in_err":"0","in_drop":"0","in_frame":"0","outbytes":0,"out_bps":0,"outpkts":0,"out_err":"0","out_drop":"0","out_frame":"0"},{"name":"WAN3","macaddr":"00:90:0b:52:e2:b5","up":false,"inbytes":0,"in_bps":0,"inpkts":0,"in_err":"0","in_drop":"0","in_frame":"0","outbytes":0,"out_bps":0,"outpkts":0,"out_err":"0","out_drop":"0","out_frame":"0"},{"name":"LAN4","macaddr":"00:90:0b:52:e2:b6","up":false,"inbytes":0,"in_bps":0,"inpkts":0,"in_err":"0","in_drop":"0","in_frame":"0","outbytes":0,"out_bps":0,"outpkts":0,"out_err":"0","out_drop":"0","out_frame":"0"},{"name":"WAN4","macaddr":"00:90:0b:52:e2:b7","up":false,"inbytes":0,"in_bps":0,"inpkts":0,"in_err":"0","in_drop":"0","in_frame":"0","outbytes":0,"out_bps":0,"outpkts":0,"out_err":"0","out_drop":"0","out_frame":"0"}]}
          this.show=true
          this.length=recvdata.data.length
          this.eths = recvdata.data.map((item) => {
						return {
							name: item.name,
							inpkts: item.inpkts,
							outpkts: item.outpkts,
							inbytes: this.convertFlow(item.inbytes),
							outbytes: this.convertFlow(item.outbytes),
              in_bps:item.in_bps,
              out_bps:item.out_bps,
              in_err:item.in_err,
              out_err:item.out_err,
              in_drop:item.in_drop,
              out_drop:item.out_drop,
              in_frame:item.in_frame,
              out_frame:item.out_frame,
							status: item.up
						}
					})
        // }
        if(this.clearTimeout){
        	return 
        }  
        clearTimeout(this.intervalid)
        this.intervalid = setTimeout(() => this.loadData(), 1000)
			// },()=>{
			// 	if(this.clearTimeout){
      //   	return 
      //   }
			// 	clearTimeout(this.intervalid)
			// 	this.intervalid = setTimeout(() => this.loadData(), 1000)
			// })
    },
     convertFlow(bps) {
			let flow = ''
			if(bps < 1024) {
				flow = Math.ceil(bps) + ' B'
			}
			if(bps >= 1024 && bps < 1024*1024) {
				flow = bps/1024
				flow = flow.toFixed(2) + ' KB'
			}
			if(bps >= 1024*1024 && bps < 1024*1024*1024) {
				flow = bps/1024/1024
				flow = flow.toFixed(2) + ' MB'
			}
			if(bps >= 1024*1024*1024) {
				flow = bps/1024/1024/1024
				flow = flow.toFixed(2) + ' GB'
			}
			return flow
	  }
  },
  beforeDestroy() {
    this.clearTimeout	 = true
    clearTimeout(this.intervalid)
  },
  components: {
    portpic,
    porttable,
    loadSpan
  }
}
</script>
<style scoped>
  .wrap{
    margin: 30px 0 0 30px;
    background: #ffffff;
    padding-bottom: 30px;
    min-height: 350px;    
  }
  .title{
    background: #333333;
    color: #ffffff;
    height: 30px;
    padding-left:  20px;
  }
  .body{
  	position: relative;
    max-height:750px;
    min-height: 300px;     
    overflow-y: scroll;
  }

  h3{
    line-height:30px;
  }
  .titleNar{
  	position: absolute;
  	top: 50%;
  	left:80px;
  	font-size:16px;
  	transform: translate(0,-50%);
  	z-index: 3;
  }

</style>