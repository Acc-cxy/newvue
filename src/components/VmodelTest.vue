<template>
  <div @click="$emit('update:add',add + 10)">
    num:{{add}}
  </div>
</template>

<script>
export default {
  name: "VmodelTest",
  props:{
    add:{
      type:Number,
      default:0
    }
  }
}
</script>

<style scoped>

</style>