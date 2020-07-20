<template>
  <div>
    <header>
      <div class="navbar navbar-default">
        <div class="navbar-header">
          <h1>{{ sitename }}</h1>
        </div>
        <div class="nav navbar-nav navbar-right cart">
          <button type="button" class="btn btn-default btn-lg">
            <span class="glyphicon glyphicon-shopping-cart"></span>
            <span class="badge badge-secondary">{{ cartItemCount}}</span>
            Checkout
          </button>
        </div>
      </div>
    </header>
    
    <main>
      <div class="row">
        <div>
          <div class="col-md-2 col-md-offset-1">
            <figure>
              <img :src="require(`@/assets/images/${ product.image }`)">
            </figure>
          </div>
          <div class="col-md-6 col-md-offset-2 description">
            <h1>{{ product.title }}</h1>
            <p v-html="product.description"></p>
            <p class="price">
              {{ product.price | formatPrice}}
            </p>
            <button
                class=" btn btn-primary btn-lg"
                :disabled="canAddToCart"
                @click="addToCart"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </main>
  
  </div>
</template>

<script>
  export default {
    name: 'Card',
    props: {
      sitename: String
    },
    data(){
      return {
        product: {
          id: 1001,
          title: "Cat Food, 25lb bag",
          description: "A 25 pound bag of <em>irresistible</em>, organic goodness for your cat.",
          price: 2000,
          image: "cat-eats-from-bowl.jpg",
          availableInventory: 5
        },
        cart: []
      }
    },
    methods: {
      addToCart() {
        this.cart.push(this.product)
      }
    },
    computed: {
      cartItemCount() {
        return this.cart.length || "";
      },
      canAddToCart() {
        return this.cartItemCount > this.product.availableInventory
      }
    },
    filters: {
      formatPrice(price) { // 123456789 => $1,234,567.89
        if (!parseInt(price)) return "";
  
        if (price > 99999) {
          const priceString = (price / 100).toFixed(2);
          const priceFormat =  priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
          return "$" + priceFormat;
        }
        
        return "$" + (price / 100).toFixed(2);
      },
      currencyPrice(price) { // 1234567.89 => $1,234,567.89
        return new Intl.NumberFormat("en-US",
          { style: "currency", currency: "USD" }).format(price);
      }
    }
  }
</script>

<style scoped>
  header h1{
    padding: 10px 20px;
  }
  
  body {
    max-width: 970px;
  }
  .cart {
    padding: 20px 50px;
  }
  .boxes {
    margin-top: 20px;
  }
  
  .verify {
    margin-top: 20px;
  }
  
  .submit {
    margin-top:20px;
    float: right;
  }
  
  .pagecheckout {
    padding: 20px 50px;
  }
  .description {
    font-size: 150%;
    margin-top:50px;
  }
</style>
