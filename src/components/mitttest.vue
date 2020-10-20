<template>
<!--  <div>{{msg}}</div>-->
</template>

<script>

import { emitter } from "./SeTip.vue";

export default {
  name: "mitttest",
  mounted() {
    emitter.on('someEvent',msg =>{
      console.log(msg)
    })
  }
}
</script>

<style scoped>

</style>