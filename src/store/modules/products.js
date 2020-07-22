import axios from 'axios';


const SET_PRODUCTS = "SET_PRODUCTS";
const SET_PRODUCTS_INVENTORY = "SET_PRODUCTS_INVENTORY";


const state = {
  products: [],
};

const getters = {
  getProducts: state => state.products,
  getProductById: (state) => (idRouter) => {
    let product = {};
  
    if (state.products.length) {
      state.products.every(dataObj => {
        if (dataObj.id.toString() === idRouter.toString()) {
          product = dataObj;
        
          return false;
        }
      
        return true;
      })
    }
  
    return product
  }
};

const mutations = {
  [ SET_PRODUCTS ] (state, products) {
    state.products = products;
  },
  [ SET_PRODUCTS_INVENTORY ] (state, { id, availableInventory }) {
    const product = state.products.find(product => product.id === id)
    
    product.availableInventory = availableInventory
  }
};

const actions = {
  initStore: async ({ commit }) => {
    try {
      const response = await axios.get('http://localhost:3000/products')
      
      commit(SET_PRODUCTS, response.data)
    } catch (e) {
      throw e
    }
  },
  subtractProductAvailable: ({ commit }, { id, availableInventory }) => {
    commit(SET_PRODUCTS_INVENTORY, { id, availableInventory })
  } 
};



export default {
  state,
  getters,
  actions,
  mutations,
}
