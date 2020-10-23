<template>
 <div>
   <p>counter: {{counter}}</p>
   <p>doubleCounter: {{doubleCounter}}</p>
   <p ref="desc"></p>
 </div>
</template>

<script>
import {
 reactive,
 computed,
 watch,
 ref,
 toRefs,
 onMounted,
 onUnmounted,
} from "vue";

export default {
 setup() {
   const data = reactive({
     counter: 10,
     doubleCounter: computed(() => data.counter * 2),
  });

   let timer

   onMounted(() => {
     timer = setInterval(() => {
       data.counter--
    }, 1000);
  })

   onUnmounted(() => {
     clearInterval(timer)
  })

   const desc = ref(null)

   watch(()=>data.counter, (val,oldVal)=>{
     desc.value.textContent = `counter change from ${oldVal} to ${val}`
     if(val == 0){
       clearInterval(timer)
       alert('新年快乐')
     }
  })

   return {...toRefs(data), desc};
},
};
</script>