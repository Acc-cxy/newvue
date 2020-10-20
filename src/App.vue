<template>
  <img src="./assets/logo.png" alt="">
<!--  <HelloWorld msg="Hello Vue 3.0 + Vite" />-->
  <!--  数据传输-->
<!--  <HoMe></HoMe>-->

<!--  <SeTip></SeTip>-->

<!--  <mitttest></mitttest>-->

<!--  demo-->
  <todos></todos>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import HoMe from "./components/HoMe.vue";
import SeTip from "./components/SeTip.vue";
import mitttest from "./components/mitttest.vue";
import todos from "./components/todos.vue";


export default {
  name: 'App',
  components: {
    HelloWorld,
    HoMe,
    SeTip,
    mitttest,
    todos
  }
}
</script>
