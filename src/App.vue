<template>
  <div id="app">
    <my-header></my-header>
    
    <div class="container">
      <loader v-if="loading"/>
      
      <transition name="fade" mode="out-in" v-else>
        <router-view/>
      </transition>
  
      <alert @showAlert="toggleAlert" :show="showErrorMessage" :isError="true" :title="checkError"/>
      <alert @showAlert="toggleAlert" :show="showSuccessMessage" :title="checkSuccess"/>
    </div>
    
  </div>
</template>

<script>
  import MyHeader from './components/Header.vue';
  import Loader from './components/Loader.vue';
  import Alert from './components/Alert.vue';
  
  
  export default {
    name: 'app',
    components: { MyHeader, Loader, Alert },
    data() {
      return {
        showErrorMessage: false,
        showSuccessMessage: false
      }
    },
    methods: {
      toggleAlert({ isError }) {
        if (isError) {
          this.showErrorMessage = false
        } else {
          this.showSuccessMessage = false
        }
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      checkError() {
        const errorMessage = this.$store.getters.error;
        
        if (errorMessage) {
          this.showErrorMessage = true;
          
          return errorMessage
        }
        
        return '';
      },
      checkSuccess() {
        const successMessage = this.$route.query;
        
        if (successMessage.totalPrice) {
          this.showSuccessMessage = true;
      
          return `${ successMessage.user } your ${ this.$options.filters.formatPrice(successMessage.totalPrice) } order is accepted`
        }
        
        return '';
      }
    },
    async created () {
      if (!this.$store.state.products.length) {
        await this.$store.dispatch('initStore')
      }
    }
  }
</script>

<style>
  #app {
    position: relative;
    margin-top: 87px;
    height: 100%;
    min-height: 90vh;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #app:before {
    content: '';
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    background: url('./assets/images/sign.jpg') repeat;
    background-size: 15% auto;
    opacity: .1;
  }
  
  
  .fade-enter-active {
    animation: slideIn 0.5s;
  }
  
  .fade-leave-active {
    animation: slideOut 0.5s forwards;
  }
  
  @keyframes slideIn {
    from { transform: translateX(-100vw); }
    to { transform: translateX(0px); }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0px); }
    to { transform: translateX(100vw); }
  }
  
  /* Form.vue input phone number */
  .phone-wrapper {
    position: relative;
  }
  
  .phone-wrapper .phone-flag {
    position: absolute !important;
    top: 0;
    right: 10px;
  }
  
  @media (max-width: 768px) {
    #app {
      margin-top: 55px;
    }
  }
</style>
