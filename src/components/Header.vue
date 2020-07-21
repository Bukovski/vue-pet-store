<template>
  <header>
    <div class="navbar navbar-default">
      <div class="navbar-header">
        <h1 class="site-title">
          <router-link :to="{ name: 'Main' }">{{ siteName }}</router-link>
        </h1>
      </div>
      <div class="nav navbar-nav navbar-right cart">
        <router-link
            active-class="active"
            tag="button"
            class="btn btn-default btn-lg"
            :to="{ name: 'Form' }"
        >
          <span class="glyphicon glyphicon-shopping-cart"></span>
          <span class="badge badge-secondary">{{ cartItemCount }}</span>
          Checkout
        </router-link >
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: "my-header",
    props: ['cartItemCount'],
    data() {
      return {
        siteName: "Happy whiskers"
      }
    }
  }
</script>

<style scoped>
  .site-title {
    padding: 10px 20px;
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