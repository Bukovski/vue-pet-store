<template>
  <header>
    <div class="navbar navbar-default">
      <div class="navbar-header navbar-logo">
          <router-link class="site-link" :to="{ name: 'Main' }">
            <span class="site-logo">
              <img :src="require('@/assets/images/logo.png')" alt="logo">
            </span>
            <span class="site-title">
            {{ siteName }}
            </span>
          </router-link>
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
  .navbar-logo {
    margin: 5px 15px;
    width: 200px;
    display: flex;
    align-items: center;
  }
  .site-link {
    position: relative;
  }
  
  .site-title {
    position: absolute;
    font-size: 28px;
    color: black;
  }
  
  .site-logo {
    display: inline-block;
    width: 70px;
  }
  .site-logo img {
    display: block;
    height: auto;
    max-width: 100%;
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

  @media (max-width: 768px) {
    .navbar {
      display: flex;
      justify-content: space-between;
    }
  }
</style>