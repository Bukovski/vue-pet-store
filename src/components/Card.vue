<template>
  <div class="body">
    <header>
      <div class="navbar navbar-default">
        <div class="navbar-header">
          <h1 class="site-title">{{ sitename }}</h1>
        </div>
        <div class="nav navbar-nav navbar-right cart">
          <button
              type="button"
              class="btn btn-default btn-lg"
              @click="showCheckout"
          >
            <span class="glyphicon glyphicon-shopping-cart"></span>
            <span class="badge badge-secondary">{{ cartItemCount}}</span>
            Checkout
          </button>
        </div>
      </div>
    </header>
    
    <main>
      <div class="row">
        <div
            class="col-md-6 col-lg-4"
            v-if="toggleProductForm"
        >
          <div class="card">
            <img
                class="card-img-top"
                alt="image"
                :src="require(`@/assets/images/${ product.image }`)"
            />
  
            <div class="card-body">
              <h3 class="card-title">{{ product.title }}</h3>
              
              <p class="card-text" v-html="product.description"></p>
              <p class="price">{{ product.price | formatPrice}}</p>
              
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
        
        <div v-else>
          <div class="col-md-6 col-md-offset-3">
            <div class="panel panel-info">
              <div class="panel-heading">Pet Shop Checkout</div>
              <div class="panel-body">
                <div class="form-group">
                  <div class="col-md-12">
                    <h4><strong>Enter Your Information</strong></h4>
                  </div>
                  
                  <div class="form-group">
                    <div class="col-md-6">
                      <strong>First Name:</strong>
                      <input v-model.trim="order.firstName" class="form-control" />
                    </div>
                    <div class="col-md-6">
                      <strong>Last Name:</strong>
                      <input v-model.trim="order.lastName" class="form-control" />
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <div class="col-md-12"><strong>Address:</strong></div>
                    <div class="col-md-12">
                      <input v-model.trim="order.address" class="form-control" />
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <div class="col-md-12"><strong>City:</strong></div>
                    <div class="col-md-12">
                      <input v-model.trim="order.city" class="form-control" />
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <div class="col-md-6">
                      <strong>State:</strong>
                      <select v-model="order.state" class="form-control">
                        <option disabled value="">State</option>
                        <option
                            v-for="(state, key) in states"
                            :value="state"
                            :key="key"
                        >
                          {{ key }}
                        </option>
                      </select>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <div class="col-md-6">
                      <strong>Zip / Postal Code:</strong>
                      <input
                          v-model.number="order.zip"
                          class="form-control"
                          type="number"
                      />
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <div class="col-md-6 text-left">
                      <input
                          type="checkbox"
                          id="gift"
                          value="false"
                          :true-value="order.sendGift"
                          :false-value="order.dontSendGift"
                          v-model="order.gift"
                      />
                      <label for="gift">Ship As Gift?</label>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <div class="col-md-6">
                      <input
                          type="radio"
                          id="home"
                          :value="order.home"
                          v-model="order.method"
                      />
                      <label for="home">Home</label>
                      
                      <input
                          type="radio"
                          id="business"
                          :value="order.business"
                          v-model="order.method"
                      />
                      <label for="business">Business</label>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <div class="col-md-2 pull-left">
                      <button
                          type="submit"
                          class="btn btn-primary submit"
                          @click="submitForm"
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                  
                  <div class="col-md-12 verify">
                    <ul class="list-group text-left">
                      <li class="list-group-item">First Name: {{ order.firstName }}</li>
                      <li class="list-group-item">Last Name: {{ order.lastName }}</li>
                      <li class="list-group-item">Address: {{ order.address }}</li>
                      <li class="list-group-item">City: {{ order.city }}</li>
                      <li class="list-group-item">Zip: {{ order.zip }}</li>
                      <li class="list-group-item">State: {{ order.state }}</li>
                      <li class="list-group-item">Method: {{ order.method }}</li>
                      <li class="list-group-item">Gift: {{ order.gift }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
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
        toggleProductForm: true,
        cart: [],
        order: {
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          zip: '',
          state: '',
          method: 'Home Address',
          business: 'Business Address',
          home: 'Home Address',
          gift:'Send As A Gift',
          sendGift: 'Send As A Gift',
          dontSendGift: 'Do Not Send As A Gift'
        },
        states: {
          AL: 'Alabama',
          AK: 'Alaska',
          AR: 'Arizona',
          CA: 'California',
          NV: 'Nevada'
        },
      }
    },
    methods: {
      addToCart() {
        this.cart.push(this.product)
      },
      showCheckout() {
        if (this.cartItemCount) {
          this.toggleProductForm = !this.toggleProductForm;
        }
      },
      submitForm() {
        console.log('Form Submitted', this.order);
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
  .site-title {
    padding: 10px 20px;
  }
  
  .cart {
    padding: 20px 50px;
  }
  
  .price {
    font-size: 25px;
  }

  .card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
  }
</style>
