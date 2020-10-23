<template>
  <div>
    <p><nav-link to="/" tag="button" ></nav-link></p>
    <p><nav-link to="/about" tag="button"></nav-link></p>
    <p><nav-link to="/todos" tag="button"></nav-link></p>
  </div>
</template>

<script>
import NavLink from "./NavLink.vue";
export default {
name: "index",
  components:{
    NavLink
  }
}
</script>

<style scoped>

</style>