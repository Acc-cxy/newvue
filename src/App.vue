<template>
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <HoMe></HoMe>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import HoMe from "./components/HoMe.vue";

export default {
  name: 'App',
  components: {
    HelloWorld,
    HoMe
  }
}
</script>
