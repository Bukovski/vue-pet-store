<template>
  <header>
    <div class="navbar navbar-default">
      <div class="navbar-header">
        <h1 class="site-title">
          <router-link class="site-link" :to="{ name: 'Main' }">{{ siteName }}</router-link>
        </h1>
      </div>
      <div class="nav navbar-nav navbar-right cart">
        <router-link
            class="btn btn-default btn-lg"
            :disabled="!cartItemCount"
            active-class="active"
            tag="button"
            :to="{ name: 'Cart' }"
        >
          <span class="glyphicon glyphicon-shopping-cart"></span>
          <span class="badge badge-secondary" v-show="cartItemCount">{{ cartItemCount }}</span>
          Cart
        </router-link >
      </div>
    </div>
  </header>
</template>

<script>
  import { mapGetters } from 'vuex';
  
  
  export default {
    name: "my-header",
    data() {
      return {
        siteName: "Happy whiskers",
      }
    },
    computed: {
      ...mapGetters({
        cartItemCount: 'getCartTotalQuantity'
      })
    }
  }
</script>

<style scoped>
  .site-title {
    padding: 10px 20px;
  }

  .site-title .site-link {
    color: black;
  }
  
  .cart {
    padding: 20px 50px;
  }
  
  a {
    text-decoration: none;
    color: black;
  }
  
  .router-link-exact-active {
    color: blue;
  }
</style>