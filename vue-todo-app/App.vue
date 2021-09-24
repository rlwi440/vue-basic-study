<template>
  <div>
    <router-link 
      to="/" class="to-home"
      >
      <i class="material-icons">home</i>
      </router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  created(){
    console.log('Router',this.$router)
    console.log('Route',this.$route)
  }
}
</script>
<style lang="scss">
  .to-home.router-link-exact-active{
    display: none;
  }
</style>