<template>
  <div class="opens">
    <!--  新增todo    -->
    <input
      type="text"
      v-model="newTodo"
      @keyup.enter="addTodo"
      autofocus
      placeholder="新增今日待办"
      autocomplete="off"
    >
    <ul>
      <li v-for="item in filterdTodos"
          :key="item.id"
          :class="{completed:item.completedyesno,editing:item == editedTodo }"
      >
        <!--       绑定完成待办 -->
        <div class="view">
          <input type="checkbox" v-model="item.completedyesno">
          <span>{{item.id}}</span>
          <label @click="editTodo(item)">{{item.title}}</label>
          <button @click="removeitem(item)">删除</button>
        </div>

        <!--        编辑状态-->
        <input
            type="text"
            class="edit"
            v-model="item.title"
            v-todo-focus="item === editedTodo"
            @blur="doneEdit(item)"
            @keyup.enter="doneEdit(item)"
            @keyup.escape="cancelEdit(item)"
        >
      </li>
    </ul>
    <p class="filters">
      <span
        @click="visibility = 'all'"
        :class="{selected:visibility === 'all'}"
      >All</span>
      <span
          @click="visibility = 'fire'"
          :class="{selected:visibility === 'fire'}"
      >Acitive</span>
      <span
          @click="visibility = 'completed'"
          :class="{selected:visibility === 'completed'}"
      >Competed</span>
    </p>
  </div>
</template>

<script>
import { reactive, toRefs , computed , watchEffect} from "vue";

const filters = {
  all(todos){
    return todoszip
  },
    fire(todos){
  return todoszip.filter(item => !item.completedyesno)
},
  completed(todos){
    return todoszip.filter(item => item.completedyesno )
  }
}

const todoStorage = {
  fetch(){
    let todos = JSON.parse(localStorage.getItem("vue3-todos") || "[]")
    todoszip.forEach((todo, index) => {
      todo.id = index + 1;
    })
    return todoszip;
  },
  save(todos){
    localStorage.setItem("vue3-todos",JSON.stringify(todoszip));
  }
}

export default {
  setup() {
    const state = reactive({
      newTodo:'',
      todos: todoStorage.fetch(),
      beforeEditCache:'', //缓存前的编辑
      editedTodo:null, //正在编辑的todo
      visibility:'all',
      filterdTodos:computed(() =>{
        return filters[state.visibility](state.todos)
      })
    })

    //添加item
    function addTodo(){
      state.todos.push({
        id:state.todos.length+1,
        title: state.newTodo,
        completed:true
      })
      state.newTodo='';
    }
    //删除item
    function removeitem(item){
      state.todos.splice(state.todos.indexOf(item),1)
      // state.todos.splice(item,1)
    }

    //输入框显示隐藏
    function editTodo(item){
      state.beforeEditCache = item.title
      state.editedTodo = item

    }
    function cancelEdit(item){
        item.title = state.beforeEditCache
        state.editedTodo= null
    }
    function doneEdit(item){
      state.editedTodo= null
    }

    watchEffect(() =>{
      todoStorage.save(state.todos)
    })

    return{
      ...toRefs(state),
      addTodo,
      removeitem,
      editTodo,
      cancelEdit,
      doneEdit
    }
  },
  directives:{
    "todo-focus":(el,{ value })=>{
      if (value){
        el.focus();
      }
    }
  }
}
</script>

<style scoped>
  .opens{
    width: 50%;
    margin: 0 auto;
  }

  @media (max-width: 500px) {
    .opens{
      width: 100%;
    }
  }
  .opens ul li{
    float: left;
    width: 100%;
  }
  .opens ul li input{
    margin-right: 20px;
    float: left;
  }

  .opens ul li span{
    float: left;
  }

  .opens ul li label{
    margin: 0 20px;
  }

  .opens ul li button{
    float: right;
  }

  .completed label{
    text-decoration: line-through;
  }



  .edit,
  .editing .view{
    display: none;
  }

  .editing .edit{
    display: block;
    margin-left: 55px;
  }

  p.filters{
    width: 100%;
    display: block;
    float: left;
  }

  .filters > span{
    margin: 0 20px;
    border: 1px solid transparent;
  }
  .filters > span.selected{
    border-color: violet;
  }
</style>