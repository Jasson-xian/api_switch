<template>
  <div>    
      <cpuusage :picData="picData" :show='show'></cpuusage>     
      <memoryusage :picData="picData" :show='show'></memoryusage>
      <onlinenode :picData="picData" :show='show'></onlinenode>
      <diskinfo :disk="disk" :show='show'></diskinfo>
  </div>
</template>
<script>
import cpuusage from './equipment/cpuusage.vue'
import onlinenode from './equipment/onlinenode.vue'
import memoryusage from './equipment/memoryusage.vue'
import diskinfo from './equipment/diskinfo.vue'
import realTimeService from 'services/realTimeService'
export default {
  data() {
    return {
      picData:[],
      disk: {
        total: 0,
        used: 0
      },
      intervalid: null,
      show:false,
      clearTimeout:false
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      // realTimeService.getDevRes()
      // .then((recvdata) => {
        let recvdata = {"success":true,"data":{"dev":[{"cpu":"0.068","memory":"0.483","node":"2811","time":"1496280631"},{"cpu":"0.164","memory":"0.483","node":"2811","time":"1496280638"},{"cpu":"0.096","memory":"0.483","node":"2811","time":"1496280642"},{"cpu":"0.044","memory":"0.483","node":"2811","time":"1496280648"},{"cpu":"0.085","memory":"0.483","node":"2811","time":"1496280657"},{"cpu":"0.142","memory":"0.483","node":"2811","time":"1496280668"},{"cpu":"0.104","memory":"0.483","node":"2811","time":"1496280671"},{"cpu":"0.058","memory":"0.483","node":"2811","time":"1496280677"},{"cpu":"0.051","memory":"0.483","node":"2811","time":"1496280688"},{"cpu":"0.051","memory":"0.483","node":"2811","time":"1496280700"},{"cpu":"0.037","memory":"0.483","node":"2811","time":"1496280710"},{"cpu":"0.078","memory":"0.483","node":"2811","time":"1496280720"},{"cpu":"0.063","memory":"0.484","node":"2811","time":"1496280726"},{"cpu":"0.051","memory":"0.483","node":"2811","time":"1496280738"},{"cpu":"0.041","memory":"0.483","node":"2811","time":"1496280746"},{"cpu":"0.053","memory":"0.483","node":"2811","time":"1496280752"},{"cpu":"0.070","memory":"0.484","node":"2811","time":"1496280761"},{"cpu":"0.083","memory":"0.483","node":"2811","time":"1496280773"},{"cpu":"0.087","memory":"0.484","node":"2811","time":"1496280782"},{"cpu":"0.104","memory":"0.484","node":"2811","time":"1496280788"},{"cpu":"0.097","memory":"0.483","node":"2811","time":"1496280798"},{"cpu":"0.061","memory":"0.485","node":"2811","time":"1496280801"},{"cpu":"0.051","memory":"0.483","node":"2811","time":"1496280812"},{"cpu":"0.092","memory":"0.483","node":"2811","time":"1496280824"},{"cpu":"0.041","memory":"0.483","node":"2811","time":"1496280832"},{"cpu":"0.044","memory":"0.484","node":"2811","time":"1496280842"},{"cpu":"0.046","memory":"0.483","node":"2811","time":"1496280852"},{"cpu":"0.044","memory":"0.483","node":"2811","time":"1496280862"},{"cpu":"0.053","memory":"0.483","node":"2811","time":"1496280872"},{"cpu":"0.036","memory":"0.483","node":"2811","time":"1496280884"},{"cpu":"0.049","memory":"0.484","node":"2811","time":"1496280892"},{"cpu":"0.088","memory":"0.483","node":"2811","time":"1496280901"},{"cpu":"0.208","memory":"0.484","node":"2811","time":"1496280906"},{"cpu":"0.034","memory":"0.483","node":"2811","time":"1496280912"},{"cpu":"0.056","memory":"0.483","node":"2811","time":"1496280920"},{"cpu":"0.051","memory":"0.484","node":"2811","time":"1496280926"},{"cpu":"0.039","memory":"0.483","node":"2811","time":"1496280936"},{"cpu":"0.041","memory":"0.483","node":"2811","time":"1496280947"},{"cpu":"0.083","memory":"0.483","node":"2811","time":"1496280959"},{"cpu":"0.120","memory":"0.483","node":"2811","time":"1496280968"},{"cpu":"0.037","memory":"0.485","node":"2811","time":"1496280974"},{"cpu":"0.051","memory":"0.484","node":"2811","time":"1496280985"},{"cpu":"0.039","memory":"0.483","node":"2811","time":"1496280997"},{"cpu":"0.044","memory":"0.484","node":"2811","time":"1496281009"},{"cpu":"0.029","memory":"0.484","node":"2811","time":"1496281019"},{"cpu":"0.039","memory":"0.484","node":"2811","time":"1496281028"},{"cpu":"0.044","memory":"0.484","node":"2811","time":"1496281036"},{"cpu":"0.034","memory":"0.484","node":"2811","time":"1496281042"},{"cpu":"0.053","memory":"0.486","node":"2811","time":"1496281049"},{"cpu":"0.047","memory":"0.484","node":"2811","time":"1496281059"},{"cpu":"0.032","memory":"0.484","node":"2811","time":"1496281064"},{"cpu":"0.046","memory":"0.484","node":"2811","time":"1496281075"},{"cpu":"0.051","memory":"0.484","node":"2811","time":"1496281087"},{"cpu":"0.046","memory":"0.484","node":"2811","time":"1496281094"},{"cpu":"0.029","memory":"0.484","node":"2811","time":"1496281103"},{"cpu":"0.051","memory":"0.484","node":"2811","time":"1496281112"},{"cpu":"0.039","memory":"0.484","node":"2811","time":"1496281122"},{"cpu":"0.046","memory":"0.484","node":"2811","time":"1496281133"},{"cpu":"0.044","memory":"0.484","node":"2811","time":"1496281143"},{"cpu":"0.032","memory":"0.484","node":"2811","time":"1496281155"},{"cpu":"0.139","memory":"0.484","node":"2811","time":"1496281167"},{"cpu":"0.046","memory":"0.484","node":"2811","time":"1496281174"},{"cpu":"0.083","memory":"0.484","node":"2811","time":"1496281182"},{"cpu":"0.042","memory":"0.484","node":"2811","time":"1496281187"},{"cpu":"0.138","memory":"0.484","node":"2811","time":"1496281197"},{"cpu":"0.039","memory":"0.484","node":"2811","time":"1496281203"},{"cpu":"0.049","memory":"0.485","node":"2811","time":"1496281211"},{"cpu":"0.041","memory":"0.484","node":"2811","time":"1496281217"},{"cpu":"0.075","memory":"0.484","node":"2811","time":"1496281225"},{"cpu":"0.071","memory":"0.484","node":"2811","time":"1496281235"},{"cpu":"0.036","memory":"0.484","node":"2811","time":"1496281247"},{"cpu":"0.088","memory":"0.484","node":"2811","time":"1496281256"},{"cpu":"0.041","memory":"0.484","node":"2811","time":"1496281264"},{"cpu":"0.065","memory":"0.485","node":"2811","time":"1496281272"},{"cpu":"0.041","memory":"0.484","node":"2811","time":"1496281282"},{"cpu":"0.039","memory":"0.484","node":"2811","time":"1496281292"},{"cpu":"0.058","memory":"0.485","node":"2811","time":"1496281300"},{"cpu":"0.115","memory":"0.486","node":"2811","time":"1496281303"},{"cpu":"0.034","memory":"0.484","node":"2811","time":"1496281313"},{"cpu":"0.056","memory":"0.484","node":"2811","time":"1496281323"},{"cpu":"0.086","memory":"0.484","node":"2811","time":"1496281333"},{"cpu":"0.136","memory":"0.484","node":"2811","time":"1496281343"},{"cpu":"0.169","memory":"0.484","node":"2811","time":"1496281351"},{"cpu":"0.117","memory":"0.484","node":"2811","time":"1496281358"},{"cpu":"0.044","memory":"0.485","node":"2811","time":"1496281365"},{"cpu":"0.083","memory":"0.485","node":"2811","time":"1496281369"},{"cpu":"0.080","memory":"0.484","node":"2811","time":"1496281380"},{"cpu":"0.066","memory":"0.484","node":"2811","time":"1496281391"},{"cpu":"0.066","memory":"0.485","node":"2811","time":"1496281398"},{"cpu":"0.070","memory":"0.485","node":"2811","time":"1496281408"},{"cpu":"0.129","memory":"0.486","node":"2811","time":"1496281414"},{"cpu":"0.070","memory":"0.485","node":"2811","time":"1496281422"},{"cpu":"0.085","memory":"0.485","node":"2811","time":"1496281430"},{"cpu":"0.113","memory":"0.484","node":"2811","time":"1496281442"},{"cpu":"0.065","memory":"0.485","node":"2811","time":"1496281450"},{"cpu":"0.126","memory":"0.485","node":"2811","time":"1496281460"},{"cpu":"0.078","memory":"0.485","node":"2811","time":"1496281471"},{"cpu":"0.080","memory":"0.485","node":"2811","time":"1496281483"},{"cpu":"0.070","memory":"0.485","node":"2811","time":"1496281491"},{"cpu":"0.168","memory":"0.485","node":"2811","time":"1496281501"},{"cpu":"0.061","memory":"0.485","node":"2811","time":"1496281507"},{"cpu":"0.090","memory":"0.485","node":"2811","time":"1496281515"}],"disk":{"total":58476700,"used":1099692}}}
        // recvdata = JSON.parse(recvdata)
        if(recvdata.success == true) {
          this.show=true
          this.picData = recvdata.data.dev
          this.disk = recvdata.data.disk
        }
				if(this.clearTimeout){
        	return 
        }
				clearTimeout(this.intervalid)
        this.intervalid = setTimeout(() => this.loadData(), 10000)
      // },()=>{
      // 	if(this.clearTimeout){
			//     return 
			//   }
      // 	clearTimeout(this.intervalid)
			// 	this.intervalid = setTimeout(() => this.loadData(), 10000)
			// })
    }
  },
  components:{
    cpuusage,
    onlinenode,
    memoryusage,
    diskinfo
  },
  beforeDestroy() {
  	this.clearTimeout = true
		clearTimeout(this.intervalid)
  }
}
</script>
<style scoped>
    
</style>