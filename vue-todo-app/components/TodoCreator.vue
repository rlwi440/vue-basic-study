<template>
    <div>
      <button 
        @click="createTodo">
        <i class="material-icons">add</i>
        </button>
      <input  
       :value="title"
      :placeholder="placeholder"
      type="text"
      @input="title = $event.target.value"
      @keypress.enter="createTodo">
    </div>
</template>

<script>
export default {
  data(){
    return{
      title:'',
      placeholder:'할일을 추가하세요 '
    }
  },
    methods:{
    createTodo(){
      //생성

      const validatedTitle=this.title && this.title.trim()
      // false 라면 
      if(!validatedTitle){
        alert('유효하지 않은 제목입니다')
         this.title= this.title.trim() 
         return
      }
      console.log(this.title)
      // this.$emit('create-todo',this.title)
      this.$store.dispatch('todoApp/createTodo',this.title)
      //초기화 예제
      this.title=''
      //scrollTo  예제 및 document.body 부분체크 
      this.$nextTick(()=>{
        window.scrollTo(0,document.body.scrollHeight)
      })
    }
  }
}
</script>