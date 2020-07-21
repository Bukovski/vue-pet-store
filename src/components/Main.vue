<template>
  <fragment>
    <my-header :cartItemCount="cartItemCount"></my-header>
    
    <main>
      <div class="row">
        <div class="col-md-10 col-md-offset-1">
          <div
              class="card col-lg-4 col-md-6 col-sm-12 card-frame"
              v-for="product in sortProducts"
              :key="product.id"
          >
            <img
                class="card-img-top"
                alt="image"
                :src="require(`@/assets/images/${ product.image }`)"
            />
            
            <div class="card-body">
              <router-link
                  tag="h3"
                  class="card-title"
                  :to="{ name : 'ProductId', params: { id: product.id }}"
              >
                {{ product.title }}
              </router-link>
              
              <!--            <h3 class="card-title">{{ product.title }}</h3>-->
              
              <p class="card-text" v-html="product.description"></p>
              
              <span class="inventory-message" v-html="shoppingTips(product)"></span>
              
              <p class="price">{{ product.price | formatPrice }}</p>
              
              <button
                  class=" btn btn-primary btn-lg"
                  @click="addToCart(product)"
                  :disabled="canAddToCart(product)"
              >
                Add to cart
              </button>
            
            
            </div>
          </div>
        </div>
      </div>
    </main>
  </fragment>
</template>

<script>
  import axios from 'axios';
  import MyHeader from './Header.vue';
  
  
  export default {
    name: 'my-main',
    components: { MyHeader },
    data() {
      return {
        products: [],
        cart: [],
      }
    },
    methods: {
      addToCart(product) {
        this.cart.push(product)
      },
      canAddToCart(product) {
        return this.cartCount(product.id) > (product.availableInventory - 1)
      },
      cartCount(id) {
        if (this.cart.length) {
          return this.cart.reduce((accumulator, available) => {
            if (available.id === id) {
              return accumulator += 1
            }
            
            return accumulator;
          }, 0)
        }
        
        return 0;
      },
      shoppingTips(product) {
        if (product.availableInventory - this.cartCount(product.id) === 0) return "All Out!";
        if (product.availableInventory - this.cartCount(product.id) < 10) return `Only ${ product.availableInventory - this.cartCount(product.id) } left!`;
        return "Order Now!";
      },
      submitForm() {
        console.log('Form Submitted', this.order);
      },
    },
    computed: {
      cartItemCount() {
        return this.cart.length || '';
      },
      sortProducts() {
        if (this.products.length > 0) {
          const saveProductsArray = this.products.slice(0);
          
          const compare = (a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
            if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
            return 0;
          }
          
          return saveProductsArray.sort(compare);
        }
      }
    },
    async created () {
      try {
        const response = await axios.get('http://localhost:3000/products')
        
        this.products = response.data;
      } catch (e) {
        throw e
      }
    }
  }
</script>

<style scoped>
  .price {
    font-size: 25px;
  }
  
  .card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
  }
  
  .card-frame {
    padding: 10px 2px;
    box-sizing: border-box;
  }
  
  .card-title {
    cursor: pointer;
    color: #1E95EA;
  }
  
  .inventory-message {
    font-weight: bold;
    font-size: 18px;
    color: #d60000;
  }
</style>