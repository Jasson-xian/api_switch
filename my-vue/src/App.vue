<template>
    <router-view></router-view> 
</template>
<script>
import Navbar from './components/Navbar'
import Footerbar from './components/Footer'
export default {
  name: 'app',
  components: {
    Navbar,
    Footerbar
  },
  computed: {
    login: function() {
      return this.$store.state.login.isLogin
    }
  },
  watch: {
    login: function() {
      // console.log(this.login)
      if(!this.login) {
        this.$router.push("/login")
      }else{
        this.$router.push("/")
      }
    }
  } 
}
</script>
