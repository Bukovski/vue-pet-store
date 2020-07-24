<template>
  <loader v-if="loading"/>
  
  <div class="container" v-else>
    <div class="row">
      <h2>Cart</h2>
      
      <div class="col-md-10 col-md-offset-1">
        
        <table class="table">
          <thead>
          <tr>
            <th></th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Amount</th>
          </tr>
          </thead>
          <tbody>
          
          <tr v-for="product of cartProducts" :key="product.id">
            <th class="remove-wrap">
              <span class="remove-button" @click="removeProduct(product)">
                <span class="remove-sign">✕</span>
              </span>
            </th>
            <th>
              <div class="cart-wrapper-title">
                <img
                   alt="image"
                   :src="require(`@/assets/images/${ product.image }`)"
                   class="cart-image">
                <router-link
                    tag="span"
                    class="cart-title"
                    :to="{ name : 'Product', params: { id: product.id }}"
                >
                  {{ product.title }}
                </router-link>
              </div>
            </th>
            <td>{{ product.price | formatPrice }}</td>
            <td>
              <div class="quantity">
                <span class="quantity-arrow" @click="subtractQuantity(product)">❮</span>
                <span class="quantity-value">{{ product.quantity }}</span>
                <span class="quantity-arrow" @click="addQuantity(product)">❯</span>
              </div>
            </td>
            <td>{{ (product.price * product.quantity) | formatPrice }}</td>
          </tr>
          
          
          <tr>
            <td colspan="2">
            </td>
            <td>
              <router-link
                  class="btn btn-info"
                  tag="button"
                  to="/form"
              >
                Checkout
              </router-link>
            </td>
            <td>
              <span class="cart-total-title">Total:</span>
            </td>
            <td>
              <span class="cart-total">{{ getCartTotalPrice | formatPrice }}</span>
            </td>
          </tr>
          </tbody>
        </table>
        
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Loader from './Loader.vue';


  export default {
    name: "Cart",
    components: { Loader },
    computed: {
      ...mapGetters({
        getCartTotalPrice: 'getCartTotalPrice',
        cartProducts: 'getCartProducts',
      }),
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      addQuantity(product) {
        this.$store.dispatch('addQuantityProductToCart', product);
      },
      subtractQuantity(product) {
        this.$store.dispatch('subtractQuantityProductToCart', product);
      },
      removeProduct(product) {
        this.$store.dispatch('removeProductFromCart', product);
      },
    },
    watch: {
      getCartTotalPrice(price) {
        if (price.toString() === "0") {
          this.$router.push("/");
        }
      }
    },
    created () {
      this.$store.dispatch('initStore');
    }
  }
</script>

<style scoped>
  .table thead th {
    text-align: center;
  }
  .table td {
    vertical-align: inherit;
  }
  .cart-wrapper-title {
  
  }
  .cart-image {
    width: 120px;
    height: auto;
    background-color: gray;
  }
  .cart-title {
    font-size: 18px;
    margin-left: 15px;
    cursor: pointer;
  }
  
  .remove-wrap {
    width: 30px;
    padding-top: 30px;
  }
  .remove-button {
    position: relative;
    padding: 5px;
    border-radius: 50%;
    background-color: #d1d1d1;
    cursor: pointer;
    transition: .25s ease-in;
  }
  .remove-button:hover {
    background-color: #c60000;
  }
  .remove-sign {
    position: relative;
    top: 3px;
    font-size: 20px;
    color: #fff;
  }
  
  .quantity {
    text-align: center;
  }
  .quantity-arrow {
    user-select: none;
    cursor: pointer;
  }
  .quantity-value {
    margin: 0 10px;
  }
  
  .cart-total-title {
    font-weight: bold;
    font-size: 20px;
  }
  .cart-total {
    font-weight: bold;
    font-size: 18px;
  }
</style>