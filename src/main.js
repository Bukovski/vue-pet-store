import Vue from 'vue';
import { Plugin } from 'vue-fragment';
import 'vue-loaders/dist/vue-loaders.css';
import VueLoaders from 'vue-loaders';
import "./filters";
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Plugin);
Vue.use(VueLoaders);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
