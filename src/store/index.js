import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import products from './modules/products';
import cart from './modules/cart';
import shared from './modules/shared';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    products,
    cart,
    shared,
  },
  plugins: [ createPersistedState({
    key: 'pet-shop-vue',
    paths: [ 'cart' ]
  }) ],
});
