<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        
        <div class="col-md-10 col-md-offset-1">
          <h2 class="h3">Pet Shop Checkout</h2>
          
          <p class="font-size-ms text-muted">Enter Your Information</p>
          
          <ValidationObserver v-slot="{ invalid }">
            
            <form class="row" @submit.prevent="submitForm">
              
              <ValidationProvider class="col-sm-6 form-group" tag="div" v-slot="{ errors }" rules="minmax:3,16,First name|alpha_spaces|required">
                <label class="form-label" for="first-name">
                  First name<sup class="text-danger ml-1">*</sup>
                </label>
                <input class="form-control" type="text" id="first-name" v-model.lazy="order.firstName" >
                <div class="invalid-feedback" >{{ errors[0] }}</div>
              </ValidationProvider>
              
              <ValidationProvider class="col-sm-6 form-group" tag="div" v-slot="{ errors }" rules="minmax:3,25,Last name|alpha_spaces|required">
                <label class="form-label" for="last-name">
                  Last name<sup class="text-danger ml-1">*</sup>
                </label>
                <input class="form-control" type="text" id="last-name" v-model.lazy="order.lastName" >
                <div class="invalid-feedback" >{{ errors[0] }}</div>
              </ValidationProvider>
              
              <ValidationProvider class="col-sm-6 form-group" tag="div" v-slot="{ errors }" rules="email|required">
                <label class="form-label" for="email">
                  Email address<sup class="text-danger ml-1">*</sup>
                </label>
                <input class="form-control" type="text" id="email" v-model.lazy="order.email" >
                <div class="invalid-feedback" >{{ errors[0] }}</div>
              </ValidationProvider>
              
              <div class="col-sm-6 form-group" tag="div">
                <label class="form-label" for="phone">
                  Phone number<sup class="text-danger ml-1">*</sup>
                </label>
                <phone-mask-input
                    v-model.lazy="order.phone"
                    autoDetectCountry
                    showFlag
                    @onValidate="onValidate"
                    wrapperClass="phone-wrapper"
                    inputClass="form-control"
                    flagClass="phone-flag"
                />
                <div class="invalid-feedback" v-show="phoneError">{{ phoneError }}</div>
              </div>
              
              <div class="col-sm-12 pt-2">
                <button class="btn btn-primary btn-block" type="submit" :disabled="!!phoneError || invalid">Place Order</button>
              </div>
            </form>
          
          </ValidationObserver>
        </div>
      
      </div>
    </div>
  </div>
</template>

<script>
  import PhoneMaskInput from  "vue-phone-mask-input";
  import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
  import { required, alpha_spaces, email } from 'vee-validate/dist/rules';
  
  extend('minmax', {
    validate(value, { min, max, fieldName }) {
      return value.length >= min && value.length <= max;
    },
    params: ['min', 'max', 'fieldName'],
    message: 'Please enter you {fieldName}, from {min} to {max} characters!'
  });
  extend('required', {
    ...required,
    message: 'This field should be required'
  });
  extend('alpha_spaces', {
    ...alpha_spaces,
    message: 'This field may contain alphabetic characters or spaces'
  });
  extend('email', {
    ...email,
    message: 'Please enter a valid email address!'
  });
  
  
  export default {
    name: 'Form',
    components: { ValidationProvider, ValidationObserver, PhoneMaskInput },
    data () {
      return {
        order: {
          firstName: '',
          lastName: '',
          email: '',
          phone: ''
        },
        phoneError: ""
      }
    },
    methods: {
      submitForm() {
        console.log('Form Submitted', JSON.stringify(this.order));
        console.log(this.$store.getters.getCartAll); // <--  id: 1002 quantity: 2  отправить номальные данные о заказанном товаре
        
        this.clearForm();
        
        this.$router.push({ path: '/' });
      },
      clearForm() {
        Object.keys(this.order).forEach((key,index) => {
          this.order[ key ] = '';
        });
        
      },
      onValidate(value) {
        if (value.isValidByLibPhoneNumberJs) {
          this.phoneError = ""
        } else {
          this.phoneError = "Enter your correct phone number"
        }
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
    width: 100%;
    margin-top: .25rem;
    font-size: 16px;
    color: #f74f78;
  }
</style>