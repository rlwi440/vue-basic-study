<template>
  <div>
    <v-text-field
    v-model="title"
    outlined
    @keypress.enter="searchMovies"
    >
      <template v-slot:prepend-inner>
        <v-icon>search</v-icon>
      </template>
      <template v-slot:append>
        <v-progress-circular
          v-if="loading"
          size="24"
          color="primary"
          indeterminate
        />
      </template>
    </v-text-field>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      title: '',
      loading:false
    }
  },
  methods:{ 
    searchMovies(){ 
      // omdb API get링크연결 
      // this.title 연결 
      axios.get(`http://www.omdbapi.com/?apikey=6f3b4914&s=${this.title}`)
      .then(res =>{
        console.log(res)
      })
        console.log('searchMovies🐸')
    }
  }
}
</script>