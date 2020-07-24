import store from '../store'

export default function (to, from, next) {
  if (store.getters.getCartAll.length) {
    next()
  } else {
    next('/')
  }
}