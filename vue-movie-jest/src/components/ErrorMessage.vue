<template>
  <div v-if="errorMessage">
    {{errorMessage}}
  </div>
</template>

<script>
export default {
  computed:{
   errorMessage(){
      const error =this.$store.state.movie.error
      // 에러메세지가 있는경우
      if(error){
        // new Error('Network Error!') 
        return error.message
      }
      return ''
   }
  }
}
</script>