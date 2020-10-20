<template>
  <h1>{{ msg }}</h1>
  <div id="basic-event">
    <button @click="counter += 1">Add 1={{counter}}</button>
    <p>The button above has been clicked {{ counter }} times.</p>
  </div>
  <comp></comp>

</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      count: 0,
      counter: 1
    }
  }
}
</script>

<style scoped>
.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
}
</style>