<template>
  <div>
      <todo-item/>
      <todo-creator @create-todo="createTodo"/>
  </div>
</template>

<script>
    import lowdb from 'lowdb'
    import LocalStorage from 'lowdb/adapters/LocalStorage'
    import cryptoRandomString from 'crypto-random-string'
    import TodoCreator from './TodoCreator'
    import TodoItem from './TodoItem.vue'
export default {
    components:{
        TodoCreator,
        TodoItem
    },
    data(){
      return{
        db: null
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
         //Local DB 를 초기화
        this.db
          .defaults({
            todos:[] //Collection
          })
        .write()
      },
      createTodo(title){
        const newTodo = {
          id:cryptoRandomString({length: 10 }),
          title,
          createdAt: new Date(),
          updatedAt: new Date(),
          done:false
        }

        this.db
          .get('todos')   //lodash
          .push(newTodo)  //lodash
          .write()  //lowdb
      }
    }
}
</script>