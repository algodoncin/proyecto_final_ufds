<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    
  }),
  methods: {
    validateAccess(){
      let data = localStorage.getItem('userData')
      if(data){
        this.$store.dispatch('loginAction', JSON.parse(data))
        this.$router.push('/dashboard')
      } else {
        this.$router.push('/')
      }
    }
  },
  created(){
    // if(!this.$store.state.token){
    //   this.$router.push('/login')
    // }
    this.validateAccess();
  }
}
</script>

<style>

* {
  box-sizing: border-box;
}

</style>
