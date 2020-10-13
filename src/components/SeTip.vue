<template>
  <p>{{msg}}</p>
  <p>{{counter}}</p>
  <p>{{computedcounter}}</p>
  <btnteleport></btnteleport>
</template>

<script>
import btnteleport from "./btnteleport.vue";
import { reactive, computed, onMounted, onUnmounted, ref, toRefs} from 'vue'
export default {
  name: "SeTip",
  components:{
    btnteleport
  },
  setup(){
    const {counter,computedcounter} = useCounter()
    const msg = ref("some time");
    return {counter,computedcounter,msg};
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