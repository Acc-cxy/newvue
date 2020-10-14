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
<!--  <vmodel-test :add="number" @update:add="number=$event"></vmodel-test>-->

    <!--  组件。。-->
  <render-test v-model:add="number"></render-test>
</template>

<script>
import btnteleport from "./btnteleport.vue";
import FragEmit from "./FragEmit.vue";
import { reactive, computed, onMounted, onUnmounted, ref, toRefs,h} from 'vue';
import VmodelTest from "./VmodelTest.vue";
export default {
  name: "SeTip",
  components:{
    btnteleport,
    FragEmit,
    VmodelTest,
    RenderTest:{
      props:{
        add:{
          type:Number,
          default:0
        }
      },
      render() {
        return h("div",[
          h("div",{ onClick:this.onClickyou}, 'i am ${{this.add}}')
        ])
      },
      methods:{
        onClickyou(){
          this.$emit('update:add',add+10)
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
    const {counter,computedcounter} = useCounter()
    const msg = ref("some time");
    return {counter,computedcounter,msg};
  },
  methods:{
    onClick(){
      console.log('click me!')
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
  })

  return toRefs(data)
}
</script>

<style scoped>

</style>