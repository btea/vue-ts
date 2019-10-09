import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);


import './error/error';
import App from './App.vue';
import router from './router/router'

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})