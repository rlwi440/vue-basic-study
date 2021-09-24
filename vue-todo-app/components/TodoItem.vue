<template>
  <div 
    :class="{done}"
    class="todo-item">
    <div
      v-if="isEditMode" 
      class="item__inner item--edit"
    >
      <input
        ref="titleInput"
        :value="editedTitle"  
        type="text"
        @input="editedTitle =$event.target.value"
        @keypress.enter="editedTodo"
        @keypress.esc="offEditMode"
      />
      <div class="item__actions">
        <button
          class="btn btn--primary"
          key="complete" 
          @click="editedTodo">
          <i class="material-icons">done</i>
        </button>
        <button
          class="btn"
          key="cancel" 
          @click="offEditMode">
          <i class="material-icons">clear</i>  
        </button>
      </div>
    </div>
    <div v-else
      class="item__inner item--normal"
    >
      <label>
        <input 
          v-model="done"
          type="checkbox" 
        />
       <span class="icon">
          <i class="material-icons">
            check
          </i>  
       </span>
      </label>
      <div class="item__title-wrap">
        <div class="item__title">
          {{todo.title}}
        </div>
        <div class="item__date">
          {{date}}
        </div>
      </div>
      <div class="item__actions">
        <button
          class="btn"
          key="update"
          @click="onEditMode">
         <i class="material-icons">edit</i> 
        </button>
        <button 
          class="btn btn--danger"
          key="delete"
          @click="deleteTodo">
          <i class="material-icons">delete</i> 
          
        </button>
      </div>
    </div>
</div>
</template>


<script>
import dayjs from 'dayjs'

export default {
  props:{
      todo:Object
  },
  data(){
    return{
      isEditMode:false,
      editedTitle:''
    }
  },
  computed:{
    done:{
      get(){
        return this.todo.done
      },
      set (done){
        this.updateTodo({
          done
        })

      }
    },
    date(){
      const date= dayjs(this.todo.createdAt)
      const isSame =date.isSame(this.todo.updatedAt)
        if(isSame){
             return date.format('YYYY년 MM월 DD 일')
        }else{
          return `${date.format('YYYY년 MM월 DD 일')} (edited)`
        }
    }
  },
  methods:{
    editedTodo(){
      if(this.todo.title !==this.editedTitle){
        this.updateTodo({
          title:this.editedTitle,
          updatedAt:new Date() 
        })
      }
      this.offEditMode()
    },
    onEditMode(){
        this.isEditMode =true
        this.editedTitle =this.todo.title
        //his.isEditMode =true 갱신되고 나서 nextTick 이라는 속성을 사용한다.
        this.$nextTick (() => {
        this.$refs.titleInput.focus()
        })

    },
    offEditMode(){
      this.isEditMode=false
    },
    updateTodo(value){
      // this.$emit('update-todo',this.todo,value)
      this.$store.dispatch('todoApp/updateTodo',{
        todo:'this.todo',
        value
      })
    },
    deleteTodo(){
      // this.$emit('delete-todo',this.todo)
      this.$store.dispatch('todoApp/deleteTodo',this.todo)
    }
  }
}
</script>
