<template>
<!--  <HelloWorld msg="Hello Vue 3.0 + Vite" />-->
<!--  <HoMe></HoMe>-->
  <SeTip></SeTip>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import HoMe from "./components/HoMe.vue";
import SeTip from "./components/SeTip.vue";
import apitest from "./components/apitest.vue";


export default {
  name: 'App',
  components: {
    HelloWorld,
    HoMe,
    SeTip,
    apitest
  }
}
</script>
