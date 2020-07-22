const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
const INCREMENT_CART_ITEM_QUANTITY = "INCREMENT_CART_ITEM_QUANTITY";


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
  }
}



export default {
  state,
  getters,
  actions,
  mutations
}
