import Vue from 'vue';
import { Plugin } from 'vue-fragment';
import VueLoaders from 'vue-loaders';
import 'vue-loaders/dist/vue-loaders.css';

import router from './router';
import store from './store';
import "./filters";

import App from './App.vue';


Vue.use(Plugin);
Vue.use(VueLoaders);

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
