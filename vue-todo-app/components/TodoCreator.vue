<template>
    <div>
      <button @click="createTodo">추가</button>
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
      this.$emit('create-todo',this.title)
      //초기화 예제
      this.title=''
    }
  }
}
</script>