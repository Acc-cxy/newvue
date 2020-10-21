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
import { reactive, toRefs ,computed} from "vue";

const filters = {
  all(todos){
    return todos
  },
    fire(todos){
  return todos.filter(item => !item.completedyesno)
},
  completed(todos){
    return todos.filter(item => item.completedyesno )
  }
}

export default {
  setup() {
    const state = reactive({
      newTodo:'',
      todos: [
        {
          id:1,
          title:'vue3学习'
        },
        {
          id:2,
          title:'案例测试'
        },
        {
          id:3,
          title: 'setup方法'
        }
      ],
      beforeEditCache:'', //缓存前的编辑
      editedTodo:null, //正在编辑的todo
      visibility:'all',
      filterdTodos:computed(() =>{
        return filters[state.visibility](state.todos)
      })

    })

    function addTodo(){
      state.todos.push({
        id:state.todos.length+1,
        title: state.newTodo,
        completed:false
      })
      state.newTodo='';
    }

    function removeitem(item){
      state.todos.splice(state.todos.indexOf(item),1)
      // state.todos.splice(item,1)
    }

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