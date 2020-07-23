<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
  
        <div class="col-md-10 col-md-offset-1">
          <h2 class="h3">Pet Shop Checkout</h2>
          
          <p class="font-size-ms text-muted">Enter Your Information</p>
          
          <form class="row" @submit.prevent="submitForm">
            <div class="col-sm-6 form-group">
              <label class="form-label" for="order-fn">
                First name<sup class="text-danger ml-1">*</sup>
              </label>
              <input class="form-control" type="text" required="" id="order-fn">
              <div class="invalid-feedback">Please enter you first name!</div>
            </div>
            
            <div class="col-sm-6 form-group">
              <label class="form-label" for="order-ln">
                Last name<sup class="text-danger ml-1">*</sup>
              </label>
              <input class="form-control" type="text" required="" id="order-ln">
              <div class="invalid-feedback">Please enter you last name!</div>
            </div>
            
            <div class="col-sm-6 form-group">
              <label class="form-label" for="order-email">
                Email address<sup class="text-danger ml-1">*</sup>
              </label>
              <input class="form-control" type="email" required="" id="order-email">
              <div class="invalid-feedback">Please enter a valid email address!</div>
            </div>
            
            <div class="col-sm-6 form-group">
              <label class="form-label" for="order-phone">
                Phone number<sup class="text-danger ml-1">*</sup>
              </label>
              <input class="form-control bg-image-0" type="text" required="" id="order-phone">
              <div class="invalid-feedback">Please input your number!</div>
            </div>
            
            <div class="col-sm-12 form-group">
              <label class="form-label" for="order-address">
                Address<sup class="text-danger ml-1">*</sup>
              </label>
              <input class="form-control" type="password" id="order-address">
              <div class="invalid-feedback">Please input your address!</div>
            </div>
            
            <div class="col-sm-12 pt-2">
              <button class="btn btn-primary btn-block" type="submit">Place Order</button>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
  import { ValidationProvider, extend } from 'vee-validate';
  
  
  export default {
    name: 'Form',
    components: { ValidationProvider },
    data () {
      return {
        order: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
        }
      }
    },
    methods: {
      submitForm() {
        console.log('Form Submitted', this.order);
        
        this.clearForm();
      },
      clearForm() {
        Object.keys(this.order).forEach((key,index) => {
          this.order[ key ] = '';
        });
      }
    }
  };
</script>

<style scoped>
  .text-danger {
    color: #f74f78 !important;
  }

  .btn-primary {
    color: #fff;
    background-color: #766df4;
    border-color: #766df4;
    box-shadow: none;
  }

  .invalid-feedback {
    /*display: none;*/
    width: 100%;
    margin-top: .25rem;
    font-size: 16px;
    color: #f74f78;
  }
</style>