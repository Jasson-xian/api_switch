<template>
<div class="app">
    <navbar></navbar>
        <div class="accredit-warp">
            <router-view v-if='accredit'></router-view>
            <div  v-else class="container">
                <div class = "updata">
                    <update></update>
                </div>
            </div>
        </div>
        <timeout></timeout>
    <footerbar></footerbar>
</div>
</template>
<script>
import timeout from "./timeout"
import update from 'components/Context/SystemSet/Content/update'
import Navbar from 'components/Navbar'
import Footerbar from 'components/Footer'
export default {
    components: {
        Navbar,
        Footerbar,
        timeout,
        update
    },
    computed:{
        accredit:function(){
            if(this.$store.state.cert.type=='test'){
                return  this.$store.state.cert.status=='valid'
            }else{
                if(this.$store.state.cert.type=='official'){
                    return true
                }else{
                   return false
                }     
            }           
        }
    },
   created(){
       var _this=this
       window.addEventListener('click',function(){
           let time=_this.$store.state.time
           _this.$store.commit('EDIT_WEB', time)
       })
   }
}
</script>
<style scoped>
    .app{
        height: 100%
    }
	.accredit-warp{
		height: 92%;
	}
    .updata{
        width: 1270px;
        margin-left: -80px;
    }
</style>