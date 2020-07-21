<template>
  <fragment>
    <my-header></my-header>
    
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
  import axios from 'axios';
  import MyHeader from './Header.vue';
  
  
  export default {
    name: 'ProductId',
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
    async created () {
      try {
        const response = await axios.get('http://localhost:3000/products')
        const idRouter = this.$route.params.id;
        
        response.data.every(dataObj => {
          if (dataObj.id.toString() === idRouter.toString()) {
            this.product = dataObj;
            
            return false;
          }
          
          return true;
        })
      } catch (e) {
        throw e
      }
    }
  }
</script>

<style scoped>
  .description {
    margin-top: 50px;
    font-size: 20px;
  }
</style>