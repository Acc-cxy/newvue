<template>
  <div id="todo-list-example" class="demo">
    <form v-on:submit.prevent="addNewTodo">
      <label for="new-todo">Add a todo</label>
      <input
          v-model="newTodoText"
          id="new-todo"
          placeholder="E.g. Feed the cat"
      />
      <button>Add</button>
    </form>
    <ul>
      <li v-for="todos in todos">
            <span>{{ todos.title }}</span>
           <button @click="del(index)">Remove</button>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: "HoMe",
  data(){
    return{
      newTodoText: '',
      todos: [
        {
          id: 1,
          title: 'Do the dishes'
        },
        {
          id: 2,
          title: 'Take out the trash'
        },
        {
          id: 3,
          title: 'Mow the lawn'
        }
      ],
      nextTodoId: 4
    }
  },
  methods: {
    addNewTodo() {

      console.log(this.newTodoText);
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      })
      this.newTodoText = ''
    },
    del(index) {
      this.todos.splice(index, 1)
    },
  }
}
</script>

<style scoped>
  .demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
}

  .demo li span{
    margin-right: 20px;
  }
</style>