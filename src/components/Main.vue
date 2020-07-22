<template>
  <div>
    <!--    <my-header :cartItemCount="cartItemCount"></my-header>-->
    
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
              
              <p class="card-text" v-html="product.description"></p>
              
              <transition name="bounce" mode="out-in">
                <span
                    class="inventory-message"
                    v-if="(product.availableInventory - getCartCount(product.id)) === 0"
                    key="0"
                >
                  All Out!
                </span>
                <span
                    class="inventory-message"
                    v-else-if="(product.availableInventory - getCartCount(product.id)) < 6"
                    key="1"
                >
                  Only {{ product.availableInventory - getCartCount(product.id) }} left!
                </span>
                <span class="inventory-message" v-else key="">Buy Now!</span>
              </transition>
              
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
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import MyHeader from './Header.vue';
  
  
  export default {
    name: 'my-main',
    components: { MyHeader },
    data() {
      return {
        // products: [],
        // cart: []
      }
    },
    methods: {
      getCartCount(id) {
        if (this.getCartAll.length) {
          let counter = 0
          
          this.getCartAll.forEach(item => {
            if (item.id === id) {
              counter = item.quantity;
            }
          })
          
          return counter;
        }

        return 0;
      },
      addToCart(product) {
        this.$store.dispatch("addProductToCart", product)
      },
      canAddToCart(product) {
        return this.getCartCount(product.id) > (product.availableInventory - 1)
      },
    },
    computed: {
      ...mapGetters({
        getCartAll: 'getCartAll',
        products: 'getProducts'
      }),
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
    created () {
      this.$store.dispatch('initStore');
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
    display:inline-block;
    font-weight: bold;
    font-size: 18px;
    color: #1E95EA;
  }
  
  .bounce-enter-active {
    animation: shake 0.72s cubic-bezier(.37,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
  }
  
  @keyframes shake {
    10%, 90% {
      color: red;
      transform: translate3d(-1px, 0, 0);
    }
    
    20%, 80% {
      transform: translate3d(2px, 0, 0);
    }
    
    30%, 50%, 70% {
      color: red;
      transform: translate3d(-4px, 0, 0);
    }
    
    40%, 60% {
      transform: translate3d(4px, 0, 0);
    }
  }
</style>