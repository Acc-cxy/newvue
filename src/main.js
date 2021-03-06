import { createApp , createRenderer,h } from 'vue'
import App from './App.vue'
import store from "./store";
import './index.css'
import CanvasApp from "./CanvasApp.vue";
import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import todos from "./components/todos.vue";
import index from "./components/index.vue";
import NotFound from "./components/NotFound.vue";


const router = createRouter({
    history:createWebHistory(),
    routes:[
        {path:"/",name:"index", component:index},
        {path:"/todos",name:"todos", component:todos},
        {
            path:"/:pathMatch(.*)*",
            name:"not-found",
            component:NotFound
        }
    ]
})


//特性：router
router.addRoute({
    path:"/about",
    name:"about",
    component:() =>import('./components/about.vue')
})
router.addRoute('about',{
    path:"/about/info",
    name:"/info",
    component:{
        render() {
            return h('div','info page')
        }
    }
})

createApp(App)
    .use(router)
    .use(store)
    .component("comp",{render: () =>h("div", "i am comp")})
    .directive('highlight',{
        beforeMount(el,binding,vnode){
            el.style.background = binding.value
        }
    })
    .mount('#app');

const nodeOps = {
    insert: (child, parent, anchor) => {
        child.parent = parent;
        if (!parent.childs) { // 格式化父子关系
            parent.childs = [child]
        } else {
            parent.childs.push(child);
        }
        if (parent.nodeType == 1) {
            draw(child); // 开始绘图
            if (child.onClick) {
                ctx.canvas.addEventListener('click', () => {
                    child.onClick();
                    setTimeout(() => {
                        draw(child)
                    }, 0);
                }, false)
            }
        }
    },
    remove: child => { },
    createElement: (tag, isSVG, is) => {
        return { tag }
    },
    createText: text => { },
    createComment: text => { },
    setText: (node, text) => { },
    setElementText: (el, text) => { },
    parentNode: node => { },
    nextSibling: node => { },
    querySelector: selector => { },
    setScopeId(el, id) { },
    cloneNode(el) { },
    insertStaticContent(content, parent, anchor, isSVG) { },
    patchProp(el, key, prevValue, nextValue) {
        el[key] = nextValue;
    },
};

const draw = (el, noClear) => {
    if (!noClear) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    if (el.tag == 'piechart') {
        let { data, r, x, y } = el;
        let total = data.reduce((memo, current) => memo + current.count, 0);
        let start = 0,
            end = 0;
        data.forEach(item => {
            end += item.count / total * 360;
            drawPieChart(start, end, item.color, x, y, r);
            drawPieChartText(item.name, (start + end) / 2, x, y, r);
            start = end;
        });
    }
    el.childs && el.childs.forEach(child => draw(child, true));
}

const d2a = (n) => {
    return n * Math.PI / 180;
}
const drawPieChart = (start, end, color, cx, cy, r) => {
    let x = cx + Math.cos(d2a(start)) * r;
    let y = cy + Math.sin(d2a(start)) * r;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.arc(cx, cy, r, d2a(start), d2a(end), false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}
const drawPieChartText = (val, position, cx, cy, r) => {
    ctx.beginPath();
    let x = cx + Math.cos(d2a(position)) * r / 1.25 - 20;
    let y = cy + Math.sin(d2a(position)) * r / 1.25;
    ctx.fillStyle = '#000';
    ctx.font = '20px 微软雅黑';
    ctx.fillText(val, x, y);
    ctx.closePath();
}

let renderer = createRenderer(nodeOps);
let ctx;
let canvas;

function createCanvasApp(App){
    const app = renderer.createApp(App)
    const mount = app.mount
    app.mount = function (selector){
        //创建并插入画布
        canvas = document.createElement('canvas')
        ctx = canvas.getContext('2d')
        //设置画布基础属性
        canvas.width = 400
        canvas.height = 400
        document.querySelector(selector).appendChild(canvas)

        //执行默认mount
        mount(canvas)
    }
    return app
}

createCanvasApp(CanvasApp).mount('#demo')