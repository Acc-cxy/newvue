<template>
    <div :class="{active:isActive}" @click="navigate">
      {{route.name}}
    </div>
</template>

<script>
import { RouterLink, useLink} from "vue-router";
export default {
  props:{
    ...RouterLink.props,
    inactiveClass:String
  },
  setup(props){
    const { route, href, isActive, isExactActive,navigate } = useLink(props)
    console.log(route, href, isActive, navigate,isExactActive)

    return {route,isActive,navigate};
  }
}
</script>

<style scoped>
  .active{
    background: coral;
  }
</style>