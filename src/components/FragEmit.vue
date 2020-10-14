<template>
  <div>
    <div @click="$emit('my-click')">
      <h3>自定义事件</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "FragEmit",
  emits:['my-click']
}
</script>

<style scoped>

</style>