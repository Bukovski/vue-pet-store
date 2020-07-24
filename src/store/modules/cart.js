const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
const INCREMENT_CART_ITEM_QUANTITY = "INCREMENT_CART_ITEM_QUANTITY";
const DECREMENT_CART_ITEM_QUANTITY = "DECREMENT_CART_ITEM_QUANTITY";
const REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART";
const CLEAR_CART = "CLEAR_CART";


const state = {
  cart: []
}

const getters = {
  getCartAll: state => state.cart,
  getCartProducts: (state, getters, rootState) => {
    return state.cart.map(({ id, quantity }) => {
      const product = rootState.products.products.find(product => product.id === id)
      
      return {
        ...product,
        quantity
      }
    })
  },
  getCartTotalPrice: (state, getters) => {
    return getters.getCartProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  },
  getCartTotalQuantity: (state) => {
    if (state.cart.length) {
      return state.cart.reduce((accumulator, product) => {
        return accumulator += product.quantity
      }, 0)
    }
    
    return 0;
  }
}

const mutations = {
  [ ADD_PRODUCT_TO_CART ] (state, { id }) {
    state.cart.push({
      id,
      quantity: 1
    })
  },
  [ INCREMENT_CART_ITEM_QUANTITY ] (state, { id }) {
    const cartItem = state.cart.find(item => item.id === id)
    cartItem.quantity++
  },
  [ DECREMENT_CART_ITEM_QUANTITY ] (state, { id }) {
    const cartItem = state.cart.find(item => item.id === id)
    cartItem.quantity--
  },
  [ REMOVE_ITEM_FROM_CART ] (state, { id }) {
    const cartFilter = state.cart.filter(item => item.id !== id)
  
    state.cart = cartFilter
  },
  [ CLEAR_CART ] (state) {
    state.cart = []
  },
}

const actions = {
  addProductToCart ({ state, commit }, product) {
    if (product.availableInventory > 0) {
      const cartItem = state.cart.find(item => item.id === product.id)
      
      if (!cartItem) {
        commit(ADD_PRODUCT_TO_CART, { id: product.id })
      } else {
        commit(INCREMENT_CART_ITEM_QUANTITY, cartItem)
      }
    }
  },
  addQuantityProductToCart({ state, commit }, product) {
    const cartItem = state.cart.find(item => item.id === product.id)
    
    if (product.availableInventory > cartItem.quantity) {
      commit(INCREMENT_CART_ITEM_QUANTITY, cartItem)
    }
  },
  subtractQuantityProductToCart({ state, commit }, product) {
    const cartItem = state.cart.find(item => item.id === product.id)
      
    if (cartItem.quantity > 1) {
      commit(DECREMENT_CART_ITEM_QUANTITY, cartItem)
    } else {
      commit(REMOVE_ITEM_FROM_CART, product)
    }
  },
  removeProductFromCart({ commit }, product) {
    commit(REMOVE_ITEM_FROM_CART, product)
  },
  clearCart({ commit }) {
    commit(CLEAR_CART)
  }
}



export default {
  state,
  getters,
  actions,
  mutations
}
