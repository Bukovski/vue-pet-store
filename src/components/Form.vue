<template>
  <div>
<!--    <my-header :cartItemCount="cartItemCount"></my-header>-->
    
    <div class="row">
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
</template>

<script>
  import MyHeader from './Header.vue';
  
  
  export default {
    name: 'Form',
    props: [ 'cartItemCount' ],
    components: { MyHeader },
    data() {
      return {
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
      submitForm() {
        console.log('Form Submitted', this.order);
      },
    }
  }
</script>

<style scoped>

</style>
