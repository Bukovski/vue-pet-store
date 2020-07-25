<template>
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
          <th class="cart-title-th">
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
          <td>
          </td>
          <td colspan="2">
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
</template>

<script>
  import { mapGetters } from 'vuex';
  
  
  export default {
    name: "Cart",
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
    computed: {
      ...mapGetters({
        getCartTotalPrice: 'getCartTotalPrice',
        cartProducts: 'getCartProducts',
      }),
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      getCartTotalPrice(price) {
        if (price.toString() === "0") {
          this.$router.push("/");
        }
      }
    },
  }
</script>

<style scoped>
  .table thead th {
    text-align: center;
  }
  .table td {
    vertical-align: inherit;
  }
  .cart-wrapper-title {}
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
  
  @media (max-width: 680px) {
    .table>thead>tr>th,
    .table>tbody>tr>td {
      padding: 0;
    }
    
    .remove-wrap {
      position: relative;
      padding: 0;
      width: 0;
      vertical-align: inherit;
    }
    .remove-button {
      position: absolute;
      top: 5px;
      left: -7px;
      padding: 0 5px;
      background-color: transparent;
    }
    .remove-button:hover {
      background-color: transparent;
    }
    .remove-sign {
      top: 3px;
      font-size: 17px;
      color: #c60000;
    }
    
    .cart-title-th {
      padding: 8px 0;
    }
    .cart-image {
      display: none;
    }
    .cart-title {
      font-size: 16px;
    }
    .btn-info {
      padding: 5px 8px;
    }
  }
</style>