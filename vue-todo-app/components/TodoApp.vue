<template>
  <div class="todo-app">
      <div class="todo-app__actions">
        <div class="filters">
          <button
            :class="{active: filter === 'all'}"
            @click="changeFilter('all')"
          >
            모든항목({{total}})
          </button>
          <button
           :class="{active: filter === 'active'}" 
            @click="changeFilter('active')"
          > 
            해야 할 항목({{activeCount}})
          </button>
          <button
           :class="{active: filter === 'completed'}" 
            @click="changeFilter('completed')"
          >
            완료 된 항목({{completedCount}})
          </button>
        </div>
        <div class="actions clearfix">
          <div class="float--left">
            <label>
              <input
                v-model="allDone" 
                type="checkbox"
              />
              <span class="icon">
                <i class="material-icons">done_all</i>
              </span> 
            </label>
          </div>
         <div class="float--right">
            <button
             class="btn float--left"
             @click="scrollToTop"
            > 
              <i class="material-icons">expand_less</i>
            </button>
            <button
             class="btn float--left"
             @click="scrollToBottom"
            >
              <i class="material-icons">expand_more</i>
            </button>
            <button
              class="btn btn--danger float--left" 
              @click="clearCompleted">
              <i class="material-icons">delete_sweep</i>
            </button>
         </div>
        </div>
      </div>
      <div class="todo-app__list">
        <todo-item
          v-for="todo in filteredTodos"
          :key ="todo.id"
          :todo="todo"
          @update-todo="updateTodo"
          @delete-todo="deleteTodo"
        />
      </div>
      <todo-creator
        class="todo-app__creator" 
        @create-todo="createTodo"
      />
  </div>
</template>

<script>
    import lowdb from 'lowdb'
    import LocalStorage from 'lowdb/adapters/LocalStorage'
    import cryptoRandomString from 'crypto-random-string'
    import _cloneDeep from 'lodash/cloneDeep'
    import _find from 'lodash/find'
    import _assign from  'lodash/assign'
    import _findIndex from  'lodash/findIndex'
    import _forEachRight from 'lodash/forEachRight'
    import scrollTo from 'scroll-to'
    import TodoCreator from './TodoCreator'  
    import TodoItem from './TodoItem.vue'
    export default {
    components:{
        TodoCreator,
        TodoItem
    },
    data(){
      return{
        db: null,
        todos:[],
        filter: 'all'
      }
    },
    computed:{
      filteredTodos(){
        switch(this.filter){
          case 'all':
          default:
            return this.todos
          case 'active': //해야할 항목
            return this.todos.filter(todo => !todo.done)
          case 'completed': //완료된 항목
            return this.todos.filter(todo => todo.done)
        }
      },
      total(){
        return this.todos.length
      },
      activeCount(){
        return this.todos.filter(todo => !todo.done).length
      },
      completedCount(){
        return  this.total - this.activeCount
      },
      allDone:{
        get(){
          //전체갯수로 볼수있다.
          return this.total === this.completedCount && this.total > 0
        },
        set(checked){
        // 상태설정을 받아서  DB값전달
          this.completeAll(checked)

        }
      }

    },
    created(){
    this.initDB()
    },
    methods:{
      initDB(){
        const adapter  =new LocalStorage('todo-app') //DB
        this.db = lowdb(adapter)
        console.log(this.db)
        //has  ('todos') check 여부
        const hasTodos = this.db.has('todos').value()
        
        if(hasTodos){
          //상태설정(getState),_cloneDeep (깊은복사)
          this.todos= _cloneDeep(this.db.getState().todos)
        }else{
        //Local DB 를 초기화
            this.db
              .defaults({
                todos:[] //Collection
              })
            .write()
            }    
      },
      createTodo(title){
        const newTodo = {
          id:cryptoRandomString({length: 10 }),
          title,
          createdAt: new Date(),
          updatedAt: new Date(),
          done:false
        }
        //Create DB
        this.db
          .get('todos')   //lodash
          .push(newTodo)  //lodash
          .write()  //lowdb
        //Create Client
        this.todos.push(newTodo)
      },
      updateTodo(todo,value){
        this.db
          .get('todos')
          .find({id:todo.id})
          .assign(value)
          .write()

          //lodash 요소
        const foundTodo =_find( this.todos,{id:todo.id})
        _assign(foundTodo,value)
       
      },
      deleteTodo(todo){
        this.db
        .get('todos')
        .remove({id:todo.id})
        .write()

        const foundIndex =_findIndex(this.todos,{id:todo.id})
        this.$delete(this.todos,foundIndex)
      },
      changeFilter(filter){
        this.filter= filter
      },
      completeAll(checked){
        //DB
        const newTodos = this.db
        .get('todos')
        .forEach(todo => {
            todo.done = checked
        })
        .write()
        // //Local todos
        // this.todos.forEach(todo =>{
        //   todo.done =checked 
        // })
        this.todos =_cloneDeep(newTodos)
      },
      clearCompleted(){
        // this.todos.forEach(todo => {
        //   if(todo.done){
        //     this.deleteTodo(todo) 
        //   }
        // })

        // this.todos
        // .reduce((list,todo,index)=> {
        //   if(todo.done){
        //     list.push(index)
        //   }
        //   return list
        // },[])
        // .reverse()
        // .forEach(index =>{
        //   this.deleteTodo(this.todos[index])

        // })
        _forEachRight(this.todos,todo=>{
          if(todo.done){
            this.deleteTodo(todo)
          }
        })
      },
      scrollToTop(){
        scrollTo(0,0,{
          ease:'linear'
        }) 
      },
      scrollToBottom(){
         scrollTo(0,document.body.scrollHeight,{
          ease:'linear'
        }) 
      }
    }
}
</script>
<style lang="scss">
  @import "../scss/style"
 
</style>