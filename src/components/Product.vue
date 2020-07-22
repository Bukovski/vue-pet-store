<template>
  <div v-if="loading || !product.id" style="height: 100vh;">
    <div style="color: red; position: absolute; left: 50%; top: 50%;">
      <vue-loaders-pacman color="currentColor" scale="1"></vue-loaders-pacman>
    </div>
  </div>
  
  <fragment v-else>
    <h1>This is the id {{ $route.params.id }}</h1>
    
    <div class="row">
      <div class="col-md-10 col-md-offset-1">
        <div class="col-md-6">
          <img
              class="product"
              :alt="product.title"
              :src="require(`@/assets/images/${ product.image }`)"
          >
        </div>
        <div class="col-md-6 description">
          <h1>{{ product.title }}</h1>
          
          <p v-html="product.description"></p>
          <p class="price">{{ product.price | formatPrice }}</p>
          
          <button @click="edit">Edit Product</button>
          
          <router-view></router-view>
        </div>
      </div>
    </div>
  </fragment>
</template>

<script>
  import { mapGetters } from 'vuex';
  import MyHeader from './Header.vue';
  
  
  export default {
    name: 'Product',
    components: { MyHeader },
    data() {
      return {
        product: {}
      }
    },
    methods: {
      edit() {
        this.$router.push({name: 'Edit'})
      }
    },
    computed: {
      ...mapGetters([
        'getProductById'
      ]),
      loading () {
        return this.$store.getters.loading
      }
    },
    async created () {
      const idRouter = this.$route.params.id;
      
      if (!this.$store.state.products.length) {
        await this.$store.dispatch('initStore')
      }
      
      this.product = this.getProductById(idRouter);
    }
  }
</script>

<style scoped>
  .description {
    margin-top: 50px;
    font-size: 20px;
  }
</style>