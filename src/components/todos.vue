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
      <li v-for="item in todos"
          :key="item.id"
          :class="{completed:item.completedyesno,editing:item == editedTodo }"
      >
        <!--       绑定完成待办 -->
        <div class="view">
          <input type="checkbox" v-model="item.completedyesno">
          <label @click="editTodo(item)">{{item.title}}</label>
          <button @click="removeitem(item)">删除</button>
        </div>

        <!--        编辑状态-->
        <input
            type="text"
            class="edit"
            v-model="item.title"
            @blur="doneEdit(item)"
            @keyup.enter="doneEdit(item)"
            @keyup.escape="cancelEdit(item)"
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs} from "vue";

export default {
  setup() {
    const state = reactive({
      newTodo:'',
      todos: [
        {
          id:1,
          title:'vue3学习'
        }
      ],
      beforeEditCache:'',
      editedTodo:null
    })

    function addTodo(){
      state.todos.push({
        id:state.todos.length+1,
        title: state.newTodo,
        completed:false
      })
      state.newTodo=''
    }

    function removeitem(item){
      state.todos.splice(state.todos.indexOf(item),1)
      // state.todos.splice(item,1)
    }

    function editTodo(item){
      console.log('sfs')
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
  .opens ul li input{
    margin-right: 10px;
  }

  .opens ul li label{
    margin: 0 20px;
  }

  .completed label{
    text-decoration: line-through;
  }

  .editing .view{
    display: none;
  }

  .edit{
    display: none;
  }

  .editing .edit{
    display: block;
  }
</style>