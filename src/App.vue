<template>
  <img src="./assets/logo.png"  alt="">
<!--  <HelloWorld msg="Hello Vue 3.0 + Vite" />-->
  <!--  数据传输-->
<!--  <HoMe></HoMe>-->

 <!-- <SeTip></SeTip> -->

<!--  <mitttest></mitttest>-->

<!--  demo-->
<!--  <todos></todos>-->

<composition-api></composition-api>

<!--  router启动-->
 <!-- <router-view></router-view> -->
	<router-view v-slot="{Component}">
      <keep-alive>
          <component :is="Component"></component>
      </keep-alive>
  </router-view>
  
  
</template>


<script>
import HelloWorld from './components/HelloWorld.vue';
import HoMe from "./components/HoMe.vue";
import SeTip from "./components/SeTip.vue";
import mitttest from "./components/mitttest.vue";
import todos from "./components/todos.vue";
import index from "./components/index.vue";
import CompositionApi from "./components/CompositionApi.vue"


export default {
  name: 'App',
  components: {
    HelloWorld,
    HoMe,
    SeTip,
    mitttest,
    todos,
    index,
	CompositionApi
  }
}
</script>
