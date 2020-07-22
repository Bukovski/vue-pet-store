<template>
  <div v-if="loading" style="height: 100vh;">
    <div style="color: red; position: absolute; left: 50%; top: 50%;">
      <vue-loaders-pacman color="currentColor" scale="1"></vue-loaders-pacman>
    </div>
  </div>
  
  <main v-else>
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
                :to="{ name : 'Product', params: { id: product.id }}"
            >
              {{ product.title }}
            </router-link>
            
            <p class="card-text" :inner-html.prop="product.description | first50Chars"></p>
            
            <inventory-message :availableProduct="(product.availableInventory - getCartCount(product.id))"/>
            
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
</template>

<script>
  import { mapGetters } from 'vuex';
  import MyHeader from './Header.vue';
  import InventoryMessage from './InventoryMessage.vue';
  
  
  export default {
    name: 'my-main',
    components: { MyHeader, InventoryMessage },
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
      },
      loading () {
        return this.$store.getters.loading
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
</style>