<template>
  <p>{{msg}}</p>
  <p>{{counter}}</p>
  <p>{{computedcounter}}</p>
    <!--  传送门-->
  <btnteleport></btnteleport>
    <!--  Emits选项-->
  <frag-emit @my-click="onClick"></frag-emit>
    <!--  v-model的使用-->
  <vmodel-test v-model:add="number"></vmodel-test>
    <!--  上述语法糖-->
  <vmodel-test :add="number" @update:add="number=$event"></vmodel-test>
    <!--  组件。。-->
  <render-test v-model:add="number">
<!--    <template v-slot="default">ss</template>-->
<!--    <template v-slot="content">2</template>-->
  </render-test>

    <!--  函数式组件-->
  <fun-tion level="3">这是一个h函数 看控制台</fun-tion>

    <!--  自定义API-->
  <p v-highlight="'green'">highli</p>


    <!--  transition-->
  <transition-test v-slot></transition-test>

    <!--  mitt编程方式发送和监听-->
  <button @click="sendMsg">mitt</button>
</template>

<script>
import btnteleport from "./btnteleport.vue";
import FragEmit from "./FragEmit.vue";
import FunTion from "./FunTion.vue";
import { reactive, computed, onMounted, onUnmounted, ref, toRefs,h} from 'vue';
import VmodelTest from "./VmodelTest.vue";
import TransitionTest from "./TransitionTest.vue";


import mitt from 'mitt';

export const emitter = mitt()

export default {
  name: "SeTip",
  components:{
    btnteleport,
    FragEmit,
    VmodelTest,
    FunTion,
    TransitionTest,
    RenderTest:{
      props:{
        add:{
          type:Number,
          default:0
        }
      },
      render() {
        // this.$slots.default();
        // this.$slots.content();
        return h("div",[
          h("div",{ onClick:this.onClickyou}, [
            `i am ${this.add}`,
             // this.$slots.default(),
             // this.$slots.content()
          ],)
        ]);
      },
      methods:{
        onClickyou(){
          this.$emit("update:add",this.add+10);
        }
      }
    }
  },
  data(){
    return{
      number:0
    }
  },
  setup(){
    const {counter,computedcounter} = useCounter();
    const msg = ref("some time");
    return {counter,computedcounter,msg,renyi}
  },
  methods:{
    onClick(){
      console.log('click me!')
    },
    sendMsg() {
      emitter.emit('someEvent','foooo')
    }
  }
}

function useCounter(){
  const data = reactive({
    counter:1,
    computedcounter:computed(()=>data.counter*2)
  })



  let timer;
  onMounted(()=>{
    timer = setInterval(()=>{
      data.counter++;
    },1000)
  })

  onUnmounted(()=>{
    clearInterval(timer)
    console.log(data.counter)
  })

  return toRefs(data)
}
</script>

<style scoped>

</style>