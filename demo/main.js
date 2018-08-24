import Vue from 'vue'
import App from './App.vue'
// import LetItSnow from '../src/index';
import LetItSnow from '../dist/vue-let-it-snow.umd';

Vue.use(LetItSnow);

new Vue({
    el: '#app',
    render: h => h(App)
})