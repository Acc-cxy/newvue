<script>
  import { h } from "vue";
  //vue3函数式组件只能用函数方式表明
  function Heading(props, context){
    // console.log(context);
    return h(`h${props.level}`,context.attrs,context.slots);
  }

  Heading.props = ["level"];
  export default Heading;
</script>
